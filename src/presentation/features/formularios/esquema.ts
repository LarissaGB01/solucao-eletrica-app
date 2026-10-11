import { z } from 'zod';

import { mensagensErro } from '../../../content/erros';
import type { ErrosCampos } from '../../../domain/shared/combinarCampos';
import type { CodigoErro } from '../../../domain/shared/DomainError';
import type { Result } from '../../../domain/shared/Result';
import { parseDecimal } from '../../ui';

const mensagens: Record<CodigoErro, string> = mensagensErro;

/** Number as a form field shows it: pt-BR decimal comma. */
export const texto = (valor: number): string => String(valor).replace('.', ',');

/** Text fields stay as typed; NaN makes the value objects reject unparseable input. */
export const numero = (campo: string): number => parseDecimal(campo) ?? NaN;

type ContextoTransformacao = {
  addIssue: (issue: {
    code: 'custom';
    path: string[];
    message: string;
  }) => void;
};

/**
 * Ends a zod `.transform`: returns the domain project, or reports each domain error as a pt-BR
 * message on its field. Range rules live only in the value objects.
 */
export function projetoOuErros<T>(
  resultado: Result<T, ErrosCampos<string>>,
  ctx: ContextoTransformacao,
): T {
  if (resultado.ok) {
    return resultado.value;
  }
  for (const [campo, erro] of Object.entries(resultado.error)) {
    if (erro) {
      ctx.addIssue({
        code: 'custom',
        path: [campo],
        message: mensagens[erro.codigo],
      });
    }
  }
  return z.NEVER;
}
