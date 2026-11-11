import { describe, expect, it } from "vitest";
import { minimum } from "./index";

const ctx = {
	profile: minimum,
	error(id: `BR-${string}`, message: string): never {
		throw new Error(message, { cause: id });
	},
};

describe("minimum business rules", () => {
	it("accepts an invoice that satisfies the rules", async () => {
		await expect(check(validInvoice())).resolves.toBeUndefined();
	});

	it("requires the invoice totals", async () => {
		await expect(
			check(validInvoice({ taxBasisTotalAmount: undefined })),
		).rejects.toMatchObject({ cause: "BR-13" });
		await expect(
			check(validInvoice({ grandTotalAmount: undefined })),
		).rejects.toMatchObject({ cause: "BR-14" });
		await expect(
			check(validInvoice({ duePayableAmount: undefined })),
		).rejects.toMatchObject({ cause: "BR-15" });
	});

	it("requires a country prefix on VAT identifiers and allows EL", async () => {
		await expect(
			check(validInvoice({ sellerVat: "123456789" })),
		).rejects.toMatchObject({ cause: "BR-CO-09" });
		await expect(
			check(validInvoice({ buyerVat: "XX123" })),
		).rejects.toMatchObject({ cause: "BR-CO-09" });

		await expect(
			check(validInvoice({ sellerVat: "EL123456789" })),
		).resolves.toBeUndefined();
		await expect(
			check(validInvoice({ sellerTaxRepresentativeVat: "FR123456789" })),
		).resolves.toBeUndefined();
		await expect(
			check(validInvoice({ sellerTaxRepresentativeVat: "123456789" })),
		).rejects.toMatchObject({ cause: "BR-CO-09" });
	});

	it("requires a seller identifier, legal registration identifier, or VAT identifier", async () => {
		await expect(
			check(validInvoice({ sellerVat: undefined })),
		).rejects.toMatchObject({ cause: "BR-CO-26" });
		await expect(
			check(validInvoice({ sellerVat: undefined, legalId: "HRB 12345" })),
		).resolves.toBeUndefined();
		await expect(
			check(validInvoice({ sellerVat: undefined, sellerId: "seller-1" })),
		).resolves.toBeUndefined();
	});

	it("allows at most two decimal places on invoice totals", async () => {
		await expect(
			check(validInvoice({ taxBasisTotalAmount: 1.234 })),
		).rejects.toMatchObject({ cause: "BR-DEC-12" });
		await expect(
			check(validInvoice({ taxTotalAmount: "37.625" })),
		).rejects.toMatchObject({ cause: "BR-DEC-13" });
		await expect(
			check(validInvoice({ grandTotalAmount: "235.625" })),
		).rejects.toMatchObject({ cause: "BR-DEC-14" });
		await expect(
			check(validInvoice({ duePayableAmount: 235.625 })),
		).rejects.toMatchObject({ cause: "BR-DEC-18" });

		await expect(
			check(
				validInvoice({
					taxBasisTotalAmount: 198,
					taxTotalAmount: { value: 37.6, currency: "EUR" },
					grandTotalAmount: "235.62",
					duePayableAmount: 235,
				}),
			),
		).resolves.toBeUndefined();
	});
});

function check(data: unknown) {
	return minimum.rules?.(data as never, ctx as never);
}

function validInvoice(
	overrides: {
		taxBasisTotalAmount?: unknown;
		taxTotalAmount?: unknown;
		grandTotalAmount?: unknown;
		duePayableAmount?: unknown;
		sellerVat?: string | undefined;
		buyerVat?: string | undefined;
		sellerTaxRepresentativeVat?: string | undefined;
		legalId?: string | undefined;
		sellerId?: string | undefined;
	} = {},
) {
	const sellerVat =
		"sellerVat" in overrides ? overrides.sellerVat : "DE123456789";
	return {
		processControl: {
			applicationRecommendationInfo: {
				specificationIdentifier: "urn:factur-x.eu:1p0:minimum",
			},
		},
		exchangedDocument: {
			invoiceNumber: "471102",
			invoiceTypeCode: "380",
			invoiceIssueDate: new Date("2020-03-05"),
		},
		transaction: {
			contract: {
				seller: {
					name: "Lieferant GmbH",
					...(overrides.sellerId ? { id: overrides.sellerId } : {}),
					...(overrides.legalId
						? { organization: { id: overrides.legalId } }
						: {}),
					postalAddress: { countryCode: "DE" },
					...(sellerVat ? { taxRegistration: { vat: { id: sellerVat } } } : {}),
				},
				buyer: {
					name: "Kunden AG",
					...(overrides.buyerVat
						? { taxRegistration: { vat: { id: overrides.buyerVat } } }
						: {}),
				},
				...(overrides.sellerTaxRepresentativeVat
					? {
							sellerTaxRepresentative: {
								taxRegistration: {
									vat: { id: overrides.sellerTaxRepresentativeVat },
								},
							},
						}
					: {}),
			},
			debit: {
				invoiceCurrencyCode: "EUR",
				documentTotals: {
					taxBasisTotalAmount:
						"taxBasisTotalAmount" in overrides
							? overrides.taxBasisTotalAmount
							: 198,
					taxTotalAmount:
						"taxTotalAmount" in overrides
							? overrides.taxTotalAmount
							: { value: 37.62, currency: "EUR" },
					grandTotalAmount:
						"grandTotalAmount" in overrides
							? overrides.grandTotalAmount
							: 235.62,
					duePayableAmount:
						"duePayableAmount" in overrides
							? overrides.duePayableAmount
							: 235.62,
				},
			},
		},
	};
}
