import { domainError, type DomainError } from '../DomainError';
import { err, ok, type Result } from '../Result';

/** Ambient temperature in °C. Integer > 0, as in the original backend. */
export class Temperatura {
  private constructor(readonly celsius: number) {}

  static create(celsius: number): Result<Temperatura, DomainError> {
    if (!Number.isInteger(celsius) || celsius <= 0) {
      return err(domainError('TEMPERATURA_INVALIDA', celsius));
    }
    return ok(new Temperatura(celsius));
  }
}
