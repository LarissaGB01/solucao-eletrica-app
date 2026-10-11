import { calcular } from './calcular';

describe('calcular', () => {
  it('wraps the value', async () => {
    expect(await calcular(() => Promise.resolve(42))).toEqual({
      ok: true,
      value: 42,
    });
  });

  it('turns a rejection into FALHA_CALCULO', async () => {
    expect(await calcular(() => Promise.reject(new Error('boom')))).toEqual({
      ok: false,
      error: { codigo: 'FALHA_CALCULO' },
    });
  });
});
