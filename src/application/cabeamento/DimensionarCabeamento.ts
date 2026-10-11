import type { ProjetoCabeamento } from '../../domain/dimensionamento/cabeamento/ProjetoCabeamento';
import type { ResultadoCabeamento } from '../../domain/dimensionamento/cabeamento/ResultadoCabeamento';
import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';
import type { Result } from '../../domain/shared/Result';
import { calcular, type FalhaCalculo } from '../shared/calcular';

export class DimensionarCabeamento {
  constructor(private readonly calculadora: CalculadoraDimensionamento) {}

  execute(
    projeto: ProjetoCabeamento,
  ): Promise<Result<ResultadoCabeamento, FalhaCalculo>> {
    return calcular(() => this.calculadora.dimensionarCabeamento(projeto));
  }
}
