import { RESULTADO_CABEAMENTO_EXEMPLO } from '../../domain/dimensionamento/resultadosExemplo';
import { projetoCabeamentoExemplo } from '../../domain/dimensionamento/cabeamento';
import { fakeCalculadora } from '../testing/fakeCalculadora';
import { DimensionarCabeamento } from './DimensionarCabeamento';

const resultado = RESULTADO_CABEAMENTO_EXEMPLO;

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
