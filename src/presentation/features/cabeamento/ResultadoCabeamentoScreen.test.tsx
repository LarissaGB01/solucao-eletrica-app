import { screen, userEvent } from '@testing-library/react-native';

import type { ResultadoCabeamento } from '../../../domain/dimensionamento/cabeamento';
import { RESULTADO_CABEAMENTO_EXEMPLO } from '../../../domain/dimensionamento/resultadosExemplo';
import { renderScreen } from '../../testing/renderScreen';
import { ResultadoCabeamentoScreen } from './ResultadoCabeamentoScreen';

const renderResultado = (resultado: ResultadoCabeamento) =>
  renderScreen(ResultadoCabeamentoScreen, 'ResultadoCabeamento', { resultado });

describe('ResultadoCabeamentoScreen', () => {
  it('shows the suggested conductor, breaker and conduit', async () => {
    await renderResultado(RESULTADO_CABEAMENTO_EXEMPLO);

    expect(screen.getByText('2,50 mm²')).toBeOnTheScreen();
    expect(screen.getByText('24,00 A')).toBeOnTheScreen();
    expect(screen.getByText('5SL1 220-7MB')).toBeOnTheScreen();
    expect(screen.getByText('20,00 A')).toBeOnTheScreen();
    expect(screen.getByText('1 1/4" (30,00 mm)')).toBeOnTheScreen();
  });

  it('explains when no breaker or conduit fits', async () => {
    await renderResultado({
      ...RESULTADO_CABEAMENTO_EXEMPLO,
      disjuntor: null,
      eletroduto: null,
    });

    expect(
      screen.getByText(
        'Desculpe, mas não encontrei disjuntor para os parâmetros fornecidos.',
      ),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(
        'Desculpe, mas não encontrei eletroduto para os parâmetros fornecidos.',
      ),
    ).toBeOnTheScreen();
    expect(screen.queryByText('Marca Siemens')).toBeNull();
  });

  it('opens the steps of each suggested item', async () => {
    const { navigation } = await renderResultado(RESULTADO_CABEAMENTO_EXEMPLO);
    const botoes = screen.getAllByRole('button', { name: 'Ver cálculos »' });
    expect(botoes).toHaveLength(3);

    for (const botao of botoes) {
      await userEvent.press(botao);
    }

    const { memoria, condutor, disjuntor, eletroduto } =
      RESULTADO_CABEAMENTO_EXEMPLO;
    expect(navigation.navigate.mock.calls).toEqual([
      ['PassoAPassoCondutor', { memoria: memoria.condutor, condutor }],
      ['PassoAPassoDisjuntor', { memoria: memoria.disjuntor, disjuntor }],
      ['PassoAPassoEletroduto', { memoria: memoria.eletroduto, eletroduto }],
    ]);
  });
});
