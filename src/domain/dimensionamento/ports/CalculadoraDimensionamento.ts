import type { Result } from '../../shared/Result';
import type { ProjetoCabeamento } from '../cabeamento/ProjetoCabeamento';
import type { ResultadoCabeamento } from '../cabeamento/ResultadoCabeamento';
import type { ProjetoDisjuntor } from '../disjuntor/ProjetoDisjuntor';
import type { ResultadoDisjuntor } from '../disjuntor/ResultadoDisjuntor';
import type { ProjetoEletroduto } from '../eletroduto/ProjetoEletroduto';
import type { ResultadoEletroduto } from '../eletroduto/ResultadoEletroduto';
import type { ErroDimensionamento } from '../nbr5410/motor';

/**
 * Sizes circuit components per NBR 5410. Implemented by the offline engine (ADR 0006).
 * Async so the engine can move off the JS thread later without changing callers.
 * Only cable sizing can fail on valid input (temperature or current outside the tables);
 * breaker and conduit lookups return `null` when nothing fits.
 */
export interface CalculadoraDimensionamento {
  dimensionarCabeamento(
    projeto: ProjetoCabeamento,
  ): Promise<Result<ResultadoCabeamento, ErroDimensionamento>>;
  dimensionarDisjuntor(projeto: ProjetoDisjuntor): Promise<ResultadoDisjuntor>;
  dimensionarEletroduto(
    projeto: ProjetoEletroduto,
  ): Promise<ResultadoEletroduto>;
}
