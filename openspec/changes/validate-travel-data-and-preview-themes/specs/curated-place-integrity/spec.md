## ADDED Requirements

### Requirement: Unopened development concepts are not scheduled
The itinerary generator SHALL reject explicitly blocked development-area or unopened project labels and SHALL not present them as visitable attractions.

#### Scenario: Dubai itinerary generation
- **WHEN** a user generates any supported Dubai itinerary
- **THEN** Dubailand and equivalent project-only labels do not appear in any day

#### Scenario: Blocked-label audit
- **WHEN** the attraction-data verification runs across every supported city pool
- **THEN** no blocked exact or normalized label remains available to the scheduler

### Requirement: Curated place records are structurally valid
Every attraction candidate SHALL have a usable localized name, a positive duration, and valid coordinates when coordinates are supplied.

#### Scenario: All-city data audit
- **WHEN** the static place audit scans every supported city and category
- **THEN** records with missing names, non-positive durations, or out-of-range coordinates are reported as failures
