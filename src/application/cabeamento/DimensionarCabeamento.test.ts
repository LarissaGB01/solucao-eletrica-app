import type { ResultadoCabeamento } from '../../domain/dimensionamento/cabeamento';
import { projetoCabeamentoExemplo } from '../../domain/dimensionamento/cabeamento';
import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';
import { DimensionarCabeamento } from './DimensionarCabeamento';

const resultado: ResultadoCabeamento = {
  condutor: { secaoNominalMm2: 2.5, correnteMaximaA: 24 },
  disjuntor: null,
  eletroduto: null,
};

const fakeCalculadora = (
  dimensionarCabeamento: CalculadoraDimensionamento['dimensionarCabeamento'],
): CalculadoraDimensionamento => ({ dimensionarCabeamento });

describe('DimensionarCabeamento', () => {
  it('passes the project to the calculator and returns its result', async () => {
    const dimensionar = jest.fn().mockResolvedValue(resultado);
    const projeto = projetoCabeamentoExemplo();

    const result = await new DimensionarCabeamento(
      fakeCalculadora(dimensionar),
    ).execute(projeto);

    expect(dimensionar).toHaveBeenCalledWith(projeto);
    expect(result).toEqual({ ok: true, value: resultado });
  });

  it('turns a calculator failure into FALHA_CALCULO', async () => {
    const useCase = new DimensionarCabeamento(
      fakeCalculadora(() => Promise.reject(new Error('boom'))),
    );

    expect(await useCase.execute(projetoCabeamentoExemplo())).toEqual({
      ok: false,
      error: { codigo: 'FALHA_CALCULO' },
    });
  });
});
