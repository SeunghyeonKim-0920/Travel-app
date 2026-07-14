# Production API Runtime Configuration

## Purpose

Define how the static production frontend discovers the shared state API without exposing credentials or losing its local fallback.

## Requirements

### Requirement: Production frontend uses the shared API
The Surge build SHALL configure the deployed companion API base URL before application initialization.

#### Scenario: Production page loads
- **WHEN** a traveler opens the deployed Surge site
- **THEN** remote synchronization SHALL use the configured Worker `/api/state` endpoint

### Requirement: Runtime configuration exposes no secrets
The production runtime configuration MUST contain only public endpoint and feature flags and MUST NOT contain provider keys, account tokens, or database credentials.

#### Scenario: Deployed assets are inspected
- **WHEN** a visitor downloads `runtime-config.js`
- **THEN** the file SHALL contain no secret credential values

### Requirement: Offline fallback remains available
The application SHALL keep local browser persistence when the shared API is unavailable and SHALL retry synchronization without breaking navigation.

#### Scenario: Backend request fails
- **WHEN** the Worker cannot be reached
- **THEN** room creation SHALL remain locally recoverable and the rest of the site SHALL continue to function
