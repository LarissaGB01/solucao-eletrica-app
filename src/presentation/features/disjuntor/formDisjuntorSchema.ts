import { z } from 'zod';

import { criarProjetoDisjuntor } from '../../../domain/dimensionamento/disjuntor';
import { FASES } from '../../../domain/dimensionamento/fases';
import { VALORES_TIPICOS } from '../../../domain/dimensionamento/valoresTipicos';
import { numero, projetoOuErros, texto } from '../formularios/esquema';

/** Form shape; validation is delegated to the domain via `projetoOuErros`. */
export const formDisjuntorSchema = z
  .object({
    fases: z.enum(FASES),
    correnteProjeto: z.string(),
    correnteMaximaCondutor: z.string(),
  })
  .transform((valores, ctx) =>
    projetoOuErros(
      criarProjetoDisjuntor({
        fases: valores.fases,
        correnteProjeto: numero(valores.correnteProjeto),
        correnteMaximaCondutor: numero(valores.correnteMaximaCondutor),
      }),
      ctx,
    ),
  );

export type ValoresFormDisjuntor = z.input<typeof formDisjuntorSchema>;

export const VALORES_INICIAIS_DISJUNTOR: ValoresFormDisjuntor = {
  fases: 'MONOFASICO',
  correnteProjeto: texto(VALORES_TIPICOS.correnteProjetoA),
  correnteMaximaCondutor: texto(VALORES_TIPICOS.correnteMaximaCondutorA),
};
