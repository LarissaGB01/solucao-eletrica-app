import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '../../theme';
import { Button } from '../Button/Button';

export type ResultLine = { label: string; value: string };

type Props = {
  title: string;
  image: ImageSourcePropType;
  /** Shown when present; otherwise `emptyMessage` is shown. */
  lines: readonly ResultLine[] | null;
  emptyMessage?: string;
  footnote?: string;
  /** Optional button under the card, e.g. "Ver cálculos". */
  action?: { label: string; onPress: () => void };
};

/** Orange-bordered card with an illustration and label/value pairs, as in the original result screen. */
export function ResultCard({
  title,
  image,
  lines,
  emptyMessage,
  footnote,
  action,
}: Props) {
  const { width } = useWindowDimensions();
  const imageSize = (width - spacing.xl * 2) / 2 - spacing.md * 2;

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <View style={styles.card}>
        <Image
          source={image}
          style={[styles.image, { width: imageSize, height: imageSize }]}
        />
        <View style={styles.body}>
          {lines === null ? (
            <Text style={styles.value}>{emptyMessage}</Text>
          ) : (
            lines.map(line => (
              <View key={line.label} style={styles.line}>
                <Text style={styles.label}>{line.label}</Text>
                <Text style={styles.value}>{line.value}</Text>
              </View>
            ))
          )}
          {lines !== null && footnote !== undefined && (
            <Text style={styles.footnote}>{footnote}</Text>
          )}
        </View>
      </View>
      {action !== undefined && (
        <View style={styles.action}>
          <Button label={action.label} onPress={action.onPress} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    marginTop: spacing.sm,
  },
  container: {
    marginTop: spacing.xl,
  },
  title: {
    ...typography.subtitle,
    color: colors.border,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  image: {
    borderRadius: spacing.xs,
  },
  body: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
    gap: spacing.md,
  },
  line: {
    alignItems: 'center',
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
    textAlign: 'center',
  },
  value: {
    ...typography.label,
    color: colors.border,
    textAlign: 'center',
  },
  footnote: {
    ...typography.label,
    color: colors.text,
    textAlign: 'center',
  },
});
