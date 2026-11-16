## Review rules

- **Profiles:** Treat ZUGFeRD/Factur-X, XRechnung, and Order-X profiles as distinct; verify profile-specific schemas and mappings.
- **Generated code:** Codelist files under `packages/codelists/*/src/` are generated. Changes belong in `scripts/generators/codelist/` and should regenerate outputs.
- **Compliance:** Passing internal validation does not establish legal compliance; the project requires official validation tools.
- **Invoice behavior:** Check that parsing and serialization preserve invoice values, embedded XML, and the PDF's declared profile.
