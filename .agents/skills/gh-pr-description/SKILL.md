---

name: gh-pr-description
description: Drafts and reviews GitHub pull request descriptions for the node-zugferd repository. Use when opening, updating, or reviewing a PR, or when summarizing a branch for reviewers.
metadata:
internal: true
---

# Github PR description

Inspect the branch diff, commits, related issue or discussion, tests and docs. When updating a PR, read its current body first.

## Write

Fill in the Summary and Changes sections of `.github/PULL_REQUEST_TEMPLATE.md`.
Never add a Validation, Test plan, or Checklist section, and delete them from an
existing body when you update it. Write for a reviewer, not a changelog.

Follow these ASD-STE100 rules where they apply:

- Use approved words from the ASD-STE100 dictionary, with one meaning per word.
- Use active voice and keep one topic in each sentence.
- Limit descriptive sentences to 25 words and procedural sentences to 20 words.
- Keep necessary technical terms, proper nouns, and code identifiers.

### Summary

- Keep it to one short paragraph: usually 2-4 sentences and about 100 words or fewer.
- Lead with the concrete problem, user need, or decision behind the change, then state the approach in a sentence or two. Leave the specifics to Changes.
- Link an existing issue or discussion with `Closes #N`, `Related to #N`, or an equivalent when one exists. Do not create an issue solely for a PR.

### Changes

A flat list of the changes a reviewer must know, not a narrative.

- Put public API changes first: new, changed, or removed exports, options, config fields, CLI commands and flags, defaults, and error types. Then list other user-visible behavior changes.
- Write one change per bullet, in one sentence where possible. Name the identifier in the code format and its entry point when it has one, such as `zugferd()` from `packages/node-zugferd/src/index.ts`.
- Add a short reason with "so" or "because" only when the Summary does not already make it clear.
- Prefix breaking changes with `Breaking:` and say what callers must change.
- End with preserved behavior, scope boundaries, or follow-ups only when they matter to review.
- Usually 2-6 bullets. A one-change PR gets one bullet. Do not nest bullets, add sub-headings, or split the list by commit or original PR.
- Do not list files, internal refactors, tests, or checks you ran. Include implementation detail only when it is necessary to assess behavior or risk.
