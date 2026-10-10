import { render, screen } from '@testing-library/react-native';
import App from './App';

test('renders the app title', async () => {
  await render(<App />);
  expect(screen.getByText('Solução Elétrica')).toBeOnTheScreen();
});
