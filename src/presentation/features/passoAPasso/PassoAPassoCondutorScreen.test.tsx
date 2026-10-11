import { screen, userEvent } from '@testing-library/react-native';

import { RESULTADO_CABEAMENTO_EXEMPLO as exemplo } from '../../../domain/dimensionamento/resultadosExemplo';
import { renderScreen } from '../../testing/renderScreen';
import { PassoAPassoCondutorScreen } from './PassoAPassoCondutorScreen';

describe('PassoAPassoCondutorScreen', () => {
  it('opens a step to show its formulas in a single view', async () => {
    await renderScreen(PassoAPassoCondutorScreen, 'PassoAPassoCondutor', {
      memoria: exemplo.memoria.condutor,
      condutor: exemplo.condutor,
    });

    await userEvent.press(
      screen.getByRole('button', { name: 'Corrente do Circuito = 17,32 A' }),
    );

    expect(screen.getAllByTestId('formula')).toHaveLength(1);
  });
});
