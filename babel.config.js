module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // zod 4 ships `export * as ns`, which the RN preset doesn't transform for Metro.
  plugins: ['@babel/plugin-transform-export-namespace-from'],
};
