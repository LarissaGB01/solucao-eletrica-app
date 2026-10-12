// Kanalex corrugated HDPE conduit (Kanaflex). Maintained by hand, not generated:
// source is Kanaflex, "Manual Técnico Kanalex" (2025), Tabela 6, p. 11:
// https://www.kanaflex.com.br/wp-content/uploads/2025/06/Manual-Tecnico-Kanalex-1.pdf
// The original backend used an older catalog; see golden/eletrodutos-2023.json and ADR 0007.

/** Kanaflex conduits. */
export type LinhaEletroduto = readonly [
  diametroPolegadas: string,
  diametroNominalMm: number,
  diametroExternoMm: number,
  diametroInternoMm: number,
];

export const ELETRODUTOS: readonly LinhaEletroduto[] = [
  ['1.1/4"', 30, 41.3, 31.5],
  ['1.1/2"', 40, 55, 42],
  ['2"', 50, 63, 50.8],
  ['3"', 75, 90, 74],
  ['4"', 100, 125, 104],
  ['5"', 125, 155, 128],
  ['6"', 150, 190, 154],
  ['7"', 175, 202, 175],
  ['8"', 200, 250, 204],
];
