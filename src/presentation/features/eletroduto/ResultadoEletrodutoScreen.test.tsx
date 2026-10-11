import { screen } from '@testing-library/react-native';

import { renderScreen } from '../../testing/renderScreen';
import { ResultadoEletrodutoScreen } from './ResultadoEletrodutoScreen';

describe('ResultadoEletrodutoScreen', () => {
  it('shows only the suggested conduit', async () => {
    await renderScreen(ResultadoEletrodutoScreen, 'ResultadoEletroduto', {
      resultado: {
        eletroduto: { diametroNominalPolegadas: '3/4"', diametroNominalMm: 25 },
      },
    });

    expect(screen.getByText('3/4" (25,00 mm)')).toBeOnTheScreen();
    expect(screen.queryByText('Disjuntor Sugerido')).toBeNull();
  });
});
