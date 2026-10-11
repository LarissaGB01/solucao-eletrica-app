import type { ScreenProps } from '../../navigation/routes';
import { EletrodutoSugeridoCard } from '../resultados/EletrodutoSugeridoCard';
import { ResultadoLayout } from '../resultados/ResultadoLayout';

export function ResultadoEletrodutoScreen({
  route,
}: ScreenProps<'ResultadoEletroduto'>) {
  return (
    <ResultadoLayout>
      <EletrodutoSugeridoCard eletroduto={route.params.resultado.eletroduto} />
    </ResultadoLayout>
  );
}
