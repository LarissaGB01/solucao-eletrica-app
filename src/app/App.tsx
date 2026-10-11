import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { UseCasesProvider } from '../presentation/di/UseCasesContext';
import { createUseCases } from './di/createUseCases';
import { RootNavigator } from './navigation/RootNavigator';

const useCases = createUseCases();

export default function App() {
  return (
    <UseCasesProvider value={useCases}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <RootNavigator />
      </SafeAreaProvider>
    </UseCasesProvider>
  );
}
