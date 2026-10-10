# 0003. Portuguese for domain terms, English for technical code

- **Status:** Accepted
- **Date:** 2026-10-10

## Context

The domain comes from the Brazilian standard NBR 5410 and the original TCC, both in Portuguese
(`disjuntor`, `eletroduto`, `seção do condutor`, `fator de agrupamento`). Translating these terms
loses precision and makes it harder to check the code against the standard and the old backend.
Technical patterns (use case, mapper, port) are conventionally named in English.

## Decision

- Domain concepts use Portuguese names: `Disjuntor`, `Eletroduto`, `SecaoCondutor`, `FatorPotencia`,
  `DimensionarCabeamento`.
- Technical constructs use English: `Result`, `Mapper`, `UseCase`, `Port`, `Screen`, `useXxxViewModel`.
- Identifiers are written without accents (`Secao`, not `Seção`).
- UI text is pt-BR and lives in `src/content`.
- Docs, code comments and commit messages are in English.

## Consequences

- Code reads like the standard and the TCC, so domain review is straightforward.
- Names like `DimensionarCabeamentoUseCase` mix two languages; this is intentional.
- Contributors who don't speak Portuguese need a glossary (add one to `ARCHITECTURE.md` when the
  domain grows).
