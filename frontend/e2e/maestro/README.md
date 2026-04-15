# Maestro auth harness

Minimal Maestro coverage for the mobile auth surface lives here. This harness is intentionally limited to app-owned auth behavior and does not automate third-party provider UI yet.

## Harness layout

- `shared/boot-smoke.yaml` — launches the installed app and waits for the login screen root selector.
- `shared/boot-smoke-missing-selector-negative.yaml` — intentionally asserts a selector that does not exist so contract breakage fails loudly.
- `shared/assert-login-root.yaml` — shared selector contract for the login screen root.
- `ios/launch-dev-client.yaml` — iOS simulator/dev-client launch flow.
- `android/launch-dev-client.yaml` — Android emulator/dev-client launch flow that waits for the Development Build UI, taps the Expo Dev Launcher 8082 server, advances Expo developer-menu onboarding, and dismisses the connected overlay when shown.
- `ios/auth-provider-matrix.yaml` — iOS login-screen contract (Kakao/Naver/Apple visible).
- `android/auth-provider-matrix.yaml` — Android login-screen contract (Kakao/Naver visible, Apple hidden).
- `shared/guest-upgrade-forces-login.yaml` — verifies legacy guest storage no longer bypasses provider login after cold launch.
- `shared/onboarding-routing.yaml` — verifies authenticated routing lands on a valid in-app destination and supports stricter route assertions with env overrides.
- `shared/provider-cancel-or-fail.yaml` — verifies provider cancellation/failure returns to login without authenticating.
- `shared/logout-returns-to-login.yaml` — verifies logout from settings returns to the provider-only login route.
- `shared/provider-success-to-authenticated.yaml` — verifies a completed provider auth lands in an authenticated in-app route.
- `real-device-smoke-checklist.md` — manual device/provider matrix for Kakao/Naver on iOS+Android and Apple on iOS.

## Prerequisites

1. Install Maestro CLI and verify it is available:

   ```bash
   curl -fsSL "https://get.maestro.mobile.dev" | bash
   maestro --version
   ```

2. Install frontend dependencies and create the app env file:

   ```bash
   cd frontend
   yarn install
   cp .env.example .env
   ```

3. Build and install a simulator or emulator dev client for `com.geniusproject.zet`:

   ```bash
   cd frontend
   yarn ios
   # or
   yarn android
   ```

4. Boot the iOS Simulator or Android Emulator and keep the installed dev client available.

## Auth commands

Documented happy path:

```bash
cd frontend && maestro test e2e/maestro/shared/boot-smoke.yaml
```

Package scripts:

```bash
cd frontend && yarn e2e:auth:boot-smoke
cd frontend && yarn e2e:auth:boot-smoke:negative
```

The negative command is expected to fail. It exists to prove the selector contract does not silently pass when the login-root selector is missing.

Additional task-10 commands:

```bash
cd frontend && maestro test e2e/maestro/ios/auth-provider-matrix.yaml
cd frontend && maestro test e2e/maestro/android/auth-provider-matrix.yaml
cd frontend && maestro test e2e/maestro/shared/guest-upgrade-forces-login.yaml
cd frontend && maestro test e2e/maestro/shared/onboarding-routing.yaml
cd frontend && maestro test e2e/maestro/shared/provider-cancel-or-fail.yaml
cd frontend && maestro test e2e/maestro/shared/logout-returns-to-login.yaml
cd frontend && maestro test e2e/maestro/shared/provider-success-to-authenticated.yaml
```

### Precondition-dependent flows

Some Task 10 flows intentionally verify only app-owned behavior after an external precondition is satisfied. This keeps the suite honest about third-party boundaries while still giving the final verification wave exact runnable entrypoints.

- `shared/guest-upgrade-forces-login.yaml` expects a device install seeded with the legacy `guest_profile` key before launch.
- `shared/onboarding-routing.yaml` supports `EXPECTED_ROUTE=start|onboard|home|auto`; exact route checks require a pre-seeded authenticated session plus onboarding state.
- `shared/logout-returns-to-login.yaml` expects an authenticated, fully onboarded session and deep-links into `zet://settings` before asserting logout behavior.
- `shared/provider-success-to-authenticated.yaml` expects the provider login to complete outside the app-owned boundary (live provider UI or a future dev hook) and then asserts the returned in-app route.
- `shared/provider-cancel-or-fail.yaml` starts from the login screen, taps a provider button, and then asserts the app returns safely to login after a config failure or manual provider cancellation; on Android it first reuses `android/launch-dev-client.yaml`, waits for the external Kakao/Chrome page, and backs out before the shared login-root assertion.

## Selector contract

The harness currently expects these stable IDs:

- `auth.login.screen.root`
- `auth.login.provider.apple.button`
- future provider flows should follow `auth.login.provider.<provider>.button`
- future shared error assertions should use `auth.login.error.banner`

The current smoke flow only asserts `auth.login.screen.root`, but the shared selector file keeps the auth harness naming stable for later tasks.

## Assumptions

- Both iOS and Android dev clients use the app id `com.geniusproject.zet` from `app.json`.
- `launchApp.clearState` is enough to avoid stale auth state during smoke verification.
- Android may land on Expo Dev Launcher first, then an Expo developer-menu onboarding screen, then a connected overlay; the Android launch flow waits for Development Build UI and then selects `http://10.0.2.2:8082`, taps `Continue`, and taps `Close` when those screens are visible.
- This harness verifies only app-owned selectors and app launch boundaries; provider-native UI automation belongs to later work.
- Expo Router deep links use the `zet://` scheme from `app.json`, so settings-route flows can enter the app at `zet://settings` without inventing a second test framework.
