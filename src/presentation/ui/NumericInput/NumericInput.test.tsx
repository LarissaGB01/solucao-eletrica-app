import { fireEvent, render, screen } from '@testing-library/react-native';

import { NumericInput } from './NumericInput';

describe('NumericInput', () => {
  it('shows label, unit and hint, and reports typed text', async () => {
    const onChangeText = jest.fn();
    await render(
      <NumericInput
        label="Tensão"
        unit="V"
        hint="Valor típico: 127 V"
        value=""
        onChangeText={onChangeText}
      />,
    );

    expect(screen.getByText('V')).toBeOnTheScreen();
    expect(screen.getByText('Valor típico: 127 V')).toBeOnTheScreen();
    await fireEvent.changeText(screen.getByLabelText('Tensão (V)'), '220');
    expect(onChangeText).toHaveBeenCalledWith('220');
  });

  it('shows the error instead of the hint', async () => {
    await render(
      <NumericInput
        label="Tensão"
        value="0"
        hint="Valor típico: 127 V"
        onChangeText={jest.fn()}
        error="Informe um valor maior que zero"
      />,
    );
    expect(
      screen.getByText('Informe um valor maior que zero'),
    ).toBeOnTheScreen();
    expect(screen.queryByText('Valor típico: 127 V')).toBeNull();
  });
});
