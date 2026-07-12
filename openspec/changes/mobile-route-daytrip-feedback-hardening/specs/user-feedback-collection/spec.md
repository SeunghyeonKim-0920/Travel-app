## ADDED Requirements

### Requirement: Users can submit localized feedback
The Home view SHALL provide feedback controls localized in every supported interface language with a nickname, rating, message, and clear submission status.

#### Scenario: Successful feedback submission
- **WHEN** a user enters a nickname, rating, and valid feedback and submits the form
- **THEN** the entry is persisted to shared storage, the form is cleared, and a localized success message is shown

#### Scenario: Invalid or failed submission
- **WHEN** required feedback is invalid
- **THEN** the user's text remains available and a localized error message explains that the submission was not saved

### Requirement: Feedback synchronization is bounded and deduplicated
The shared-state workflow SHALL deduplicate feedback by stable ID and retain a bounded recent set.

#### Scenario: Multiple clients synchronize feedback
- **WHEN** two clients pull and push overlapping feedback entries
- **THEN** each feedback ID appears once and recent submissions remain available in the shared payload
