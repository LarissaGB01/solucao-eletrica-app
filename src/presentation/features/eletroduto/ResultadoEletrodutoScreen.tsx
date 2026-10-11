import type { ScreenProps } from '../../navigation/routes';
import { EletrodutoSugeridoCard } from '../resultados/EletrodutoSugeridoCard';
import { ResultadoLayout } from '../resultados/ResultadoLayout';

export function ResultadoEletrodutoScreen({
  navigation,
  route,
}: ScreenProps<'ResultadoEletroduto'>) {
  return (
    <ResultadoLayout formulario="FormEletroduto" navigation={navigation}>
      <EletrodutoSugeridoCard eletroduto={route.params.resultado.eletroduto} />
    </ResultadoLayout>
  );
}
