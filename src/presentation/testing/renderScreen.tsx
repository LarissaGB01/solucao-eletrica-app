import { render } from '@testing-library/react-native';
import type { ComponentType } from 'react';

import { type UseCases, UseCasesProvider } from '../di/UseCasesContext';
import type { RootStackParamList, ScreenProps } from '../navigation/routes';

const naoStubado = () => Promise.reject(new Error('use case not stubbed'));

/** Test helper: renders one screen with a navigation spy and fake use cases. */
export async function renderScreen<Route extends keyof RootStackParamList>(
  Screen: ComponentType<ScreenProps<Route>>,
  name: Route,
  params: RootStackParamList[Route],
  useCases: Partial<UseCases> = {},
) {
  const navigation = { navigate: jest.fn() };
  // RouteProp is a conditional type TS can't build from a generic Route; tests pass real values.
  const route = {
    key: name,
    name,
    params,
  } as unknown as ScreenProps<Route>['route'];
  await render(
    <UseCasesProvider
      value={{
        dimensionarCabeamento: { execute: naoStubado },
        dimensionarDisjuntor: { execute: naoStubado },
        dimensionarEletroduto: { execute: naoStubado },
        ...useCases,
      }}
    >
      <Screen
        navigation={navigation as unknown as ScreenProps<Route>['navigation']}
        route={route}
      />
    </UseCasesProvider>,
  );
  return { navigation };
}
