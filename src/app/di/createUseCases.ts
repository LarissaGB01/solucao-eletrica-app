import { DimensionarCabeamento } from '../../application/cabeamento/DimensionarCabeamento';
import { MockCalculadoraDimensionamento } from '../../infrastructure/mock/MockCalculadoraDimensionamento';
import type { UseCases } from '../../presentation/di/UseCasesContext';

/** Composition root: swap the calculator here when the offline engine lands (Phase 5). */
export function createUseCases(): UseCases {
  const calculadora = new MockCalculadoraDimensionamento();
  return {
    dimensionarCabeamento: new DimensionarCabeamento(calculadora),
  };
}
