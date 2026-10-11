import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  /** Short unit shown inside the field, e.g. "V". */
  unit?: string;
  /** Helper text under the field, e.g. the typical value. Hidden while there is an error. */
  hint?: string;
  error?: string;
  maxLength?: number;
};

/** Numeric text field. Keeps the raw text; parse it with parseDecimal (accepts "," decimals). */
export function NumericInput({
  label,
  value,
  onChangeText,
  unit,
  hint,
  error,
  maxLength,
}: Props) {
  const temErro = error !== undefined;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.field, temErro && styles.fieldError]}>
        <TextInput
          accessibilityLabel={unit ? `${label} (${unit})` : label}
          accessibilityHint={error ?? hint}
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          maxLength={maxLength}
          style={styles.input}
        />
        {unit !== undefined && (
          <Text style={styles.unit} importantForAccessibility="no">
            {unit}
          </Text>
        )}
      </View>
      {temErro ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : (
        hint !== undefined && <Text style={styles.hint}>{hint}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.textStrong,
    marginBottom: spacing.xs,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
  },
  fieldError: {
    borderColor: colors.error,
  },
  input: {
    ...typography.body,
    flex: 1,
    paddingVertical: spacing.sm,
    color: colors.textStrong,
  },
  unit: {
    ...typography.body,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
  hint: {
    marginTop: spacing.xs,
    color: colors.textMuted,
  },
  error: {
    marginTop: spacing.xs,
    color: colors.error,
  },
});
