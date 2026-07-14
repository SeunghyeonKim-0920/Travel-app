const fs = require('fs');
const path = require('path');

const value = String(process.argv[2] || process.env.WANDERSYNC_PUBLIC_API_BASE || '').trim().replace(/\/$/, '');
const disabled = process.argv.includes('--disable');
const apiBase = disabled ? '' : value;

if (!disabled && !/^https:\/\/[a-z0-9.-]+(?::\d+)?$/i.test(apiBase) && !/^http:\/\/localhost(?::\d+)?$/i.test(apiBase)) {
  console.error('Provide an HTTPS API base URL or pass --disable.');
  process.exit(2);
}

const remote = apiBase
  ? { getUrl: `${apiBase}/api/state`, putUrl: `${apiBase}/api/state` }
  : {};
const content = [
  '// Public runtime endpoints only. Never place provider keys or account tokens in this file.',
  `window.WANDERSYNC_API_BASE = ${JSON.stringify(apiBase)};`,
  `window.WANDERSYNC_REMOTE_SYNC = ${JSON.stringify(remote)};`,
  'window.WANDERSYNC_LIVE_ROUTING = false;',
  ''
].join('\n');

['runtime-config.js', path.join('deploy_live', 'runtime-config.js')].forEach(file => {
  fs.writeFileSync(path.resolve(file), content, 'utf8');
});

console.log(apiBase ? `Configured shared API: ${apiBase}` : 'Disabled shared API runtime configuration.');
