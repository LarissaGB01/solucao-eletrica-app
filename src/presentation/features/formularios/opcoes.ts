import { formularios } from '../../../content/formularios';
import { FASES } from '../../../domain/dimensionamento/fases';
import type { SegmentedOption } from '../../ui';

/** Pairs domain values with pt-BR labels; the Record type flags any value missing a label. */
export const comRotulos = <T extends string>(
  valores: readonly T[],
  rotulos: Record<T, string>,
): readonly SegmentedOption<T>[] =>
  valores.map(value => ({ value, label: rotulos[value] }));

export const opcoesFases = comRotulos(FASES, formularios.fases.opcoes);
