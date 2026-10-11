import { render, screen, userEvent } from '@testing-library/react-native';

import { LinkButton } from './LinkButton';

describe('LinkButton', () => {
  it('is announced as a link and calls onPress', async () => {
    const onPress = jest.fn();
    await render(<LinkButton label="Fonte: NBR 5410" onPress={onPress} />);

    await userEvent.press(
      screen.getByRole('link', { name: 'Fonte: NBR 5410' }),
    );

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
