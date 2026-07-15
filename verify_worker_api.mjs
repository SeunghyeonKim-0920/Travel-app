import assert from 'node:assert/strict';
import { handleRequest, MAX_BODY_BYTES } from './worker/state-core.mjs';

class MemoryStatement {
  constructor(db, sql) {
    this.db = db;
    this.sql = sql;
    this.values = [];
  }

  bind(...values) {
    this.values = values;
    return this;
  }

  async first() {
    if (/SELECT 1 AS ok/i.test(this.sql)) return { ok: 1 };
    if (/SELECT payload, revision/i.test(this.sql)) {
      await new Promise(resolve => setTimeout(resolve, 0));
      return this.db.row ? { ...this.db.row } : null;
    }
    throw new Error(`Unexpected first query: ${this.sql}`);
  }

  async run() {
    if (/INSERT INTO moderation_reports/i.test(this.sql)) {
      this.db.reports.push({
        id: this.values[0],
        reportType: this.values[1],
        targetId: this.values[2],
        reporterClientId: this.values[7],
        reason: this.values[8]
      });
      return { meta: { changes: 1 } };
    }
    if (/INSERT OR IGNORE/i.test(this.sql)) {
      if (this.db.row) return { meta: { changes: 0 } };
      const [, payload, revision] = this.values;
      this.db.row = { payload, revision };
      return { meta: { changes: 1 } };
    }
    if (/UPDATE app_state/i.test(this.sql)) {
      const [payload, revision, , , expectedRevision] = this.values;
      if (!this.db.row || Number(this.db.row.revision) !== Number(expectedRevision)) return { meta: { changes: 0 } };
      this.db.row = { payload, revision };
      return { meta: { changes: 1 } };
    }
    throw new Error(`Unexpected run query: ${this.sql}`);
  }
}

class MemoryD1 {
  constructor() {
    this.row = null;
    this.reports = [];
  }

  prepare(sql) {
    return new MemoryStatement(this, sql);
  }
}

const origin = 'https://wandersync-travel-1779355803.surge.sh';
const aiCalls = [];
const env = {
  DB: new MemoryD1(),
  ALLOWED_ORIGINS: `${origin},http://localhost:8000`,
  AI: {
    async run(model, input) {
      aiCalls.push({ model, input });
      const languageCodes = { korean: 'ko', english: 'en', french: 'fr', chinese: 'zh', japanese: 'ja', spanish: 'es' };
      return { translated_text: `[${languageCodes[input.target_lang]}] ${input.text}` };
    }
  }
};
const futureDate = '2099-12-31';

function request(path, options = {}) {
  return handleRequest(new Request(`https://api.example.test${path}`, {
    ...options,
    headers: { Origin: origin, 'Content-Type': 'application/json', ...(options.headers || {}) }
  }), env);
}

async function putState(state, mutation = {}) {
  return request('/api/state', { method: 'PUT', body: JSON.stringify({ json_payload: state, ...mutation }) });
}

const health = await request('/api/health');
assert.equal(health.status, 200);

const translationPreflight = await request('/api/translate', { method: 'OPTIONS' });
assert.equal(translationPreflight.status, 204);
assert.match(translationPreflight.headers.get('Access-Control-Allow-Methods') || '', /POST/);

const translated = await request('/api/translate', {
  method: 'POST',
  body: JSON.stringify({ text: 'Great route planner', sourceLang: 'en', targetLangs: ['ko', 'fr'] })
});
assert.equal(translated.status, 200);
const translatedBody = await translated.json();
assert.deepEqual(translatedBody.translations, { en: 'Great route planner', ko: '[ko] Great route planner', fr: '[fr] Great route planner' });
assert.equal(aiCalls.length, 2);
assert.deepEqual(aiCalls.map(call => [call.input.source_lang, call.input.target_lang]), [['english', 'korean'], ['english', 'french']]);

const invalidTranslation = await request('/api/translate', {
  method: 'POST',
  body: JSON.stringify({ text: '', sourceLang: 'en', targetLang: 'ko' })
});
assert.equal(invalidTranslation.status, 400);

const report = await request('/api/reports', {
  method: 'POST',
  body: JSON.stringify({
    reportType: 'message',
    targetId: 'message-1',
    roomId: 'room-a',
    messageId: 'message-1',
    reportedClientId: 'client-b',
    reportedName: 'Traveler B',
    reporterClientId: 'client-a',
    reason: 'harassment',
    details: 'Repeated unwanted contact',
    evidence: { text: 'sample message' }
  })
});
assert.equal(report.status, 201);
const reportBody = await report.json();
assert.equal(reportBody.ok, true);
assert.match(reportBody.reportId, /^[0-9a-f-]{36}$/i);
assert.equal(env.DB.reports.length, 1);
assert.deepEqual(env.DB.reports[0], {
  id: reportBody.reportId,
  reportType: 'message',
  targetId: 'message-1',
  reporterClientId: 'client-a',
  reason: 'harassment'
});

const invalidReport = await request('/api/reports', {
  method: 'POST',
  body: JSON.stringify({ reportType: 'message', targetId: 'message-1', reporterClientId: 'client-a', reason: 'invalid' })
});
assert.equal(invalidReport.status, 400);
assert.equal((await request('/api/reports')).status, 404);

const unavailableTranslation = await handleRequest(new Request('https://api.example.test/api/translate', {
  method: 'POST',
  headers: { Origin: origin, 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'hello', sourceLang: 'en', targetLang: 'ko' })
}), { DB: new MemoryD1(), ALLOWED_ORIGINS: origin });
assert.equal(unavailableTranslation.status, 503);

const inferenceUnavailable = await handleRequest(new Request('https://api.example.test/api/translate', {
  method: 'POST',
  headers: { Origin: origin, 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'hello', sourceLang: 'en', targetLang: 'ko' })
}), {
  DB: new MemoryD1(),
  ALLOWED_ORIGINS: origin,
  AI: { async run() { throw new Error('inference unavailable'); } }
});
assert.equal(inferenceUnavailable.status, 200);
assert.deepEqual(await inferenceUnavailable.json(), {
  ok: true,
  sourceLang: 'en',
  translations: { en: 'hello' },
  unavailableTargets: ['ko']
});

const roomA = { id: 'room-a', date: futureDate, title: 'A', joinedUsers: ['A'], creator: { name: 'A' } };
const roomB = { id: 'room-b', date: futureDate, title: 'B', joinedUsers: ['B'], creator: { name: 'B' } };
const [writeA, writeB] = await Promise.all([
  putState({ rooms: [roomA], chatLogs: { 'room-a': [{ id: 'm1', sender: 'A', text: 'hello', timestamp: 1 }] } }),
  putState({ rooms: [roomB], chatLogs: { 'room-b': [{ id: 'm2', sender: 'B', text: 'hi', timestamp: 2 }] } })
]);
assert.equal(writeA.status, 200);
assert.equal(writeB.status, 200);

let shared = await request('/api/state').then(response => response.json());
assert.deepEqual(shared.rooms.map(room => room.id).sort(), ['room-a', 'room-b']);
assert.equal(shared.chatLogs['room-a'].length, 1);
assert.equal(shared.chatLogs['room-b'].length, 1);

await putState({ rooms: [roomA], chatLogs: { 'room-a': [{ id: 'm1', sender: 'A', text: 'hello', timestamp: 1 }] } });
shared = await request('/api/state').then(response => response.json());
assert.equal(shared.chatLogs['room-a'].length, 1);

const deleted = await putState({ rooms: [], chatLogs: {} }, { deletedRoomIds: ['room-a'] });
assert.equal(deleted.status, 200);
shared = await request('/api/state').then(response => response.json());
assert.equal(shared.rooms.some(room => room.id === 'room-a'), false);
assert.equal(shared.chatLogs['room-a'], undefined);

env.DB.row = {
  revision: 10,
  payload: JSON.stringify({ rooms: [{ id: 'expired', date: '2000-01-01', title: 'old' }], chatLogs: { expired: [{ id: 'old-message' }] } })
};
shared = await request('/api/state').then(response => response.json());
assert.equal(shared.rooms.length, 0);
assert.deepEqual(shared.chatLogs, {});

const legitimateRoom = { id: 'real-room', date: futureDate, title: 'Museum companion', joinedUsers: ['Traveler'] };
const legacySample = { id: '1', date: futureDate, title: 'Legacy sample' };
const qaRoom = { id: 'qa-room', date: futureDate, title_ko: '\uC6B4\uC601 \uAD50\uCC28 \uC0AC\uC6A9\uC790 \uD655\uC778 123' };
await putState({
  rooms: [legitimateRoom, legacySample, qaRoom],
  chatLogs: {
    'real-room': [{ id: 'real-message', text: 'hello' }],
    '1': [{ id: 'sample-message', text: 'sample' }],
    'qa-room': [{ id: 'qa-message', text: 'qa' }]
  }
});
shared = await request('/api/state').then(response => response.json());
assert.deepEqual(shared.rooms.map(room => room.id), ['real-room']);
assert.deepEqual(Object.keys(shared.chatLogs), ['real-room']);

const blocked = await handleRequest(new Request('https://api.example.test/api/state', { headers: { Origin: 'https://attacker.example' } }), env);
assert.equal(blocked.status, 403);

const oversized = await request('/api/state', {
  method: 'PUT',
  body: JSON.stringify({ json_payload: { rooms: [], padding: 'x'.repeat(MAX_BODY_BYTES + 1) } })
});
assert.equal(oversized.status, 413);

console.log('PASS Worker D1 API persistence, translation, moderation reports, merge, deletion, expiry, legacy cleanup, CORS, and payload limits');
