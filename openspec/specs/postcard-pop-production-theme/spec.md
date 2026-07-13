# postcard-pop-production-theme Specification

## Purpose
TBD - created by archiving change apply-postcard-pop-theme. Update Purpose after archive.
## Requirements
### Requirement: Production uses the selected Postcard Pop visual system
The production application SHALL apply the Postcard Pop palette, typography, borders, shadows, and controls consistently across Home, Planner, Companion Matching, Route Planner, Profile, feedback, chat, itinerary, and modal surfaces.

#### Scenario: Core view navigation
- **WHEN** a user navigates through each core production view
- **THEN** every view retains its existing functionality while presenting the selected Postcard Pop visual language

### Requirement: Dashboard hero communicates travel visually
The dashboard SHALL use the approved travel-arrival photograph as its hero background and SHALL keep localized hero copy readable over the image.

#### Scenario: Dashboard opens
- **WHEN** the dashboard is shown on desktop or mobile
- **THEN** the travel photograph loads, the copy remains legible, and the primary actions remain usable

### Requirement: Postcard Pop remains mobile responsive
The selected production theme SHALL fit portrait-phone and landscape-phone viewports without horizontal clipping, overlapping controls, or loss of mobile navigation labels.

#### Scenario: Portrait and landscape phones
- **WHEN** the app is viewed at 390x844 or 844x390
- **THEN** all core views fit the viewport and their primary controls remain visible and interactive
