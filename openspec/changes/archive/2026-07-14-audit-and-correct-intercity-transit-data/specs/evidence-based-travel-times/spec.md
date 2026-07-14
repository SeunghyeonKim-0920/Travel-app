## MODIFIED Requirements

### Requirement: Major venues use maintained dwell-time overrides
The planner SHALL apply explicit maintained duration overrides for major venues whose realistic visit cannot be represented by the generic category default.

#### Scenario: Dubai Mall
- **WHEN** any Dubai Mall alias is selected for a course
- **THEN** its scheduled visit duration is 240 minutes

### Requirement: Munich-Barcelona uses a realistic modal comparison
The route planner SHALL compare a connecting rail journey based on the checked operator timetable with a door-to-door flight estimate.

#### Scenario: Munich and Barcelona route
- **WHEN** Munich and Barcelona are included in a route
- **THEN** rail is shown as a connecting journey of 14h40 after ten-minute rounding, and the faster door-to-door flight option remains available

### Requirement: Place transitions use maintained route measurements
The course planner SHALL use maintained, source-labeled route measurements for consecutive places across supported city itineraries rather than silently relying on straight-line distance alone.

#### Scenario: City course transition
- **WHEN** two consecutive places in a supported city course have a maintained route record
- **THEN** the planner displays the record's route distance and 10-minute-rounded travel duration
