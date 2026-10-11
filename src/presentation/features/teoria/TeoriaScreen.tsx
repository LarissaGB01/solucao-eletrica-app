import { ScrollView, StyleSheet } from 'react-native';

import { colors, spacing } from '../../theme';
import { Accordion } from '../../ui';
import { BlocoView } from '../conteudo/BlocoView';
import { secoesTeoria } from './secoesTeoria';

export function TeoriaScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {secoesTeoria.map(secao => (
        <Accordion key={secao.titulo} title={secao.titulo}>
          {secao.blocos.map((bloco, index) => (
            <BlocoView key={index} bloco={bloco} />
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
