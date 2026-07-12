const fs = require('fs');

const files = {
  app: fs.readFileSync('app.js', 'utf8'),
  route: fs.readFileSync('route_optimizer.js', 'utf8'),
  html: fs.readFileSync('index.html', 'utf8'),
  fallback: fs.readFileSync('200.html', 'utf8'),
  css: fs.readFileSync('style.css', 'utf8')
};

const checks = [
  ['legacy shared codec remains available', /function encodeSharePayload\(payload\)/.test(files.route)],
  ['legacy decoder accepts URL-safe base64', files.route.includes("replace(/-/g, '+').replace(/_/g, '/')")],
  ['compressed URL codec is defined', files.route.includes('async function encodeSharePayloadForUrl(payload)') && files.route.includes("new CompressionStream('gzip')")],
  ['compressed URL decoder is defined', files.route.includes('async function decodeSharePayloadFromUrl(encoded)') && files.route.includes("new DecompressionStream('gzip')")],
  ['bundled compression is loaded before route code', files.html.indexOf('vendor/pako/pako.min.js') > -1 && files.html.indexOf('vendor/pako/pako.min.js') < files.html.indexOf('route_optimizer.js')],
  ['large uncompressed links are rejected', files.route.includes('if (fallback.length > 6000)')],
  ['itinerary share uses compact query URL', /const encodedPayload = await encodeSharePayloadForUrl\(compact\)/.test(files.app) && files.app.includes("buildCompactShareUrl('planner', encodedPayload)")],
  ['route share uses compact query URL', /const encodedPayload = await encodeSharePayloadForUrl\(payload\)/.test(files.route) && files.route.includes("buildCompactShareUrl('routeplanner', encodedPayload)")],
  ['compact query restores intended view', files.app.includes("urlParams.get('shared')") && files.app.includes('restoreCompactSharedLink(compactShareData, expectedView)')],
  ['legacy hash readers remain available', /decodeSharePayload\(hash\.slice\(7\)\)/.test(files.app) && /decodeSharePayload\(hash\.slice\(11\)\)/.test(files.app)],
  ['same-tab legacy navigation reloads restoration path', files.app.includes("addEventListener('hashchange'") && files.app.includes("hash.startsWith('#share=')")],
  ['anonymous feedback remains supported', files.app.includes("ko: '익명'") && files.app.includes("en: 'Anonymous'")],
  ['feedback ownership remains browser local', files.app.includes("const OWNED_FEEDBACK_IDS_KEY = 'wander_feedback_owned_ids_v1'") && !/ownerId\s*:/.test(files.app)],
  ['owned feedback actions exist', files.app.includes('data-feedback-action="edit"') && files.app.includes('data-feedback-action="delete"')],
  ['in-flight feedback actions are hidden', files.app.includes('const busy = pendingFeedbackEdits.has(entry.id) || pendingFeedbackDeletes.has(entry.id)')],
  ['feedback content is escaped', files.app.includes('${escapeHtml(entry.text)}') && files.app.includes('${escapeHtml(entry.name)}')],
  ['route icon is map based', files.html.includes('M9 18 3 21V6l6-3 6 3 6-3v15')],
  ['mobile labels exist', (files.html.match(/class="nav-label-mobile"/g) || []).length === 5],
  ['Korean mobile labels are explicit', files.app.includes("nav_planner_short: '코스 생성'") && files.app.includes("nav_routeplanner_short: '도시간 경로'")],
  ['mobile labels wrap without truncation', files.css.includes('word-break: keep-all') && files.css.includes('white-space: normal')],
  ['fallback document matches the primary document', files.fallback === files.html]
];

const failed = checks.filter(([, passed]) => !passed).map(([name]) => name);
if (failed.length) {
  console.error(`Failed checks: ${failed.join(', ')}`);
  process.exit(1);
}
console.log(`Passed ${checks.length} durable share/mobile/feedback checks.`);
