export const FASES = ['MONOFASICO', 'BIFASICO', 'TRIFASICO'] as const;
export type Fases = (typeof FASES)[number];
