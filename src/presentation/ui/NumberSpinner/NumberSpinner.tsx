import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../theme';

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** − value + control for small bounded integers. Replaces react-native-input-spinner. */
export function NumberSpinner({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: Props) {
  const change = (delta: number) => onChange(clamp(value + delta, min, max));
  const display = unit ? `${value} ${unit}` : String(value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={styles.row}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ min, max, now: value, text: display }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={event =>
          change(event.nativeEvent.actionName === 'increment' ? step : -step)
        }
      >
        <Pressable
          testID={`${label}-diminuir`}
          disabled={value <= min}
          onPress={() => change(-step)}
          style={[styles.button, value <= min && styles.buttonDisabled]}
        >
          <Text style={styles.buttonLabel}>−</Text>
        </Pressable>
        <Text style={styles.value}>{display}</Text>
        <Pressable
          testID={`${label}-aumentar`}
          disabled={value >= max}
          onPress={() => change(step)}
          style={[styles.button, value >= max && styles.buttonDisabled]}
        >
          <Text style={styles.buttonLabel}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const BUTTON_SIZE = 44;

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  label: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.textStrong,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  buttonDisabled: {
    backgroundColor: colors.surfaceMuted,
  },
  buttonLabel: {
    color: colors.textInverse,
    fontSize: 24,
    fontWeight: 'bold',
  },
  value: {
    ...typography.body,
    minWidth: 100,
    textAlign: 'center',
    color: colors.textStrong,
  },
});
