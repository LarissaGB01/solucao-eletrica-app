import { domainError, type DomainError } from '../DomainError';
import { err, ok, type Result } from '../Result';

export type TipoPotencia = 'APARENTE' | 'ATIVA';

const UNIDADE: Record<TipoPotencia, 'VA' | 'W'> = {
  APARENTE: 'VA',
  ATIVA: 'W',
};

/** Apparent power (VA) or active power (W). Finite and > 0. */
export class Potencia {
  private constructor(readonly valor: number, readonly tipo: TipoPotencia) {}

  get unidade(): 'VA' | 'W' {
    return UNIDADE[this.tipo];
  }

  static create(
    valor: number,
    tipo: TipoPotencia,
  ): Result<Potencia, DomainError> {
    if (!Number.isFinite(valor) || valor <= 0) {
      return err(domainError('POTENCIA_INVALIDA', valor));
    }
    return ok(new Potencia(valor, tipo));
  }
}
