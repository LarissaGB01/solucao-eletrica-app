import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { resultados as textos } from '../../../content/resultados';
import type { RootStackParamList } from '../../navigation/routes';
import { colors, spacing } from '../../theme';
import { Button } from '../../ui';

export type Formulario = 'FormCabeamento' | 'FormDisjuntor' | 'FormEletroduto';

type Props = {
  children: ReactNode;
  /** The form that produced this result; "Dimensionar outro" reopens it empty. */
  formulario: Formulario;
  navigation: Pick<
    NativeStackNavigationProp<RootStackParamList>,
    'reset' | 'popToTop'
  >;
};

export function ResultadoLayout({ children, formulario, navigation }: Props) {
  const { bottom } = useSafeAreaInsets();
  // Reset instead of goBack: the form starts fresh on step 1, and Back from it returns to Home
  // rather than to this stale result.
  const dimensionarOutro = () =>
    navigation.reset({
      index: 1,
      routes: [{ name: 'Home' }, { name: formulario }],
    });

  return (
    <ScrollView
      style={styles.screen}
      // Keeps the last button clear of the gesture bar on edge-to-edge Android.
      contentContainerStyle={[
        styles.content,
        { paddingBottom: spacing.xl + bottom },
      ]}
    >
      {children}
      <View style={styles.acoes}>
        <Button
          label={textos.acoes.dimensionarOutro}
          onPress={dimensionarOutro}
        />
        <Button
          label={textos.acoes.inicio}
          variant="secondary"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
  },
  acoes: {
    marginTop: spacing.xl * 1.5,
    gap: spacing.md,
  },
});
