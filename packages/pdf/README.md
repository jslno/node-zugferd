<h1 align="center">@node-zugferd/pdf</h1>

Programmatic PDF generation for [node-zugferd](https://github.com/jslno/node-zugferd):
pass your invoice data, get a finished e-invoice back — a PDF/A-3b document
with the validated Factur-X XML embedded. No headless browser, no server
required.

Ships with a built-in, customizable template for a German business invoice
(DIN 5008 inspired) that renders all content required by § 14 Abs. 4 UStG.

## Installation

```bash
npm install @node-zugferd/pdf@latest
```

## Usage

```ts
import { zugferd } from "node-zugferd";
import { EN16931 } from "node-zugferd/profile/en16931";
import { pdf } from "@node-zugferd/pdf";
import { defaultTemplate } from "@node-zugferd/pdf/templates";

const invoicer = zugferd({
  profile: EN16931,
  plugins: [
    pdf({
      template: defaultTemplate({
        logo: fs.readFileSync("./logo.png"),
        accentColor: "#1e3a5f",
        footer: {
          columns: [
            "Lieferant GmbH\nLieferantenstraße 20\n80333 München",
            "Geschäftsführer: Hans Muster\nAmtsgericht München HRB 12345",
            "IBAN: DE02 1203 0000 0000 2020 51\nBIC: BYLADEM1001",
          ],
        },
      }),
    }),
  ],
});

const data: typeof invoicer.$Infer.Schema = {
  //... your data
};

const pdfA = await invoicer.createPdf(data, {
  metadata: {
    title: "Rechnung 471102",
  },
});
```

Rendering is done with [pdfmake](https://pdfmake.github.io/docs/) (pure
JavaScript, automatic page breaks). Fonts are always embedded, as required by
PDF/A — the output passes [veraPDF](https://verapdf.org) PDF/A-3b validation.

Templates are fully replaceable: any function returning a pdfmake document
definition works.

```ts
import type { InvoiceTemplate } from "@node-zugferd/pdf";

const myTemplate: InvoiceTemplate = ({ data, formatters }) => ({
  content: [{ text: `Invoice ${data.number}` }],
});
```

## Documentation

See the [PDF plugin documentation](https://node-zugferd.jsolano.de/docs/plugins/pdf)
for all options, custom fonts, label overrides and custom templates.

## License

Distributed under the MIT License. See LICENSE.md for more information.
