## ADDED Requirements

### Requirement: Mobile travel workflows are touch operable
The Planner city selector and companion-room creation flow SHALL be operable with touch in supported mobile browsers in both portrait and landscape orientation. The application SHALL provide an owned listbox for supported-city matches and retain the native select as a fallback.

#### Scenario: Planner city is selected on a phone
- **WHEN** a user types a supported city and taps a matching result
- **THEN** the destination is selected, lodging choices update, and itinerary generation remains available

#### Scenario: Companion room is created on a phone
- **WHEN** a user opens the creation form on a phone
- **THEN** all fields and the submit action remain reachable without page-width overflow or an inaccessible modal footer

### Requirement: Responsive layout supports both mobile orientations
The application SHALL fit the available mobile viewport in portrait and landscape, respect device safe areas, provide at least 48-pixel primary touch targets, and avoid incoherent overlap or horizontal page scrolling.

### Requirement: Home is concise and travel-led
The Home view SHALL use the visible brand `TripTogether`, concise application copy, bright destination photography, and direct entry points to itinerary planning and companion matching.

### Requirement: Privacy and chat safety choices are explicit
The profile gender selector SHALL include a localized do-not-display option. Companion chat SHALL show a localized notice warning users to be cautious of external messenger migration and money requests.
