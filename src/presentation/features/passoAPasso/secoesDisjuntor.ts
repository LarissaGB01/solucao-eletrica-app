import { etapasCalculo as titulos } from '../../../content/etapasCalculo';
import { passoAPasso as textos } from '../../../content/passoAPasso';
import { resultados } from '../../../content/resultados';
import { referencias, teoria } from '../../../content/teoria';
import { passoAPasso as p } from '../../../domain/dimensionamento/formulas/passoAPasso';
import type { MemoriaDisjuntor } from '../../../domain/dimensionamento/memoria';
import { CONDUTORES_CARREGADOS } from '../../../domain/dimensionamento/nbr5410/constantes';
import type { DisjuntorSugerido } from '../../../domain/dimensionamento/sugestoes';
import { formatarNumero as n } from '../../format/formatarNumero';
import type { Bloco, Secao } from '../conteudo/Bloco';
import { tabelas } from '../conteudo/tabelas';
import { formula, linha, rotuloFases, titulo } from './comum';

const { unidades } = resultados;

export function secoesDisjuntor(
  m: MemoriaDisjuntor,
  disjuntor: DisjuntorSugerido | null,
): readonly Secao[] {
  const resultado: readonly Bloco[] = disjuntor
    ? [
        linha(resultados.disjuntor.nome, disjuntor.nome),
        linha(
          resultados.disjuntor.corrente,
          `${n(disjuntor.correnteNominalA)} ${unidades.corrente}`,
        ),
      ]
    : [{ tipo: 'texto', texto: resultados.disjuntor.naoEncontrado }];

  return [
    {
      titulo: textos.dadosInformados,
      blocos: [
        formula(p.dadosDisjuntor(m)),
        linha(textos.rotulos.sistema, rotuloFases(m.fases)),
      ],
    },
    {
      titulo: titulos.correnteDisjuntor,
      blocos: [formula(p.coordenacaoDisjuntor(m))],
    },
    {
      titulo: disjuntor
        ? titulo(
            titulos.disjuntorRecomendado,
            `${n(disjuntor.correnteNominalA)} ${unidades.corrente}`,
          )
        : titulos.disjuntorRecomendado,
      blocos: [
        { tipo: 'texto', texto: textos.disjuntor.curva },
        {
          tipo: 'texto',
          texto: textos.disjuntor.polos[CONDUTORES_CARREGADOS[m.fases]],
        },
        {
          tipo: 'tabela',
          ...tabelas.disjuntores,
          descricao: teoria.tabelas.disjuntores,
        },
        {
          tipo: 'link',
          rotulo: teoria.fontes.siemens,
          url: referencias.siemens,
        },
        ...resultado,
      ],
    },
  ];
}
