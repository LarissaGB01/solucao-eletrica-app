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

| Layer          | Path                 | Responsibility                                                                                 | Knows about                  |
| -------------- | -------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------- |
| domain         | `src/domain`         | Entities, value objects, domain errors, ports, NBR 5410 rules, LaTeX formula builders          | nothing else                 |
| application    | `src/application`    | Use cases that orchestrate the domain (`DimensionarCabeamento`, …)                             | domain                       |
| infrastructure | `src/infrastructure` | Adapters to the outside world (empty today; local persistence later)                           | application, domain          |
| presentation   | `src/presentation`   | Screens, `useXxxViewModel` hooks, shared UI (Accordion, Stepper, Formula, NumericInput), theme | application, domain, content |
| content        | `src/content`        | Static pt-BR texts: labels, theory, reference links                                            | nothing else                 |
| app            | `src/app`            | `App.tsx`, navigation, DI container (React context), provider setup                            | everything                   |

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
    ├── memoria.ts          MemoriaCondutor/Disjuntor/Eletroduto: intermediate values per step
    ├── nbr5410/            offline engine: motor.ts + CalculadoraNbr5410 (implements the port),
    │                       typed tables, constants, golden fixtures from the Java backend
    ├── resultadosExemplo.ts one coherent example result (engine output; used by tests)
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
CalculadoraDimensionamento ◄── implemented by domain/dimensionamento/nbr5410/CalculadoraNbr5410
  │                             (pure offline engine over typed NBR/Siemens/Kanaflex tables)
  ▼
Result<ResultadoCabeamento, ErroDimensionamento | FalhaCalculo>
  │
  ▼
ResultadoCabeamentoScreen ──► PassoAPasso*Screen (result.memoria → LaTeX from domain/formulas)
```

Each form screen is a thin `StepperForm`; shared form logic lives in
`presentation/features/formularios` and shared result cards in `presentation/features/resultados`.

Screens pass **domain data** between them, never raw form state. Results are plain readonly
objects so navigation state stays serializable. The DI container in
`src/app` decides which `CalculadoraDimensionamento` is used.

### Navigation

Route types (`RootStackParamList`) live in `presentation/navigation/routes.ts` so screens can type their props; the navigator that registers screens lives in `app/navigation/RootNavigator.tsx`.

```
Home ─┬─► Teoria
      ├─► FormCabeamento ─► ResultadoCabeamento ─┬─► PassoAPassoCondutor
      │                                          ├─► PassoAPassoDisjuntor
      │                                          └─► PassoAPassoEletroduto
      ├─► FormDisjuntor  ─► ResultadoDisjuntor  ───► PassoAPassoDisjuntor
      └─► FormEletroduto ─► ResultadoEletroduto ───► PassoAPassoEletroduto
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

| Layer          | Test type                                                    | Tooling                                  |
| -------------- | ------------------------------------------------------------ | ---------------------------------------- |
| domain         | Unit: value objects, rules, formula builders (≥90% coverage) | Jest                                     |
| application    | Unit with a fake `CalculadoraDimensionamento`                | Jest                                     |
| infrastructure | Adapter tests (none yet)                                     | Jest                                     |
| presentation   | Component: validation, navigation, loading and error states  | React Native Testing Library             |
| whole app      | E2E happy paths per flow                                     | Maestro (`.maestro/`, local; CI pending) |

**Golden tests** (`nbr5410/motor.golden.test.ts`) compare the engine with fixtures captured from
the original Java backend (`scripts/golden/gerar-golden.mjs`); see ADR 0006 for tolerances.

## Decisions

Recorded in `docs/adr/` (copy `0000-template.md` for new ones):

- [0001](docs/adr/0001-react-native-cli-over-expo.md) React Native CLI instead of Expo
- [0002](docs/adr/0002-clean-architecture-with-enforced-layers.md) Clean Architecture with lint-enforced layers
- [0003](docs/adr/0003-portuguese-ubiquitous-language.md) Portuguese for domain terms, English for technical code
- [0004](docs/adr/0004-katex-in-webview-for-formulas.md) KaTeX in a WebView for formula rendering
- [0005](docs/adr/0005-mock-calculator-then-offline-engine.md) Mock calculator now, on-device NBR 5410 engine later (superseded)
- [0006](docs/adr/0006-offline-engine-full-precision.md) Offline engine: backend rules at full precision
