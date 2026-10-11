import { SecaoNominal } from './SecaoNominal';

describe('SecaoNominal', () => {
  it.each([1.5, 2.5, 240])('accepts %p', valor => {
    const result = SecaoNominal.create(valor);
    expect(result.ok && result.value.mm2).toBe(valor);
  });

  it.each([0, -2.5, NaN])('rejects %p', valor => {
    expect(SecaoNominal.create(valor)).toEqual({
      ok: false,
      error: { codigo: 'SECAO_INVALIDA', valorRecebido: valor },
    });
  });
});
