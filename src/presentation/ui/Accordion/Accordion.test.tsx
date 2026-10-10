import { render, screen, userEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('starts collapsed and toggles its content', async () => {
    await render(
      <Accordion title="Corrente de projeto">
        <Text>Conteúdo</Text>
      </Accordion>,
    );
    const header = screen.getByRole('button', { name: 'Corrente de projeto' });

    expect(screen.queryByText('Conteúdo')).not.toBeOnTheScreen();
    expect(header).toBeCollapsed();

    await userEvent.press(header);
    expect(screen.getByText('Conteúdo')).toBeOnTheScreen();
    expect(header).toBeExpanded();

    await userEvent.press(header);
    expect(screen.queryByText('Conteúdo')).not.toBeOnTheScreen();
  });

  it('can start expanded', async () => {
    await render(
      <Accordion title="Título" initiallyExpanded>
        <Text>Conteúdo</Text>
      </Accordion>,
    );
    expect(screen.getByText('Conteúdo')).toBeOnTheScreen();
  });
});
