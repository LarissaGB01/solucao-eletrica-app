import type { ImageSourcePropType } from 'react-native';

export const imagensResultado: Record<
  'condutor' | 'disjuntor' | 'eletroduto',
  ImageSourcePropType
> = {
  condutor: require('../../assets/images/fiacao.jpg'),
  disjuntor: require('../../assets/images/disjuntores.jpg'),
  eletroduto: require('../../assets/images/condutos.jpg'),
};
