const fs = require('fs');
const path = require('path');

const root = __dirname;
const readErrors = [];

function read(relativePath) {
  try {
    return fs.readFileSync(path.join(root, relativePath), 'utf8');
  } catch (error) {
    readErrors.push(`${relativePath}: ${error.code || error.message}`);
    return '';
  }
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function countTranslationEntries(source, key) {
  const pattern = new RegExp(`\\b${key}\\s*:\\s*['\"][^'\"\\r\\n]+['\"]`, 'g');
  return (source.match(pattern) || []).length;
}

function cssRuleHas(source, selector, requirements) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = source.match(new RegExp(`${escaped}\\s*\\{[^}]*\\}`, 'gs')) || [];
  return matches.some(rule => requirements.every(pattern => pattern.test(rule)));
}

const html = read('index.html');
const app = read('app.js');
const style = read('style.css');
const routeOptimizer = read('route_optimizer.js');

if (readErrors.length) {
  process.stderr.write(`FAIL unreadable source: ${readErrors.join(', ')}\n`);
  process.exit(1);
}

const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
const titleText = titleMatch ? stripTags(titleMatch[1]) : '';
const logoTexts = Array.from(html.matchAll(/<(div|span|a)\b[^>]*\bclass=(["'])[^"']*\blogo-text\b[^"']*\2[^>]*>([\s\S]*?)<\/\1>/gi), match => stripTags(match[3]));
const titleAndLogos = [titleText, ...logoTexts].join(' ');

const supportedLanguages = ['ko', 'en', 'fr', 'zh', 'ja', 'es'];
const languageListMatch = app.match(/SUPPORTED_LANG_CODES\s*=\s*\[([^\]]+)\]/);
const declaredLanguages = languageListMatch
  ? Array.from(languageListMatch[1].matchAll(/["']([a-z]{2})["']/g), match => match[1])
  : [];

const citySearchChecks = [
  /function\s+renderCitySearchResults\s*\(/,
  /className\s*=\s*['"]city-search-result['"]/,
  /role=["']listbox["']/,
  /addEventListener\(\s*['"]pointerdown['"]/,
  /addEventListener\(\s*['"]click['"]/,
  /buildCitySearchMarkup\(\s*['"]planner['"]\s*\)/,
  /buildCitySearchMarkup\(\s*['"]modalRoom['"]\s*\)/,
  /connectCitySearch\(\s*['"]plannerCitySearchInput['"]/,
  /connectCitySearch\(\s*['"]modalRoomCitySearchInput['"]/
];

const photoMapMatch = app.match(/const\s+destinationPhotos\s*=\s*\{([\s\S]*?)\};/);
const photoMap = photoMapMatch ? photoMapMatch[1] : '';
const curatedPhotos = [
  ['paris', 'assets/travel/paris.jpg'],
  ['newyork', 'assets/travel/new-york.jpg'],
  ['tokyo', 'assets/travel/tokyo.jpg']
];

const flightBreakdownMatch = routeOptimizer.match(
  /getRouteResultLabel\(\s*['"]flightBreakdown['"]\s*,\s*(['"])(.*?)\1\s*,/s
);
const koreanFlightBreakdown = flightBreakdownMatch ? flightBreakdownMatch[2] : '';

const expectedAssets = [
  'assets/travel/hero-planning.jpg',
  'assets/travel/new-york.jpg',
  'assets/travel/paris.jpg',
  'assets/travel/tokyo.jpg'
];
const assetsAreNontrivial = expectedAssets.every(relativePath => {
  try {
    const stat = fs.statSync(path.join(root, relativePath));
    return stat.isFile() && stat.size >= 16 * 1024;
  } catch {
    return false;
  }
});

const checks = [
  ['index Korean language option', /<option\b[^>]*value=["']ko["'][^>]*>\s*\uD55C\uAD6D\uC5B4\s*<\/option>/i.test(html)],
  ['index gender privacy option', /<option\b(?=[^>]*\bvalue=["']private["'])(?=[^>]*\bdata-i18n=["']gender_private["'])[^>]*>/i.test(html)],
  ['index chat safety notice', /class=["'][^"']*\bchat-safety-notice\b[^"']*["'][\s\S]*?data-i18n=["']chat_safety_notice["']/i.test(html)],
  ['mobile navigation has localized accessible names', (html.match(/class=["'][^"']*\bnav-tab-btn\b[^"']*["'][^>]*data-i18n-aria-label=/g) || []).length === 5],
  ['TripTogether title and visible logo', /TripTogether/.test(titleText) && logoTexts.some(text => /TripTogether/.test(text))],
  ['no WanderSync title or logo', !/WanderSync/i.test(titleAndLogos)],
  ['six supported app languages', supportedLanguages.every(lang => declaredLanguages.includes(lang))],
  ['six gender privacy translations', countTranslationEntries(app, 'gender_private') >= supportedLanguages.length],
  ['six chat safety translations', countTranslationEntries(app, 'chat_safety_notice') >= supportedLanguages.length],
  ['touch city-search result logic', citySearchChecks.every(pattern => pattern.test(app))],
  ['curated destination photo mapping', curatedPhotos.every(([city, asset]) => new RegExp(`\\b${city}\\s*:\\s*['\"]${asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['\"]`).test(photoMap))],
  ['portrait/base mobile rule', /@media\s*[^\{]*(?:orientation\s*:\s*portrait|max-width\s*:\s*(?:600|768|800)px)[^\{]*\{/i.test(style)],
  ['landscape mobile rule', /@media\s*[^\{]*orientation\s*:\s*landscape[^\{]*\{/i.test(style)],
  ['safe-area modal overlay', cssRuleHas(style, '.modal-overlay.active', [/safe-area-inset-top/, /safe-area-inset-bottom/])],
  ['dvh scrolling modal', cssRuleHas(style, '.modal-content', [/100dvh/, /overflow-y\s*:\s*auto/])],
  ['safe-area sticky modal footer', cssRuleHas(style, '.modal-footer', [/position\s*:\s*sticky/, /safe-area-inset-bottom/])],
  ['Korean flight breakdown has no Door-to-Door', /[\uAC00-\uD7A3]/.test(koreanFlightBreakdown) && !/door\s*-?\s*to\s*-?\s*door/i.test(koreanFlightBreakdown)],
  ['four nontrivial travel JPG assets', assetsAreNontrivial]
];

const failed = checks.filter(([, passed]) => !passed);
if (failed.length) {
  process.stderr.write(`FAIL mobile refresh verification (${failed.length}/${checks.length})\n`);
  failed.forEach(([name]) => process.stderr.write(`- ${name}\n`));
  process.exit(1);
}

process.stdout.write(`PASS mobile refresh verification (${checks.length} checks)\n`);
