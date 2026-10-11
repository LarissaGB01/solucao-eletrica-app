import type { ScreenProps } from '../../navigation/routes';
import { DisjuntorSugeridoCard } from '../resultados/DisjuntorSugeridoCard';
import { ResultadoLayout } from '../resultados/ResultadoLayout';

export function ResultadoDisjuntorScreen({
  navigation,
  route,
}: ScreenProps<'ResultadoDisjuntor'>) {
  const { disjuntor, memoria } = route.params.resultado;

  return (
    <ResultadoLayout formulario="FormDisjuntor" navigation={navigation}>
      <DisjuntorSugeridoCard
        disjuntor={disjuntor}
        onVerCalculos={() =>
          navigation.navigate('PassoAPassoDisjuntor', { memoria, disjuntor })
        }
      />
    </ResultadoLayout>
  );
}
