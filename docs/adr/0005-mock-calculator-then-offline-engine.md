# 0005. Mock calculator now, on-device NBR 5410 engine later

- **Status:** Accepted
- **Date:** 2026-10-10

## Context

In the old app all calculations happened in a Java backend (`LarissaGB01/solucao_eletrica_backend`)
that was never deployed publicly. The new app should work without internet. Porting the
calculation logic is a large task and shouldn't block building the UI.

## Decision

- The domain defines a port, `CalculadoraDimensionamento`, with one method per flow (cabeamento,
  disjuntor, eletroduto) returning `Result<Resultado…, DomainError>`.
- Phases 1–4: `infrastructure/mock/MockCalculadoraDimensionamento` returns fixed, realistic results.
- Phase 5: the Java backend's rules and NBR 5410 tables are ported to pure TypeScript domain
  services that implement the same port. Golden tests compare their outputs with the Java
  backend's for the same inputs.
- No HTTP client or backend dependency in the app.

## Consequences

- UI work can proceed immediately, and switching to the real engine is a one-line change in the DI container.
- Until Phase 5, results are fake. The app must not be published to production before then.
- The calculation rules live in two places (Java backend and TS app) until the backend is retired.
- Mock fixtures must use the same domain types as the real engine, so the UI doesn't change at the switch.
