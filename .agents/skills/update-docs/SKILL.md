---

name: update-docs
description: This skill should be used when the user asks to "update documentation for my changes", "check docs for this PR", "what docs need updating", "sync docs with code", "scaffold docs for this feature", "document this feature", "review docs completness", "add docs for this change", "what documentation is affected", "docs impact", or mentions "docs/", "MDX", "documentation update", ".mdx files". Provides guided workflow for updating node-zugferd documentation based on code changes
metadata:
internal: true
---

# node-zugferd Documentation Updater

Guides you through updating node-zugferd documentation based on code changes on the active branch. Designed for maintainers reviewing PRs for completeness.

## Quick Start

1. **Analyze changes**: Run `git diff canary...HEAD --stat` to see what files changed
2. **Identify affected docs**: Map changed source files to documentation paths
3. **Review each doc**: Walk through updates with user confirmation
4. **Validate**: Run `pnpm lint` to check formatting
5. **Commit**: Stage documentation changes

## Workflow: Analyze Code Changes

### Step 1: Get the diff

```bash
# See all changed files on this branch
git diff canary...HEAD --stat

# See changes in specific areas
git diff canary...HEAD -- packages/node-zugferd/src
```

### Step 2: Identify documentation-relevant changes

Look for changes in these areas:

| Source Path                 | Likely Doc Impact                          |
| --------------------------- | ------------------------------------------ |
| `packages/node-zugferd`     | Documentation for the node-zugferd library |
| `packages/codelists`        | Codelist references                        |
| `packages/templates`        | Template plugin references                 |
| `packages/default-template` | Template plugin references                 |
| `packages/docx-template`    | Template plugin references                 |
| `packages/pdf-template`     | Template plugin references                 |
| `packages/instrumentation`  | Instrumentation plugin references          |
| `packages/magic-bytes`      | Magic-bytes plugin references              |
| `packages/parser`           | Parser plugin references                   |
| `packages/profiles`         | Profile references                         |
| `packages/validators`       | Validator references                       |
| `packages/**/*`             | Various features                           |

Keep out private packages like `packages/utils`.

### Step 3: Map to documentation files

Use the code-to-docs mapping in `references/CODE-TO-DOCS-MAPPING.md` to find corresponding documentation files.

Example mappings:

- `packages/parser` → `docs/content/docs/plugins/parser.mdx`
- `packages/codelists/allowance` → `docs/content/docs/codelists/allowance.mdx`

## Workflow: Update Existing Documentation

### Step 1: Read the current documentation

Before making changes, read the existing doc to understand:

- Current structure and sections
- Frontmatter fields in use

### Step 2: Identify what needs updating

Common updates include:

- **New props/options**: Add to the props table and explain their purpose
- **Changed behavior**: Update descriptions and examples
- **Deprecated features**: Add deprecation notices and migration guidance
- **New examples**: Add code blocks following conventions

### Step 3: Apply updates with confirmation

For each change:

1. Show the user what you plan to change
2. Wait for confirmation before editing
3. Apply the edit
4. Move to the next change

### Step 4: Validate changes

```bash
pnpm lint           # Check formatting
pnpm lint:fix       # Auto-fix formatting issues
```

## Workflow: Scaffold New Feature Documentation

Use this when adding documentation for entirely new features.

### Step 1: Determine the doc type

| Feature Type         | Doc Location                                         |
| -------------------- | ---------------------------------------------------- |
| New plugin           | `docs/content/docs/plugins/<name>.mdx`               |
| New validator        | `docs/content/docs/plugins/validators/<name>.mdx`    |
| New profile          | `docs/content/docs/profiles/<name>.mdx`              |
| New codelist         | `docs/content/docs/codelists/<name>.mdx`             |
| New CLI command      | Section in `docs/content/docs/reference/cli.mdx`     |
| New config option    | Section in `docs/content/docs/reference/options.mdx` |
| New concept or guide | Existing top-level page in `docs/content/docs/`      |

Do not hand-write pages under `docs/content/api-reference/`. That tree is generated from package exports and TSDoc comments with `pnpm gen`.

### Step 2: Create the file with proper naming

- Use kebab-case: `my-new-plugin.mdx`
- Place in the correct directory based on feature type
- Use one page per profile, codelist, and validator; this project does not use numeric prefixes
- Register the page in the matching `meta.json` when that directory has an explicit `pages` list (plugins, profiles). Codelists and validators are picked up automatically

### Step 3: Analyze sibling docs for patterns

Read at least one sibling page in the target directory before writing. This project has no doc templates, so the siblings are the source of truth. Note:

- Frontmatter fields in use (`title`, `description`, `icon`)
- Section order, usually `## Installation` → `## Basic Usage` / `## Usage` → `## Options`
- Which MDX components the page uses and whether it imports package data

### Step 4: Write the doc

Start with frontmatter. `title` is required; `description` and `icon` are recommended. Profile pages use a `dot-[#hex]` icon, other pages use a Lucide icon name.

```mdx
---
title: Feature Name
description: One or two sentences describing the feature.
icon: WandSparkles
---
```

Build the body from the components already used across the docs:

- `<Steps>` and `<Step>` for install and setup flows
- `<Callout>` for warnings, experimental notices, and tips
- `<TypeTable type={{ ... }} />` for plugin and option tables
- `<ProfileTree profile={profile} />` for profile schemas
- `<CodelistTable items={codelist} fieldMap={{ ... }} />` for codelists

Import only the package data a page renders; the MDX components are registered globally. Follow `references/DOC-CONVENTIONS.md` for code blocks (`title`, `tab`, `tab-group`, `package-install`) and Shiki transformers.

When done, add the page to navigation if needed, then validate:

```bash
pnpm lint
pnpm --filter=docs dev
```
