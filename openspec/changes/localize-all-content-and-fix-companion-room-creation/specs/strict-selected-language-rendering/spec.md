## ADDED Requirements

### Requirement: Selected language governs all system-generated content
The application SHALL render all application-owned visible text in the selected language when the selected language is Korean, English, French, Chinese, Japanese, or Spanish. This includes navigation, headings, descriptions, labels, buttons, options, placeholders, tooltips, statuses, toasts, dialogs, generated itinerary text, route-planner text, companion-matching text, and profile text.

#### Scenario: Non-English language is selected
- **WHEN** the user selects Korean, French, Chinese, Japanese, or Spanish
- **THEN** all application-owned visible text in Home, Planner, Companion Matching, Route Planner, and Profile is rendered in that selected language without unintended English fallback text

#### Scenario: Language changes while dynamic content is visible
- **WHEN** the user changes the language after itinerary, route, saved-trip, or companion-room content has already been rendered
- **THEN** the application re-renders all application-owned labels and generated text in the newly selected language

### Requirement: Supported city and country data is localized
The application SHALL provide a target-language display value for every supported city and country in each supported language. It MUST NOT silently substitute an English city or country label when a non-English supported language is selected.

#### Scenario: Cities in English-speaking countries are displayed
- **WHEN** the selected language is Korean, French, Chinese, Japanese, or Spanish and the user views a city in the United States, United Kingdom, Australia, or New Zealand
- **THEN** the city and country labels use the established localized name or target-language transliteration for the selected language

#### Scenario: City appears in a selector or generated result
- **WHEN** a supported city appears in a home card, search result, planner selector, itinerary heading, route-planner result, companion-room badge, or saved trip
- **THEN** the same target-language city label is used consistently in every location

### Requirement: Attraction and itinerary content is localized
The application SHALL localize application-owned attraction names, place descriptions, itinerary labels, meal labels, transit labels, route descriptions, and generated schedule text for the selected supported language. Established localized names or transliterations SHALL be used for proper nouns when available.

#### Scenario: Itinerary is generated for an English-speaking destination
- **WHEN** the user generates an itinerary for a city in the United States, United Kingdom, Australia, or New Zealand while using Korean, French, Chinese, Japanese, or Spanish
- **THEN** the itinerary’s application-owned attraction, description, schedule, meal, transit, and route text is displayed in the selected language

#### Scenario: Proper noun has no translated official form
- **WHEN** a place or brand name has no established translated official form in the selected language
- **THEN** the application uses an established target-language transliteration or the canonical proper name without surrounding English explanatory text

### Requirement: Runtime messages use complete language mappings
The application SHALL retrieve runtime messages through language-complete translation mappings rather than Korean-versus-English-only conditionals. Success, error, validation, room, chat-system, save, delete, and availability messages MUST support all six application languages.

#### Scenario: Runtime action occurs in French, Chinese, Japanese, or Spanish
- **WHEN** the user triggers a toast, validation message, dialog, status update, or system-generated chat message while using French, Chinese, Japanese, or Spanish
- **THEN** the resulting application-owned message is displayed in the selected language rather than English

#### Scenario: Translation key is missing
- **WHEN** application-owned text is requested for a supported non-English language and its exact translation is missing
- **THEN** the application uses an explicit target-language fallback and does not expose the raw translation key or an unrelated English sentence

### Requirement: User-authored content is preserved
The application MUST preserve user-authored room titles, descriptions, meeting-place text, profile names, and chat messages as entered. The application SHALL localize only the surrounding application-owned labels and messages.

#### Scenario: User enters content in a different language
- **WHEN** a user enters free-form content that differs from the currently selected interface language
- **THEN** the user content remains unchanged while all surrounding application-owned interface text follows the selected language

### Requirement: Localization coverage is verifiable
The implementation SHALL include a repeatable verification method that detects untranslated application-owned English text in supported non-English modes and SHALL verify the required primary views without browser console errors.

#### Scenario: Local multilingual verification runs
- **WHEN** the approved change is tested at `http://localhost:8000`
- **THEN** Home, Planner, Companion Matching, Route Planner, and Profile are exercised in Korean, French, Chinese, Japanese, and Spanish and any unexpected English application text or console error causes verification to fail

#### Scenario: Live multilingual verification runs
- **WHEN** the approved change is deployed to the existing Surge production site
- **THEN** the deployed site is opened in a fresh browser context and critical multilingual flows are confirmed before the change is committed and pushed
