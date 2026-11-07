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

| Feature Type | Doc Location |
| ------------ | ------------ |

### Step 2: Create the file with proper naming

- Use kebab-case: `my-new-plugin.mdx`
- Place in the correct directory based on feature type

### Step 3: Analyze sibling docs for patterns

### Step 4: Write the doc
