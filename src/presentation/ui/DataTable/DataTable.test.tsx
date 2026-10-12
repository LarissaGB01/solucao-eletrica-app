import { render, screen, userEvent } from '@testing-library/react-native';

import { DataTable } from './DataTable';

const props = {
  title: 'Disjuntores',
  columns: ['Corrente (A)', 'Modelo'],
  rows: [
    ['16', '5SL1 116-7MB'],
    ['20', '5SL1 120-7MB'],
  ],
};

describe('DataTable', () => {
  it('shows the title, headers and every cell', async () => {
    await render(<DataTable {...props} note="Fonte: Siemens" />);

    for (const text of [
      'Disjuntores',
      'Corrente (A)',
      'Modelo',
      '20',
      '5SL1 120-7MB',
      'Fonte: Siemens',
    ]) {
      expect(screen.getByText(text)).toBeOnTheScreen();
    }
  });

  it('marks the highlighted row', async () => {
    await render(<DataTable {...props} highlightedRow={1} />);

    expect(screen.getByTestId('linha-destaque')).toHaveTextContent(
      '205SL1 120-7MB',
    );
  });

  it('opens full screen when pressed, announcing the hint', async () => {
    const onPress = jest.fn();
    await render(
      <DataTable {...props} onPress={onPress} hint="Toque para ampliar" />,
    );

    await userEvent.press(
      screen.getByRole('button', { name: 'Disjuntores. Toque para ampliar' }),
    );

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is not a button without onPress', async () => {
    await render(<DataTable {...props} hint="Toque para ampliar" />);

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByText('Toque para ampliar')).toBeNull();
  });
});
