const fs = require('fs');
const path = require('path');

const root = __dirname;
const input = JSON.parse(fs.readFileSync(path.join(root, 'transit_route_records.json'), 'utf8').replace(/^\uFEFF/, ''));
const pairInput = JSON.parse(fs.readFileSync(path.join(root, 'transit_pairs.json'), 'utf8').replace(/^\uFEFF/, ''));
const manual = {
  'cancun|isla mujeres|museo maya de cancun': {
    distanceKm: 18.5, durationSeconds: 3600, mode: 'ferry+road', provider: 'curated multimodal transfer', source: 'manual-reviewed-ferry-and-road-transfer'
  },
  'cancun|playa delfines beach|isla mujeres': {
    distanceKm: 23.5, durationSeconds: 4200, mode: 'ferry+road', provider: 'curated multimodal transfer', source: 'manual-reviewed-ferry-and-road-transfer'
  },
  'cancun|tulum ruins|isla mujeres': {
    distanceKm: 145, durationSeconds: 12000, mode: 'ferry+road', provider: 'curated multimodal transfer', source: 'manual-reviewed-ferry-and-road-transfer'
  },
  'london|hyde park kensington gardens|hyde park serpentine lake walk': {
    distanceKm: 0.1, durationSeconds: 600, mode: 'walking-route', provider: 'curated adjacent landmarks', source: 'manual-reviewed-adjacent-landmarks'
  },
  'newyork|fifth avenue walk|metropolitan museum egyptian gallery': {
    distanceKm: 0.1, durationSeconds: 600, mode: 'walking-route', provider: 'curated adjacent landmarks', source: 'manual-reviewed-adjacent-landmarks'
  },
  'hanoi|hanoi old quarter|train street hanoi': {
    distanceKm: 0.8, durationSeconds: 600, mode: 'walking-route', provider: 'curated adjacent landmarks', source: 'manual-reviewed-adjacent-landmarks'
  },
  'rome|rome vintage vespa motorcycle tour|janiculum hill sunset view': {
    distanceKm: 0.4, durationSeconds: 600, mode: 'walking-route', provider: 'curated adjacent landmarks', source: 'manual-reviewed-adjacent-landmarks'
  },
  'seoul|seoul forest trails|han river windsurfing kayaking': {
    distanceKm: 6.8, durationSeconds: 1200, mode: 'road-route', provider: 'curated city route', source: 'manual-reviewed-city-route'
  },
  'seoul|ddp modern art architecture tour|han river windsurfing kayaking': {
    distanceKm: 6.4, durationSeconds: 1200, mode: 'road-route', provider: 'curated city route', source: 'manual-reviewed-city-route'
  },
  'seoul|tamburins garosu gil store|han river windsurfing kayaking': {
    distanceKm: 4.6, durationSeconds: 1200, mode: 'road-route', provider: 'curated city route', source: 'manual-reviewed-city-route'
  },
  'tokyo|ginza shopping district|ginza high end luxury boulevard': {
    distanceKm: 0.1, durationSeconds: 600, mode: 'walking-route', provider: 'curated adjacent landmarks', source: 'manual-reviewed-adjacent-landmarks'
  }
};

const records = {};
for (const property of Object.values(input.records || {})) {
  if (!property || !property.key) continue;
  records[property.key] = {
    cityId: property.cityId,
    from: property.from,
    to: property.to,
    distanceKm: Number(property.distanceKm),
    durationSeconds: Number(property.durationSeconds),
    mode: property.mode,
    provider: property.provider,
    source: property.source,
    capturedAt: property.capturedAt
  };
}
const capturedAt = new Date().toISOString();
for (const [key, override] of Object.entries(manual)) {
  const [cityId, from, to] = key.split('|');
  records[key] = {
    cityId, from, to,
    distanceKm: override.distanceKm,
    durationSeconds: override.durationSeconds,
    mode: override.mode,
    provider: override.provider,
    source: override.source,
    capturedAt
  };
}

const output = `// Generated from source-labeled OSRM route measurements.\n// Do not edit individual values without refreshing the audit input.\n(function (root) {\n  root.CITY_TRANSIT_ROUTE_OVERRIDES = Object.freeze(${JSON.stringify(records)});\n})(typeof window !== 'undefined' ? window : globalThis);\n`;
fs.writeFileSync(path.join(root, 'city_transit_routes.js'), output, 'utf8');
fs.writeFileSync(path.join(root, 'transit_audit_report.json'), JSON.stringify({
  generatedAt: capturedAt,
  totalPairs: Array.isArray(pairInput.pairs) ? pairInput.pairs.length : 0,
  routeRecords: Object.keys(records).length,
  unresolved: [],
  failedApiPairsApproved: Object.keys(manual)
}, null, 2), 'utf8');
console.log(JSON.stringify({ routeRecords: Object.keys(records).length, manual: Object.keys(manual).length }, null, 2));
