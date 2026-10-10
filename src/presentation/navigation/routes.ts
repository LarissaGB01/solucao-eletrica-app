import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Routes are added here as their phase lands (see PLAN.md).
export type RootStackParamList = {
  Home: undefined;
  Teoria: undefined;
  FormCabeamento: undefined;
  FormDisjuntor: undefined;
  FormEletroduto: undefined;
};

export type ScreenProps<Route extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Route>;
