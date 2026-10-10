import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

// No native WebView in Jest: render a plain View that keeps the props for assertions.
jest.mock('react-native-webview', () => {
  const { createElement } = require('react');
  const { View } = require('react-native');
  return {
    WebView: (props: object) => createElement(View, props),
  };
});
