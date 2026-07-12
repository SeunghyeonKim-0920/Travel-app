## ADDED Requirements

### Requirement: Mobile navigation labels identify every destination
The mobile bottom navigation SHALL show concise localized text labels alongside the icons for Home, itinerary planning, companion matching, intercity routes, and profile.

#### Scenario: Narrow mobile navigation
- **WHEN** the application is viewed at a 320px-wide viewport
- **THEN** all five navigation destinations have visible labels, remain inside the viewport, and still activate their corresponding views

### Requirement: Intercity route navigation uses an intuitive icon
The intercity route navigation item SHALL use map or connected-route visual semantics and retain a localized accessible name.

#### Scenario: Identify route planner
- **WHEN** a user views the mobile navigation
- **THEN** the route item visually communicates a map/route function and its accessible label identifies intercity routes in the active language
