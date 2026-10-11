import { render, screen, userEvent } from '@testing-library/react-native';

import { Button } from './Button';

describe('Button', () => {
  it('calls onPress', async () => {
    const onPress = jest.fn();
    await render(
      <Button label="Voltar ao início" variant="secondary" onPress={onPress} />,
    );

    await userEvent.press(
      screen.getByRole('button', { name: 'Voltar ao início' }),
    );

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
