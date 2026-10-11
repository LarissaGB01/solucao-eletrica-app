import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '../../theme';
import { Button } from '../Button/Button';

export type ResultLine = { label: string; value: string };

type Props = {
  title: string;
  image: ImageSourcePropType;
  /** The first line is the main answer and is shown large. `null` shows `emptyMessage`. */
  lines: readonly ResultLine[] | null;
  emptyMessage?: string;
  footnote?: string;
  /** Optional button under the card, e.g. "Ver cálculos". */
  action?: { label: string; onPress: () => void };
};

/** Answer card: the main value first, a small illustration, secondary values below. */
export function ResultCard({
  title,
  image,
  lines,
  emptyMessage,
  footnote,
  action,
}: Props) {
  const [principal, ...demais] = lines ?? [];

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <View style={styles.body}>
          {lines === null || principal === undefined ? (
            <Text style={styles.empty}>{emptyMessage}</Text>
          ) : (
            <>
              <Text style={styles.label}>{principal.label}</Text>
              <Text style={styles.mainValue}>{principal.value}</Text>
              {demais.map(line => (
                <View key={line.label} style={styles.line}>
                  <Text style={styles.label}>{line.label}</Text>
                  <Text style={styles.value}>{line.value}</Text>
                </View>
              ))}
              {footnote !== undefined && (
                <Text style={styles.footnote}>{footnote}</Text>
              )}
            </>
          )}
        </View>
      </View>
      {action !== undefined && (
        <View style={styles.action}>
          <Button
            label={action.label}
            variant="secondary"
            onPress={action.onPress}
          />
        </View>
      )}
    </View>
  );
}

const IMAGE_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
  },
  title: {
    ...typography.label,
    fontSize: 18,
    color: colors.textStrong,
    marginBottom: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    gap: spacing.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: spacing.sm,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: colors.textMuted,
  },
  mainValue: {
    ...typography.title,
    color: colors.primaryDark,
  },
  line: {
    marginTop: spacing.sm,
  },
  value: {
    ...typography.label,
    color: colors.textStrong,
  },
  footnote: {
    marginTop: spacing.sm,
    color: colors.textMuted,
  },
  empty: {
    ...typography.body,
    color: colors.textStrong,
  },
  action: {
    marginTop: spacing.sm,
  },
});
