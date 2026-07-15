## MODIFIED Requirements

### Requirement: Repeatable release preparation
The project SHALL expose commands for native sync, structural verification, Android App Bundle preparation, iOS Xcode handoff, and CI platform compilation using only documented external signing inputs.

#### Scenario: Prepare a local Android release
- **WHEN** a developer follows the release guide on a supported Windows workstation
- **THEN** the production bundle is synchronized, configuration is verified, and an Android App Bundle is produced without credentials committed to Git

#### Scenario: Verify platforms in CI
- **WHEN** the mobile build workflow runs on GitHub Actions
- **THEN** Android compiles on Linux and iOS compiles for the simulator on macOS with signing disabled

## ADDED Requirements

### Requirement: External Android signing
Android release signing MUST read the keystore path, alias, and passwords from environment variables or untracked local configuration and MUST fail clearly when a signed release is requested without them.

#### Scenario: Build a signed bundle
- **WHEN** valid external signing inputs are present
- **THEN** Gradle produces a signed release AAB and the verification command confirms its signature

### Requirement: Store-account boundary
Release documentation SHALL distinguish completed technical artifacts from store actions that require the owner's developer membership, legal declarations, payment, multifactor authentication, or signing certificates.

#### Scenario: Continue store publication
- **WHEN** technical verification is complete but owner credentials are unavailable
- **THEN** the handoff identifies each blocked console action without claiming publication succeeded

