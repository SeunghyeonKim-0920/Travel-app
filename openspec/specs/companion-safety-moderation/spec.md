# companion-safety-moderation Specification

## Purpose
TBD - created by archiving change finish-mobile-store-submission. Update Purpose after archive.
## Requirements
### Requirement: Companion content reporting
The system SHALL let a user report a companion room, member, or non-system chat message with a reason and optional details, and SHALL store the report outside publicly readable application state.

#### Scenario: Submit a report
- **WHEN** a user confirms a report with a valid reason
- **THEN** the moderation API stores server-generated report metadata and the app confirms receipt without exposing other reports

### Requirement: Companion user blocking
The system SHALL let a user block another participant and SHALL hide that participant's rooms and messages on the current installation until unblocked.

#### Scenario: Block a participant
- **WHEN** a user confirms blocking another participant
- **THEN** rooms and messages attributable to that participant disappear from rendered companion surfaces and the block persists after reload

#### Scenario: Unblock a participant
- **WHEN** a user removes an entry from blocked participants in Profile
- **THEN** eligible rooms and messages from that participant can render again

### Requirement: Safety controls are localized and accessible
Report, block, unblock, reason, confirmation, success, and error controls SHALL be available in Korean, English, French, Chinese, Japanese, and Spanish with accessible labels.

#### Scenario: Use safety controls in a supported language
- **WHEN** the interface language changes
- **THEN** all visible safety controls and status messages use the selected language without mojibake

