// Values match the original backend's request enums, so the Phase 5 engine port maps 1:1.

export const FINALIDADES_CIRCUITO = ['DISTRIBUICAO', 'TERMINAL'] as const;
export type FinalidadeCircuito = (typeof FINALIDADES_CIRCUITO)[number];

export const UTILIZACOES_CIRCUITO = ['TOMADA', 'ILUMINACAO'] as const;
export type UtilizacaoCircuito = (typeof UTILIZACOES_CIRCUITO)[number];

export const FASES = ['MONOFASICO', 'BIFASICO', 'TRIFASICO'] as const;
export type Fases = (typeof FASES)[number];

export const METODOS_INSTALACAO = ['A1', 'A2', 'B1', 'B2', 'C', 'D'] as const;
export type MetodoInstalacao = (typeof METODOS_INSTALACAO)[number];

export const TIPOS_CABO = ['PVC', 'EPR', 'ALUMINIO'] as const;
export type TipoCabo = (typeof TIPOS_CABO)[number];
