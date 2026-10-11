import type {
  FinalidadeCircuito,
  TipoCabo,
  UtilizacaoCircuito,
} from '../cabeamento/enums';

// Values from the original backend (LarissaGB01/solucao_eletrica_backend, common/constantes).

export type MaterialCondutor = 'COBRE' | 'ALUMINIO';

/** PVC and EPR are insulations of copper cables; ALUMINIO is an aluminium cable. */
export const MATERIAL_POR_TIPO_CABO: Record<TipoCabo, MaterialCondutor> = {
  PVC: 'COBRE',
  EPR: 'COBRE',
  ALUMINIO: 'ALUMINIO',
};

/** Resistivity in Ω·mm²/m. */
export const RESISTIVIDADE: Record<MaterialCondutor, number> = {
  COBRE: 0.0172,
  ALUMINIO: 0.02857,
};

/** Maximum voltage drop, in percent. */
export const QUEDA_TENSAO_MAXIMA: Record<FinalidadeCircuito, number> = {
  DISTRIBUICAO: 2,
  TERMINAL: 4,
};

/** Minimum conductor cross-section in mm². */
export const SECAO_MINIMA: Record<UtilizacaoCircuito, number> = {
  TOMADA: 2.5,
  ILUMINACAO: 1.5,
};

/** Maximum share of the conduit's cross-section that conductors may fill, in percent. */
export const TAXA_OCUPACAO_ELETRODUTO = 40;
