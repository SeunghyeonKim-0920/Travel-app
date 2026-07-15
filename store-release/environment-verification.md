# Environment Verification

Verified on Windows on July 15, 2026.

## Passed

- Microsoft OpenJDK 21 is installed under the ignored `.local-tools/jdk21` directory and is discovered automatically by the Android build runner.
- Google's Android CLI installed SDK Platform 36, Build Tools 36.0.0, and Platform Tools in the current user's Android SDK directory.
- The Android upload keystore and signing environment file are stored under `%USERPROFILE%\.triptogether\signing`, outside Git, with access restricted to the current Windows user.
- Capacitor dependencies are aligned at `8.4.2` (`@capacitor/app` is `8.1.1`).
- Android and iOS projects synchronize successfully from `deploy_live`.
- The mobile release verifier passes 53 structural, identity, asset, legal-page, and security checks.
- Existing travel-data, route-accuracy, backend, transport-provider, and Worker regression suites pass.
- Browser QA passes at 390 x 844 portrait and 844 x 390 landscape with no horizontal overflow or console errors.
- The production Surge deployment succeeds and the HTTPS app, privacy page, and support page pass live browser verification.
- `npm audit --omit=dev` reports zero runtime vulnerabilities.

## Platform boundary

- Android compilation and signed bundle generation run locally without administrator access.
- iOS simulator compilation runs in GitHub Actions on macOS with signing disabled.
- iOS archive signing and App Store Connect upload still require an active Apple Developer membership, owner authentication, distribution certificate, and provisioning profile.

## Development-only audit note

The current full npm audit reports eight transitive findings under `@capacitor/assets` (`@trapezedev/project`, `xcode`, `minimatch`, and a nested `tar`). The installed asset generator is used only on a trusted local SVG to produce checked-in native images and is not shipped in the mobile runtime. The current upstream package has no available non-breaking fix for those paths. Recheck before every release and replace or upgrade the asset tool when an upstream fix is published.
