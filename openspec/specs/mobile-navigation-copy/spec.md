# Mobile Navigation Copy

## Purpose

Define explicit and responsive labels for the primary mobile navigation and its Surge fallback document.

## Requirements

### Requirement: Explicit Korean mobile navigation labels
The application SHALL display `코스 생성` for the planner and `도시간 경로` for the route planner in Korean mobile navigation.

#### Scenario: Korean portrait navigation
- **WHEN** the application is displayed in Korean at a 320-pixel portrait width
- **THEN** both labels are fully visible without horizontal page overflow

#### Scenario: Korean landscape navigation
- **WHEN** the application is displayed in Korean in a mobile landscape viewport
- **THEN** both labels are fully visible and each navigation target remains clickable

### Requirement: Fallback navigation parity
The Surge fallback document SHALL contain the same five mobile navigation labels and icons as the primary document.

#### Scenario: Open fallback document
- **WHEN** Surge serves `200.html`
- **THEN** the mobile navigation content and behavior match `index.html`
