import { Potencia } from './Potencia';

describe('Potencia', () => {
  it.each([0.5, 1000, 12000])('accepts %p', valor => {
    const result = Potencia.create(valor, 'ATIVA');
    expect(result.ok && result.value.valor).toBe(valor);
  });

  it.each([0, -100, NaN, Infinity])('rejects %p', valor => {
    expect(Potencia.create(valor, 'APARENTE')).toEqual({
      ok: false,
      error: { codigo: 'POTENCIA_INVALIDA', valorRecebido: valor },
    });
  });

  it.each([
    ['APARENTE', 'VA'],
    ['ATIVA', 'W'],
  ] as const)('uses unit for %s power', (tipo, unidade) => {
    const result = Potencia.create(100, tipo);
    expect(result.ok && result.value.unidade).toBe(unidade);
  });
});
