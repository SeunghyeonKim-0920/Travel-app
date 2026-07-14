## ADDED Requirements

### Requirement: Environment-only deployment credentials
Deployment tooling MUST read Surge credentials from environment variables and MUST NOT contain a hardcoded token or password.

#### Scenario: Credentials are present
- **WHEN** the deployment command receives `SURGE_LOGIN` and `SURGE_TOKEN`
- **THEN** it uploads the selected production directory

#### Scenario: Credentials are missing
- **WHEN** either required credential is absent
- **THEN** deployment stops before upload with an actionable error
