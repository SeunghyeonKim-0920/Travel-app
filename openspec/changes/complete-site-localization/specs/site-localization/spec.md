## ADDED Requirements

### Requirement: Selected language controls all application copy
The application SHALL render all system-authored labels, controls, prompts, validation messages, empty states, and generated explanatory copy in the selected supported language.

#### Scenario: Main views use the selected language
- **WHEN** a user selects Korean, French, Chinese, Japanese, or Spanish and visits Home, Planner, Companion Matching, Route Planner, and Profile
- **THEN** every system-authored interface string is rendered in that selected language without English fallback copy

### Requirement: Generated travel content is localized
The application SHALL localize generated itinerary names, descriptions, meal labels, route details, companion metadata, saved-trip content, shared content, and offline-export labels in the selected language.

#### Scenario: United States itinerary in a non-English language
- **WHEN** a user generates an itinerary for Los Angeles, Houston, or Las Vegas while a non-English language is selected
- **THEN** attraction descriptions and all generated itinerary sentences are shown in the selected language, while official proper nouns may remain recognizable

### Requirement: Localization survives rerender and persisted content
The application SHALL apply the current language when content is regenerated, loaded from saved state, opened from a shared link, or prepared for export.

#### Scenario: Language change after loading saved content
- **WHEN** a saved itinerary or route is loaded and the user changes the language
- **THEN** the visible system-authored content is rerendered in the newly selected language

### Requirement: Translation coverage is verifiable
The project SHALL include repeatable checks that detect missing translation keys and visible fallback text in core application views.

#### Scenario: Localization verification
- **WHEN** the localization audit and browser verification are run
- **THEN** all six languages pass key coverage, core-view rendering, representative itinerary, and console-error checks
