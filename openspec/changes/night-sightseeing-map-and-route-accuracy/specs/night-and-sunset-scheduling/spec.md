## Requirements

### Requirement: Night-view activities follow dinner
The course generator SHALL place an attraction explicitly marked as a night-view activity after the dinner item on the same day when that attraction is selected.

#### Scenario: Budapest Parliament evening view
- **WHEN** Budapest's Hungarian Parliament Building is selected as a night-view attraction
- **THEN** its scheduled item appears after the day's dinner item

### Requirement: Sunset activities use the evening window
The course generator SHALL schedule an explicitly sunset-oriented attraction at or near the day's sunset window, subject to the existing day bounds.

#### Scenario: Sunset activity
- **WHEN** a selected item is marked as a sunset activity
- **THEN** its start time is not placed in the morning and remains within the day's evening scheduling window
