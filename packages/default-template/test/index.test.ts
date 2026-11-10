import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateSync } from "node:zlib";
import { minimum } from "@node-zugferd/minimum";
import {
	formatCurrency,
	PageSizes,
	StandardFonts,
} from "@node-zugferd/pdf-template";
import { templates } from "@node-zugferd/templates";
import { simpleData as basicWlData } from "@node-zugferd-test/test-utils/basic-wl/valid/simple.js";
import { simpleData as en16931Data } from "@node-zugferd-test/test-utils/en-16931/valid/simple.js";
import { invoiceData as minimumData } from "@node-zugferd-test/test-utils/minimum/valid/invoice.js";
import { zugferd } from "node-zugferd";
import { PDFParse } from "pdf-parse";
import { describe, expect, it } from "vitest";
import { defaultTemplate } from "../src";
import { invoicer } from "./invoicer";

describe("default-template", () => {
	const baseDir = dirname(fileURLToPath(import.meta.url));

	it("should generate invoice", async () => {
		for (const { profile, data } of [
			{
				profile: "minimum",
				data: minimumData,
			},
			{
				profile: "basic-wl",
				data: basicWlData,
			},
			{
				profile: "en-16931",
				data: en16931Data,
			},
		] as const) {
			const invoice = await invoicer.create(profile, data);

			const pdf = await (await invoice.toPDF(invoicer.template())).save();
			expect(pdf.byteLength).toBeGreaterThan(0);
			await writeFile(join(baseDir, `invoice.${profile}.pdf`), pdf);
		}
	});

	it("should apply custom fonts", async () => {
		const invoice = await invoicer.create("minimum", minimumData);
		const custom = await (
			await invoice.toPDF(
				invoicer.template({
					fonts: {
						font: StandardFonts.TimesRoman,
						bold: StandardFonts.TimesRomanBold,
						italic: StandardFonts.TimesRomanItalic,
					},
				}),
			)
		).save();
		const customSource = pdfSource(custom);
		expect(customSource).toContain("/BaseFont /Times-Roman");
		expect(customSource).toContain("/BaseFont /Times-Bold");
		expect(customSource).toContain("/BaseFont /Times-Italic");
		expect(customSource).not.toContain("/Helvetica");
	});

	it("should apply custom page size", async () => {
		const invoice = await invoicer.create("minimum", minimumData);
		const custom = await (
			await invoice.toPDF(
				invoicer.template({
					pageSize: PageSizes.A5,
				}),
			)
		).save();
		expect(mediaBox(custom)).toEqual(rounded(PageSizes.A5));

		const letter = zugferd({
			profiles: [minimum],
			plugins: [
				templates({
					templates: {
						default: defaultTemplate({
							defaultPageSize: PageSizes.Letter,
						}),
					},
					defaultTemplate: "default",
				}),
			],
		});
		const fallback = await (
			await (
				await letter.create("minimum", minimumData)
			).toPDF(letter.template())
		).save();
		expect(mediaBox(fallback)).toEqual(rounded(PageSizes.Letter));
	});

	it("should reject an unknown locale", async () => {
		const invoice = await invoicer.create("en-16931", en16931Data);
		await expect(
			invoice.toPDF(
				invoicer.template({
					locale: "xx" as "en",
				}),
			),
		).rejects.toThrow(/Unsupported locale/);
	});

	it("should contain fiscal mandatory information", async () => {
		const locale = "en";
		const countryName = (code: string) =>
			new Intl.DisplayNames(locale, { type: "region" }).of(code) ?? code;
		const currencyName = (code: string) => {
			const name = new Intl.DisplayNames(locale, { type: "currency" }).of(code);
			return name && name.toUpperCase() !== code.toUpperCase()
				? `${name} (${code})`
				: code;
		};
		const invoiceDate = (value: Date | string | number) => {
			const date = value instanceof Date ? value : new Date(value);
			return date.toLocaleDateString(locale, {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				timeZone: "UTC",
			});
		};
		const money = (amount: number | string) =>
			formatCurrency(Number(amount), { currency: "EUR", locale });
		const percent = (rate: number | string) =>
			new Intl.NumberFormat(locale, {
				style: "percent",
				maximumFractionDigits: 2,
			}).format(Number(rate) / 100);
		const quantity = (value: number | string, unit: string) =>
			`${new Intl.NumberFormat(locale, { maximumFractionDigits: 4 }).format(Number(value))} ${unit}`;
		const textOf = (value: string | null | undefined) =>
			value ? value : undefined;
		const addressParts = (address: {
			line1?: string | null;
			line2?: string | null;
			line3?: string | null;
			postCode?: string | null;
			city?: string | null;
			countryCode: string;
		}) =>
			[
				textOf(address.line1),
				textOf(address.line2),
				textOf(address.line3),
				[textOf(address.postCode), textOf(address.city)]
					.filter(Boolean)
					.join(" "),
				countryName(address.countryCode),
			].filter((part): part is string => !!part);
		const fields = (...values: Array<string | null | undefined>) =>
			values.filter(
				(value): value is string =>
					typeof value === "string" && value.length > 0,
			);
		const vatFields = (
			rows: ReadonlyArray<{
				rateApplicablePercent?: number | string | null;
				basisAmount: number | string;
				calculatedAmount: number | string;
			}>,
		) =>
			rows.flatMap((row) => [
				row.rateApplicablePercent == null
					? undefined
					: percent(row.rateApplicablePercent),
				`VAT base: ${money(row.basisAmount)}`,
				money(row.calculatedAmount),
			]);

		const minimumDocument = defined(minimumData.exchangedDocument);
		const minimumTransaction = defined(minimumData.transaction);
		const minimumContract = defined(minimumTransaction.contract);
		const minimumDebit = defined(minimumTransaction.debit);
		const minimumSeller = minimumContract.seller;
		const minimumTotals = minimumDebit.documentTotals;
		const basicWlDocument = defined(basicWlData.exchangedDocument);
		const basicWlTransaction = defined(basicWlData.transaction);
		const basicWlContract = defined(basicWlTransaction.contract);
		const basicWlDebit = defined(basicWlTransaction.debit);
		const basicWlSeller = basicWlContract.seller;
		const basicWlBuyer = basicWlContract.buyer;
		const basicWlTotals = basicWlDebit.documentTotals;
		const en16931Document = defined(en16931Data.exchangedDocument);
		const en16931Transaction = defined(en16931Data.transaction);
		const en16931Contract = defined(en16931Transaction.contract);
		const en16931Debit = defined(en16931Transaction.debit);
		const en16931Seller = en16931Contract.seller;
		const en16931Buyer = en16931Contract.buyer;
		const en16931Totals = en16931Debit.documentTotals;

		const expected = {
			// Minimum has no buyer address, line items, or VAT breakdown.
			minimum: fields(
				minimumDocument.invoiceNumber,
				invoiceDate(defined(minimumDocument.invoiceIssueDate)),
				minimumSeller.name,
				...addressParts(minimumSeller.postalAddress),
				minimumSeller.taxRegistration?.vat?.id,
				minimumContract.buyer.name,
				currencyName(minimumDebit.invoiceCurrencyCode),
				money(minimumTotals.taxBasisTotalAmount),
				minimumTotals.taxTotalAmount
					? money(minimumTotals.taxTotalAmount.value)
					: undefined,
			),
			// Basic WL adds postal addresses and the VAT breakdown. Lines start at Basic.
			"basic-wl": fields(
				basicWlDocument.invoiceNumber,
				invoiceDate(defined(basicWlDocument.invoiceIssueDate)),
				basicWlSeller.name,
				...addressParts(basicWlSeller.postalAddress),
				basicWlSeller.taxRegistration?.vat?.id,
				basicWlBuyer.name,
				...addressParts(basicWlBuyer.postalAddress),
				currencyName(basicWlDebit.invoiceCurrencyCode),
				...vatFields(basicWlDebit.vatBreakdown),
				money(basicWlTotals.taxBasisTotalAmount),
				basicWlTotals.taxTotalAmount
					? money(basicWlTotals.taxTotalAmount.value)
					: undefined,
			),
			"en-16931": fields(
				en16931Document.invoiceNumber,
				invoiceDate(defined(en16931Document.invoiceIssueDate)),
				en16931Seller.name,
				...addressParts(en16931Seller.postalAddress),
				en16931Seller.taxRegistration?.vat?.id,
				en16931Buyer.name,
				...addressParts(en16931Buyer.postalAddress),
				currencyName(en16931Debit.invoiceCurrencyCode),
				...(en16931Transaction.line ?? []).flatMap((line) => {
					const billed = line.delivery?.billedQuantity;
					const charge = line.priceDetails.netPrice?.chargeAmount;
					return [
						billed?.value != null && billed.unitCode
							? quantity(billed.value, billed.unitCode)
							: undefined,
						charge == null ? undefined : money(charge),
					];
				}),
				...vatFields(en16931Debit.vatBreakdown),
				money(en16931Totals.taxBasisTotalAmount),
				en16931Totals.taxTotalAmount
					? money(en16931Totals.taxTotalAmount.value)
					: undefined,
			),
		};

		for (const profile of ["minimum", "basic-wl", "en-16931"] as const) {
			const text = await pdfText(
				await readFile(join(baseDir, `invoice.${profile}.pdf`)),
			);
			for (const value of expected[profile]) {
				expect(text, `${profile} should show ${value}`).toContain(
					normalize(value),
				);
			}
		}
	});
});

const defined = <T>(value: T | null | undefined): NonNullable<T> => {
	if (value == null) {
		throw new Error("Expected invoice field to be present");
	}
	return value;
};

const normalize = (value: string) =>
	value
		.replace(/[\u00a0\u202f]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

const pdfSource = (pdf: Uint8Array) => {
	const raw = Buffer.from(pdf).toString("latin1");
	const streams = raw.matchAll(/stream\r?\n([\s\S]*?)\r?\nendstream/g);
	let inflated = "";
	for (const stream of streams) {
		const body = stream[1];
		if (!body) continue;
		try {
			inflated += inflateSync(Buffer.from(body, "latin1")).toString("latin1");
		} catch {
			// Leave non-Flate streams out. Page size and fonts live in the compressed ones.
		}
	}
	return inflated;
};

const rounded = (size: { width: number; height: number }) => ({
	width: Math.round(size.width),
	height: Math.round(size.height),
});

const mediaBox = (pdf: Uint8Array) => {
	const match =
		/\/MediaBox\s*\[\s*0(?:\.0+)?\s+0(?:\.0+)?\s+([\d.]+)\s+([\d.]+)\s*\]/.exec(
			pdfSource(pdf),
		);
	if (!match?.[1] || !match[2]) {
		throw new Error("PDF page size was not found");
	}
	return { width: Number(match[1]), height: Number(match[2]) };
};

const pdfText = async (data: Uint8Array) => {
	const parser = new PDFParse({ data });
	try {
		const parsed = await parser.getText();
		return normalize(parsed.text);
	} finally {
		await parser.destroy();
	}
};
