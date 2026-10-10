import { domainError, type DomainError } from '../DomainError';
import { err, ok, type Result } from '../Result';

/** Power factor in (0, 1]. Zero is rejected: apparent power = active power / factor. */
export class FatorPotencia {
  private constructor(readonly valor: number) {}

  static create(valor: number): Result<FatorPotencia, DomainError> {
    if (!Number.isFinite(valor) || valor <= 0 || valor > 1) {
      return err(domainError('FATOR_POTENCIA_INVALIDO', valor));
    }
    return ok(new FatorPotencia(valor));
  }
}
