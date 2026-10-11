import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing } from '../../theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

/** Full-width action button: filled (primary) or outlined (secondary). */
export function Button({ label, onPress, variant = 'primary' }: Props) {
  const secondary = variant === 'secondary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, secondary && styles.labelSecondary]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: spacing.md,
    borderRadius: spacing.xs,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: colors.background,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    color: colors.textInverse,
    fontWeight: 'bold',
    fontSize: 16,
  },
  labelSecondary: {
    color: colors.primary,
  },
});
