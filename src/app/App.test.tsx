import {
  fireEvent,
  render,
  screen,
  userEvent,
} from '@testing-library/react-native';

import App from './App';

describe('App navigation', () => {
  it('starts on Home', async () => {
    await render(<App />);
    expect(screen.getByText('Solução Elétrica')).toBeOnTheScreen();
  });

  it('opens the theory from "Base Teórica"', async () => {
    await render(<App />);
    await userEvent.press(screen.getByRole('button', { name: 'Base Teórica' }));
    expect(
      await screen.findByRole('button', { name: 'Potência Aparente' }),
    ).toBeOnTheScreen();
  });

  it('sizes a cable end to end with the mock calculator', async () => {
    await render(<App />);
    const proximo = () =>
      userEvent.press(screen.getByRole('button', { name: 'Próximo' }));

    await userEvent.press(
      screen.getByRole('button', { name: 'Dimensionar Cabeamento' }),
    );
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

    expect(await screen.findByText('2,50 mm²')).toBeOnTheScreen();
    expect(screen.getByText('Siemens 5SL1 C20')).toBeOnTheScreen();
    expect(screen.getByText('3/4" (25,00 mm)')).toBeOnTheScreen();
  });

  it('sizes a breaker end to end with the mock calculator', async () => {
    await render(<App />);
    await userEvent.press(
      screen.getByRole('button', { name: 'Dimensionar Disjuntores' }),
    );
    await fireEvent.changeText(
      screen.getByLabelText('Corrente de projeto: (A)'),
      '17,3',
    );
    await fireEvent.changeText(
      screen.getByLabelText('Corrente máxima do condutor: (A)'),
      '24',
    );
    await userEvent.press(screen.getByRole('button', { name: 'Finalizar' }));

    expect(await screen.findByText('Siemens 5SL1 C20')).toBeOnTheScreen();

    await userEvent.press(
      screen.getByRole('button', { name: 'Ver cálculos »' }),
    );
    expect(
      await screen.findByRole('button', {
        name: 'Corrente Nominal do Disjuntor',
      }),
    ).toBeOnTheScreen();
  });

  it('sizes a conduit end to end with the mock calculator', async () => {
    await render(<App />);
    await userEvent.press(
      screen.getByRole('button', { name: 'Dimensionar Eletrodutos' }),
    );
    await fireEvent.changeText(
      screen.getByLabelText('Seção nominal do condutor: (mm²)'),
      '2,5',
    );
    await userEvent.press(screen.getByRole('button', { name: 'Finalizar' }));

    expect(await screen.findByText('3/4" (25,00 mm)')).toBeOnTheScreen();
  });

  it('starts the same form over, or returns Home, from a result', async () => {
    await render(<App />);
    await userEvent.press(
      screen.getByRole('button', { name: 'Dimensionar Disjuntores' }),
    );
    await fireEvent.changeText(
      screen.getByLabelText('Corrente de projeto: (A)'),
      '17,3',
    );
    await fireEvent.changeText(
      screen.getByLabelText('Corrente máxima do condutor: (A)'),
      '24',
    );
    await userEvent.press(screen.getByRole('button', { name: 'Finalizar' }));

    await userEvent.press(
      await screen.findByRole('button', { name: 'Dimensionar outro' }),
    );
    expect(
      await screen.findByLabelText('Corrente de projeto: (A)'),
    ).toHaveDisplayValue('');

    await fireEvent.changeText(
      screen.getByLabelText('Corrente de projeto: (A)'),
      '10',
    );
    await fireEvent.changeText(
      screen.getByLabelText('Corrente máxima do condutor: (A)'),
      '24',
    );
    await userEvent.press(screen.getByRole('button', { name: 'Finalizar' }));
    await userEvent.press(
      await screen.findByRole('button', { name: 'Voltar ao início' }),
    );
    expect(await screen.findByText('Bem-vindo!')).toBeOnTheScreen();
  });
});
