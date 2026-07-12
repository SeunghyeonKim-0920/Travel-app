const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const runtimeFiles = [
  'mockData.js',
  'mockdata_patch.js',
  'cities_new_patch.js',
  'route_optimizer.js',
  'city_course_patch.js'
];
const browserStubs = `
  var window = { addEventListener: () => {} };
  var document = { getElementById: () => null, querySelectorAll: () => [], addEventListener: () => {} };
  var history = {};
  var location = { hash: '', search: '', pathname: '' };
`;
const runtime = new Function(
  browserStubs + runtimeFiles.map(read).join('\n') +
  '\nreturn { CITIES, getTravelData, getBestTransport, ROUTE_CITY_CENTERS };'
)();

const app = read('app.js');
const style = read('style.css');
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const requiredRoutes = [
  ['nice', 'monaco', 'train', 30],
  ['amsterdam', 'brussels', 'train', 120],
  ['brussels', 'paris', 'train', 80],
  ['dubai', 'abudhabi', 'bus', 160]
];
requiredRoutes.forEach(([from, to, type, time]) => {
  const data = runtime.getTravelData(from, to);
  const best = runtime.getBestTransport(data);
  assert(best && best.best && best.best.type === type && best.best.time === time,
    `${from}-${to} must use verified ${type} time ${time}`);
});
assert(runtime.ROUTE_CITY_CENTERS.nice, 'Nice route center must exist');

let pairCount = 0;
for (let i = 0; i < runtime.CITIES.length; i++) {
  for (let j = i + 1; j < runtime.CITIES.length; j++) {
    pairCount++;
    const from = runtime.CITIES[i].id;
    const to = runtime.CITIES[j].id;
    assert(runtime.getBestTransport(runtime.getTravelData(from, to)),
      `missing route result for ${from}|${to}`);
  }
}

assert(/MAX_REASONABLE_DAY_TRIP_KM\s*=\s*160/.test(app), 'day-trip distance cap must be 160 km');
assert(/MAX_REASONABLE_DAY_TRIP_ONE_WAY_MINUTES\s*=\s*120/.test(app), 'day-trip one-way cap must be 120 minutes');
assert(/getVerifiedGroundDayTripMinutes/.test(app), 'dynamic day trips must use verified ground travel');
assert(/milan:\s*\[[\s\S]*?Lake Como Day Trip[\s\S]*?Pavia Historic Center Day Trip/.test(app),
  'Milan must have verified Como and Pavia alternatives');
assert(!/milan:\s*\[[\s\S]*?Bern Day Trip/.test(app), 'Milan supplement must not contain Bern');

assert(/feedbacks:\s*normalizeFeedbackCollection\(payload\.feedbacks\)/.test(app), 'remote payload must retain feedback');
assert(/feedbacks:\s*normalizeFeedbackCollection\(state\.feedbacks\)/.test(app), 'remote push must include feedback');
assert(/initFeedbackSystem\(\)/.test(app), 'feedback controls must be initialized');
assert(/feedbackLanguagePatches/.test(app), 'feedback must have six-language patches');

assert(/\.route-constraints-row\s*\{[\s\S]*?flex-direction:\s*column/.test(style),
  'mobile route constraints must stack');
assert(/\.planner-container\s*>\s*\.planner-sidebar[\s\S]*?min-width:\s*0/.test(style),
  'planner grid children must shrink');
assert(/\.chat-msg-card\s*\{[\s\S]*?max-width:\s*260px/.test(style),
  'shared chat card must be width constrained');

if (failures.length) {
  process.stderr.write(`FAIL route/day-trip/feedback verification (${failures.length})\n`);
  failures.forEach(message => process.stderr.write(`- ${message}\n`));
  process.exit(1);
}

process.stdout.write(`PASS route/day-trip/feedback verification (${pairCount} city pairs)\n`);
