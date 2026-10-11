import type { Fases } from '../fases';
import {
  type MaterialCondutor,
  QUEDA_TENSAO_MAXIMA,
  RESISTIVIDADE,
  TAXA_OCUPACAO_ELETRODUTO,
} from '../nbr5410/constantes';
import type { FinalidadeCircuito } from '../cabeamento/enums';
import { SIMBOLOS as S, UNIDADES } from './simbolos';

// Symbolic formulas, as computed by the original backend (not as drawn by the old app,
// which showed P·FP for the apparent power).

const trifasico = (fases: Fases) => fases === 'TRIFASICO';
/** pt-BR decimal comma; the braces stop KaTeX from adding list spacing after it. */
export const decimalLatex = (valor: number) =>
  String(valor).replace('.', '{,}');

export const formulasTeoria = {
  potenciaAparente: () =>
    `${S.potenciaAparente} = \\frac{${S.potenciaAtiva}}{${S.fatorPotencia}}`,

  correnteCircuito: (fases: Fases) =>
    trifasico(fases)
      ? `${S.correnteCircuito} = \\frac{${S.potenciaAparente}}{\\sqrt{3} \\cdot ${S.tensao}}`
      : `${S.correnteCircuito} = \\frac{${S.potenciaAparente}}{${S.tensao}}`,

  fatorAgrupamento: () =>
    `${S.fatorAgrupamento} = \\frac{1}{\\sqrt{${S.quantidadeCircuitos}}}`,

  correnteProjeto: () =>
    `${S.correnteProjeto} = \\frac{${S.correnteCircuito}}{${S.fatorAgrupamento} \\cdot ${S.fatorTemperatura}}`,

  resistividade: (material: MaterialCondutor) =>
    `${S.resistividade} = ${decimalLatex(RESISTIVIDADE[material])} \\, ${
      UNIDADES.resistividade
    }`,

  quedaTensao: (finalidade: FinalidadeCircuito) =>
    `${S.quedaTensao} = ${QUEDA_TENSAO_MAXIMA[finalidade]} \\%`,

  secaoCondutor: (fases: Fases) =>
    `${S.secaoCondutor} = \\frac{${
      trifasico(fases) ? '100 \\cdot \\sqrt{3}' : '200'
    } \\cdot ${S.resistividade} \\cdot ${S.comprimento} \\cdot ${
      S.correnteProjeto
    }}{${S.quedaTensao} \\cdot ${S.tensao}}`,

  coordenacaoDisjuntor: () =>
    `${S.correnteProjeto} \\leq ${S.correnteNominal} \\leq ${S.correnteMaximaCondutor}`,

  diametroCondutor: () =>
    `${S.diametroCondutor} = \\sqrt{\\frac{4 \\cdot ${S.secaoNominal}}{\\pi}}`,

  diametroEletroduto: () =>
    `${S.diametroEletroduto} \\geq \\frac{100 \\cdot ${S.diametroCondutor} \\cdot ${S.quantidadeCondutores}}{${TAXA_OCUPACAO_ELETRODUTO}}`,
} as const;
