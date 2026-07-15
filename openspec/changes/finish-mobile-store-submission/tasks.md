## 1. Build Toolchain And Signing

- [x] 1.1 Install user-local JDK 21 and Android CLI/SDK components and document environment discovery.
- [x] 1.2 Add external Android release-signing configuration and generate an upload keystore outside Git.
- [x] 1.3 Produce and verify debug APK and signed release AAB artifacts.

## 2. Companion Safety

- [x] 2.1 Add D1 moderation-report migration, write-only API route, validation, and automated tests.
- [x] 2.2 Add stable installation IDs, localized report/block controls, filtered rendering, and unblock management.
- [x] 2.3 Deploy the Worker and static client and verify moderation behavior locally and live.

## 3. CI And Release Handoff

- [x] 3.1 Add GitHub Actions Android and unsigned iOS simulator compilation workflows.
- [x] 3.2 Expand mobile verification and store documentation with artifact, signing, moderation, and account-boundary evidence.
- [ ] 3.3 Run regressions, mobile browser QA, security checks, and CI verification.
- [ ] 3.4 Archive OpenSpec and commit/push only scoped changes while preserving existing worktree changes.
