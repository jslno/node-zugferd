<p align="center">
<img src="https://socialify.git.ci/jslno/node-zugferd/image?custom_description=A+library+to+create+XML+for+ZUGFeRD+invoices+and+append+it+to+PDF+files%2C+generating+PDF%2FA+compliant+documents.&description=1&issues=0&language=1&name=1&owner=1&pattern=Transparent&pulls=0&stargazers=1&theme=Auto" alt="node-zugferd" />
</p>

> [!CAUTION]
> **[WIP]** This package is still under development.

<h2>Table of Contents</h2>

- [Features](#features)
- [Installation](#installation)
- [Default Supported Profiles](#default-supported-profiles)
- [Basic Usage](#basic-usage)
- [Roadmap](#roadmap)
- [Dependencies](#dependencies)
- [License](#license)

<h2>Features</h2>

* Create Factur-X compliant xml
* Attach xml to pdf/a-3b
* Validate xml

<h2>Installation</h2>

Install node-zugferd with npm:

```bash
npm install node-zugferd@latest
```

<h2>Default Supported Profiles</h2>

> [!WARNING]
> Documents containing only information of the first two profiles (MINIMUM and BASIC WL) are not considered to be invoices according to German fiscal law ([&#8594; GoBD](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2019-11-28-GoBD.html)); they may therefore not be used as electronic invoices in Germany. They will not be considered as invoices in France anymore once the einvoicing B2B mandate CTC reform has been fully deployed (2028). **It is then highly recommended to target the BASIC profile at minimum.**

* MINIMUM
* BASIC WL
* BASIC
* EN 16931 (COMFORT)
* EXTENDED


> [!NOTE]
> By default this package only provides support for the CII-Syntax

> [!TIP]
> You can also create your own Profiles.

If you encounter invalid or missing fields, feel free to open a new [Issue]() or [Pull Request]().

<h2>Basic Usage</h2>

1. Create a new instance:

    ```ts
    import { zugferd, BASIC } from 'node-zugferd'

    export const invoicer = zugferd({
        profile: BASIC
    })
    ```

2. Define the documents data

    ```ts
    import type { ProfileBasic } from 'node-zugferd'
    import { invoicer } from './your/path'

    const data: ProfileBasic = {
        //... your data
    }

    const invoice = await invoicer.create(data)
    ```
3. Save the document
    <details>
    <summary>as XML</summary>

    ```ts
    const xml = invoice.toXML()
    ```
    </details>

    <details open>
    <summary>as PDF/A-3b</summary>

    > [!CAUTION]
    > The data in your pdf must exactly match the provided data!

    ```ts
    const pdf = fs.readFileSync('./your/invoice.pdf')

    const pdfA = invoice.attachToPdf(pdf, {
        title: 'New Invoice',
        // ... additional metadata
    })
    ```
    </details>


<h2>Roadmap</h2>

* [ ] Allow attaching additional files to pdf
* [ ] Add Schematron for validation
* [ ] Native support for XRechnung

<h2>Dependencies</h2>

* [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser)
* [pdf-lib](https://github.com/Hopding/pdf-lib)
* [xsd-schema-validator](https://github.com/nikku/node-xsd-schema-validator)
* [zod](https://github.com/colinhacks/zod)
* [defu](https://github.com/unjs/defu)

<h2>License</h2>

Distributed under the MIT License. See LICENSE.md for more information.