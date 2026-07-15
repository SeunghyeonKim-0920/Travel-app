## Why

The native projects exist, but the release cannot yet produce a verified Android App Bundle on this workstation and companion matching lacks the reporting and blocking controls expected for user-generated content. Store submission also needs reproducible CI verification and clear signing handoff.

## What Changes

- Install and document a free, user-local Android toolchain and produce a release AAB.
- Add companion-room and chat reporting, local user blocking, and safety support entry points.
- Add Android signing configuration that reads credentials only from external environment variables.
- Add GitHub Actions workflows for Android build verification and unsigned iOS simulator compilation.
- Expand release verification, evidence, and submission documentation without claiming a store upload that requires owner credentials.

## Capabilities

### New Capabilities

- `companion-safety-moderation`: User reporting, blocking, hidden-content behavior, and moderation intake for companion rooms and chat.

### Modified Capabilities

- `native-mobile-distribution`: Reproducible Android artifacts, CI platform builds, external signing inputs, and submission handoff requirements.

## Impact

- Updates the static app, Cloudflare Worker API/database, native Android configuration, release scripts, CI workflows, tests, and store documentation.
- Uses only free local build tools. Signing keys and store credentials remain outside Git.
- Actual App Store Connect or Play Console publication remains conditional on the owner's active developer accounts and authentication.
