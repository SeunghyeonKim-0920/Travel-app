## ADDED Requirements

### Requirement: Supported city routes have usable transport data
The route planner SHALL return a transport result for every pair of supported cities and SHALL use explicit verified records for known short direct links instead of displaying a missing-data message.

#### Scenario: Nice to Monaco
- **WHEN** a user includes Nice and Monaco in a route
- **THEN** the route displays a direct train journey rounded to 30 minutes

#### Scenario: Full supported-pair audit
- **WHEN** the route data verification runs across all supported city pairs
- **THEN** no pair returns an unavailable transport result

### Requirement: Day trips are realistically reachable
The itinerary generator SHALL reject day-trip candidates that exceed the configured practical one-way travel-time or distance limits and SHALL prefer verified nearby destinations.

#### Scenario: Milan long-distance candidate
- **WHEN** a multi-day Milan itinerary needs an optional day trip
- **THEN** Bern is not suggested and a verified nearby candidate such as Como or Pavia may be used instead

#### Scenario: No responsible candidate
- **WHEN** no candidate satisfies the practical day-trip constraints
- **THEN** the system leaves the itinerary space unfilled rather than inventing or forcing a distant trip
