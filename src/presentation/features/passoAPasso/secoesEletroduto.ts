import { etapasCalculo as titulos } from '../../../content/etapasCalculo';
import { passoAPasso as textos } from '../../../content/passoAPasso';
import { resultados } from '../../../content/resultados';
import { referencias, teoria } from '../../../content/teoria';
import { passoAPasso as p } from '../../../domain/dimensionamento/formulas/passoAPasso';
import type { MemoriaEletroduto } from '../../../domain/dimensionamento/memoria';
import type { EletrodutoSugerido } from '../../../domain/dimensionamento/sugestoes';
import { formatarPolegadas } from '../../format/formatarPolegadas';
import { formatarNumero as n } from '../../format/formatarNumero';
import type { Bloco, Secao } from '../conteudo/Bloco';
import { tabelas } from '../conteudo/tabelas';
import { formula, linha } from './comum';

const mm = resultados.unidades.milimetro;

export function secoesEletroduto(
  m: MemoriaEletroduto,
  eletroduto: EletrodutoSugerido | null,
): readonly Secao[] {
  const resultado: readonly Bloco[] = eletroduto
    ? [
        linha(
          resultados.eletroduto.diametro,
          `${formatarPolegadas(eletroduto.diametroNominalPolegadas)} (${n(
            eletroduto.diametroNominalMm,
          )} ${mm})`,
        ),
      ]
    : [{ tipo: 'texto', texto: resultados.eletroduto.naoEncontrado }];

  return [
    {
      titulo: textos.dadosInformados,
      blocos: [formula(p.dadosEletroduto(m))],
    },
    {
      titulo: titulos.diametroCondutor,
      valor: `${n(m.diametroCondutorMm)} ${mm}`,
      blocos: [formula(p.diametroCondutor(m))],
    },
    {
      titulo: titulos.diametroEletroduto,
      valor: `${n(m.diametroMinimoEletrodutoMm)} ${mm}`,
      blocos: [formula(p.diametroEletroduto(m))],
    },
    {
      titulo: titulos.eletrodutoRecomendado,
      valor: eletroduto
        ? formatarPolegadas(eletroduto.diametroNominalPolegadas)
        : undefined,
      blocos: [
        {
          tipo: 'texto',
          texto: `${textos.eletroduto.diametroExterno} ${n(
            m.diametroMinimoEletrodutoMm,
          )} ${mm}`,
        },
        {
          tipo: 'tabela',
          ...tabelas.eletrodutos,
          descricao: teoria.tabelas.eletrodutos,
        },
        {
          tipo: 'link',
          rotulo: teoria.fontes.kanaflex,
          url: referencias.kanaflex,
        },
        ...resultado,
      ],
    },
  ];
}
