import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { colors, spacing } from '../../theme';

export function ResultadoLayout({ children }: { children: ReactNode }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {children}
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
