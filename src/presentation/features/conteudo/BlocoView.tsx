import { Linking, StyleSheet, Text, View } from 'react-native';

import { teoria } from '../../../content/teoria';
import { colors, spacing, typography } from '../../theme';
import { DataTable, Formula, LinkButton } from '../../ui';
import type { Bloco, Tabela } from './Bloco';

type Props = {
  bloco: Bloco;
  onAbrirTabela: (tabela: Tabela) => void;
};

export function BlocoView({ bloco, onAbrirTabela }: Props) {
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
        <DataTable
          title={bloco.tabela.titulo}
          columns={bloco.tabela.colunas}
          rows={bloco.tabela.linhas}
          highlightedRow={bloco.tabela.destaque}
          note={bloco.tabela.nota}
          onPress={() => onAbrirTabela(bloco.tabela)}
          hint={teoria.ampliar}
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
