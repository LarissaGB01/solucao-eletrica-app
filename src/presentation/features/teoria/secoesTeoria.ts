import { etapasCalculo as titulos } from '../../../content/etapasCalculo';
import { referencias, teoria as textos } from '../../../content/teoria';
import { formulasTeoria as f } from '../../../domain/dimensionamento/formulas/teoria';
import { SECAO_MINIMA } from '../../../domain/dimensionamento/nbr5410/constantes';
import { formatarNumero } from '../../format/formatarNumero';
import type { Bloco, Secao } from '../conteudo/Bloco';

// Image proportions (width / height) of the files in assets/images/tabelas.
const tabelas = {
  fatorTemperatura: {
    imagem: require('../../assets/images/tabelas/fatorTemperatura.png'),
    proporcao: 387 / 494,
  },
  conducaoPvc: {
    imagem: require('../../assets/images/tabelas/conducaoPvc.png'),
    proporcao: 302 / 416,
  },
  conducaoEpr: {
    imagem: require('../../assets/images/tabelas/conducaoEpr.png'),
    proporcao: 299 / 416,
  },
  disjuntores: {
    imagem: require('../../assets/images/tabelas/disjuntoresSiemens.png'),
    proporcao: 624 / 266,
  },
  eletrodutos: {
    imagem: require('../../assets/images/tabelas/eletrodutosKanaflex.jpg'),
    proporcao: 595 / 354,
  },
};

const linkNbr: Bloco = {
  tipo: 'link',
  rotulo: textos.fontes.nbr5410,
  url: referencias.nbr5410,
};

const secaoMinima = (utilizacao: 'TOMADA' | 'ILUMINACAO'): Bloco => ({
  tipo: 'texto',
  texto: textos.secaoMinima(
    textos.utilizacoes[utilizacao],
    formatarNumero(SECAO_MINIMA[utilizacao], 1),
  ),
});

export const secoesTeoria: readonly Secao[] = [
  {
    titulo: titulos.potenciaAparente,
    blocos: [{ tipo: 'formula', latex: f.potenciaAparente() }],
  },
  {
    titulo: titulos.correnteCircuito,
    blocos: [
      {
        tipo: 'formula',
        legenda: textos.legendas.trifasico,
        latex: f.correnteCircuito('TRIFASICO'),
      },
      {
        tipo: 'formula',
        legenda: textos.legendas.naoTrifasico,
        latex: f.correnteCircuito('MONOFASICO'),
      },
    ],
  },
  {
    titulo: titulos.fatorAgrupamento,
    blocos: [{ tipo: 'formula', latex: f.fatorAgrupamento() }],
  },
  {
    titulo: titulos.fatorTemperatura,
    blocos: [
      {
        tipo: 'tabela',
        ...tabelas.fatorTemperatura,
        descricao: textos.tabelas.fatorTemperatura,
      },
      linkNbr,
    ],
  },
  {
    titulo: titulos.correnteProjeto,
    blocos: [{ tipo: 'formula', latex: f.correnteProjeto() }],
  },
  {
    titulo: titulos.resistividade,
    blocos: [
      {
        tipo: 'formula',
        legenda: textos.legendas.aluminio,
        latex: f.resistividade('ALUMINIO'),
      },
      {
        tipo: 'formula',
        legenda: textos.legendas.cobre,
        latex: f.resistividade('COBRE'),
      },
    ],
  },
  {
    titulo: titulos.quedaTensao,
    blocos: [
      {
        tipo: 'formula',
        legenda: textos.legendas.distribuicao,
        latex: f.quedaTensao('DISTRIBUICAO'),
      },
      {
        tipo: 'formula',
        legenda: textos.legendas.terminal,
        latex: f.quedaTensao('TERMINAL'),
      },
    ],
  },
  {
    titulo: titulos.secaoCondutor,
    blocos: [
      {
        tipo: 'formula',
        legenda: textos.legendas.trifasico,
        latex: f.secaoCondutor('TRIFASICO'),
      },
      {
        tipo: 'formula',
        legenda: textos.legendas.naoTrifasico,
        latex: f.secaoCondutor('MONOFASICO'),
      },
      secaoMinima('TOMADA'),
      secaoMinima('ILUMINACAO'),
    ],
  },
  {
    titulo: titulos.condutorRecomendado,
    blocos: [
      {
        tipo: 'tabela',
        ...tabelas.conducaoPvc,
        descricao: textos.tabelas.conducaoPvc,
      },
      {
        tipo: 'tabela',
        ...tabelas.conducaoEpr,
        descricao: textos.tabelas.conducaoEpr,
      },
      linkNbr,
    ],
  },
  {
    titulo: titulos.correnteDisjuntor,
    blocos: [{ tipo: 'formula', latex: f.coordenacaoDisjuntor() }],
  },
  {
    titulo: titulos.disjuntorRecomendado,
    blocos: [
      {
        tipo: 'tabela',
        ...tabelas.disjuntores,
        descricao: textos.tabelas.disjuntores,
      },
      { tipo: 'link', rotulo: textos.fontes.siemens, url: referencias.siemens },
    ],
  },
  {
    titulo: titulos.diametroCondutor,
    blocos: [{ tipo: 'formula', latex: f.diametroCondutor() }],
  },
  {
    titulo: titulos.diametroEletroduto,
    blocos: [{ tipo: 'formula', latex: f.diametroEletroduto() }],
  },
  {
    titulo: titulos.eletrodutoRecomendado,
    blocos: [
      {
        tipo: 'tabela',
        ...tabelas.eletrodutos,
        descricao: textos.tabelas.eletrodutos,
      },
      {
        tipo: 'link',
        rotulo: textos.fontes.kanaflex,
        url: referencias.kanaflex,
      },
    ],
  },
];
