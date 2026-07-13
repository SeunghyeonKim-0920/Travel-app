## MODIFIED Requirements

### Requirement: Curated place records are structurally valid
Every attraction candidate SHALL have a usable localized name, a positive duration, and a valid place-specific coordinate before it can be rendered as an embedded map marker. A patch that omits coordinates SHALL preserve an existing valid coordinate pair, and estimated cluster coordinates SHALL be identified as estimates rather than curated GPS data.

#### Scenario: All-city data audit
- **WHEN** the static place audit scans every supported city and category
- **THEN** records with missing names, non-positive durations, out-of-range coordinates, legacy-grid coordinates, or synthetic coordinates intended for map display are reported as failures

#### Scenario: Partial place patch omits coordinates
- **WHEN** a city-course patch updates an existing attraction without supplying `x` and `y`
- **THEN** the attraction's existing valid coordinate pair is retained
