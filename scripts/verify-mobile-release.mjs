import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const failures = [];
let passed = 0;

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function check(label, condition, detail = '') {
  if (condition) {
    passed += 1;
    console.log(`PASS ${label}`);
    return;
  }
  failures.push(detail ? `${label}: ${detail}` : label);
  console.error(`FAIL ${label}${detail ? ` - ${detail}` : ''}`);
}

const packageJson = JSON.parse(read('package.json'));
const capacitorConfig = JSON.parse(read('capacitor.config.json'));
const androidBuild = read('android/app/build.gradle');
const androidVariables = read('android/variables.gradle');
const androidManifest = read('android/app/src/main/AndroidManifest.xml');
const iosProject = read('ios/App/App.xcodeproj/project.pbxproj');
const iosInfo = read('ios/App/App/Info.plist');
const iosPrivacy = read('ios/App/App/PrivacyInfo.xcprivacy');
const deployIndex = read('deploy_live/index.html');
const deployApp = read('deploy_live/app.js');
const workerCore = read('worker/state-core.mjs');
const mobileWorkflow = read('.github/workflows/mobile-platform-build.yml');

check('Capacitor app ID', capacitorConfig.appId === 'com.triptogether.travel');
check('Capacitor app name', capacitorConfig.appName === 'TripTogether');
check('Embedded production directory', capacitorConfig.webDir === 'deploy_live');
check('No remote web server URL', !capacitorConfig.server?.url);

for (const dependency of ['@capacitor/core', '@capacitor/android', '@capacitor/ios']) {
  check(`${dependency} uses Capacitor 8`, /^\^?8\./.test(packageJson.dependencies?.[dependency] || ''));
}
for (const script of ['mobile:assets', 'mobile:sync', 'mobile:verify', 'mobile:android:bundle']) {
  check(`Release script ${script}`, Boolean(packageJson.scripts?.[script]));
}

check('Android application ID', /applicationId\s+"com\.triptogether\.travel"/.test(androidBuild));
check('Android version 1.0.0 (1)', /versionCode\s+1/.test(androidBuild) && /versionName\s+"1\.0\.0"/.test(androidBuild));
check('Android signing uses external environment', ['TRIPTOGETHER_KEYSTORE_PATH', 'TRIPTOGETHER_KEYSTORE_PASSWORD', 'TRIPTOGETHER_KEY_ALIAS', 'TRIPTOGETHER_KEY_PASSWORD'].every(token => androidBuild.includes(token)));
check('Signed Android release fails without credentials', androidBuild.includes('TRIPTOGETHER_REQUIRE_SIGNING'));
const targetSdk = Number(androidVariables.match(/targetSdkVersion\s*=\s*(\d+)/)?.[1] || 0);
check('Android target SDK is at least 35', targetSdk >= 35, `found ${targetSdk || 'none'}`);
check('Android cleartext traffic disabled', /usesCleartextTraffic="false"/.test(androidManifest));
check('Android backups disabled', /allowBackup="false"/.test(androidManifest));
check('Android custom deep link', /scheme="triptogether"/.test(androidManifest));
check('Android production HTTPS deep link', /host="wandersync-travel-1779355803\.surge\.sh"/.test(androidManifest));
check('Android network security policy', exists('android/app/src/main/res/xml/network_security_config.xml'));
check('Android debug APK produced', exists('android/app/build/outputs/apk/debug/app-debug.apk') && fs.statSync(path.join(root, 'android/app/build/outputs/apk/debug/app-debug.apk')).size > 1000000);
check('Signed Android release AAB produced', exists('android/app/build/outputs/bundle/release/app-release.aab') && fs.statSync(path.join(root, 'android/app/build/outputs/bundle/release/app-release.aab')).size > 1000000);

check('iOS bundle ID', /PRODUCT_BUNDLE_IDENTIFIER = com\.triptogether\.travel;/.test(iosProject));
check('iOS version 1.0.0 (1)', /MARKETING_VERSION = 1\.0\.0;/.test(iosProject) && /CURRENT_PROJECT_VERSION = 1;/.test(iosProject));
check('iOS 15 deployment target', /IPHONEOS_DEPLOYMENT_TARGET = 15\.0;/.test(iosProject));
check('iOS custom deep link', /<string>triptogether<\/string>/.test(iosInfo));
check('iOS privacy manifest tracked by project', /PrivacyInfo\.xcprivacy in Resources/.test(iosProject));
check('iOS tracking disabled in manifest', /<key>NSPrivacyTracking<\/key>\s*<false\/>/.test(iosPrivacy));

const expectedWebFiles = [
  'deploy_live/index.html',
  'deploy_live/200.html',
  'deploy_live/app.js',
  'deploy_live/runtime-config.js',
  'deploy_live/native-bridge.js',
  'deploy_live/privacy.html',
  'deploy_live/support.html'
];
for (const file of expectedWebFiles) check(`Embedded web file ${file}`, exists(file));
check('In-app privacy link', /href="privacy\.html"/.test(deployIndex));
check('In-app support link', /href="support\.html"/.test(deployIndex));
check('Native bridge loaded by app', /src="native-bridge\.js/.test(deployIndex));
check('Companion report dialog embedded', /id="reportContentModal"/.test(deployIndex));
check('Blocked participant management embedded', /id="blockedParticipantsList"/.test(deployIndex));
check('Stable installation ID implemented', deployApp.includes('wander_client_id_v1'));
check('Local companion blocking implemented', deployApp.includes('wander_blocked_companion_ids_v1'));
check('Write-only moderation endpoint implemented', workerCore.includes("url.pathname === '/api/reports' && request.method === 'POST'") && !workerCore.includes("url.pathname === '/api/reports' && request.method === 'GET'"));
check('Separate moderation migration', exists('worker/migrations/0002_moderation_reports.sql'));

check('Android CI build configured', /assembleDebug/.test(mobileWorkflow) && /ubuntu-24\.04/.test(mobileWorkflow));
check('iOS CI uses current macOS runner', /runs-on: macos-26/.test(mobileWorkflow));
check('iOS CI compiles without signing', /CODE_SIGNING_ALLOWED=NO/.test(mobileWorkflow));

const appIconPath = 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png';
check('iOS 1024px icon generated', exists(appIconPath) && fs.statSync(path.join(root, appIconPath)).size > 10000);
check('Android adaptive icon generated', exists('android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml'));
check('Android launcher icon generated', exists('android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png'));
check('Android splash generated', exists('android/app/src/main/res/drawable-port-xxxhdpi/splash.png'));
check('Source logo retained', exists('resources/logo.svg'));

for (const file of ['privacy.html', 'support.html', 'deploy_live/privacy.html', 'deploy_live/support.html']) {
  const contents = read(file);
  check(`${file} has all six languages`, ['ko:', 'en:', 'fr:', 'zh:', 'ja:', 'es:'].every(token => contents.includes(token)));
  check(`${file} has no replacement characters`, !contents.includes('\uFFFD'));
}

for (const file of ['store-release/README.md', 'store-release/app-store-metadata.md', 'store-release/google-play-metadata.md', 'store-release/privacy-data-map.md', 'store-release/submission-checklist.md', 'store-release/environment-verification.md']) {
  check(`Release document ${file}`, exists(file) && fs.statSync(path.join(root, file)).size > 200);
}

if (failures.length) {
  console.error(`\nMobile release verification failed: ${failures.length} failure(s), ${passed} passed.`);
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}

console.log(`\nMobile release verification passed: ${passed} checks.`);
