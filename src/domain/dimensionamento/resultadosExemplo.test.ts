import { RESULTADO_CABEAMENTO_EXEMPLO } from './resultadosExemplo';

const arredondar = (valor: number) => Math.round(valor * 100) / 100;

describe('RESULTADO_CABEAMENTO_EXEMPLO', () => {
  const { condutor, disjuntor, eletroduto } =
    RESULTADO_CABEAMENTO_EXEMPLO.memoria;

  it('has intermediate values consistent with the backend formulas', () => {
    expect(arredondar(2200 / 127)).toBe(condutor.correnteCircuitoA);
    expect(
      arredondar((200 * 0.0172 * 15 * condutor.correnteProjetoA) / (4 * 127)),
    ).toBe(condutor.secaoCalculadaMm2);
    expect(arredondar(Math.sqrt((4 * 2.5) / Math.PI))).toBe(
      eletroduto.diametroCondutorMm,
    );
    // The backend chains the unrounded conductor diameter.
    expect(arredondar((100 * Math.sqrt((4 * 2.5) / Math.PI) * 3) / 40)).toBe(
      eletroduto.diametroMinimoEletrodutoMm,
    );
  });

  it('coordinates the breaker as NBR 5410 requires', () => {
    const corrente =
      RESULTADO_CABEAMENTO_EXEMPLO.disjuntor?.correnteNominalA ?? 0;
    expect(disjuntor.correnteProjetoA).toBeLessThanOrEqual(corrente);
    expect(corrente).toBeLessThanOrEqual(disjuntor.correnteMaximaCondutorA);
  });
});
