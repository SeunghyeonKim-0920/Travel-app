const fs = require('fs');

const files = {
  app: fs.readFileSync('app.js', 'utf8'),
  route: fs.readFileSync('route_optimizer.js', 'utf8'),
  html: fs.readFileSync('index.html', 'utf8'),
  css: fs.readFileSync('style.css', 'utf8')
};

const checks = [
  ['shared codec is defined', /function encodeSharePayload\(payload\)/.test(files.route)],
  ['shared decoder accepts URL-safe base64', files.route.includes("replace(/-/g, '+').replace(/_/g, '/')")],
  ['itinerary share uses shared encoder', /const base64Str = encodeSharePayload\(compact\)/.test(files.app)],
  ['route share uses shared encoder', /const base64Str = encodeSharePayload\(payload\)/.test(files.route)],
  ['hash readers use shared decoder', /decodeSharePayload\(hash\.slice\(7\)\)/.test(files.app) && /decodeSharePayload\(hash\.slice\(11\)\)/.test(files.app)],
  ['same-tab share navigation reloads restoration path', files.app.includes("addEventListener('hashchange'") && files.app.includes("hash.startsWith('#share=')") && files.app.includes('window.location.reload()')],
  ['nickname validation is absent', !/Please enter your nickname|닉네임을 입력해주세요/.test(files.app)],
  ['anonymous fallback exists', files.app.includes('ko: \'익명\'') && files.app.includes('en: \'Anonymous\'')],
  ['route icon is map based', files.html.includes('M9 18 3 21V6l6-3 6 3 6-3v15')],
  ['mobile labels exist', (files.html.match(/class="nav-label-mobile"/g) || []).length === 5],
  ['mobile labels are visible in responsive CSS', files.css.includes('.nav-tab-btn .nav-label-mobile') && files.css.includes('display: block')]
];

const failed = checks.filter(([, passed]) => !passed).map(([name]) => name);
if (failed.length) {
  console.error(`Failed checks: ${failed.join(', ')}`);
  process.exit(1);
}
console.log(`Passed ${checks.length} share/mobile static checks.`);
