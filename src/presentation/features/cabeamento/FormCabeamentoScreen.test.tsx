import { fireEvent, screen, userEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';

import { RESULTADO_CABEAMENTO_EXEMPLO } from '../../../domain/dimensionamento/resultadosExemplo';
import { err, ok } from '../../../domain/shared/Result';
import type { UseCases } from '../../di/UseCasesContext';
import { renderScreen } from '../../testing/renderScreen';
import { FormCabeamentoScreen } from './FormCabeamentoScreen';

const resultado = RESULTADO_CABEAMENTO_EXEMPLO;

const setup = async (execute: UseCases['dimensionarCabeamento']['execute']) => {
  const { navigation } = await renderScreen(
    FormCabeamentoScreen,
    'FormCabeamento',
    undefined,
    { dimensionarCabeamento: { execute } },
  );
  return navigation;
};

const proximo = () =>
  userEvent.press(screen.getByRole('button', { name: 'Próximo' }));

const limparEletricos = async () => {
  await fireEvent.changeText(screen.getByLabelText('Tensão: (Volts)'), '');
  await fireEvent.changeText(
    screen.getByLabelText('Potência: (VoltAmperes)'),
    '',
  );
};

const preencherAteFinal = async () => {
  await proximo();
  await fireEvent.changeText(screen.getByLabelText('Tensão: (Volts)'), '127');
  await fireEvent.changeText(
    screen.getByLabelText('Potência: (VoltAmperes)'),
    '2200',
  );
  await proximo();
  await proximo();
  await fireEvent.changeText(
    screen.getByLabelText('Comprimento: (metros)'),
    '15',
  );
  await userEvent.press(screen.getByRole('button', { name: 'Finalizar' }));
};

describe('FormCabeamentoScreen', () => {
  it('stays on the electrical step and shows messages while required fields are empty', async () => {
    const execute = jest.fn();
    await setup(execute);

    await proximo();
    await limparEletricos();
    await proximo();

    expect(screen.getByLabelText('Etapa 2 de 4')).toBeOnTheScreen();
    expect(
      await screen.findByText('Informe uma tensão inteira maior que zero.'),
    ).toBeOnTheScreen();
    expect(
      screen.getByText('Informe uma potência maior que zero.'),
    ).toBeOnTheScreen();
    expect(execute).not.toHaveBeenCalled();
  });

  it('clears a message as soon as the field is fixed', async () => {
    await setup(jest.fn());
    await proximo();
    await limparEletricos();
    await proximo();
    await screen.findByText('Informe uma tensão inteira maior que zero.');

    await fireEvent.changeText(screen.getByLabelText('Tensão: (Volts)'), '127');

    expect(
      screen.queryByText('Informe uma tensão inteira maior que zero.'),
    ).toBeNull();
    expect(
      screen.getByText('Informe uma potência maior que zero.'),
    ).toBeOnTheScreen();
  });

  it('asks for the power factor only for active power and validates its range', async () => {
    await setup(jest.fn());
    await proximo();
    expect(screen.queryByLabelText('Fator de Potência:')).toBeNull();

    await userEvent.press(screen.getByRole('radio', { name: 'Ativa' }));
    await fireEvent.changeText(screen.getByLabelText('Tensão: (Volts)'), '220');
    await fireEvent.changeText(
      screen.getByLabelText('Potência: (Watts)'),
      '1800',
    );
    await fireEvent.changeText(
      screen.getByLabelText('Fator de Potência:'),
      '1,5',
    );
    await proximo();

    expect(
      await screen.findByText(
        'O fator de potência deve ser maior que 0 e no máximo 1.',
      ),
    ).toBeOnTheScreen();
  });

  it('sizes the project and opens the result', async () => {
    const execute = jest.fn().mockResolvedValue(ok(resultado));
    const navigation = await setup(execute);

    await preencherAteFinal();

    expect(execute).toHaveBeenCalledWith(
      expect.objectContaining({
        tensao: expect.objectContaining({ volts: 127 }),
        comprimento: expect.objectContaining({ metros: 15 }),
      }),
    );
    expect(navigation.navigate).toHaveBeenCalledWith('ResultadoCabeamento', {
      resultado,
    });
  });

  it('alerts and stays on the form when the calculation fails', async () => {
    const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const navigation = await setup(
      jest.fn().mockResolvedValue(err({ codigo: 'FALHA_CALCULO' })),
    );

    await preencherAteFinal();

    expect(alert).toHaveBeenCalledWith('Erro inesperado. Tente novamente!');
    expect(navigation.navigate).not.toHaveBeenCalled();
  });

  it('starts with common Brazilian values, so the defaults can be calculated directly', async () => {
    const execute = jest.fn().mockResolvedValue(ok(resultado));
    await setup(execute);

    await proximo();
    expect(screen.getByLabelText('Tensão: (Volts)')).toHaveDisplayValue('127');
    expect(screen.getByLabelText('Potência: (VoltAmperes)')).toHaveDisplayValue(
      '2200',
    );
    await proximo();
    await proximo();
    expect(screen.getByLabelText('Comprimento: (metros)')).toHaveDisplayValue(
      '15',
    );
    await userEvent.press(screen.getByRole('button', { name: 'Finalizar' }));

    expect(execute).toHaveBeenCalled();
  });

  it('suggests 0,92 as power factor for active power', async () => {
    await setup(jest.fn());
    await proximo();
    await userEvent.press(screen.getByRole('radio', { name: 'Ativa' }));

    expect(screen.getByLabelText('Fator de Potência:')).toHaveDisplayValue(
      '0,92',
    );
  });

  it('moves the suggested voltage with the phases, but keeps a typed one', async () => {
    await setup(jest.fn());
    await proximo();
    const tensao = () => screen.getByLabelText('Tensão: (Volts)');

    await userEvent.press(screen.getByRole('radio', { name: 'Trifásico' }));
    expect(tensao()).toHaveDisplayValue('220');

    await fireEvent.changeText(tensao(), '380');
    await userEvent.press(screen.getByRole('radio', { name: 'Monofásico' }));
    expect(tensao()).toHaveDisplayValue('380');
  });
});
