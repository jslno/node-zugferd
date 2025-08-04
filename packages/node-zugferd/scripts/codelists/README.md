# Codelists

Generates TypeScript code list definitions from an input source such as a URL or XML file.  
These generated files are mostly used in profile schemas to provide strongly typed enums and mappings for standard code lists.

## Requirements

This does however require [Bun](https://bun.sh) since we're running typescript code without transpiling to JS before executing.

## How to run

```sh
pnpm -F node-zugferd scripts:codelists
```