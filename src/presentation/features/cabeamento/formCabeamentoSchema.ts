import { z } from 'zod';

import {
  criarProjetoCabeamento,
  FASES,
  FINALIDADES_CIRCUITO,
  METODOS_INSTALACAO,
  TIPOS_CABO,
  UTILIZACOES_CIRCUITO,
} from '../../../domain/dimensionamento/cabeamento';
import {
  TENSAO_TIPICA_V,
  VALORES_TIPICOS,
} from '../../../domain/dimensionamento/valoresTipicos';
import { numero, projetoOuErros, texto } from '../formularios/esquema';

/** Form shape; validation is delegated to the domain via `projetoOuErros`. */
export const formCabeamentoSchema = z
  .object({
    finalidade: z.enum(FINALIDADES_CIRCUITO),
    utilizacao: z.enum(UTILIZACOES_CIRCUITO),
    temperaturaAmbiente: z.number(),
    fases: z.enum(FASES),
    tensao: z.string(),
    tipoPotencia: z.enum(['APARENTE', 'ATIVA']),
    potencia: z.string(),
    fatorPotencia: z.string(),
    metodoInstalacao: z.enum(METODOS_INSTALACAO),
    circuitosAgrupados: z.number(),
    tipoCabo: z.enum(TIPOS_CABO),
    comprimento: z.string(),
  })
  .transform((valores, ctx) =>
    projetoOuErros(
      criarProjetoCabeamento({
        ...valores,
        tensao: numero(valores.tensao),
        potencia: numero(valores.potencia),
        fatorPotencia: numero(valores.fatorPotencia),
        comprimento: numero(valores.comprimento),
      }),
      ctx,
    ),
  );

export type ValoresFormCabeamento = z.input<typeof formCabeamentoSchema>;

/** Prefilled with the most common Brazilian values (domain/dimensionamento/valoresTipicos). */
export const VALORES_INICIAIS: ValoresFormCabeamento = {
  finalidade: 'TERMINAL',
  utilizacao: 'TOMADA',
  temperaturaAmbiente: VALORES_TIPICOS.temperaturaC,
  fases: 'MONOFASICO',
  tensao: texto(TENSAO_TIPICA_V.MONOFASICO),
  tipoPotencia: 'APARENTE',
  potencia: texto(VALORES_TIPICOS.potenciaVA),
  fatorPotencia: texto(VALORES_TIPICOS.fatorPotencia),
  metodoInstalacao: 'B1',
  circuitosAgrupados: 1,
  tipoCabo: 'PVC',
  comprimento: texto(VALORES_TIPICOS.comprimentoM),
};

/** Fields validated before leaving each step of the form. */
export const CAMPOS_POR_ETAPA: readonly (readonly (keyof ValoresFormCabeamento)[])[] =
  [
    ['finalidade', 'utilizacao', 'temperaturaAmbiente'],
    ['fases', 'tensao', 'tipoPotencia', 'potencia', 'fatorPotencia'],
    ['metodoInstalacao', 'circuitosAgrupados'],
    ['tipoCabo', 'comprimento'],
  ];
