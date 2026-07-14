## ADDED Requirements

### Requirement: Homepage featured destination set
The homepage SHALL present Paris, New York, Tokyo, Rome, Seoul, and Los Angeles as localized popular-destination cards with valid travel imagery.

#### Scenario: Homepage renders featured destinations
- **WHEN** the dashboard loads in any supported language
- **THEN** all six destination cards are present, localized, selectable, and use loadable local image assets

#### Scenario: Mobile homepage
- **WHEN** the dashboard is viewed in portrait or landscape mobile dimensions
- **THEN** all destination cards remain reachable without horizontal page overflow
