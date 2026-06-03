# Project Instructions — The Akshansh Experience

## Mandatory Validation Rule
- **Build First, Report Second:** You MUST run `npm run build` after every single code change.
- **Silent Recovery:** If the build fails, do not report the failure immediately. Identify the root cause, apply a fix, and retry the build.
- **Completion Criteria:** A task is only "done" when the build passes successfully. Never state that a change is complete unless you have a successful production build as evidence.

## Architectural Patterns
- **Provider Layering:** Top-level providers (e.g., `ThemeProvider`, `AuthProvider`) must be rendered in a parent component (like `RootComponent`), while any logic consuming those contexts must live in a descendant component (like `RootInner`).
- **Aesthetic Hardening:** Maintain 0px border radius across all content containers.
- **Dual World Logic:** Light mode is "The Page" (static, tactile); Dark mode is "The Night" (atmospheric, active). Ensure particle systems are unmounted in light mode.
