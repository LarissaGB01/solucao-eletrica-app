// Generated from the original backend's normativas.sql by scripts/converter-normativas.mjs.
// Do not edit by hand.
import type { Isolacao } from '../constantes';

export type LinhaFatorTemperatura = readonly [
  temperaturaC: number,
  isolacao: Isolacao,
  fator: number,
];

export const FATOR_TEMPERATURA: readonly LinhaFatorTemperatura[] = [
  [10, 'EPR', 1.15],
  [10, 'PVC', 1.22],
  [15, 'EPR', 1.12],
  [15, 'PVC', 1.17],
  [20, 'EPR', 1.08],
  [20, 'PVC', 1.12],
  [25, 'EPR', 1.04],
  [25, 'PVC', 1.06],
  [30, 'EPR', 1],
  [30, 'PVC', 1],
  [35, 'EPR', 0.96],
  [35, 'PVC', 0.94],
  [40, 'EPR', 0.91],
  [40, 'PVC', 0.87],
  [45, 'EPR', 0.87],
  [45, 'PVC', 0.79],
  [50, 'EPR', 0.82],
  [50, 'PVC', 0.71],
  [55, 'EPR', 0.76],
  [55, 'PVC', 0.61],
  [60, 'EPR', 0.71],
  [60, 'PVC', 0.5],
  [65, 'EPR', 0.65],
  [70, 'EPR', 0.58],
  [75, 'EPR', 0.5],
  [80, 'EPR', 0.41],
];
