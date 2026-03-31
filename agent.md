# Agent Guide

## Repository Purpose

This repository is a personal code collection for learning, interview preparation, and cross-language practice. It is not a single application. Treat it as a monorepo-style archive of independent notes, exercises, and small implementations.

## Top-Level Structure

| Path | Purpose |
| --- | --- |
| `Data Structure & Algorithm/` | Data structure and algorithm notes, templates, and practice material |
| `FrontEnd/` | Frontend concepts and implementations, including React and Vue work |
| `Backend/` | Backend code and notes, with Go as the main language plus some Node.js and Python |
| `Database/` | SQL exercises and database-related practice |
| `Coding/` | Focused coding pattern practice such as sliding window and two pointers |
| `Micro Project/` | Small system design style projects such as caches, queues, SSE, and rate limiting |
| `iOS/` | Swift and Objective-C learning material |
| `Other/` | Miscellaneous review notes and staged study material |
| `Tests/` | Scratch files for quick experiments |

## Working Assumptions

- There is no single root build, test, or lint command for the whole repository.
- Many folders are standalone learning exercises with their own conventions and sometimes their own tooling.
- Prefer making scoped changes inside the smallest relevant subdirectory.
- Before editing, inspect the local files in that area instead of assuming the whole repository follows one stack or style.

## Language and Content Mix

- TypeScript and JavaScript are common in frontend and algorithm practice.
- Go is common in backend notes and coding exercises.
- Python appears in algorithms and general experiments.
- Swift and Objective-C appear under `iOS/`.
- Markdown is heavily used for notes and explanations.

## Naming and Organization Patterns

- Many LeetCode-style problems use numbered names such as `200. Number of Islands`.
- Important problems may be prefixed with `@`.
- Similar topics may appear in more than one section; duplication is intentional.
- Some topics are implemented in multiple languages for comparison.

## Editing Guidelines

- Keep changes narrow and local to the target topic or exercise.
- Preserve the existing structure and naming in the directory you are editing.
- Do not reorganize large sections of the repository unless explicitly asked.
- When adding examples or solutions, match the language and style already used in that folder.
- Prefer updating nearby documentation when a change affects how a subproject is used.

## Validation

- Run validation from the relevant subdirectory, not from the repo root, when a local toolchain exists.
- If no tests or scripts exist in the target area, say so explicitly instead of inventing a repo-wide command.
- For notes-only changes, proofreading and structure checks are usually the relevant validation.

## Useful First Step

When working on a task in this repository:

1. Identify the target subdirectory.
2. Read the nearest `README.md`, config file, or surrounding examples.
3. Make the smallest change that fits the local pattern.
4. Validate only within that local scope.
