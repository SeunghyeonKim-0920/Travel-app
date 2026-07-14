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
  Math.random = () => 0.5;
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
  var fetch = () => Promise.reject(new Error('network disabled in coverage audit'));
  var alert = () => {};
  var confirm = () => true;
  var URLSearchParams = globalThis.URLSearchParams;
  var setTimeout = () => 0;
  var clearTimeout = () => {};
`;

const runtime = new Function(
  browserStubs + runtimeFiles.map(read).join('\n') +
  '\nreturn { CITIES, buildCourseStructure, state, getRealSightseeingItems, isNearbyDayTripItem, isInvalidGeneratedPlaceForCity, getGlobalPlaceKeys, placeKeysOverlap };'
)();

const failures = [];
const summaries = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const normalizeName = value => String(value || '')
  .normalize('NFKD')
  .toLowerCase()
  .replace(/[^a-z0-9\u3131-\uD79D\u3040-\u30ff\u3400-\u9fff]+/g, ' ')
  .trim();

runtime.state.travelPace = 'moderate';
runtime.state.regenConfig = { travelPace: 'moderate' };

runtime.CITIES.forEach(city => {
  const course = runtime.buildCourseStructure(
    city.id,
    7,
    ['culture', 'healing', 'activity', 'shopping'],
    null,
    null
  );
  const sightseeingByDay = course.days.map(day => runtime.getRealSightseeingItems(day));
  assert(sightseeingByDay[0] && sightseeingByDay[0].length > 0, `${city.id}: day 1 has no sightseeing`);
  assert(sightseeingByDay[1] && sightseeingByDay[1].length > 0, `${city.id}: day 2 has no sightseeing`);

  const nearbyDayIndexes = [];
  const localDayIndexes = [];
  const usedNames = new Set();
  const usedKeyGroups = [];
  sightseeingByDay.forEach((items, dayIndex) => {
    const hasNearby = items.some(runtime.isNearbyDayTripItem);
    const hasLocal = items.some(item => !runtime.isNearbyDayTripItem(item));
    if (hasNearby) nearbyDayIndexes.push(dayIndex);
    if (hasLocal) localDayIndexes.push(dayIndex);

    items.forEach(item => {
      const label = item.name_en || item.name_ko || item.name || '(unnamed)';
      assert(!item.isFallbackExploration, `${city.id}: invented fallback place scheduled on day ${dayIndex + 1}`);
      if (!runtime.isNearbyDayTripItem(item)) {
        assert(!runtime.isInvalidGeneratedPlaceForCity(item, city.id), `${city.id}: invalid or foreign place scheduled: ${label}`);
      }

      const normalized = normalizeName(label);
      assert(normalized && !usedNames.has(normalized), `${city.id}: duplicate place scheduled: ${label}`);
      usedNames.add(normalized);

      const keys = item.regionalRoute
        ? [`regional:${item.regionalRoute}:${Number(item.regionalStopOrder) || 0}`]
        : runtime.getGlobalPlaceKeys(item);
      assert(!usedKeyGroups.some(existing => runtime.placeKeysOverlap(keys, existing)),
        `${city.id}: overlapping place alias scheduled more than once: ${label}`);
      usedKeyGroups.push(keys);
    });
  });

  assert(nearbyDayIndexes.length <= 2, `${city.id}: more than two nearby-trip days scheduled`);
  if (nearbyDayIndexes.length && localDayIndexes.length) {
    assert(Math.min(...nearbyDayIndexes) > Math.max(...localDayIndexes),
      `${city.id}: nearby trip scheduled before remaining local sightseeing`);
  }
  summaries.push({
    cityId: city.id,
    sightseeingCounts: sightseeingByDay.map(items => items.length),
    nearbyDays: nearbyDayIndexes.length
  });
});

if (failures.length) {
  console.error(`FAIL course coverage (${failures.length})`);
  failures.forEach(message => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  const sparseLateDays = summaries.reduce((sum, city) =>
    sum + city.sightseeingCounts.slice(2).filter(count => count === 0).length, 0);
  console.log(`PASS course coverage (${summaries.length} cities, ${sparseLateDays} intentionally empty late days)`);
}
