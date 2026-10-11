import { err, ok, type Result } from '../../domain/shared/Result';

export type FalhaCalculo = { readonly codigo: 'FALHA_CALCULO' };

/**
 * Runs a calculator call and turns a rejection into FALHA_CALCULO.
 * The engine is our own code, so a throw is a bug; the screen still gets a value to show.
 */
export async function calcular<T>(
  executar: () => Promise<T>,
): Promise<Result<T, FalhaCalculo>> {
  try {
    return ok(await executar());
  } catch {
    return err({ codigo: 'FALHA_CALCULO' });
  }
}

/** Same as `calcular` for calls that already return a Result: errors of both kinds come out flat. */
export async function calcularResultado<T, E>(
  executar: () => Promise<Result<T, E>>,
): Promise<Result<T, E | FalhaCalculo>> {
  const resultado = await calcular(executar);
  return resultado.ok ? resultado.value : resultado;
}
