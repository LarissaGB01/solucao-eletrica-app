import { screen, userEvent } from '@testing-library/react-native';

import { renderScreen } from '../../testing/renderScreen';
import { ResultadoDisjuntorScreen } from '../disjuntor/ResultadoDisjuntorScreen';

const renderResultado = () =>
  renderScreen(ResultadoDisjuntorScreen, 'ResultadoDisjuntor', {
    resultado: { disjuntor: null },
  });

describe('ResultadoLayout actions', () => {
  it('"Dimensionar outro" reopens the same form fresh, on top of Home', async () => {
    const { navigation } = await renderResultado();

    await userEvent.press(
      screen.getByRole('button', { name: 'Dimensionar outro' }),
    );

    expect(navigation.reset).toHaveBeenCalledWith({
      index: 1,
      routes: [{ name: 'Home' }, { name: 'FormDisjuntor' }],
    });
  });

  it('"Voltar ao início" returns to Home', async () => {
    const { navigation } = await renderResultado();

    await userEvent.press(
      screen.getByRole('button', { name: 'Voltar ao início' }),
    );

    expect(navigation.popToTop).toHaveBeenCalled();
  });
});
