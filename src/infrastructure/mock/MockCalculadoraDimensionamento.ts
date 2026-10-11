import type { ResultadoCabeamento } from '../../domain/dimensionamento/cabeamento/ResultadoCabeamento';
import type { ResultadoDisjuntor } from '../../domain/dimensionamento/disjuntor/ResultadoDisjuntor';
import type { ResultadoEletroduto } from '../../domain/dimensionamento/eletroduto/ResultadoEletroduto';
import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';
import {
  RESULTADO_CABEAMENTO_EXEMPLO,
  RESULTADO_DISJUNTOR_EXEMPLO,
  RESULTADO_ELETRODUTO_EXEMPLO,
} from '../../domain/dimensionamento/resultadosExemplo';

/**
 * Ignores the input on purpose (ADR 0005): every project gets the same example result,
 * including its step-by-step values, until the Phase 5 engine lands.
 */
export class MockCalculadoraDimensionamento
  implements CalculadoraDimensionamento
{
  dimensionarCabeamento(): Promise<ResultadoCabeamento> {
    return Promise.resolve(RESULTADO_CABEAMENTO_EXEMPLO);
  }

  dimensionarDisjuntor(): Promise<ResultadoDisjuntor> {
    return Promise.resolve(RESULTADO_DISJUNTOR_EXEMPLO);
  }

  dimensionarEletroduto(): Promise<ResultadoEletroduto> {
    return Promise.resolve(RESULTADO_ELETRODUTO_EXEMPLO);
  }
}
