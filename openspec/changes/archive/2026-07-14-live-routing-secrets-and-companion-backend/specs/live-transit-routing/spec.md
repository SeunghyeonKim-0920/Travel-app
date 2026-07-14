## ADDED Requirements

### Requirement: Provider-backed route enrichment
The route service MUST return normalized distance, duration, transport mode, connection type, provider, source, capture time, and live-status fields when a configured provider can answer a route request.

#### Scenario: Google transit route is available
- **WHEN** the server has a Google Routes API key and receives two valid coordinates with transit mode
- **THEN** it returns the provider duration and distance with `provider`, `source`, `capturedAt`, and `isLive: true`

#### Scenario: Provider is not configured or unavailable
- **WHEN** no provider credential exists or the provider times out
- **THEN** the client receives a typed unavailable response and preserves its curated route fallback without replacing it with a guessed value

### Requirement: Door-to-door flight timing
Flight results MUST distinguish direct and connecting service and MUST include airborne time, airport access/check-in/security time, baggage time, and layover time in the displayed total.

#### Scenario: Direct flight offer is returned
- **WHEN** a configured flight provider returns a direct itinerary
- **THEN** the route result marks it direct and sums all configured door-to-door components

#### Scenario: Only connecting flights are returned
- **WHEN** no direct offer is available but a connecting itinerary is returned
- **THEN** the route result marks it as connecting and includes the layover in the total

### Requirement: Live route display provenance
The route planner MUST expose whether each segment uses live provider data, cached verified data, or an estimate.

#### Scenario: Route result is rendered
- **WHEN** a segment is displayed
- **THEN** its note or accessible metadata identifies the data class and provider/source when present
