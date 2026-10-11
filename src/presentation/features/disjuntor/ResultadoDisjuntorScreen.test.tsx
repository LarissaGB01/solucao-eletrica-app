import { screen } from '@testing-library/react-native';

import { RESULTADO_DISJUNTOR_EXEMPLO } from '../../../domain/dimensionamento/resultadosExemplo';
import { renderScreen } from '../../testing/renderScreen';
import { ResultadoDisjuntorScreen } from './ResultadoDisjuntorScreen';

describe('ResultadoDisjuntorScreen', () => {
  it('shows only the suggested breaker', async () => {
    await renderScreen(ResultadoDisjuntorScreen, 'ResultadoDisjuntor', {
      resultado: RESULTADO_DISJUNTOR_EXEMPLO,
    });

    expect(screen.getByText('5SL1 220-7MB')).toBeOnTheScreen();
    expect(screen.queryByText('Condutor Sugerido')).toBeNull();
    expect(screen.queryByText('Eletroduto Sugerido')).toBeNull();
  });
});
