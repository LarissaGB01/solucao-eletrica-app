import { screen, userEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';

import { renderScreen } from '../../testing/renderScreen';
import { secoesTeoria } from './secoesTeoria';
import { TeoriaScreen } from './TeoriaScreen';

describe('TeoriaScreen', () => {
  it('lists the 14 sections of the original app, collapsed', async () => {
    await renderScreen(TeoriaScreen, 'Teoria', undefined);

    expect(secoesTeoria).toHaveLength(14);
    for (const secao of secoesTeoria) {
      expect(
        screen.getByRole('button', { name: secao.titulo }),
      ).toBeCollapsed();
    }
    expect(screen.queryByTestId('formula')).toBeNull();
  });

  it('shows both circuit-current formulas with their captions', async () => {
    await renderScreen(TeoriaScreen, 'Teoria', undefined);

    await userEvent.press(
      screen.getByRole('button', { name: 'Corrente do Circuito' }),
    );

    expect(screen.getByText('Em circuitos TRIFÁSICOS')).toBeOnTheScreen();
    expect(screen.getByText('Em circuitos NÃO TRIFÁSICOS')).toBeOnTheScreen();
    expect(screen.getAllByTestId('formula')).toHaveLength(2);
  });

  it('shows the minimum sections with pt-BR decimals', async () => {
    await renderScreen(TeoriaScreen, 'Teoria', undefined);

    await userEvent.press(
      screen.getByRole('button', { name: 'Seção Mínima do Condutor' }),
    );

    expect(
      screen.getByText(
        'Para um circuito de TOMADA, o mínimo aceito para a seção nominal do condutor é 2,5 mm².',
      ),
    ).toBeOnTheScreen();
  });

  it('shows the Siemens table and opens its source', async () => {
    const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue(undefined);
    await renderScreen(TeoriaScreen, 'Teoria', undefined);

    await userEvent.press(
      screen.getByRole('button', { name: 'Recomendação de Disjuntor' }),
    );
    expect(screen.getByText('5SL1 120-7MB')).toBeOnTheScreen();
    await userEvent.press(screen.getByRole('link', { name: 'Marca: Siemens' }));

    expect(openURL).toHaveBeenCalledWith(
      expect.stringContaining('catalogo-minidisjuntores'),
    );
  });

  it('opens a table full screen when tapped', async () => {
    const { navigation } = await renderScreen(
      TeoriaScreen,
      'Teoria',
      undefined,
    );

    await userEvent.press(
      screen.getByRole('button', { name: 'Recomendação de Eletroduto' }),
    );
    await userEvent.press(
      screen.getByRole('button', {
        name: 'Eletrodutos corrugados Kanalex (Kanaflex). Toque para ampliar',
      }),
    );

    expect(navigation.navigate).toHaveBeenCalledWith('Tabela', {
      tabela: expect.objectContaining({
        titulo: 'Eletrodutos corrugados Kanalex (Kanaflex)',
      }),
    });
  });
});
