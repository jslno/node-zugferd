import { describe, expect, it } from "vitest";
import { basic } from "./index";

const ctx = {
	profile: basic,
	error(id: `BR-${string}` | `CII-SR-${string}`, message: string): never {
		throw new Error(message, { cause: id });
	},
};

describe("basic business rules", () => {
	it("accepts an invoice that satisfies the line and VAT rules", async () => {
		await expect(check(validInvoice())).resolves.toBeUndefined();
	});

	it.each(["S", "Z", "E", "AE", "K", "G", "O", "L", "M", "B"])(
		"accepts a %s invoice",
		async (category) => {
			await expect(check(categoryInvoice(category))).resolves.toBeUndefined();
		},
	);

	it("requires at least one invoice line", async () => {
		const missing = validInvoice();
		missing.transaction.line = undefined;
		await expect(check(missing)).rejects.toMatchObject({ cause: "BR-16" });

		const empty = validInvoice();
		empty.transaction.line = [];
		await expect(check(empty)).rejects.toMatchObject({ cause: "BR-16" });
	});

	it("requires a line identifier, quantity, unit, net amount, name, and net price", async () => {
		await expect(check(withLine({}))).rejects.toMatchObject({ cause: "BR-21" });
		await expect(
			check(withLine({ position: { lineId: "1" } })),
		).rejects.toMatchObject({ cause: "BR-22" });
		await expect(
			check(
				withLine({
					position: { lineId: "1" },
					delivery: { billedQuantity: { value: 1 } },
				}),
			),
		).rejects.toMatchObject({ cause: "BR-23" });
		await expect(
			check(
				withLine({
					position: { lineId: "1" },
					delivery: { billedQuantity: { value: 1, unitCode: "C62" } },
				}),
			),
		).rejects.toMatchObject({ cause: "BR-24" });
		await expect(
			check(
				withLine({
					position: { lineId: "1" },
					delivery: { billedQuantity: { value: 1, unitCode: "C62" } },
					billing: { itemTotals: { lineTotalAmount: 100 } },
				}),
			),
		).rejects.toMatchObject({ cause: "BR-25" });
		await expect(
			check(
				withLine({
					position: { lineId: "1" },
					item: { name: "Item" },
					delivery: { billedQuantity: { value: 1, unitCode: "C62" } },
					billing: { itemTotals: { lineTotalAmount: 100 } },
				}),
			),
		).rejects.toMatchObject({ cause: "BR-26" });
	});

	it("rejects a negative net or gross price and accepts zero", async () => {
		const negativeNet = validInvoice();
		negativeNet.transaction.line[0].priceDetails.netPrice.chargeAmount = -1;
		await expect(check(negativeNet)).rejects.toMatchObject({ cause: "BR-27" });

		const zeroNet = validInvoice();
		zeroNet.transaction.line[0].priceDetails.netPrice.chargeAmount = 0;
		await expect(check(zeroNet)).resolves.toBeUndefined();

		const negativeGross = validInvoice();
		negativeGross.transaction.line[0].priceDetails.grossPrice = {
			chargeAmount: -1,
		};
		await expect(check(negativeGross)).rejects.toMatchObject({
			cause: "BR-28",
		});

		const gross = validInvoice();
		gross.transaction.line[0].priceDetails.grossPrice = { chargeAmount: 120 };
		await expect(check(gross)).resolves.toBeUndefined();
	});

	it("checks the invoice line period dates", async () => {
		const empty = validInvoice();
		empty.transaction.line[0].billing.invoicePeriod = {};
		await expect(check(empty)).rejects.toMatchObject({ cause: "BR-CO-20" });

		const startOnly = validInvoice();
		startOnly.transaction.line[0].billing.invoicePeriod = {
			startDate: new Date("2020-03-05"),
		};
		await expect(check(startOnly)).resolves.toBeUndefined();

		const equal = validInvoice();
		equal.transaction.line[0].billing.invoicePeriod = {
			startDate: "20200305",
			endDate: new Date("2020-03-05"),
		};
		await expect(check(equal)).resolves.toBeUndefined();

		const reversed = validInvoice();
		reversed.transaction.line[0].billing.invoicePeriod = {
			startDate: new Date("2020-03-10"),
			endDate: "20200304",
		};
		await expect(check(reversed)).rejects.toMatchObject({ cause: "BR-30" });
	});

	it("requires a line allowance amount, reason, and matching reason code", async () => {
		const missingAmount = validInvoice();
		missingAmount.transaction.line[0].billing.allowances = [{}];
		await expect(check(missingAmount)).rejects.toMatchObject({
			cause: "BR-41",
		});

		const missingReason = validInvoice();
		missingReason.transaction.line[0].billing.allowances = [
			{ actualAmount: 1 },
		];
		await expect(check(missingReason)).rejects.toMatchObject({
			cause: "BR-42",
		});

		const mismatched = validInvoice();
		mismatched.transaction.line[0].billing.allowances = [
			{ actualAmount: 1, reason: "Freight", reasonCode: "95" },
		];
		await expect(check(mismatched)).rejects.toMatchObject({
			cause: "BR-CO-07",
		});

		const matched = validInvoice();
		matched.transaction.line[0].billing.allowances = [
			{ actualAmount: 1, reason: "Discount", reasonCode: "95" },
		];
		await expect(check(matched)).resolves.toBeUndefined();
	});

	it("requires a line charge amount, reason, and matching reason code", async () => {
		const missingAmount = validInvoice();
		missingAmount.transaction.line[0].billing.charges = [{}];
		await expect(check(missingAmount)).rejects.toMatchObject({
			cause: "BR-43",
		});

		const missingReason = validInvoice();
		missingReason.transaction.line[0].billing.charges = [{ actualAmount: 1 }];
		await expect(check(missingReason)).rejects.toMatchObject({
			cause: "BR-44",
		});

		const mismatched = validInvoice();
		mismatched.transaction.line[0].billing.charges = [
			{ actualAmount: 1, reason: "Discount", reasonCode: "FC" },
		];
		await expect(check(mismatched)).rejects.toMatchObject({
			cause: "BR-CO-08",
		});

		const matched = validInvoice();
		matched.transaction.line[0].billing.charges = [
			{ actualAmount: 1, reason: "Freight service", reasonCode: "FC" },
		];
		await expect(check(matched)).resolves.toBeUndefined();
	});

	it("limits line amounts to two decimal places", async () => {
		const lineNet = validInvoice();
		lineNet.transaction.line[0].billing.itemTotals.lineTotalAmount = "100.001";
		await expect(check(lineNet)).rejects.toMatchObject({ cause: "BR-DEC-23" });

		const allowance = validInvoice();
		allowance.transaction.line[0].billing.allowances = [
			{ actualAmount: "1.001", reason: "Discount" },
		];
		await expect(check(allowance)).rejects.toMatchObject({
			cause: "BR-DEC-24",
		});

		const allowanceBase = validInvoice();
		allowanceBase.transaction.line[0].billing.allowances = [
			{ actualAmount: 1, basisAmount: "10.001", reasonCode: "95" },
		];
		await expect(check(allowanceBase)).rejects.toMatchObject({
			cause: "BR-DEC-25",
		});

		const charge = validInvoice();
		charge.transaction.line[0].billing.charges = [
			{ actualAmount: "1.001", reason: "Freight" },
		];
		await expect(check(charge)).rejects.toMatchObject({ cause: "BR-DEC-27" });

		const chargeBase = validInvoice();
		chargeBase.transaction.line[0].billing.charges = [
			{ actualAmount: 1, basisAmount: "10.001", reasonCode: "FC" },
		];
		await expect(check(chargeBase)).rejects.toMatchObject({
			cause: "BR-DEC-28",
		});
	});

	it("requires an item attribute name and value", async () => {
		const missingValue = validInvoice();
		missingValue.transaction.line[0].item.attributes = [
			{ description: "Color" },
		];
		await expect(check(missingValue)).rejects.toMatchObject({
			cause: "BR-54",
		});

		const complete = validInvoice();
		complete.transaction.line[0].item.attributes = [
			{ description: "Color", value: "Red" },
		];
		await expect(check(complete)).resolves.toBeUndefined();
	});

	it("requires a scheme on item standard and classification identifiers", async () => {
		const globalId = validInvoice();
		globalId.transaction.line[0].item.globalId = "4012345001235";
		await expect(check(globalId)).rejects.toMatchObject({ cause: "BR-64" });

		const classification = validInvoice();
		classification.transaction.line[0].item.classification = {
			classCode: [{ value: "12345678" }],
		};
		await expect(check(classification)).rejects.toMatchObject({
			cause: "BR-65",
		});

		classification.transaction.line[0].item.classification.classCode = [
			{ value: "12345678", schemeId: "TST" },
		];
		await expect(check(classification)).resolves.toBeUndefined();
	});

	it("requires a VAT category on every line", async () => {
		const data = validInvoice();
		data.transaction.line[0].billing.vatBreakdown = { typeCode: "VAT" };
		await expect(check(data)).rejects.toMatchObject({ cause: "BR-CO-04" });
	});

	it("requires the document line total to equal the sum of line net amounts", async () => {
		const unbalanced = validInvoice();
		unbalanced.transaction.line.push(standardLine("2", 40));
		await expect(check(unbalanced)).rejects.toMatchObject({
			cause: "BR-CO-10",
		});

		const balanced = validInvoice();
		balanced.transaction.line = [standardLine("1", 60), standardLine("2", 40)];
		await expect(check(balanced)).resolves.toBeUndefined();
	});

	it("requires split payment invoices to be domestic Italian invoices without a standard rate", async () => {
		const foreign = validInvoice();
		foreign.transaction.line[0].billing.vatBreakdown.categoryCode = "B";
		await expect(check(foreign)).rejects.toMatchObject({ cause: "BR-B-01" });

		const mixed = validInvoice();
		mixed.transaction.contract.seller.postalAddress.countryCode = "IT";
		mixed.transaction.contract.buyer.postalAddress.countryCode = "IT";
		mixed.transaction.debit.allowances = [documentEntry("B", 0, 0, false)];
		await expect(check(mixed)).rejects.toMatchObject({ cause: "BR-B-02" });
	});

	it.each([
		["S", "BR-S-1"],
		["L", "BR-AF-1"],
		["M", "BR-AG-1"],
	] as const)(
		"requires at least one %s VAT breakdown (%s)",
		async (category, id) => {
			const data = categoryInvoice(category, (invoice) => {
				replaceBreakdown(invoice, category === "S" ? "Z" : "S", 0, 0, 0);
			});
			await expect(check(data)).rejects.toMatchObject({ cause: id });
		},
	);

	it("treats a standard-rated document allowance as a standard-rated VAT breakdown requirement", async () => {
		const data = categoryInvoice("Z");
		data.transaction.debit.allowances = [documentEntry("S", 0, 19, false)];
		await expect(check(data)).rejects.toMatchObject({ cause: "BR-S-1" });
	});

	it.each([
		["Z", "BR-Z-1"],
		["E", "BR-E-1"],
		["AE", "BR-AE-1"],
		["K", "BR-IC-1"],
		["G", "BR-G-1"],
		["O", "BR-O-1"],
	] as const)(
		"requires exactly one %s VAT breakdown (%s)",
		async (category, id) => {
			const missing = categoryInvoice(category, (invoice) => {
				replaceBreakdown(invoice, "S", 0, 0, 0);
			});
			await expect(check(missing)).rejects.toMatchObject({ cause: id });

			const duplicated = categoryInvoice(category);
			const group = duplicated.transaction.debit.vatBreakdown[0];
			duplicated.transaction.debit.vatBreakdown.push({ ...group });
			await expect(check(duplicated)).rejects.toMatchObject({ cause: id });
		},
	);

	it("treats a zero-rated document charge as a zero-rated VAT breakdown requirement", async () => {
		const data = validInvoice();
		data.transaction.debit.charges = [documentEntry("Z", 0, 0, true)];
		await expect(check(data)).rejects.toMatchObject({ cause: "BR-Z-1" });
	});

	it.each([
		["S", "BR-S-2", "clearSeller"],
		["Z", "BR-Z-2", "clearSeller"],
		["E", "BR-E-2", "clearSeller"],
		["L", "BR-AF-2", "clearSeller"],
		["M", "BR-AG-2", "clearSeller"],
		["G", "BR-G-2", "clearSeller"],
		["AE", "BR-AE-2", "clearBuyer"],
		["K", "BR-IC-2", "clearBuyer"],
		["O", "BR-O-2", "addSellerVat"],
	] as const)(
		"checks seller and buyer tax identifiers for %s (%s)",
		async (category, id, mutation) => {
			const data = categoryInvoice(category, (invoice) => {
				if (mutation === "clearSeller") clearSellerTaxIds(invoice);
				if (mutation === "clearBuyer") clearBuyerIds(invoice);
				if (mutation === "addSellerVat") {
					invoice.transaction.contract.seller.taxRegistration = {
						vat: { id: "DE123456789" },
					};
				}
			});
			await expect(check(data)).rejects.toMatchObject({ cause: id });
		},
	);

	it.each([
		["S", "BR-S-5", 0],
		["Z", "BR-Z-5", 19],
		["E", "BR-E-5", 19],
		["AE", "BR-AE-5", 19],
		["K", "BR-IC-5", 19],
		["G", "BR-G-5", 19],
		["O", "BR-O-5", 0],
		["L", "BR-AF-5", -1],
		["M", "BR-AG-5", -1],
	] as const)(
		"checks the invoiced item VAT rate for %s (%s)",
		async (category, id, lineRate) => {
			const data = categoryInvoice(category, (invoice) => {
				invoice.transaction.line[0].billing.vatBreakdown.rateApplicablePercent =
					lineRate;
			});
			await expect(check(data)).rejects.toMatchObject({ cause: id });
		},
	);

	it("accepts a zero IGIC or IPSI rate", async () => {
		for (const category of ["L", "M"]) {
			const data = categoryInvoice(category, (invoice) => {
				invoice.transaction.line[0].billing.vatBreakdown.rateApplicablePercent = 0;
				invoice.transaction.debit.vatBreakdown[0].rateApplicablePercent = 0;
				invoice.transaction.debit.vatBreakdown[0].calculatedAmount = 0;
				applyTax(invoice, 0);
			});
			await expect(check(data)).resolves.toBeUndefined();
		}
	});

	it.each([
		["S", "BR-S-8", 19],
		["Z", "BR-Z-8", 0],
		["E", "BR-E-8", 0],
		["AE", "BR-AE-8", 0],
		["K", "BR-IC-8", 0],
		["G", "BR-G-8", 0],
		["O", "BR-O-8", undefined],
		["L", "BR-AF-8", 7],
		["M", "BR-AG-8", 7],
	] as const)(
		"checks the VAT taxable amount for %s (%s)",
		async (category, id, rate) => {
			const data = categoryInvoice(category, (invoice) => {
				mismatchBasis(invoice, rate);
			});
			await expect(check(data)).rejects.toMatchObject({ cause: id });
		},
	);

	it("includes document allowances and charges in the standard-rated taxable amount", async () => {
		const data = validInvoice();
		data.transaction.line[0].billing.itemTotals.lineTotalAmount = 80;
		data.transaction.debit.documentTotals.lineTotalAmount = 80;
		data.transaction.debit.allowances = [documentEntry("S", 10, 19, false)];
		data.transaction.debit.charges = [documentEntry("S", 30, 19, true)];
		data.transaction.debit.documentTotals.allowanceTotalAmount = 10;
		data.transaction.debit.documentTotals.chargeTotalAmount = 30;
		await expect(check(data)).resolves.toBeUndefined();
	});

	it("matches each standard rate to its own VAT breakdown", async () => {
		const data = validInvoice();
		data.transaction.line = [
			standardLine("1", 60, 19),
			standardLine("2", 40, 7),
		];
		data.transaction.debit.vatBreakdown = [
			breakdown("S", 60, 19, round2(60 * 0.19)),
			breakdown("S", 40, 7, round2(40 * 0.07)),
		];
		applyTax(data, round2(60 * 0.19) + round2(40 * 0.07));
		await expect(check(data)).resolves.toBeUndefined();

		data.transaction.debit.vatBreakdown = [
			breakdown("S", 40, 19, round2(40 * 0.19)),
			breakdown("S", 60, 7, round2(60 * 0.07)),
		];
		applyTax(data, round2(40 * 0.19) + round2(60 * 0.07));
		await expect(check(data)).rejects.toMatchObject({ cause: "BR-S-8" });
	});

	it("rejects a line that is not outside the scope of VAT when a breakdown is", async () => {
		const data = categoryInvoice("B");
		replaceBreakdown(data, "O", 100, undefined, 0);
		data.transaction.debit.vatBreakdown[0].exemptionReason =
			"Not subject to VAT";
		await expect(check(data)).rejects.toMatchObject({ cause: "BR-O-12" });
	});
});

describe("basic VAT rules skipped on the extended profile", () => {
	const skipped: [string, () => Rec][] = [
		[
			"BR-S-1",
			() =>
				categoryInvoice("S", (invoice) =>
					replaceBreakdown(invoice, "Z", 0, 0, 0),
				),
		],
		[
			"BR-Z-1",
			() =>
				categoryInvoice("Z", (invoice) =>
					replaceBreakdown(invoice, "S", 0, 0, 0),
				),
		],
		[
			"BR-E-1",
			() =>
				categoryInvoice("E", (invoice) =>
					replaceBreakdown(invoice, "S", 0, 0, 0),
				),
		],
		[
			"BR-AE-1",
			() =>
				categoryInvoice("AE", (invoice) =>
					replaceBreakdown(invoice, "S", 0, 0, 0),
				),
		],
		[
			"BR-IC-1",
			() =>
				categoryInvoice("K", (invoice) =>
					replaceBreakdown(invoice, "S", 0, 0, 0),
				),
		],
		[
			"BR-G-1",
			() =>
				categoryInvoice("G", (invoice) =>
					replaceBreakdown(invoice, "S", 0, 0, 0),
				),
		],
		[
			"BR-O-1",
			() =>
				categoryInvoice("O", (invoice) =>
					replaceBreakdown(invoice, "S", 0, 0, 0),
				),
		],
		[
			"BR-AF-1",
			() =>
				categoryInvoice("L", (invoice) =>
					replaceBreakdown(invoice, "S", 0, 0, 0),
				),
		],
		[
			"BR-AG-1",
			() =>
				categoryInvoice("M", (invoice) =>
					replaceBreakdown(invoice, "S", 0, 0, 0),
				),
		],
		[
			"BR-O-2",
			() =>
				categoryInvoice("O", (invoice) => {
					invoice.transaction.contract.seller.taxRegistration = {
						vat: { id: "DE123456789" },
					};
				}),
		],
		[
			"BR-S-8",
			() => categoryInvoice("S", (invoice) => mismatchBasis(invoice, 19)),
		],
		[
			"BR-Z-8",
			() => categoryInvoice("Z", (invoice) => mismatchBasis(invoice, 0)),
		],
		[
			"BR-E-8",
			() => categoryInvoice("E", (invoice) => mismatchBasis(invoice, 0)),
		],
		[
			"BR-AE-8",
			() => categoryInvoice("AE", (invoice) => mismatchBasis(invoice, 0)),
		],
		[
			"BR-IC-8",
			() => categoryInvoice("K", (invoice) => mismatchBasis(invoice, 0)),
		],
		[
			"BR-G-8",
			() => categoryInvoice("G", (invoice) => mismatchBasis(invoice, 0)),
		],
		[
			"BR-O-8",
			() =>
				categoryInvoice("O", (invoice) => mismatchBasis(invoice, undefined)),
		],
		[
			"BR-AF-8",
			() => categoryInvoice("L", (invoice) => mismatchBasis(invoice, 7)),
		],
		[
			"BR-AG-8",
			() => categoryInvoice("M", (invoice) => mismatchBasis(invoice, 7)),
		],
		[
			"BR-O-12",
			() => {
				const data = categoryInvoice("B");
				replaceBreakdown(data, "O", 100, undefined, 0);
				data.transaction.debit.vatBreakdown[0].exemptionReason =
					"Not subject to VAT";
				return data;
			},
		],
	];

	it.each(skipped)(
		"skips %s on extended but still rejects it on basic",
		async (cause, build) => {
			await expect(check(build())).rejects.toMatchObject({ cause });
			expect(await causeOnExtended(build())).not.toBe(cause);
		},
	);

	it("still checks the standard-rated line VAT rate (BR-S-5) on extended", async () => {
		const data = categoryInvoice("S", (invoice) => {
			invoice.transaction.line[0].billing.vatBreakdown.rateApplicablePercent = 0;
		});
		expect(await causeOnExtended(data)).toBe("BR-S-5");
	});
});

function check(data: unknown) {
	return basic.rules?.(data as never, ctx as never);
}

function checkExtended(data: unknown) {
	return basic.rules?.(
		data as never,
		{ ...ctx, profile: { id: "extended" } } as never,
	);
}

async function causeOnExtended(data: Rec): Promise<unknown> {
	try {
		await checkExtended(data);
		return undefined;
	} catch (error) {
		return (error as { cause?: unknown }).cause;
	}
}

type Rec = Record<string, any>;

function validInvoice(): Rec {
	return {
		processControl: {
			applicationRecommendationInfo: {
				specificationIdentifier: "urn:factur-x.eu:1p0:basic",
			},
		},
		exchangedDocument: {
			invoiceNumber: "471102",
			invoiceTypeCode: "380",
			invoiceIssueDate: new Date("2020-03-05"),
		},
		transaction: {
			line: [standardLine("1", 100, 19)],
			contract: {
				seller: {
					name: "Lieferant GmbH",
					postalAddress: { countryCode: "DE" },
					taxRegistration: { vat: { id: "DE123456789" } },
				},
				buyer: {
					name: "Kunden AG",
					postalAddress: { countryCode: "DE" },
				},
			},
			debit: {
				invoiceCurrencyCode: "EUR",
				paymentTerms: { description: "Payable within 30 days" },
				vatBreakdown: [breakdown("S", 100, 19, 19)],
				documentTotals: {
					lineTotalAmount: 100,
					taxBasisTotalAmount: 100,
					taxTotalAmount: { value: 19, currency: "EUR" },
					grandTotalAmount: 119,
					duePayableAmount: 119,
				},
			},
		},
	};
}

function standardLine(id: string, net: number, rate = 19): Rec {
	return {
		position: { lineId: id },
		item: {
			name: "Item",
			globalId: { value: "4012345001235", schemeId: "0160" },
		},
		priceDetails: { netPrice: { chargeAmount: net } },
		delivery: { billedQuantity: { value: 1, unitCode: "C62" } },
		billing: {
			vatBreakdown: {
				typeCode: "VAT",
				categoryCode: "S",
				rateApplicablePercent: rate,
			},
			itemTotals: { lineTotalAmount: net },
		},
	};
}

function withLine(line: Rec): Rec {
	const data = validInvoice();
	data.transaction.line = [line];
	return data;
}

function breakdown(
	category: string,
	basis: number,
	rate: number | undefined,
	tax: number,
	exemptionReason?: string,
): Rec {
	return {
		calculatedAmount: tax,
		typeCode: "VAT",
		basisAmount: basis,
		categoryCode: category,
		...(rate === undefined ? {} : { rateApplicablePercent: rate }),
		...(exemptionReason ? { exemptionReason } : {}),
	};
}

function documentEntry(
	category: string,
	amount: number,
	rate: number,
	charge: boolean,
): Rec {
	return {
		actualAmount: amount,
		reason: charge ? "Freight service" : "Discount",
		reasonCode: charge ? "FC" : "95",
		categoryTradeTax: {
			typeCode: "VAT",
			categoryCode: category,
			rateApplicablePercent: rate,
		},
	};
}

const EXEMPTIONS: Record<string, string> = {
	E: "Exempt from VAT",
	AE: "Reverse charge",
	K: "Intra-community supply",
	G: "Export outside the EU",
	O: "Not subject to VAT",
};

function categoryInvoice(category: string, patch?: (data: Rec) => void): Rec {
	const data = validInvoice();
	const rate =
		category === "O"
			? undefined
			: category === "S"
				? 19
				: category === "L" || category === "M"
					? 7
					: 0;
	const tax = rate === undefined ? 0 : round2((100 * rate) / 100);
	data.transaction.line[0].billing.vatBreakdown = {
		typeCode: "VAT",
		categoryCode: category,
		...(rate === undefined ? {} : { rateApplicablePercent: rate }),
	};
	data.transaction.debit.vatBreakdown = [
		breakdown(category, 100, rate, tax, EXEMPTIONS[category]),
	];
	applyTotals(data, 100, tax);
	if (category === "O") clearSellerTaxIds(data);
	if (category === "AE" || category === "K") {
		data.transaction.contract.buyer.taxRegistration = {
			vat: { id: "FR123456789" },
		};
	}
	if (category === "B") {
		data.transaction.contract.seller.postalAddress.countryCode = "IT";
		data.transaction.contract.buyer.postalAddress.countryCode = "IT";
		data.transaction.contract.seller.taxRegistration.vat.id = "IT123456789";
	}
	patch?.(data);
	return data;
}

function replaceBreakdown(
	data: Rec,
	category: string,
	basis: number,
	rate: number | undefined,
	tax: number,
) {
	data.transaction.debit.vatBreakdown = [breakdown(category, basis, rate, tax)];
	applyTax(data, tax);
}

function mismatchBasis(data: Rec, rate: number | undefined) {
	const basis = 80;
	const tax = rate === undefined ? 0 : round2((basis * rate) / 100);
	const group = data.transaction.debit.vatBreakdown[0];
	group.basisAmount = basis;
	group.calculatedAmount = tax;
	applyTax(data, tax);
}

function applyTotals(data: Rec, taxBasis: number, tax: number) {
	data.transaction.debit.documentTotals.taxBasisTotalAmount = taxBasis;
	applyTax(data, tax);
}

function applyTax(data: Rec, tax: number) {
	const taxBasis = data.transaction.debit.documentTotals.taxBasisTotalAmount;
	data.transaction.debit.documentTotals.taxTotalAmount = {
		value: tax,
		currency: "EUR",
	};
	data.transaction.debit.documentTotals.grandTotalAmount = taxBasis + tax;
	data.transaction.debit.documentTotals.duePayableAmount = taxBasis + tax;
}

function clearSellerTaxIds(data: Rec) {
	data.transaction.contract.seller.taxRegistration = undefined;
	data.transaction.contract.seller.id = "seller-1";
}

function clearBuyerIds(data: Rec) {
	data.transaction.contract.buyer.taxRegistration = undefined;
	data.transaction.contract.buyer.organization = undefined;
}

function round2(value: number): number {
	return Math.round((value + Number.EPSILON) * 100) / 100;
}
