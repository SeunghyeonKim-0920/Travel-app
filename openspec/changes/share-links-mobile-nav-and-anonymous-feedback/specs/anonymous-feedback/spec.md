## ADDED Requirements

### Requirement: Nickname is optional for feedback
The feedback form SHALL allow a user to submit a valid rating and message without entering a nickname.

#### Scenario: Anonymous feedback submission
- **WHEN** a user leaves the nickname field empty, selects a rating, enters feedback text, and submits
- **THEN** the feedback is accepted by the existing persistence pipeline and the form is cleared or acknowledged as a successful submission

### Requirement: Anonymous feedback uses a localized fallback
The system SHALL use a localized anonymous display name when a submitted feedback nickname is empty, matching the active interface language.

#### Scenario: Localized anonymous name
- **WHEN** an empty-nickname feedback is submitted while the interface is set to a supported language
- **THEN** the stored/displayed feedback entry uses that language's anonymous label rather than an empty or undefined name
