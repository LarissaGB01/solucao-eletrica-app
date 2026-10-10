# 0002. Clean Architecture with lint-enforced layers

- **Status:** Accepted
- **Date:** 2026-10-10

## Context

The old app mixed UI, request building and formula strings inside screen components. The rewrite
needs testable business rules, a calculation source that can be swapped (mock now, offline engine
later; see ADR 0005) and code that iOS can reuse without changes.

## Decision

Organize `src/` into the layers `domain`, `application`, `infrastructure`, `presentation`,
`content` and `app` (composition root), with feature folders inside each layer. Dependencies only
point inward (see `ARCHITECTURE.md`).

The rules are enforced in CI, not by convention:

- `eslint-plugin-boundaries` (`boundaries/dependencies`) restricts imports between layers.
- `no-restricted-imports` keeps React and React Native out of `domain` and `application`.
- Errors cross layers as `Result<T, E>` values instead of exceptions.

## Consequences

- Domain and use cases are pure TypeScript, unit-testable without rendering.
- Implementations are swapped in one place (the DI container in `src/app`).
- More files and indirection than a flat screen-based structure; acceptable for this app's size.
- Breaking a layer rule fails `npm run lint`. The fix is to move code, never to disable the rule.
