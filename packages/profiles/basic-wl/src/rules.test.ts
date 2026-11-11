import { describe, expect, it } from "vitest";
import { basicWL } from "./index";

const ctx = {
	profile: basicWL,
	error(id: `BR-${string}` | `CII-SR-${string}`, message: string): never {
		throw new Error(message, { cause: id });
	},
};

describe("basic WL business rules", () => {
	it("accepts an invoice that satisfies the rules", async () => {
		await expect(check(validInvoice())).resolves.toBeUndefined();
	});

	it("requires the buyer postal address and country code", async () => {
		const missingAddress = validInvoice();
		missingAddress.transaction.contract.buyer.postalAddress = undefined;
		await expect(check(missingAddress)).rejects.toMatchObject({
			cause: "BR-10",
		});

		const missingCountry = validInvoice();
		missingCountry.transaction.contract.buyer.postalAddress = {};
		await expect(check(missingCountry)).rejects.toMatchObject({
			cause: "BR-11",
		});
	});

	it("requires the sum of invoice line net amount", async () => {
		const data = validInvoice();
		data.transaction.debit.documentTotals.lineTotalAmount = undefined;
		await expect(check(data)).rejects.toMatchObject({ cause: "BR-12" });
	});

	it("requires a payee name when a payee is given", async () => {
		const missing = validInvoice();
		missing.transaction.debit.payee = {};
		await expect(check(missing)).rejects.toMatchObject({ cause: "BR-17" });

		const named = validInvoice();
		named.transaction.debit.payee = { name: "Payee GmbH" };
		await expect(check(named)).resolves.toBeUndefined();
	});

	it("requires the tax representative name, address, country, and VAT identifier", async () => {
		const missingName = validInvoice();
		missingName.transaction.contract.sellerTaxRepresentative = {};
		await expect(check(missingName)).rejects.toMatchObject({
			cause: "BR-18",
		});

		const missingAddress = validInvoice();
		missingAddress.transaction.contract.sellerTaxRepresentative = {
			name: "Tax Rep",
		};
		await expect(check(missingAddress)).rejects.toMatchObject({
			cause: "BR-19",
		});

		const missingCountry = validInvoice();
		missingCountry.transaction.contract.sellerTaxRepresentative = {
			name: "Tax Rep",
			postalAddress: {},
		};
		await expect(check(missingCountry)).rejects.toMatchObject({
			cause: "BR-20",
		});

		const missingVat = validInvoice();
		missingVat.transaction.contract.sellerTaxRepresentative = {
			name: "Tax Rep",
			postalAddress: { countryCode: "FR" },
		};
		await expect(check(missingVat)).rejects.toMatchObject({
			cause: "BR-56",
		});

		const complete = validInvoice();
		complete.transaction.contract.sellerTaxRepresentative = {
			name: "Tax Rep",
			postalAddress: { countryCode: "FR" },
			taxRegistration: { vat: { id: "FR123456789" } },
		};
		await expect(check(complete)).resolves.toBeUndefined();
	});

	it("rejects an invoicing period that ends before it starts", async () => {
		const data = validInvoice();
		data.transaction.debit.invoicingPeriod = {
			startDate: new Date("2020-03-10"),
			endDate: new Date("2020-03-01"),
		};
		await expect(check(data)).rejects.toMatchObject({ cause: "BR-29" });

		const sameDay = validInvoice();
		sameDay.transaction.debit.invoicingPeriod = {
			startDate: "20200305",
			endDate: new Date("2020-03-05"),
		};
		await expect(check(sameDay)).resolves.toBeUndefined();
	});

	it("requires an amount, VAT category, and reason on each allowance", async () => {
		await expect(
			check(withAllowance({ reason: "Discount", categoryCode: "S", rate: 19 })),
		).rejects.toMatchObject({ cause: "BR-31" });
		await expect(
			check(withAllowance({ actualAmount: 0, reason: "Discount" })),
		).rejects.toMatchObject({ cause: "BR-32" });
		await expect(
			check(withAllowance({ actualAmount: 0, categoryCode: "S", rate: 19 })),
		).rejects.toMatchObject({ cause: "BR-33" });

		await expect(
			check(
				withAllowance({
					actualAmount: 0,
					categoryCode: "S",
					rate: 19,
					reason: "Discount",
					reasonCode: "95",
				}),
			),
		).resolves.toBeUndefined();
	});

	it("requires an amount, VAT category, and reason on each charge", async () => {
		await expect(
			check(
				withCharge({ reason: "Freight service", categoryCode: "S", rate: 19 }),
			),
		).rejects.toMatchObject({ cause: "BR-36" });
		await expect(
			check(withCharge({ actualAmount: 0, reason: "Freight service" })),
		).rejects.toMatchObject({ cause: "BR-37" });
		await expect(
			check(withCharge({ actualAmount: 0, categoryCode: "S", rate: 19 })),
		).rejects.toMatchObject({ cause: "BR-38" });

		await expect(
			check(
				withCharge({
					actualAmount: 0,
					categoryCode: "S",
					rate: 19,
					reason: "Freight service",
					reasonCode: "FC",
				}),
			),
		).resolves.toBeUndefined();
	});

	it("requires the VAT breakdown amount, category, and rate", async () => {
		const missingBasis = validInvoice();
		missingBasis.transaction.debit.vatBreakdown[0].basisAmount = undefined;
		await expect(check(missingBasis)).rejects.toMatchObject({
			cause: "BR-45",
		});

		const missingTax = validInvoice();
		missingTax.transaction.debit.vatBreakdown[0].calculatedAmount = undefined;
		await expect(check(missingTax)).rejects.toMatchObject({ cause: "BR-46" });

		const missingCategory = validInvoice();
		missingCategory.transaction.debit.vatBreakdown[0].categoryCode = undefined;
		await expect(check(missingCategory)).rejects.toMatchObject({
			cause: "BR-47",
		});

		const missingRate = validInvoice();
		missingRate.transaction.debit.vatBreakdown[0].rateApplicablePercent =
			undefined;
		await expect(check(missingRate)).rejects.toMatchObject({ cause: "BR-48" });

		const notSubject = setVat(validInvoice(), {
			categoryCode: "O",
			tax: 0,
			exemptionReason: "Not subject to VAT",
		});
		await expect(check(notSubject)).resolves.toBeUndefined();
	});

	it("requires a payment means type code and an account for credit transfer", async () => {
		const missingType = validInvoice();
		missingType.transaction.debit.paymentMeans = {};
		await expect(check(missingType)).rejects.toMatchObject({
			cause: "BR-49",
		});

		const missingAccount = validInvoice();
		missingAccount.transaction.debit.paymentMeans = {
			typeCode: "58",
			creditTransfers: [{}],
		};
		await expect(check(missingAccount)).rejects.toMatchObject({
			cause: "BR-50",
		});

		const sepaWithoutAccount = validInvoice();
		sepaWithoutAccount.transaction.debit.paymentMeans = { typeCode: "58" };
		await expect(check(sepaWithoutAccount)).rejects.toMatchObject({
			cause: "BR-61",
		});

		const localTransfer = validInvoice();
		localTransfer.transaction.debit.paymentMeans = { typeCode: "30" };
		await expect(check(localTransfer)).rejects.toMatchObject({
			cause: "BR-61",
		});

		const otherMeans = validInvoice();
		otherMeans.transaction.debit.paymentMeans = { typeCode: "42" };
		await expect(check(otherMeans)).resolves.toBeUndefined();

		const sepa = validInvoice();
		sepa.transaction.debit.paymentMeans = {
			typeCode: "58",
			creditTransfers: [{ iban: "DE89370400440532013000" }],
		};
		await expect(check(sepa)).resolves.toBeUndefined();
	});

	it("requires the VAT amount in accounting currency when that currency is set", async () => {
		const missing = validInvoice();
		missing.transaction.debit.taxCurrencyCode = "USD";
		await expect(check(missing)).rejects.toMatchObject({ cause: "BR-53" });

		const present = validInvoice();
		present.transaction.debit.taxCurrencyCode = "USD";
		present.transaction.debit.documentTotals.taxTotalAmountAccountingCurrency =
			{ value: 19, currency: "USD" };
		await expect(check(present)).resolves.toBeUndefined();
	});

	it("requires a preceding invoice reference", async () => {
		const missing = validInvoice();
		missing.transaction.debit.precendingInvoices = [{}];
		await expect(check(missing)).rejects.toMatchObject({ cause: "BR-55" });

		const present = validInvoice();
		present.transaction.debit.precendingInvoices = [
			{ issuerAssignedId: "INV-1" },
		];
		await expect(check(present)).resolves.toBeUndefined();
	});

	it("requires a deliver-to country code when a deliver-to address is given", async () => {
		const missing = validInvoice();
		missing.transaction.delivery = { recipient: { postalAddress: {} } };
		await expect(check(missing)).rejects.toMatchObject({ cause: "BR-57" });

		const present = validInvoice();
		present.transaction.delivery = {
			recipient: { postalAddress: { countryCode: "FR" } },
		};
		await expect(check(present)).resolves.toBeUndefined();
	});

	it("requires a scheme identifier on electronic addresses", async () => {
		const seller = validInvoice();
		seller.transaction.contract.seller.electronicAddress = {
			value: "seller@example.com",
		};
		await expect(check(seller)).rejects.toMatchObject({ cause: "BR-62" });

		const buyer = validInvoice();
		buyer.transaction.contract.buyer.electronicAddress = "buyer@example.com";
		await expect(check(buyer)).rejects.toMatchObject({ cause: "BR-63" });

		const both = validInvoice();
		both.transaction.contract.seller.electronicAddress = {
			value: "seller@example.com",
			schemeId: "EM",
		};
		both.transaction.contract.buyer.electronicAddress = {
			identifier: "buyer@example.com",
			schemeId: "EM",
		};
		await expect(check(both)).resolves.toBeUndefined();
	});

	it("treats the VAT point date and VAT point date code as mutually exclusive", async () => {
		const both = validInvoice();
		both.transaction.debit.vatBreakdown[0].taxDueDate = new Date("2020-03-05");
		both.transaction.debit.vatBreakdown[0].dueDateTypeCode = "3";
		await expect(check(both)).rejects.toMatchObject({ cause: "BR-CO-03" });

		const dateOnly = validInvoice();
		dateOnly.transaction.debit.vatBreakdown[0].taxDueDate = new Date(
			"2020-03-05",
		);
		await expect(check(dateOnly)).resolves.toBeUndefined();
	});

	it("requires allowance and charge reasons to match their reason codes", async () => {
		await expect(
			check(
				withAllowance({
					actualAmount: 0,
					categoryCode: "S",
					rate: 19,
					reason: "Freight",
					reasonCode: "95",
				}),
			),
		).rejects.toMatchObject({ cause: "BR-CO-05" });

		await expect(
			check(
				withCharge({
					actualAmount: 0,
					categoryCode: "S",
					rate: 19,
					reason: "Discount",
					reasonCode: "FC",
				}),
			),
		).rejects.toMatchObject({ cause: "BR-CO-06" });
	});

	it("checks document totals against allowances, charges, VAT, and the amount due", async () => {
		const allowanceSum = withAllowance({
			actualAmount: 5,
			categoryCode: "S",
			rate: 19,
			reason: "Discount",
		});
		await expect(check(allowanceSum)).rejects.toMatchObject({
			cause: "BR-CO-11",
		});

		const chargeSum = withCharge({
			actualAmount: 5,
			categoryCode: "S",
			rate: 19,
			reason: "Freight service",
		});
		await expect(check(chargeSum)).rejects.toMatchObject({
			cause: "BR-CO-12",
		});

		const netTotal = validInvoice();
		netTotal.transaction.debit.documentTotals.taxBasisTotalAmount = 90;
		await expect(check(netTotal)).rejects.toMatchObject({ cause: "BR-CO-13" });

		const vatTotal = validInvoice();
		vatTotal.transaction.debit.documentTotals.taxTotalAmount = {
			value: 18,
			currency: "EUR",
		};
		await expect(check(vatTotal)).rejects.toMatchObject({ cause: "BR-CO-14" });

		const gross = validInvoice();
		gross.transaction.debit.documentTotals.grandTotalAmount = 120;
		await expect(check(gross)).rejects.toMatchObject({ cause: "BR-CO-15" });

		const due = validInvoice();
		due.transaction.debit.documentTotals.duePayableAmount = 100;
		await expect(check(due)).rejects.toMatchObject({ cause: "BR-CO-16" });

		const formula = setVat(validInvoice(), {
			categoryCode: "B",
			rate: 19,
			tax: 20,
		});
		await expect(check(formula)).rejects.toMatchObject({ cause: "BR-CO-17" });

		const balanced = validInvoice();
		balanced.transaction.debit.allowances = [
			allowance({
				actualAmount: 5,
				categoryCode: "S",
				rate: 19,
				reason: "Discount",
			}),
		];
		balanced.transaction.debit.charges = [
			charge({
				actualAmount: 5,
				categoryCode: "S",
				rate: 19,
				reason: "Freight service",
			}),
		];
		balanced.transaction.debit.documentTotals.allowanceTotalAmount = 5;
		balanced.transaction.debit.documentTotals.chargeTotalAmount = 5;
		await expect(check(balanced)).resolves.toBeUndefined();

		const prepaid = validInvoice();
		prepaid.transaction.debit.documentTotals.prepaidAmount = 19;
		prepaid.transaction.debit.documentTotals.duePayableAmount = 100;
		await expect(check(prepaid)).resolves.toBeUndefined();
	});

	it("requires at least one VAT breakdown", async () => {
		const data = validInvoice();
		data.transaction.debit.vatBreakdown = [];
		await expect(check(data)).rejects.toMatchObject({ cause: "BR-CO-18" });
	});

	it("requires a start or end date when an invoicing period is used", async () => {
		const data = validInvoice();
		data.transaction.debit.invoicingPeriod = {};
		await expect(check(data)).rejects.toMatchObject({ cause: "BR-CO-19" });

		const startOnly = validInvoice();
		startOnly.transaction.debit.invoicingPeriod = {
			startDate: new Date("2020-03-01"),
		};
		await expect(check(startOnly)).resolves.toBeUndefined();
	});

	it("requires payment terms when the amount due is positive", async () => {
		const missing = validInvoice();
		missing.transaction.debit.paymentTerms = undefined;
		await expect(check(missing)).rejects.toMatchObject({ cause: "BR-CO-25" });

		const dueDate = validInvoice();
		dueDate.transaction.debit.paymentTerms = {
			dueDate: new Date("2020-04-04"),
		};
		await expect(check(dueDate)).resolves.toBeUndefined();

		const settled = validInvoice();
		settled.transaction.debit.documentTotals.prepaidAmount = 119;
		settled.transaction.debit.documentTotals.duePayableAmount = 0;
		settled.transaction.debit.paymentTerms = undefined;
		await expect(check(settled)).resolves.toBeUndefined();
	});

	it("enforces Factur-X payment and contact constraints", async () => {
		const indicator = withAllowance({
			actualAmount: 0,
			categoryCode: "S",
			rate: 19,
			reason: "Discount",
			chargeIndicator: true,
		});
		await expect(check(indicator)).rejects.toMatchObject({
			cause: "CII-SR-463",
		});

		const twoBics = validInvoice();
		twoBics.transaction.debit.paymentMeans = [
			/* cSpell:disable-next-line */
			{ typeCode: "42", sellerBankDetails: { bic: "DEUTDEFF" } },
			/* cSpell:disable-next-line */
			{ typeCode: "42", sellerBankDetails: { bic: "DEUTDEFF500" } },
		];
		await expect(check(twoBics)).rejects.toMatchObject({
			cause: "CII-SR-464",
		});

		const sellerContact = validInvoice();
		sellerContact.transaction.contract.seller.contact = {
			personName: "Ann Seller",
			departmentName: "Sales",
		};
		await expect(check(sellerContact)).rejects.toMatchObject({
			cause: "CII-SR-465",
		});

		const buyerContact = validInvoice();
		buyerContact.transaction.contract.buyer.contact = [
			{ personName: "Ann Buyer" },
			{ departmentName: "Accounts" },
		];
		await expect(check(buyerContact)).rejects.toMatchObject({
			cause: "CII-SR-466",
		});

		const typeCodes = validInvoice();
		typeCodes.transaction.debit.paymentMeans = [
			{ typeCode: "42" },
			{ typeCode: "48" },
		];
		await expect(check(typeCodes)).rejects.toMatchObject({
			cause: "CII-SR-467",
		});

		const texts = validInvoice();
		texts.transaction.debit.paymentMeans = [
			{ typeCode: "42", information: "SEPA" },
			{ typeCode: "42", information: "Transfer" },
		];
		await expect(check(texts)).rejects.toMatchObject({ cause: "CII-SR-468" });

		const references = validInvoice();
		references.transaction.debit.paymentReference = "INV-471102";
		references.transaction.debit.paymentMeans = {
			typeCode: "42",
			paymentReference: "OTHER",
		};
		await expect(check(references)).rejects.toMatchObject({
			cause: "CII-SR-469",
		});

		const bothAccounts = validInvoice();
		bothAccounts.transaction.debit.paymentMeans = {
			typeCode: "58",
			creditTransfers: [
				{ iban: "DE89370400440532013000", proprietaryId: "12345678" },
			],
		};
		await expect(check(bothAccounts)).rejects.toMatchObject({
			cause: "CII-SR-470",
		});

		const missingRate = withAllowance({
			actualAmount: 0,
			categoryCode: "S",
			reason: "Discount",
		});
		await expect(check(missingRate)).rejects.toMatchObject({
			cause: "CII-SR-472",
		});

		const repeatedAmount = withAllowance({
			actualAmount: [1, 2],
			categoryCode: "S",
			rate: 19,
			reason: "Discount",
		});
		await expect(check(repeatedAmount)).rejects.toMatchObject({
			cause: "CII-SR-473",
		});

		const proprietaryAndIban = validInvoice();
		proprietaryAndIban.transaction.debit.paymentMeans = {
			typeCode: "42",
			creditTransfers: [
				{ iban: "DE89370400440532013000", proprietaryId: "12345678" },
			],
		};
		await expect(check(proprietaryAndIban)).rejects.toMatchObject({
			cause: "CII-SR-474",
		});

		const singleContact = validInvoice();
		singleContact.transaction.contract.seller.contact = {
			personName: "Ann Seller",
		};
		singleContact.transaction.contract.buyer.contact = {
			departmentName: "Accounts",
		};
		await expect(check(singleContact)).resolves.toBeUndefined();
	});

	it("checks standard-rated allowances, charges, and VAT breakdowns", async () => {
		await expect(
			check(
				withAllowance({
					actualAmount: 0,
					categoryCode: "S",
					rate: 19,
					reason: "Discount",
					clearSellerTaxIds: true,
				}),
			),
		).rejects.toMatchObject({ cause: "BR-S-3" });
		await expect(
			check(
				withCharge({
					actualAmount: 0,
					categoryCode: "S",
					rate: 19,
					reason: "Freight service",
					clearSellerTaxIds: true,
				}),
			),
		).rejects.toMatchObject({ cause: "BR-S-4" });
		await expect(
			check(
				withAllowance({
					actualAmount: 0,
					categoryCode: "S",
					rate: 0,
					reason: "Discount",
				}),
			),
		).rejects.toMatchObject({ cause: "BR-S-6" });
		await expect(
			check(
				withCharge({
					actualAmount: 0,
					categoryCode: "S",
					rate: 0,
					reason: "Freight service",
				}),
			),
		).rejects.toMatchObject({ cause: "BR-S-7" });

		await expect(
			check(setVat(validInvoice(), { categoryCode: "S", rate: 19, tax: 20 })),
		).rejects.toMatchObject({ cause: "BR-S-9" });

		const exemption = validInvoice();
		exemption.transaction.debit.vatBreakdown[0].exemptionReason =
			"Reverse charge";
		await expect(check(exemption)).rejects.toMatchObject({ cause: "BR-S-10" });

		const localTaxId = withAllowance({
			actualAmount: 0,
			categoryCode: "S",
			rate: 19,
			reason: "Discount",
			clearSellerTaxIds: true,
		});
		localTaxId.transaction.contract.seller.taxRegistration = {
			local: { id: "12/345/67890" },
		};
		await expect(check(localTaxId)).resolves.toBeUndefined();
	});

	it("checks zero-rated allowances, charges, and VAT breakdowns", async () => {
		await expect(
			check(categoryAllowance("Z", { rate: 0, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-Z-3" });
		await expect(
			check(categoryCharge("Z", { rate: 0, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-Z-4" });
		await expect(
			check(categoryAllowance("Z", { rate: 19 })),
		).rejects.toMatchObject({ cause: "BR-Z-6" });
		await expect(
			check(categoryCharge("Z", { rate: 19 })),
		).rejects.toMatchObject({
			cause: "BR-Z-7",
		});
		await expect(
			check(setVat(validInvoice(), { categoryCode: "Z", rate: 0, tax: 1 })),
		).rejects.toMatchObject({ cause: "BR-Z-9" });

		const exemption = setVat(validInvoice(), {
			categoryCode: "Z",
			rate: 0,
			tax: 0,
			exemptionReason: "Exempt",
		});
		await expect(check(exemption)).rejects.toMatchObject({ cause: "BR-Z-10" });

		await expect(
			check(setVat(validInvoice(), { categoryCode: "Z", rate: 0, tax: 0 })),
		).resolves.toBeUndefined();
	});

	it("checks exempt allowances, charges, and VAT breakdowns", async () => {
		await expect(
			check(categoryAllowance("E", { rate: 0, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-E-3" });
		await expect(
			check(categoryCharge("E", { rate: 0, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-E-4" });
		await expect(
			check(categoryAllowance("E", { rate: 19 })),
		).rejects.toMatchObject({ cause: "BR-E-6" });
		await expect(
			check(categoryCharge("E", { rate: 19 })),
		).rejects.toMatchObject({
			cause: "BR-E-7",
		});
		await expect(
			check(
				setVat(validInvoice(), {
					categoryCode: "E",
					rate: 0,
					tax: 1,
					exemptionReason: "Exempt",
				}),
			),
		).rejects.toMatchObject({ cause: "BR-E-9" });
		await expect(
			check(setVat(validInvoice(), { categoryCode: "E", rate: 0, tax: 0 })),
		).rejects.toMatchObject({ cause: "BR-E-10" });

		await expect(
			check(
				setVat(validInvoice(), {
					categoryCode: "E",
					rate: 0,
					tax: 0,
					exemptionReasonCode: "VATEX-EU-D",
				}),
			),
		).resolves.toBeUndefined();
	});

	it("checks reverse charge allowances, charges, and VAT breakdowns", async () => {
		await expect(
			check(categoryAllowance("AE", { rate: 0 })),
		).rejects.toMatchObject({ cause: "BR-AE-3" });
		await expect(
			check(categoryCharge("AE", { rate: 0 })),
		).rejects.toMatchObject({
			cause: "BR-AE-4",
		});
		await expect(
			check(
				setVat(validInvoice(), {
					categoryCode: "AE",
					rate: 0,
					tax: 1,
					exemptionReason: "Reverse charge",
				}),
			),
		).rejects.toMatchObject({ cause: "BR-AE-9" });
		await expect(
			check(
				setVat(validInvoice(), {
					categoryCode: "AE",
					rate: 0,
					tax: 0,
					exemptionReason: "Export outside the EU",
				}),
			),
		).rejects.toMatchObject({ cause: "BR-AE-10" });

		const accepted = categoryAllowance("AE", { rate: 0 });
		accepted.transaction.contract.buyer.taxRegistration = {
			vat: { id: "FR123456789" },
		};
		setVat(accepted, {
			categoryCode: "AE",
			rate: 0,
			tax: 0,
			exemptionReasonCode: "VATEX-EU-AE",
		});
		await expect(check(accepted)).resolves.toBeUndefined();
	});

	it("checks intra-community allowances, charges, and VAT breakdowns", async () => {
		await expect(
			check(categoryAllowance("K", { rate: 0 })),
		).rejects.toMatchObject({ cause: "BR-IC-3" });
		await expect(check(categoryCharge("K", { rate: 0 }))).rejects.toMatchObject(
			{
				cause: "BR-IC-4",
			},
		);

		const legalIdOnly = categoryAllowance("K", { rate: 0 });
		legalIdOnly.transaction.contract.buyer.organization = { id: "HRB 1" };
		await expect(check(legalIdOnly)).rejects.toMatchObject({
			cause: "BR-IC-3",
		});

		await expect(
			check(categoryAllowance("K", { rate: 19, buyerVat: "FR123456789" })),
		).rejects.toMatchObject({ cause: "BR-IC-6" });
		await expect(
			check(categoryCharge("K", { rate: 19, buyerVat: "FR123456789" })),
		).rejects.toMatchObject({ cause: "BR-IC-7" });
		await expect(
			check(
				intraCommunity(
					setVat(validInvoice(), {
						categoryCode: "K",
						rate: 0,
						tax: 1,
						exemptionReason: "Intra-community supply",
					}),
				),
			),
		).rejects.toMatchObject({ cause: "BR-IC-9" });
		await expect(
			check(
				intraCommunity(
					setVat(validInvoice(), { categoryCode: "K", rate: 0, tax: 0 }),
				),
			),
		).rejects.toMatchObject({ cause: "BR-IC-10" });

		const missingSupplyDate = intraCommunity(
			setVat(validInvoice(), {
				categoryCode: "K",
				rate: 0,
				tax: 0,
				exemptionReasonCode: "VATEX-EU-IC",
			}),
		);
		await expect(check(missingSupplyDate)).rejects.toMatchObject({
			cause: "BR-IC-11",
		});

		const missingDestination = intraCommunity(
			setVat(validInvoice(), {
				categoryCode: "K",
				rate: 0,
				tax: 0,
				exemptionReason: "Intra-community supply",
			}),
		);
		missingDestination.transaction.delivery = {
			actualDelivery: { date: new Date("2020-03-01") },
		};
		await expect(check(missingDestination)).rejects.toMatchObject({
			cause: "BR-IC-12",
		});

		const accepted = intraCommunity(
			categoryAllowance("K", { rate: 0, buyerVat: "FR123456789" }),
		);
		accepted.transaction.delivery = {
			actualDelivery: { date: new Date("2020-03-01") },
			recipient: { postalAddress: { countryCode: "FR" } },
		};
		setVat(accepted, {
			categoryCode: "K",
			rate: 0,
			tax: 0,
			exemptionReason: "Intra-community supply",
		});
		await expect(check(accepted)).resolves.toBeUndefined();
	});

	it("checks export allowances, charges, and VAT breakdowns", async () => {
		await expect(
			check(categoryAllowance("G", { rate: 0, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-G-3" });

		const localOnly = categoryAllowance("G", {
			rate: 0,
			clearSellerTaxIds: true,
		});
		localOnly.transaction.contract.seller.taxRegistration = {
			local: { id: "12/345/67890" },
		};
		await expect(check(localOnly)).rejects.toMatchObject({ cause: "BR-G-3" });

		await expect(
			check(categoryCharge("G", { rate: 0, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-G-4" });
		await expect(
			check(categoryAllowance("G", { rate: 19 })),
		).rejects.toMatchObject({ cause: "BR-G-6" });
		await expect(
			check(categoryCharge("G", { rate: 19 })),
		).rejects.toMatchObject({
			cause: "BR-G-7",
		});
		await expect(
			check(
				setVat(validInvoice(), {
					categoryCode: "G",
					rate: 0,
					tax: 1,
					exemptionReason: "Export outside the EU",
				}),
			),
		).rejects.toMatchObject({ cause: "BR-G-9" });
		await expect(
			check(setVat(validInvoice(), { categoryCode: "G", rate: 0, tax: 0 })),
		).rejects.toMatchObject({ cause: "BR-G-10" });

		await expect(
			check(
				setVat(validInvoice(), {
					categoryCode: "G",
					rate: 0,
					tax: 0,
					exemptionReasonCode: "VATEX-EU-G",
				}),
			),
		).resolves.toBeUndefined();
	});

	it("checks not-subject-to-VAT allowances, charges, and VAT breakdowns", async () => {
		await expect(
			check(categoryAllowance("O", { sellerVat: true })),
		).rejects.toMatchObject({ cause: "BR-O-3" });
		await expect(
			check(categoryCharge("O", { sellerVat: true })),
		).rejects.toMatchObject({ cause: "BR-O-4" });
		await expect(
			check(categoryAllowance("O", { rate: 0, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-O-6" });
		await expect(
			check(categoryCharge("O", { rate: 0, clearSellerTaxIds: true })),
		).rejects.toMatchObject({
			cause: "BR-O-7",
		});
		await expect(
			check(
				setVat(notSubjectInvoice(), {
					categoryCode: "O",
					tax: 1,
					exemptionReason: "Not subject to VAT",
				}),
			),
		).rejects.toMatchObject({ cause: "BR-O-9" });
		await expect(
			check(setVat(notSubjectInvoice(), { categoryCode: "O", tax: 0 })),
		).rejects.toMatchObject({ cause: "BR-O-10" });

		const mixedAllowance = categoryAllowance("S", {
			rate: 19,
			sellerVat: true,
		});
		setVat(mixedAllowance, {
			categoryCode: "O",
			tax: 0,
			exemptionReason: "Not subject to VAT",
		});
		await expect(check(mixedAllowance)).rejects.toMatchObject({
			cause: "BR-O-13",
		});

		const mixedCharge = categoryCharge("S", { rate: 19, sellerVat: true });
		setVat(mixedCharge, {
			categoryCode: "O",
			tax: 0,
			exemptionReasonCode: "VATEX-EU-O",
		});
		await expect(check(mixedCharge)).rejects.toMatchObject({
			cause: "BR-O-14",
		});

		await expect(
			check(categoryAllowance("O", { clearSellerTaxIds: true })),
		).resolves.toBeUndefined();
	});

	it("rejects a Not subject to VAT breakdown next to another breakdown (BR-O-11)", async () => {
		await expect(
			check(withOtherBreakdown(notSubjectInvoice())),
		).rejects.toMatchObject({ cause: "BR-O-11" });
	});

	it("checks IGIC and IPSI allowances, charges, and VAT breakdowns", async () => {
		await expect(
			check(categoryAllowance("L", { rate: 7, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-AF-3" });
		await expect(
			check(categoryCharge("L", { rate: 7, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-AF-4" });
		await expect(
			check(categoryAllowance("L", { rate: -1 })),
		).rejects.toMatchObject({ cause: "BR-AF-6" });
		await expect(
			check(categoryCharge("L", { rate: -1 })),
		).rejects.toMatchObject({ cause: "BR-AF-7" });
		await expect(
			check(setVat(validInvoice(), { categoryCode: "L", rate: 7, tax: 8 })),
		).rejects.toMatchObject({ cause: "BR-AF-9" });
		const igicExemption = setVat(validInvoice(), {
			categoryCode: "L",
			rate: 7,
			tax: 7,
			exemptionReason: "Exempt",
		});
		await expect(check(igicExemption)).rejects.toMatchObject({
			cause: "BR-AF-10",
		});

		await expect(
			check(categoryAllowance("M", { rate: 0, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-AG-3" });
		await expect(
			check(categoryCharge("M", { rate: 4, clearSellerTaxIds: true })),
		).rejects.toMatchObject({ cause: "BR-AG-4" });
		await expect(
			check(categoryAllowance("M", { rate: -1 })),
		).rejects.toMatchObject({ cause: "BR-AG-6" });
		await expect(
			check(categoryCharge("M", { rate: -1 })),
		).rejects.toMatchObject({ cause: "BR-AG-7" });
		await expect(
			check(setVat(validInvoice(), { categoryCode: "M", rate: 4, tax: 5 })),
		).rejects.toMatchObject({ cause: "BR-AG-9" });
		const ipsiExemption = setVat(validInvoice(), {
			categoryCode: "M",
			rate: 4,
			tax: 4,
			exemptionReasonCode: "VATEX-EU-O",
		});
		await expect(check(ipsiExemption)).rejects.toMatchObject({
			cause: "BR-AG-10",
		});

		await expect(
			check(setVat(validInvoice(), { categoryCode: "L", rate: 7, tax: 7 })),
		).resolves.toBeUndefined();
		await expect(
			check(setVat(validInvoice(), { categoryCode: "M", rate: 0, tax: 0 })),
		).resolves.toBeUndefined();
	});
});

describe("basic WL business rules for the extended profile", () => {
	const skipped: [string, () => Rec][] = [
		[
			"BR-38",
			() => withCharge({ actualAmount: 0, categoryCode: "S", rate: 19 }),
		],
		[
			"BR-CO-05",
			() =>
				withAllowance({
					actualAmount: 0,
					categoryCode: "S",
					rate: 19,
					reason: "Freight",
					reasonCode: "95",
				}),
		],
		[
			"BR-CO-06",
			() =>
				withCharge({
					actualAmount: 0,
					categoryCode: "S",
					rate: 19,
					reason: "Discount",
					reasonCode: "FC",
				}),
		],
		[
			"BR-CO-11",
			() =>
				withAllowance({
					actualAmount: 5,
					categoryCode: "S",
					rate: 19,
					reason: "Discount",
				}),
		],
		[
			"BR-CO-12",
			() =>
				withCharge({
					actualAmount: 5,
					categoryCode: "S",
					rate: 19,
					reason: "Freight service",
				}),
		],
		[
			"BR-CO-13",
			() => {
				const data = validInvoice();
				data.transaction.debit.documentTotals.taxBasisTotalAmount = 90;
				return data;
			},
		],
		[
			"BR-CO-15",
			() => {
				const data = validInvoice();
				data.transaction.debit.documentTotals.grandTotalAmount = 120;
				return data;
			},
		],
		[
			"BR-CO-16",
			() => {
				const data = validInvoice();
				data.transaction.debit.documentTotals.duePayableAmount = 100;
				return data;
			},
		],
		[
			"BR-CO-17",
			() => setVat(validInvoice(), { categoryCode: "B", rate: 19, tax: 20 }),
		],
		[
			"CII-SR-470",
			() => {
				const data = validInvoice();
				data.transaction.debit.paymentMeans = {
					typeCode: "58",
					creditTransfers: [
						{ iban: "DE89370400440532013000", proprietaryId: "12345678" },
					],
				};
				return data;
			},
		],
		[
			"CII-SR-474",
			() => {
				const data = validInvoice();
				data.transaction.debit.paymentMeans = {
					typeCode: "42",
					creditTransfers: [
						{ iban: "DE89370400440532013000", proprietaryId: "12345678" },
					],
				};
				return data;
			},
		],
		[
			"BR-S-9",
			() => setVat(validInvoice(), { categoryCode: "S", rate: 19, tax: 20 }),
		],
		[
			"BR-S-10",
			() => {
				const data = validInvoice();
				data.transaction.debit.vatBreakdown[0].exemptionReason =
					"Reverse charge";
				return data;
			},
		],
		[
			"BR-Z-10",
			() =>
				setVat(validInvoice(), {
					categoryCode: "Z",
					rate: 0,
					tax: 0,
					exemptionReason: "Exempt",
				}),
		],
		["BR-O-3", () => categoryAllowance("O", { sellerVat: true })],
		["BR-O-4", () => categoryCharge("O", { sellerVat: true })],
		["BR-O-11", () => withOtherBreakdown(notSubjectInvoice())],
		[
			"BR-O-13",
			() => {
				const data = categoryAllowance("S", { rate: 19, sellerVat: true });
				setVat(data, {
					categoryCode: "O",
					tax: 0,
					exemptionReason: "Not subject to VAT",
				});
				return data;
			},
		],
		[
			"BR-O-14",
			() => {
				const data = categoryCharge("S", { rate: 19, sellerVat: true });
				setVat(data, {
					categoryCode: "O",
					tax: 0,
					exemptionReasonCode: "VATEX-EU-O",
				});
				return data;
			},
		],
		[
			"BR-AF-10",
			() =>
				setVat(validInvoice(), {
					categoryCode: "L",
					rate: 7,
					tax: 7,
					exemptionReason: "Exempt",
				}),
		],
		[
			"BR-AG-10",
			() =>
				setVat(validInvoice(), {
					categoryCode: "M",
					rate: 7,
					tax: 7,
					exemptionReason: "Exempt",
				}),
		],
	];

	it.each(skipped)(
		"skips %s on extended but still rejects it on basic WL",
		async (cause, build) => {
			await expect(check(build())).rejects.toMatchObject({ cause });
			expect(await causeOnExtended(build())).not.toBe(cause);
		},
	);

	it("still requires an allowance reason (BR-33) on extended", async () => {
		expect(
			await causeOnExtended(
				withAllowance({ actualAmount: 0, categoryCode: "S", rate: 19 }),
			),
		).toBe("BR-33");
	});
});

function checkExtended(data: unknown) {
	return basicWL.rules?.(
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

function check(data: unknown) {
	return basicWL.rules?.(data as never, ctx as never);
}

type Rec = Record<string, any>;

function validInvoice(): Rec {
	return {
		processControl: {
			applicationRecommendationInfo: {
				specificationIdentifier: "urn:factur-x.eu:1p0:basicwl",
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
				vatBreakdown: [
					{
						calculatedAmount: 19,
						typeCode: "VAT",
						basisAmount: 100,
						categoryCode: "S",
						rateApplicablePercent: 19,
					},
				],
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

function notSubjectInvoice(): Rec {
	const data = validInvoice();
	data.transaction.contract.seller.taxRegistration = undefined;
	data.transaction.contract.seller.id = "seller-1";
	return setVat(data, {
		categoryCode: "O",
		tax: 0,
		exemptionReason: "Not subject to VAT",
	});
}

function withOtherBreakdown(data: Rec): Rec {
	data.transaction.debit.vatBreakdown.push({
		calculatedAmount: 0,
		typeCode: "VAT",
		basisAmount: 0,
		categoryCode: "Z",
		rateApplicablePercent: 0,
	});
	return data;
}

function setVat(
	data: Rec,
	vat: {
		categoryCode: string;
		rate?: number;
		tax: number;
		exemptionReason?: string;
		exemptionReasonCode?: string;
	},
) {
	data.transaction.debit.vatBreakdown = [
		{
			calculatedAmount: vat.tax,
			typeCode: "VAT",
			basisAmount: 100,
			categoryCode: vat.categoryCode,
			...(vat.rate === undefined ? {} : { rateApplicablePercent: vat.rate }),
			...(vat.exemptionReason ? { exemptionReason: vat.exemptionReason } : {}),
			...(vat.exemptionReasonCode
				? { exemptionReasonCode: vat.exemptionReasonCode }
				: {}),
		},
	];
	data.transaction.debit.documentTotals.taxBasisTotalAmount = 100;
	data.transaction.debit.documentTotals.taxTotalAmount = {
		value: vat.tax,
		currency: "EUR",
	};
	data.transaction.debit.documentTotals.grandTotalAmount = 100 + vat.tax;
	data.transaction.debit.documentTotals.duePayableAmount = 100 + vat.tax;
	return data;
}

function intraCommunity(data: Rec) {
	data.transaction.contract.buyer.taxRegistration = {
		vat: { id: "FR123456789" },
	};
	return data;
}

type EntryOptions = {
	actualAmount?: unknown;
	categoryCode?: string;
	rate?: number;
	reason?: string;
	reasonCode?: string;
	chargeIndicator?: boolean;
	clearSellerTaxIds?: boolean;
	sellerVat?: boolean;
	buyerVat?: string;
};

function categoryAllowance(code: string, options: EntryOptions) {
	return withAllowance({
		actualAmount: 0,
		categoryCode: code,
		reason: "Discount",
		reasonCode: code === "O" ? undefined : "95",
		...options,
	});
}

function categoryCharge(code: string, options: EntryOptions) {
	return withCharge({
		actualAmount: 0,
		categoryCode: code,
		reason: "Freight service",
		reasonCode: code === "O" ? undefined : "FC",
		...options,
	});
}

function withAllowance(options: EntryOptions) {
	const data = validInvoice();
	applyPartyOptions(data, options);
	data.transaction.debit.allowances = [allowance(options)];
	return data;
}

function withCharge(options: EntryOptions) {
	const data = validInvoice();
	applyPartyOptions(data, options);
	data.transaction.debit.charges = [charge(options)];
	return data;
}

function applyPartyOptions(data: Rec, options: EntryOptions) {
	if (options.clearSellerTaxIds || options.sellerVat === false) {
		data.transaction.contract.seller.taxRegistration = undefined;
		data.transaction.contract.seller.id = "seller-1";
	}
	if (options.buyerVat) {
		data.transaction.contract.buyer.taxRegistration = {
			vat: { id: options.buyerVat },
		};
	}
}

function allowance(options: EntryOptions) {
	return entry(options);
}

function charge(options: EntryOptions) {
	return entry(options);
}

function entry(options: EntryOptions) {
	const category =
		options.categoryCode === undefined
			? undefined
			: {
					categoryCode: options.categoryCode,
					...(options.rate === undefined
						? {}
						: { rateApplicablePercent: options.rate }),
				};
	return {
		...(options.actualAmount === undefined
			? {}
			: { actualAmount: options.actualAmount }),
		...(options.reason === undefined ? {} : { reason: options.reason }),
		...(options.reasonCode === undefined
			? {}
			: { reasonCode: options.reasonCode }),
		...(options.chargeIndicator === undefined
			? {}
			: { chargeIndicator: options.chargeIndicator }),
		...(category ? { categoryTradeTax: category } : {}),
	};
}
