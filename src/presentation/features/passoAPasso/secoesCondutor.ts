import { formCabeamento } from '../../../content/cabeamento';
import { etapasCalculo as titulos } from '../../../content/etapasCalculo';
import { passoAPasso as textos } from '../../../content/passoAPasso';
import { resultados } from '../../../content/resultados';
import { teoria } from '../../../content/teoria';
import { passoAPasso as p } from '../../../domain/dimensionamento/formulas/passoAPasso';
import {
  type MemoriaCondutor,
  minimoAplicado,
  secaoAdotadaMm2,
} from '../../../domain/dimensionamento/memoria';
import {
  CONDUTORES_CARREGADOS,
  ISOLACAO_POR_TIPO_CABO,
  MATERIAL_POR_TIPO_CABO,
  QUEDA_TENSAO_MAXIMA,
  RESISTIVIDADE,
  SECAO_MINIMA,
} from '../../../domain/dimensionamento/nbr5410/constantes';
import type { CondutorSugerido } from '../../../domain/dimensionamento/sugestoes';
import { formatarNumero as n } from '../../format/formatarNumero';
import type { Secao } from '../conteudo/Bloco';
import { tabelas } from '../conteudo/tabelas';
import { formula, linha, linkNbr, rotuloFases, titulo } from './comum';

const { unidades } = resultados;

export function secoesCondutor(
  m: MemoriaCondutor,
  condutor: CondutorSugerido,
): readonly Secao[] {
  const { dados } = m;
  const material = MATERIAL_POR_TIPO_CABO[dados.tipoCabo];
  const isolacao = ISOLACAO_POR_TIPO_CABO[dados.tipoCabo];
  const finalidade = formCabeamento.finalidade.opcoes[dados.finalidade];

  return [
    {
      titulo: textos.dadosInformados,
      blocos: [
        formula(p.dadosInformados(m)),
        linha(textos.rotulos.sistema, rotuloFases(dados.fases)),
        linha(textos.rotulos.instalacao, dados.metodoInstalacao),
        linha(
          textos.rotulos.cabo,
          formCabeamento.tipoCabo.opcoes[dados.tipoCabo],
        ),
        linha(textos.rotulos.circuito, finalidade),
        linha(
          textos.rotulos.utilizacao,
          formCabeamento.utilizacao.opcoes[dados.utilizacao],
        ),
      ],
    },
    {
      titulo: titulo(titulos.potenciaAparente, `${n(m.potenciaAparenteVA)} VA`),
      blocos: [formula(p.potenciaAparente(m))],
    },
    {
      titulo: titulo(
        titulos.correnteCircuito,
        `${n(m.correnteCircuitoA)} ${unidades.corrente}`,
      ),
      blocos: [formula(p.correnteCircuito(m))],
    },
    {
      titulo: titulo(titulos.fatorAgrupamento, n(m.fatorAgrupamento)),
      blocos: [formula(p.fatorAgrupamento(m))],
    },
    {
      titulo: titulo(titulos.fatorTemperatura, n(m.fatorTemperatura)),
      blocos: [
        linha(textos.rotulos.temperatura, `${dados.temperaturaC} °C`),
        linha(textos.rotulos.isolacao, isolacao),
        formula(p.fatorTemperatura(m)),
        {
          tipo: 'tabela',
          ...tabelas.fatorTemperatura,
          descricao: teoria.tabelas.fatorTemperatura,
        },
        linkNbr,
      ],
    },
    {
      titulo: titulo(
        titulos.correnteProjeto,
        `${n(m.correnteProjetoA)} ${unidades.corrente}`,
      ),
      blocos: [formula(p.correnteProjeto(m))],
    },
    {
      titulo: titulo(
        titulos.resistividade,
        `${n(RESISTIVIDADE[material], 4)} Ω·mm²/m`,
      ),
      blocos: [
        {
          tipo: 'texto',
          texto: textos.resistividade(textos.materiais[material]),
        },
        formula(p.resistividade(m)),
      ],
    },
    {
      titulo: titulo(
        titulos.quedaTensao,
        `${QUEDA_TENSAO_MAXIMA[dados.finalidade]} %`,
      ),
      blocos: [
        { tipo: 'texto', texto: textos.quedaTensao(finalidade.toUpperCase()) },
        formula(p.quedaTensao(m)),
      ],
    },
    {
      titulo: titulo(
        titulos.secaoCondutor,
        `${n(secaoAdotadaMm2(m))} ${unidades.secao}`,
      ),
      blocos: [
        formula(p.secaoCondutor(m)),
        {
          tipo: 'texto',
          texto: teoria.secaoMinima(
            teoria.utilizacoes[dados.utilizacao],
            n(SECAO_MINIMA[dados.utilizacao], 1),
          ),
        },
        ...(minimoAplicado(m)
          ? [{ tipo: 'texto', texto: textos.conclusao } as const]
          : []),
        formula([p.secaoAdotada(m)]),
      ],
    },
    {
      titulo: titulo(
        titulos.condutorRecomendado,
        `${n(condutor.secaoNominalMm2)} ${unidades.secao}`,
      ),
      blocos: [
        linha(textos.condutor.metodo, dados.metodoInstalacao),
        linha(
          textos.condutor.carregados,
          String(CONDUTORES_CARREGADOS[dados.fases]),
        ),
        linha(textos.condutor.material, textos.materiais[material]),
        linha(textos.condutor.isolacao, isolacao),
        {
          tipo: 'texto',
          texto: `${textos.condutor.corrente} ${n(m.correnteProjetoA)} ${
            unidades.corrente
          }`,
        },
        {
          tipo: 'texto',
          texto: `${textos.condutor.secao} ${n(secaoAdotadaMm2(m))} ${
            unidades.secao
          }`,
        },
        isolacao === 'PVC'
          ? {
              tipo: 'tabela',
              ...tabelas.conducaoPvc,
              descricao: teoria.tabelas.conducaoPvc,
            }
          : {
              tipo: 'tabela',
              ...tabelas.conducaoEpr,
              descricao: teoria.tabelas.conducaoEpr,
            },
        linkNbr,
        linha(
          resultados.condutor.secao,
          `${n(condutor.secaoNominalMm2)} ${unidades.secao}`,
        ),
        linha(
          resultados.condutor.corrente,
          `${n(condutor.correnteMaximaA)} ${unidades.corrente}`,
        ),
      ],
    },
  ];
}
