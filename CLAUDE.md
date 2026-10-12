# CLAUDE.md

Android and iOS app for sizing electrical cables, circuit breakers and conduits per **NBR 5410**.
Rewrite of the Expo app `LarissaGB01/solucao_eletrica`. Fully offline: no backend, no HTTP.

See `ARCHITECTURE.md` for layers and data flow, `PLAN.md` for the roadmap and current phase.

## Stack

- React Native 0.87 (CLI, **no Expo**), React 19, TypeScript (strict + `noUncheckedIndexedAccess`)
- Navigation: React Navigation 7 native-stack (Phase 1)
- Forms: react-hook-form + zod (Phase 2)
- Formulas: KaTeX inside `react-native-webview` (Phase 1)
- Tests: Jest + React Native Testing Library; Maestro for E2E (Phase 6)
- Tooling: ESLint 8 (`@react-native` + `eslint-plugin-boundaries`), Prettier, Husky, lint-staged, commitlint

## Commands

```sh
npm ci                  # install (Node 22, see .nvmrc); postinstall generates KaTeX assets
npm start               # Metro bundler
npm run android         # build + run on emulator/device (needs JDK 17 + Android SDK)
npm run android:bundle  # signed Play bundle (.aab); see docs/play/README.md
npm run ios             # iPhone simulator (needs Xcode; first run: cd ios && pod install)
npm run ios:release     # signed App Store package; `-- upload` sends it to TestFlight
npm run e2e             # Maestro flows in .maestro/ on the running emulator/simulator
adb reverse tcp:8081 tcp:8081  # if the app can't reach Metro (Android 17 blocks local network in debug)
npm test                # Jest
npm run test:watch      # Jest watch mode
npm run test:coverage   # Jest + coverage thresholds
npm run lint            # ESLint, zero warnings allowed
npm run lint:fix
npm run typecheck       # tsc --noEmit
npm run format          # Prettier write
npm run format:check
npm run validate        # lint + typecheck + format:check + test:coverage (same as CI)
```

Run a single test file: `npx jest src/domain/shared/Result.test.ts`

After changing `babel.config.js`, restart Metro with `npm start -- --reset-cache`.
Golden fixtures: see the header of `scripts/golden/gerar-golden.mjs` (needs the Java backend running).
Store material and publishing steps: `docs/play/` (Google Play), `docs/app-store/` (App Store). Current state: `STATUS.md`.

## Layout

```
src/app/             composition root: App, navigation, providers, wiring
src/domain/          pure TS business rules (no React, no RN)
src/application/     use cases
src/infrastructure/  adapters to the outside world (storage later)
src/presentation/    screens, view-model hooks, UI components, theme
src/content/         static pt-BR texts (theory, labels)
```

## Rules

- `npm run validate` must pass before any task is called done.
- Layer imports are enforced by ESLint (`boundaries/dependencies`). Never disable that rule; fix the dependency.
- `src/domain` and `src/application` must not import `react`, `react-native` or any RN library.
- No `any`. No non-null `!` outside tests. Parse untrusted input with zod.
- Domain functions return `Result<T, E>` (`src/domain/shared/Result.ts`) instead of throwing.
- No Expo packages, no HTTP clients (the app is offline by design).
- `*.generated.ts` files are build outputs (gitignored). Regenerate with `npm run postinstall`; never edit them.
- Don't edit `android/` or `ios/` unless the task is about native config; explain why when you do.
- Every new domain/application file with behavior gets a colocated `*.test.ts` (type-only files excepted). Domain coverage threshold: 90%.

## Conventions

- **Ubiquitous language in Portuguese** for domain concepts: `Disjuntor`, `Eletroduto`,
  `SecaoCondutor`, `FatorPotencia`. Technical names in English: `Mapper`, `UseCase`, `Port`, `Screen`.
- UI text is pt-BR and lives in `src/content/`, not inline in components.
- Files: components/types `PascalCase.tsx`, hooks `useCamelCase.ts`, tests `Name.test.ts(x)` next to the file.
- One component per file. Screens stay thin; logic goes in a `useXxxViewModel` hook.
- Value objects expose `create(raw): Result<VO, DomainError>`; constructors are private.
- LaTeX for formulas is produced by pure builder functions in `domain`, unit-tested.
- Styling: `StyleSheet.create` + tokens from `src/presentation/theme`. Brand color `#D25719`.
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `test:`, `docs:`, `refactor:`), enforced by commitlint.
- Branches: `feat/…`, `fix/…`, `chore/…` off `main`; merge via PR with green CI.
- Architecture decisions go in `docs/adr/NNNN-title.md`.
