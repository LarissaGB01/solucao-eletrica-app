import { type ReactNode, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { stepper as textos } from '../../../content/ui';
import { colors, spacing, typography } from '../../theme';
import { Button } from '../Button/Button';

export type Step = {
  key: string;
  /** Shown under the progress dots, e.g. "Dados elétricos". */
  title?: string;
  content: ReactNode;
};

type Props = {
  steps: readonly Step[];
  onFinish: () => void;
  /** Called before leaving a step forward; return false to stay (e.g. validation failed). */
  canAdvance?: (index: number) => boolean | Promise<boolean>;
};

/** Multi-step form: scrollable step content and a bottom bar with Voltar / Próximo. */
export function Stepper({ steps, onFinish, canAdvance }: Props) {
  const [active, setActive] = useState(0);
  const { bottom } = useSafeAreaInsets();
  const isFirst = active === 0;
  const isLast = active === steps.length - 1;
  const step = steps[active];

  const next = async () => {
    if (canAdvance && !(await canAdvance(active))) {
      return;
    }
    if (isLast) {
      onFinish();
    } else {
      setActive(current => current + 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* A single step needs no progress indicator. */}
        {steps.length > 1 && (
          <View style={styles.progress}>
            <View
              style={styles.indicators}
              accessible
              accessibilityLabel={textos.etapa(active + 1, steps.length)}
            >
              {steps.map((item, index) => (
                <View
                  key={item.key}
                  style={[
                    styles.dot,
                    index < active && styles.dotDone,
                    index === active && styles.dotActive,
                  ]}
                >
                  <Text style={styles.dotLabel}>{index + 1}</Text>
                </View>
              ))}
            </View>
            {step?.title !== undefined && (
              <Text accessibilityRole="header" style={styles.title}>
                {step.title}
              </Text>
            )}
          </View>
        )}
        {step?.content}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: spacing.md + bottom }]}>
        {!isFirst && (
          <View style={styles.footerButton}>
            <Button
              label={textos.voltar}
              variant="secondary"
              onPress={() => setActive(current => current - 1)}
            />
          </View>
        )}
        <View style={styles.footerButton}>
          <Button
            label={isLast ? textos.finalizar : textos.proximo}
            onPress={next}
          />
        </View>
      </View>
    </View>
  );
}

const DOT_SIZE = 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  progress: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  indicators: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inactive,
  },
  dotDone: {
    backgroundColor: colors.primaryLight,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotLabel: {
    color: colors.textInverse,
    fontWeight: 'bold',
  },
  title: {
    ...typography.label,
    color: colors.primaryDark,
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xl,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
    backgroundColor: colors.background,
  },
  footerButton: {
    flex: 1,
  },
});
