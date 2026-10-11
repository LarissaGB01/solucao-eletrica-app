import { err, ok } from '../../domain/shared/Result';
import { calcular, calcularResultado } from './calcular';

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

  it('flattens calls that already return a Result', async () => {
    expect(await calcularResultado(() => Promise.resolve(ok(1)))).toEqual(
      ok(1),
    );
    expect(await calcularResultado(() => Promise.resolve(err('E')))).toEqual(
      err('E'),
    );
    expect(
      await calcularResultado(() => Promise.reject(new Error('x'))),
    ).toEqual(err({ codigo: 'FALHA_CALCULO' }));
  });
});
