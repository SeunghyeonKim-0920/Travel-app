## ADDED Requirements

### Requirement: In-city sightseeing precedes nearby excursions
The itinerary generator SHALL schedule all suitable, unvisited, verified in-city sightseeing before adding a nearby excursion.

#### Scenario: Berlin has remaining city landmarks
- **WHEN** a Berlin itinerary still has an unscheduled verified landmark or city attraction
- **THEN** that attraction is scheduled before Potsdam, Hamburg, or another nearby trip

### Requirement: Sparse later days use limited realistic nearby trips
For a requested itinerary of five or more days, the generator MAY use verified nearby trips to reduce otherwise empty later days, but SHALL schedule no more than two nearby-trip days and SHALL not force an unverifiable or impractical trip.

#### Scenario: Local sightseeing is exhausted
- **WHEN** a later day would otherwise contain no sightseeing and the city has an eligible nearby trip
- **THEN** the generator schedules the next unused nearby trip without exceeding two such days

#### Scenario: No verified option remains
- **WHEN** all verified city attractions and eligible nearby trips are exhausted
- **THEN** the generator leaves the remaining day unfilled rather than inventing a place

### Requirement: Interlaken regional days expose individual stops
Interlaken itineraries SHALL render each nearby village, viewpoint, waterfall, cruise, or trail as its own scheduled place rather than a single composite full-day card.

#### Scenario: Seven-day Interlaken course
- **WHEN** a user generates seven days for Interlaken
- **THEN** regional days show multiple individually named and timed places where the route contains multiple stops
