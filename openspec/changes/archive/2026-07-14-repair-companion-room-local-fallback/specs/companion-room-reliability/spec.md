## ADDED Requirements

### Requirement: Local room creation is not blocked by optional remote sync
The application SHALL save a valid companion room locally when optional remote sync is disabled or unavailable.

#### Scenario: Valid room with no remote endpoint
- **WHEN** a user submits a valid future-dated companion room and no verified remote endpoint is configured
- **THEN** the room remains in the local room list and local storage without showing a save failure

### Requirement: Failed legacy endpoints do not run by default
The application SHALL NOT call the retired MockBolt endpoint unless an explicit verified remote configuration is present.

#### Scenario: Initial page load
- **WHEN** the page loads with no remote configuration
- **THEN** no request is sent to `mockbolt.com` and no DNS-related console error is produced
