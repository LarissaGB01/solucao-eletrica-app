# Status report — Solução Elétrica

_As of 2026-10-12._ The app is feature-complete and runs offline on Android and iOS. iOS 1.0 is in App Store
review; Google Play is waiting on account validation.

| Area                    | State                                                               | Blocked on                                                |
| ----------------------- | ------------------------------------------------------------------- | --------------------------------------------------------- |
| Development (features)  | Done: all 3 sizing flows, Passo a passo, Teoria, offline engine     | —                                                         |
| Development (hardening) | Partly done: E2E flows run in CI; accessibility pass pending        | —                                                         |
| Android                 | Release-ready: signed `.aab` builds, store material in `docs/play/` | Google Play account validation, then a 14-day closed test |
| iOS                     | 1.0 (build 1) submitted for App Store review on 2026-10-12          | Apple review (1–3 days), then it goes live automatically  |

Day-to-day tracking: [PLAN.md](PLAN.md) (phases with checkboxes), [ARCHITECTURE.md](ARCHITECTURE.md),
decisions in [docs/adr](docs/adr), open work in the
[pull requests](https://github.com/LarissaGB01/solucao-eletrica-app/pulls).

---

## 1. Development

### What the app does

| Screen                  | What works                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| Home                    | 4 options: cable, breaker, conduit, theory                                                                 |
| Dimensionar Cabeamento  | 4-step form (circuit, electrical data, installation, materials) → suggested conductor, breaker and conduit |
| Dimensionar Disjuntores | Phases + design current + conductor capacity → suggested Siemens breaker                                   |
| Dimensionar Eletrodutos | Conductor section + number of conductors → suggested Kanaflex conduit                                      |
| Resultado               | Answer cards, "Ver cálculos", "Dimensionar outro" (fresh form), "Voltar ao início"                         |
| Passo a passo           | Every step: formula → formula with values → result, plus the table rows used, highlighted                  |
| Base Teórica            | 14 sections: formulas with an "Onde:" symbol legend, tables (tap for full screen with zoom), source links  |

Forms start prefilled with common Brazilian values (127/220 V, 2200 VA, FP 0,92, 15 m, 2,5 mm²),
validate every field with pt-BR messages, and show a typical-value hint under each input.

### How it works

- **Stack:** React Native 0.87 (CLI, no Expo), React 19, TypeScript strict, React Navigation 7,
  react-hook-form + zod, KaTeX inside a WebView for formulas (bundled, works offline).
- **Layers** (enforced by ESLint): `domain` (pure rules) ← `application` (use cases) ←
  `presentation` (screens) ← `app` (wiring). See [ARCHITECTURE.md](ARCHITECTURE.md).
- **Calculation engine:** `src/domain/dimensionamento/nbr5410/motor.ts`, a port of the original Java
  backend with the same formulas, constants and lookup rules. Its tables (temperature factors,
  960 conduction rows, Siemens breakers) were generated from the backend's `normativas.sql`; the
  conduit table follows the Kanalex 2025 catalog ([ADR 0007](docs/adr/0007-kanalex-2025-catalog.md)). It runs on the phone with no network.
- **Verified against the real backend:** 39 golden cases captured by running the original Java
  backend locally (`scripts/golden/`). Every component choice matches exactly. One deliberate
  difference: the app keeps full precision where the backend truncated (2200 VA / 127 V →
  17,32 A, not 17 A). See [ADR 0006](docs/adr/0006-offline-engine-full-precision.md).

### Quality checks

| Check                                      | Count                                                      | Command            |
| ------------------------------------------ | ---------------------------------------------------------- | ------------------ |
| Unit and component tests (Jest)            | 270 tests in 62 files                                      | `npm test`         |
| Lint, types, format, coverage (same as CI) | domain coverage ≥ 90 %                                     | `npm run validate` |
| E2E flows (Maestro)                        | 5 flows: cable, breaker, conduit, theory, validation error | `npm run e2e`      |
| CI on every PR (GitHub Actions)            | lint/typecheck/tests, Android build, Maestro on emulator   | automatic          |

### Development: what's missing (Phase 6, ~4–6 h)

- [ ] Accessibility pass with TalkBack/VoiceOver; text at 200 % without clipping.
- [ ] Crash reporting (Sentry) — optional, needs a Sentry account.

Known small issues, none blocking:

- Formulas take ~1 s to appear on iOS and are slightly smaller than on Android.
- Once, a formula stayed blank right after a dev reload on Android; not reproduced since.
- The conduit formula is kept exactly as the backend had it (`d · n · 100 / 40`); an area-based
  rule would give smaller conduits. Documented in ADR 0006.

---

## 2. Android

### Android: done

- Runs on Android 7.0+ (minSdk 24, targetSdk 36). Tested on an Android 17 emulator.
- Release build: no internet permission, app name "Solução Elétrica", adaptive icon (bolt on
  brand orange, supports themed icons), launch screen with the same bolt.
- Keyboard: the bottom bar rises above the number pad (edge-to-edge, so `KeyboardAvoidingView` pads it).
- Signed with your upload key (`android/upload-keystore.jks`, read from
  `android/keystore.properties`; both gitignored). Verified: certificate `CN=Larissa Barcelos`,
  SHA-256 starting `40:76:EE:02`.
- Store material in [docs/play](docs/play): pt-BR listing, privacy policy, 512 px icon,
  feature graphic, 5 screenshots, answers for every "App content" form.

### Android: what's missing

| Step                                                                    | Who                 | Time           |
| ----------------------------------------------------------------------- | ------------------- | -------------- |
| Google Play account validation                                          | Google              | days           |
| Fill the store listing and "App content" forms from `docs/play/`        | you                 | ~1 h           |
| Closed test: upload the `.aab`, invite ≥ 12 testers, keep them opted in | you                 | 14 days        |
| Apply for production access, then publish                               | you + Google review | a few days     |
| CI that builds and uploads a signed bundle on a version tag (Phase 7)   | dev                 | ~3 h, optional |

Full guide: [docs/play/README.md](docs/play/README.md).

### Android: run it locally

Needs Node 22, JDK 17 (Zulu) and Android Studio with the SDK and an emulator.

```sh
npm install                  # also builds the offline KaTeX assets
npm start                    # Metro, keep it running
npm run android              # second terminal: build + install on the emulator
adb reverse tcp:8081 tcp:8081  # only if the app shows "Unable to load script"
```

Store bundle (needs `android/keystore.properties`):

```sh
npm run android:bundle
# → android/app/build/outputs/bundle/release/app-release.aab
```

If Gradle says "SDK location not found", `android/local.properties` must contain
`sdk.dir=/Users/<you>/Library/Android/sdk` (gitignored, one per machine).

### Android: where to check

- Play Console → Dashboard: the checklist of what Google still requires.
- Play Console → Testing → Closed testing: testers opted in and days elapsed.
- [docs/play/README.md](docs/play/README.md): steps and form answers.

---

## 3. iOS

### iOS: done

- Runs on iOS 15.1+; tested on the iOS 27 simulator (iPhone 17e).
- Adopted the scene lifecycle, which iOS 27 requires (the React Native template crashed at launch).
- Name "Solução Elétrica", pt-BR region, bolt icon, orange launch screen, no location permission,
  encryption export question answered in `Info.plist`.
- Keyboard: the bottom bar rises above the number pad; dragging closes it.
- All 5 Maestro flows pass on iOS.
- Apple Developer account active (team FB7R6D99A3); signing set up; signed App Store package builds with `npm run ios:release`.
- iPhone only (iPads run it in iPhone mode), so no iPad screenshots or iPad review.
- App created in App Store Connect; build 1 uploaded to TestFlight on 2026-10-12.
- Listing filled and version 1.0 (1) submitted for review on 2026-10-12 (release: automatic after approval).
- Version 1.0.1 (2) on `main`: Kanalex 2025 conduits, native tables with zoom, symbol legend. Next TestFlight upload; send to review once 1.0 is live.

### iOS: what's missing

| Step                                              | Who   | Time           |
| ------------------------------------------------- | ----- | -------------- |
| App Review, then automatic release                | Apple | 1–3 days       |
| macOS CI job that uploads to TestFlight (Phase 8) | dev   | ~3 h, optional |

### iOS: run it locally

Needs Xcode (installed: Xcode 27) and CocoaPods (`brew install cocoapods`).

```sh
cd ios && pod install && cd ..   # first time, and after adding native libraries
npm start                        # Metro
npm run ios                      # second terminal: build + open the simulator
npm run e2e                      # Maestro flows on the running simulator
```

Maestro is installed in `~/.maestro/bin` (`curl -fsSL https://get.maestro.mobile.dev | bash`).

### iOS: where to check

- App Store Connect → Solução Elétrica → **Revisão de apps**: review status (Apple also emails).
- App Store Connect → **TestFlight**: builds and testers.
- [docs/app-store/README.md](docs/app-store/README.md): listing fields and how to resubmit.
- [PLAN.md](PLAN.md), Phase 8: remaining iOS items.

---

## Command reference

| Command                                | What it does                                                          |
| -------------------------------------- | --------------------------------------------------------------------- |
| `npm start`                            | Metro bundler                                                         |
| `npm run android` / `npm run ios`      | Build and run on emulator / simulator                                 |
| `npm test`                             | Jest                                                                  |
| `npm run validate`                     | Everything CI checks                                                  |
| `npm run e2e`                          | Maestro flows                                                         |
| `npm run android:bundle`               | Signed Play bundle                                                    |
| `npm run ios:release [-- upload]`      | Signed App Store package; `upload` sends it to TestFlight             |
| `python3 scripts/gerar-icones.py`      | Regenerate icons, launch image and store images (needs Pillow)        |
| `node scripts/golden/gerar-golden.mjs` | Re-capture golden cases from the Java backend (see the script header) |
