import type { DomainError } from './DomainError';
import { err, ok, type Result } from './Result';

type Campos = Record<string, Result<unknown, DomainError>>;

export type ValoresCampos<T extends Campos> = {
  [K in keyof T]: T[K] extends Result<infer V, DomainError> ? V : never;
};

/** Every invalid field at once, keyed by field name, so a form can show all messages together. */
export type ErrosCampos<K extends PropertyKey> = Partial<
  Record<K, DomainError>
>;

/**
 * Combines one value-object Result per field: all values when every field is valid,
 * otherwise the errors of every invalid field.
 */
export function combinarCampos<T extends Campos>(
  campos: T,
): Result<ValoresCampos<T>, ErrosCampos<keyof T>> {
  const valores: Record<string, unknown> = {};
  const erros: Record<string, DomainError> = {};
  for (const [campo, resultado] of Object.entries(campos)) {
    if (resultado.ok) {
      valores[campo] = resultado.value;
    } else {
      erros[campo] = resultado.error;
    }
  }
  // Safe: every key of `campos` landed in exactly one of the two records above.
  return Object.keys(erros).length > 0
    ? err(erros as ErrosCampos<keyof T>)
    : ok(valores as ValoresCampos<T>);
}
