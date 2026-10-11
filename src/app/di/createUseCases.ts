import { DimensionarCabeamento } from '../../application/cabeamento/DimensionarCabeamento';
import { DimensionarDisjuntor } from '../../application/disjuntor/DimensionarDisjuntor';
import { DimensionarEletroduto } from '../../application/eletroduto/DimensionarEletroduto';
import { MockCalculadoraDimensionamento } from '../../infrastructure/mock/MockCalculadoraDimensionamento';
import type { UseCases } from '../../presentation/di/UseCasesContext';

/** Composition root: swap the calculator here when the offline engine lands (Phase 5). */
export function createUseCases(): UseCases {
  const calculadora = new MockCalculadoraDimensionamento();
  return {
    dimensionarCabeamento: new DimensionarCabeamento(calculadora),
    dimensionarDisjuntor: new DimensionarDisjuntor(calculadora),
    dimensionarEletroduto: new DimensionarEletroduto(calculadora),
  };
}
