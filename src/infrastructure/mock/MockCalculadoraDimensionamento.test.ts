import { projetoCabeamentoExemplo } from '../../domain/dimensionamento/cabeamento';
import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';
import {
  MockCalculadoraDimensionamento,
  RESULTADO_CABEAMENTO_MOCK,
} from './MockCalculadoraDimensionamento';

describe('MockCalculadoraDimensionamento', () => {
  it('returns the fixed cabeamento result', async () => {
    const calculadora: CalculadoraDimensionamento =
      new MockCalculadoraDimensionamento();

    await expect(
      calculadora.dimensionarCabeamento(projetoCabeamentoExemplo()),
    ).resolves.toBe(RESULTADO_CABEAMENTO_MOCK);
  });

  it('is coordinated as NBR 5410 requires: breaker current <= conductor capacity', () => {
    const { condutor, disjuntor } = RESULTADO_CABEAMENTO_MOCK;
    expect(disjuntor?.correnteNominalA).toBeLessThanOrEqual(
      condutor.correnteMaximaA,
    );
  });
});
