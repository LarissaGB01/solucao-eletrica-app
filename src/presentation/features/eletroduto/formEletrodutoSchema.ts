import { z } from 'zod';

import { criarProjetoEletroduto } from '../../../domain/dimensionamento/eletroduto';
import { numero, projetoOuErros } from '../formularios/esquema';

/** Form shape; validation is delegated to the domain via `projetoOuErros`. */
export const formEletrodutoSchema = z
  .object({
    secaoNominalCondutor: z.string(),
    quantidadeCondutores: z.number(),
  })
  .transform((valores, ctx) =>
    projetoOuErros(
      criarProjetoEletroduto({
        secaoNominalCondutor: numero(valores.secaoNominalCondutor),
        quantidadeCondutores: valores.quantidadeCondutores,
      }),
      ctx,
    ),
  );

export type ValoresFormEletroduto = z.input<typeof formEletrodutoSchema>;

export const VALORES_INICIAIS_ELETRODUTO: ValoresFormEletroduto = {
  secaoNominalCondutor: '',
  quantidadeCondutores: 3, // phase, neutral and ground of a single-phase circuit
};
