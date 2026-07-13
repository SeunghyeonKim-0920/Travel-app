# verified-itinerary-map-coordinates Specification

## Purpose
TBD - created by archiving change verify-itinerary-map-coordinates-and-remove-route-rail. Update Purpose after archive.
## Requirements
### Requirement: Embedded itinerary markers use verified place coordinates
The itinerary map SHALL display a place marker only when its coordinates come from a canonical override, a validated place-specific lookup, or a plausible non-synthetic curated coordinate.

#### Scenario: Known attraction with a canonical coordinate
- **WHEN** an itinerary containing Buckingham Palace is displayed
- **THEN** its marker is placed at the verified Buckingham Palace coordinate rather than a city-cluster estimate

#### Scenario: Place-specific lookup succeeds
- **WHEN** a visible itinerary place has no canonical coordinate and a place-specific lookup returns a plausible coordinate
- **THEN** the map uses and caches the validated lookup coordinate

### Requirement: Estimated coordinates are never presented as exact map points
The itinerary map MUST reject deterministic cluster estimates, legacy-grid values, and implausible coordinates instead of plotting them as real locations.

#### Scenario: Newly generated item lacks source coordinates
- **WHEN** scheduling uses a cluster estimate for an item without a source coordinate
- **THEN** the estimate is identified as `estimated-cluster` and is not displayed as an embedded map marker

#### Scenario: Saved or shared course contains a legacy synthetic point
- **WHEN** an older saved or shared course is opened
- **THEN** the map detects the synthetic coordinate and either replaces it with a verified place coordinate or omits the marker

### Requirement: Async map resolution remains stable
The map SHALL resolve all visible-day places in parallel, ignore stale results after day or course changes, and retain itinerary access when one or more markers cannot be resolved.

#### Scenario: User changes days while coordinates are resolving
- **WHEN** a previous map render finishes after a newer render starts
- **THEN** the older result does not overwrite the current day's map

#### Scenario: Some places remain unresolved
- **WHEN** at least one visible itinerary place cannot be verified
- **THEN** verified markers remain usable and unresolved places continue to expose their normal itinerary details and View Map links
