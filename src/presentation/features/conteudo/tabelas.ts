import { teoria } from '../../../content/teoria';
import type { MetodoInstalacao } from '../../../domain/dimensionamento/cabeamento/enums';
import { METODOS_INSTALACAO } from '../../../domain/dimensionamento/cabeamento/enums';
import type {
  Isolacao,
  MaterialCondutor,
} from '../../../domain/dimensionamento/nbr5410/constantes';
import { CONDUCAO_CABOS } from '../../../domain/dimensionamento/nbr5410/tabelas/conducaoCabos';
import { DISJUNTORES } from '../../../domain/dimensionamento/nbr5410/tabelas/disjuntores';
import { ELETRODUTOS } from '../../../domain/dimensionamento/nbr5410/tabelas/eletrodutos';
import { FATOR_TEMPERATURA } from '../../../domain/dimensionamento/nbr5410/tabelas/fatorTemperatura';
import { formatarNumero } from '../../format/formatarNumero';
import { formatarPolegadas } from '../../format/formatarPolegadas';
import type { Tabela } from './Bloco';

// Reference tables shown in Teoria and Passo a passo, built from the same data the engine uses.
// NBR 5410 tables appear only as excerpts (the standard is sold by ABNT); the manufacturers'
// catalogs appear whole, with their source linked next to them.

const { colunas, notas, tabelas: titulos } = teoria;

/** pt-BR number without trailing zeros: 2.5 → "2,5", 1 → "1". */
const valor = (numero: number) => String(numero).replace('.', ',');

/** `destaque` only when the row exists, so a missing value never highlights row -1. */
const comDestaque = (tabela: Tabela, indice: number): Tabela =>
  indice >= 0
    ? { ...tabela, destaque: indice, nota: notas.linhaUsada }
    : tabela;

const fator = (temperatura: number, isolacao: Isolacao) =>
  FATOR_TEMPERATURA.find(
    ([t, iso]) => t === temperatura && iso === isolacao,
  )?.[2];

const TEMPERATURAS_TRECHO = [25, 30, 35, 40] as const;

/** Teoria: a few rows around the 30 °C reference, both insulations. */
export function trechoFatorTemperatura(): Tabela {
  return {
    titulo: titulos.fatorTemperatura,
    colunas: [colunas.temperatura, 'PVC', 'EPR'],
    linhas: TEMPERATURAS_TRECHO.map(t => [
      String(t),
      valor(fator(t, 'PVC') ?? 0),
      valor(fator(t, 'EPR') ?? 0),
    ]),
    nota: notas.trechoTemperatura,
  };
}

/** Passo a passo: the row used (first at or above the ambient temperature) and its neighbours. */
export function fatorTemperaturaUsado(
  temperaturaC: number,
  isolacao: Isolacao,
): Tabela {
  const linhas = FATOR_TEMPERATURA.filter(([, iso]) => iso === isolacao);
  const usada = linhas.findIndex(([t]) => t >= temperaturaC);
  const inicio = Math.max(0, usada - 1);
  const trecho = linhas.slice(inicio, usada < 0 ? 0 : usada + 2);
  return comDestaque(
    {
      titulo: titulos.fatorTemperatura,
      colunas: [colunas.temperatura, isolacao],
      linhas: trecho.map(([t, , f]) => [String(t), valor(f)]),
    },
    usada - inicio,
  );
}

const capacidade = (
  material: MaterialCondutor,
  isolacao: Isolacao,
  metodo: MetodoInstalacao,
  carregados: number,
  secao: number,
) =>
  CONDUCAO_CABOS.find(
    ([mat, s, m, c, , iso]) =>
      mat === material &&
      s === secao &&
      m === metodo &&
      c === carregados &&
      iso === isolacao,
  )?.[4];

const SECOES_TRECHO = [1.5, 2.5, 4, 6, 10] as const;

/** Teoria: copper, 2 loaded conductors, small sections, every installation method. */
export function trechoConducao(isolacao: Isolacao): Tabela {
  return {
    titulo: isolacao === 'PVC' ? titulos.conducaoPvc : titulos.conducaoEpr,
    colunas: [colunas.secao, ...METODOS_INSTALACAO],
    linhas: SECOES_TRECHO.map(secao => [
      valor(secao),
      ...METODOS_INSTALACAO.map(metodo =>
        valor(capacidade('COBRE', isolacao, metodo, 2, secao) ?? 0),
      ),
    ]),
    nota: notas.trechoConducao,
  };
}

/** Passo a passo: the column for this circuit, around the chosen section. */
export function conducaoUsada(
  material: MaterialCondutor,
  isolacao: Isolacao,
  metodo: MetodoInstalacao,
  carregados: number,
  secaoEscolhidaMm2: number,
): Tabela {
  const linhas = CONDUCAO_CABOS.filter(
    ([mat, , m, c, , iso]) =>
      mat === material && m === metodo && c === carregados && iso === isolacao,
  );
  const usada = linhas.findIndex(([, s]) => s === secaoEscolhidaMm2);
  const inicio = Math.max(0, usada - 2);
  const trecho = linhas.slice(inicio, usada < 0 ? 0 : usada + 2);
  return comDestaque(
    {
      titulo: isolacao === 'PVC' ? titulos.conducaoPvc : titulos.conducaoEpr,
      colunas: [colunas.secao, `${colunas.capacidade}, ${metodo}`],
      linhas: trecho.map(([, s, , , corrente]) => [valor(s), valor(corrente)]),
    },
    usada - inicio,
  );
}

const CORRENTES = [...new Set(DISJUNTORES.map(([corrente]) => corrente))];

/** Siemens catalog, one row per rated current and one column per number of poles. */
export function tabelaDisjuntores(correnteEscolhidaA?: number): Tabela {
  const tabela: Tabela = {
    titulo: titulos.disjuntores,
    colunas: [
      colunas.correnteNominal,
      colunas.polos(1),
      colunas.polos(2),
      colunas.polos(3),
    ],
    linhas: CORRENTES.map(corrente => [
      String(corrente),
      ...[1, 2, 3].map(
        polos =>
          DISJUNTORES.find(([c, p]) => c === corrente && p === polos)?.[2] ??
          '-',
      ),
    ]),
  };
  return correnteEscolhidaA === undefined
    ? tabela
    : comDestaque(tabela, CORRENTES.indexOf(correnteEscolhidaA));
}

/** Kanalex catalog (2025), whole. */
export function tabelaEletrodutos(polegadasEscolhidas?: string): Tabela {
  const tabela: Tabela = {
    titulo: titulos.eletrodutos,
    colunas: [
      colunas.polegadas,
      colunas.nominal,
      colunas.externo,
      colunas.interno,
    ],
    linhas: ELETRODUTOS.map(([polegadas, nominal, externo, interno]) => [
      formatarPolegadas(polegadas),
      String(nominal),
      formatarNumero(externo, 1),
      formatarNumero(interno, 1),
    ]),
  };
  return polegadasEscolhidas === undefined
    ? tabela
    : comDestaque(
        tabela,
        ELETRODUTOS.findIndex(([p]) => p === polegadasEscolhidas),
      );
}
