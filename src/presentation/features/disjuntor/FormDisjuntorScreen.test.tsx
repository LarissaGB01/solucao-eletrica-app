import { fireEvent, screen, userEvent } from '@testing-library/react-native';

import { ok } from '../../../domain/shared/Result';
import { renderScreen } from '../../testing/renderScreen';
import { FormDisjuntorScreen } from './FormDisjuntorScreen';

const finalizar = () =>
  userEvent.press(screen.getByRole('button', { name: 'Finalizar' }));

describe('FormDisjuntorScreen', () => {
  it('shows messages and does not calculate while currents are empty', async () => {
    const execute = jest.fn();
    await renderScreen(FormDisjuntorScreen, 'FormDisjuntor', undefined, {
      dimensionarDisjuntor: { execute },
    });

    await finalizar();

    expect(
      await screen.findAllByText('Informe uma corrente maior que zero.'),
    ).toHaveLength(2);
    expect(execute).not.toHaveBeenCalled();
  });

  it('sizes the breaker and opens the result', async () => {
    const resultado = { disjuntor: { nome: 'C20', correnteNominalA: 20 } };
    const execute = jest.fn().mockResolvedValue(ok(resultado));
    const { navigation } = await renderScreen(
      FormDisjuntorScreen,
      'FormDisjuntor',
      undefined,
      { dimensionarDisjuntor: { execute } },
    );

    await userEvent.press(screen.getByRole('radio', { name: 'Trifásico' }));
    await fireEvent.changeText(
      screen.getByLabelText('Corrente de projeto: (A)'),
      '17,3',
    );
    await fireEvent.changeText(
      screen.getByLabelText('Corrente máxima do condutor: (A)'),
      '24',
    );
    await finalizar();

    expect(execute).toHaveBeenCalledWith(
      expect.objectContaining({
        fases: 'TRIFASICO',
        correnteProjeto: expect.objectContaining({ amperes: 17.3 }),
      }),
    );
    expect(navigation.navigate).toHaveBeenCalledWith('ResultadoDisjuntor', {
      resultado,
    });
  });
});
