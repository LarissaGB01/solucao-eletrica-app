import { significados } from '../../../content/simbolos';
import { SIMBOLOS } from '../../../domain/dimensionamento/formulas/simbolos';
import type { FormulaLegend } from '../../ui';

type Simbolo = keyof typeof SIMBOLOS;

// Typed as a full record: adding a symbol without its meaning fails to compile.
const textos: Record<Simbolo, string> = significados.simbolos;

/** "Onde:" list for a formula: each symbol as KaTeX, with what it means. */
export const onde = (...simbolos: readonly Simbolo[]): FormulaLegend => ({
  title: significados.titulo,
  items: simbolos.map(simbolo => ({
    symbol: SIMBOLOS[simbolo],
    meaning: textos[simbolo],
  })),
});
