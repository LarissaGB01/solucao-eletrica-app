import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import type { ScreenProps } from '../../navigation/routes';
import { colors } from '../../theme';
import { tabelaHtml } from './tabelaHtml';

/** One table full screen, with pinch-to-zoom (opened by tapping a table). */
export function TabelaScreen({ route }: ScreenProps<'Tabela'>) {
  const { tabela } = route.params;
  const html = useMemo(() => tabelaHtml(tabela), [tabela]);
  return (
    <WebView
      testID="tabela-ampliada"
      source={{ html }}
      originWhitelist={['*']}
      onShouldStartLoadWithRequest={request => request.url === 'about:blank'}
      // Android: pinch zoom without the old +/- buttons.
      setBuiltInZoomControls
      setDisplayZoomControls={false}
      style={styles.webview}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
