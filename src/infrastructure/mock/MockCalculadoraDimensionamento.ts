import type { ResultadoCabeamento } from '../../domain/dimensionamento/cabeamento/ResultadoCabeamento';
import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';

/**
 * Fixed result for a 127 V / 2200 VA outlet circuit (method B1, PVC, 30 °C).
 * Values follow NBR 5410 tables so screens look realistic until the Phase 5 engine lands.
 */
export const RESULTADO_CABEAMENTO_MOCK: ResultadoCabeamento = {
  condutor: { secaoNominalMm2: 2.5, correnteMaximaA: 24 },
  disjuntor: { nome: 'Siemens 5SL1 C20', correnteNominalA: 20 },
  eletroduto: { diametroNominalPolegadas: '3/4"', diametroNominalMm: 25 },
};

/** Ignores the input on purpose (ADR 0005): every project gets the same result. */
export class MockCalculadoraDimensionamento
  implements CalculadoraDimensionamento
{
  dimensionarCabeamento(): Promise<ResultadoCabeamento> {
    return Promise.resolve(RESULTADO_CABEAMENTO_MOCK);
  }
}
