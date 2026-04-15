# Real-device auth smoke checklist

Use this checklist only for the provider boundary that the Maestro flows intentionally do not automate. Run the matching Maestro file before or immediately after each manual step so the app-owned assertions stay reproducible.

## Device / provider matrix

| Platform | Provider | Manual provider step | Expected in-app outcome |
| --- | --- | --- | --- |
| iOS real device | Kakao | Complete Kakao login, then cancel once on a second attempt | `ios/auth-provider-matrix.yaml` shows Kakao/Naver/Apple; successful auth returns to onboarding or home; cancellation returns to `auth.login.screen.root` and keeps provider buttons visible |
| iOS real device | Naver | Complete Naver login, then cancel once on a second attempt | `ios/auth-provider-matrix.yaml` shows Kakao/Naver/Apple; successful auth returns to onboarding or home; cancellation returns to `auth.login.screen.root` and keeps provider buttons visible |
| iOS real device | Apple | Complete Apple login, then cancel once on a second attempt | `ios/auth-provider-matrix.yaml` shows Kakao/Naver/Apple; successful auth returns to onboarding or home; cancellation returns to `auth.login.screen.root` and keeps provider buttons visible |
| Android real device | Kakao | Complete Kakao login, then cancel once on a second attempt | `android/auth-provider-matrix.yaml` shows Kakao/Naver only; successful auth returns to onboarding or home; cancellation returns to `auth.login.screen.root` and keeps provider buttons visible |
| Android real device | Naver | Complete Naver login, then cancel once on a second attempt | `android/auth-provider-matrix.yaml` shows Kakao/Naver only; successful auth returns to onboarding or home; cancellation returns to `auth.login.screen.root` and keeps provider buttons visible |

## Supporting app-owned checks

1. **Legacy guest upgrade**
   - Seed the legacy `guest_profile` key on the device/emulator.
   - Run `cd frontend && maestro test e2e/maestro/shared/guest-upgrade-forces-login.yaml`.
   - Expect the cold launch to stop on the provider login screen, not onboarding or home.

2. **Authenticated routing**
   - Seed or preserve an authenticated session.
   - Run `cd frontend && maestro test e2e/maestro/shared/onboarding-routing.yaml -e EXPECTED_ROUTE=start|onboard|home` for the route you are validating.
   - Expect `/` to redirect to `start` when `hasAgreedToTerms=false`, to `onboard` when terms are accepted but onboarding is incomplete, and to home when onboarding is complete.

3. **Provider success return**
   - After completing Kakao/Naver/Apple login, run `cd frontend && maestro test e2e/maestro/shared/provider-success-to-authenticated.yaml`.
   - Expect the login root to stay gone and the app to land on onboarding or home.

4. **Provider cancel/fail return**
   - From the login screen, run `cd frontend && maestro test e2e/maestro/shared/provider-cancel-or-fail.yaml`.
   - Cancel the native provider UI or trigger a provider-config failure.
   - Expect the app to return to the provider-only login screen, optionally with `auth.login.error.banner`.

5. **Logout return**
   - With a fully onboarded session, run `cd frontend && maestro test e2e/maestro/shared/logout-returns-to-login.yaml`.
   - Expect logout from settings to return to `auth.login.screen.root` with the platform-appropriate provider matrix visible.
