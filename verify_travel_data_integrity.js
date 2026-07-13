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
  '\nreturn { CITIES, ATTRACTIONS, CITY_CLUSTERS, CITY_DEFAULT_COORDS, ROUTE_CITY_CENTERS, getTravelData, getBestTransport, getRecommendedStayDays, isBlockedUnopenedPlace, buildCourseStructure, state, getAttractionCoords, getCanonicalPlaceCoordinate, isSyntheticAttractionCoordinate, hasUsableAttractionCoords };'
)();

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const appSource = read('app.js');
const cityPatchSource = read('cities_new_patch.js');
const coursePatchSource = read('city_course_patch.js');
const styleSource = read('style.css');

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

assert(!/delete existing\.x;[\s\S]{0,80}delete existing\.y;/.test(coursePatchSource),
  'city-course patches must not erase valid existing coordinates when an update omits x/y');

const buckingham = Object.values(runtime.ATTRACTIONS.london || {})
  .flatMap(pool => Array.isArray(pool) ? pool : [])
  .find(item => /buckingham palace/i.test(item.name_en || ''));
assert(Boolean(buckingham), 'Buckingham Palace must exist in the London attraction pool');
assert(buckingham && Math.abs(Number(buckingham.x) - (-0.14194444)) < 0.000001,
  `Buckingham Palace longitude must be verified, got ${buckingham && buckingham.x}`);
assert(buckingham && Math.abs(Number(buckingham.y) - 51.50083333) < 0.000001,
  `Buckingham Palace latitude must be verified, got ${buckingham && buckingham.y}`);

const canonicalBuckingham = runtime.getCanonicalPlaceCoordinate({
  name_en: 'Buckingham Palace & Changing of the Guard',
  name_ko: '버킹엄 궁전과 근위병 교대'
}, 'london');
assert(canonicalBuckingham && canonicalBuckingham.coordinateSource === 'canonical-override',
  'Buckingham Palace map rendering must use the canonical coordinate override');
assert(runtime.getCanonicalPlaceCoordinate({ name_en: 'Hyde Park Serpentine Lake Walk' }, 'london') === null,
  'non-Buckingham London places must not inherit the Buckingham Palace override');

const addedDestinationExpectations = {
  frankfurt: {
    names: { ko: '프랑크푸르트', en: 'Frankfurt', fr: 'Francfort', zh: '法兰克福', ja: 'フランクフルト', es: 'Fráncfort' },
    center: { x: 8.6821, y: 50.1109 },
    minimumPlaces: 15
  },
  interlaken: {
    names: { ko: '인터라켄', en: 'Interlaken', fr: 'Interlaken', zh: '因特拉肯', ja: 'インターラーケン', es: 'Interlaken' },
    center: { x: 7.8632, y: 46.6863 },
    minimumPlaces: 11
  }
};

const normalizeIdentity = value => String(value || '')
  .normalize('NFKD')
  .toLowerCase()
  .replace(/[^a-z0-9가-힣\u3040-\u30ff\u3400-\u9fff]+/g, ' ')
  .trim();

Object.entries(addedDestinationExpectations).forEach(([cityId, expected]) => {
  const matches = runtime.CITIES.filter(city => city.id === cityId);
  assert(matches.length === 1, `${cityId} must appear exactly once in CITIES`);
  const city = matches[0] || {};
  Object.entries(expected.names).forEach(([lang, label]) => {
    assert(city[`name_${lang}`] === label, `${cityId} ${lang} name must be ${label}`);
  });
  assert(runtime.CITY_DEFAULT_COORDS[cityId] && runtime.CITY_DEFAULT_COORDS[cityId].x === expected.center.x && runtime.CITY_DEFAULT_COORDS[cityId].y === expected.center.y,
    `${cityId} must have the verified itinerary center`);
  assert(runtime.ROUTE_CITY_CENTERS[cityId] && runtime.ROUTE_CITY_CENTERS[cityId].lon === expected.center.x && runtime.ROUTE_CITY_CENTERS[cityId].lat === expected.center.y,
    `${cityId} must have the verified route-planner center`);
  assert(Array.isArray(runtime.CITY_CLUSTERS[cityId]) && runtime.CITY_CLUSTERS[cityId].length === 3,
    `${cityId} must expose three local lodging clusters`);

  const places = Object.values(runtime.ATTRACTIONS[cityId] || {}).flatMap(pool => Array.isArray(pool) ? pool : []);
  assert(places.length >= expected.minimumPlaces, `${cityId} must have at least ${expected.minimumPlaces} curated places`);
  const seenNames = new Set();
  places.forEach(place => {
    ['ko', 'en', 'fr', 'zh', 'ja', 'es'].forEach(lang => {
      assert(Boolean(place[`name_${lang}`]), `${cityId} place ${place.name_en || place.name_ko} is missing name_${lang}`);
      assert(Boolean(place[`desc_${lang}`]), `${cityId} place ${place.name_en || place.name_ko} is missing desc_${lang}`);
    });
    const identity = normalizeIdentity(place.name_en || place.name_ko);
    assert(identity && !seenNames.has(identity), `${cityId} has a duplicate place identity: ${identity}`);
    seenNames.add(identity);
    assert(place.coordinateSource === 'curated-patch', `${cityId} ${place.name_en || place.name_ko} must use curated coordinates`);
    assert(Number.isFinite(Number(place.x)) && Number.isFinite(Number(place.y)), `${cityId} ${place.name_en || place.name_ko} must have coordinates`);
  });
});

const interlakenAllAttractions = Object.values(runtime.ATTRACTIONS.interlaken || {})
  .flatMap(pool => Array.isArray(pool) ? pool : []);
const interlakenSplitPlaces = [
  'Lauterbrunnen Valley', 'Staubbach Falls', 'Wengen Village Walk',
  'Grindelwald Village', 'Grindelwald-First Viewpoint', 'Bachalpsee Hiking Trail',
  'Jungfraujoch Top of Europe', 'Mürren Village Walk', 'Schilthorn Viewpoint',
  'Lake Brienz Cruise', 'Giessbach Falls', 'Spiez Castle & Lakefront', 'Thun Old Town Walk'
];
interlakenSplitPlaces.forEach(name => {
  assert(
    interlakenAllAttractions.some(p => (p.name_en || '') === name),
    `Interlaken must have individual attraction: ${name}`
  );
});
assert(
  !interlakenAllAttractions.some(p => p.regionalEssential === true),
  'Interlaken must not have any regionalEssential full-day bundles'
);

['relaxed', 'moderate', 'packed'].forEach(pace => {
  runtime.state.travelPace = pace;
  runtime.state.regenConfig = { relaxed: pace === 'relaxed', packed: pace === 'packed', travelPace: pace };
  ['frankfurt', 'interlaken'].forEach(cityId => {
    for (let days = 1; days <= 7; days++) {
      const course = runtime.buildCourseStructure(cityId, days, ['culture', 'healing', 'activity', 'shopping'], null, null);
      assert(course.days.length === days, `${cityId} ${pace} ${days}-day course must preserve the requested day count`);
      course.days.forEach((day, dayIndex) => {
        const sightseeing = (day.items || []).filter(item => item && !item.isMeal && !item.isTransit && !item.isRest && !item.isLodging && !item.isFlexibleBreak);
        if (dayIndex < 6) {
          assert(sightseeing.length > 0, `${cityId} ${pace} day ${dayIndex + 1} must contain sightseeing`);
        }
      });
    }
  });
});

runtime.state.travelPace = 'moderate';
runtime.state.regenConfig = {};
const interlakenSevenDay = runtime.buildCourseStructure('interlaken', 7, ['culture', 'healing', 'activity'], null, null);
assert(interlakenSevenDay.days.length === 7, 'Interlaken 7-day course must have 7 days');
interlakenSevenDay.days.forEach((day, dayIndex) => {
  const sightseeing = (day.items || []).filter(item => item && !item.isMeal && !item.isTransit && !item.isRest && !item.isLodging);
  assert(sightseeing.length > 0, `Interlaken moderate day ${dayIndex + 1} must contain sightseeing`);
});

const frankfurtInterlakenRoute = runtime.getTravelData('frankfurt', 'interlaken');
assert(frankfurtInterlakenRoute && frankfurtInterlakenRoute.train && frankfurtInterlakenRoute.train.time === 315,
  'Frankfurt-Interlaken must use the official direct rail duration of about 5h15m');
assert(runtime.getRecommendedStayDays('frankfurt', false) === '2-4 days', 'Frankfurt recommended stay must be 2-4 days');
assert(runtime.getRecommendedStayDays('interlaken', false) === '4-7 days', 'Interlaken recommended stay must be 4-7 days');

const estimatedLondonPoint = runtime.getAttractionCoords({ name_en: 'Unresolved Test Place' }, 'london');
assert(estimatedLondonPoint.coordinateSource === 'estimated-cluster',
  'missing place coordinates must be labelled as estimated-cluster');
assert(runtime.isSyntheticAttractionCoordinate({
  name_en: 'Unresolved Test Place',
  x: estimatedLondonPoint.x,
  y: estimatedLondonPoint.y
}, 'london'), 'legacy deterministic cluster coordinates must be detected as synthetic');
assert(/await resolveVerifiedMapCoordinate\(item, cityId\)/.test(appSource),
  'itinerary map rendering must resolve verified coordinates before adding markers');
assert(!/body\.theme-postcard-pop \.route-stop-marker,/.test(styleSource),
  'Postcard Pop must not paint the route-stop marker column as an accent block');

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
