import { Corrente } from './Corrente';

describe('Corrente', () => {
  it.each([0.5, 20, 400])('accepts %p', valor => {
    const result = Corrente.create(valor);
    expect(result.ok && result.value.amperes).toBe(valor);
  });

  it.each([0, -1, NaN, Infinity])('rejects %p', valor => {
    expect(Corrente.create(valor)).toEqual({
      ok: false,
      error: { codigo: 'CORRENTE_INVALIDA', valorRecebido: valor },
    });
  });
});
