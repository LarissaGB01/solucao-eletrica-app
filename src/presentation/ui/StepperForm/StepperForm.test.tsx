import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

import { StepperForm } from './StepperForm';

const steps = [{ key: 'a', content: <Text>Etapa A</Text> }];

describe('StepperForm', () => {
  it('shows the spinner only while busy', async () => {
    const { rerender } = await render(
      <StepperForm
        steps={steps}
        onFinish={jest.fn()}
        busy={false}
        busyLabel="Calculando"
      />,
    );
    expect(screen.getByText('Etapa A')).toBeOnTheScreen();
    expect(screen.queryByLabelText('Calculando')).toBeNull();

    await rerender(
      <StepperForm
        steps={steps}
        onFinish={jest.fn()}
        busy
        busyLabel="Calculando"
      />,
    );
    expect(screen.getByLabelText('Calculando')).toBeOnTheScreen();
  });
});
