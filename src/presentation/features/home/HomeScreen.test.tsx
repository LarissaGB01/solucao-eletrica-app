import { render, screen, userEvent } from '@testing-library/react-native';

import type { ScreenProps } from '../../navigation/routes';
import { HomeScreen } from './HomeScreen';

const renderHome = async () => {
  const navigate = jest.fn();
  const props = { navigation: { navigate } } as unknown as ScreenProps<'Home'>;
  await render(<HomeScreen {...props} />);
  return { navigate };
};

describe('HomeScreen', () => {
  it('shows the welcome header', async () => {
    await renderHome();
    expect(screen.getByText('Bem-vindo!')).toBeOnTheScreen();
    expect(
      screen.getByText('Escolha abaixo o cálculo que deseja realizar.'),
    ).toBeOnTheScreen();
  });

  it.each([
    ['Dimensionar Cabeamento', 'FormCabeamento'],
    ['Dimensionar Disjuntores', 'FormDisjuntor'],
    ['Dimensionar Eletrodutos', 'FormEletroduto'],
    ['Base Teórica', 'Teoria'],
  ])('navigates from "%s" to %s', async (option, route) => {
    const { navigate } = await renderHome();
    await userEvent.press(screen.getByRole('button', { name: option }));
    expect(navigate).toHaveBeenCalledWith(route);
  });
});
