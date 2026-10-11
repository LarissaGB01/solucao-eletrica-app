import { criarProjetoCabeamento } from './cabeamento/ProjetoCabeamento';
import { criarProjetoDisjuntor } from './disjuntor/ProjetoDisjuntor';
import { criarProjetoEletroduto } from './eletroduto/ProjetoEletroduto';
import { TENSAO_TIPICA_V, VALORES_TIPICOS as v } from './valoresTipicos';

describe('VALORES_TIPICOS', () => {
  it('form valid projects in every flow', () => {
    expect(
      criarProjetoCabeamento({
        finalidade: 'TERMINAL',
        utilizacao: 'TOMADA',
        temperaturaAmbiente: v.temperaturaC,
        fases: 'MONOFASICO',
        tensao: TENSAO_TIPICA_V.MONOFASICO,
        tipoPotencia: 'ATIVA',
        potencia: v.potenciaVA,
        fatorPotencia: v.fatorPotencia,
        metodoInstalacao: 'B1',
        tipoCabo: 'PVC',
        circuitosAgrupados: 1,
        comprimento: v.comprimentoM,
      }).ok,
    ).toBe(true);
    expect(
      criarProjetoDisjuntor({
        fases: 'MONOFASICO',
        correnteProjeto: v.correnteProjetoA,
        correnteMaximaCondutor: v.correnteMaximaCondutorA,
      }).ok,
    ).toBe(true);
    expect(
      criarProjetoEletroduto({
        secaoNominalCondutor: v.secaoMm2,
        quantidadeCondutores: v.quantidadeCondutores,
      }).ok,
    ).toBe(true);
  });
});
