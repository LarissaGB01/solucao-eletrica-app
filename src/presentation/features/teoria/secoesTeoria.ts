import { etapasCalculo as titulos } from '../../../content/etapasCalculo';
import { referencias, teoria as textos } from '../../../content/teoria';
import { formulasTeoria as f } from '../../../domain/dimensionamento/formulas/teoria';
import { SECAO_MINIMA } from '../../../domain/dimensionamento/nbr5410/constantes';
import { formatarNumero } from '../../format/formatarNumero';
import type { Bloco, Secao } from '../conteudo/Bloco';
import { onde } from '../conteudo/onde';
import {
  tabelaDisjuntores,
  tabelaEletrodutos,
  trechoConducao,
  trechoFatorTemperatura,
} from '../conteudo/tabelas';

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
    blocos: [
      {
        tipo: 'formula',
        expressoes: [f.potenciaAparente()],
        onde: onde('potenciaAparente', 'potenciaAtiva', 'fatorPotencia'),
      },
    ],
  },
  {
    titulo: titulos.correnteCircuito,
    blocos: [
      {
        tipo: 'formula',
        legenda: textos.legendas.trifasico,
        expressoes: [f.correnteCircuito('TRIFASICO')],
      },
      {
        tipo: 'formula',
        legenda: textos.legendas.naoTrifasico,
        expressoes: [f.correnteCircuito('MONOFASICO')],
        onde: onde('correnteCircuito', 'potenciaAparente', 'tensao'),
      },
    ],
  },
  {
    titulo: titulos.fatorAgrupamento,
    blocos: [
      {
        tipo: 'formula',
        expressoes: [f.fatorAgrupamento()],
        onde: onde('fatorAgrupamento', 'quantidadeCircuitos'),
      },
    ],
  },
  {
    titulo: titulos.fatorTemperatura,
    blocos: [{ tipo: 'tabela', tabela: trechoFatorTemperatura() }, linkNbr],
  },
  {
    titulo: titulos.correnteProjeto,
    blocos: [
      {
        tipo: 'formula',
        expressoes: [f.correnteProjeto()],
        onde: onde(
          'correnteProjeto',
          'correnteCircuito',
          'fatorAgrupamento',
          'fatorTemperatura',
        ),
      },
    ],
  },
  {
    titulo: titulos.resistividade,
    blocos: [
      {
        tipo: 'formula',
        legenda: textos.legendas.aluminio,
        expressoes: [f.resistividade('ALUMINIO')],
      },
      {
        tipo: 'formula',
        legenda: textos.legendas.cobre,
        expressoes: [f.resistividade('COBRE')],
        onde: onde('resistividade'),
      },
    ],
  },
  {
    titulo: titulos.quedaTensao,
    blocos: [
      {
        tipo: 'formula',
        legenda: textos.legendas.distribuicao,
        expressoes: [f.quedaTensao('DISTRIBUICAO')],
      },
      {
        tipo: 'formula',
        legenda: textos.legendas.terminal,
        expressoes: [f.quedaTensao('TERMINAL')],
        onde: onde('quedaTensao'),
      },
    ],
  },
  {
    titulo: titulos.secaoCondutor,
    blocos: [
      {
        tipo: 'formula',
        legenda: textos.legendas.trifasico,
        expressoes: [f.secaoCondutor('TRIFASICO')],
      },
      {
        tipo: 'formula',
        legenda: textos.legendas.naoTrifasico,
        expressoes: [f.secaoCondutor('MONOFASICO')],
        onde: onde(
          'secaoCondutor',
          'resistividade',
          'comprimento',
          'correnteProjeto',
          'quedaTensao',
          'tensao',
        ),
      },
      secaoMinima('TOMADA'),
      secaoMinima('ILUMINACAO'),
    ],
  },
  {
    titulo: titulos.condutorRecomendado,
    blocos: [
      { tipo: 'tabela', tabela: trechoConducao('PVC') },
      { tipo: 'tabela', tabela: trechoConducao('EPR') },
      linkNbr,
    ],
  },
  {
    titulo: titulos.correnteDisjuntor,
    blocos: [
      {
        tipo: 'formula',
        expressoes: [f.coordenacaoDisjuntor()],
        onde: onde(
          'correnteProjeto',
          'correnteNominal',
          'correnteMaximaCondutor',
        ),
      },
    ],
  },
  {
    titulo: titulos.disjuntorRecomendado,
    blocos: [
      { tipo: 'tabela', tabela: tabelaDisjuntores() },
      { tipo: 'link', rotulo: textos.fontes.siemens, url: referencias.siemens },
    ],
  },
  {
    titulo: titulos.diametroCondutor,
    blocos: [
      {
        tipo: 'formula',
        expressoes: [f.diametroCondutor()],
        onde: onde('diametroCondutor', 'secaoNominal'),
      },
    ],
  },
  {
    titulo: titulos.diametroEletroduto,
    blocos: [
      {
        tipo: 'formula',
        expressoes: [f.diametroEletroduto()],
        onde: onde(
          'diametroEletroduto',
          'diametroCondutor',
          'quantidadeCondutores',
        ),
      },
    ],
  },
  {
    titulo: titulos.eletrodutoRecomendado,
    blocos: [
      { tipo: 'tabela', tabela: tabelaEletrodutos() },
      {
        tipo: 'link',
        rotulo: textos.fontes.kanaflex,
        url: referencias.kanaflex,
      },
    ],
  },
];
