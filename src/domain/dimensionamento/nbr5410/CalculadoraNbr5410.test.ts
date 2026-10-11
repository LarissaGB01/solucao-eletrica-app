import { projetoCabeamentoExemplo } from '../cabeamento';
import { CalculadoraNbr5410 } from './CalculadoraNbr5410';

describe('CalculadoraNbr5410', () => {
  it('resolves with the engine result', async () => {
    const resultado = await new CalculadoraNbr5410().dimensionarCabeamento(
      projetoCabeamentoExemplo(),
    );
    expect(resultado.ok && resultado.value.condutor).toEqual({
      secaoNominalMm2: 2.5,
      correnteMaximaA: 24,
    });
  });
});
