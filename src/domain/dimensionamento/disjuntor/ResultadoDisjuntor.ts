import type { DisjuntorSugerido } from '../sugestoes';

/** `null` means no commercial breaker fits the inputs. */
export type ResultadoDisjuntor = Readonly<{
  disjuntor: DisjuntorSugerido | null;
}>;
