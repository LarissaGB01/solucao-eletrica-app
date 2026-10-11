import { z } from 'zod';

import { criarProjetoEletroduto } from '../../../domain/dimensionamento/eletroduto';
import { VALORES_TIPICOS } from '../../../domain/dimensionamento/valoresTipicos';
import { numero, projetoOuErros, texto } from '../formularios/esquema';

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
  secaoNominalCondutor: texto(VALORES_TIPICOS.secaoMm2),
  quantidadeCondutores: VALORES_TIPICOS.quantidadeCondutores,
};
