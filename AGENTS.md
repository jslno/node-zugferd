# node-zugferd Development Guide

## Codebase structure

### Monorepo overview

This is a pnpm monorepo containing the node-zugferd library and related packages.

```
node-zugferd/
├── packages/                 # Published npm packages (except `packages/utils`)
│   ├── node-zugferd/         # Published `node-zugferd` library
│   ├── core/                 # `@node-zugferd/core`
│   ├── parser/               # `@node-zugferd/parser` (XML and PDF parse plugin)
│   ├── data-types/           # `@node-zugferd/data-types`
│   ├── utils/                # `@node-zugferd/utils` — private, not published
│   ├── cli/                  # `@node-zugferd/cli` (`node-zugferd` / `zugferd`)
│   ├── profiles/             # Factur-X, ZUGFeRD, XRechnung, Order-X profiles
│   ├── codelists/            # Code lists (`@node-zugferd/codelist-*`)
│   ├── validators/           # XSD, Mustang, schema-definition packages
│   ├── templates/            # `@node-zugferd/templates`
│   ├── default-template/     # `@node-zugferd/default-template`
│   ├── pdf-template/         # `@node-zugferd/pdf-template`
│   ├── docx-template/        # `@node-zugferd/docx-template`
│   ├── instrumentation/      # `@node-zugferd/instrumentation`
│   └── magic-bytes/          # `@node-zugferd/magic-bytes`
├── e2e/                      # End-to-end tests
│   ├── smoke/                # Node, Bun, and Deno smoke tests
│   ├── integration/          # Vanilla-Node create/parse integration
│   ├── profiles/             # Per-profile invoice integration tests
│   └── test-utils/           # Shared invoice fixtures
├── benchmark/                # Vitest benchmarks per profile
├── docs/                     # Fumadocs site. Not included in `pnpm build`
└── scripts/                  # Maintenance scripts (`scripts/generators`, `pnpm gen`)
```

### `packages/node-zugferd`

The main library lives in `packages/node-zugferd/`. This is what gets published as the `node-zugferd` npm package.

**Source code** is in `packages/node-zugferd/src`.

**Key entry points:**

- Public API: `src/index.ts` → `zugferd()`
- Context: `src/context.ts` → `createContext`
- Built-in create plugin: `src/internal-plugins/create.ts`
- PDF/A embedding: `src/pdf/index.ts` → `src/pdf/pdfa.ts`, `src/pdf/xmp.ts`

**Compiled output** goes to `packages/node-zugferd/dist` (`dist/index.mjs`, types `dist/index.d.mts`).

### `packages/core`

**Source code** is in `packages/core/src`.

**Key entry points:**

- Package entry: `src/index.ts` — re-exports `build-helper`, `global` (`NODE_ZUGFERD_VERSION`), and `types`
- `@node-zugferd/core/types` → `src/types/index.ts` (`ZugferdOptions`, `ZugferdPlugin`, `ZugferdProfile`, `ZugferdContext`)
- `@node-zugferd/core/utils` → `src/utils/index.ts`
- `@node-zugferd/core/error` → `src/error/index.ts`
- `@node-zugferd/core/data-types` → `src/data-types/index.ts`
- `@node-zugferd/core/async_hooks` → `src/async_hooks/index.ts`

**Compiled output** goes to `packages/core/dist`.

### Other Important Packages

- `packages/parser/` — `@node-zugferd/parser`. Parse plugin. `src/index.ts` and `src/parse-from-schema.ts` are large; grep before reading.
- `packages/data-types/` — `@node-zugferd/data-types`. Schema helpers used by profiles and codelists.
- `packages/utils/` — `@node-zugferd/utils`. Private. `defineProfile` lives in `src/profile.ts`.
- `packages/cli/` — bins `node-zugferd` and `zugferd`. Commands: `init`, `parse`, `upgrade` (`src/commands/`).
- `packages/profiles/<name>/` — one package per profile. Each `src/index.ts` calls `defineProfile`; `src/schema.ts` is the data schema. Profiles: `minimum`, `basic-wl`, `basic`, `en-16931`, `extended`, `xrechnung`, `order-x`, `order-x-basic`.
- `packages/codelists/<name>/` — one package per code list. `src/index.ts` is generated. Edit `scripts/generators/codelist/` and run `pnpm gen`.
- `packages/validators/xsd/` — `@node-zugferd/validator-xsd`
- `packages/validators/mustang/` — `@node-zugferd/validator-mustang`. Needs a JDK (CI uses Temurin 25).
- `packages/validators/xrechnung-schema-definition/` and `packages/validators/order-x-schema-definition/`
- `packages/templates/`, `packages/default-template/`, `packages/pdf-template/`, `packages/docx-template/`
- `packages/instrumentation/`, `packages/magic-bytes/`

### README files

Before editing or creating files in any subdirectory (e.g `packages/*`), read all `README.md` files in the directory path from the repo root up to and including the target file's directory. This helps identify any local patterns, conventions, and documentation.

**Example:** Before editing `packages/profiles/basic-wl/src/index.ts`, read:

- `packages/README.md` (if exists)
- `packages/profiles/README.md` (if exists)
- `packages/profiles/basic-wl/README.md` (if exists)

## Build Commands

```bash
# Build the node-zugferd package
pnpm --filter=node-zugferd build

# Build all packages under packages/ (does not build docs/)
pnpm build

# Build the docs site
pnpm --filter=docs build
```

## Fast Local Development

For iterative source development, default to `tsdown --watch` plus the Vitest command that matches the suite you are changing.

**Default agent rule:** If you are changing a package under `packages/`, start `pnpm --filter=<package-name> dev` in a separate terminal session before making edits (unless it is already running). If you skip this, explicitly state why (for example: docs-only, test-only, read-only investigation, or CI-only analysis).

**Test-only changes:** When changes are confined to `e2e/` or `*.test.ts`, do not start a watch build. Run the relevant tests directly. This assumes the workspace is already bootstrapped and package `dist/` outputs are current. Missing or stale `dist/` still requires a build.

**1. Start watch build in background:**

```bash
# Auto-rebuilds on file changes
# Keep this running while you iterate on code
pnpm --filter=node-zugferd dev

# Every package under packages/, except the CLI
pnpm dev
```

Root `pnpm dev` is `turbo dev --filter=./packages/**/* --filter=!./packages/cli`. The CLI `dev` script runs the CLI with `tsx`, so start it only while working on the CLI:

```bash
pnpm --filter=@node-zugferd/cli dev
```

Docs site (port 3000):

```bash
pnpm --filter=docs dev
```

**2. Run focused tests:**

```bash
# One package, one file, no watch
pnpm --filter=@node-zugferd/parser exec vitest run src/xpath.test.ts

# Smoke
pnpm e2e:smoke

# Vanilla-Node integration
pnpm e2e:integration --filter=./e2e/integration

# One profile
pnpm e2e:integration --filter=@node-zugferd-test/profile-minimum
```

**3. When done, kill the background watch process (if you started it).**

**For type errors only:** Use `pnpm --filter=<package-name> typecheck` instead of `pnpm --filter=<package-name> build`. Root `pnpm typecheck` is `tsc --build` across project references.

**Bootstrapping a new clone or worktree does not require building every package up front.** `pnpm install`, then build only what your work changes: `pnpm --filter=<package-name> build` for one package, `pnpm build` when changes span multiple packages. Test-only changes do not require a rebuild before CI push when `dist/` is already current.

**Switching branches or pulling can still require a build** when it moves source relative to `dist/`. Rebuild the affected packages before running tests. See [Rebuilding before running Tests](#rebuilding-before-running-tests).

## Testing

```bash
# Run a specific test file
pnpm --filter=@node-zugferd/parser exec vitest run src/xpath.test.ts

# Run tests matching a name
pnpm --filter=@node-zugferd/parser exec vitest run -t "pattern"

# Run one package
pnpm --filter=@node-zugferd/data-types exec vitest run
```

Package `"test"` scripts invoke `vitest`, which watches in a TTY. One-shot runs use `vitest run`.

**Test commands by suite:**

- `pnpm --filter=<package-name> exec vitest run` — unit tests for one package
- `pnpm coverage` — all package unit tests with coverage (what CI runs; Node 22 and 24)
- `pnpm e2e:smoke` — Node, Bun, and Deno smoke tests
- `pnpm e2e:integration --filter=./e2e/integration` — vanilla-Node create/parse
- `pnpm e2e:integration --filter=@node-zugferd-test/profile-<name>` — one profile
- `pnpm bench` — benchmarks under `benchmark/`

CI profile integration (`.github/workflows/e2e.yml`) runs Java 25 (Temurin) and this matrix only: `@node-zugferd/minimum`, `@node-zugferd/basic-wl`, `@node-zugferd/basic`, `@node-zugferd/en-16931`, `@node-zugferd/extended`.

**Analyzing test output efficiently:**

Never re-run the same test suite with different grep filters. Capture output once to a file, then read from it:

```bash
# Run once, save everything
pnpm --filter=@node-zugferd/parser exec vitest run > /tmp/test-output.log 2>&1

# Then analyze without re-running
grep "FAIL" /tmp/test-output.log
tail -20 /tmp/test-output.log
```

## Writing Tests

**Test writing expectations:**

- **Prefer end-to-end profile and integration tests for invoice behavior.** Create and parse coverage lives in `e2e/profiles/` and `e2e/integration/`. Unit tests (`*.test.ts` beside source, or `test/`) are for parsers, schemas, and helpers.

- **Add profile invoices through the shared factories** in `e2e/profiles/factory.ts`: `validInvoiceTestFactory` and `parseValidInvoiceTestFactory`. Fixtures live in `e2e/test-utils`. Follow `e2e/profiles/minimum/src/index.test.ts`.

- **Smoke coverage** for alternate runtimes and `tsconfig` flags lives in `e2e/smoke/test/`.

- **Normalize filesystem paths in cross-platform assertions.** Windows `path.join()` uses backslashes. Normalize paths before checks that use `/`.

- **Run `vitest run`.** A bare `vitest` or `pnpm test` stays in watch mode in a local terminal.

- **Mustang-backed profile checks need a JDK.** CI uses Temurin 25.

## Linting and Types

```bash
pnpm lint                # biome check . --error-on-warnings
pnpm lint:fix            # biome check . --fix --unsafe
pnpm format              # biome format . --write
pnpm lint:dependencies   # knip, including --production
pnpm lint:spell          # cspell on tracked files
pnpm lint:packages       # publint (turbo depends on build)
pnpm lint:types          # attw (turbo depends on build)
pnpm typecheck           # tsc --build
```

Formatter and linter are Biome (`biome.json`). Indentation is tabs. JSON uses spaces.

Type-check with the repo's own commands. `pnpm typecheck` runs `tsc --build` against the root project references. A hand-rolled `tsc` pointed at a single file misses those references. `pnpm lint:types` is Are the types wrong? (`attw`) on the published `dist/` types. `pnpm lint:packages` is `publint`. Neither replaces `tsc`.

CI lint (`.github/workflows/ci.yml`) runs `pnpm build`, then `pnpm lint`, `pnpm lint:dependencies`, `pnpm lint:packages`, `pnpm lint:spell`, and `pnpm lint:types`. The typecheck job runs `pnpm build`, then `pnpm typecheck`.

## PR Status (CI Failures and Reviews)

When the user asks about CI failures, PR reviews, or PR status, inspect the workflows with `gh` and reproduce the failing job locally with the same script.

```bash
gh pr checks
gh run list --branch "$(git branch --show-current)" --workflow CI
gh run view <run-id> --log-failed
```

- `.github/workflows/ci.yml` — `lint`, `typecheck`, and `test` (`pnpm coverage` on Node 22 and 24). Pull requests, pushes to `main` and `canary`, and the merge queue.
- `.github/workflows/e2e.yml` — `smoke`, `integration`, and `profiles-integration`.

`TURBO_TOKEN` and `TURBO_TEAM` are CI remote-cache settings. Treat `TURBO_TOKEN` as a secret. Turbo still runs locally without the remote cache.

## Secrets and Env Safety

Always treat environment variable values as sensitive unless they are known test-mode flags.

- Never print or paste secret values (tokens, API keys, cookies) in chat responses, commits, or shared logs.
- Mirror CI env **names and modes** exactly, but do not inline literal secret values in commands.
- If a required secret is missing locally, stop and ask the user rather than inventing placeholder credentials.
- Never commit local secret files; if documenting env setup, use placeholder-only examples.
- When sharing command output, summarize and redact sensitive-looking values.

### GitHub SSH Authentication

GitHub SSH authentication may depend on a user-configured SSH agent or key
provider, such as a password manager or hardware-backed key.

If a Git fetch, push, or partial-clone hydration fails or hangs with an SSH
signing error such as:

- `sign_and_send_pubkey: signing failed`
- `communication with agent failed`
- `Permission denied (publickey)`

stop immediately and ask the user to ensure their SSH agent or key provider is
available and unlocked. Do not switch remotes to HTTPS, mutate remote URLs,
retry repeatedly, or attempt another authentication workaround unless the user
explicitly requests it.

Before a force-push or stack rebase that may hydrate partial-clone objects,
prefer a lightweight SSH preflight. If it fails due to the SSH agent or key
provider, ask the user to make it available or unlock it before continuing.

## Context-Efficient Workflows

**Reading large files** (>500 lines, e.g. `packages/profiles/basic-wl/src/index.ts`):

- Grep first to find relevant line numbers, then read targeted ranges with `offset`/`limit`
- Never re-read the same section of a file without code changes in between
- For generated files (`dist/`, `node_modules/`, `docs/.next/`, `packages/codelists/*/src/index.ts`): search only, don't read

**Build & test output:**

- Capture to file once, then analyze: e.g. `pnpm build 2>&1 | tee /tmp/build.log`
- Don't re-run the same test command without code changes; re-analyze saved output instead

**Batch edits before building:**

- Group related edits across files, then run one build, not build-per-edit
- Use `pnpm --filter=<package-name> typecheck` to check type errors without a full rebuild

**External API calls (gh, curl):**

- Save response to variable or file: `JOBS=$(gh api ...) && echo "$JOBS" | jq '...'`
- Don't re-fetch the same API data to analyze from different angles

## Commit and PR Style

- Do NOT add "Generated with Claude Code" or co-author footers to commits or PRs.
- Keep commit messages concise and descriptive.
- PR descriptions should focus on what changed and why.
- Do NOT mark PRs as "ready for review" (`gh pr ready`) - leave PRs in draft mode and let the user decide when to mark them ready.

**Pre-validate before committing:**

```bash
pnpm format
pnpm lint
```

## Rebuilding before running Tests

Rebuild before running tests when package source changed, whether from your own edits or from a branch switch or pull that moved source relative to `dist/`:

- **Only edited `e2e/` or `*.test.ts`, with current `dist/`?** → No rebuild or watch build. Run the relevant tests.
- **Changed one package under `packages/`?** → `pnpm --filter=<package-name> build`, or leave `pnpm --filter=<package-name> dev` running.
- **Changed several packages?** → `pnpm build`
- **Changed only `docs/`?** → No library rebuild. Use `pnpm --filter=docs dev` or `pnpm --filter=docs build`.
- **Changed a codelist?** → Edit `scripts/generators/codelist/` and run `pnpm gen`, then build that `@node-zugferd/codelist-*` package.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.

<!-- END:turborepo-agent-rules -->
