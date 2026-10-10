// Layer rules: see ARCHITECTURE.md "Dependency rules".
const LAYERS = [
  { type: 'app', pattern: 'src/app' },
  { type: 'presentation', pattern: 'src/presentation' },
  { type: 'application', pattern: 'src/application' },
  { type: 'infrastructure', pattern: 'src/infrastructure' },
  { type: 'domain', pattern: 'src/domain' },
  { type: 'content', pattern: 'src/content' },
];

// Which layers each layer may import from.
const ALLOWED = {
  domain: ['domain'],
  application: ['application', 'domain'],
  infrastructure: ['infrastructure', 'application', 'domain'],
  presentation: ['presentation', 'application', 'domain', 'content'],
  content: ['content'],
  app: LAYERS.map(layer => layer.type),
};

const FRAMEWORK_IMPORTS = {
  paths: ['react', 'react-native'],
  patterns: ['react-native-*', '@react-native*', '@react-navigation/*'],
};

module.exports = {
  root: true,
  extends: ['@react-native'],
  plugins: ['boundaries'],
  settings: {
    'boundaries/elements': LAYERS,
    'boundaries/include': ['src/**/*'],
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'boundaries/dependencies': [
      'error',
      {
        default: 'disallow',
        policies: Object.entries(ALLOWED).map(([from, to]) => ({
          from: { element: { type: from } },
          allow: { to: { element: { types: { anyOf: to } } } },
        })),
      },
    ],
  },
  overrides: [
    {
      files: ['src/domain/**', 'src/application/**'],
      rules: { 'no-restricted-imports': ['error', FRAMEWORK_IMPORTS] },
    },
  ],
};
