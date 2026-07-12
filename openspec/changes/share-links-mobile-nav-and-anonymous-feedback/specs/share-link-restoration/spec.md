## ADDED Requirements

### Requirement: Shared itinerary links restore the itinerary view
The system SHALL decode a shared itinerary URL and open the generated itinerary view with the shared city, preferences, duration, and day items intact on desktop and mobile.

#### Scenario: Open itinerary link on a mobile viewport
- **WHEN** a user opens a valid shared itinerary hash URL directly at a narrow viewport
- **THEN** the planner view is active and the shared itinerary content is rendered instead of the home view

### Requirement: Shared route links restore the route planner
The system SHALL decode a shared intercity route URL and open the route-planner view with the shared city order and route result intact on desktop and mobile.

#### Scenario: Open route link on a mobile viewport
- **WHEN** a user opens a valid shared route hash URL directly at a narrow viewport
- **THEN** the intercity route-planner view is active and the shared route result is rendered instead of the home view

### Requirement: Share links remain backward compatible
The system SHALL continue to decode previously generated standard base64 share URLs as well as newly generated URL-safe base64 URLs, and SHALL fail gracefully for invalid payloads.

#### Scenario: Invalid or legacy payload
- **WHEN** a user opens a legacy valid share URL or a malformed share URL
- **THEN** a legacy valid URL restores its content, while a malformed URL leaves the app usable in its normal view without an uncaught startup error
