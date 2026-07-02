import { describe, expect, it } from "vitest";
import { zugferd } from "node-zugferd";
import { BASIC } from "node-zugferd/profile/basic";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { defaultTemplate, type DefaultTemplateOptions } from ".";
import { createFormatters } from "../../utils/format";
import data from "../../test-utils/data/basic";

const { context } = zugferd({ profile: BASIC, logger: { disabled: true } });

const render = async (
	options?: DefaultTemplateOptions,
	overrides?: Record<string, any>,
): Promise<TDocumentDefinitions> =>
	await defaultTemplate(options)({
		data: { ...data, ...overrides },
		logger: context.logger,
		formatters: createFormatters(),
	});

// normalize the (narrow) no-break spaces emitted by Intl for readable assertions
const asText = (value: unknown) =>
	JSON.stringify(value).replace(/[\u00A0\u202F]/g, " ");

describe("defaultTemplate", () => {
	it("renders the content required by § 14 Abs. 4 UStG", async () => {
		const text = asText((await render()).content);

		// seller and buyer
		expect(text).toContain("Lieferant GmbH");
		expect(text).toContain("Kunden AG Mitte");
		// seller VAT identifier
		expect(text).toContain("DE123456789");
		// invoice number and dates
		expect(text).toContain("Rechnung Nr. 471102");
		expect(text).toContain("15.11.2024");
		expect(text).toContain("14.11.2024");
		// quantity and description of the supplied goods
		expect(text).toContain("Trennblätter A4");
		expect(text).toContain("20 Stk");
		// net amount, tax rate, tax amount and gross total
		expect(text).toContain("198,00 €");
		expect(text).toContain("zzgl. 19 % USt.");
		expect(text).toContain("37,62 €");
		expect(text).toContain("235,62 €");
	});

	it("renders notes and payment terms", async () => {
		const text = asText((await render()).content);

		expect(text).toContain("Rechnung gemäß Bestellung vom 01.11.2024.");
		expect(text).toContain("Zahlbar innerhalb 30 Tagen");
	});

	it("derives the sender line from the seller by default", async () => {
		const text = asText((await render()).content);

		expect(text).toContain(
			"Lieferant GmbH · Lieferantenstraße 20 · 80333 München",
		);
	});

	it("prefers a custom sender line", async () => {
		const text = asText(
			(await render({ senderLine: "Custom Sender Line" })).content,
		);

		expect(text).toContain("Custom Sender Line");
	});

	it("falls back to the seller's tax number without a VAT identifier", async () => {
		const text = asText(
			(
				await render(undefined, {
					transaction: {
						...data.transaction,
						tradeAgreement: {
							...data.transaction.tradeAgreement,
							seller: {
								...data.transaction.tradeAgreement.seller,
								taxRegistration: { localIdentifier: "201/113/40209" },
							},
						},
					},
				})
			).content,
		);

		expect(text).toContain("Steuernummer");
		expect(text).toContain("201/113/40209");
	});

	it("renders the customer number when the buyer has an identifier", async () => {
		const text = asText(
			(
				await render(undefined, {
					transaction: {
						...data.transaction,
						tradeAgreement: {
							...data.transaction.tradeAgreement,
							buyer: {
								...data.transaction.tradeAgreement.buyer,
								identifier: "10053",
							},
						},
					},
				})
			).content,
		);

		expect(text).toContain("Kunden-Nr.");
		expect(text).toContain("10053");
	});

	it("renders the invoicing period", async () => {
		const text = asText(
			(
				await render(undefined, {
					transaction: {
						...data.transaction,
						tradeSettlement: {
							...data.transaction.tradeSettlement,
							invoicingPeriod: {
								startDate: new Date("2026-06-01"),
								endDate: new Date("2026-06-30"),
							},
						},
					},
				})
			).content,
		);

		expect(text).toContain("Leistungszeitraum");
		expect(text).toContain("01.06.2026 – 30.06.2026");
	});

	it("applies label overrides", async () => {
		const text = asText(
			(await render({ labels: { invoiceTitle: "Invoice No." } })).content,
		);

		expect(text).toContain("Invoice No. 471102");
		expect(text).not.toContain("Rechnung Nr.");
	});

	it("adds a header image when a logo is provided", async () => {
		const logo = `data:image/png;base64,${Buffer.from("fake").toString("base64")}`;

		expect((await render()).header).toBeUndefined();
		expect(asText((await render({ logo })).header)).toContain(logo);
	});

	it("repeats the provided footer columns", async () => {
		const definition = await render({
			footer: { columns: ["Column A", "Column B"] },
		});
		const footer = asText(
			typeof definition.footer === "function"
				? definition.footer(1, 3, {
						width: 595.28,
						height: 841.89,
						orientation: "portrait",
					})
				: definition.footer,
		);

		expect(footer).toContain("Column A");
		expect(footer).toContain("Column B");
		expect(footer).toContain("Seite 1 von 3");
	});

	it("throws a descriptive error without invoice lines", async () => {
		await expect(render(undefined, { transaction: undefined })).rejects.toThrow(
			/requires at least one invoice line/,
		);
	});
});
