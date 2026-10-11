// Generated from the original backend's normativas.sql by scripts/converter-normativas.mjs.
// Do not edit by hand.
/** Kanaflex conduits. */
export type LinhaEletroduto = readonly [
  diametroPolegadas: string,
  diametroNominalMm: number,
  diametroExternoMm: number,
  diametroInternoMm: number,
];

export const ELETRODUTOS: readonly LinhaEletroduto[] = [
  ['1.1/4"', 30, 41.3, 31.5],
  ['1.1/2"', 40, 56, 43],
  ['2"', 50, 63.4, 50.8],
  ['3"', 75, 89.5, 75],
  ['4"', 100, 124.5, 103],
  ['5"', 125, 155, 128],
  ['6"', 150, 190, 155],
  ['7"', 175, 202, 176],
  ['8"', 200, 250, 205],
];
