## ADDED Requirements

### Requirement: Legacy test feedback cleanup
The application SHALL remove only identified legacy test-feedback fixtures from browser and shared synchronized state while preserving all non-matching user feedback and ownership records.

#### Scenario: Legacy fixture is loaded
- **WHEN** stored or remote feedback matches a known test ID or exact test-fixture signature
- **THEN** the record is excluded from normalized feedback and is not rendered

#### Scenario: Ordinary user feedback is loaded
- **WHEN** a feedback record does not match a known test fixture
- **THEN** the record remains available with its edit and delete ownership behavior unchanged
