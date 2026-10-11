import { formCabeamento as textos } from '../../../content/cabeamento';
import {
  FASES,
  FINALIDADES_CIRCUITO,
  METODOS_INSTALACAO,
  TIPOS_CABO,
  UTILIZACOES_CIRCUITO,
} from '../../../domain/dimensionamento/cabeamento';
import type { TipoPotencia } from '../../../domain/shared/grandezas';
import type { SegmentedOption } from '../../ui';

const comRotulos = <T extends string>(
  valores: readonly T[],
  rotulos: Record<T, string>,
): readonly SegmentedOption<T>[] =>
  valores.map(value => ({ value, label: rotulos[value] }));

// Record<…> annotations make the compiler flag any domain value missing a pt-BR label.
export const opcoesFinalidade = comRotulos(
  FINALIDADES_CIRCUITO,
  textos.finalidade.opcoes,
);
export const opcoesUtilizacao = comRotulos(
  UTILIZACOES_CIRCUITO,
  textos.utilizacao.opcoes,
);
export const opcoesFases = comRotulos(FASES, textos.eletrico.fases.opcoes);
export const opcoesTipoPotencia = comRotulos<TipoPotencia>(
  ['APARENTE', 'ATIVA'],
  textos.eletrico.tipoPotencia.opcoes,
);
export const opcoesMetodo = METODOS_INSTALACAO.map(value => ({
  value,
  label: value,
}));
export const opcoesTipoCabo = comRotulos(TIPOS_CABO, textos.tipoCabo.opcoes);
