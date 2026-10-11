import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';

/** Test double: every method rejects unless overridden. */
export const fakeCalculadora = (
  overrides: Partial<CalculadoraDimensionamento>,
): CalculadoraDimensionamento => ({
  dimensionarCabeamento: () => Promise.reject(new Error('not stubbed')),
  dimensionarDisjuntor: () => Promise.reject(new Error('not stubbed')),
  dimensionarEletroduto: () => Promise.reject(new Error('not stubbed')),
  ...overrides,
});
