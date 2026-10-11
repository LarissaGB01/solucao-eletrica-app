import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { formCabeamento as textos } from '../../../content/cabeamento';
import type { ScreenProps } from '../../navigation/routes';
import { colors, spacing } from '../../theme';
import { type Step, Stepper } from '../../ui';
import { EtapaCircuito } from './etapas/EtapaCircuito';
import { EtapaEletrica } from './etapas/EtapaEletrica';
import { EtapaInstalacao } from './etapas/EtapaInstalacao';
import { EtapaMateriais } from './etapas/EtapaMateriais';
import { useFormCabeamentoViewModel } from './useFormCabeamentoViewModel';

export function FormCabeamentoScreen({
  navigation,
}: ScreenProps<'FormCabeamento'>) {
  const { control, tipoPotencia, calculando, podeAvancar, finalizar } =
    useFormCabeamentoViewModel(navigation);

  const etapas: Step[] = [
    { key: 'circuito', content: <EtapaCircuito control={control} /> },
    {
      key: 'eletrica',
      content: <EtapaEletrica control={control} tipoPotencia={tipoPotencia} />,
    },
    { key: 'instalacao', content: <EtapaInstalacao control={control} /> },
    { key: 'materiais', content: <EtapaMateriais control={control} /> },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Stepper steps={etapas} canAdvance={podeAvancar} onFinish={finalizar} />
      </ScrollView>
      {calculando && (
        <View style={styles.overlay}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
            accessibilityLabel={textos.calculando}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingVertical: spacing.xl * 1.5,
    paddingHorizontal: spacing.xl,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});
