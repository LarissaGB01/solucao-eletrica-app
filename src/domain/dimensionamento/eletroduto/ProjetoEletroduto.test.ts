import { criarProjetoEletroduto } from './ProjetoEletroduto';

describe('criarProjetoEletroduto', () => {
  it('builds a project from a valid section and conductor count', () => {
    const result = criarProjetoEletroduto({
      secaoNominalCondutor: 2.5,
      quantidadeCondutores: 3,
    });

    expect(result.ok && result.value.secaoNominalCondutor.mm2).toBe(2.5);
    expect(result.ok && result.value.quantidadeCondutores.valor).toBe(3);
  });

  it('reports every invalid field', () => {
    const result = criarProjetoEletroduto({
      secaoNominalCondutor: -1,
      quantidadeCondutores: 0,
    });

    expect(!result.ok && Object.keys(result.error).sort()).toEqual([
      'quantidadeCondutores',
      'secaoNominalCondutor',
    ]);
  });
});
