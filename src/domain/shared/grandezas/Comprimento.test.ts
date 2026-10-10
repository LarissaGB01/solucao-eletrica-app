import { Comprimento } from './Comprimento';

describe('Comprimento', () => {
  it.each([1, 60, 1000])('accepts %p', valor => {
    const result = Comprimento.create(valor);
    expect(result.ok && result.value.metros).toBe(valor);
  });

  it.each([0, -10, 12.5, NaN, Infinity])('rejects %p', valor => {
    expect(Comprimento.create(valor)).toEqual({
      ok: false,
      error: { codigo: 'COMPRIMENTO_INVALIDO', valorRecebido: valor },
    });
  });
});
