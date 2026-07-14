const fs = require('fs');
const path = require('path');
const https = require('https');

const root = __dirname;
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const runtimeFiles = [
  'mockData.js',
  'mockdata_patch.js',
  'cities_new_patch.js',
  'route_optimizer.js',
  'app.js',
  'city_course_patch.js'
];

const browserStubs = `
  Math.random = () => 0.5;
  var window = { addEventListener: () => {}, location: { href: '' } };
  var document = {
    readyState: 'loading', addEventListener: () => {}, getElementById: () => null,
    querySelector: () => null, querySelectorAll: () => [],
    documentElement: { lang: 'en', style: { setProperty: () => {} } },
    body: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } }
  };
  var history = { replaceState: () => {}, pushState: () => {} };
  var location = { hash: '', search: '', pathname: '', href: '' };
  var navigator = { language: 'en', clipboard: null };
  var localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  var sessionStorage = localStorage;
  var fetch = () => Promise.reject(new Error('network disabled in route extraction'));
  var alert = () => {};
  var confirm = () => true;
  var URLSearchParams = globalThis.URLSearchParams;
  var setTimeout = () => 0;
  var clearTimeout = () => {};
`;

const runtime = new Function(
  browserStubs + runtimeFiles.map(read).join('\n') +
  '\nreturn { CITIES, buildCourseStructure, getRealSightseeingItems, isSyntheticAttractionCoordinate, getAttractionCoords, getCityCenterCluster, normalizeCoordinateLookupText, repairMojibakeText, state };'
)();

const paceConfig = {
  relaxed: { relaxed: true, packed: false, travelPace: 'relaxed' },
  moderate: { relaxed: false, packed: false, travelPace: 'moderate' },
  packed: { relaxed: false, packed: true, travelPace: 'packed' }
};

const cleanName = item => String(item && (item.name_en || item.name_ko || item.name) || '')
  .replace(/\s+/g, ' ')
  .trim();

const normalizeName = item => runtime.normalizeCoordinateLookupText(cleanName(item));

const cityById = new Map(runtime.CITIES.map(city => [city.id, city]));

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function requestJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: { 'User-Agent': 'WanderSync route audit/1.0', Accept: 'application/json' }
    }, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => {
        if (response.statusCode < 200 || response.statusCode >= 300) return resolve(null);
        try { resolve(JSON.parse(body)); } catch (error) { reject(error); }
      });
    });
    request.setTimeout(12000, () => request.destroy(new Error('request timeout')));
    request.on('error', reject);
  });
}

async function fetchWikipediaCoordinate(placeName, cityId) {
  const city = cityById.get(cityId) || {};
  const repairedName = runtime.repairMojibakeText ? runtime.repairMojibakeText(placeName) : placeName;
  const cityName = city.name_en || city.name_ko || cityId;
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'search',
    gsrnamespace: '0',
    gsrlimit: '8',
    gsrsearch: `${repairedName} ${cityName}`,
    prop: 'coordinates'
  });
  const payload = await requestJson(`https://en.wikipedia.org/w/api.php?${params.toString()}`);
  if (!payload) return null;
  const pages = Object.values((payload.query && payload.query.pages) || {});
  const cityCenter = city.x != null && city.y != null ? { x: Number(city.x), y: Number(city.y) } : null;
  const targetTokens = runtime.normalizeCoordinateLookupText(repairedName).split(' ').filter(token => token.length >= 3);
  const scored = pages.map((page, index) => {
    const coordinates = page.coordinates && page.coordinates[0];
    if (!coordinates) return null;
    const point = { x: Number(coordinates.lon), y: Number(coordinates.lat) };
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return null;
    const title = runtime.normalizeCoordinateLookupText(page.title || '');
    const overlap = targetTokens.filter(token => title.includes(token)).length;
    const distance = cityCenter ? haversineKm(cityCenter, point) : 0;
    const maxDistance = cityId === 'reykjavik' ? 700 : 120;
    if (cityCenter && distance > maxDistance) return null;
    return { point, overlap, distance, index, title: page.title };
  }).filter(Boolean).sort((a, b) => b.overlap - a.overlap || a.distance - b.distance || a.index - b.index);
  return scored[0] || null;
}

async function fetchPhotonCoordinate(placeName, cityId) {
  const city = cityById.get(cityId) || {};
  const repairedName = runtime.repairMojibakeText ? runtime.repairMojibakeText(placeName) : placeName;
  const cityName = city.name_en || city.name_ko || cityId;
  const payload = await requestJson(`https://photon.komoot.io/api/?limit=8&q=${encodeURIComponent(`${repairedName} ${cityName}`)}`);
  if (!payload) return null;
  const center = runtime.getCityCenterCluster(cityId);
  const cityTokens = runtime.normalizeCoordinateLookupText(cityName).split(' ').filter(token => token.length >= 3);
  const targetTokens = runtime.normalizeCoordinateLookupText(repairedName).split(' ').filter(token => token.length >= 3);
  const maxDistance = cityId === 'reykjavik' ? 700 : 120;
  const scored = (payload.features || []).map((feature, index) => {
    const coordinates = feature.geometry && feature.geometry.coordinates;
    if (!Array.isArray(coordinates) || coordinates.length < 2) return null;
    const point = { x: Number(coordinates[0]), y: Number(coordinates[1]) };
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) return null;
    const properties = feature.properties || {};
    const label = runtime.normalizeCoordinateLookupText([properties.name, properties.street, properties.city].filter(Boolean).join(' '));
    const overlap = targetTokens.filter(token => label.includes(token)).length;
    const cityOverlap = cityTokens.filter(token => label.includes(token)).length;
    const distance = center ? haversineKm(center, point) : 0;
    if (overlap === 0 || (center && distance > maxDistance)) return null;
    return { point, overlap, cityOverlap, distance, index, title: properties.name || label };
  }).filter(Boolean).sort((a, b) => b.overlap - a.overlap || b.cityOverlap - a.cityOverlap || a.distance - b.distance || a.index - b.index);
  return scored[0] || null;
}

async function geocodeUnresolvedPairs(inputFile, outputFile) {
  const input = JSON.parse(fs.readFileSync(path.join(root, inputFile), 'utf8'));
  const places = new Map();
  input.pairs.filter(pair => pair.unresolved).forEach(pair => {
    [pair.from, pair.to].forEach(name => places.set(`${pair.cityId}|${name}`, { cityId: pair.cityId, name }));
  });
  const entries = Array.from(places.values());
  const resolved = {};
  const failed = [];
  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    try {
      const result = await fetchWikipediaCoordinate(entry.name, entry.cityId);
      const key = `${entry.cityId}|${runtime.normalizeCoordinateLookupText(entry.name)}`;
      if (result) resolved[key] = { ...result.point, source: 'wikipedia-coordinate', title: result.title };
      else failed.push(entry);
    } catch (error) {
      failed.push({ ...entry, error: error.message });
    }
    if ((index + 1) % 20 === 0) console.log(`Geocoded ${index + 1}/${entries.length}; unresolved ${failed.length}`);
    await wait(120);
  }
  fs.writeFileSync(path.join(root, outputFile), JSON.stringify({ generatedAt: new Date().toISOString(), resolved, failed }, null, 2));
  console.log(`Geocoded ${Object.keys(resolved).length}/${entries.length} unique place names.`);
  console.log(`Still unresolved: ${failed.length}`);
}

async function photonRetry(inputFile, outputFile) {
  const input = JSON.parse(fs.readFileSync(path.join(root, inputFile), 'utf8'));
  const resolved = { ...(input.resolved || {}) };
  const failed = [];
  for (let index = 0; index < (input.failed || []).length; index += 1) {
    const entry = input.failed[index];
    try {
      const result = await fetchPhotonCoordinate(entry.name, entry.cityId);
      const key = `${entry.cityId}|${runtime.normalizeCoordinateLookupText(entry.name)}`;
      if (result) resolved[key] = { ...result.point, source: 'photon-osm-coordinate', title: result.title };
      else failed.push(entry);
    } catch (error) {
      failed.push({ ...entry, error: error.message });
    }
    if ((index + 1) % 20 === 0) console.log(`Photon geocoded ${index + 1}/${input.failed.length}; unresolved ${failed.length}`);
    await wait(80);
  }
  fs.writeFileSync(path.join(root, outputFile), JSON.stringify({ generatedAt: new Date().toISOString(), resolved, failed }, null, 2));
  console.log(`Photon added ${Object.keys(resolved).length - Object.keys(input.resolved || {}).length} coordinates.`);
  console.log(`Still unresolved: ${failed.length}`);
}

const haversineKm = (a, b) => {
  const toRad = value => Number(value) * Math.PI / 180;
  const lat1 = toRad(a.y);
  const lat2 = toRad(b.y);
  const dLat = lat2 - lat1;
  const dLon = toRad(b.x) - toRad(a.x);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

const getCoordinate = (item, cityId) => {
  if (!item) return null;
  const coords = runtime.getAttractionCoords(item, cityId);
  if (!coords || !Number.isFinite(Number(coords.x)) || !Number.isFinite(Number(coords.y))) return null;
  if (coords.coordinateSource === 'estimated-cluster') return null;
  if (Number.isFinite(Number(item.x)) && Number.isFinite(Number(item.y)) && runtime.isSyntheticAttractionCoordinate(item, cityId)) return null;
  return { x: Number(coords.x), y: Number(coords.y) };
};

function collectPairs() {
  const pairs = new Map();
  runtime.CITIES.forEach(city => {
    ['relaxed', 'moderate', 'packed'].forEach(pace => {
      runtime.state.travelPace = pace;
      runtime.state.regenConfig = paceConfig[pace];
      for (let days = 1; days <= 7; days += 1) {
        const course = runtime.buildCourseStructure(city.id, days, ['culture', 'healing', 'activity', 'shopping'], null, null);
        course.days.forEach(day => {
          const sightseeing = runtime.getRealSightseeingItems(day) || [];
          for (let index = 1; index < sightseeing.length; index += 1) {
            const from = sightseeing[index - 1];
            const to = sightseeing[index];
            const fromCoord = getCoordinate(from, city.id);
            const toCoord = getCoordinate(to, city.id);
            const key = `${city.id}|${normalizeName(from)}|${normalizeName(to)}`;
            if (!fromCoord || !toCoord) {
              pairs.set(key, {
                key,
                cityId: city.id,
                from: cleanName(from),
                to: cleanName(to),
                fromCoord,
                toCoord,
                unresolved: true
              });
              continue;
            }
            if (!pairs.has(key)) {
              pairs.set(key, {
                key,
                cityId: city.id,
                from: cleanName(from),
                to: cleanName(to),
                fromCoord,
                toCoord,
                straightLineKm: Number(haversineKm(fromCoord, toCoord).toFixed(3)),
                unresolved: false
              });
            }
          }
        });
      }
    });
  });
  return Array.from(pairs.values()).sort((a, b) => a.key.localeCompare(b.key));
}

function main() {
  if (process.argv[2] === '--geocode') {
    geocodeUnresolvedPairs(process.argv[3] || 'transit_pairs.json', process.argv[4] || 'place_coordinates.json')
      .catch(error => { console.error(error); process.exitCode = 1; });
    return;
  }
  if (process.argv[2] === '--photon') {
    photonRetry(process.argv[3] || 'place_coordinates.json', process.argv[4] || 'place_coordinates.json')
      .catch(error => { console.error(error); process.exitCode = 1; });
    return;
  }
  const output = process.argv[2] || 'transit_pairs.json';
  const pairs = collectPairs();
  fs.writeFileSync(path.join(root, output), JSON.stringify({ generatedAt: new Date().toISOString(), pairs }, null, 2));
  const unresolved = pairs.filter(pair => pair.unresolved);
  console.log(`Collected ${pairs.length} unique city transit pairs across ${runtime.CITIES.length} cities.`);
  console.log(`Unresolved pairs: ${unresolved.length}`);
  if (unresolved.length) unresolved.slice(0, 20).forEach(pair => console.log(`- ${pair.key}`));
}

main();
