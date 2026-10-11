import { resultados as textos } from '../../../content/resultados';
import type { CondutorSugerido } from '../../../domain/dimensionamento/sugestoes';
import { formatarNumero } from '../../format/formatarNumero';
import { ResultCard } from '../../ui';
import { imagensResultado } from './imagensResultado';

export function CondutorSugeridoCard({
  condutor,
  onVerCalculos,
}: {
  condutor: CondutorSugerido;
  onVerCalculos: () => void;
}) {
  return (
    <ResultCard
      action={{ label: textos.acoes.verCalculos, onPress: onVerCalculos }}
      title={textos.condutor.titulo}
      image={imagensResultado.condutor}
      lines={[
        {
          label: textos.condutor.secao,
          value: `${formatarNumero(condutor.secaoNominalMm2)} ${
            textos.unidades.secao
          }`,
        },
        {
          label: textos.condutor.corrente,
          value: `${formatarNumero(condutor.correnteMaximaA)} ${
            textos.unidades.corrente
          }`,
        },
      ]}
    />
  );
}
