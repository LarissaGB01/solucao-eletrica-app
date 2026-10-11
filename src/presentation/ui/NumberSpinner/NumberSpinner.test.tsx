import { fireEvent, render, screen } from '@testing-library/react-native';

import { NumberSpinner } from './NumberSpinner';

const setup = async (value: number) => {
  const onChange = jest.fn();
  await render(
    <NumberSpinner
      label="Temperatura"
      value={value}
      onChange={onChange}
      min={10}
      max={80}
      step={5}
      unit="°C"
    />,
  );
  return onChange;
};

describe('NumberSpinner', () => {
  it('shows the value with its unit', async () => {
    await setup(30);
    expect(screen.getByText('30 °C')).toBeOnTheScreen();
  });

  it('steps up and down', async () => {
    const onChange = await setup(30);
    await fireEvent.press(screen.getByTestId('Temperatura-aumentar'));
    await fireEvent.press(screen.getByTestId('Temperatura-diminuir'));
    expect(onChange.mock.calls).toEqual([[35], [25]]);
  });

  it('clamps to the bounds', async () => {
    const onChange = await setup(78);
    await fireEvent.press(screen.getByTestId('Temperatura-aumentar'));
    expect(onChange).toHaveBeenCalledWith(80);
  });

  it('supports screen-reader increment/decrement', async () => {
    const onChange = await setup(30);
    const adjustable = screen.getByRole('adjustable', { name: 'Temperatura' });
    await fireEvent(adjustable, 'accessibilityAction', {
      nativeEvent: { actionName: 'decrement' },
    });
    expect(onChange).toHaveBeenCalledWith(25);
  });
});
