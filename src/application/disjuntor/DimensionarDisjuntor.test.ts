import { criarProjetoDisjuntor } from '../../domain/dimensionamento/disjuntor';
import { fakeCalculadora } from '../testing/fakeCalculadora';
import { DimensionarDisjuntor } from './DimensionarDisjuntor';

const projeto = criarProjetoDisjuntor({
  fases: 'MONOFASICO',
  correnteProjeto: 17.3,
  correnteMaximaCondutor: 24,
});

describe('DimensionarDisjuntor', () => {
  it('passes the project to the calculator and returns its result', async () => {
    if (!projeto.ok) throw new Error('invalid fixture');
    const resultado = { disjuntor: { nome: 'C20', correnteNominalA: 20 } };
    const dimensionarDisjuntor = jest.fn().mockResolvedValue(resultado);

    const result = await new DimensionarDisjuntor(
      fakeCalculadora({ dimensionarDisjuntor }),
    ).execute(projeto.value);

    expect(dimensionarDisjuntor).toHaveBeenCalledWith(projeto.value);
    expect(result).toEqual({ ok: true, value: resultado });
  });
});
