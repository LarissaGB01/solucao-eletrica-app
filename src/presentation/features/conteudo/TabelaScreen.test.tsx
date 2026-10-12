import { screen } from '@testing-library/react-native';

import { renderScreen } from '../../testing/renderScreen';
import { TabelaScreen } from './TabelaScreen';

describe('TabelaScreen', () => {
  it('shows the table in a zoomable page', async () => {
    await renderScreen(TabelaScreen, 'Tabela', {
      tabela: { titulo: 'Disjuntores', colunas: ['A'], linhas: [['16']] },
    });

    const webview = screen.getByTestId('tabela-ampliada');
    expect(webview.props.source.html).toContain('<h1>Disjuntores</h1>');
    expect(webview.props.source.html).toContain('user-scalable=yes');
  });
});
