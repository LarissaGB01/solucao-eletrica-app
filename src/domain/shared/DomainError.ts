// Codes only: pt-BR messages live in src/content, mapped by the presentation layer.
export type CodigoErro =
  | 'TENSAO_INVALIDA'
  | 'POTENCIA_INVALIDA'
  | 'FATOR_POTENCIA_INVALIDO'
  | 'TEMPERATURA_INVALIDA'
  | 'COMPRIMENTO_INVALIDO'
  | 'QUANTIDADE_CIRCUITOS_INVALIDA'
  | 'CORRENTE_INVALIDA'
  | 'SECAO_INVALIDA'
  | 'QUANTIDADE_CONDUTORES_INVALIDA';

export type DomainError = {
  readonly codigo: CodigoErro;
  readonly valorRecebido?: unknown;
};

export const domainError = (
  codigo: CodigoErro,
  valorRecebido?: unknown,
): DomainError => ({ codigo, valorRecebido });
