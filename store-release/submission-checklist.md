# Store Submission Checklist

## Shared

- [ ] Confirm `com.triptogether.travel` before first upload.
- [ ] Confirm legal developer name, support email, and public URLs.
- [ ] Run `npm.cmd run mobile:prepare` from a clean checkout or confirm the matching GitHub Actions run.
- [ ] Verify all six interface languages on phone portrait and landscape layouts.
- [ ] Verify privacy and support pages on the production HTTPS URL.
- [ ] Review `privacy-data-map.md` and complete both stores' privacy forms truthfully.
- [x] Provide in-app reporting, local blocking, and unblock controls for companion rooms, members, and messages.
- [ ] Assign a moderation owner, response-time target, escalation policy, and report-retention period.
- [ ] Capture final screenshots with no personal information.

## Android

- [x] Install JDK 21 and the current Android SDK components.
- [x] Create a private upload keystore outside the repository.
- [x] Configure signing through external environment values and an untracked signing file.
- [ ] Run `npm.cmd run mobile:android:bundle` and test the signed AAB in an internal track.
- [ ] Complete target audience, content rating, Data Safety, and Play App Signing.

## iOS

- [ ] Open `ios/App/App.xcodeproj` on macOS with the current Xcode.
- [ ] Confirm the GitHub Actions iOS simulator compilation succeeds; this does not replace signed device/TestFlight validation.
- [ ] Select the Apple team and create the matching App Store identifier.
- [ ] Confirm signing, capabilities, orientation, icons, launch screen, and privacy manifest.
- [ ] Archive and validate the build, then test through TestFlight.
- [ ] Complete App Privacy, age rating, export compliance, and review contact fields.

## Release decision

- [ ] No release-blocking console errors or broken navigation remain.
- [ ] Companion safety/moderation requirements have an owner-approved implementation.
- [ ] Signed builds pass device testing and store validation.
