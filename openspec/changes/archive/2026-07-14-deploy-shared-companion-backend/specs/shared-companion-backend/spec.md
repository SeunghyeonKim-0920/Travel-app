## ADDED Requirements

### Requirement: Companion state is shared across users
The production backend SHALL persist active companion rooms, chat messages, feedback, and city requests in durable shared storage.

#### Scenario: Room created by one traveler is visible to another
- **WHEN** one browser creates a valid future-dated companion room
- **THEN** a separate browser with no shared local storage SHALL retrieve and display that room

#### Scenario: Message is visible to another room member
- **WHEN** a traveler sends a message to a shared room
- **THEN** another browser retrieving shared state SHALL receive the message exactly once

### Requirement: Shared writes preserve unrelated changes
The backend SHALL merge records by stable identifiers and SHALL honor explicit deletion and membership-replacement metadata.

#### Scenario: Concurrent room creation
- **WHEN** two clients submit different rooms from the same prior revision
- **THEN** the resulting shared state SHALL contain both rooms

#### Scenario: Room deletion
- **WHEN** the room owner submits the room ID as deleted
- **THEN** the backend SHALL remove the room and its chat log from shared state

### Requirement: Invalid and expired data is rejected or pruned
The backend MUST validate payload shape and size and SHALL remove rooms after the end of their configured date.

#### Scenario: Expired room is read
- **WHEN** stored state contains a room whose date has ended
- **THEN** the response SHALL omit the room and its chat messages

#### Scenario: Oversized payload is submitted
- **WHEN** a client submits a body larger than the configured maximum
- **THEN** the backend SHALL reject it without modifying stored state

### Requirement: Production state API is operationally observable
The backend SHALL expose a health endpoint and SHALL return explicit JSON errors without leaking secrets.

#### Scenario: Health check
- **WHEN** an operator requests `/api/health`
- **THEN** the backend SHALL report service and database availability
