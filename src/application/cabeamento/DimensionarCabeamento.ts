import type { ProjetoCabeamento } from '../../domain/dimensionamento/cabeamento/ProjetoCabeamento';
import type { ResultadoCabeamento } from '../../domain/dimensionamento/cabeamento/ResultadoCabeamento';
import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';
import type { Result } from '../../domain/shared/Result';
import type { ErroDimensionamento } from '../../domain/dimensionamento/nbr5410/motor';
import { calcularResultado, type FalhaCalculo } from '../shared/calcular';

export class DimensionarCabeamento {
  constructor(private readonly calculadora: CalculadoraDimensionamento) {}

  execute(
    projeto: ProjetoCabeamento,
  ): Promise<Result<ResultadoCabeamento, ErroDimensionamento | FalhaCalculo>> {
    return calcularResultado(() =>
      this.calculadora.dimensionarCabeamento(projeto),
    );
  }
}
