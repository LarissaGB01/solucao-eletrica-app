import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, spacing, typography } from '../../theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  unit?: string;
  error?: string;
  maxLength?: number;
};

/** Numeric text field. Keeps the raw text; parse it with parseDecimal (accepts "," decimals). */
export function NumericInput({
  label,
  value,
  onChangeText,
  unit,
  error,
  maxLength,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          accessibilityLabel={unit ? `${label} (${unit})` : label}
          accessibilityHint={error}
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          maxLength={maxLength}
          style={[styles.input, error !== undefined && styles.inputError]}
        />
        {unit !== undefined && <Text style={styles.unit}>{unit}</Text>}
      </View>
      {error !== undefined && (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  label: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.textStrong,
  },
  input: {
    ...typography.body,
    width: 100,
    marginHorizontal: spacing.lg,
    padding: spacing.xs,
    textAlign: 'center',
    color: colors.textStrong,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  inputError: {
    borderBottomColor: colors.error,
  },
  unit: {
    ...typography.body,
    color: colors.text,
  },
  error: {
    marginTop: spacing.xs,
    color: colors.error,
    textAlign: 'center',
  },
});
