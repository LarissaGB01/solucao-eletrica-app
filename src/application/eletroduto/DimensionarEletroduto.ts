import type { ProjetoEletroduto } from '../../domain/dimensionamento/eletroduto/ProjetoEletroduto';
import type { ResultadoEletroduto } from '../../domain/dimensionamento/eletroduto/ResultadoEletroduto';
import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';
import type { Result } from '../../domain/shared/Result';
import { calcular, type FalhaCalculo } from '../shared/calcular';

export class DimensionarEletroduto {
  constructor(private readonly calculadora: CalculadoraDimensionamento) {}

  execute(
    projeto: ProjetoEletroduto,
  ): Promise<Result<ResultadoEletroduto, FalhaCalculo>> {
    return calcular(() => this.calculadora.dimensionarEletroduto(projeto));
  }
}
