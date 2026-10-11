import { domainError, type DomainError } from '../DomainError';
import { err, ok, type Result } from '../Result';

/** Conductor cross-section in mm². Finite and > 0 (commercial values like 1.5 are decimals). */
export class SecaoNominal {
  private constructor(readonly mm2: number) {}

  static create(mm2: number): Result<SecaoNominal, DomainError> {
    if (!Number.isFinite(mm2) || mm2 <= 0) {
      return err(domainError('SECAO_INVALIDA', mm2));
    }
    return ok(new SecaoNominal(mm2));
  }
}
