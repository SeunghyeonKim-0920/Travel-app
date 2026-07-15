# TripTogether Mobile Release

This directory is the handoff package for the first Android and iOS store release.

## Release identity

- App name: `TripTogether`
- Application ID / bundle ID: `com.triptogether.travel`
- Version: `1.0.0`
- Build number / version code: `1`
- Primary category: Travel
- Production site: `https://wandersync-travel-1779355803.surge.sh`
- Privacy URL: `https://wandersync-travel-1779355803.surge.sh/privacy.html`
- Support URL: `https://wandersync-travel-1779355803.surge.sh/support.html`

## Release commands

```powershell
npm.cmd run mobile:prepare
npm.cmd run mobile:android:bundle
npm.cmd run mobile:open:ios
```

Android release signing requires a private upload keystore configured outside Git. iOS archive and signing require macOS, Xcode, an Apple Developer account, and an App Store Connect record. Confirm the permanent application ID, developer/legal name, support email, and privacy declarations before the first signed upload.

See `environment-verification.md` for the verified checks and current workstation build blockers.
