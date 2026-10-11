import { Image, type ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
  source: ImageSourcePropType;
  /** width / height of the image file, so it scales to full width without distortion. */
  aspectRatio: number;
  accessibilityLabel: string;
};

export function TableImage({ source, aspectRatio, accessibilityLabel }: Props) {
  return (
    <Image
      source={source}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      resizeMode="contain"
      style={[styles.image, { aspectRatio }]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
  },
});
