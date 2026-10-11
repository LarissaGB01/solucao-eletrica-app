import { screen } from '@testing-library/react-native';

import { RESULTADO_ELETRODUTO_EXEMPLO } from '../../../domain/dimensionamento/resultadosExemplo';
import { renderScreen } from '../../testing/renderScreen';
import { ResultadoEletrodutoScreen } from './ResultadoEletrodutoScreen';

describe('ResultadoEletrodutoScreen', () => {
  it('shows only the suggested conduit', async () => {
    await renderScreen(ResultadoEletrodutoScreen, 'ResultadoEletroduto', {
      resultado: RESULTADO_ELETRODUTO_EXEMPLO,
    });

    expect(screen.getByText('1 1/4" (30,00 mm)')).toBeOnTheScreen();
    expect(screen.queryByText('Disjuntor Sugerido')).toBeNull();
  });
});
