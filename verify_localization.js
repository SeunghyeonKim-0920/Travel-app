const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const app = read('app.js');
const dataPatch = read('mockdata_patch.js');
const html = read('index.html');

const checks = [
  ['six supported languages', /const SUPPORTED_LANG_CODES = \['ko', 'en', 'fr', 'zh', 'ja', 'es'\]/.test(app)],
  ['runtime English fallback translations', app.includes('RUNTIME_ENGLISH_TEXT_PATCHES')],
  ['dynamic message pattern translations', app.includes('RUNTIME_TEXT_PATTERN_TRANSLATIONS')],
  ['selected-language fallback in getText', /localizeRuntimeText\(direct\)/.test(app)],
  ['selected-language toast messages', /toast\.textContent = cleanUiText\(localizeRuntimeText\(message\)\)/.test(app)],
  ['selected-language native dialogs', /let fixed = localizeRuntimeText\(/.test(app)],
  ['browser localization audit', /window\.runLocalizationAudit = runLocalizationAudit/.test(app)],
  ['localized mobile accessibility', html.includes('data-i18n="chat_safety_notice"') && app.includes('aria-autocomplete="list"') && app.includes('aria-expanded="false"')],
  ['localized generated descriptions', /return buildLocalizedItemDescription\(item, codeLang\)/.test(app)],
  ['localized US itinerary names', ['griffith observatory park', 'space center houston', 'las vegas strip'].every(name => app.includes(`'${name}'`))],
  ['no English Korean placeholder names', !/name_ko:\s*name,/.test(dataPatch)],
  ['no English Korean placeholder descriptions', !/desc_ko:\s*'Real verified place:/.test(dataPatch)],
  ['HTML declares UTF-8', /<meta\s+charset=["']UTF-8["']/i.test(html)]
];

const failed = checks.filter(([, pass]) => !pass);
checks.forEach(([name, pass]) => {
  process.stdout.write(`${pass ? 'PASS' : 'FAIL'} ${name}\n`);
});

if (failed.length) {
  process.stderr.write(`Localization verification failed: ${failed.map(([name]) => name).join(', ')}\n`);
  process.exit(1);
}
