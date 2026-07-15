const MAX_BODY_BYTES = 1024 * 1024;
const MAX_ROOMS = 2000;
const MAX_MESSAGES_PER_ROOM = 500;
const MAX_FEEDBACKS = 1000;
const MAX_CITY_REQUESTS = 500;
const STATE_ID = 'global';
const SUPPORTED_LANGUAGES = new Set(['ko', 'en', 'fr', 'zh', 'ja', 'es']);
const MODEL_LANGUAGE_NAMES = {
  ko: 'korean',
  en: 'english',
  fr: 'french',
  zh: 'chinese',
  ja: 'japanese',
  es: 'spanish'
};
const MAX_TRANSLATION_TEXT_LENGTH = 500;
const TRANSLATION_MODEL = '@cf/meta/m2m100-1.2b';
const REPORT_TYPES = new Set(['room', 'member', 'message']);
const REPORT_REASONS = new Set(['safety', 'harassment', 'spam', 'fraud', 'inappropriate', 'other']);

const LEGACY_TEST_FEEDBACK_TEXTS = new Set([
  'anonymous-feedback-qa',
  'mobile feedback verification',
  'qfqgeeg'
]);
const LEGACY_TEST_ROOM_IDS = new Set(['1', '2', '3', '4', '5']);
const LEGACY_TEST_ROOM_TITLE_PREFIXES = [
  'cross-client api verification',
  'ui shared room',
  '\uC6B4\uC601 \uACF5\uC720 \uD655\uC778 \uB3D9\uD589\uBC29',
  '\uC6B4\uC601 \uAD50\uCC28 \uC0AC\uC6A9\uC790 \uD655\uC778'
];

function cleanText(value, max = 5000) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .slice(0, max);
}

function uniqueStrings(values, max = 100) {
  return Array.from(new Set((Array.isArray(values) ? values : []).map(value => cleanText(value, 120)).filter(Boolean))).slice(0, max);
}

function normalizeLanguage(value) {
  const language = cleanText(value, 8).trim().toLowerCase();
  return SUPPORTED_LANGUAGES.has(language) ? language : '';
}

function normalizeTranslations(value, sourceText = '', sourceLanguage = '') {
  const translations = {};
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    Object.entries(value).forEach(([language, text]) => {
      const normalizedLanguage = normalizeLanguage(language);
      const normalizedText = cleanText(text, MAX_TRANSLATION_TEXT_LENGTH).trim();
      if (normalizedLanguage && normalizedText) translations[normalizedLanguage] = normalizedText;
    });
  }
  if (sourceLanguage && sourceText) translations[sourceLanguage] = sourceText;
  return translations;
}

function emptyState() {
  return { rooms: [], chatLogs: {}, cityRequests: [], feedbacks: [], updatedAt: Date.now() };
}

function isExpiredRoom(room, now = Date.now()) {
  if (!room || !/^\d{4}-\d{2}-\d{2}$/.test(String(room.date || ''))) return false;
  const endOfDateUtc = Date.parse(`${room.date}T23:59:59.999Z`);
  return Number.isFinite(endOfDateUtc) && endOfDateUtc < now;
}

function isLegacyTestRoom(room) {
  if (!room || typeof room !== 'object') return false;
  if (LEGACY_TEST_ROOM_IDS.has(String(room.id || ''))) return true;
  const title = [room.title, room.title_ko, room.title_en]
    .map(value => cleanText(value, 240).trim().toLowerCase())
    .filter(Boolean)
    .join(' ');
  return title === 'test' || LEGACY_TEST_ROOM_TITLE_PREFIXES.some(prefix => title.includes(prefix));
}

function normalizeRoom(room, now = Date.now()) {
  if (!room || typeof room !== 'object') return null;
  const id = cleanText(room.id, 120);
  const date = cleanText(room.date, 10);
  if (!id || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const normalized = {
    ...room,
    id,
    date,
    title: cleanText(room.title, 240),
    description: cleanText(room.description, 5000),
    place: cleanText(room.place, 240),
    joinedUsers: uniqueStrings(room.joinedUsers, 50),
    memberProfiles: room.memberProfiles && typeof room.memberProfiles === 'object' && !Array.isArray(room.memberProfiles)
      ? room.memberProfiles
      : {},
    updatedAt: Number(room.updatedAt) || now
  };
  normalized.joinedCount = normalized.joinedUsers.length;
  if (normalized.creator && typeof normalized.creator === 'object') {
    normalized.creator = { ...normalized.creator, name: cleanText(normalized.creator.name, 120) };
  }
  return normalized;
}

function normalizeMessage(message, roomId, now = Date.now()) {
  if (!message || typeof message !== 'object') return null;
  const timestamp = Number(message.timestamp) || now;
  const id = cleanText(message.id, 160) || `${roomId}-${timestamp}-${cleanText(message.sender, 40)}`;
  return {
    ...message,
    id,
    sender: cleanText(message.sender, 120),
    text: cleanText(message.text, 3000),
    timestamp
  };
}

function normalizeFeedback(entry) {
  if (!entry || typeof entry !== 'object' || !entry.id) return null;
  const text = cleanText(entry.text, 500);
  if (LEGACY_TEST_FEEDBACK_TEXTS.has(text.trim().toLowerCase())) return null;
  const language = normalizeLanguage(entry.lang) || 'en';
  return {
    ...entry,
    id: cleanText(entry.id, 160),
    name: cleanText(entry.name, 60),
    text,
    rating: Math.max(1, Math.min(5, Number(entry.rating) || 1)),
    timestamp: Number(entry.timestamp) || 0,
    updatedAt: Number(entry.updatedAt) || 0,
    lang: language,
    translationSource: text,
    translations: normalizeTranslations(
      entry.translationSource && cleanText(entry.translationSource, MAX_TRANSLATION_TEXT_LENGTH) !== text ? {} : entry.translations,
      text,
      language
    )
  };
}

function normalizeState(value, now = Date.now()) {
  const source = value && typeof value === 'object' ? value : {};
  const rooms = (Array.isArray(source.rooms) ? source.rooms : [])
    .map(room => normalizeRoom(room, now))
    .filter(room => room && !isExpiredRoom(room, now) && !isLegacyTestRoom(room))
    .slice(-MAX_ROOMS);
  const activeRoomIds = new Set(rooms.map(room => room.id));
  const chatLogs = {};
  if (source.chatLogs && typeof source.chatLogs === 'object' && !Array.isArray(source.chatLogs)) {
    Object.entries(source.chatLogs).forEach(([roomId, messages]) => {
      const id = cleanText(roomId, 120);
      if (!id || !activeRoomIds.has(id) || !Array.isArray(messages)) return;
      const byId = new Map();
      messages.forEach(message => {
        const normalized = normalizeMessage(message, id, now);
        if (normalized) byId.set(normalized.id, normalized);
      });
      chatLogs[id] = Array.from(byId.values())
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(-MAX_MESSAGES_PER_ROOM);
    });
  }
  const feedbackById = new Map();
  (Array.isArray(source.feedbacks) ? source.feedbacks : []).forEach(entry => {
    const normalized = normalizeFeedback(entry);
    if (normalized && normalized.id) feedbackById.set(normalized.id, normalized);
  });
  const requestById = new Map();
  (Array.isArray(source.cityRequests) ? source.cityRequests : []).forEach(request => {
    if (!request || typeof request !== 'object') return;
    const id = cleanText(request.id || request.timestamp || JSON.stringify(request), 180);
    if (id) requestById.set(id, { ...request, id: request.id || id });
  });
  return {
    rooms,
    chatLogs,
    feedbacks: Array.from(feedbackById.values()).slice(-MAX_FEEDBACKS),
    cityRequests: Array.from(requestById.values()).slice(-MAX_CITY_REQUESTS),
    updatedAt: now
  };
}

function mergeMessages(first = [], second = []) {
  const byId = new Map();
  [...first, ...second].forEach(message => {
    if (message && message.id) byId.set(String(message.id), message);
  });
  return Array.from(byId.values()).sort((a, b) => (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0)).slice(-MAX_MESSAGES_PER_ROOM);
}

function mergeState(currentValue, incomingValue, mutation = {}, now = Date.now()) {
  const current = normalizeState(currentValue, now);
  const incoming = normalizeState(incomingValue, now);
  const deletedRoomIds = new Set(uniqueStrings(mutation.deletedRoomIds, MAX_ROOMS));
  const deletedFeedbackIds = new Set(uniqueStrings(mutation.deletedFeedbackIds, MAX_FEEDBACKS));
  const replaceMembershipRoomIds = new Set(uniqueStrings(mutation.replaceMembershipRoomIds, MAX_ROOMS));
  const rooms = new Map();

  current.rooms.forEach(room => {
    if (!deletedRoomIds.has(room.id)) rooms.set(room.id, room);
  });
  incoming.rooms.forEach(room => {
    if (deletedRoomIds.has(room.id)) return;
    const previous = rooms.get(room.id);
    if (!previous) {
      rooms.set(room.id, room);
      return;
    }
    const joinedUsers = replaceMembershipRoomIds.has(room.id)
      ? uniqueStrings(room.joinedUsers, 50)
      : uniqueStrings([...(previous.joinedUsers || []), ...(room.joinedUsers || [])], 50);
    rooms.set(room.id, {
      ...previous,
      ...room,
      joinedUsers,
      joinedCount: joinedUsers.length,
      memberProfiles: { ...(previous.memberProfiles || {}), ...(room.memberProfiles || {}) },
      updatedAt: Math.max(Number(previous.updatedAt) || 0, Number(room.updatedAt) || 0, now)
    });
  });

  const chatLogs = { ...current.chatLogs };
  Object.entries(incoming.chatLogs).forEach(([roomId, messages]) => {
    chatLogs[roomId] = mergeMessages(chatLogs[roomId] || [], messages);
  });
  deletedRoomIds.forEach(roomId => delete chatLogs[roomId]);

  const feedbacks = new Map();
  current.feedbacks.forEach(entry => {
    if (entry && entry.id && !deletedFeedbackIds.has(String(entry.id))) feedbacks.set(String(entry.id), entry);
  });
  incoming.feedbacks.forEach(entry => {
    if (!entry || !entry.id || deletedFeedbackIds.has(String(entry.id))) return;
    const id = String(entry.id);
    const previous = feedbacks.get(id);
    if (!previous) {
      feedbacks.set(id, entry);
      return;
    }
    const sameSource = cleanText(previous.text, MAX_TRANSLATION_TEXT_LENGTH) === cleanText(entry.text, MAX_TRANSLATION_TEXT_LENGTH);
    const previousVersion = Number(previous.updatedAt) || Number(previous.timestamp) || 0;
    const incomingVersion = Number(entry.updatedAt) || Number(entry.timestamp) || 0;
    const preferred = incomingVersion >= previousVersion ? entry : previous;
    feedbacks.set(id, {
      ...previous,
      ...entry,
      ...preferred,
      translations: sameSource
        ? { ...(previous.translations || {}), ...(entry.translations || {}) }
        : { ...(preferred.translations || {}) }
    });
  });
  const cityRequests = new Map();
  [...current.cityRequests, ...incoming.cityRequests].forEach(request => {
    if (!request) return;
    const id = String(request.id || request.timestamp || JSON.stringify(request));
    cityRequests.set(id, request);
  });

  return normalizeState({
    rooms: Array.from(rooms.values()),
    chatLogs,
    feedbacks: Array.from(feedbacks.values()),
    cityRequests: Array.from(cityRequests.values())
  }, now);
}

function allowedOrigins(env) {
  return new Set(String(env.ALLOWED_ORIGINS || 'https://wandersync-travel-1779355803.surge.sh,http://localhost:8000,http://localhost:8010')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean));
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  const allowed = allowedOrigins(env);
  const headers = {
    'Access-Control-Allow-Methods': 'GET,PUT,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Wandersync-Client, Cache-Control, Pragma, Expires',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    'Vary': 'Origin'
  };
  if (origin && allowed.has(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function isOriginAllowed(request, env) {
  const origin = request.headers.get('Origin');
  return !origin || allowedOrigins(env).has(origin);
}

function jsonResponse(request, env, status, value, extraHeaders = {}) {
  return new Response(JSON.stringify(value), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(request, env),
      ...extraHeaders
    }
  });
}

async function readStoredState(db) {
  const row = await db.prepare('SELECT payload, revision FROM app_state WHERE id = ?').bind(STATE_ID).first();
  if (!row) return { state: emptyState(), revision: 0, exists: false };
  try {
    return { state: normalizeState(JSON.parse(row.payload)), revision: Number(row.revision) || 0, exists: true };
  } catch (error) {
    return { state: emptyState(), revision: Number(row.revision) || 0, exists: true };
  }
}

function changedRows(result) {
  return Number(result && result.meta && result.meta.changes) || 0;
}

async function writeMergedState(db, incoming, mutation) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const stored = await readStoredState(db);
    const merged = mergeState(stored.state, incoming, mutation);
    const payload = JSON.stringify(merged);
    const nextRevision = stored.revision + 1;
    let result;
    if (stored.exists) {
      result = await db.prepare('UPDATE app_state SET payload = ?, revision = ?, updated_at = ? WHERE id = ? AND revision = ?')
        .bind(payload, nextRevision, new Date().toISOString(), STATE_ID, stored.revision)
        .run();
    } else {
      result = await db.prepare('INSERT OR IGNORE INTO app_state (id, payload, revision, updated_at) VALUES (?, ?, ?, ?)')
        .bind(STATE_ID, payload, nextRevision, new Date().toISOString())
        .run();
    }
    if (changedRows(result) === 1) return { ...merged, revision: nextRevision };
  }
  throw Object.assign(new Error('Concurrent update conflict.'), { statusCode: 409 });
}

async function readJsonBody(request) {
  const declared = Number(request.headers.get('Content-Length') || 0);
  if (declared > MAX_BODY_BYTES) throw Object.assign(new Error('Payload is too large.'), { statusCode: 413 });
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
    throw Object.assign(new Error('Payload is too large.'), { statusCode: 413 });
  }
  try {
    return text ? JSON.parse(text) : {};
  } catch (error) {
    throw Object.assign(new Error('Request body must be valid JSON.'), { statusCode: 400 });
  }
}

function getTranslatedText(result) {
  if (!result || typeof result !== 'object') return '';
  return cleanText(result.translated_text || result.translation || result.response || '', MAX_TRANSLATION_TEXT_LENGTH).trim();
}

async function translateText(env, text, sourceLanguage, targetLanguage) {
  const result = await env.AI.run(TRANSLATION_MODEL, {
    text,
    source_lang: MODEL_LANGUAGE_NAMES[sourceLanguage],
    target_lang: MODEL_LANGUAGE_NAMES[targetLanguage]
  });
  const translated = getTranslatedText(result);
  if (!translated) throw new Error('Translation model returned no text.');
  return translated;
}

async function handleTranslationRequest(request, env) {
  if (!env.AI || typeof env.AI.run !== 'function') {
    return { status: 503, body: { ok: false, error: 'Translation service is unavailable.' } };
  }
  const body = await readJsonBody(request);
  const text = cleanText(body.text, MAX_TRANSLATION_TEXT_LENGTH + 1).trim();
  const sourceLanguage = normalizeLanguage(body.sourceLang);
  const requestedTargets = Array.isArray(body.targetLangs) ? body.targetLangs : [body.targetLang];
  const targetLanguages = Array.from(new Set(requestedTargets.map(normalizeLanguage).filter(Boolean))).slice(0, 5);
  if (!text || text.length > MAX_TRANSLATION_TEXT_LENGTH || !sourceLanguage || !targetLanguages.length) {
    return { status: 400, body: { ok: false, error: 'Translation request is invalid.' } };
  }
  const targets = targetLanguages.filter(language => language !== sourceLanguage);
  const translations = { [sourceLanguage]: text };
  if (!targets.length) return { status: 200, body: { ok: true, sourceLang: sourceLanguage, translations } };
  const results = await Promise.allSettled(targets.map(async language => [language, await translateText(env, text, sourceLanguage, language)]));
  const unavailableTargets = [];
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') translations[result.value[0]] = result.value[1];
    else unavailableTargets.push(targets[index]);
  });
  return { status: 200, body: { ok: true, sourceLang: sourceLanguage, translations, unavailableTargets } };
}

async function handleReportRequest(request, env) {
  const body = await readJsonBody(request);
  const reportType = cleanText(body.reportType, 20).trim().toLowerCase();
  const reason = cleanText(body.reason, 30).trim().toLowerCase();
  const targetId = cleanText(body.targetId, 160).trim();
  const reporterClientId = cleanText(body.reporterClientId, 160).trim();
  const details = cleanText(body.details, 1000).trim();
  if (!REPORT_TYPES.has(reportType) || !REPORT_REASONS.has(reason) || !targetId || !reporterClientId) {
    return { status: 400, body: { ok: false, error: 'Report payload is invalid.' } };
  }
  const reportId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const evidence = body.evidence && typeof body.evidence === 'object' && !Array.isArray(body.evidence)
    ? {
        title: cleanText(body.evidence.title, 240),
        text: cleanText(body.evidence.text, 1000)
      }
    : {};
  await env.DB.prepare(`INSERT INTO moderation_reports (
    id, report_type, target_id, room_id, message_id, reported_client_id,
    reported_name, reporter_client_id, reason, details, evidence_json,
    status, created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?)`)
    .bind(
      reportId,
      reportType,
      targetId,
      cleanText(body.roomId, 160).trim() || null,
      cleanText(body.messageId, 160).trim() || null,
      cleanText(body.reportedClientId, 160).trim() || null,
      cleanText(body.reportedName, 120).trim() || null,
      reporterClientId,
      reason,
      details || null,
      JSON.stringify(evidence),
      createdAt
    )
    .run();
  return { status: 201, body: { ok: true, reportId } };
}

async function handleRequest(request, env) {
  if (!isOriginAllowed(request, env)) return jsonResponse(request, env, 403, { ok: false, error: 'Origin is not allowed.' });
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(request, env) });
  const url = new URL(request.url);

  if (url.pathname === '/api/health' && request.method === 'GET') {
    try {
      await env.DB.prepare('SELECT 1 AS ok').first();
      return jsonResponse(request, env, 200, { ok: true, service: 'wandersync-companion-api', database: 'd1' });
    } catch (error) {
      return jsonResponse(request, env, 503, { ok: false, service: 'wandersync-companion-api', database: 'unavailable' });
    }
  }

  if (url.pathname === '/api/translate' && request.method === 'POST') {
    try {
      const result = await handleTranslationRequest(request, env);
      return jsonResponse(request, env, result.status, result.body);
    } catch (error) {
      return jsonResponse(request, env, error.statusCode || 500, { ok: false, error: error.message || 'Translation failed.' });
    }
  }

  if (url.pathname === '/api/reports' && request.method === 'POST') {
    try {
      const result = await handleReportRequest(request, env);
      return jsonResponse(request, env, result.status, result.body);
    } catch (error) {
      return jsonResponse(request, env, error.statusCode || 500, { ok: false, error: error.message || 'Report submission failed.' });
    }
  }

  if (url.pathname === '/api/state' && request.method === 'GET') {
    const stored = await readStoredState(env.DB);
    return jsonResponse(request, env, 200, { ...stored.state, revision: stored.revision });
  }

  if (url.pathname === '/api/state' && request.method === 'PUT') {
    try {
      const body = await readJsonBody(request);
      const incoming = body && body.json_payload ? body.json_payload : body;
      if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) {
        return jsonResponse(request, env, 400, { ok: false, error: 'State payload must be an object.' });
      }
      if (Array.isArray(incoming.rooms) && incoming.rooms.some(room => !normalizeRoom(room))) {
        return jsonResponse(request, env, 400, { ok: false, error: 'Room payload is invalid.' });
      }
      const saved = await writeMergedState(env.DB, incoming, {
        deletedRoomIds: body.deletedRoomIds,
        deletedFeedbackIds: body.deletedFeedbackIds,
        replaceMembershipRoomIds: body.replaceMembershipRoomIds
      });
      return jsonResponse(request, env, 200, saved, { ETag: `W/\"${saved.revision}\"` });
    } catch (error) {
      return jsonResponse(request, env, error.statusCode || 500, { ok: false, error: error.message || 'State update failed.' });
    }
  }

  return jsonResponse(request, env, 404, { ok: false, error: 'API route not found.' });
}

export { MAX_BODY_BYTES, emptyState, isExpiredRoom, normalizeState, mergeState, handleRequest, readStoredState, writeMergedState };
