import { resultado as textos } from '../../../content/cabeamento';
import type { EletrodutoSugerido } from '../../../domain/dimensionamento/sugestoes';
import { formatarNumero } from '../../format/formatarNumero';
import { ResultCard } from '../../ui';
import { imagensResultado } from './imagensResultado';

export function EletrodutoSugeridoCard({
  eletroduto,
}: {
  eletroduto: EletrodutoSugerido | null;
}) {
  return (
    <ResultCard
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
