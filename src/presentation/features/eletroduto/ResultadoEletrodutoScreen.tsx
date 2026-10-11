import type { ScreenProps } from '../../navigation/routes';
import { EletrodutoSugeridoCard } from '../resultados/EletrodutoSugeridoCard';
import { ResultadoLayout } from '../resultados/ResultadoLayout';

export function ResultadoEletrodutoScreen({
  navigation,
  route,
}: ScreenProps<'ResultadoEletroduto'>) {
  const { eletroduto, memoria } = route.params.resultado;

  return (
    <ResultadoLayout formulario="FormEletroduto" navigation={navigation}>
      <EletrodutoSugeridoCard
        eletroduto={eletroduto}
        onVerCalculos={() =>
          navigation.navigate('PassoAPassoEletroduto', { memoria, eletroduto })
        }
      />
    </ResultadoLayout>
  );
}
