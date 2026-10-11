import type { CalculadoraDimensionamento } from '../ports/CalculadoraDimensionamento';
import {
  dimensionarCabeamento,
  dimensionarDisjuntor,
  dimensionarEletroduto,
} from './motor';

/** The offline engine behind the calculator port. Pure and synchronous underneath. */
export class CalculadoraNbr5410 implements CalculadoraDimensionamento {
  dimensionarCabeamento: CalculadoraDimensionamento['dimensionarCabeamento'] =
    projeto => Promise.resolve(dimensionarCabeamento(projeto));

  dimensionarDisjuntor: CalculadoraDimensionamento['dimensionarDisjuntor'] =
    projeto => Promise.resolve(dimensionarDisjuntor(projeto));

  dimensionarEletroduto: CalculadoraDimensionamento['dimensionarEletroduto'] =
    projeto => Promise.resolve(dimensionarEletroduto(projeto));
}
