import { Temperatura } from './Temperatura';

describe('Temperatura', () => {
  it.each([1, 30, 50])('accepts %p', valor => {
    const result = Temperatura.create(valor);
    expect(result.ok && result.value.celsius).toBe(valor);
  });

  it.each([0, -5, 30.5, NaN, Infinity])('rejects %p', valor => {
    expect(Temperatura.create(valor)).toEqual({
      ok: false,
      error: { codigo: 'TEMPERATURA_INVALIDA', valorRecebido: valor },
    });
  });
});
