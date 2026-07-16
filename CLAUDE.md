# code-collection

Personal learning and interview prep repository covering algorithms, full-stack development, system design, and AI across multiple languages.

## Structure

Six top-level categories. Everything lives under one of them — there is no loose content at the repo root.

| Directory                     | Purpose                                                                     |
| ----------------------------- | --------------------------------------------------------------------------- |
| `AI & Agent/`                 | AI/ML and agent experiments — NanoGPT, micrograd MLP, MCP, RAG, ReAct        |
| `Data Structure & Algorithm/` | Algorithms and coding practice — the bulk of the repo (~3.5k files)          |
| `Full Stack Develop/`         | Applied engineering by domain — FrontEnd, Backend, Database, iOS             |
| `In Progress/`                | **Projects currently being worked on, not yet categorized** — see below      |
| `System Design/`              | Design patterns built as runnable micro projects                             |
| `Temp/`                       | Throwaway experiments (test.go, test.ts, …) — nothing here is meant to last  |

Listed in on-disk (alphabetical) order. `Temp/` is named to sort last.

Subdirectory layout is deliberately **not** documented here — it is reorganized often, and a map of it would be stale within a week. Look at the tree instead.

### `In Progress/`

Active, unfinished projects that have not yet been filed into any other category. It is a **queue, not a home**: each item is expected to graduate into `AI & Agent/`, `Data Structure & Algorithm/`, `Full Stack Develop/`, or `System Design/` once it settles.

Distinct from `Temp/`: `In Progress/` is real work going somewhere; `Temp/` is scratch that never graduates and may be deleted at any time.

If something has sat in `In Progress/` long enough that you can name its category, move it. The repo has a cautionary tale here: a vague catch-all called `Miscellaneous/` silently grew to 1,928 files — larger than any real category — before it was broken up.

## Practice Model

This repo is a spaced-repetition practice log, not a library. **The same problem intentionally appears many times**, filed along different axes (by topic, by source, by review stage) and solved again from each.

- **Do not consolidate, dedupe, or refactor across these copies.** Each is a separate practice artifact; the differences between passes are the signal.
- Repeat solutions are often genuinely different approaches, not copies. Verified example: `455. Assign Cookies` is a forward two-pointer in one location and reverse iteration in another. **Diff before assuming duplication.**
- Prefer adding a new practice pass over editing an existing one — the history of attempts has value.
- `Archive/` folders are frozen. Leave them alone unless explicitly asked.

## Conventions

- LeetCode problems use a numbered prefix: `200. Number of Islands`
- Hard or important problems are marked with `@`: `@376. Wiggle Subsequence`
- Core patterns (LRU Cache, Rate Limiter, …) are implemented in both TypeScript and Go for cross-language comparison
- Directory names use spaces and Title Case (`Bounded Blocking Queue`) — quote paths in shell commands

## Root Config

`tsconfig.json`, `.prettierrc`, and `.prettierignore` must stay at the repo root. Both tools resolve config by walking **up** from each file, and TypeScript/JavaScript is spread across every top-level directory — root is the only location that covers all of it. Moving them into a subdirectory silently drops coverage everywhere else.

There is no root `package.json` and no root `node_modules`; these configs serve the editor (TS language service, Prettier extension), not a build. Go, Python, and Swift subprojects carry their own tooling, as do the two subprojects with a real `package.json`.

`node_modules/`, `.venv/`, `dist/`, `__pycache__/`, and `.DS_Store` are gitignored and must stay untracked.
