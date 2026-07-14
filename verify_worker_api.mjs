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
  }

  prepare(sql) {
    return new MemoryStatement(this, sql);
  }
}

const origin = 'https://wandersync-travel-1779355803.surge.sh';
const env = { DB: new MemoryD1(), ALLOWED_ORIGINS: `${origin},http://localhost:8000` };
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

const blocked = await handleRequest(new Request('https://api.example.test/api/state', { headers: { Origin: 'https://attacker.example' } }), env);
assert.equal(blocked.status, 403);

const oversized = await request('/api/state', {
  method: 'PUT',
  body: JSON.stringify({ json_payload: { rooms: [], padding: 'x'.repeat(MAX_BODY_BYTES + 1) } })
});
assert.equal(oversized.status, 413);

console.log('PASS Worker D1 API persistence, conflict merge, deduplication, deletion, expiry, CORS, and payload limits');
