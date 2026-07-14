## MODIFIED Requirements

### Requirement: Evidence-based travel times
Travel-time records MUST identify their evidence class and MUST not be presented as live data when they are only curated or estimated.

#### Scenario: Curated route is used as fallback
- **WHEN** a live provider response is unavailable
- **THEN** the route remains usable but is labeled as cached verified or estimated data with its source metadata

#### Scenario: Live provider route replaces fallback
- **WHEN** a configured provider returns a valid route
- **THEN** the displayed result uses the live provider duration and identifies the provider and capture time
