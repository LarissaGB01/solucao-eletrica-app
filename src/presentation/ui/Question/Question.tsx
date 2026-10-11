import { StyleSheet, Text } from 'react-native';

import { colors, spacing, typography } from '../../theme';

/** Bold prompt above a form control. */
export function Question({ children }: { children: string }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.textStrong,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
});
