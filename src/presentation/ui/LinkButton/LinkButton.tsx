import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing } from '../../theme';

type Props = {
  label: string;
  onPress: () => void;
};

/** Opens an external reference; the ↗ marks that it leaves the app. */
export function LinkButton({ label, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.label}>{label} ↗</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginVertical: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.xs,
    backgroundColor: colors.headerBackground,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontWeight: 'bold',
    color: colors.textStrong,
  },
});
