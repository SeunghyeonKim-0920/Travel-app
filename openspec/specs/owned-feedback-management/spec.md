# Owned Feedback Management

## Purpose

Define browser-scoped controls for correcting or removing feedback created from the same browser.

## Requirements

### Requirement: Browser-owned feedback
The application SHALL privately record the IDs of feedback successfully submitted by the current browser and SHALL NOT publish an ownership secret in the shared remote payload.

#### Scenario: Submit feedback
- **WHEN** a user submits feedback from a browser
- **THEN** the feedback ID is added to that browser's private ownership ledger after remote persistence succeeds

### Requirement: Edit authored feedback
The application SHALL allow a browser to edit feedback in its ownership ledger, SHALL serialize actions for an in-flight record, and SHALL not expose edit controls for other feedback.

#### Scenario: Edit own feedback
- **WHEN** the author changes the text and saves
- **THEN** the card and synchronized record contain the updated text and edited timestamp

#### Scenario: View another user's feedback
- **WHEN** a feedback record is absent from the browser ownership ledger
- **THEN** no edit control is rendered for that record

### Requirement: Delete authored feedback
The application SHALL allow a browser to delete feedback in its ownership ledger after confirmation and SHALL not expose delete controls for other feedback.

#### Scenario: Delete own feedback
- **WHEN** the author confirms deletion
- **THEN** the record is removed locally and from the synchronized payload

#### Scenario: Remote update failure
- **WHEN** an edit or deletion cannot be synchronized
- **THEN** the application restores the previous local record and displays a localized failure message
