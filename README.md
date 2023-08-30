# Fast

All software converges on a single general solution.

Fast observes and implements the general solution.

## Run it

```
bun run dev
```

Observe output in fast/output

## Status

- Currently building AST for two runtimes. App and lexical (lexical wip)
- AST currently supports:
  - vars
  - constants
  - scalars (numeric and string)
  - interfaces
  - functions
  - lambdas
  - models
  - structs
  - object literals
  - math
  - strings with interpolations
  - enums
  - contexts

## Roadmap

- Expanding AST to app satisfaction
- AST compilation into platform specific code (Backend, Frontend)
