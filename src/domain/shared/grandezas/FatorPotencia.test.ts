import { FatorPotencia } from './FatorPotencia';

describe('FatorPotencia', () => {
  it.each([0.01, 0.8, 1])('accepts %p', valor => {
    const result = FatorPotencia.create(valor);
    expect(result.ok && result.value.valor).toBe(valor);
  });

  it.each([0, -0.5, 1.01, NaN, Infinity])('rejects %p', valor => {
    expect(FatorPotencia.create(valor)).toEqual({
      ok: false,
      error: { codigo: 'FATOR_POTENCIA_INVALIDO', valorRecebido: valor },
    });
  });
});
