# Minimum Profile

This profile contains the minimum of data which must be present in the structured data file, some of which may depend on the data being actually available, like the supplier's intra-community VAT identifier number which is mandatory if the supplier has one.

> [!WARNING]
> Documents containing only information of the first two profiles (MINIMUM and BASIC WL) are not considered to be invoices according to German fiscal law ([→ GoBD](https://ao.bundesfinanzministerium.de/ao/2023/Anhaenge/BMF-Schreiben-und-gleichlautende-Laendererlasse/Anhang-64/inhalt.html)); they may therefore not be used as electronic invoices in Germany. They will not be considered as invoices in France anymore once the einvoicing B2B mandate CTC reform has been fully deployed (2028). **It is then highly recommended to target the BASIC profile at minimum.**

### Installation

```bash
npm install @node-zugferd/minimum
```

### Documentation

For more information, please refer to the [Minimum Profile documentation](https://node-zugferd.jsolano.de/docs/profiles/minimum).

## License

MIT
