import { describe, expect, it } from "vitest";
import { extended } from "./index";
import { enforceExtendedRules } from "./rules";

const ctx = {
	profile: extended,
	error(id: `BR-${string}` | `CII-SR-${string}`, message: string): never {
		throw new Error(message, { cause: id });
	},
};

const CATEGORIES = [
	["S", "BR-FXEXT-S-01", "BR-FXEXT-S-08b"],
	["Z", "BR-FXEXT-Z-01", "BR-FXEXT-Z-08b"],
	["E", "BR-FXEXT-E-01", "BR-FXEXT-E-08b"],
	["AE", "BR-FXEXT-AE-01", "BR-FXEXT-AE-08b"],
	["K", "BR-FXEXT-IC-01", "BR-FXEXT-IC-08b"],
	["G", "BR-FXEXT-G-01", "BR-FXEXT-G-08b"],
	["O", "BR-FXEXT-O-01", "BR-FXEXT-O-08b"],
	["L", "BR-FXEXT-AF-01", "BR-FXEXT-AF-08b"],
	["M", "BR-FXEXT-AG-01", "BR-FXEXT-AG-08b"],
] as const;

describe("extended business rules", () => {
	it("accepts an invoice that satisfies the parent and extended rules", async () => {
		await expect(check(validInvoice())).resolves.toBeUndefined();
	});

	it("accepts coded notes, attributes, and included products", async () => {
		const data = validInvoice();
		data.exchangedDocument.invoiceNotes = [
			{
				subjectCode: "AAA",
				contentCode: "AAA",
				content: "Goods item description",
			},
		];
		data.transaction.line[0].item.attributes = [
			{ description: "Weight", value: "1", typeCode: "A" },
		];
		data.transaction.line[0].item.includedReferencedProducts = [
			{
				name: "Included",
				lineTotalAmount: 50,
				billing: {
					vatBreakdown: { categoryCode: "S", rateApplicablePercent: 19 },
					itemTotals: { lineTotalAmount: 50 },
				},
			},
		];
		await expect(check(data)).resolves.toBeUndefined();
	});

	it("reports extended-only failures from the composed profile", async () => {
		const subtype = validInvoice();
		subtype.transaction.line[0].position.lineStatusReasonCode = "NOPE";
		await expect(check(subtype)).rejects.toMatchObject({
			cause: "BR-FXEXT-05",
		});

		const note = validInvoice();
		note.exchangedDocument.invoiceNotes = [{ subjectCode: "AAA" }];
		await expect(check(note)).rejects.toMatchObject({ cause: "BR-FXEXT-01" });

		const attribute = validInvoice();
		attribute.transaction.line[0].item.attributes = [
			{ description: "Color", value: "Red", typeCode: "NOT-A-CODE" },
		];
		await expect(check(attribute)).rejects.toMatchObject({
			cause: "BR-FXEXT-04",
		});

		const bothValues = validInvoice();
		bothValues.transaction.line[0].item.attributes = [
			{
				description: "Weight",
				value: "1",
				valueMeasure: { value: 1, unitCode: "KGM" },
			},
		];
		await expect(check(bothValues)).rejects.toMatchObject({
			cause: "BR-FXEXT-BR-54-2",
		});

		const missingParent = validInvoice();
		missingParent.transaction.line[0].position.lineStatusReasonCode = "DETAIL";
		missingParent.transaction.line[0].position.parentLineId = "999";
		await expect(check(missingParent)).rejects.toMatchObject({
			cause: "BR-FXEXT-11",
		});
	});
});

describe("extended rule checks", () => {
	it("requires category, quantity, unit, net amount, and net price on detail lines", () => {
		expectRule(withLine({ position: { lineId: "1" } }), "BR-FXEXT-CO-04");
		expectRule(
			withLine({
				position: { lineId: "1" },
				billing: { vatBreakdown: { categoryCode: "S" } },
			}),
			"BR-FXEXT-BR-22",
		);
		expectRule(
			withLine({
				position: { lineId: "1" },
				billing: { vatBreakdown: { categoryCode: "S" } },
				delivery: { billedQuantity: { value: 1 } },
			}),
			"BR-FXEXT-BR-23",
		);
		expectRule(
			withLine({
				position: { lineId: "1" },
				billing: { vatBreakdown: { categoryCode: "S" } },
				delivery: { billedQuantity: { value: 1, unitCode: "C62" } },
			}),
			"BR-FXEXT-BR-24",
		);
		const missingPrice = validInvoice();
		missingPrice.transaction.line[0].priceDetails = undefined;
		expectRule(missingPrice, "BR-FXEXT-BR-26");
	});

	it("accepts an unspecified subtype and DETAIL, and rejects any other subtype", () => {
		expectPass(validInvoice());
		const detail = validInvoice();
		detail.transaction.line[0].position.lineStatusReasonCode = "DETAIL";
		expectPass(detail);
		const invalid = validInvoice();
		invalid.transaction.line[0].position.lineStatusReasonCode = "NOPE";
		expectRule(invalid, "BR-FXEXT-05");
	});

	it("keeps price, quantity, unit, VAT, and net amount optional for GROUP and INFORMATION lines", () => {
		expectPass(structuralInvoice("GROUP"));
		expectPass(structuralInvoice("INFORMATION"));

		const grouped = structuralInvoice("GROUP");
		grouped.transaction.line[0].billing = {
			vatBreakdown: { categoryCode: "S", rateApplicablePercent: 19 },
		};
		grouped.transaction.debit.vatBreakdown = [];
		expectPass(grouped);
	});

	it("requires a subtype when a parent line is set, and a parent that names another line", () => {
		const missingSubtype = validInvoice();
		missingSubtype.transaction.line[0].position.parentLineId = "2";
		expectRule(missingSubtype, "BR-FXEXT-06");

		const missingParent = validInvoice();
		missingParent.transaction.line[0].position.lineStatusReasonCode = "DETAIL";
		missingParent.transaction.line[0].position.parentLineId = "999";
		expectRule(missingParent, "BR-FXEXT-11");

		const self = validInvoice();
		self.transaction.line[0].position.lineStatusReasonCode = "DETAIL";
		self.transaction.line[0].position.parentLineId = "1";
		expectRule(self, "BR-FXEXT-11");
	});

	it("sums a GROUP line from its direct DETAIL and GROUP children", () => {
		expectPass(groupedInvoice(100));

		const wrong = groupedInvoice(80);
		expectRule(wrong, "BR-FXEXT-08");
	});

	it("requires every descendant GROUP line to carry a net amount", () => {
		const data = validInvoice();
		data.transaction.line = [
			groupLine("1", 100),
			groupLine("2", 100, "1"),
			groupLine("3", undefined, "2"),
			detailLine("4", 100, "2"),
		];
		expectRule(data, "BR-FXEXT-12");
	});

	it("leaves included products out of the invoice calculation", () => {
		const data = validInvoice();
		data.transaction.line[0].item.includedReferencedProducts = [
			{
				name: "Included",
				lineTotalAmount: 50,
				billing: {
					vatBreakdown: { categoryCode: "S", rateApplicablePercent: 19 },
					itemTotals: { lineTotalAmount: 50 },
				},
			},
		];
		expectPass(data);
	});

	it("requires an attribute name or code, and either a value or a measure", () => {
		expectRule(withAttribute({}), "BR-FXEXT-BR-54-1");
		expectRule(withAttribute({ typeCode: "A" }), "BR-FXEXT-BR-54-2");
		expectRule(withAttribute({ description: "Color" }), "BR-FXEXT-BR-54-2");
		expectRule(
			withAttribute({
				description: "Weight",
				value: "1",
				valueMeasure: { value: 1, unitCode: "KGM" },
			}),
			"BR-FXEXT-BR-54-2",
		);
		expectPass(
			withAttribute({
				typeCode: "A",
				valueMeasure: { value: 1, unitCode: "KGM" },
			}),
		);
		expectPass(withAttribute({ description: "Color", value: "Red" }));
	});

	it("rejects an item attribute code outside UNTDED 6313", () => {
		expectRule(
			withAttribute({
				description: "Color",
				value: "Red",
				typeCode: "NOT-A-CODE",
			}),
			"BR-FXEXT-04",
		);
		expectPass(
			withAttribute({ description: "Weight", value: "1", typeCode: "A" }),
		);
	});

	it("checks invoice and line free text when a subject code is present", () => {
		expectRule(withInvoiceNote({ subjectCode: "AAA" }), "BR-FXEXT-01");
		expectPass(withInvoiceNote({ subjectCode: "AAA", contentCode: "AAA" }));
		expectPass(
			withInvoiceNote({ subjectCode: "AAA", content: "A free text note" }),
		);
		expectPass(
			withInvoiceNote({
				subjectCode: "AAA",
				contentCode: "AAA",
				content: "Goods item description",
			}),
		);
		expectRule(
			withInvoiceNote({
				subjectCode: "AAA",
				contentCode: "AAA",
				content: "Payment term",
			}),
			"BR-FXEXT-01",
		);

		expectRule(withLineNote({ subjectCode: "AAA" }), "BR-FXEXT-02");
		expectPass(withLineNote({ subjectCode: "AAA", contentCode: "AAA" }));
		expectPass(withLineNote({ subjectCode: "AAA", content: "Stored as text" }));
		expectRule(
			withLineNote({
				subjectCode: "AAA",
				contentCode: "AAA",
				content: "Payment term",
			}),
			"BR-FXEXT-02",
		);
	});

	it("requires a document or line charge reason and a matching reason code", () => {
		const document = validInvoice();
		document.transaction.debit.charges = [{ actualAmount: 0 }];
		expectRule(document, "BR-FXEXT-CO-22");

		const mismatchedDocument = validInvoice();
		mismatchedDocument.transaction.debit.charges = [
			{ reason: "Freight service", reasonCode: "VAT" },
		];
		expectRule(mismatchedDocument, "BR-FXEXT-CO-06");
		expectPass(
			withDocumentCharge({ reason: "Freight service", reasonCode: "FC" }),
		);
		expectPass(
			withDocumentCharge({ reason: "Value added tax", reasonCode: "VAT" }),
		);
		expectPass(withDocumentCharge({ reasonCode: "FC" }));

		const line = validInvoice();
		line.transaction.line[0].billing.charges = [{ actualAmount: 0 }];
		expectRule(line, "BR-FXEXT-CO-24");

		const mismatchedLine = validInvoice();
		mismatchedLine.transaction.line[0].billing.charges = [
			{ reason: "Not a charge", reasonCode: "FC" },
		];
		expectRule(mismatchedLine, "BR-FXEXT-CO-08");
		expectPass(
			withLineCharge({ reason: "Value added tax", reasonCode: "VAT" }),
		);
	});

	it("allows only a VAT identifier on the extended business partners", () => {
		for (const assign of partySetters()) {
			const data = validInvoice();
			assign(data);
			expectRule(data, "BR-FXEXT-03");
		}

		const allowed = validInvoice();
		allowed.transaction.contract.salesAgent = {
			taxRegistration: { vat: { id: "DE111111111" } },
		};
		expectPass(allowed);
	});

	it("applies the extended total tolerances and includes logistics and third-party amounts", () => {
		const lines = validInvoice();
		lines.transaction.line = [standardLine("1", 50), standardLine("2", 50)];
		lines.transaction.debit.documentTotals.lineTotalAmount = 100.02;
		expectPass(lines);
		lines.transaction.debit.documentTotals.lineTotalAmount = 100.03;
		expectRule(lines, "BR-FXEXT-CO-10");

		const allowance = balancedAllowance(10);
		expectPass(allowance);
		allowance.transaction.debit.documentTotals.allowanceTotalAmount = 10.02;
		expectRule(allowance, "BR-FXEXT-CO-11");

		const charges = logisticsInvoice(5);
		charges.transaction.debit.documentTotals.chargeTotalAmount = 5.01;
		expectPass(charges);
		charges.transaction.debit.documentTotals.chargeTotalAmount = 5.03;
		expectRule(charges, "BR-FXEXT-CO-12");

		const basis = validInvoice();
		basis.transaction.debit.documentTotals.taxBasisTotalAmount = 100.01;
		basis.transaction.debit.documentTotals.grandTotalAmount = 119.01;
		basis.transaction.debit.documentTotals.duePayableAmount = 119.01;
		expectPass(basis);
		basis.transaction.debit.documentTotals.taxBasisTotalAmount = 100.05;
		expectRule(basis, "BR-FXEXT-CO-13");

		const grand = validInvoice();
		grand.transaction.debit.documentTotals.grandTotalAmount = 119.01;
		grand.transaction.debit.documentTotals.duePayableAmount = 119.01;
		expectPass(grand);
		grand.transaction.debit.documentTotals.grandTotalAmount = 119.02;
		expectRule(grand, "BR-FXEXT-CO-15");

		const foreign = validInvoice();
		foreign.transaction.debit.documentTotals.taxTotalAmount = {
			value: 19,
			currency: "USD",
		};
		foreign.transaction.debit.documentTotals.grandTotalAmount = 100;
		foreign.transaction.debit.documentTotals.duePayableAmount = 100;
		expectPass(foreign);
		foreign.transaction.debit.documentTotals.grandTotalAmount = 119;
		expectRule(foreign, "BR-FXEXT-CO-15");

		const due = validInvoice();
		due.transaction.debit.documentTotals.prepaidAmount = 10;
		due.transaction.debit.documentTotals.roundingAmount = 0.5;
		due.transaction.debit.financialAdjustments = [{ actualAmount: 2 }];
		due.transaction.debit.documentTotals.duePayableAmount = 111.5;
		expectPass(due);
		due.transaction.debit.documentTotals.duePayableAmount = 111;
		expectRule(due, "BR-FXEXT-CO-16");
	});

	it.each(CATEGORIES)("requires a %s VAT breakdown (%s)", (code, presence) => {
		const data = validInvoice();
		data.transaction.line[0].billing.vatBreakdown.categoryCode = code;
		data.transaction.debit.vatBreakdown = [];
		expectRule(data, presence);
	});

	it("requires a breakdown when an allowance, charge, or logistics fee uses the category", () => {
		const allowance = validInvoice();
		allowance.transaction.line[0].billing.vatBreakdown.categoryCode = "Z";
		allowance.transaction.debit.vatBreakdown = [breakdown("Z", 100, 0, 0)];
		allowance.transaction.debit.documentTotals.taxTotalAmount = {
			value: 0,
			currency: "EUR",
		};
		allowance.transaction.debit.documentTotals.grandTotalAmount = 100;
		allowance.transaction.debit.documentTotals.duePayableAmount = 100;
		allowance.transaction.debit.allowances = [
			{
				actualAmount: 0,
				categoryTradeTax: { categoryCode: "S", rateApplicablePercent: 19 },
			},
		];
		allowance.transaction.debit.documentTotals.allowanceTotalAmount = 0;
		expectRule(allowance, "BR-FXEXT-S-01");

		const charge = validInvoice();
		charge.transaction.line[0].billing.vatBreakdown.categoryCode = "Z";
		charge.transaction.debit.vatBreakdown = [breakdown("Z", 100, 0, 0)];
		charge.transaction.debit.documentTotals.taxTotalAmount = {
			value: 0,
			currency: "EUR",
		};
		charge.transaction.debit.documentTotals.grandTotalAmount = 100;
		charge.transaction.debit.documentTotals.duePayableAmount = 100;
		charge.transaction.debit.charges = [
			{
				actualAmount: 0,
				reason: "Freight service",
				categoryTradeTax: { categoryCode: "S", rateApplicablePercent: 19 },
			},
		];
		charge.transaction.debit.documentTotals.chargeTotalAmount = 0;
		expectRule(charge, "BR-FXEXT-S-01");

		const logistics = validInvoice();
		logistics.transaction.line[0].billing.vatBreakdown.categoryCode = "Z";
		logistics.transaction.debit.vatBreakdown = [breakdown("Z", 100, 0, 0)];
		logistics.transaction.debit.documentTotals.taxTotalAmount = {
			value: 0,
			currency: "EUR",
		};
		logistics.transaction.debit.documentTotals.grandTotalAmount = 100;
		logistics.transaction.debit.documentTotals.duePayableAmount = 100;
		logistics.transaction.debit.logisticsServiceFees = [
			{
				feeAmount: 0,
				appliedTradeTax: { categoryCode: "S", rateApplicablePercent: 19 },
			},
		];
		logistics.transaction.debit.documentTotals.chargeTotalAmount = 0;
		expectRule(logistics, "BR-FXEXT-S-01");
	});

	it.each(CATEGORIES)(
		"checks the %s taxable amount (%s)",
		(code, _presence, sumId) => {
			const data = validInvoice();
			data.transaction.line[0].billing.vatBreakdown.categoryCode = code;
			data.transaction.debit.vatBreakdown[0].categoryCode = code;
			data.transaction.debit.vatBreakdown[0].basisAmount = 90;
			expectRule(data, sumId);
		},
	);

	it("accepts a VAT basis split by exemption reason and rejects a basis that matches neither sum", () => {
		const data = validInvoice();
		data.transaction.line = [
			exemptLine("1", 60, "Intra-community"),
			standardLine("2", 40),
		];
		data.transaction.debit.vatBreakdown = [
			breakdown("S", 60, 19, 11.4, "Intra-community"),
			breakdown("S", 40, 19, 7.6),
		];
		expectPass(data);

		data.transaction.debit.vatBreakdown[0].basisAmount = 10;
		data.transaction.debit.vatBreakdown[0].calculatedAmount = 1.9;
		expectRule(data, "BR-FXEXT-S-08b");
	});

	it("includes logistics fees in the VAT basis and checks the standard-rated tax amount", () => {
		const data = logisticsInvoice(5);
		expectPass(data);
		data.transaction.debit.vatBreakdown[0].basisAmount = 100;
		data.transaction.debit.vatBreakdown[0].calculatedAmount = 19;
		expectRule(data, "BR-FXEXT-S-08b");

		const tax = validInvoice();
		tax.transaction.debit.vatBreakdown[0].calculatedAmount = 20;
		expectRule(tax, "BR-FXEXT-S-09b");
	});
});

function check(data: unknown) {
	return extended.rules?.(data as never, ctx as never);
}

function direct(data: unknown) {
	enforceExtendedRules(data, ctx);
}

function expectRule(data: unknown, id: string) {
	expect(() => direct(data)).toThrowError(
		expect.objectContaining({ cause: id }),
	);
}

function expectPass(data: unknown) {
	expect(() => direct(data)).not.toThrow();
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
			line: [standardLine("1", 100)],
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

function detailLine(id: string, net: number, parent?: string): Rec {
	const line = standardLine(id, net);
	line.position.lineStatusReasonCode = "DETAIL";
	if (parent) line.position.parentLineId = parent;
	return line;
}

function exemptLine(id: string, net: number, reason: string): Rec {
	const line = standardLine(id, net);
	line.billing.vatBreakdown.exemptionReason = reason;
	return line;
}

function groupLine(id: string, net: number | undefined, parent?: string): Rec {
	return {
		position: {
			lineId: id,
			lineStatusReasonCode: "GROUP",
			...(parent ? { parentLineId: parent } : {}),
		},
		item: { name: "Group" },
		...(net === undefined
			? {}
			: { billing: { itemTotals: { lineTotalAmount: net } } }),
	};
}

function withLine(line: Rec): Rec {
	const data = validInvoice();
	data.transaction.line = [line];
	return data;
}

function structuralInvoice(kind: "GROUP" | "INFORMATION"): Rec {
	const data = validInvoice();
	data.transaction.line = [
		{
			position: { lineId: "1", lineStatusReasonCode: kind },
			item: { name: "Group" },
		},
	];
	data.transaction.debit.vatBreakdown = [breakdown("S", 0, 0, 0)];
	data.transaction.debit.documentTotals = {
		lineTotalAmount: 0,
		taxBasisTotalAmount: 0,
		taxTotalAmount: { value: 0, currency: "EUR" },
		grandTotalAmount: 0,
		duePayableAmount: 0,
	};
	return data;
}

function groupedInvoice(groupAmount: number): Rec {
	const data = validInvoice();
	const information = {
		position: {
			lineId: "3",
			lineStatusReasonCode: "INFORMATION",
			parentLineId: "1",
		},
		item: { name: "Note" },
		billing: { itemTotals: { lineTotalAmount: 40 } },
	};
	data.transaction.line = [
		groupLine("1", groupAmount),
		detailLine("2", 100, "1"),
		information,
	];
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

function withAttribute(attribute: Rec): Rec {
	const data = validInvoice();
	data.transaction.line[0].item.attributes = [attribute];
	return data;
}

function withInvoiceNote(note: Rec): Rec {
	const data = validInvoice();
	data.exchangedDocument.invoiceNotes = [note];
	return data;
}

function withLineNote(note: Rec): Rec {
	const data = validInvoice();
	data.transaction.line[0].position.includedNote = [note];
	return data;
}

function withDocumentCharge(charge: Rec): Rec {
	const data = validInvoice();
	data.transaction.debit.charges = [charge];
	return data;
}

function withLineCharge(charge: Rec): Rec {
	const data = validInvoice();
	data.transaction.line[0].billing.charges = [charge];
	return data;
}

function balancedAllowance(amount: number): Rec {
	const data = validInvoice();
	data.transaction.debit.allowances = [
		{
			actualAmount: amount,
			categoryTradeTax: { categoryCode: "S", rateApplicablePercent: 19 },
		},
	];
	data.transaction.debit.documentTotals.allowanceTotalAmount = amount;
	data.transaction.debit.documentTotals.taxBasisTotalAmount = 100 - amount;
	data.transaction.debit.vatBreakdown = [
		breakdown("S", 100 - amount, 19, 17.1),
	];
	data.transaction.debit.documentTotals.taxTotalAmount = {
		value: 17.1,
		currency: "EUR",
	};
	data.transaction.debit.documentTotals.grandTotalAmount = 107.1;
	data.transaction.debit.documentTotals.duePayableAmount = 107.1;
	return data;
}

function logisticsInvoice(fee: number): Rec {
	const data = validInvoice();
	const basis = 100 + fee;
	const tax = Math.round(basis * 19) / 100;
	data.transaction.debit.logisticsServiceFees = [
		{
			feeAmount: fee,
			appliedTradeTax: { categoryCode: "S", rateApplicablePercent: 19 },
		},
	];
	data.transaction.debit.documentTotals.chargeTotalAmount = fee;
	data.transaction.debit.documentTotals.taxBasisTotalAmount = basis;
	data.transaction.debit.vatBreakdown = [breakdown("S", basis, 19, tax)];
	data.transaction.debit.documentTotals.taxTotalAmount = {
		value: tax,
		currency: "EUR",
	};
	data.transaction.debit.documentTotals.grandTotalAmount = basis + tax;
	data.transaction.debit.documentTotals.duePayableAmount = basis + tax;
	return data;
}

function partySetters(): Array<(data: Rec) => void> {
	const local = { taxRegistration: { local: { id: "L1" } } };
	return [
		(data) => {
			data.transaction.line[0].delivery.recipient = local;
		},
		(data) => {
			data.transaction.line[0].delivery.deviatingFinalRecipient = local;
		},
		(data) => {
			data.transaction.contract.salesAgent = local;
		},
		(data) => {
			data.transaction.contract.buyerTaxRepresentative = local;
		},
		(data) => {
			data.transaction.contract.deviatingEndUser = local;
		},
		(data) => {
			data.transaction.contract.buyerAgent = local;
		},
		(data) => {
			data.transaction.delivery = { recipient: local };
		},
		(data) => {
			data.transaction.delivery = { finalRecipient: local };
		},
		(data) => {
			data.transaction.delivery = { deviatingSender: local };
		},
		(data) => {
			data.transaction.debit.invoicer = local;
		},
		(data) => {
			data.transaction.debit.invoicee = local;
		},
		(data) => {
			data.transaction.debit.payee = local;
		},
		(data) => {
			data.transaction.debit.payer = local;
		},
		(data) => {
			data.transaction.debit.paymentTerms = {
				description: "Payable within 30 days",
				payeePerPayment: [local],
			};
		},
	];
}
