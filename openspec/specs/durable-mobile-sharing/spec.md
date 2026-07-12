# Durable Mobile Sharing

## Purpose

Define reliable creation and restoration of generated itinerary and intercity-route links across mobile browsers.

## Requirements

### Requirement: Compact generated share links
The application SHALL create query-based, versioned share links for generated itineraries and intercity routes, and SHALL compress payloads with the bundled compatible codec.

#### Scenario: Share a realistic itinerary on mobile
- **WHEN** a user shares a generated multi-day itinerary from a mobile viewport
- **THEN** the copied URL contains the complete generated result in the compact query format

#### Scenario: Compression library unavailable
- **WHEN** the bundled compression codec is unavailable
- **THEN** the application uses compatible URL-safe encoding only when the result remains below the reliable size limit and otherwise reports failure

### Requirement: Deterministic shared-view restoration
The application SHALL open the planner for itinerary links and the route planner for route links, and SHALL not silently navigate to Home when valid shared content is present.

#### Scenario: Open itinerary link in a fresh mobile browser
- **WHEN** a fresh mobile browser opens a copied itinerary link
- **THEN** the itinerary planner is active and the shared generated days are rendered

#### Scenario: Open route link in a fresh mobile browser
- **WHEN** a fresh mobile browser opens a copied intercity route link
- **THEN** the route planner is active and the shared city order/result is rendered

#### Scenario: Open legacy hash link
- **WHEN** a user opens an existing `#itinerary=` or `#share=` link
- **THEN** the application restores it through the backward-compatible decoder

#### Scenario: Invalid shared payload
- **WHEN** shared data cannot be decoded or validated
- **THEN** the intended planner remains visible and a localized restoration error is shown
