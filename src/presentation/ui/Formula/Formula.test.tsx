import { act, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { Formula } from './Formula';

describe('Formula', () => {
  it('renders the expressions in a WebView', async () => {
    await render(<Formula expressions={['S = \\frac{P}{FP}']} />);
    const webview = screen.getByTestId('formula');
    expect(webview.props.source.html).toContain('S = \\\\frac{P}{FP}');
  });

  it('resizes to the height reported by the page and ignores garbage', async () => {
    await render(<Formula expressions={['x']} />);
    const webview = screen.getByTestId('formula');
    const send = (data: string) =>
      act(() => webview.props.onMessage({ nativeEvent: { data } }));

    await send('142');
    expect(
      StyleSheet.flatten(screen.getByTestId('formula').props.containerStyle),
    ).toEqual({
      flex: 0,
      height: 142,
    });

    await send('not-a-number');
    expect(
      StyleSheet.flatten(screen.getByTestId('formula').props.containerStyle),
    ).toEqual({
      flex: 0,
      height: 142,
    });
  });

  it('blocks navigation away from the inline page', async () => {
    await render(<Formula expressions={['x']} />);
    const { onShouldStartLoadWithRequest } =
      screen.getByTestId('formula').props;
    expect(onShouldStartLoadWithRequest({ url: 'about:blank' })).toBe(true);
    expect(onShouldStartLoadWithRequest({ url: 'https://example.com' })).toBe(
      false,
    );
  });
});
