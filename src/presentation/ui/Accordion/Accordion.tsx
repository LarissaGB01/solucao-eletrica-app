import { type ReactNode, useState } from 'react';
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, spacing } from '../../theme';

type Props = {
  title: string;
  initiallyExpanded?: boolean;
  children: ReactNode;
};

/** Collapsible section. Children are only mounted while expanded (keeps WebViews cheap). */
export function Accordion({
  title,
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
        accessibilityLabel={title}
        accessibilityState={{ expanded }}
        onPress={toggle}
        style={styles.header}
      >
        <Text style={styles.title}>{title}</Text>
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
    marginVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.xs,
  },
  title: {
    flex: 1,
    color: colors.textInverse,
    padding: spacing.md,
    textAlign: 'center',
  },
  icon: {
    color: colors.textInverse,
    fontSize: 12,
    paddingHorizontal: spacing.sm,
  },
  content: {
    backgroundColor: colors.surfaceMuted,
    padding: spacing.md,
  },
});
