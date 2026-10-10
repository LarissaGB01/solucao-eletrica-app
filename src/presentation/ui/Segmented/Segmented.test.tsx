import { render, screen, userEvent } from '@testing-library/react-native';

import { Segmented } from './Segmented';

const options = [
  { label: 'Monofásico', value: 'MONOFASICO' },
  { label: 'Bifásico', value: 'BIFASICO' },
  { label: 'Trifásico', value: 'TRIFASICO' },
] as const;

describe('Segmented', () => {
  it('marks the selected option and reports changes', async () => {
    const onChange = jest.fn();
    await render(
      <Segmented
        options={options}
        value="TRIFASICO"
        onChange={onChange}
        accessibilityLabel="Fases"
      />,
    );

    expect(screen.getByRole('radio', { name: 'Trifásico' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Monofásico' })).not.toBeChecked();

    await userEvent.press(screen.getByRole('radio', { name: 'Bifásico' }));
    expect(onChange).toHaveBeenCalledWith('BIFASICO');
  });
});
