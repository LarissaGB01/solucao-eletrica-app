import { domainError, type DomainError } from '../DomainError';
import { err, ok, type Result } from '../Result';

/** System voltage in volts. Integer > 0, as in the original backend. */
export class Tensao {
  private constructor(readonly volts: number) {}

  static create(volts: number): Result<Tensao, DomainError> {
    if (!Number.isInteger(volts) || volts <= 0) {
      return err(domainError('TENSAO_INVALIDA', volts));
    }
    return ok(new Tensao(volts));
  }
}
