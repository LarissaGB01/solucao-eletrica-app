import { domainError, type DomainError } from '../DomainError';
import { err, ok, type Result } from '../Result';

/** Number of circuits grouped in the same conduit. Integer >= 1 (the circuit itself counts). */
export class QuantidadeCircuitos {
  private constructor(readonly valor: number) {}

  static create(valor: number): Result<QuantidadeCircuitos, DomainError> {
    if (!Number.isInteger(valor) || valor < 1) {
      return err(domainError('QUANTIDADE_CIRCUITOS_INVALIDA', valor));
    }
    return ok(new QuantidadeCircuitos(valor));
  }
}
