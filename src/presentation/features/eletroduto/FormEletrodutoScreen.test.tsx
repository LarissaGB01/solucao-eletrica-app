import { fireEvent, screen, userEvent } from '@testing-library/react-native';

import { ok } from '../../../domain/shared/Result';
import { renderScreen } from '../../testing/renderScreen';
import { FormEletrodutoScreen } from './FormEletrodutoScreen';

const finalizar = () =>
  userEvent.press(screen.getByRole('button', { name: 'Finalizar' }));

describe('FormEletrodutoScreen', () => {
  it('shows a message and does not calculate while the section is empty', async () => {
    const execute = jest.fn();
    await renderScreen(FormEletrodutoScreen, 'FormEletroduto', undefined, {
      dimensionarEletroduto: { execute },
    });

    await finalizar();

    expect(
      await screen.findByText('Informe uma seção maior que zero.'),
    ).toBeOnTheScreen();
    expect(execute).not.toHaveBeenCalled();
  });

  it('sizes the conduit and opens the result', async () => {
    const resultado = { eletroduto: null };
    const execute = jest.fn().mockResolvedValue(ok(resultado));
    const { navigation } = await renderScreen(
      FormEletrodutoScreen,
      'FormEletroduto',
      undefined,
      { dimensionarEletroduto: { execute } },
    );

    await fireEvent.changeText(
      screen.getByLabelText('Seção nominal do condutor: (mm²)'),
      '2,5',
    );
    await fireEvent.press(
      screen.getByTestId(
        'Informe a quantidade de condutores no eletroduto-aumentar',
      ),
    );
    await finalizar();

    expect(execute).toHaveBeenCalledWith(
      expect.objectContaining({
        secaoNominalCondutor: expect.objectContaining({ mm2: 2.5 }),
        quantidadeCondutores: expect.objectContaining({ valor: 4 }),
      }),
    );
    expect(navigation.navigate).toHaveBeenCalledWith('ResultadoEletroduto', {
      resultado,
    });
  });
});
