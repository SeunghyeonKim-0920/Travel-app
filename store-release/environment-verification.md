# Environment Verification

Verified on Windows on July 15, 2026.

## Passed

- Capacitor dependencies are aligned at `8.4.2` (`@capacitor/app` is `8.1.1`).
- Android and iOS projects synchronize successfully from `deploy_live`.
- The mobile release verifier passes 53 structural, identity, asset, legal-page, and security checks.
- Existing travel-data, route-accuracy, backend, transport-provider, and Worker regression suites pass.
- Browser QA passes at 390 x 844 portrait and 844 x 390 landscape with no horizontal overflow or console errors.
- The production Surge deployment succeeds and the HTTPS app, privacy page, and support page pass live browser verification.
- `npm audit --omit=dev` reports zero runtime vulnerabilities.

## Tooling blockers on this workstation

- Android Gradle compilation stops because `JAVA_HOME` is not set and Java is not installed on `PATH`.
- Capacitor Doctor validates the Android project but reports that Xcode is not installed.
- iOS compilation, archive, signing, and TestFlight upload require macOS and Xcode.

## Development-only audit note

The current full npm audit reports eight transitive findings under `@capacitor/assets` (`@trapezedev/project`, `xcode`, `minimatch`, and a nested `tar`). The installed asset generator is used only on a trusted local SVG to produce checked-in native images and is not shipped in the mobile runtime. The current upstream package has no available non-breaking fix for those paths. Recheck before every release and replace or upgrade the asset tool when an upstream fix is published.
