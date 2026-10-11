import { type ReactNode, useState } from 'react';
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '../../theme';

type Props = {
  title: string;
  /** Result of the section, shown on the right of the header (e.g. "17,32 A"). */
  value?: string;
  initiallyExpanded?: boolean;
  children: ReactNode;
};

/** Collapsible section. Children are only mounted while expanded (keeps WebViews cheap). */
export function Accordion({
  title,
  value,
  initiallyExpanded = false,
  children,
}: Props) {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(current => !current);
  };

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={value === undefined ? title : `${title} = ${value}`}
        accessibilityState={{ expanded }}
        onPress={toggle}
        style={styles.header}
      >
        <Text style={styles.title}>{title}</Text>
        {value !== undefined && <Text style={styles.value}>{value}</Text>}
        <Text style={styles.icon} importantForAccessibility="no">
          {expanded ? '▲' : '▼'}
        </Text>
      </Pressable>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  title: {
    ...typography.label,
    flex: 1,
    color: colors.textStrong,
  },
  value: {
    ...typography.label,
    color: colors.primaryDark,
  },
  icon: {
    color: colors.primary,
    fontSize: 12,
  },
  content: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    backgroundColor: colors.surface,
  },
});
