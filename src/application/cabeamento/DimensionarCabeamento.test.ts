import type { ResultadoCabeamento } from '../../domain/dimensionamento/cabeamento';
import { projetoCabeamentoExemplo } from '../../domain/dimensionamento/cabeamento';
import { fakeCalculadora } from '../testing/fakeCalculadora';
import { DimensionarCabeamento } from './DimensionarCabeamento';

const resultado: ResultadoCabeamento = {
  condutor: { secaoNominalMm2: 2.5, correnteMaximaA: 24 },
  disjuntor: null,
  eletroduto: null,
};

describe('DimensionarCabeamento', () => {
  it('passes the project to the calculator and returns its result', async () => {
    const dimensionarCabeamento = jest.fn().mockResolvedValue(resultado);
    const projeto = projetoCabeamentoExemplo();

    const result = await new DimensionarCabeamento(
      fakeCalculadora({ dimensionarCabeamento }),
    ).execute(projeto);

    expect(dimensionarCabeamento).toHaveBeenCalledWith(projeto);
    expect(result).toEqual({ ok: true, value: resultado });
  });

  it('turns a calculator failure into FALHA_CALCULO', async () => {
    const useCase = new DimensionarCabeamento(fakeCalculadora({}));

    expect(await useCase.execute(projetoCabeamentoExemplo())).toEqual({
      ok: false,
      error: { codigo: 'FALHA_CALCULO' },
    });
  });
});
