import { fireEvent, render, screen } from '@testing-library/react-native';

import { NumericInput } from './NumericInput';

describe('NumericInput', () => {
  it('shows label and unit and reports typed text', async () => {
    const onChangeText = jest.fn();
    await render(
      <NumericInput
        label="Tensão:"
        unit="Volts"
        value=""
        onChangeText={onChangeText}
      />,
    );

    expect(screen.getByText('Volts')).toBeOnTheScreen();
    await fireEvent.changeText(screen.getByLabelText('Tensão: (Volts)'), '220');
    expect(onChangeText).toHaveBeenCalledWith('220');
  });

  it('shows an error message', async () => {
    await render(
      <NumericInput
        label="Tensão:"
        value="0"
        onChangeText={jest.fn()}
        error="Informe um valor maior que zero"
      />,
    );
    expect(
      screen.getByText('Informe um valor maior que zero'),
    ).toBeOnTheScreen();
  });
});
