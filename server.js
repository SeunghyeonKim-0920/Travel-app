const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 8000);
const ROOT = path.resolve(process.env.WANDERSYNC_STATIC_ROOT || __dirname);
const DATA_DIR = path.resolve(process.env.WANDERSYNC_DATA_DIR || path.join(ROOT, '.data'));
const STATE_FILE = path.join(DATA_DIR, 'state.json');
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const ROUTE_TIMEOUT_MS = Number(process.env.WANDERSYNC_ROUTE_TIMEOUT_MS || 7000);
const GOOGLE_ROUTES_API_KEY = String(process.env.GOOGLE_ROUTES_API_KEY || '').trim();
const GTFS_PROVIDER_URL = String(process.env.WANDERSYNC_GTFS_API_URL || process.env.WANDERSYNC_TRANSIT_API_URL || '').trim();
const FLIGHT_PROVIDER_URL = String(process.env.WANDERSYNC_FLIGHT_API_URL || '').trim();
const GOOGLE_ROUTES_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const LEGACY_TEST_FEEDBACK_IDS = new Set([
  'feedback-1783887539379-t59ej7',
  'feedback-1783885879766-9zl97i',
  'feedback-1783857619640-5pivdc'
]);
const LEGACY_TEST_FEEDBACK_TEXTS = new Set([
  'anonymous-feedback-qa',
  'mobile feedback verification'
]);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8'
};

let stateWriteQueue = Promise.resolve();

function todayLocalIso() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function isExpiredRoom(room) {
  return Boolean(room && /^\d{4}-\d{2}-\d{2}$/.test(String(room.date || '')) && room.date < todayLocalIso());
}

function cleanText(value, max = 5000) {
  return String(value == null ? '' : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, max);
}

function normalizeRoom(room) {
  if (!room || typeof room !== 'object') return null;
  const id = cleanText(room.id, 120);
  const date = cleanText(room.date, 10);
  if (!id || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  return {
    ...room,
    id,
    date,
    title: cleanText(room.title, 240),
    description: cleanText(room.description, 5000),
    place: cleanText(room.place, 240),
    creator: room.creator && typeof room.creator === 'object' ? { ...room.creator, name: cleanText(room.creator.name, 120) } : room.creator,
    joinedUsers: Array.isArray(room.joinedUsers) ? room.joinedUsers.map(name => cleanText(name, 120)).filter(Boolean).slice(0, 50) : [],
    memberProfiles: room.memberProfiles && typeof room.memberProfiles === 'object' ? room.memberProfiles : {},
    joinedCount: Array.isArray(room.joinedUsers) ? room.joinedUsers.length : Number(room.joinedCount) || 0,
    updatedAt: Number(room.updatedAt) || Date.now()
  };
}

function isLegacyTestFeedback(entry) {
  if (!entry || typeof entry !== 'object') return false;
  if (LEGACY_TEST_FEEDBACK_IDS.has(String(entry.id || ''))) return true;
  return LEGACY_TEST_FEEDBACK_TEXTS.has(String(entry.text || '').trim().toLowerCase());
}

function normalizeState(payload) {
  const source = payload && typeof payload === 'object' ? payload : {};
  const rooms = (Array.isArray(source.rooms) ? source.rooms : []).map(normalizeRoom).filter(room => room && !isExpiredRoom(room));
  const chatLogs = {};
  if (source.chatLogs && typeof source.chatLogs === 'object') {
    Object.entries(source.chatLogs).forEach(([roomId, messages]) => {
      const key = cleanText(roomId, 120);
      if (!key || !Array.isArray(messages)) return;
      chatLogs[key] = messages.slice(-500).map(message => ({
        ...message,
        id: cleanText(message && message.id, 160) || `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        sender: cleanText(message && message.sender, 120),
        text: cleanText(message && message.text, 3000),
        timestamp: Number(message && message.timestamp) || Date.now()
      }));
    });
  }
  const feedbacks = Array.isArray(source.feedbacks)
    ? source.feedbacks.filter(entry => !isLegacyTestFeedback(entry)).slice(-1000)
    : [];
  const cityRequests = Array.isArray(source.cityRequests) ? source.cityRequests.slice(-500) : [];
  return { rooms, chatLogs, cityRequests, feedbacks, updatedAt: Date.now() };
}

function emptyState() {
  return { rooms: [], chatLogs: {}, cityRequests: [], feedbacks: [], updatedAt: Date.now() };
}

function pruneState(state) {
  const normalized = normalizeState(state);
  const activeIds = new Set(normalized.rooms.map(room => room.id));
  Object.keys(normalized.chatLogs).forEach(roomId => {
    if (!activeIds.has(roomId)) delete normalized.chatLogs[roomId];
  });
  return normalized;
}

function readState() {
  try {
    return pruneState(JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')));
  } catch (error) {
    return emptyState();
  }
}

function writeState(nextState) {
  const normalized = pruneState(nextState);
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const temporary = `${STATE_FILE}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(normalized, null, 2), 'utf8');
  fs.renameSync(temporary, STATE_FILE);
  return normalized;
}

function queueStateWrite(nextState) {
  stateWriteQueue = stateWriteQueue.catch(() => {}).then(() => writeState(nextState));
  return stateWriteQueue;
}

function mergeMessageLists(first = [], second = []) {
  const byId = new Map();
  [...first, ...second].forEach(message => {
    if (!message || !message.id) return;
    byId.set(String(message.id), message);
  });
  return Array.from(byId.values()).sort((a, b) => (Number(a.timestamp) || 0) - (Number(b.timestamp) || 0)).slice(-500);
}

function mergeState(current, incoming) {
  const oldState = pruneState(current);
  const nextState = normalizeState(incoming);
  const rooms = new Map(oldState.rooms.map(room => [room.id, room]));
  nextState.rooms.forEach(room => rooms.set(room.id, room));
  const chatLogs = { ...oldState.chatLogs };
  Object.entries(nextState.chatLogs).forEach(([roomId, messages]) => {
    chatLogs[roomId] = mergeMessageLists(chatLogs[roomId] || [], messages);
  });
  const feedbackById = new Map();
  [...oldState.feedbacks, ...nextState.feedbacks].forEach(feedback => {
    if (feedback && feedback.id) feedbackById.set(String(feedback.id), feedback);
  });
  const requestById = new Map();
  [...oldState.cityRequests, ...nextState.cityRequests].forEach(request => {
    const id = request && (request.id || request.timestamp || JSON.stringify(request));
    requestById.set(String(id), request);
  });
  return normalizeState({
    rooms: Array.from(rooms.values()),
    chatLogs,
    feedbacks: Array.from(feedbackById.values()),
    cityRequests: Array.from(requestById.values())
  });
}

function sendJson(res, status, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders
  });
  res.end(body);
}

function sendText(res, status, text, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
  res.end(text);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let total = 0;
    let body = '';
    req.setEncoding('utf8');
    req.on('data', chunk => {
      total += Buffer.byteLength(chunk);
      if (total > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('Request body is too large.'), { statusCode: 413 }));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(Object.assign(new Error('Request body must be valid JSON.'), { statusCode: 400 }));
      }
    });
    req.on('error', reject);
  });
}

function withCors(res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.WANDERSYNC_ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Wandersync-Client');
}

function parseDurationSeconds(value) {
  const match = String(value || '').match(/^(\d+(?:\.\d+)?)s$/);
  return match ? Number(match[1]) : Number(value) || 0;
}

function roundTen(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.max(10, Math.round(number / 10) * 10) : 0;
}

function isValidPoint(point) {
  return point && Number.isFinite(Number(point.lat)) && Number.isFinite(Number(point.lon)) && Number(point.lat) >= -90 && Number(point.lat) <= 90 && Number(point.lon) >= -180 && Number(point.lon) <= 180;
}

async function fetchJson(url, options = {}, timeoutMs = ROUTE_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (error) { data = null; }
    if (!response.ok) throw new Error(`Provider HTTP ${response.status}`);
    return data;
  } finally {
    clearTimeout(timer);
  }
}

function normalizeTransitVehicle(step) {
  const type = String(step && step.transitDetails && step.transitDetails.transitLine && step.transitDetails.transitLine.vehicle && step.transitDetails.transitLine.vehicle.type || '').toUpperCase();
  if (type.includes('RAIL') || type.includes('TRAIN') || type.includes('SUBWAY') || type.includes('TRAM')) return 'train';
  if (type.includes('BUS') || type.includes('TROLLEY')) return 'bus';
  return '';
}

async function computeGoogleRoute(input) {
  if (!GOOGLE_ROUTES_API_KEY || !isValidPoint(input.from) || !isValidPoint(input.to)) return null;
  const mode = String(input.mode || 'TRANSIT').toUpperCase() === 'DRIVE' ? 'DRIVE' : 'TRANSIT';
  const request = {
    origin: { location: { latLng: { latitude: Number(input.from.lat), longitude: Number(input.from.lon) } } },
    destination: { location: { latLng: { latitude: Number(input.to.lat), longitude: Number(input.to.lon) } } },
    travelMode: mode,
    languageCode: 'en-US'
  };
  if (mode === 'TRANSIT' && input.departureTime) request.departureTime = new Date(input.departureTime).toISOString();
  const data = await fetchJson(GOOGLE_ROUTES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_ROUTES_API_KEY,
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.steps.travelMode,routes.legs.steps.transitDetails'
    },
    body: JSON.stringify(request)
  });
  const route = data && Array.isArray(data.routes) ? data.routes[0] : null;
  if (!route || !route.duration || !Number.isFinite(Number(route.distanceMeters))) return null;
  const steps = (route.legs || []).flatMap(leg => leg.steps || []);
  const vehicleTypes = Array.from(new Set(steps.map(normalizeTransitVehicle).filter(Boolean)));
  const transportType = mode === 'DRIVE' ? 'drive' : vehicleTypes.length === 1 ? vehicleTypes[0] : vehicleTypes.length > 1 ? 'mixed' : 'transit';
  return {
    available: true,
    transportType,
    durationMinutes: roundTen(parseDurationSeconds(route.duration) / 60),
    distanceKm: Number((Number(route.distanceMeters) / 1000).toFixed(1)),
    connectionType: vehicleTypes.length > 1 ? 'via' : 'direct',
    provider: 'Google Routes API',
    source: GOOGLE_ROUTES_URL,
    capturedAt: new Date().toISOString(),
    isLive: true,
    evidenceClass: 'live-provider'
  };
}

function normalizeFlightResult(data) {
  const source = data && (data.route || data.result || data.offer || data);
  if (!source || typeof source !== 'object') return null;
  const stops = Number(source.stops ?? source.stopCount ?? source.connections);
  const direct = source.direct != null
    ? Boolean(source.direct)
    : Number.isFinite(stops)
      ? stops === 0
      : String(source.connectionType || '').toLowerCase() === 'direct';
  const actualFlightTime = Number(source.actualFlightTime || source.airborneMinutes || source.flightMinutes || 0);
  const airportTransferTime = Number(source.transferTime || source.airportTransferMinutes || 0);
  const waitTime = Number(source.waitTime || source.checkInSecurityMinutes || 0);
  const baggageTime = Number(source.baggageTime || source.baggageMinutes || 0);
  const layoverTime = Number(source.layoverTime || source.layoverMinutes || 0);
  const componentTotal = actualFlightTime + airportTransferTime + waitTime + baggageTime + layoverTime;
  const total = Math.max(Number(source.durationMinutes || source.totalMinutes || 0), componentTotal);
  if (!total) return null;
  return {
    available: true,
    transportType: 'flight',
    durationMinutes: roundTen(total),
    distanceKm: Number(source.distanceKm || 0) || null,
    connectionType: direct ? 'direct' : 'via',
    actualFlightTime: roundTen(actualFlightTime),
    transferTime: roundTen(airportTransferTime),
    waitTime: roundTen(waitTime),
    baggageTime: roundTen(baggageTime),
    layoverTime: roundTen(layoverTime),
    provider: cleanText(source.provider || process.env.WANDERSYNC_FLIGHT_PROVIDER || 'Configured flight API', 120),
    source: cleanText(source.source || FLIGHT_PROVIDER_URL, 500),
    capturedAt: new Date().toISOString(),
    isLive: source.isLive !== false,
    evidenceClass: source.isLive === false ? 'cached-provider' : 'live-provider'
  };
}

function normalizeTransitResult(data) {
  const source = data && (data.route || data.result || data.data || data);
  if (!source || typeof source !== 'object') return null;
  const durationMinutes = Number(source.durationMinutes || source.totalMinutes || 0);
  if (!durationMinutes) return null;
  const transportType = String(source.transportType || source.mode || source.vehicleType || 'transit').toLowerCase();
  const normalizedType = transportType.includes('train') || transportType.includes('rail')
    ? 'train'
    : transportType.includes('bus') || transportType.includes('coach')
      ? 'bus'
      : transportType.includes('mixed')
        ? 'mixed'
        : 'transit';
  const direct = source.direct != null
    ? Boolean(source.direct)
    : String(source.connectionType || '').toLowerCase() === 'direct';
  return {
    available: true,
    transportType: normalizedType,
    durationMinutes: roundTen(durationMinutes),
    distanceKm: Number(source.distanceKm || 0) || null,
    connectionType: direct ? 'direct' : 'via',
    provider: cleanText(source.provider || process.env.WANDERSYNC_TRANSIT_PROVIDER || 'Configured GTFS provider', 120),
    source: cleanText(source.source || GTFS_PROVIDER_URL, 500),
    capturedAt: new Date().toISOString(),
    isLive: source.isLive !== false,
    evidenceClass: source.isLive === false ? 'cached-provider' : 'live-provider'
  };
}

async function computeConfiguredTransit(input) {
  if (!GTFS_PROVIDER_URL) return null;
  const data = await fetchJson(GTFS_PROVIDER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      fromCityId: cleanText(input.fromCityId, 100),
      toCityId: cleanText(input.toCityId, 100),
      departureTime: cleanText(input.departureTime, 40)
    })
  });
  return normalizeTransitResult(data);
}

async function computeConfiguredFlight(input) {
  if (!FLIGHT_PROVIDER_URL) return null;
  const data = await fetchJson(FLIGHT_PROVIDER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fromCityId: cleanText(input.fromCityId, 100),
      toCityId: cleanText(input.toCityId, 100),
      fromAirport: cleanText(input.fromAirport, 10),
      toAirport: cleanText(input.toAirport, 10),
      departureDate: cleanText(input.departureDate, 10),
      preferDirect: true
    })
  });
  return normalizeFlightResult(data);
}

async function computeRoute(input) {
  const mode = String(input.mode || 'TRANSIT').toUpperCase();
  if (mode === 'FLIGHT') return computeConfiguredFlight(input);
  if (GTFS_PROVIDER_URL) {
    const gtfsResult = await computeConfiguredTransit(input);
    if (gtfsResult) return gtfsResult;
  }
  return computeGoogleRoute(input);
}

async function handleApi(req, res, url) {
  if (url.pathname === '/api/health' && req.method === 'GET') {
    return sendJson(res, 200, {
      ok: true,
      service: 'wandersync-api',
      stateStore: 'json-file',
      liveRouting: Boolean(GOOGLE_ROUTES_API_KEY || GTFS_PROVIDER_URL || FLIGHT_PROVIDER_URL),
      remoteSync: true,
      now: new Date().toISOString()
    });
  }
  if (url.pathname === '/api/state' && req.method === 'GET') {
    const current = readState();
    await queueStateWrite(current);
    return sendJson(res, 200, current);
  }
  if (url.pathname === '/api/state' && req.method === 'PUT') {
    try {
      const body = await readJsonBody(req);
      const incoming = body && body.json_payload ? body.json_payload : body;
      if (incoming && Array.isArray(incoming.rooms)) {
        const invalidRoom = incoming.rooms.find(room => !normalizeRoom(room) || isExpiredRoom(room));
        if (invalidRoom) {
          return sendJson(res, 400, { ok: false, error: 'Room payload is invalid or expired.' });
        }
      }
      const merged = mergeState(readState(), incoming);
      const saved = await queueStateWrite(merged);
      return sendJson(res, 200, saved);
    } catch (error) {
      return sendJson(res, error.statusCode || 400, { ok: false, error: error.message || 'Invalid state payload.' });
    }
  }
  if (url.pathname === '/api/route' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      if (!isValidPoint(body.from) || !isValidPoint(body.to)) {
        return sendJson(res, 400, { ok: false, error: 'Two valid coordinates are required.' });
      }
      const result = await computeRoute(body);
      if (!result) return sendJson(res, 503, { ok: false, available: false, evidenceClass: 'unavailable' });
      return sendJson(res, 200, result);
    } catch (error) {
      return sendJson(res, 503, { ok: false, available: false, evidenceClass: 'unavailable', error: error.message || 'Route provider unavailable.' });
    }
  }
  return false;
}

function runtimeConfigScript() {
  const apiBase = String(process.env.WANDERSYNC_PUBLIC_API_BASE || '').replace(/\/$/, '');
  const enabled = process.env.WANDERSYNC_ENABLE_REMOTE_SYNC !== 'false';
  const liveRouting = Boolean(GOOGLE_ROUTES_API_KEY || GTFS_PROVIDER_URL || FLIGHT_PROVIDER_URL);
  const stateUrl = `${apiBase}/api/state` || '/api/state';
  return `window.WANDERSYNC_API_BASE=${JSON.stringify(apiBase)};window.WANDERSYNC_REMOTE_SYNC=${JSON.stringify(enabled ? { getUrl: stateUrl, putUrl: stateUrl } : {})};window.WANDERSYNC_LIVE_ROUTING=${liveRouting};`;
}

function createServer() {
  return http.createServer(async (req, res) => {
    withCors(res);
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    if (url.pathname === '/runtime-config.js') {
      return sendText(res, 200, runtimeConfigScript(), 'application/javascript; charset=utf-8');
    }
    if (url.pathname.startsWith('/api/')) {
      try {
        const handled = await handleApi(req, res, url);
        if (handled !== false) return handled;
      } catch (error) {
        return sendJson(res, 500, { ok: false, error: 'Internal server error.' });
      }
      return sendJson(res, 404, { ok: false, error: 'API route not found.' });
    }
    const requested = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const filePath = path.resolve(ROOT, `.${requested}`);
    if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${path.sep}`)) return sendText(res, 403, 'Forbidden');
    fs.readFile(filePath, (error, data) => {
      if (error) return sendText(res, 404, 'Not found');
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(data);
    });
  });
}

if (require.main === module) {
  createServer().listen(PORT, () => console.log(`Server at http://localhost:${PORT}`));
}

module.exports = { createServer, normalizeState, mergeState, isExpiredRoom, computeGoogleRoute, normalizeFlightResult, normalizeTransitResult };
