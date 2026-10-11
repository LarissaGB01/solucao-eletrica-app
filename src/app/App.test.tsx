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

  it.each([
    'Dimensionar Disjuntores',
    'Dimensionar Eletrodutos',
    'Base Teórica',
  ])('opens a placeholder screen from "%s"', async option => {
    await render(<App />);
    await userEvent.press(screen.getByRole('button', { name: option }));
    expect(await screen.findByText('Em construção')).toBeOnTheScreen();
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
});
