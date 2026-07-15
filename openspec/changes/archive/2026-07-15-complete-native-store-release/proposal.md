## Why

TripTogether is currently distributed as a responsive website. App Store and Google Play distribution requires installable native projects, stable application identity, store-compatible assets, privacy/support disclosures, and repeatable release checks.

## What Changes

- Package the production `deploy_live` bundle in Capacitor 8 Android and iOS shells.
- Add native lifecycle behavior for deep links, hardware back navigation, status bar, and splash screen.
- Generate store-compatible launcher icons and splash resources.
- Add public privacy and support pages plus store-listing and data-safety drafts.
- Add repeatable sync, verification, Android bundle, and iOS handoff commands without committing signing secrets.

## Capabilities

### Modified Capabilities

- `native-mobile-distribution`: complete the previously documented native distribution foundation with actual platform projects, compliance pages, native runtime behavior, and verification.

## Impact

- Adds Capacitor dependencies and generated `android/` and `ios/` projects.
- Adds release documentation, app-store metadata, and native resources.
- Uses `com.triptogether.travel` and version `1.0.0 (1)` as the pre-submission identity.
- Final iOS archive/signing still requires macOS, Xcode 26+, and Apple credentials; production signing requires the user's store accounts and certificates.
