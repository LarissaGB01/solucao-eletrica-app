import { QuantidadeCondutores } from './QuantidadeCondutores';

describe('QuantidadeCondutores', () => {
  it.each([1, 3, 10])('accepts %p', valor => {
    const result = QuantidadeCondutores.create(valor);
    expect(result.ok && result.value.valor).toBe(valor);
  });

  it.each([0, 1.5, NaN])('rejects %p', valor => {
    expect(QuantidadeCondutores.create(valor)).toEqual({
      ok: false,
      error: { codigo: 'QUANTIDADE_CONDUTORES_INVALIDA', valorRecebido: valor },
    });
  });
});
