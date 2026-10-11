import { z } from 'zod';

import {
  criarProjetoCabeamento,
  FASES,
  FINALIDADES_CIRCUITO,
  METODOS_INSTALACAO,
  TIPOS_CABO,
  UTILIZACOES_CIRCUITO,
} from '../../../domain/dimensionamento/cabeamento';
import type { CodigoErro } from '../../../domain/shared/DomainError';
import { mensagensErro } from '../../../content/erros';
import { parseDecimal } from '../../ui';

const mensagens: Record<CodigoErro, string> = mensagensErro;

// Text fields stay as typed; NaN makes the value objects reject unparseable input.
const numero = (texto: string) => parseDecimal(texto) ?? NaN;

/**
 * Form shape + validation. Range rules are not repeated here: the domain value objects decide,
 * and their error codes become pt-BR messages on the matching field.
 */
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
  .transform((valores, ctx) => {
    const projeto = criarProjetoCabeamento({
      ...valores,
      tensao: numero(valores.tensao),
      potencia: numero(valores.potencia),
      fatorPotencia: numero(valores.fatorPotencia),
      comprimento: numero(valores.comprimento),
    });
    if (projeto.ok) {
      return projeto.value;
    }
    for (const [campo, erro] of Object.entries(projeto.error)) {
      ctx.addIssue({
        code: 'custom',
        path: [campo],
        message: mensagens[erro.codigo],
      });
    }
    return z.NEVER;
  });

export type ValoresFormCabeamento = z.input<typeof formCabeamentoSchema>;

export const VALORES_INICIAIS: ValoresFormCabeamento = {
  finalidade: 'TERMINAL',
  utilizacao: 'TOMADA',
  temperaturaAmbiente: 30, // NBR 5410 reference temperature
  fases: 'MONOFASICO',
  tensao: '',
  tipoPotencia: 'APARENTE',
  potencia: '',
  fatorPotencia: '',
  metodoInstalacao: 'B1',
  circuitosAgrupados: 1,
  tipoCabo: 'PVC',
  comprimento: '',
};

/** Fields validated before leaving each step of the form. */
export const CAMPOS_POR_ETAPA: readonly (readonly (keyof ValoresFormCabeamento)[])[] =
  [
    ['finalidade', 'utilizacao', 'temperaturaAmbiente'],
    ['fases', 'tensao', 'tipoPotencia', 'potencia', 'fatorPotencia'],
    ['metodoInstalacao', 'circuitosAgrupados'],
    ['tipoCabo', 'comprimento'],
  ];
