import type { ProjetoCabeamento } from '../../domain/dimensionamento/cabeamento/ProjetoCabeamento';
import type { ResultadoCabeamento } from '../../domain/dimensionamento/cabeamento/ResultadoCabeamento';
import type { CalculadoraDimensionamento } from '../../domain/dimensionamento/ports/CalculadoraDimensionamento';
import { err, ok, type Result } from '../../domain/shared/Result';

export type FalhaCalculo = { readonly codigo: 'FALHA_CALCULO' };

export class DimensionarCabeamento {
  constructor(private readonly calculadora: CalculadoraDimensionamento) {}

  async execute(
    projeto: ProjetoCabeamento,
  ): Promise<Result<ResultadoCabeamento, FalhaCalculo>> {
    try {
      return ok(await this.calculadora.dimensionarCabeamento(projeto));
    } catch {
      // The engine is our own code, so a throw is a bug; the screen still gets a value to show.
      return err({ codigo: 'FALHA_CALCULO' });
    }
  }
}
