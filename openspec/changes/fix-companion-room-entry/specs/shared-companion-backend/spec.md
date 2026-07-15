## MODIFIED Requirements

### Requirement: Companion state is shared across users
The production backend SHALL persist active companion rooms, chat messages, feedback, and city requests in durable shared storage, and the frontend SHALL keep shared rooms actionable after identifier serialization.

#### Scenario: Room created by one traveler is visible to another
- **WHEN** one browser creates a valid future-dated companion room
- **THEN** a separate browser with no shared local storage SHALL retrieve and display that room

#### Scenario: Message is visible to another room member
- **WHEN** a traveler sends a message to a shared room
- **THEN** another browser retrieving shared state SHALL receive the message exactly once

#### Scenario: Traveler enters a server-loaded room
- **WHEN** a traveler selects the join action after the room ID has passed through Worker serialization
- **THEN** the frontend SHALL resolve the room, persist membership, and open its chat view from that single action even when a background refresh is pending

#### Scenario: Legacy numeric room remains actionable
- **WHEN** browser storage contains a numeric room ID created by an older frontend version
- **THEN** join, edit, and delete lookups SHALL treat it as the same room as the equivalent server string ID
