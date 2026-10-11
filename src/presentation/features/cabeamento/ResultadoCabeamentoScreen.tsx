import type { ScreenProps } from '../../navigation/routes';
import { CondutorSugeridoCard } from '../resultados/CondutorSugeridoCard';
import { DisjuntorSugeridoCard } from '../resultados/DisjuntorSugeridoCard';
import { EletrodutoSugeridoCard } from '../resultados/EletrodutoSugeridoCard';
import { ResultadoLayout } from '../resultados/ResultadoLayout';

export function ResultadoCabeamentoScreen({
  route,
}: ScreenProps<'ResultadoCabeamento'>) {
  const { condutor, disjuntor, eletroduto } = route.params.resultado;

  return (
    <ResultadoLayout>
      <CondutorSugeridoCard condutor={condutor} />
      <DisjuntorSugeridoCard disjuntor={disjuntor} />
      <EletrodutoSugeridoCard eletroduto={eletroduto} />
    </ResultadoLayout>
  );
}
