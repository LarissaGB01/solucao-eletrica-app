module.exports = {
  preset: '@react-native/jest-preset',
  roots: ['<rootDir>/src'],
  // Preset default plus ESM-only libraries we depend on.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-webview)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.generated.ts',
    '!src/**/testing/**',
  ],
  coverageThreshold: {
    './src/domain/': { lines: 90, branches: 90, functions: 90 },
  },
};
