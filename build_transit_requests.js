const fs = require('fs');
const path = require('path');

const root = __dirname;
const readJson = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

function normalize(value) {
  let text = String(value || '');
  try { text = decodeURIComponent(text); } catch (_) { /* keep original */ }
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function coordinate(value) {
  if (!value) return null;
  const x = Number(value.x);
  const y = Number(value.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  if (x < -180 || x > 180 || y < -90 || y > 90) return null;
  return { x, y, source: String(value.source || 'curated-data') };
}

const aliases = new Map();
function addAlias(cityId, name, value) {
  const point = coordinate(value);
  const key = `${String(cityId || '').toLowerCase()}|${normalize(name)}`;
  if (!key || key.endsWith('|') || !point) return;
  const existing = aliases.get(key);
  if (!existing || existing.source === 'estimated-cluster') aliases.set(key, point);
}

for (const [key, value] of Object.entries(readJson('browser_place_coordinates.json'))) {
  const separator = key.indexOf('|');
  if (separator < 1) continue;
  addAlias(key.slice(0, separator), key.slice(separator + 1), value);
}

const legacy = readJson('place_coordinates.json');
for (const [key, value] of Object.entries(legacy.resolved || {})) {
  const separator = key.indexOf('|');
  if (separator < 1) continue;
  addAlias(key.slice(0, separator), key.slice(separator + 1), value);
}

const input = readJson('transit_pairs.json');
const routes = [];
const unresolved = [];

for (const pair of input.pairs || []) {
  const from = coordinate(pair.fromCoord) || aliases.get(`${pair.cityId}|${normalize(pair.from)}`) || null;
  const to = coordinate(pair.toCoord) || aliases.get(`${pair.cityId}|${normalize(pair.to)}`) || null;
  const record = {
    key: pair.key,
    cityId: pair.cityId,
    from: pair.from,
    to: pair.to,
    fromCoord: from,
    toCoord: to,
    straightLineKm: Number(pair.straightLineKm || (from && to ? 0 : 0))
  };
  if (!from || !to) {
    unresolved.push(record);
  } else {
    routes.push(record);
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  totalPairs: input.pairs.length,
  resolvedPairs: routes.length,
  unresolvedPairs: unresolved.length,
  routes,
  unresolved
};
fs.writeFileSync(path.join(root, 'transit_route_requests.json'), JSON.stringify(output, null, 2));
console.log(JSON.stringify({
  aliases: aliases.size,
  hasPantheon: aliases.has('rome|pantheon dome oculus visit'),
  hasEmpire: aliases.has('newyork|empire state building observatory'),
  totalPairs: output.totalPairs,
  resolvedPairs: output.resolvedPairs,
  unresolvedPairs: output.unresolvedPairs,
  unresolvedSample: unresolved.slice(0, 12).map(item => `${item.cityId}: ${item.from} -> ${item.to}`)
}, null, 2));
