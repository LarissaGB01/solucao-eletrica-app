module.exports = {
  preset: '@react-native/jest-preset',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}'],
  coverageThreshold: {
    './src/domain/': { lines: 90, branches: 90, functions: 90 },
  },
};
