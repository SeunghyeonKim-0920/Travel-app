const fs = require('fs');

const root = __dirname;
const read = file => fs.readFileSync(`${root}/${file}`, 'utf8');
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
  var fetch = () => Promise.reject(new Error('network disabled in accuracy audit'));
  var alert = () => {};
  var confirm = () => true;
  var URLSearchParams = globalThis.URLSearchParams;
  var setTimeout = () => 0;
  var clearTimeout = () => {};
`;

const runtime = new Function(
  browserStubs + runtimeFiles.map(read).join('\n') +
  '\nreturn { CITIES, buildCourseStructure, calculateTransit, getLandMapFallbackCoordinate, isNightViewItineraryItem, isSunsetItineraryItem };'
)();

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const realItems = day => (day.items || []).filter(item => item && !item.isTransit && !item.isRest && !item.isLodging && !item.mealType);
const itemText = item => `${item.name_en || ''} ${item.name_ko || ''}`.toLowerCase();
const startMinutes = value => {
  const match = String(value || '').match(/(\d{1,2}):(\d{2})/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
};

const budapest = runtime.buildCourseStructure('budapest', 5, ['culture', 'healing', 'activity', 'shopping'], null, null);
budapest.days.forEach(day => {
  const lunch = day.items.find(item => String(item.name_en || '').toLowerCase().includes('lunch'));
  const dinner = day.items.find(item => String(item.name_en || '').toLowerCase().includes('dinner'));
  if (lunch) assert(startMinutes(lunch.timeSlot) >= 690 && startMinutes(lunch.timeSlot) <= 840, `Budapest lunch outside 11:30-14:00 on day ${day.day}`);
  if (dinner) assert(startMinutes(dinner.timeSlot) >= 1080 && startMinutes(dinner.timeSlot) <= 1260, `Budapest dinner outside 18:00-21:00 on day ${day.day}`);
});
const parliamentDay = budapest.days.find(day => day.items.some(item => /hungarian parliament/i.test(item.name_en || '')));
if (parliamentDay) {
  const dinnerIndex = parliamentDay.items.findIndex(item => /dinner/i.test(item.name_en || ''));
  const parliamentIndex = parliamentDay.items.findIndex(item => /hungarian parliament/i.test(item.name_en || ''));
  assert(dinnerIndex >= 0 && parliamentIndex > dinnerIndex, 'Budapest Parliament is not after dinner');
}

const shanghai = runtime.buildCourseStructure('shanghai', 5, ['culture', 'healing', 'activity', 'shopping'], null, null);
const bundDay = shanghai.days.find(day => day.items.some(item => /bund waterfront promenade/i.test(item.name_en || '')));
if (bundDay) {
  const dinnerIndex = bundDay.items.findIndex(item => /dinner/i.test(item.name_en || ''));
  const bundIndex = bundDay.items.findIndex(item => /bund waterfront promenade/i.test(item.name_en || ''));
  assert(dinnerIndex >= 0 && bundIndex > dinnerIndex, 'Shanghai Bund night walk is not after dinner');
}

const rome = runtime.buildCourseStructure('rome', 5, ['culture', 'healing', 'activity', 'shopping'], null, null);
const sunsetItem = rome.days.flatMap(day => day.items).find(item => /janiculum hill sunset/i.test(item.name_en || ''));
assert(sunsetItem && Number(sunsetItem.lockedStartMin) >= 1020, 'Rome sunset activity was not anchored to an evening start');

const sydney = runtime.buildCourseStructure('sydney', 7, ['culture', 'healing', 'activity', 'shopping'], null, null);
const sydneyItems = sydney.days.flatMap(realItems);
const mapMarkers = sydneyItems.map(item => runtime.getLandMapFallbackCoordinate(item, 'sydney'));
assert(mapMarkers.length === sydneyItems.length, 'Sydney map fallback did not return one point per place');
assert(mapMarkers.every(point => point && point.coordinateSource !== 'estimated-cluster'), 'Sydney map contains an unlabelled estimated-cluster point');
const opera = { name_en: 'Sydney Opera House Inside Tour', cityId: 'sydney' };
const bridge = { name_en: 'Sydney BridgeClimb Adventure', cityId: 'sydney' };
const adjacent = runtime.calculateTransit(opera, bridge);
assert(adjacent.distance <= 2 && adjacent.duration <= 20, `Sydney adjacent landmarks still use an implausible transfer: ${adjacent.distance}km/${adjacent.duration}m`);

const iceland = runtime.buildCourseStructure('reykjavik', 7, ['culture', 'healing', 'activity', 'shopping'], null, null);
const expectedRegions = new Map([
  [2, 'golden-circle'], [3, 'south-coast'], [4, 'southeast'], [5, 'north'], [6, 'west-snaefellsnes']
]);
expectedRegions.forEach((region, dayNumber) => {
  const day = iceland.days.find(candidate => candidate.day === dayNumber);
  const regions = new Set(realItems(day || { items: [] }).map(item => item.ringRoadRegion).filter(Boolean));
  assert(regions.size <= 1 && (!regions.size || regions.has(region)), `Iceland day ${dayNumber} mixes regional stops`);
});
const day4Names = realItems(iceland.days.find(day => day.day === 4) || { items: [] }).map(item => item.name_en || '');
assert(!day4Names.some(name => /geysir|myvatn/i.test(name)), 'Iceland day 4 still mixes Golden Circle or North Iceland');

if (failures.length) {
  console.error(`FAIL night/map/route accuracy (${failures.length})`);
  failures.forEach(message => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  console.log('PASS night/map/route accuracy (Budapest, Sydney, Iceland)');
}
