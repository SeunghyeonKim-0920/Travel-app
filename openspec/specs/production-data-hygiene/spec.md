# Production Data Hygiene

## Purpose

Keep sample and QA companion data out of production while preserving legitimate traveler-created rooms.

## Requirements

### Requirement: Empty shared state remains empty
The production application SHALL NOT create sample companion rooms when the shared backend contains no rooms.

#### Scenario: New traveler opens an empty companion list
- **WHEN** the shared backend returns an empty room collection
- **THEN** the frontend SHALL display an empty companion list without writing mock rooms

### Requirement: Known test rooms are removed
The frontend and shared backend SHALL prune known legacy sample room IDs and explicit QA room titles while preserving other rooms.

#### Scenario: Old browser contains sample rooms
- **WHEN** local browser storage contains a legacy sample companion room
- **THEN** the application SHALL remove it during state normalization

#### Scenario: Shared state contains an explicit QA room
- **WHEN** shared state contains a room with a recognized QA title prefix
- **THEN** the backend SHALL omit the room and its chat log
