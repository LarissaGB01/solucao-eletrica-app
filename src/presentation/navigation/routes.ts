import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { ResultadoCabeamento } from '../../domain/dimensionamento/cabeamento';
import type { ResultadoDisjuntor } from '../../domain/dimensionamento/disjuntor';
import type { ResultadoEletroduto } from '../../domain/dimensionamento/eletroduto';
import type {
  MemoriaCondutor,
  MemoriaDisjuntor,
  MemoriaEletroduto,
} from '../../domain/dimensionamento/memoria';
import type {
  CondutorSugerido,
  DisjuntorSugerido,
  EletrodutoSugerido,
} from '../../domain/dimensionamento/sugestoes';

// Routes are added here as their phase lands (see PLAN.md).
export type RootStackParamList = {
  Home: undefined;
  Teoria: undefined;
  FormCabeamento: undefined;
  // Plain data only, so the navigation state stays serializable.
  ResultadoCabeamento: { resultado: ResultadoCabeamento };
  FormDisjuntor: undefined;
  ResultadoDisjuntor: { resultado: ResultadoDisjuntor };
  FormEletroduto: undefined;
  ResultadoEletroduto: { resultado: ResultadoEletroduto };
  PassoAPassoCondutor: { memoria: MemoriaCondutor; condutor: CondutorSugerido };
  PassoAPassoDisjuntor: {
    memoria: MemoriaDisjuntor;
    disjuntor: DisjuntorSugerido | null;
  };
  PassoAPassoEletroduto: {
    memoria: MemoriaEletroduto;
    eletroduto: EletrodutoSugerido | null;
  };
};

export type ScreenProps<Route extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Route>;

/** Routes that can be opened without params (e.g. from the Home menu). */
export type RouteWithoutParams = {
  [Route in keyof RootStackParamList]: RootStackParamList[Route] extends undefined
    ? Route
    : never;
}[keyof RootStackParamList];
