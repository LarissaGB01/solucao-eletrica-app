import { QuantidadeCircuitos } from './QuantidadeCircuitos';

describe('QuantidadeCircuitos', () => {
  it.each([1, 3, 100])('accepts %p', valor => {
    const result = QuantidadeCircuitos.create(valor);
    expect(result.ok && result.value.valor).toBe(valor);
  });

  it.each([0, -1, 2.5, NaN])('rejects %p', valor => {
    expect(QuantidadeCircuitos.create(valor)).toEqual({
      ok: false,
      error: { codigo: 'QUANTIDADE_CIRCUITOS_INVALIDA', valorRecebido: valor },
    });
  });
});
