import {
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import { colors, radius, spacing, typography } from '../../theme';

type Props = {
  label: string;
  image: ImageSourcePropType;
  width: number;
  onPress: () => void;
};

export function OptionCard({ label, image, width, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label.replace('\n', ' ')}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { width },
        pressed && styles.pressed,
      ]}
    >
      <Image
        source={image}
        style={[styles.image, { width: width - 2, height: width - 2 }]}
        accessibilityIgnoresInvertColors
      />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    borderRadius: radius.md,
  },
  label: {
    ...typography.label,
    color: colors.textOnPrimary,
    textAlign: 'center',
    marginVertical: spacing.md,
  },
});
