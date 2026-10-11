# 0006. Offline engine: backend rules at full precision

- **Status:** Accepted
- **Date:** 2026-10-11

## Context

Phase 5 ports the Java backend (`LarissaGB01/solucao_eletrica_backend`) into the app. Running the
backend locally against its own seed data (`normativas.sql`) showed three behaviours that are
artefacts of the implementation, not of NBR 5410:

1. `BigDecimal.divide(x, RoundingMode)` keeps the dividend's scale, so results depend on how the
   client serialised numbers: 2200 VA / 127 V gave **17 A** (integer input) or 17.32 A (2200.00).
2. The conductor diameter rounds 4·S/π to the decimal places of S (10 mm² → √13 instead of √12.73).
3. In the combined flow the conduit uses the number of grouped circuits as the conductor count,
   and the conduit formula `d · n · 100 / 40` grows linearly with n (an area-based 40 % fill rule
   would grow with √n). In practice it oversizes, i.e. errs on the safe side.

## Decision

- Same formulas, constants, tables and lookup rules as the backend (strict `>`/`<` for breakers,
  `>=` for conduction and temperature rows, external diameter `>` for conduits).
- **Full floating-point precision**: no truncation of intermediates; values are rounded only for
  display. This removes behaviour 1 and 2.
- **Keep behaviour 3** for parity with the TCC; revisit only with an engineering review.
- Tables live as typed data in `domain/dimensionamento/nbr5410/tabelas`, generated once from
  `normativas.sql` by `scripts/converter-normativas.mjs`.
- Golden fixtures come from the real backend (`scripts/golden/gerar-golden.mjs`, decimal inputs).
  Continuous values must match within 0.01 absolute or 1 % relative; discrete choices (section,
  breaker, conduit, errors) must match exactly. The conductor-diameter difference is asserted to be
  exactly behaviour 2.

## Consequences

- The app needs no network and gives the same component choices as the backend for all 39
  golden cases.
- Displayed intermediate values can differ from the old app by its truncation (17,32 A vs 17 A).
- `MockCalculadoraDimensionamento` was removed; tests use `fakeCalculadora` and
  `resultadosExemplo` (the engine's own output for the example project).
