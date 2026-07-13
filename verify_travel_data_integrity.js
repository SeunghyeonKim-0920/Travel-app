const fs = require('fs');
const path = require('path');

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
  var window = { addEventListener: () => {}, location: { href: '' } };
  var document = {
    readyState: 'loading',
    addEventListener: () => {},
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    documentElement: { lang: 'en', style: { setProperty: () => {} } },
    body: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } }
  };
  var history = { replaceState: () => {}, pushState: () => {} };
  var location = { hash: '', search: '', pathname: '', href: '' };
  var navigator = { language: 'en', clipboard: null };
  var localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  var sessionStorage = localStorage;
  var fetch = () => Promise.reject(new Error('network disabled in static audit'));
  var alert = () => {};
  var confirm = () => true;
  var URLSearchParams = globalThis.URLSearchParams;
  var setTimeout = () => 0;
  var clearTimeout = () => {};
`;

const runtime = new Function(
  browserStubs + runtimeFiles.map(read).join('\n') +
  '\nreturn { CITIES, ATTRACTIONS, getTravelData, getBestTransport, isBlockedUnopenedPlace, buildCourseStructure, state };'
)();

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const appSource = read('app.js');
const cityPatchSource = read('cities_new_patch.js');

let placeCount = 0;
runtime.CITIES.forEach(city => {
  const pools = runtime.ATTRACTIONS[city.id] || {};
  Object.keys(pools).forEach(category => {
    if (!Array.isArray(pools[category])) return;
    pools[category].forEach((item, index) => {
      placeCount++;
      const label = `${city.id}.${category}[${index}]`;
      assert(Boolean(item && (item.name_en || item.name_ko || item.name)), `${label} has no name`);
      assert(Number.isFinite(Number(item.duration)) && Number(item.duration) > 0, `${label} has invalid duration`);
      assert(!runtime.isBlockedUnopenedPlace(item), `${label} contains a blocked unopened place`);
      if (item.x != null || item.y != null) {
        assert(Number.isFinite(Number(item.x)) && Number(item.x) >= -180 && Number(item.x) <= 180,
          `${label} has invalid longitude`);
        assert(Number.isFinite(Number(item.y)) && Number(item.y) >= -90 && Number(item.y) <= 90,
          `${label} has invalid latitude`);
      }
    });
  });
});

const dubaiMallEntries = [];
Object.values(runtime.ATTRACTIONS.dubai || {}).forEach(pool => {
  if (!Array.isArray(pool)) return;
  pool.forEach(item => {
    const title = `${item.name_en || ''} ${item.name_ko || ''}`.toLowerCase();
    if (/dubai mall|\uB450\uBC14\uC774\s*\uBAB0/i.test(title)) dubaiMallEntries.push(item);
  });
});
assert(dubaiMallEntries.length > 0, 'Dubai Mall must exist in the curated Dubai pool');
dubaiMallEntries.forEach(item => {
  assert(Number(item.duration) === 240, `Dubai Mall duration must be 240, got ${item.duration}`);
});
assert(/Dubai Mall & Dubai Fountain Show[\s\S]{0,180}duration:240[\s\S]{0,180}durationSource:'curated-venue-guidance'/.test(cityPatchSource),
  'Dubai Mall source record must carry the 240-minute curated guidance');
assert(/if \(item\.durationSource === 'curated-venue-guidance'\) return dur;/.test(appSource),
  'pace adjustment must preserve curated venue guidance');
assert(/supportsOnSiteMealBreak\(candidate\)[\s\S]{0,500}minEnd \+ transitCandToLunch > 840/.test(appSource),
  'lunch fit logic must preserve an on-site Dubai Mall meal through 14:00');
assert(/if \(cityId !== 'custom' && \(isKnownCity \|\| ATTRACTIONS\[cityId\]\)\) return false;/.test(appSource),
  'supported cities must not use unverified Wikipedia place supplementation');

const outbound = runtime.getTravelData('munich', 'barcelona');
const inbound = runtime.getTravelData('barcelona', 'munich');
assert(outbound && outbound.train && outbound.train.time === 880, 'Munich-Barcelona train must be 880 minutes');
assert(inbound && inbound.train && inbound.train.time === 820, 'Barcelona-Munich train must be 820 minutes');
assert(outbound && outbound.train.connectionType === 'via', 'Munich-Barcelona train must be marked via');
assert(inbound && inbound.train.connectionType === 'via', 'Barcelona-Munich train must be marked via');
assert(outbound && outbound.flight && outbound.flight.time === 460, 'Munich-Barcelona flight must be 460 minutes door-to-door');
assert(inbound && inbound.flight && inbound.flight.time === 460, 'Barcelona-Munich flight must be 460 minutes door-to-door');
assert(runtime.getBestTransport(outbound).best.type === 'flight', 'Munich-Barcelona must select flight');
assert(runtime.getBestTransport(inbound).best.type === 'flight', 'Barcelona-Munich must select flight');
assert(!/TGV\+ICE 7h/.test(read('route_optimizer.js')), 'obsolete seven-hour rail note must be removed');

['relaxed', 'moderate', 'packed'].forEach(pace => {
  runtime.state.travelPace = pace;
  runtime.state.regenConfig = {
    relaxed: pace === 'relaxed',
    packed: pace === 'packed',
    travelPace: pace
  };
  const course = runtime.buildCourseStructure('dubai', 7, ['culture', 'shopping', 'healing'], null, null);
  const items = course.days.flatMap(day => day.items || []);
  const scheduledMall = items.filter(item => /dubai mall|\uB450\uBC14\uC774\s*\uBAB0/i.test(`${item.name_en || ''} ${item.name_ko || ''}`));
  assert(scheduledMall.length === 1, `${pace} course must schedule Dubai Mall exactly once`);
  scheduledMall.forEach(item => assert(Number(item.duration) === 240,
    `${pace} Dubai Mall schedule must remain 240 minutes, got ${item.duration}`));
  assert(!items.some(item => runtime.isBlockedUnopenedPlace(item)), `${pace} course contains a blocked unopened place`);
});

if (failures.length) {
  process.stderr.write(`FAIL travel data integrity (${failures.length})\n`);
  failures.forEach(message => process.stderr.write(`- ${message}\n`));
  process.exit(1);
}

process.stdout.write(`PASS travel data integrity (${placeCount} curated records)\n`);
