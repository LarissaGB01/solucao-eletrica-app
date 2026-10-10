import { domainError, type DomainError } from '../DomainError';
import { err, ok, type Result } from '../Result';

/** Cable length in metres. Integer > 0, as in the original backend. */
export class Comprimento {
  private constructor(readonly metros: number) {}

  static create(metros: number): Result<Comprimento, DomainError> {
    if (!Number.isInteger(metros) || metros <= 0) {
      return err(domainError('COMPRIMENTO_INVALIDO', metros));
    }
    return ok(new Comprimento(metros));
  }
}
