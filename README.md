<div align="center">
    <picture>
        <source srcset="https://github.com/jslno/node-zugferd/blob/main/banner-dark.png?raw=true" media="(prefers-color-scheme: dark)" />
        <source srcset="https://github.com/jslno/node-zugferd/blob/main/banner-light.png?raw=true" media="(prefers-color-scheme: light)" />
        <img src="https://github.com/jslno/node-zugferd/blob/main/banner-light.png?raw=true" alt="node-zugferd" />
    </picture>

[![npm](https://img.shields.io/npm/dm/node-zugferd?style=flat&colorA=1c1917&colorB=1c1917)](https://npm.chart.dev/node-zugferd?primary=neutral&gray=neutral&theme=dark)
[![npm version](https://img.shields.io/npm/v/node-zugferd?style=flat&colorA=1c1917&colorB=1c1917)](https://npmx.dev/package/node-zugferd)
[![GitHub stars](https://img.shields.io/github/stars/jslno/node-zugferd?style=flat&colorA=1c1917&colorB=1c1917)](https://github.com/jslno/node-zugferd/stargazers)

</div>

# node-zugferd

### Why node-zugferd?

Electronic invoicing is no longer optional. Public-sector buyers and an increasing number of private businesses already require ZUGFeRD, Factur-X, or EN 16931-aligned invoices, while regulatory requirements continue to expand. If your product issues invoices, supporting electronic invoicing is becoming an essential part of the job.

The challenge is that e-invoicing is more than generating an XML file. It involves multiple profiles, extensive XML schemas, business rules, and PDF/A-3 documents that must embed the corresponding XML and metadata correctly. Many development teams turn to Java-based solutions such as Mustang, introducing a separate service that needs to be built, deployed, maintained, and integrated into an otherwise TypeScript-based stack.

node-zugferd brings these capabilities directly into the Node.js ecosystem. Instead of juggling separate tools and formats, it provides a unified, typed API for working with electronic invoices throughout their lifecycle. A shared data model supports the different profiles, while the underlying specification details are handled by the library rather than scattered throughout your application code.

This gives developers the building blocks to implement ZUGFeRD and Factur-X support without introducing an entirely separate Java service.

### Getting Started

```bash
npx @node-zugferd/cli@latest init
```

Read the [node-zugferd Installation](https://node-zugferd.jsolano.de/docs/installation) guide to learn more.

### Profiles

node-zugferd provides the following profiles:

#### ZUGFeRD/Factur-X (CII):

- [**Minimum**](https://node-zugferd.jsolano.de/docs/profiles/minimum)
- [**Basic WL**](https://node-zugferd.jsolano.de/docs/profiles/basic-wl)
- [**Basic**](https://node-zugferd.jsolano.de/docs/profiles/basic)
- [**EN 16931**](https://node-zugferd.jsolano.de/docs/profiles/en-16931)
- [**Extended**](https://node-zugferd.jsolano.de/docs/profiles/extended)
- [**XRechnung**](https://node-zugferd.jsolano.de/docs/profiles/xrechnung)

#### Order-X:

- [**Basic**](https://node-zugferd.jsolano.de/docs/profiles/order-x-basic)
- [**Comfort**](https://node-zugferd.jsolano.de/docs/profiles/order-x)

## Contributing

See the [Contributing Guide](./CONTRIBUTING.md) for more information.

## Disclaimer

node-zugferd is an independent, community-driven project. It is not affiliated with or endorsed by the [FeRD](https://www.ferd-net.de) (Forum elektronische Rechnung Deutschland) or any other standards body. The names ZUGFeRD and Factur-X are used only to describe the formats this project aims to support.

node-zugferd is built to follow the published specifications, but it does not guarantee compliance with any standard, profile, or legal requirement. Always validate generated documents with the official validation tools and consult the relevant regulations before relying on them for production or legal purposes. The software is provided "as is", without warranty of any kind.

## License

[MIT](./LICENSE.md)
