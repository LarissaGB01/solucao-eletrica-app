# 0001. React Native CLI instead of Expo

- **Status:** Accepted
- **Date:** 2026-10-10

## Context

The original app (`LarissaGB01/solucao_eletrica`, 2023) was built with Expo 49. It used Expo only
lightly (`@expo/vector-icons`, `babel-preset-expo`, Expo Go for previews). The rewrite should give
full control over the native projects, target Android first and add iOS later from the same code.

Alternatives considered:

- **Expo (managed / prebuild):** least setup and recommended by the RN docs, but explicitly not wanted.
- **Kotlin Multiplatform + Compose Multiplatform:** native-first, but a full rewrite in a new language.
- **Flutter:** a full rewrite in Dart, with no benefit for a forms-and-formulas app.

## Decision

Use a bare React Native project created with `@react-native-community/cli` (RN 0.87, New
Architecture, TypeScript strict). The `android/` and `ios/` folders are committed and owned by us.

## Consequences

- Most screen logic and all LaTeX strings from the old app can be reused.
- iOS comes later from the same codebase: `pod install`, signing, CI job.
- We maintain Gradle/Xcode config and RN upgrades ourselves (use the RN Upgrade Helper).
- No Expo Go: development needs an emulator or a device plus JDK 17 and the Android SDK.
- Expo packages are not allowed (see `CLAUDE.md`); pick community libraries that support the CLI.
