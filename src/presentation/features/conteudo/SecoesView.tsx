import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '../../theme';
import { Accordion } from '../../ui';
import type { Secao, Tabela } from './Bloco';
import { BlocoView } from './BlocoView';

type Props = {
  secoes: readonly Secao[];
  /** Opens a table full screen (the screens pass navigation to the Tabela route). */
  onAbrirTabela: (tabela: Tabela) => void;
};

/** A scrollable list of collapsible sections; used by Teoria and Passo a passo. */
export function SecoesView({ secoes, onAbrirTabela }: Props) {
  const { bottom } = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: spacing.xl + bottom },
      ]}
    >
      {secoes.map(secao => (
        <Accordion key={secao.titulo} title={secao.titulo} value={secao.valor}>
          {secao.blocos.map((bloco, index) => (
            <BlocoView
              key={index}
              bloco={bloco}
              onAbrirTabela={onAbrirTabela}
            />
          ))}
        </Accordion>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
  },
});
