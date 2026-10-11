import { DimensionarCabeamento } from '../../application/cabeamento/DimensionarCabeamento';
import { DimensionarDisjuntor } from '../../application/disjuntor/DimensionarDisjuntor';
import { DimensionarEletroduto } from '../../application/eletroduto/DimensionarEletroduto';
import { CalculadoraNbr5410 } from '../../domain/dimensionamento/nbr5410/CalculadoraNbr5410';
import type { UseCases } from '../../presentation/di/UseCasesContext';

/** Composition root: wires the offline NBR 5410 engine into the use cases. */
export function createUseCases(): UseCases {
  const calculadora = new CalculadoraNbr5410();
  return {
    dimensionarCabeamento: new DimensionarCabeamento(calculadora),
    dimensionarDisjuntor: new DimensionarDisjuntor(calculadora),
    dimensionarEletroduto: new DimensionarEletroduto(calculadora),
  };
}
