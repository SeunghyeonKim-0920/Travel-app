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
npm.cmd run mobile:android:debug
npm.cmd run mobile:android:bundle
npm.cmd run mobile:open:ios
```

The Android runner discovers the user-local JDK and SDK automatically. For `bundleRelease`, it reads signing values from `%USERPROFILE%\.triptogether\signing\android-signing.env` or from `TRIPTOGETHER_SIGNING_ENV`; the keystore and passwords must never be committed. Back up the upload key in an owner-controlled encrypted location before the first Play Console upload.

iOS archive and signing require macOS, Xcode, an active Apple Developer membership, an App Store Connect record, owner authentication, and completed legal/privacy declarations. The GitHub Actions simulator build proves source compilation only and does not represent a signed App Store archive.

See `environment-verification.md` for the verified checks and current workstation build blockers.
