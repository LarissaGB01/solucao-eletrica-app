import { resultados as textos } from '../../../content/resultados';
import type { DisjuntorSugerido } from '../../../domain/dimensionamento/sugestoes';
import { formatarNumero } from '../../format/formatarNumero';
import { ResultCard } from '../../ui';
import { imagensResultado } from './imagensResultado';

export function DisjuntorSugeridoCard({
  disjuntor,
}: {
  disjuntor: DisjuntorSugerido | null;
}) {
  return (
    <ResultCard
      title={textos.disjuntor.titulo}
      image={imagensResultado.disjuntor}
      emptyMessage={textos.disjuntor.naoEncontrado}
      footnote={textos.disjuntor.marca}
      lines={
        disjuntor && [
          { label: textos.disjuntor.nome, value: disjuntor.nome },
          {
            label: textos.disjuntor.corrente,
            value: `${formatarNumero(disjuntor.correnteNominalA)} ${
              textos.unidades.corrente
            }`,
          },
        ]
      }
    />
  );
}
