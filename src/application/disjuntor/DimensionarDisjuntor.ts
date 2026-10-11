import type { ProjetoDisjuntor } from '../../domain/dimensionamento/disjuntor/ProjetoDisjuntor';
import type { ResultadoDisjuntor } from '../../domain/dimensionamento/disjuntor/ResultadoDisjuntor';
import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';
import type { Result } from '../../domain/shared/Result';
import { calcular, type FalhaCalculo } from '../shared/calcular';

export class DimensionarDisjuntor {
  constructor(private readonly calculadora: CalculadoraDimensionamento) {}

  execute(
    projeto: ProjetoDisjuntor,
  ): Promise<Result<ResultadoDisjuntor, FalhaCalculo>> {
    return calcular(() => this.calculadora.dimensionarDisjuntor(projeto));
  }
}
