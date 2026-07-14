## Requirements

### Requirement: Fallback entry parity
The production fallback document MUST be byte-identical to the primary entry document.

#### Scenario: Shared link served through fallback
- **WHEN** a shared planner or route URL is served by `200.html`
- **THEN** it loads the same application scripts, transit registry, and cache-busted versions as `index.html`

### Requirement: Mirrored deployment files
The root and `deploy_live` entry documents MUST remain identical.

#### Scenario: Deploying the production directory
- **WHEN** the site is deployed from `deploy_live`
- **THEN** the fallback and primary documents have the same content as the root copies
