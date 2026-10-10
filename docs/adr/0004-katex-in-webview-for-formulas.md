# 0004. KaTeX in a WebView for formula rendering

- **Status:** Accepted
- **Date:** 2026-10-10

## Context

The step-by-step and theory screens show about 30 LaTeX formulas. The old app used
`react-native-math-view`, which is unmaintained and doesn't support the New Architecture.
Options considered:

- **KaTeX inside `react-native-webview`:** mature renderer, full LaTeX support, works on Android and iOS.
- **Pre-rendered images/SVGs:** fast, but the formulas include the user's values, so they can't be pre-rendered.
- **Plain-text formulas:** no dependencies, but fractions and roots become hard to read.

## Decision

A single `Formula` component in `presentation/ui` renders LaTeX with KaTeX inside
`react-native-webview`. KaTeX assets are bundled with the app (no CDN), so it works offline.
LaTeX strings come from pure builder functions in `domain/dimensionamento/formulas`.

## Consequences

- Existing LaTeX strings from the old app can be reused almost unchanged.
- Formula builders are unit-tested as plain strings; rendering is checked visually and by E2E tests.
- Each WebView has a startup cost. Screens with many formulas should render one WebView per
  accordion section, and only while the section is open.
- If performance becomes a problem, only `Formula` needs replacing (for example with a native math
  renderer).
