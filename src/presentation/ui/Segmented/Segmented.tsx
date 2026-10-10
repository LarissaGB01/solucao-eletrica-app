import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../../theme';

export type SegmentedOption<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel: string;
};

export function Segmented<T extends string>({
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
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            onPress={() => onChange(option.value)}
            style={[
              styles.segment,
              index > 0 && styles.divider,
              selected && styles.selected,
            ]}
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
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: spacing.sm,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.background,
  },
  divider: {
    borderLeftWidth: 1,
    borderLeftColor: colors.primary,
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
