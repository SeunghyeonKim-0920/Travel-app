## Context

The application is a static multi-file web client deployed from `deploy_live`, backed by a Cloudflare Worker. It is not a React/Vite project and has no separate build output. The current Windows environment has Node 24 but no JDK, Android SDK, Android Studio, macOS, or Xcode.

## Goals / Non-Goals

**Goals:**

- Embed the same production bundle in native Android and iOS containers.
- Preserve all existing web behavior and remote API access.
- Meet current platform target, privacy-link, asset, and metadata prerequisites.
- Make release preparation deterministic and auditable.

**Non-Goals:**

- Create or purchase developer accounts.
- Commit signing keys, certificates, provisioning profiles, or passwords.
- Claim successful store submission without account access and signed binaries.
- Replace the existing application with a new native UI framework.

## Decisions

1. Use Capacitor 8.4.x with `webDir: deploy_live`; no development or remote server URL is configured.
2. Use `com.triptogether.travel`, `TripTogether`, and version `1.0.0 (1)` as provisional release identity.
3. Bundle a small native bridge for app links, hardware back navigation, status bar, and splash behavior while leaving browser behavior unchanged.
4. Generate native assets from a 1024px source icon and 2732px splash source.
5. Add public HTML privacy/support pages and human-reviewable store metadata rather than fabricating console declarations.
6. Generate both platform projects on Windows, but record iOS compilation/signing as a macOS/Xcode continuation step.

## Risks / Trade-offs

- A store bundle ID becomes difficult or impossible to change after uploading a build; it must be confirmed before signing.
- User-generated companion and feedback content may require additional policy moderation decisions during review.
- Native project generation can be verified structurally on Windows, but Android compilation requires JDK/SDK and iOS compilation requires macOS/Xcode.
- Privacy declarations must be kept aligned with any future analytics, ads, authentication, or provider SDK additions.

## Verification

- Run existing web regression suites.
- Run Capacitor sync and a custom structural verifier.
- Inspect generated Android/iOS identity, versions, target SDK, web assets, icons, and privacy manifest.
- Run Playwright mobile QA against the embedded web directory served locally.
