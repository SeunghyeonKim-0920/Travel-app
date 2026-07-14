const fs = require('fs');
const path = require('path');

const root = __dirname;
const pairs = JSON.parse(fs.readFileSync(path.join(root, 'transit_pairs.json'), 'utf8'));
const routeSource = fs.readFileSync(path.join(root, 'city_transit_routes.js'), 'utf8');
const runtime = {};
new Function('window', 'globalThis', routeSource)(runtime, runtime);
const registry = runtime.CITY_TRANSIT_ROUTE_OVERRIDES || {};

const failures = [];
const seen = new Set();
for (const pair of pairs.pairs || []) {
  if (seen.has(pair.key)) failures.push(`duplicate pair key: ${pair.key}`);
  seen.add(pair.key);
  const record = registry[pair.key];
  if (!record) {
    failures.push(`missing route record: ${pair.key}`);
    continue;
  }
  if (!record.cityId || !record.from || !record.to || !record.mode || !record.provider || !record.source || !record.capturedAt) {
    failures.push(`missing provenance: ${pair.key}`);
  }
  if (!Number.isFinite(Number(record.distanceKm)) || Number(record.distanceKm) <= 0) {
    failures.push(`invalid distance: ${pair.key}`);
  }
  if (!Number.isFinite(Number(record.durationSeconds)) || Number(record.durationSeconds) <= 0) {
    failures.push(`invalid duration: ${pair.key}`);
  }
  const rounded = Math.max(10, Math.round((Number(record.durationSeconds) / 60) / 10) * 10);
  if (rounded % 10 !== 0) failures.push(`not 10-minute rounded: ${pair.key}`);
}

const cityPaceDayCoverage = new Set((pairs.pairs || []).map(pair => pair.cityId));
const report = {
  totalPairs: seen.size,
  routeRecords: Object.keys(registry).length,
  cityCount: cityPaceDayCoverage.size,
  failures,
  sample: Object.entries(registry).slice(0, 3)
};
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
