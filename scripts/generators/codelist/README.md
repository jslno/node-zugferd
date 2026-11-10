# Codelists

Codelists with an Excel source live next to this file as `<name>/map.xml` and `<name>/output.xml`. `packages/codelists/<name>/src/index.ts` is generated. Edit the spreadsheet, export the XML, then regenerate.

## Export the spreadsheet

1. Open Excel and activate Developer tools.
2. Open the codelist file and open the Developer panel.
3. Click XML -> Source -> XML Maps...
4. Import the map.xml file and press OK.
5. Drag and drop the values from the XML Source tab to the Table Column Headers.
6. Click XML -> Export
7. Select the output destination (output.xml) and press Export.

## Regenerate

```bash
pnpm gen codelist -- --codelist <name>
```

Use `*` to regenerate every codelist. UNTDID lists that have no spreadsheet are read from `UNCL.22A` by the parser in `untdid-<id>/index.ts`.
