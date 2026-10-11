import { Linking, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../../theme';
import { Formula, LinkButton, TableImage } from '../../ui';
import type { Bloco } from './Bloco';

export function BlocoView({ bloco }: { bloco: Bloco }) {
  switch (bloco.tipo) {
    case 'formula':
      return (
        <View style={styles.formula}>
          {bloco.legenda !== undefined && (
            <Text style={styles.legenda}>{bloco.legenda}</Text>
          )}
          <Formula expressions={bloco.expressoes} />
        </View>
      );
    case 'texto':
      return <Text style={styles.texto}>{bloco.texto}</Text>;
    case 'tabela':
      return (
        <TableImage
          source={bloco.imagem}
          aspectRatio={bloco.proporcao}
          accessibilityLabel={bloco.descricao}
        />
      );
    case 'link':
      return (
        <LinkButton
          label={bloco.rotulo}
          onPress={() => Linking.openURL(bloco.url)}
        />
      );
  }
}

const styles = StyleSheet.create({
  formula: {
    marginVertical: spacing.sm,
  },
  legenda: {
    ...typography.label,
    color: colors.border,
    textAlign: 'center',
    marginVertical: spacing.sm,
  },
  texto: {
    ...typography.body,
    color: colors.textStrong,
    marginVertical: spacing.xs,
  },
});
