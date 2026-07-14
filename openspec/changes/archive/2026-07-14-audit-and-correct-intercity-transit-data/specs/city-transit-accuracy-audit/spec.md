## ADDED Requirements

### Requirement: Verified route data is preferred for place-to-place movement
The course planner SHALL use a verified place-pair route record containing route distance, duration, mode, and source metadata whenever the consecutive places in a generated itinerary match a maintained record.

#### Scenario: Known adjacent places
- **WHEN** a generated course moves between two places with a verified route record
- **THEN** the itinerary displays that record's distance and 10-minute-rounded duration instead of a straight-line estimate

### Requirement: Long or unresolved routes are never collapsed to a fake distance
The transit calculator MUST NOT replace a long or unresolved place-to-place distance with an arbitrary city-sized distance such as 8km.

#### Scenario: Distant same-course places
- **WHEN** two consecutive places are far apart or belong to a nearby day trip
- **THEN** the displayed distance remains the validated route distance or is explicitly marked unresolved for audit, never silently reduced to a fabricated value

### Requirement: All supported city courses are audited
The project SHALL audit every supported city's representative 1-to-7-day courses and report missing coordinates, synthetic coordinates, duplicate place-pair keys, non-positive durations, implausibly short route times, and route records missing source metadata.

#### Scenario: Full city audit
- **WHEN** the transit accuracy verifier runs against all supported cities and travel paces
- **THEN** it exits successfully only when every consecutive real-place transition has a validated route record or an explicitly approved existing override

### Requirement: Route records retain provenance
Every maintained place-pair route record SHALL include the source, route mode, captured date, distance, and duration fields needed to review or refresh it.

#### Scenario: Route record review
- **WHEN** a reviewer inspects a generated route record
- **THEN** the source and mode identify how the distance and duration were obtained and the displayed duration is rounded only at presentation time
