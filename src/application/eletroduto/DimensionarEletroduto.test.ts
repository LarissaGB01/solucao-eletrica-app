import { criarProjetoEletroduto } from '../../domain/dimensionamento/eletroduto';
import { fakeCalculadora } from '../testing/fakeCalculadora';
import { DimensionarEletroduto } from './DimensionarEletroduto';

const projeto = criarProjetoEletroduto({
  secaoNominalCondutor: 2.5,
  quantidadeCondutores: 3,
});

describe('DimensionarEletroduto', () => {
  it('passes the project to the calculator and returns its result', async () => {
    if (!projeto.ok) throw new Error('invalid fixture');
    const resultado = { eletroduto: null };
    const dimensionarEletroduto = jest.fn().mockResolvedValue(resultado);

    const result = await new DimensionarEletroduto(
      fakeCalculadora({ dimensionarEletroduto }),
    ).execute(projeto.value);

    expect(dimensionarEletroduto).toHaveBeenCalledWith(projeto.value);
    expect(result).toEqual({ ok: true, value: resultado });
  });
});
