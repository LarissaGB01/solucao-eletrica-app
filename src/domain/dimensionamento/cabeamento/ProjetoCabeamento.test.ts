import { criarProjetoCabeamento } from './ProjetoCabeamento';
import { DADOS_PROJETO_CABEAMENTO_EXEMPLO } from './projetoCabeamentoExemplo';

const validos = DADOS_PROJETO_CABEAMENTO_EXEMPLO;

describe('criarProjetoCabeamento', () => {
  it('builds a project with apparent power and ignores the power factor', () => {
    const result = criarProjetoCabeamento(validos);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.tensao.volts).toBe(127);
    expect(result.value.carga).toEqual({
      tipo: 'APARENTE',
      potencia: expect.objectContaining({ valor: 2200, tipo: 'APARENTE' }),
    });
    expect(result.value.comprimento.metros).toBe(15);
  });

  it('builds a project with active power and its power factor', () => {
    const result = criarProjetoCabeamento({
      ...validos,
      tipoPotencia: 'ATIVA',
      potencia: 1800,
      fatorPotencia: 0.92,
    });

    expect(result.ok && result.value.carga).toEqual({
      tipo: 'ATIVA',
      potencia: expect.objectContaining({ valor: 1800, tipo: 'ATIVA' }),
      fatorPotencia: expect.objectContaining({ valor: 0.92 }),
    });
  });

  it('requires a valid power factor for active power', () => {
    const result = criarProjetoCabeamento({
      ...validos,
      tipoPotencia: 'ATIVA',
      fatorPotencia: 1.2,
    });

    expect(result).toEqual({
      ok: false,
      error: {
        fatorPotencia: {
          codigo: 'FATOR_POTENCIA_INVALIDO',
          valorRecebido: 1.2,
        },
      },
    });
  });

  it('reports every invalid field at once', () => {
    const result = criarProjetoCabeamento({
      ...validos,
      temperaturaAmbiente: 0,
      tensao: NaN,
      potencia: -1,
      circuitosAgrupados: 0,
      comprimento: 0,
    });

    expect(!result.ok && Object.keys(result.error).sort()).toEqual([
      'circuitosAgrupados',
      'comprimento',
      'potencia',
      'temperaturaAmbiente',
      'tensao',
    ]);
  });
});
