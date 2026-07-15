## Context

TripTogether is a static client with a Cloudflare Worker/D1 shared state backend and generated Capacitor Android/iOS projects. The current Windows workstation has no system JDK or Android SDK, iOS signing requires macOS and Apple credentials, and companion matching exposes user content without dedicated report/block controls.

## Goals / Non-Goals

**Goals:**

- Produce a locally verified Android release bundle using free user-local tools.
- Keep signing credentials outside Git and make release commands repeatable.
- Provide report and block actions for companion rooms, members, and chat messages.
- Store moderation reports separately from public application state.
- Verify iOS compilation on GitHub-hosted macOS without fabricating signing credentials.

**Non-Goals:**

- Purchase or create Apple/Google developer accounts.
- Publish a production store version without the account owner's final authentication and legal declarations.
- Build a full administrator dashboard or replace the current profile model with account authentication.

## Decisions

1. Install Microsoft OpenJDK 21 and Google's Android CLI in user-local directories. This avoids administrator privileges and keeps machine-specific files ignored.
2. Read Android signing inputs from environment variables and an external keystore path. A locally generated upload key is stored outside the repository.
3. Add a D1 `moderation_reports` table and a write-only public report endpoint. Public clients never receive the report collection.
4. Give each installation a persistent random client ID, include it in public profiles/messages, and store blocked client IDs locally. Legacy records without IDs fall back to normalized display-name blocking.
5. Hide blocked rooms, members, and messages before rendering while retaining an unblock control in the profile view.
6. Use GitHub Actions for Android debug/release verification and iOS simulator compilation with code signing disabled. Signed iOS distribution remains an owner handoff.

## Risks / Trade-offs

- [No authenticated accounts] A user can reinstall to obtain a new client ID. Mitigation: reports retain room/message evidence and the design can migrate IDs to authenticated accounts later.
- [Local blocking] Blocks do not automatically follow a user to another device. Mitigation: document this behavior and keep the storage format migration-friendly.
- [Report abuse] A public endpoint can receive spam. Mitigation: strict payload limits, origin checks, server-generated IDs/timestamps, and future Cloudflare rate limiting.
- [Signing key loss] Losing the Android upload key complicates updates. Mitigation: generate it outside Git and require an owner-controlled encrypted backup.
- [CI cannot sign iOS] Simulator compilation is not an App Store archive. Mitigation: keep a precise macOS signing checklist and optional secret-based workflow inputs.

## Migration Plan

1. Deploy the D1 migration and Worker endpoint before exposing report buttons.
2. Deploy the static client and verify report submission plus local blocking.
3. Build and inspect the Android AAB locally.
4. Push CI workflows and verify Android/iOS jobs.
5. Roll back the client buttons if the endpoint fails; the additive report table can remain safely.

## Open Questions

- The owner must confirm active Play Console and Apple Developer memberships before signed uploads.
- The owner must choose the final moderation response time and encrypted backup location for the Android upload key.

