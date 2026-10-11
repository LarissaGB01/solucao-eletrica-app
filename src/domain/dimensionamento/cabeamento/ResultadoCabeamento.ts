import type {
  CondutorSugerido,
  DisjuntorSugerido,
  EletrodutoSugerido,
} from '../sugestoes';
import type {
  MemoriaCondutor,
  MemoriaDisjuntor,
  MemoriaEletroduto,
} from '../memoria';

/** `null` means no commercial breaker/conduit fits the inputs (the original app showed "não encontrei"). */
export type ResultadoCabeamento = Readonly<{
  condutor: CondutorSugerido;
  disjuntor: DisjuntorSugerido | null;
  eletroduto: EletrodutoSugerido | null;
  memoria: Readonly<{
    condutor: MemoriaCondutor;
    disjuntor: MemoriaDisjuntor;
    eletroduto: MemoriaEletroduto;
  }>;
}>;
