## ADDED Requirements

### Requirement: Mobile content remains within the viewport
The site SHALL render all primary controls and generated result content within the visible width on portrait and landscape mobile screens without hiding right-side content.

#### Scenario: Portrait route planner
- **WHEN** a user opens or generates a route at a 320px-wide portrait viewport
- **THEN** the start city, end city, route controls, and results remain fully visible and usable without document-level horizontal clipping

#### Scenario: Landscape core views
- **WHEN** a user opens Home, Planner, Companion Matching, Route Planner, or Profile in a mobile landscape viewport
- **THEN** each view adapts to the available width without overlapping controls or off-screen content

### Requirement: Mobile inputs remain interactive
The site SHALL keep city selectors, form fields, and submit controls operable after responsive reflow.

#### Scenario: Orientation-specific interaction
- **WHEN** a mobile user switches between portrait and landscape and interacts with planner or companion forms
- **THEN** controls remain visible, focusable, and clickable in both orientations
