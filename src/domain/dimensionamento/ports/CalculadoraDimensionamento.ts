import type { ProjetoCabeamento } from '../cabeamento/ProjetoCabeamento';
import type { ResultadoCabeamento } from '../cabeamento/ResultadoCabeamento';
import type { ProjetoDisjuntor } from '../disjuntor/ProjetoDisjuntor';
import type { ResultadoDisjuntor } from '../disjuntor/ResultadoDisjuntor';
import type { ProjetoEletroduto } from '../eletroduto/ProjetoEletroduto';
import type { ResultadoEletroduto } from '../eletroduto/ResultadoEletroduto';

/**
 * Sizes circuit components per NBR 5410.
 * Implemented by a mock now and by the on-device engine in Phase 5 (ADR 0005).
 * Async so the engine can move off the JS thread later without changing callers.
 */
export interface CalculadoraDimensionamento {
  dimensionarCabeamento(
    projeto: ProjetoCabeamento,
  ): Promise<ResultadoCabeamento>;
  dimensionarDisjuntor(projeto: ProjetoDisjuntor): Promise<ResultadoDisjuntor>;
  dimensionarEletroduto(
    projeto: ProjetoEletroduto,
  ): Promise<ResultadoEletroduto>;
}
