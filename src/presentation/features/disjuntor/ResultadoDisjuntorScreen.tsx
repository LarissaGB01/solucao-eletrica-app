import type { ScreenProps } from '../../navigation/routes';
import { DisjuntorSugeridoCard } from '../resultados/DisjuntorSugeridoCard';
import { ResultadoLayout } from '../resultados/ResultadoLayout';

export function ResultadoDisjuntorScreen({
  route,
}: ScreenProps<'ResultadoDisjuntor'>) {
  return (
    <ResultadoLayout>
      <DisjuntorSugeridoCard disjuntor={route.params.resultado.disjuntor} />
    </ResultadoLayout>
  );
}
