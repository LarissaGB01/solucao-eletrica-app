# Implementation Plan

Rewrite of the Expo app `LarissaGB01/solucao_eletrica` as a bare React Native + TypeScript app.
Android and iOS from the same code. Fully offline: results come from an on-device NBR 5410 engine
ported from `LarissaGB01/solucao_eletrica_backend` (Phase 5).

Estimates assume part-time work. Total ≈ 75–90h plus the 14-day Play closed test.

**Current phase:** 6, Hardening. In parallel: store publishing (Phases 7 and 8); iOS 1.0 is in App Store review since 2026-10-12.

---

## Phase 0: Skeleton & tooling (4–6h)

- [x] RN 0.87 CLI project, applicationId `com.larissagb.solucaoeletrica`
- [x] TypeScript strict + `noUncheckedIndexedAccess`
- [x] Layer folders under `src/` + ESLint boundary rules
- [x] Prettier, Husky pre-commit (lint-staged), commitlint
- [x] Jest + React Native Testing Library, `Result` type with tests
- [x] GitHub Actions: lint, typecheck, format, tests, Android debug build
- [x] CLAUDE.md, ARCHITECTURE.md, PLAN.md
- [x] ADRs 0001–0005 in `docs/adr/` (RN CLI over Expo, Clean Architecture, Portuguese domain language, KaTeX in a WebView, mock → offline engine)
- [x] Push branch, CI green on GitHub, protect `main` (ruleset: PR + green CI required, squash only)

**Acceptance criteria**

- `npm run validate` passes locally and in CI
- A PR that imports `react-native` inside `src/domain` fails CI
- `assembleDebug` succeeds in CI

## Phase 1: Foundation & shared UI (8–10h)

- [x] Theme tokens (colors, spacing, typography) taken from the old app
- [x] React Navigation 7 native-stack with typed route params; Home screen (2-column option grid); placeholder screen for routes of later phases
- [x] Domain shared kernel: `DomainError`, value objects `Tensao`, `Potencia`, `FatorPotencia`, `Temperatura`, `Comprimento`
- [x] UI components: `Accordion` (core `LayoutAnimation`, no reanimated needed), `Stepper`, `NumericInput` + `parseDecimal` (accepts "," decimals), `Segmented`, `Formula` (KaTeX in a WebView, assets inlined offline)

**Acceptance criteria**

- Home screen renders on an Android emulator and matches the old app visually
- `Formula` renders `\frac{a}{b}` correctly on a device
- Every value object rejects invalid input (tested: negative, zero, NaN, out-of-range)
- Every shared UI component has an RNTL test

## Phase 2: Cabeamento vertical slice (10–12h)

- [x] DI container: `UseCases` context + `useUseCases()` hook in `presentation`, provided by `src/app` (moved from Phase 1: nothing to inject before the first use case)
- [x] Domain: `ProjetoCabeamento`, `ResultadoCabeamento`, enums, port `CalculadoraDimensionamento`
- [x] Infrastructure: `MockCalculadoraDimensionamento` with fixed, realistic fixture results
- [x] Application: `DimensionarCabeamento` use case + tests with a fake port
- [x] Presentation: 4-step form (react-hook-form + zod), loading state, result screen
- [x] Error path: invalid input shows field messages and never calls the use case

Picker/spinner replacements: `Segmented` (2–3 options), `ChipGroup` (installation method), `NumberSpinner` (temperature, grouped circuits).

**Acceptance criteria**

- On the emulator: Home → form → result shows the recommended conductor, breaker and conduit
- Required fields, numeric ranges and power factor (0, 1] are validated with pt-BR messages
- Domain + application coverage ≥90%

## Phase 3: Disjuntor + Eletroduto slices (8–10h)

- [x] Disjuntor: domain, mock, use case, form, result
- [x] Eletroduto: domain, mock, use case, form, result
- [x] Extract duplicated form/result pieces into `presentation/ui` or `domain/shared`

Shared pieces: `combinarCampos` (domain), `calcular` (application), `features/formularios` (schema helpers, `useFormularioValidado`, `useCalculo`, phase options), `StepperForm` (ui), `features/resultados` (cards + layout).

**Acceptance criteria**

- All 3 flows work end to end on the emulator
- No copy-pasted component appears in more than one feature folder

## Phase 4: Passo a passo + Teoria (10–12h)

- [x] Pure LaTeX builders in `domain/dimensionamento/formulas` for every step (single-phase and three-phase variants).
- [x] Step-by-step screens for the 3 flows (accordion per step: formula with symbols → formula with values → result)
- [x] Teoria screen with all sections, table images, and NBR/Siemens/Kanaflex reference links (PR 4a)
- [x] Move all pt-BR texts into `src/content`

**Acceptance criteria**

- Every formula builder has a unit test comparing the exact LaTeX string
- Screen-by-screen feature parity with the old app (checklist from `docs/demonstrativoApp.md` of the old repo)

## Phase 5: Offline calculation engine (15–25h)

- [x] Read the Java backend and list every rule + NBR 5410 table it uses
- [x] Port the tables as typed data in `domain/dimensionamento/nbr5410/tabelas`
- [x] Port the calculations as pure domain services implementing `CalculadoraDimensionamento`
- [x] Golden tests: ≥10 input sets per flow, outputs compared with the Java backend's
- [x] Switch the DI container from the mock to the real engine

**Acceptance criteria**

- All golden tests pass: continuous values within 0.01 or 1 % (backend truncation, ADR 0006), discrete choices exact
- The app works in airplane mode
- `MockCalculadoraDimensionamento` removed (unused); tests use `fakeCalculadora` and `resultadosExemplo`

## Phase 6: Hardening (6–8h)

- [ ] Maestro E2E: 3 happy paths + 1 validation-error flow (flows written and passing on iOS; CI pending)
- [ ] Accessibility labels on all inputs/buttons; text scales to 200% without clipping
- [x] App icon (adaptive, bolt on brand orange) and iOS launch screen; Android launch screen still pending (`react-native-bootsplash`)
- [ ] Crash reporting (Sentry) with source maps uploaded from CI

**Acceptance criteria**

- E2E suite is green on `main`
- Manual accessibility pass with TalkBack on all screens

## Phase 7: Release to Google Play (6–8h + 14 days)

- [x] Upload keystore and signed AAB built locally (`npm run android:bundle`, `android/keystore.properties`)
- [ ] Play App Signing (on first upload), keystore secrets in GitHub Actions
- [ ] Fastlane `supply`; CI builds a signed AAB on tag `v*`; `versionCode` = CI run number
- [x] Play listing (pt-BR), privacy policy, data safety answers (`docs/play/`)
- [ ] Google Play account validation (waiting on Google)
- [ ] Internal track → closed test (12 testers, 14 days) → production

**Acceptance criteria**

- Pushing tag `v1.0.0` produces a signed AAB in the internal track with no manual steps
- App is live on Google Play

## Phase 8: iOS (~2 days)

- [x] `pod install`, UIScene lifecycle (required by iOS 27), icon, launch screen, keyboard avoidance
- [x] Xcode automatic signing (team FB7R6D99A3, cloud-managed distribution certificate, so no Fastlane `match`); iPhone only
- [x] TestFlight upload from the Mac (`npm run ios:release -- upload`)
- [x] App Store listing (`docs/app-store/`) and 1.0 submitted for review (2026-10-12)
- [ ] Approved by Apple and live (releases automatically after approval)
- [ ] macOS CI job that uploads to TestFlight (optional)
- [x] Parity pass on the iPhone simulator (all Maestro flows pass on iOS 27)

**Acceptance criteria**

- TestFlight build installs and all E2E flows pass on the iOS simulator
- App is live on the App Store
