import { resultados as textos } from '../../../content/resultados';
import type { EletrodutoSugerido } from '../../../domain/dimensionamento/sugestoes';
import { formatarNumero } from '../../format/formatarNumero';
import { ResultCard } from '../../ui';
import { imagensResultado } from './imagensResultado';

export function EletrodutoSugeridoCard({
  eletroduto,
  onVerCalculos,
}: {
  eletroduto: EletrodutoSugerido | null;
  onVerCalculos: () => void;
}) {
  return (
    <ResultCard
      action={{ label: textos.acoes.verCalculos, onPress: onVerCalculos }}
      title={textos.eletroduto.titulo}
      image={imagensResultado.eletroduto}
      emptyMessage={textos.eletroduto.naoEncontrado}
      lines={
        eletroduto && [
          {
            label: textos.eletroduto.diametro,
            value: `${eletroduto.diametroNominalPolegadas} (${formatarNumero(
              eletroduto.diametroNominalMm,
            )} ${textos.unidades.milimetro})`,
          },
        ]
      }
    />
  );
}
