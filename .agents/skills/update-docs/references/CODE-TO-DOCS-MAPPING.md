# Code to Documentation Mapping

Maps node-zugferd source code to its documentation. Documentation lives in
`docs/` as a Fumadocs site; hand-written pages are MDX under
`docs/content/docs/`, while `docs/content/api-reference/` is generated from
package exports.

## Documentation Layout

| Documentation Area | Path                                  | Purpose                                  |
| ------------------ | ------------------------------------- | ---------------------------------------- |
| Introduction       | `docs/content/docs/introduction.mdx`  | Project overview                         |
| Basic Usage        | `docs/content/docs/basic-usage.mdx`   | Getting started and creating invoices    |
| Profiles           | `docs/content/docs/profiles/*.mdx`    | One page per ZUGFeRD / Order-X profile   |
| Plugins            | `docs/content/docs/plugins/*.mdx`     | Parser, templates, validators, utilities |
| Codelists          | `docs/content/docs/codelists/*.mdx`   | One page per code list                   |
| Reference          | `docs/content/docs/reference/*.mdx`   | CLI, options, resources, contributing    |
| API Reference      | `docs/content/api-reference/**/*.mdx` | Generated from public package exports    |
| Examples           | `docs/content/examples/*`             | Example pages (when present)             |

## Core Mappings

### Public API and Configuration

| Source Path                                            | Documentation Path                                                             |
| ------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `packages/node-zugferd/src/index.ts`                   | `docs/content/docs/basic-usage.mdx`, `docs/content/docs/reference/options.mdx` |
| `packages/node-zugferd/src/context.ts`                 | `docs/content/docs/reference/options.mdx`                                      |
| `packages/node-zugferd/src/internal-plugins/create.ts` | `docs/content/docs/basic-usage.mdx`                                            |
| `packages/node-zugferd/src/pdf/`                       | `docs/content/docs/plugins/templates.mdx` (PDF/A embedding)                    |
| `packages/core/src/types/options.ts`                   | `docs/content/docs/reference/options.mdx`                                      |
| `packages/core/src/types/context.ts`                   | `docs/content/docs/reference/options.mdx`                                      |
| `packages/core/src/types/plugin.ts`                    | `docs/content/docs/plugins/*.mdx` (plugin behavior and options)                |
| `packages/core/src/types/profile.ts`                   | `docs/content/docs/profiles/*.mdx`                                             |
| `packages/core/src/types/codelist.ts`                  | `docs/content/docs/codelists/*.mdx`                                            |
| `packages/core/src/utils/logger.ts`                    | `docs/content/docs/reference/options.mdx` (`logger` option)                    |

### Profiles

Each profile package has a matching profile page. `src/schema.ts` changes also
belong on the same page because the page renders `<ProfileTree>` from the
package's `schema`.

| Source Path                           | Documentation Path                                |
| ------------------------------------- | ------------------------------------------------- |
| `packages/profiles/minimum/`          | `docs/content/docs/profiles/minimum.mdx`          |
| `packages/profiles/basic-wl/`         | `docs/content/docs/profiles/basic-wl.mdx`         |
| `packages/profiles/basic/`            | `docs/content/docs/profiles/basic.mdx`            |
| `packages/profiles/en-16931/`         | `docs/content/docs/profiles/en-16931.mdx`         |
| `packages/profiles/extended/`         | `docs/content/docs/profiles/extended.mdx`         |
| `packages/profiles/xrechnung/`        | `docs/content/docs/profiles/xrechnung.mdx`        |
| `packages/profiles/order-x-basic/`    | `docs/content/docs/profiles/order-x-basic.mdx`    |
| `packages/profiles/order-x/`          | `docs/content/docs/profiles/order-x.mdx`          |
| `packages/profiles/order-x-extended/` | `docs/content/docs/profiles/order-x-extended.mdx` |

### Plugins, Templates, and Validators

| Source Path                                        | Documentation Path                                 |
| -------------------------------------------------- | -------------------------------------------------- |
| `packages/parser/`                                 | `docs/content/docs/plugins/parser.mdx`             |
| `packages/templates/`                              | `docs/content/docs/plugins/templates.mdx`          |
| `packages/default-template/`                       | `docs/content/docs/plugins/templates.mdx`          |
| `packages/pdf-template/`                           | `docs/content/docs/plugins/templates.mdx`          |
| `packages/docx-template/`                          | `docs/content/docs/plugins/templates.mdx`          |
| `packages/instrumentation/`                        | `docs/content/docs/plugins/instrumentation.mdx`    |
| `packages/magic-bytes/`                            | `docs/content/docs/plugins/magic-bytes.mdx`        |
| `packages/validators/xsd/`                         | `docs/content/docs/plugins/validators/xsd.mdx`     |
| `packages/validators/mustang/`                     | `docs/content/docs/plugins/validators/mustang.mdx` |
| `packages/validators/xrechnung-schema-definition/` | `docs/content/docs/plugins/validators/xsd.mdx`     |
| `packages/validators/order-x-schema-definition/`   | `docs/content/docs/plugins/validators/xsd.mdx`     |

The schema-definition packages support the XSD validator and have no dedicated
page. Document changes to them on the XSD validator page or the relevant profile
page.

### CLI

| Source Path                            | Documentation Path                                |
| -------------------------------------- | ------------------------------------------------- |
| `packages/cli/src/index.ts`            | `docs/content/docs/reference/cli.mdx`             |
| `packages/cli/src/commands/init/`      | `docs/content/docs/reference/cli.mdx` (`Init`)    |
| `packages/cli/src/commands/parse.ts`   | `docs/content/docs/reference/cli.mdx` (`Parse`)   |
| `packages/cli/src/commands/upgrade.ts` | `docs/content/docs/reference/cli.mdx` (`Upgrade`) |

### Codelists

Codelist packages are generated. The docs page is still hand-written and imports
the package to render `<CodelistTable>`.

| Source Path                              | Documentation Path                       |
| ---------------------------------------- | ---------------------------------------- |
| `packages/codelists/<name>/src/index.ts` | `docs/content/docs/codelists/<name>.mdx` |
| `scripts/generators/codelist/`           | Regenerate packages with `pnpm gen`      |

### Supporting Packages

| Source Path            | Documentation Impact                                        |
| ---------------------- | ----------------------------------------------------------- |
| `packages/core/`       | Public types and helpers; usually surfaced in `reference/`  |
| `packages/data-types/` | Schema helpers used by profiles and codelists; no user page |
| `packages/utils/`      | Private; never document directly                            |

## Directory Pattern Mappings

| Source Directory                           | Documentation Area                        | Notes                          |
| ------------------------------------------ | ----------------------------------------- | ------------------------------ |
| `packages/node-zugferd/src/`               | `docs/content/docs/` and `reference/`     | Main library                   |
| `packages/core/src/types/`                 | `docs/content/docs/reference/options.mdx` | Public option and plugin types |
| `packages/profiles/<name>/`                | `docs/content/docs/profiles/<name>.mdx`   | One page per profile           |
| `packages/parser/`                         | `docs/content/docs/plugins/parser.mdx`    | Parser plugin                  |
| `packages/templates/` and template plugins | `docs/content/docs/plugins/templates.mdx` | Shared templates page          |
| `packages/codelists/<name>/`               | `docs/content/docs/codelists/<name>.mdx`  | One page per codelist          |
| `packages/cli/src/commands/`               | `docs/content/docs/reference/cli.mdx`     | One section per command        |
| `packages/validators/<name>/`              | `docs/content/docs/plugins/validators/`   | One page per validator         |

## Generated Documentation

Do not hand-edit generated content. Regenerate it from source.

| Generated Output                     | Command                      | Source of Truth                                   |
| ------------------------------------ | ---------------------------- | ------------------------------------------------- |
| `docs/content/api-reference/`        | `pnpm gen` → `api-reference` | Package exports, `dev-source`, and TSDoc comments |
| `packages/codelists/*/src/index.ts`  | `pnpm gen` → `codelist`      | `scripts/generators/codelist/` sources            |
| `docs/src/lib/profile-field-meta.ts` | `pnpm gen` → `profile-meta`  | `scripts/generators/profile-meta/` XML input      |

If you add or change a public export in a package that is included in the API
reference generator, run `pnpm gen` and commit the regenerated MDX. Packages
excluded from generation are the CLI, `utils`, the ZUGFeRD profile packages, and
all `codelist-*` packages.

## Validate Documentation Changes

`docs/` is not part of the root `pnpm build`. Validate changes separately:

```bash
pnpm lint                    # Biome check, including MDX/Markdown
pnpm lint:fix                # Auto-fix formatting
pnpm --filter=docs dev       # Preview at http://localhost:3000
pnpm --filter=docs build     # Production build of the docs site
```

## Finding Related Documentation

### Step 1: Identify the changed export

Look at what changed in the source file:

- Public API exports → API Reference or a `reference/` page
- Configuration and option types → `docs/content/docs/reference/options.mdx`
- Profile schemas and rules → the matching `docs/content/docs/profiles/*.mdx`
- Plugin actions and options → the matching `docs/content/docs/plugins/*.mdx`
- Codelist values → the matching `docs/content/docs/codelists/*.mdx`
- Internal utilities → usually no docs needed

### Step 2: Search for existing docs

Use the repository search tools:

- **Find docs mentioning a term**: Grep with the pattern and
  `docs/content/` as the path
- **Find docs importing a package**: Grep for `@node-zugferd/<package>`
- **List docs in an area**: Glob with `docs/content/docs/profiles/*.mdx`,
  `docs/content/docs/plugins/**/*.mdx`, and so on
- **Find generated API docs**: Glob with
  `docs/content/api-reference/<package>/**/*.mdx`

### Step 3: Check for shared content

Changes often affect more than one page:

- `basic-usage.mdx` and `introduction.mdx` contain cross-cutting setup examples
- `plugins/templates.mdx` covers `templates`, `default-template`,
  `pdf-template`, and `docx-template` in one page
- `plugins/validators/xsd.mdx` covers both schema-definition packages
- Profile pages reuse examples from `docs/content/docs/basic-usage.mdx`
- `docs/content/docs/reference/meta.json` links to the generated API Reference

Update navigation when adding a page:

- Profiles: `docs/content/docs/profiles/meta.json`
- Plugins: `docs/content/docs/plugins/meta.json`
- Validators: `docs/content/docs/plugins/validators/` (included via `...validators`)
- Codelists: `docs/content/docs/codelists/meta.json` (automatic, no `pages` list)

## Common Patterns

### New Configuration Option

1. Add the option to `packages/core/src/types/options.ts`.
2. Document it in `docs/content/docs/reference/options.mdx`.
3. Regenerate API reference if the type package exposes it.
4. Check `basic-usage.mdx` and plugin pages for examples that set the option.

### New Plugin

1. Add the package under `packages/`.
2. Create `docs/content/docs/plugins/<name>.mdx` following a sibling page.
3. Add the page to `docs/content/docs/plugins/meta.json`.
4. Regenerate API reference for the plugin package.
5. Include installation, setup, options, and a usage example.

### New Profile

1. Add the package under `packages/profiles/<name>/`.
2. Create `docs/content/docs/profiles/<name>.mdx` importing the profile and
   rendering `<ProfileTree profile={...} />`.
3. Add the page to `docs/content/docs/profiles/meta.json`.
4. Regenerate API reference and `profile-meta` if needed.
5. Add end-to-end coverage under `e2e/profiles/` (see `AGENTS.md`).

### New Codelist

1. Update `scripts/generators/codelist/` and run `pnpm gen`; never edit
   `packages/codelists/*/src/index.ts` directly.
2. Create `docs/content/docs/codelists/<name>.mdx` importing the package and
   rendering `<CodelistTable items={...} />`.
3. No `meta.json` change is needed for codelists.

### New CLI Command

1. Add the command under `packages/cli/src/commands/`.
2. Register it in `packages/cli/src/index.ts`.
3. Add a section and options list to `docs/content/docs/reference/cli.mdx`.

### Behavioral Change

1. Find all docs that describe the behavior.
2. Update descriptions and examples to match the new behavior.
3. Add a migration note or callout if the change is breaking.
4. Update affected profile, plugin, and API Reference pages.

## Quick Search Commands

Use Claude's built-in tools for efficient searching:

- **Find all docs mentioning a term**: Grep for the pattern under
  `docs/content/`, filtered to `*.mdx`
- **Find docs that use a package**: Grep for `@node-zugferd/<package>` under
  `docs/content/`
- **Find docs by filename pattern**: Use the Glob tool with pattern like `docs/content/docs/profiles/**/basic*.mdx`
- **List profile docs**: Glob `docs/content/docs/profiles/*.mdx`
- **List plugin docs**: Glob `docs/content/docs/plugins/**/*.mdx`
- **List codelist docs**: Glob `docs/content/docs/codelists/*.mdx`
- **List generated API docs**: Glob `docs/content/api-reference/**/*.mdx`
- **Read a doc's frontmatter**: Use the read tool with a line limit to check the frontmatter.
