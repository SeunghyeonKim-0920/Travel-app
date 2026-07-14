# Curated Place Integrity

## Purpose

Ensure itinerary candidates are operational, schedulable places with structurally valid data.
## Requirements
### Requirement: Unopened development concepts are not scheduled
The itinerary generator SHALL reject explicitly blocked development-area or unopened project labels and SHALL not present them as visitable attractions.

#### Scenario: Dubai itinerary generation
- **WHEN** a user generates any supported Dubai itinerary
- **THEN** Dubailand and equivalent project-only labels do not appear in any day

#### Scenario: Blocked-label audit
- **WHEN** the attraction-data verification runs across every supported city pool
- **THEN** no blocked exact or normalized label remains available to the scheduler

### Requirement: Curated place records are structurally valid
Every attraction candidate SHALL have a usable localized name, a positive duration, and a valid place-specific coordinate before it can be rendered as an embedded map marker. A patch that omits coordinates SHALL preserve an existing valid coordinate pair, estimated cluster coordinates SHALL be identified as estimates rather than curated GPS data, and the Frankfurt and Interlaken catalogs SHALL not contain duplicate normalized places or fictitious destinations.

#### Scenario: All-city data audit
- **WHEN** the static place audit scans every supported city and category
- **THEN** records with missing names, non-positive durations, out-of-range coordinates, legacy-grid coordinates, synthetic coordinates intended for map display, duplicate normalized identities, or blocked destinations are reported as failures

#### Scenario: Partial place patch omits coordinates
- **WHEN** a city-course patch updates an existing attraction without supplying `x` and `y`
- **THEN** the attraction's existing valid coordinate pair is retained

#### Scenario: Frankfurt and Interlaken destination audit
- **WHEN** the new destination catalogs are verified
- **THEN** every curated record has a unique normalized identity, a valid localized name, and a plausible place-specific coordinate

### Requirement: Berlin landmark completeness
The curated Berlin catalog SHALL include Brandenburg Gate, the Reichstag, Museum Island, the Berlin Wall Memorial, Potsdamer Platz, Markthalle Neun, and enough additional verified city attractions to support a meaningful multi-day itinerary.

#### Scenario: Berlin catalog audit
- **WHEN** the travel-data integrity audit runs
- **THEN** every required Berlin place exists exactly once with a positive duration and plausible Berlin coordinate

### Requirement: Generated catalog coverage audit
The project SHALL generate representative multi-day itineraries for every supported destination and report early empty sightseeing days, duplicate places, foreign-city places, and more than two nearby-trip days as failures.

#### Scenario: All-city seven-day audit
- **WHEN** the catalog coverage verifier generates a moderate seven-day itinerary for every supported city
- **THEN** days one and two contain verified sightseeing, no place repeats, and nearby trips do not exceed two days
