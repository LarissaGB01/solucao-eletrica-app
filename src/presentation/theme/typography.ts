import type { TextStyle } from 'react-native';

export const typography = {
  title: { fontSize: 25, lineHeight: 40, fontWeight: 'bold' },
  subtitle: { fontSize: 20, lineHeight: 42, fontWeight: 'bold' },
  body: { fontSize: 16, lineHeight: 26 },
  label: { fontSize: 15, lineHeight: 20, fontWeight: 'bold' },
} as const satisfies Record<string, TextStyle>;
