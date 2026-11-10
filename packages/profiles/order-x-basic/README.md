# Order-X Basic Profile

The Order-X BASIC profile has been built to addres a “standard” purchase order process, with no VAT information, except optionally on Totals, allowing single delivery or pick up mode in a single location with:

- <u>**on Line level**</u>: Product description, Substituted Product for Order Response type message only, Line Note, Net Unit Price, Reference to Blanket Order line ID, potential partial delivery, requested quantity, and line total,

- <u>**on Document level**</u>: Seller, Buyer, Ship From, Ship To Parties, with IDs, Name, Postal and electronic Addresses, Legal and VAT ID optionally (only for Seller and Buyer), Delivery terms, references to their business documents (Quotation, Contract, Blanket Order, Previous Order, Previous Order Change or previous Order Response), Requested delivery or pick-up date or period, Payment Terms, Totals and Buyer accounting reference.

### Installation

```bash
npm install @node-zugferd/order-x-basic
```

### Documentation

For more information, please refer to the [Order-X Basic Profile documentation](https://node-zugferd.jsolano.de/docs/profiles/order-x-basic).

## License

MIT
