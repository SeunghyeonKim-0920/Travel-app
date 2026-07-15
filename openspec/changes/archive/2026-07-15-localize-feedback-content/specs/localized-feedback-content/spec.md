## ADDED Requirements

### Requirement: Feedback follows the selected language
The application SHALL display traveler feedback in the currently selected supported language while preserving the original submitted text and language.

#### Scenario: Cached translation is available
- **WHEN** a feedback record contains a translation for the selected language
- **THEN** the feedback card SHALL display that translation

#### Scenario: Translation is missing
- **WHEN** a feedback record is in another language and has no selected-language variant
- **THEN** the application SHALL keep the original readable, request one translation, and replace the displayed text after success

#### Scenario: Owner edits feedback
- **WHEN** the owner edits feedback in the currently selected language
- **THEN** the application SHALL preserve the edited source text and regenerate stale translated variants

### Requirement: Feedback translations are reusable and safe
The system SHALL validate translation requests and persist sanitized translated variants with the shared feedback record.

#### Scenario: Valid translation request
- **WHEN** the frontend sends supported source and target languages with feedback text within the length limit
- **THEN** the Worker SHALL return translated text suitable for the target language

#### Scenario: Invalid translation request
- **WHEN** the request contains an unsupported language, empty text, or oversized text
- **THEN** the Worker SHALL reject it without modifying shared state

#### Scenario: Translation service is unavailable
- **WHEN** translation inference fails or its daily allocation is unavailable
- **THEN** the feedback card SHALL remain readable using the repaired original text and SHALL NOT lose feedback data

### Requirement: Interface localization is complete
Every visible interface string controlled by the localization system SHALL resolve to clean text in the selected language for Korean, English, French, Chinese, Japanese, and Spanish.

#### Scenario: Language is switched
- **WHEN** a traveler selects any supported language
- **THEN** localized text, placeholders, labels, titles, dialogs, feedback controls, and dynamic feedback status SHALL be rendered in that language without untranslated key literals or mojibake

#### Scenario: Localization audit runs
- **WHEN** automated localization verification inspects all supported languages
- **THEN** it SHALL fail on missing values, unintended English fallbacks, untranslated keys, or malformed encoded text
