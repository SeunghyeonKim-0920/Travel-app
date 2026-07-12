## 1. Shared Link Restoration

- [x] 1.1 Add a shared URL-safe Unicode JSON codec that accepts both new URL-safe and legacy base64 payloads.
- [x] 1.2 Update itinerary and intercity route share-link producers and readers to use the shared codec and explicitly restore the target view.
- [x] 1.3 Guard malformed share payloads so startup remains usable without uncaught errors.

## 2. Feedback and Mobile Navigation

- [x] 2.1 Remove nickname-required feedback validation and add localized anonymous fallback handling in all feedback submit paths.
- [x] 2.2 Replace the route planner icon and add compact localized mobile labels for all bottom navigation destinations.
- [x] 2.3 Add responsive styles that keep mobile navigation labels and controls within narrow portrait and landscape viewports.

## 3. Deployment and Verification

- [x] 3.1 Add focused static/browser verification for anonymous feedback, shared links, mobile navigation, and console errors.
- [x] 3.2 Synchronize affected root assets into `deploy_live` and verify source/deployment parity.
- [x] 3.3 Run local Playwright checks, deploy the verified build to Surge, run live Playwright checks, and report any remaining uncertainty.
