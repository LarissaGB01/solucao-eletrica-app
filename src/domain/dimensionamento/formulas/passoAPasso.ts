import {
  type MemoriaCondutor,
  type MemoriaDisjuntor,
  type MemoriaEletroduto,
  secaoAdotadaMm2,
} from '../memoria';
import {
  MATERIAL_POR_TIPO_CABO,
  QUEDA_TENSAO_MAXIMA,
  RESISTIVIDADE,
  TAXA_OCUPACAO_ELETRODUTO,
} from '../nbr5410/constantes';
import { SIMBOLOS as S, UNIDADES as U } from './simbolos';
import { decimalLatex, formulasTeoria } from './teoria';

// Each step: the symbolic formula, the formula with the values, then the result.

/** Computed results always show two decimals, like the original app. */
export const fixoLatex = (valor: number, casas = 2) =>
  valor.toFixed(casas).replace('.', '{,}');

const com = (valor: string, unidade: string) => `${valor} \\, ${unidade}`;

export const passoAPasso = {
  dadosInformados: (m: MemoriaCondutor): readonly string[] => {
    const { dados } = m;
    const carga =
      dados.carga.tipo === 'APARENTE'
        ? [
            `${S.potenciaAparente} = ${com(
              decimalLatex(dados.carga.potenciaVA),
              U.potenciaAparente,
            )}`,
          ]
        : [
            `${S.potenciaAtiva} = ${com(
              decimalLatex(dados.carga.potenciaW),
              U.potenciaAtiva,
            )}`,
            `${S.fatorPotencia} = ${decimalLatex(dados.carga.fatorPotencia)}`,
          ];
    return [
      `${S.comprimento} = ${com(
        decimalLatex(dados.comprimentoM),
        U.comprimento,
      )}`,
      ...carga,
      `${S.quantidadeCircuitos} = ${dados.circuitosAgrupados}`,
      `${S.temperatura} = ${com(
        decimalLatex(dados.temperaturaC),
        U.temperatura,
      )}`,
      `${S.tensao} = ${com(decimalLatex(dados.tensaoV), U.tensao)}`,
    ];
  },

  potenciaAparente: (m: MemoriaCondutor): readonly string[] => {
    const resultado = `${S.potenciaAparente} = ${com(
      fixoLatex(m.potenciaAparenteVA),
      U.potenciaAparente,
    )}`;
    const { carga } = m.dados;
    if (carga.tipo === 'APARENTE') {
      return [resultado];
    }
    return [
      formulasTeoria.potenciaAparente(),
      `${S.potenciaAparente} = \\frac{${decimalLatex(
        carga.potenciaW,
      )}}{${decimalLatex(carga.fatorPotencia)}}`,
      resultado,
    ];
  },

  correnteCircuito: (m: MemoriaCondutor): readonly string[] => {
    const tensao = decimalLatex(m.dados.tensaoV);
    const divisor =
      m.dados.fases === 'TRIFASICO' ? `\\sqrt{3} \\cdot ${tensao}` : tensao;
    return [
      formulasTeoria.correnteCircuito(m.dados.fases),
      `${S.correnteCircuito} = \\frac{${fixoLatex(
        m.potenciaAparenteVA,
      )}}{${divisor}}`,
      `${S.correnteCircuito} = ${com(
        fixoLatex(m.correnteCircuitoA),
        U.corrente,
      )}`,
    ];
  },

  fatorAgrupamento: (m: MemoriaCondutor): readonly string[] => [
    formulasTeoria.fatorAgrupamento(),
    `${S.fatorAgrupamento} = \\frac{1}{\\sqrt{${m.dados.circuitosAgrupados}}}`,
    `${S.fatorAgrupamento} = ${fixoLatex(m.fatorAgrupamento)}`,
  ],

  fatorTemperatura: (m: MemoriaCondutor): readonly string[] => [
    `${S.fatorTemperatura} = ${fixoLatex(m.fatorTemperatura)}`,
  ],

  correnteProjeto: (m: MemoriaCondutor): readonly string[] => [
    formulasTeoria.correnteProjeto(),
    `${S.correnteProjeto} = \\frac{${fixoLatex(
      m.correnteCircuitoA,
    )}}{${fixoLatex(m.fatorAgrupamento)} \\cdot ${fixoLatex(
      m.fatorTemperatura,
    )}}`,
    `${S.correnteProjeto} = ${com(fixoLatex(m.correnteProjetoA), U.corrente)}`,
  ],

  resistividade: (m: MemoriaCondutor): readonly string[] => [
    formulasTeoria.resistividade(MATERIAL_POR_TIPO_CABO[m.dados.tipoCabo]),
  ],

  quedaTensao: (m: MemoriaCondutor): readonly string[] => [
    formulasTeoria.quedaTensao(m.dados.finalidade),
  ],

  secaoCondutor: (m: MemoriaCondutor): readonly string[] => {
    const fator =
      m.dados.fases === 'TRIFASICO' ? '100 \\cdot \\sqrt{3}' : '200';
    const rho = decimalLatex(
      RESISTIVIDADE[MATERIAL_POR_TIPO_CABO[m.dados.tipoCabo]],
    );
    const queda = QUEDA_TENSAO_MAXIMA[m.dados.finalidade];
    return [
      formulasTeoria.secaoCondutor(m.dados.fases),
      `${S.secaoCondutor} = \\frac{${fator} \\cdot ${rho} \\cdot ${decimalLatex(
        m.dados.comprimentoM,
      )} \\cdot ${fixoLatex(
        m.correnteProjetoA,
      )}}{${queda} \\cdot ${decimalLatex(m.dados.tensaoV)}}`,
      `${S.secaoCondutor} = ${com(fixoLatex(m.secaoCalculadaMm2), U.secao)}`,
    ];
  },

  secaoAdotada: (m: MemoriaCondutor): string =>
    `${S.secaoCondutor} = ${com(fixoLatex(secaoAdotadaMm2(m)), U.secao)}`,

  dadosDisjuntor: (m: MemoriaDisjuntor): readonly string[] => [
    `${S.correnteProjeto} = ${com(fixoLatex(m.correnteProjetoA), U.corrente)}`,
    `${S.correnteMaximaCondutor} = ${com(
      fixoLatex(m.correnteMaximaCondutorA),
      U.corrente,
    )}`,
  ],

  coordenacaoDisjuntor: (m: MemoriaDisjuntor): readonly string[] => [
    formulasTeoria.coordenacaoDisjuntor(),
    `${fixoLatex(m.correnteProjetoA)} \\leq ${
      S.correnteNominal
    } \\leq ${fixoLatex(m.correnteMaximaCondutorA)}`,
  ],

  dadosEletroduto: (m: MemoriaEletroduto): readonly string[] => [
    `${S.secaoNominal} = ${com(decimalLatex(m.secaoNominalMm2), U.secao)}`,
    `${S.quantidadeCondutores} = ${m.quantidadeCondutores}`,
  ],

  diametroCondutor: (m: MemoriaEletroduto): readonly string[] => [
    formulasTeoria.diametroCondutor(),
    `${S.diametroCondutor} = \\sqrt{\\frac{4 \\cdot ${decimalLatex(
      m.secaoNominalMm2,
    )}}{\\pi}}`,
    `${S.diametroCondutor} = ${com(
      fixoLatex(m.diametroCondutorMm),
      U.milimetro,
    )}`,
  ],

  diametroEletroduto: (m: MemoriaEletroduto): readonly string[] => [
    formulasTeoria.diametroEletroduto(),
    `${S.diametroEletroduto} \\geq \\frac{100 \\cdot ${fixoLatex(
      m.diametroCondutorMm,
    )} \\cdot ${m.quantidadeCondutores}}{${TAXA_OCUPACAO_ELETRODUTO}}`,
    `${S.diametroEletroduto} \\geq ${com(
      fixoLatex(m.diametroMinimoEletrodutoMm),
      U.milimetro,
    )}`,
  ],
} as const;
