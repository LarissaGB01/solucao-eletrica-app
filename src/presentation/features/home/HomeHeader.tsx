import { Image, StyleSheet, Text, View } from 'react-native';

import { home } from '../../../content/home';
import { colors, radius, spacing, typography } from '../../theme';

const logo = require('../../assets/images/icon.jpg');

export function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeRow}>
        <Image
          style={styles.logo}
          source={logo}
          accessibilityIgnoresInvertColors
        />
        <View>
          <Text style={styles.appName}>{home.nomeApp}</Text>
          <Text style={styles.welcome}>{home.boasVindas}</Text>
        </View>
      </View>
      <Text style={styles.instructions}>{home.instrucoes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerBackground,
    padding: spacing.xl,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: radius.lg,
  },
  appName: {
    ...typography.title,
    color: colors.textStrong,
    marginHorizontal: spacing.md,
    textAlign: 'center',
  },
  welcome: {
    ...typography.subtitle,
    color: colors.text,
    marginHorizontal: spacing.md,
    textAlign: 'center',
  },
  instructions: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});
