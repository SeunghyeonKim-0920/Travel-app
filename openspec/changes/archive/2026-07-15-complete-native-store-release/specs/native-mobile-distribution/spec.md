## MODIFIED Requirements

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
The project SHALL expose commands for native sync, structural verification, Android App Bundle preparation, and iOS Xcode handoff.

#### Scenario: Prepare a release
- **WHEN** a developer follows the release guide on a supported workstation
- **THEN** the production bundle is synchronized, configuration is verified, and the platform-specific signing step is clearly identified

## ADDED Requirements

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
