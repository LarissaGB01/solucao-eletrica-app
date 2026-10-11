import type {
  CondutorSugerido,
  DisjuntorSugerido,
  EletrodutoSugerido,
} from '../sugestoes';

/** `null` means no commercial breaker/conduit fits the inputs (the original app showed "não encontrei"). */
export type ResultadoCabeamento = Readonly<{
  condutor: CondutorSugerido;
  disjuntor: DisjuntorSugerido | null;
  eletroduto: EletrodutoSugerido | null;
}>;
