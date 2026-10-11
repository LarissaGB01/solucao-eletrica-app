import { projetoCabeamentoExemplo } from '../../domain/dimensionamento/cabeamento';
import { criarProjetoDisjuntor } from '../../domain/dimensionamento/disjuntor';
import { criarProjetoEletroduto } from '../../domain/dimensionamento/eletroduto';
import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';
import {
  MockCalculadoraDimensionamento,
  RESULTADO_CABEAMENTO_MOCK,
  RESULTADO_DISJUNTOR_MOCK,
  RESULTADO_ELETRODUTO_MOCK,
} from './MockCalculadoraDimensionamento';

const calculadora: CalculadoraDimensionamento =
  new MockCalculadoraDimensionamento();

describe('MockCalculadoraDimensionamento', () => {
  it('returns the fixed results', async () => {
    const disjuntor = criarProjetoDisjuntor({
      fases: 'MONOFASICO',
      correnteProjeto: 17.3,
      correnteMaximaCondutor: 24,
    });
    const eletroduto = criarProjetoEletroduto({
      secaoNominalCondutor: 2.5,
      quantidadeCondutores: 3,
    });
    if (!disjuntor.ok || !eletroduto.ok) throw new Error('invalid fixture');

    await expect(
      calculadora.dimensionarCabeamento(projetoCabeamentoExemplo()),
    ).resolves.toBe(RESULTADO_CABEAMENTO_MOCK);
    await expect(
      calculadora.dimensionarDisjuntor(disjuntor.value),
    ).resolves.toBe(RESULTADO_DISJUNTOR_MOCK);
    await expect(
      calculadora.dimensionarEletroduto(eletroduto.value),
    ).resolves.toBe(RESULTADO_ELETRODUTO_MOCK);
  });

  it('is coordinated as NBR 5410 requires: breaker current <= conductor capacity', () => {
    const { condutor, disjuntor } = RESULTADO_CABEAMENTO_MOCK;
    expect(disjuntor?.correnteNominalA).toBeLessThanOrEqual(
      condutor.correnteMaximaA,
    );
  });
});
