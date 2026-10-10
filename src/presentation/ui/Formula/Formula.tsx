import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { buildFormulaHtml } from './formulaHtml';

type Props = {
  /** One or more LaTeX expressions, rendered top to bottom in a single WebView. */
  expressions: readonly string[];
  /** Readable description for screen readers (WebView content isn't announced well). */
  accessibilityLabel?: string;
};

const INITIAL_HEIGHT = 60;

export function Formula({ expressions, accessibilityLabel }: Props) {
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const key = expressions.join('\n');
  // eslint-disable-next-line react-hooks/exhaustive-deps -- key captures the array content
  const html = useMemo(() => buildFormulaHtml(expressions), [key]);

  const onMessage = (event: WebViewMessageEvent) => {
    const reported = Number(event.nativeEvent.data);
    if (Number.isFinite(reported) && reported > 0) {
      setHeight(reported);
    }
  };

  return (
    <WebView
      testID="formula"
      accessible={accessibilityLabel !== undefined}
      accessibilityLabel={accessibilityLabel}
      source={{ html }}
      originWhitelist={['*']}
      onShouldStartLoadWithRequest={request => request.url === 'about:blank'}
      onMessage={onMessage}
      scrollEnabled={false}
      // The library's container defaults to flex: 1 (flex-basis 0), which overrides height
      // and collapses to 0 inside auto-height parents.
      containerStyle={[styles.container, { height }]}
      style={styles.webview}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  webview: {
    backgroundColor: 'transparent',
  },
});
