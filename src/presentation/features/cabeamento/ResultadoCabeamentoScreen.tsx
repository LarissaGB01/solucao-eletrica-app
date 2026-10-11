import type { ScreenProps } from '../../navigation/routes';
import { CondutorSugeridoCard } from '../resultados/CondutorSugeridoCard';
import { DisjuntorSugeridoCard } from '../resultados/DisjuntorSugeridoCard';
import { EletrodutoSugeridoCard } from '../resultados/EletrodutoSugeridoCard';
import { ResultadoLayout } from '../resultados/ResultadoLayout';

export function ResultadoCabeamentoScreen({
  navigation,
  route,
}: ScreenProps<'ResultadoCabeamento'>) {
  const { condutor, disjuntor, eletroduto, memoria } = route.params.resultado;

  return (
    <ResultadoLayout formulario="FormCabeamento" navigation={navigation}>
      <CondutorSugeridoCard
        condutor={condutor}
        onVerCalculos={() =>
          navigation.navigate('PassoAPassoCondutor', {
            memoria: memoria.condutor,
            condutor,
          })
        }
      />
      <DisjuntorSugeridoCard
        disjuntor={disjuntor}
        onVerCalculos={() =>
          navigation.navigate('PassoAPassoDisjuntor', {
            memoria: memoria.disjuntor,
            disjuntor,
          })
        }
      />
      <EletrodutoSugeridoCard
        eletroduto={eletroduto}
        onVerCalculos={() =>
          navigation.navigate('PassoAPassoEletroduto', {
            memoria: memoria.eletroduto,
            eletroduto,
          })
        }
      />
    </ResultadoLayout>
  );
}
