import type { ImageSourcePropType } from 'react-native';

import { home } from '../../../content/home';
import type { RouteWithoutParams } from '../../navigation/routes';

export type HomeOption = {
  label: string;
  image: ImageSourcePropType;
  route: Exclude<RouteWithoutParams, 'Home'>;
};

export const homeOptions: readonly HomeOption[] = [
  {
    label: home.opcoes.cabeamento,
    image: require('../../assets/images/fiacao.jpg'),
    route: 'FormCabeamento',
  },
  {
    label: home.opcoes.disjuntor,
    image: require('../../assets/images/disjuntores.jpg'),
    route: 'FormDisjuntor',
  },
  {
    label: home.opcoes.eletroduto,
    image: require('../../assets/images/condutos.jpg'),
    route: 'FormEletroduto',
  },
  {
    label: home.opcoes.teoria,
    image: require('../../assets/images/teoria.jpg'),
    route: 'Teoria',
  },
];
