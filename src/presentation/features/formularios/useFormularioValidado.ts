import { zodResolver } from '@hookform/resolvers/zod';
import { type DefaultValues, type FieldValues, useForm } from 'react-hook-form';
import type { z } from 'zod';

/** react-hook-form wired to a schema whose output is the domain project. */
export function useFormularioValidado<Entrada extends FieldValues, Saida>(
  schema: z.ZodType<Saida, Entrada>,
  valoresIniciais: DefaultValues<Entrada>,
) {
  return useForm<Entrada, unknown, Saida>({
    resolver: zodResolver(schema),
    defaultValues: valoresIniciais,
    // Re-check edited fields live, so a message disappears as soon as the value is fixed
    // (the default only re-validates after a full submit, not after a step check).
    mode: 'onChange',
  });
}
