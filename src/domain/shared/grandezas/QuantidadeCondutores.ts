import { domainError, type DomainError } from '../DomainError';
import { err, ok, type Result } from '../Result';

/** Number of conductors inside a conduit. Integer >= 1. */
export class QuantidadeCondutores {
  private constructor(readonly valor: number) {}

  static create(valor: number): Result<QuantidadeCondutores, DomainError> {
    if (!Number.isInteger(valor) || valor < 1) {
      return err(domainError('QUANTIDADE_CONDUTORES_INVALIDA', valor));
    }
    return ok(new QuantidadeCondutores(valor));
  }
}
