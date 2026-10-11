import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { ResultadoCabeamento } from '../../domain/dimensionamento/cabeamento';

// Routes are added here as their phase lands (see PLAN.md).
export type RootStackParamList = {
  Home: undefined;
  Teoria: undefined;
  FormCabeamento: undefined;
  // Plain data only, so the navigation state stays serializable.
  ResultadoCabeamento: { resultado: ResultadoCabeamento };
  FormDisjuntor: undefined;
  FormEletroduto: undefined;
};

export type ScreenProps<Route extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Route>;

/** Routes that can be opened without params (e.g. from the Home menu). */
export type RouteWithoutParams = {
  [Route in keyof RootStackParamList]: RootStackParamList[Route] extends undefined
    ? Route
    : never;
}[keyof RootStackParamList];
