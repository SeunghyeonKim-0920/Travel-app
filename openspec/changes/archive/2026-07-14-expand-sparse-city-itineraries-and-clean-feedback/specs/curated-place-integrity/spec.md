## ADDED Requirements

### Requirement: Berlin landmark completeness
The curated Berlin catalog SHALL include Brandenburg Gate, the Reichstag, Museum Island, the Berlin Wall Memorial, Potsdamer Platz, Markthalle Neun, and enough additional verified city attractions to support a meaningful multi-day itinerary.

#### Scenario: Berlin catalog audit
- **WHEN** the travel-data integrity audit runs
- **THEN** every required Berlin place exists exactly once with a positive duration and plausible Berlin coordinate

### Requirement: Generated catalog coverage audit
The project SHALL generate representative multi-day itineraries for every supported destination and report early empty sightseeing days, duplicate normalized places, foreign-city places, and more than two nearby-trip days as failures.

#### Scenario: All-city seven-day audit
- **WHEN** the catalog coverage verifier generates a moderate seven-day itinerary for every supported city
- **THEN** days one and two contain verified sightseeing, no place repeats, and nearby trips do not exceed two days
