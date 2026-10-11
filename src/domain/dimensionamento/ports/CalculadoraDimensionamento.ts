import type { ProjetoCabeamento } from '../cabeamento/ProjetoCabeamento';
import type { ResultadoCabeamento } from '../cabeamento/ResultadoCabeamento';

/**
 * Sizes circuit components per NBR 5410.
 * Implemented by a mock now and by the on-device engine in Phase 5 (ADR 0005).
 * Async so the engine can move off the JS thread later without changing callers.
 */
export interface CalculadoraDimensionamento {
  dimensionarCabeamento(
    projeto: ProjetoCabeamento,
  ): Promise<ResultadoCabeamento>;
}
