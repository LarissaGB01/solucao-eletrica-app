import { render, screen, userEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

import { Stepper } from './Stepper';

const steps = [
  { key: 'a', title: 'Circuito', content: <Text>Etapa A</Text> },
  { key: 'b', title: 'Dados elétricos', content: <Text>Etapa B</Text> },
];

describe('Stepper', () => {
  it('moves forward and back, then finishes on the last step', async () => {
    const onFinish = jest.fn();
    await render(<Stepper steps={steps} onFinish={onFinish} />);

    expect(screen.getByText('Etapa A')).toBeOnTheScreen();
    expect(screen.getByLabelText('Etapa 1 de 2')).toBeOnTheScreen();
    expect(screen.getByRole('header', { name: 'Circuito' })).toBeOnTheScreen();
    expect(
      screen.queryByRole('button', { name: 'Voltar' }),
    ).not.toBeOnTheScreen();

    await userEvent.press(screen.getByRole('button', { name: 'Próximo' }));
    expect(screen.getByText('Etapa B')).toBeOnTheScreen();
    expect(
      screen.getByRole('header', { name: 'Dados elétricos' }),
    ).toBeOnTheScreen();

    await userEvent.press(screen.getByRole('button', { name: 'Voltar' }));
    expect(screen.getByText('Etapa A')).toBeOnTheScreen();

    await userEvent.press(screen.getByRole('button', { name: 'Próximo' }));
    await userEvent.press(screen.getByRole('button', { name: 'Finalizar' }));
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('stays on the step when canAdvance returns false', async () => {
    const canAdvance = jest.fn().mockResolvedValue(false);
    await render(
      <Stepper steps={steps} onFinish={jest.fn()} canAdvance={canAdvance} />,
    );

    await userEvent.press(screen.getByRole('button', { name: 'Próximo' }));
    expect(canAdvance).toHaveBeenCalledWith(0);
    expect(screen.getByText('Etapa A')).toBeOnTheScreen();
  });
});

describe('Stepper with a single step', () => {
  it('hides the progress indicator and offers only Finalizar', async () => {
    await render(
      <Stepper
        steps={[{ key: 'a', content: <Text>Única</Text> }]}
        onFinish={jest.fn()}
      />,
    );

    expect(screen.queryByLabelText('Etapa 1 de 1')).toBeNull();
    expect(screen.getByRole('button', { name: 'Finalizar' })).toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: 'Voltar' })).toBeNull();
  });
});
