import { criarProjetoDisjuntor } from './ProjetoDisjuntor';

describe('criarProjetoDisjuntor', () => {
  it('builds a project from valid currents', () => {
    const result = criarProjetoDisjuntor({
      fases: 'TRIFASICO',
      correnteProjeto: 17.3,
      correnteMaximaCondutor: 24,
    });

    expect(result.ok && result.value.fases).toBe('TRIFASICO');
    expect(result.ok && result.value.correnteProjeto.amperes).toBe(17.3);
    expect(result.ok && result.value.correnteMaximaCondutor.amperes).toBe(24);
  });

  it('reports every invalid current', () => {
    const result = criarProjetoDisjuntor({
      fases: 'MONOFASICO',
      correnteProjeto: 0,
      correnteMaximaCondutor: NaN,
    });

    expect(!result.ok && Object.keys(result.error).sort()).toEqual([
      'correnteMaximaCondutor',
      'correnteProjeto',
    ]);
  });

  it('requires the conductor capacity to exceed the design current', () => {
    expect(
      criarProjetoDisjuntor({
        fases: 'MONOFASICO',
        correnteProjeto: 30,
        correnteMaximaCondutor: 30,
      }),
    ).toEqual({
      ok: false,
      error: {
        correnteMaximaCondutor: {
          codigo: 'CORRENTE_MAXIMA_INSUFICIENTE',
          valorRecebido: 30,
        },
      },
    });
  });
});
