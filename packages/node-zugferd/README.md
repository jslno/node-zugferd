<!-- omit in toc -->
<h1 align="center" id="title">node-zugferd</h1>

<p align="center">
<img src="https://socialify.git.ci/jslno/node-zugferd/image?description=0&language=1&name=1&owner=1&pattern=Transparent&stargazers=1&theme=Auto" alt="project-image" />
</p>

> 🚨 Caution    
> **[WIP]** This package is still under development.

A Node.js library for creating ZUGFeRD/Factur-X compliant documents. Generating XML and embedding it into PDF/A files, enabling seamless e-invoicing and digital document compliance.

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

> ⚠️ Warning    
> Documents containing only information of the first two profiles (MINIMUM and BASIC WL) are not considered to be invoices according to German fiscal law ([&#8594; GoBD](https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Weitere_Steuerthemen/Abgabenordnung/2019-11-28-GoBD.html)); they may therefore not be used as electronic invoices in Germany. They will not be considered as invoices in France anymore once the einvoicing B2B mandate CTC reform has been fully deployed (2028). **It is then highly recommended to target the BASIC profile at minimum.**

* MINIMUM
* BASIC WL
* BASIC
* EN 16931 (COMFORT)
* EXTENDED


> 📝 Note   
> By default this package only provides support for the CII-Syntax

> 💡 Tip    
> You can also define your own Profiles.

If you encounter invalid or missing fields, feel free to open a new [Issue](https://github.com/jslno/node-zugferd/issues) or [Pull Request](https://github.com/jslno/node-zugferd/pulls).

<h2>Basic Usage</h2>

1. Create a new instance:

    ```ts
    import { zugferd } from 'node-zugferd'
    import { BASIC } from 'node-zugferd/profile/basic'

    export const invoicer = zugferd({
        profile: BASIC
    })
    ```

2. Define the documents data

    ```ts
    import type { ProfileBasic } from 'node-zugferd/profile/basic'
    import { invoicer } from './your/path'

    const data: ProfileBasic = {
        //... your data
    }

    const invoice = invoicer.create(data)
    ```
3. Save the document
    <details>
    <summary>as XML</summary>

    ```ts
    const xml = await invoice.toXML()
    ```
    </details>

    <details open>
    <summary>as PDF/A-3b</summary>

    ```ts
    // The data in your pdf must exactly match the provided data!
    const pdf = fs.readFileSync('./your/invoice.pdf')

    const pdfA = await invoice.embedInPdf(pdf, {
        metadata: {
            title: 'New Invoice'
        }
    })
    ```
    </details>


<h2>Roadmap</h2>

* [X] Allow attaching additional files to pdf
* [ ] Add Schematron for validation
* [ ] Native support for XRechnung
* [ ] Parse ZUGFeRD/Factur-X documents

<h2>Dependencies</h2>

* [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser)
* [pdf-lib](https://github.com/Hopding/pdf-lib)
* [xsd-schema-validator](https://github.com/nikku/node-xsd-schema-validator)
* [zod](https://github.com/colinhacks/zod)
* [defu](https://github.com/unjs/defu)

<h2>License</h2>

Distributed under the MIT License. See LICENSE.md for more information.