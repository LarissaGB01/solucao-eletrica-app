import type { Fases } from './fases';

// Most common values in Brazilian residential installations, used to prefill the forms.

/** Most of Brazil uses 127/220 V networks: 127 V phase-neutral, 220 V between phases. */
export const TENSAO_TIPICA_V: Record<Fases, number> = {
  MONOFASICO: 127,
  BIFASICO: 220,
  TRIFASICO: 220,
};

export const VALORES_TIPICOS = {
  /** A typical general-use outlet circuit (TUG). */
  potenciaVA: 2200,
  /** ANEEL's reference minimum power factor (Resolução Normativa 1.000/2021). */
  fatorPotencia: 0.92,
  comprimentoM: 15,
  temperaturaC: 30, // NBR 5410 reference ambient temperature
  /** The usual residential conductor: 2.5 mm² copper, PVC, method B1, 2 loaded conductors. */
  secaoMm2: 2.5,
  correnteMaximaCondutorA: 24, // capacity of that conductor (NBR 5410 table 36)
  correnteProjetoA: 15,
  /** Phase, neutral and ground of a single-phase circuit. */
  quantidadeCondutores: 3,
} as const;
