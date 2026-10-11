// Converts the original backend's seed data (normativas.sql) into typed domain tables.
// Usage: node scripts/converter-normativas.mjs ../solucao_eletrica_backend/src/main/resources/normativas.sql
// The output is committed; rerun only if the source tables change.

import { readFileSync, writeFileSync } from 'node:fs';

const [arquivo] = process.argv.slice(2);
if (!arquivo) {
  throw new Error('Informe o caminho de normativas.sql');
}
const sql = readFileSync(arquivo, 'utf8');
const destino = new URL(
  '../src/domain/dimensionamento/nbr5410/tabelas/',
  import.meta.url,
);

/** Rows of `INSERT INTO <tabela> VALUES (...),(...);` as arrays of strings/numbers. */
function linhas(tabela) {
  const inicio = sql.indexOf(`INSERT INTO ${tabela} VALUES`);
  const fim = sql.indexOf(';', inicio);
  const valores = sql.slice(sql.indexOf('VALUES', inicio) + 6, fim);
  return [...valores.matchAll(/\(([^)]*)\)/g)].map(([, linha]) =>
    linha.split(',').map(v => (v.startsWith("'") ? v.slice(1, -1) : Number(v))),
  );
}

const cabecalho = `// Generated from the original backend's normativas.sql by scripts/converter-normativas.mjs.
// Do not edit by hand.
`;

function escrever(nome, conteudo) {
  writeFileSync(new URL(`${nome}.ts`, destino), `${cabecalho}${conteudo}`);
}

escrever(
  'fatorTemperatura',
  `import type { Isolacao } from '../constantes';

export type LinhaFatorTemperatura = readonly [temperaturaC: number, isolacao: Isolacao, fator: number];

export const FATOR_TEMPERATURA: readonly LinhaFatorTemperatura[] = ${JSON.stringify(
    linhas('fator_temperatura'),
  )};
`,
);

escrever(
  'conducaoCabos',
  `import type { MetodoInstalacao } from '../../cabeamento/enums';
import type { Isolacao, MaterialCondutor } from '../constantes';

/** NBR 5410 current-carrying capacity (tables 36–39). */
export type LinhaConducao = readonly [
  material: MaterialCondutor,
  secaoMm2: number,
  metodo: MetodoInstalacao,
  condutoresCarregados: number,
  correnteA: number,
  isolacao: Isolacao,
];

export const CONDUCAO_CABOS: readonly LinhaConducao[] = ${JSON.stringify(
    linhas('conducao_cabos'),
  )};
`,
);

escrever(
  'disjuntores',
  `/** Siemens 5SL1 miniature circuit breakers, curve C. */
export type LinhaDisjuntor = readonly [correnteNominalA: number, polos: number, nome: string];

export const DISJUNTORES: readonly LinhaDisjuntor[] = ${JSON.stringify(
    linhas('exemplos_disjuntores'),
  )};
`,
);

escrever(
  'eletrodutos',
  `/** Kanaflex conduits. */
export type LinhaEletroduto = readonly [
  diametroPolegadas: string,
  diametroNominalMm: number,
  diametroExternoMm: number,
  diametroInternoMm: number,
];

export const ELETRODUTOS: readonly LinhaEletroduto[] = ${JSON.stringify(
    linhas('exemplos_eletrodutos'),
  )};
`,
);
