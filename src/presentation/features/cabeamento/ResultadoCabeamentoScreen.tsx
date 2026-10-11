import { ScrollView, StyleSheet } from 'react-native';

import type { ScreenProps } from '../../navigation/routes';
import { colors, spacing } from '../../theme';
import { CondutorSugeridoCard } from '../resultados/CondutorSugeridoCard';
import { DisjuntorSugeridoCard } from '../resultados/DisjuntorSugeridoCard';
import { EletrodutoSugeridoCard } from '../resultados/EletrodutoSugeridoCard';

export function ResultadoCabeamentoScreen({
  route,
}: ScreenProps<'ResultadoCabeamento'>) {
  const { condutor, disjuntor, eletroduto } = route.params.resultado;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <CondutorSugeridoCard condutor={condutor} />
      <DisjuntorSugeridoCard disjuntor={disjuntor} />
      <EletrodutoSugeridoCard eletroduto={eletroduto} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
});
