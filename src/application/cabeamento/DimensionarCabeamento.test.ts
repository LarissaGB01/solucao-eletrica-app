import { RESULTADO_CABEAMENTO_EXEMPLO } from '../../domain/dimensionamento/resultadosExemplo';
import { projetoCabeamentoExemplo } from '../../domain/dimensionamento/cabeamento';
import { err, ok } from '../../domain/shared/Result';
import { fakeCalculadora } from '../testing/fakeCalculadora';
import { DimensionarCabeamento } from './DimensionarCabeamento';

const resultado = RESULTADO_CABEAMENTO_EXEMPLO;

describe('DimensionarCabeamento', () => {
  it('passes the project to the calculator and returns its result', async () => {
    const dimensionarCabeamento = jest.fn().mockResolvedValue(ok(resultado));
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

  it('passes engine errors through', async () => {
    const useCase = new DimensionarCabeamento(
      fakeCalculadora({
        dimensionarCabeamento: () =>
          Promise.resolve(err({ codigo: 'TEMPERATURA_FORA_DA_TABELA' })),
      }),
    );

    expect(await useCase.execute(projetoCabeamentoExemplo())).toEqual(
      err({ codigo: 'TEMPERATURA_FORA_DA_TABELA' }),
    );
  });
});
