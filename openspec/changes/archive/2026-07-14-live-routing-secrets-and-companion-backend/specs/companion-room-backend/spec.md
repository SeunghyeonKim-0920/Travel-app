## ADDED Requirements

### Requirement: Shared companion state API
The backend MUST support reading and writing shared application state for companion rooms, room membership, messages, and feedback through validated JSON endpoints.

#### Scenario: Room is created with a configured backend
- **WHEN** a valid future room is submitted
- **THEN** the server persists it and a second client can retrieve it by listing rooms

#### Scenario: Backend is unavailable
- **WHEN** the API cannot be reached
- **THEN** room creation remains available through local storage and the UI does not treat the request as a fatal save error

### Requirement: Room expiry
The server MUST remove or exclude a companion room after the end of its configured date.

#### Scenario: Expired room is read
- **WHEN** a room's configured date has ended
- **THEN** it is omitted from active-room responses and cannot be joined

### Requirement: Basic request validation
The server MUST validate payload size, room dates, IDs, and message content before persisting data.

#### Scenario: Invalid room payload
- **WHEN** a request omits required fields or uses a past date
- **THEN** the server returns a localized-safe 400 response and writes nothing
