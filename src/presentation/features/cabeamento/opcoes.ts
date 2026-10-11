import { formCabeamento as textos } from '../../../content/cabeamento';
import {
  FINALIDADES_CIRCUITO,
  METODOS_INSTALACAO,
  TIPOS_CABO,
  UTILIZACOES_CIRCUITO,
} from '../../../domain/dimensionamento/cabeamento';
import type { TipoPotencia } from '../../../domain/shared/grandezas';
import { comRotulos } from '../formularios/opcoes';

export const opcoesFinalidade = comRotulos(
  FINALIDADES_CIRCUITO,
  textos.finalidade.opcoes,
);
export const opcoesUtilizacao = comRotulos(
  UTILIZACOES_CIRCUITO,
  textos.utilizacao.opcoes,
);
export const opcoesTipoPotencia = comRotulos<TipoPotencia>(
  ['APARENTE', 'ATIVA'],
  textos.eletrico.tipoPotencia.opcoes,
);
export const opcoesMetodo = METODOS_INSTALACAO.map(value => ({
  value,
  label: value,
}));
export const opcoesTipoCabo = comRotulos(TIPOS_CABO, textos.tipoCabo.opcoes);
