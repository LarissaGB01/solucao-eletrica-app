# Architecture

## Overview

Offline mobile app that sizes conductors (cabeamento), circuit breakers (disjuntores) and conduits
(eletrodutos) according to NBR 5410, and shows the calculation step by step.

Clean Architecture, organized by feature inside each layer. Business rules are plain TypeScript
and don't depend on React Native, so they can be tested in isolation and reused unchanged on iOS.

```
            ┌──────────────────────────────────────────┐
            │ app (composition root)                   │
            │  wires implementations into use cases    │
            └───────┬───────────────┬──────────────────┘
                    │               │
          ┌─────────▼───────┐  ┌────▼─────────────┐
          │ presentation    │  │ infrastructure   │
          │ screens, hooks  │  │ port impls       │
          └───┬─────────┬───┘  └────┬─────────────┘
              │         │           │
   ┌──────────▼──┐  ┌───▼───────────▼──┐
   │ content     │  │ application      │
   │ pt-BR texts │  │ use cases        │
   └─────────────┘  └───────┬──────────┘
                            │
                    ┌───────▼──────────┐
                    │ domain           │
                    │ entities, VOs,   │
                    │ ports, rules     │
                    └──────────────────┘
```

## Modules

| Layer          | Path                 | Responsibility                                                                                   | Knows about                  |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------- |
| domain         | `src/domain`         | Entities, value objects, domain errors, ports, NBR 5410 rules, LaTeX formula builders            | nothing else                 |
| application    | `src/application`    | Use cases that orchestrate the domain (`DimensionarCabeamento`, …)                               | domain                       |
| infrastructure | `src/infrastructure` | Port implementations: `MockCalculadoraDimensionamento` (fixed fixtures), later local persistence | application, domain          |
| presentation   | `src/presentation`   | Screens, `useXxxViewModel` hooks, shared UI (Accordion, Stepper, Formula, NumericInput), theme   | application, domain, content |
| content        | `src/content`        | Static pt-BR texts: labels, theory, reference links                                              | nothing else                 |
| app            | `src/app`            | `App.tsx`, navigation, DI container (React context), provider setup                              | everything                   |

### Domain contexts

```
src/domain/
├── shared/                 Result, DomainError, combinarCampos, units: Tensao, Potencia,
│                           FatorPotencia, Temperatura, Comprimento, Corrente, SecaoNominal,
│                           QuantidadeCircuitos, QuantidadeCondutores
└── dimensionamento/
    ├── cabeamento/         ProjetoCabeamento (input), ResultadoCabeamento, enums:
    │                       FinalidadeCircuito, UtilizacaoCircuito, Fases, MetodoInstalacao, TipoCabo
    ├── disjuntor/          ProjetoDisjuntor, ResultadoDisjuntor
    ├── eletroduto/         ProjetoEletroduto, ResultadoEletroduto
    ├── fases.ts            Fases (shared by cabeamento and disjuntor)
    ├── sugestoes.ts        CondutorSugerido, DisjuntorSugerido, EletrodutoSugerido
    ├── formulas/           pure LaTeX builders for each calculation step
    └── ports/              CalculadoraDimensionamento (interface)
```

"Teoria" (theory) is static reference content. It lives in `content/` and has no domain model.

## Data flow

Example: sizing a cable.

```
FormCabeamentoScreen
  │ react-hook-form + zod ("," decimals); the zod schema delegates range rules to
  │ criarProjetoCabeamento, so value objects are the single source of validation
  ▼
useFormCabeamentoViewModel ──► receives a valid ProjetoCabeamento from the schema
  │
  ▼
DimensionarCabeamento (use case)
  │ calls port
  ▼
CalculadoraDimensionamento ◄── implemented by:
  │                             now:   infrastructure/mock/MockCalculadoraDimensionamento
  │                             later: domain/dimensionamento/nbr5410 (real offline engine)
  ▼
Result<ResultadoCabeamento, FalhaCalculo>
  │
  ▼
ResultadoCabeamentoScreen ──► PassoAPassoCabeamentoScreen (formulas from domain/formulas)
```

Each form screen is a thin `StepperForm`; shared form logic lives in
`presentation/features/formularios` and shared result cards in `presentation/features/resultados`.

Screens pass **domain data** between them, never raw form state. Results are plain readonly
objects so navigation state stays serializable. The DI container in
`src/app` decides which `CalculadoraDimensionamento` is used. Swapping mock → real engine is a
one-line change there, with no screen changes.

### Navigation

Route types (`RootStackParamList`) live in `presentation/navigation/routes.ts` so screens can type their props; the navigator that registers screens lives in `app/navigation/RootNavigator.tsx`.

```
Home ─┬─► Teoria
      ├─► FormCabeamento ─► ResultadoCabeamento ─► PassoAPassoCabeamento
      ├─► FormDisjuntor  ─► ResultadoDisjuntor  ─► PassoAPassoDisjuntor
      └─► FormEletroduto ─► ResultadoEletroduto ─► PassoAPassoEletroduto
```

## Dependency rules

Enforced by ESLint in `.eslintrc.js`. A violation fails `npm run lint` and CI.

| From ↓ may import → | domain | application | infrastructure | presentation | content | app |
| ------------------- | :----: | :---------: | :------------: | :----------: | :-----: | :-: |
| domain              |   ✅   |             |                |              |         |     |
| application         |   ✅   |     ✅      |                |              |         |     |
| infrastructure      |   ✅   |     ✅      |       ✅       |              |         |     |
| presentation        |   ✅   |     ✅      |                |      ✅      |   ✅    |     |
| content             |        |             |                |              |   ✅    |     |
| app                 |   ✅   |     ✅      |       ✅       |      ✅      |   ✅    | ✅  |

Additional rules:

- `domain` and `application` may not import `react`, `react-native`, `@react-native*`,
  `react-native-*` or `@react-navigation/*` (`no-restricted-imports`).
- Presentation reaches implementations only through use cases provided by the `app` container,
  never by importing `infrastructure` directly.
- Errors cross layers as `Result` values. Exceptions are reserved for programmer errors.

## Testing per layer

| Layer          | Test type                                                    | Tooling                        |
| -------------- | ------------------------------------------------------------ | ------------------------------ |
| domain         | Unit: value objects, rules, formula builders (≥90% coverage) | Jest                           |
| application    | Unit with a fake `CalculadoraDimensionamento`                | Jest                           |
| infrastructure | Mock fixtures satisfy domain invariants                      | Jest                           |
| presentation   | Component: validation, navigation, loading and error states  | React Native Testing Library   |
| whole app      | E2E happy paths per flow                                     | Maestro (CI, Android emulator) |

When the real engine replaces the mock, **golden tests** compare its output with results from the
original Java backend (`LarissaGB01/solucao_eletrica_backend`) for the same inputs.

## Decisions

Recorded in `docs/adr/` (copy `0000-template.md` for new ones):

- [0001](docs/adr/0001-react-native-cli-over-expo.md) React Native CLI instead of Expo
- [0002](docs/adr/0002-clean-architecture-with-enforced-layers.md) Clean Architecture with lint-enforced layers
- [0003](docs/adr/0003-portuguese-ubiquitous-language.md) Portuguese for domain terms, English for technical code
- [0004](docs/adr/0004-katex-in-webview-for-formulas.md) KaTeX in a WebView for formula rendering
- [0005](docs/adr/0005-mock-calculator-then-offline-engine.md) Mock calculator now, on-device NBR 5410 engine later
