# 0007. Conduit table from the 2025 Kanalex catalog

- **Status:** Accepted
- **Date:** 2026-10-12

## Context

The conduit table came from the original backend's `normativas.sql`, taken from a Kanaflex catalog
whose link (`kanaflex.com.br/novosite/arquivos/mt_6.pdf`) no longer works. The product is the same
(Kanalex corrugated HDPE conduit); its current manual is
[Manual Técnico Kanalex (2025)](https://www.kanaflex.com.br/wp-content/uploads/2025/06/Manual-Tecnico-Kanalex-1.pdf),
Tabela 6, p. 11. Some diameters changed slightly (e.g. 1.1/2": external 56 → 55 mm,
internal 43 → 42 mm).

## Decision

- `nbr5410/tabelas/eletrodutos.ts` holds the 2025 values and is maintained by hand
  (`scripts/converter-normativas.mjs` no longer writes it).
- `calcularEletroduto` takes the table as an optional parameter. The golden tests pass the old table
  (`golden/eletrodutos-2023.json`), so they still check the engine against the Java backend.

## Consequences

- 5 of 420 combinations (sections 1.5–1000 mm², 1–20 conductors) now get a different conduit, all
  at the boundary between two sizes (e.g. 6 mm² × 8: 1.1/2" → 2").
- Future catalog updates only touch `eletrodutos.ts` and its test.
