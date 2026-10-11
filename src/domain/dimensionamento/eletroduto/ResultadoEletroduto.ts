import type { EletrodutoSugerido } from '../sugestoes';

/** `null` means no commercial conduit fits the inputs. */
export type ResultadoEletroduto = Readonly<{
  eletroduto: EletrodutoSugerido | null;
}>;
