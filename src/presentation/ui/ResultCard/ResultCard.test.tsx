import { render, screen } from '@testing-library/react-native';

import { ResultCard } from './ResultCard';

const image = { uri: 'card.png' };

describe('ResultCard', () => {
  it('shows each label/value pair and the footnote', async () => {
    await render(
      <ResultCard
        title="Disjuntor Sugerido"
        image={image}
        lines={[{ label: 'Corrente nominal', value: '20,00 A' }]}
        footnote="Marca Siemens"
      />,
    );

    expect(
      screen.getByRole('header', { name: 'Disjuntor Sugerido' }),
    ).toBeOnTheScreen();
    expect(screen.getByText('Corrente nominal')).toBeOnTheScreen();
    expect(screen.getByText('20,00 A')).toBeOnTheScreen();
    expect(screen.getByText('Marca Siemens')).toBeOnTheScreen();
  });

  it('shows the empty message instead of lines and footnote', async () => {
    await render(
      <ResultCard
        title="Eletroduto Sugerido"
        image={image}
        lines={null}
        emptyMessage="Não encontrei"
        footnote="Marca"
      />,
    );

    expect(screen.getByText('Não encontrei')).toBeOnTheScreen();
    expect(screen.queryByText('Marca')).toBeNull();
  });
});
