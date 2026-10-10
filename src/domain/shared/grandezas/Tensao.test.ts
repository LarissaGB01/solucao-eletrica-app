import { Tensao } from './Tensao';

describe('Tensao', () => {
  it.each([127, 220, 380])('accepts %p', valor => {
    const result = Tensao.create(valor);
    expect(result.ok && result.value.volts).toBe(valor);
  });

  it.each([0, -220, 220.5, NaN, Infinity])('rejects %p', valor => {
    expect(Tensao.create(valor)).toEqual({
      ok: false,
      error: { codigo: 'TENSAO_INVALIDA', valorRecebido: valor },
    });
  });
});
