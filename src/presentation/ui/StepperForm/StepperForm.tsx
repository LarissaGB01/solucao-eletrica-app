import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../theme';
import { type Step, Stepper } from '../Stepper/Stepper';

type Props = {
  steps: readonly Step[];
  canAdvance?: (index: number) => boolean | Promise<boolean>;
  onFinish: () => void;
  busy: boolean;
  busyLabel: string;
};

/** Scrollable Stepper with a blocking spinner while the form is being processed. */
export function StepperForm({
  steps,
  canAdvance,
  onFinish,
  busy,
  busyLabel,
}: Props) {
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Stepper steps={steps} canAdvance={canAdvance} onFinish={onFinish} />
      </ScrollView>
      {busy && (
        <View style={styles.overlay}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
            accessibilityLabel={busyLabel}
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
