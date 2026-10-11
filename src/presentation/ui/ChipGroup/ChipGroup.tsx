import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../../theme';
import type { SegmentedOption } from '../Segmented/Segmented';

type Props<T extends string> = {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel: string;
};

/** Single choice among options that wrap onto several lines. Use Segmented for 2–3 short options. */
export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: Props<T>) {
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={styles.container}
    >
      {options.map(option => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            onPress={() => onChange(option.value)}
            style={[styles.chip, selected && styles.selected]}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  chip: {
    minWidth: 64,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.xl,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  label: {
    color: colors.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  labelSelected: {
    color: colors.textInverse,
  },
});
