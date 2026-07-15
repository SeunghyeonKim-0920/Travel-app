# native-mobile-distribution Specification

## Purpose
Define how the production TripTogether web client is packaged, verified, and handed off for Android and iOS store distribution without committing signing credentials.
## Requirements
### Requirement: Shared production web bundle
The mobile projects SHALL embed the same static `deploy_live` bundle used by the TripTogether web application and MUST NOT require a development server at runtime.

#### Scenario: Synchronize native projects
- **WHEN** a developer runs the mobile synchronization command
- **THEN** the current `deploy_live` assets are copied into both configured native projects

### Requirement: Native platform projects
The system SHALL provide generated Android and iOS projects that identify the app as `TripTogether`, use application ID `com.triptogether.travel`, and embed the production `deploy_live` web bundle without a remote development server.

#### Scenario: Synchronize native projects
- **WHEN** the mobile preparation command runs
- **THEN** both native projects receive the current production web files and Capacitor plugin configuration

### Requirement: Store-compatible brand assets
The native projects SHALL include complete Android adaptive/launcher icons, iOS app icons, and launch assets generated from source artwork meeting store dimensions.

#### Scenario: Inspect generated assets
- **WHEN** release verification examines both projects
- **THEN** required icon and splash resource sets exist and no placeholder Capacitor artwork remains

### Requirement: Repeatable release preparation
The project SHALL expose commands for native sync, structural verification, Android App Bundle preparation, iOS Xcode handoff, and CI platform compilation using only documented external signing inputs.

#### Scenario: Prepare a local Android release
- **WHEN** a developer follows the release guide on a supported Windows workstation
- **THEN** the production bundle is synchronized, configuration is verified, and an Android App Bundle is produced without credentials committed to Git

#### Scenario: Verify platforms in CI
- **WHEN** the mobile build workflow runs on GitHub Actions
- **THEN** Android compiles on Linux and iOS compiles for the simulator on macOS with signing disabled

### Requirement: Signing secrets remain external
The repository MUST NOT contain Apple signing certificates, provisioning profiles, Android keystores, store passwords, or developer-account credentials.

#### Scenario: Scaffold without credentials
- **WHEN** the native projects are generated and verified
- **THEN** no signing secret is created or written into tracked project configuration

### Requirement: Platform prerequisite disclosure
The release documentation SHALL distinguish tasks that can run on Windows from iOS tasks that require macOS and Xcode.

#### Scenario: Continue iOS release work
- **WHEN** a developer reads the release documentation on Windows
- **THEN** it clearly states that final iOS compilation, signing, archive validation, and App Store upload require macOS with supported Xcode tooling

### Requirement: Native lifecycle integration
The native app SHALL handle incoming share links, Android hardware back navigation, status-bar presentation, and splash dismissal without changing normal browser behavior.

#### Scenario: Open a shared TripTogether link
- **WHEN** the native app receives a supported TripTogether URL
- **THEN** it SHALL route the embedded web client to the shared planner or route-planner state

### Requirement: Store privacy and support surfaces
The release bundle SHALL provide publicly accessible privacy and support pages and SHALL link to them from inside the app.

#### Scenario: Review privacy information
- **WHEN** a user or store reviewer opens the in-app privacy link
- **THEN** the page SHALL describe collected data, purposes, retention, deletion choices, service providers, and contact/support options

### Requirement: Release metadata is reviewable
The repository SHALL include store-listing drafts, data-safety notes, version identity, screenshot requirements, and a release checklist without claiming declarations that require owner confirmation.

#### Scenario: Create store records
- **WHEN** the owner starts App Store Connect or Play Console setup
- **THEN** the required URLs, descriptions, category, review notes, and unresolved owner confirmations SHALL be available in one release directory

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

