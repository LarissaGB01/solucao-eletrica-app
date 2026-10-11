import { screen } from '@testing-library/react-native';

import { renderScreen } from '../../testing/renderScreen';
import { ResultadoDisjuntorScreen } from './ResultadoDisjuntorScreen';

describe('ResultadoDisjuntorScreen', () => {
  it('shows only the suggested breaker', async () => {
    await renderScreen(ResultadoDisjuntorScreen, 'ResultadoDisjuntor', {
      resultado: {
        disjuntor: { nome: 'Siemens 5SL1 C20', correnteNominalA: 20 },
      },
    });

    expect(screen.getByText('Siemens 5SL1 C20')).toBeOnTheScreen();
    expect(screen.queryByText('Condutor Sugerido')).toBeNull();
    expect(screen.queryByText('Eletroduto Sugerido')).toBeNull();
  });
});
