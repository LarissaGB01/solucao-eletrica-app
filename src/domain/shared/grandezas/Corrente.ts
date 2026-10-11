import { domainError, type DomainError } from '../DomainError';
import { err, ok, type Result } from '../Result';

/** Electric current in amperes. Finite and > 0. */
export class Corrente {
  private constructor(readonly amperes: number) {}

  static create(amperes: number): Result<Corrente, DomainError> {
    if (!Number.isFinite(amperes) || amperes <= 0) {
      return err(domainError('CORRENTE_INVALIDA', amperes));
    }
    return ok(new Corrente(amperes));
  }
}
