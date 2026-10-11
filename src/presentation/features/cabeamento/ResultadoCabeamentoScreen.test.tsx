import { render, screen } from '@testing-library/react-native';

import type { ResultadoCabeamento } from '../../../domain/dimensionamento/cabeamento';
import type { ScreenProps } from '../../navigation/routes';
import { ResultadoCabeamentoScreen } from './ResultadoCabeamentoScreen';

const renderResultado = (resultado: ResultadoCabeamento) =>
  render(
    <ResultadoCabeamentoScreen
      navigation={{} as ScreenProps<'ResultadoCabeamento'>['navigation']}
      route={{
        key: 'resultado',
        name: 'ResultadoCabeamento',
        params: { resultado },
      }}
    />,
  );

describe('ResultadoCabeamentoScreen', () => {
  it('shows the suggested conductor, breaker and conduit', async () => {
    await renderResultado({
      condutor: { secaoNominalMm2: 2.5, correnteMaximaA: 24 },
      disjuntor: { nome: 'Siemens 5SL1 C20', correnteNominalA: 20 },
      eletroduto: { diametroNominalPolegadas: '3/4"', diametroNominalMm: 25 },
    });

    expect(screen.getByText('2,50 mm²')).toBeOnTheScreen();
    expect(screen.getByText('24,00 A')).toBeOnTheScreen();
    expect(screen.getByText('Siemens 5SL1 C20')).toBeOnTheScreen();
    expect(screen.getByText('20,00 A')).toBeOnTheScreen();
    expect(screen.getByText('3/4" (25,00 mm)')).toBeOnTheScreen();
  });

  it('explains when no breaker or conduit fits', async () => {
    await renderResultado({
      condutor: { secaoNominalMm2: 240, correnteMaximaA: 400 },
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
});
