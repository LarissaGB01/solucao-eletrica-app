import { render, screen, userEvent } from '@testing-library/react-native';

import { ChipGroup } from './ChipGroup';

const options = [
  { label: 'A1', value: 'A1' },
  { label: 'B1', value: 'B1' },
] as const;

describe('ChipGroup', () => {
  it('marks the selected option and reports changes', async () => {
    const onChange = jest.fn();
    await render(
      <ChipGroup
        options={options}
        value="A1"
        onChange={onChange}
        accessibilityLabel="Método"
      />,
    );

    expect(screen.getByRole('radio', { name: 'A1' })).toBeChecked();
    await userEvent.press(screen.getByRole('radio', { name: 'B1' }));
    expect(onChange).toHaveBeenCalledWith('B1');
  });
});
