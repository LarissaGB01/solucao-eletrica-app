import { type ReactNode, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { stepper as textos } from '../../../content/ui';
import { colors, spacing } from '../../theme';

export type Step = {
  key: string;
  content: ReactNode;
};

type Props = {
  steps: readonly Step[];
  onFinish: () => void;
  /** Called before leaving a step forward; return false to stay (e.g. validation failed). */
  canAdvance?: (index: number) => boolean | Promise<boolean>;
};

export function Stepper({ steps, onFinish, canAdvance }: Props) {
  const [active, setActive] = useState(0);
  const isFirst = active === 0;
  const isLast = active === steps.length - 1;

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
    <View>
      <View
        style={styles.indicators}
        accessible
        accessibilityLabel={textos.etapa(active + 1, steps.length)}
      >
        {steps.map((step, index) => (
          <View
            key={step.key}
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

      {steps[active]?.content}

      <View style={styles.buttons}>
        {!isFirst && (
          <Pressable
            accessibilityRole="button"
            onPress={() => setActive(current => current - 1)}
            style={styles.button}
          >
            <Text style={styles.buttonLabel}>{textos.voltar}</Text>
          </Pressable>
        )}
        <Pressable
          accessibilityRole="button"
          onPress={next}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>
            {isLast ? textos.finalizar : textos.proximo}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const DOT_SIZE = 30;

const styles = StyleSheet.create({
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
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
  buttons: {
    flexDirection: 'row',
    marginTop: spacing.xl,
  },
  button: {
    padding: spacing.md,
    borderRadius: spacing.xs,
    marginRight: spacing.md,
    backgroundColor: colors.primary,
  },
  buttonLabel: {
    color: colors.textInverse,
    fontWeight: 'bold',
  },
});
