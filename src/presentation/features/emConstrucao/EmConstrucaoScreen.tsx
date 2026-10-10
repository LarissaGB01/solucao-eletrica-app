import { StyleSheet, Text, View } from 'react-native';

import { emConstrucao } from '../../../content/navegacao';
import { colors, spacing, typography } from '../../theme';

/** Temporary target for routes whose screens land in later phases. */
export function EmConstrucaoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{emConstrucao.titulo}</Text>
      <Text style={styles.description}>{emConstrucao.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.subtitle,
    color: colors.primary,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
