import { render, screen, userEvent } from '@testing-library/react-native';

import App from './App';

describe('App navigation', () => {
  it('starts on Home', async () => {
    await render(<App />);
    expect(screen.getByText('Solução Elétrica')).toBeOnTheScreen();
  });

  it.each([
    'Dimensionar Cabeamento',
    'Dimensionar Disjuntores',
    'Dimensionar Eletrodutos',
    'Base Teórica',
  ])('opens a placeholder screen from "%s"', async option => {
    await render(<App />);
    await userEvent.press(screen.getByRole('button', { name: option }));
    expect(await screen.findByText('Em construção')).toBeOnTheScreen();
  });
});
