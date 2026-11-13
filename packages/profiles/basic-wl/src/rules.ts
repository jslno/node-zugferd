import allowanceCodes from "@node-zugferd/codelist-allowance";
import chargeCodes from "@node-zugferd/codelist-charge";
import type {
	ZugferdProfileRulesContext,
	ZugferdRuleId,
} from "@node-zugferd/core";

type Ctx = ZugferdProfileRulesContext;
type Kind = "allowance" | "charge";

const CREDIT_TRANSFER_CODES = new Set(["30", "58"]);
const FORMULA_EXEMPT_CATEGORIES = new Set([
	"S",
	"Z",
	"E",
	"AE",
	"K",
	"G",
	"O",
	"L",
	"M",
]);

const EXEMPTION_MEANINGS = {
	AE: {
		codes: ["VATEX-EU-AE"],
		phrases: ["reverse charge"],
	},
	K: {
		codes: ["VATEX-EU-IC"],
		phrases: ["intra-community supply", "intra community supply"],
	},
	G: {
		codes: ["VATEX-EU-G"],
		phrases: ["export outside the eu"],
	},
	O: {
		codes: ["VATEX-EU-O"],
		phrases: ["not subject to vat"],
	},
} as const;

export function enforceBasicWlRules(data: unknown, ctx: Ctx): void {
	const contract = readPath(data, ["transaction", "contract"]);
	const debit = readPath(data, ["transaction", "debit"]);
	const buyer = readPath(contract, ["buyer"]);
	const seller = readPath(contract, ["seller"]);
	const totals = readPath(debit, ["documentTotals"]);
	const allowances = items(readPath(debit, ["allowances"]));
	const charges = items(readPath(debit, ["charges"]));
	const breakdowns = items(readPath(debit, ["vatBreakdown"]));
	const paymentMeans = items(readPath(debit, ["paymentMeans"]));
	const taxRepresentative = readPath(contract, ["sellerTaxRepresentative"]);

	const buyerAddress = readPath(buyer, ["postalAddress"]);
	if (!isRecord(buyerAddress)) {
		fail(
			ctx,
			"BR-10",
			"An Invoice shall contain the Buyer postal address (BG-8).",
		);
	}
	if (!present(readPath(buyerAddress, ["countryCode"]))) {
		fail(
			ctx,
			"BR-11",
			"The Buyer postal address shall contain a Buyer country code (BT-55).",
		);
	}
	if (!hasAmount(readPath(totals, ["lineTotalAmount"]))) {
		fail(
			ctx,
			"BR-12",
			"An Invoice shall have the Sum of Invoice line net amount (BT-106).",
		);
	}

	const payee = readPath(debit, ["payee"]);
	if (isRecord(payee) && !present(payee.name)) {
		fail(
			ctx,
			"BR-17",
			"The Payee name (BT-59) shall be provided in the Invoice, if the Payee (BG-10) is different from the Seller (BG-4).",
		);
	}

	if (isRecord(taxRepresentative)) {
		if (!present(taxRepresentative.name)) {
			fail(
				ctx,
				"BR-18",
				"The Seller tax representative name (BT-62) shall be provided in the Invoice, if the Seller (BG-4) has a Seller tax representative party (BG-11).",
			);
		}
		const representativeAddress = taxRepresentative.postalAddress;
		if (!isRecord(representativeAddress)) {
			fail(
				ctx,
				"BR-19",
				"The Seller tax representative postal address (BG-12) shall be provided in the Invoice, if the Seller (BG-4) has a Seller tax representative party (BG-11).",
			);
		}
		if (!present(readPath(representativeAddress, ["countryCode"]))) {
			fail(
				ctx,
				"BR-20",
				"The Seller tax representative postal address (BG-12) shall contain a Tax representative country code (BT-69), if the Seller (BG-4) has a Seller tax representative party (BG-11).",
			);
		}
	}

	const period = readPath(debit, ["invoicingPeriod"]);
	if (
		isRecord(period) &&
		dateGiven(period.startDate) &&
		dateGiven(period.endDate)
	) {
		const start = readDate(period.startDate);
		const end = readDate(period.endDate);
		if (!start || !end || dateOrdinal(end) < dateOrdinal(start)) {
			fail(
				ctx,
				"BR-29",
				"If both Invoicing period start date (BT-73) and Invoicing period end date (BT-74) are given then the Invoicing period end date (BT-74) shall be later or equal to the Invoicing period start date (BT-73).",
			);
		}
	}

	checkEntryPresence(allowances, "allowance", ctx);
	checkEntryPresence(charges, "charge", ctx);

	for (const group of breakdowns) {
		if (!hasAmount(readPath(group, ["basisAmount"]))) {
			fail(
				ctx,
				"BR-45",
				"Each VAT breakdown (BG-23) shall have a VAT category taxable amount (BT-116).",
			);
		}
		if (!hasAmount(readPath(group, ["calculatedAmount"]))) {
			fail(
				ctx,
				"BR-46",
				"Each VAT breakdown (BG-23) shall have a VAT category tax amount (BT-117).",
			);
		}
		const category = present(readPath(group, ["categoryCode"]));
		if (!category) {
			fail(
				ctx,
				"BR-47",
				"Each VAT breakdown (BG-23) shall be defined through a VAT category code (BT-118).",
			);
		}
		if (
			category !== "O" &&
			amountNumber(readPath(group, ["rateApplicablePercent"])) === undefined
		) {
			fail(
				ctx,
				"BR-48",
				"Each VAT breakdown (BG-23) shall have a VAT category rate (BT-119), except if the Invoice is not subject to VAT.",
			);
		}
	}

	if (breakdowns.length === 0) {
		fail(
			ctx,
			"BR-CO-18",
			"An Invoice shall at least have one VAT breakdown group (BG-23).",
		);
	}

	for (const means of paymentMeans) {
		if (!present(readPath(means, ["typeCode"]))) {
			fail(
				ctx,
				"BR-49",
				"A Payment instruction (BG-16) shall specify the Payment means type code (BT-81).",
			);
		}
	}
	for (const means of paymentMeans) {
		for (const transfer of items(readPath(means, ["creditTransfers"]))) {
			if (!accountId(transfer).iban && !accountId(transfer).proprietary) {
				fail(
					ctx,
					"BR-50",
					"A Payment account identifier (BT-84) shall be present if Credit transfer (BG-17) information is provided in the Invoice.",
				);
			}
		}
	}

	if (present(readPath(debit, ["taxCurrencyCode"]))) {
		if (!hasAmount(readPath(totals, ["taxTotalAmountAccountingCurrency"]))) {
			fail(
				ctx,
				"BR-53",
				"If the VAT accounting currency code (BT-6) is present, then the Invoice total VAT amount in accounting currency (BT-111) shall be provided.",
			);
		}
	}

	for (const invoice of items(readPath(debit, ["precendingInvoices"]))) {
		if (!present(readPath(invoice, ["issuerAssignedId"]))) {
			fail(
				ctx,
				"BR-55",
				"Each Preceding Invoice reference (BG-3) shall contain a Preceding Invoice reference (BT-25).",
			);
		}
	}

	if (
		isRecord(taxRepresentative) &&
		!present(readPath(taxRepresentative, ["taxRegistration", "vat", "id"]))
	) {
		fail(
			ctx,
			"BR-56",
			"Each Seller tax representative party (BG-11) shall have a Seller tax representative VAT identifier (BT-63).",
		);
	}

	const deliverToAddress = readPath(data, [
		"transaction",
		"delivery",
		"recipient",
		"postalAddress",
	]);
	if (isRecord(deliverToAddress) && !present(deliverToAddress.countryCode)) {
		fail(
			ctx,
			"BR-57",
			"Each Deliver to address (BG-15) shall contain a Deliver to country code (BT-80).",
		);
	}

	for (const means of paymentMeans) {
		const typeCode = present(readPath(means, ["typeCode"]));
		if (!typeCode || !CREDIT_TRANSFER_CODES.has(typeCode)) continue;
		const hasAccount = items(readPath(means, ["creditTransfers"])).some(
			(transfer) => {
				const account = accountId(transfer);
				return !!(account.iban || account.proprietary);
			},
		);
		if (!hasAccount) {
			fail(
				ctx,
				"BR-61",
				"If the Payment means type code (BT-81) means SEPA credit transfer, Local credit transfer or Non-SEPA international credit transfer, the Payment account identifier (BT-84) shall be present.",
			);
		}
	}

	requireScheme(
		readPath(seller, ["electronicAddress"]),
		"BR-62",
		"The Seller electronic address (BT-34) shall have a Scheme identifier.",
		ctx,
	);
	requireScheme(
		readPath(buyer, ["electronicAddress"]),
		"BR-63",
		"The Buyer electronic address (BT-49) shall have a Scheme identifier.",
		ctx,
	);

	for (const group of breakdowns) {
		if (
			dateGiven(readPath(group, ["taxDueDate"])) &&
			present(readPath(group, ["dueDateTypeCode"]))
		) {
			fail(
				ctx,
				"BR-CO-03",
				"Value added tax point date (BT-7) and Value added tax point date code (BT-8) are mutually exclusive.",
			);
		}
	}

	checkReasonConsistency(allowances, allowanceCodes, "BR-CO-05", ctx);
	checkReasonConsistency(charges, chargeCodes, "BR-CO-06", ctx);
	assertAmountSum(
		allowances,
		readPath(totals, ["allowanceTotalAmount"]),
		"BR-CO-11",
		"Sum of allowances on document level (BT-107) = ∑ Document level allowance amount (BT-92).",
		ctx,
	);
	assertAmountSum(
		charges,
		readPath(totals, ["chargeTotalAmount"]),
		"BR-CO-12",
		"Sum of charges on document level (BT-108) = ∑ Document level charge amount (BT-99).",
		ctx,
	);

	const lineTotal = amountNumber(readPath(totals, ["lineTotalAmount"]));
	const allowanceTotal =
		amountNumber(readPath(totals, ["allowanceTotalAmount"])) ?? 0;
	const chargeTotal =
		amountNumber(readPath(totals, ["chargeTotalAmount"])) ?? 0;
	const taxBasis = amountNumber(readPath(totals, ["taxBasisTotalAmount"]));
	if (
		ctx.profile.id !== "extended" &&
		lineTotal !== undefined &&
		taxBasis !== undefined &&
		!moneyEquals(taxBasis, lineTotal - allowanceTotal + chargeTotal)
	) {
		fail(
			ctx,
			"BR-CO-13",
			"Invoice total amount without VAT (BT-109) = Sum of Invoice line net amount (BT-106) - Sum of allowances on document level (BT-107) + Sum of charges on document level (BT-108).",
		);
	}

	const vatSum = breakdowns.reduce<number>((sum, group) => {
		return sum + (amountNumber(readPath(group, ["calculatedAmount"])) ?? 0);
	}, 0);
	const taxTotal = readPath(totals, ["taxTotalAmount"]);
	const taxTotalAmount = amountNumber(taxTotal) ?? 0;
	if (
		(hasAmount(taxTotal) || vatSum !== 0) &&
		!moneyEquals(taxTotalAmount, vatSum)
	) {
		fail(
			ctx,
			"BR-CO-14",
			"Invoice total VAT amount (BT-110) = ∑ VAT category tax amount (BT-117).",
		);
	}

	const grandTotal = amountNumber(readPath(totals, ["grandTotalAmount"]));
	if (
		ctx.profile.id !== "extended" &&
		grandTotal !== undefined &&
		taxBasis !== undefined &&
		!moneyEquals(grandTotal, taxBasis + taxTotalAmount)
	) {
		fail(
			ctx,
			"BR-CO-15",
			"Invoice total amount with VAT (BT-112) = Invoice total amount without VAT (BT-109) + Invoice total VAT amount (BT-110).",
		);
	}

	const due = amountNumber(readPath(totals, ["duePayableAmount"]));
	const prepaid = amountNumber(readPath(totals, ["prepaidAmount"])) ?? 0;
	const rounding = amountNumber(readPath(totals, ["roundingAmount"])) ?? 0;
	if (
		ctx.profile.id !== "extended" &&
		due !== undefined &&
		grandTotal !== undefined &&
		!moneyEquals(due, grandTotal - prepaid + rounding)
	) {
		fail(
			ctx,
			"BR-CO-16",
			"Amount due for payment (BT-115) = Invoice total amount with VAT (BT-112) - Paid amount (BT-113) + Rounding amount (BT-114).",
		);
	}

	if (ctx.profile.id !== "extended") {
		for (const group of breakdowns) {
			const category = present(readPath(group, ["categoryCode"]));
			if (!category || FORMULA_EXEMPT_CATEGORIES.has(category)) continue;
			if (!isRecord(group) || vatMathMatches(group)) continue;
			fail(
				ctx,
				"BR-CO-17",
				"VAT category tax amount (BT-117) = VAT category taxable amount (BT-116) x (VAT category rate (BT-119) / 100), rounded to two decimals.",
			);
		}
	}

	if (
		isRecord(period) &&
		!dateGiven(period.startDate) &&
		!dateGiven(period.endDate)
	) {
		fail(
			ctx,
			"BR-CO-19",
			"If Invoicing period (BG-14) is used, the Invoicing period start date (BT-73) or the Invoicing period end date (BT-74) shall be filled, or both.",
		);
	}

	if (due !== undefined && due > 0) {
		const terms = items(readPath(debit, ["paymentTerms"]));
		const hasDueDate = terms.some((term) =>
			dateGiven(readPath(term, ["dueDate"])),
		);
		const hasTerms = terms.some(
			(term) => !!present(readPath(term, ["description"])),
		);
		if (!hasDueDate && !hasTerms) {
			fail(
				ctx,
				"BR-CO-25",
				"In case the Amount due for payment (BT-115) is positive, either the Payment due date (BT-9) or the Payment terms (BT-20) shall be present.",
			);
		}
	}

	checkChargeIndicator(allowances, false, ctx);
	checkChargeIndicator(charges, true, ctx);
	if (countBics(paymentMeans) > 1) {
		fail(ctx, "CII-SR-464", "Only one BT-86 element is allowed on an invoice.");
	}
	if (contactNameCount(seller) > 1) {
		fail(
			ctx,
			"CII-SR-465",
			"Only one BT-41 element is allowed on an invoice (Person Name or Department Name, but not both).",
		);
	}
	if (contactNameCount(buyer) > 1) {
		fail(
			ctx,
			"CII-SR-466",
			"Only one BT-56 element is allowed on an invoice (Person Name or Department Name, but not both).",
		);
	}
	if (distinctValues(paymentMeans, "typeCode").size > 1) {
		fail(
			ctx,
			"CII-SR-467",
			"All Payment means type codes (BT-81) shall have the same value across all SpecifiedTradeSettlementPaymentMeans.",
		);
	}
	if (distinctValues(paymentMeans, "information").size > 1) {
		fail(
			ctx,
			"CII-SR-468",
			"All Payment means texts (BT-82) shall have the same value across all SpecifiedTradeSettlementPaymentMeans.",
		);
	}
	if (paymentReferenceCount(debit, paymentMeans) > 1) {
		fail(
			ctx,
			"CII-SR-469",
			"Payment reference (BT-83) shall occur at most once in the document.",
		);
	}
	checkAccountChoice(paymentMeans, ctx);
	checkVatRatePresence(allowances, ctx);
	checkVatRatePresence(charges, ctx);

	for (const entry of allowances) checkEntryVat(entry, "allowance", data, ctx);
	for (const entry of charges) checkEntryVat(entry, "charge", data, ctx);
	for (const group of breakdowns) {
		if (isRecord(group)) checkBreakdownVat(group, ctx);
	}

	if (
		breakdowns.some(
			(group) => present(readPath(group, ["categoryCode"])) === "K",
		)
	) {
		const delivered = dateGiven(
			readPath(data, ["transaction", "delivery", "actualDelivery", "date"]),
		);
		const periodFilled =
			isRecord(period) &&
			(dateGiven(period.startDate) || dateGiven(period.endDate));
		if (!delivered && !periodFilled) {
			fail(
				ctx,
				"BR-IC-11",
				'In an Invoice with a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Intra-community supply" the Actual delivery date (BT-72) or the Invoicing period (BG-14) shall not be blank.',
			);
		}
		if (!present(readPath(deliverToAddress, ["countryCode"]))) {
			fail(
				ctx,
				"BR-IC-12",
				'In an Invoice with a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Intra-community supply" the Deliver to country code (BT-80) shall not be blank.',
			);
		}
	}

	if (
		breakdowns.some(
			(group) => present(readPath(group, ["categoryCode"])) === "O",
		)
	) {
		if (breakdowns.length > 1) {
			fail(
				ctx,
				"BR-O-11",
				'An Invoice that contains a VAT breakdown group (BG-23) with a VAT category code (BT-118) "Not subject to VAT" shall not contain other VAT breakdown groups (BG-23).',
			);
		}
		if (allowances.some((entry) => categoryOf(entry) !== "O")) {
			fail(
				ctx,
				"BR-O-13",
				'An Invoice that contains a VAT breakdown group (BG-23) with a VAT category code (BT-118) "Not subject to VAT" shall not contain Document level allowances (BG-20) where Document level allowance VAT category code (BT-95) is not "Not subject to VAT".',
			);
		}
		if (charges.some((entry) => categoryOf(entry) !== "O")) {
			fail(
				ctx,
				"BR-O-14",
				'An Invoice that contains a VAT breakdown group (BG-23) with a VAT category code (BT-118) "Not subject to VAT" shall not contain Document level charges (BG-21) where Document level charge VAT category code (BT-102) is not "Not subject to VAT".',
			);
		}
	}
}

function checkEntryPresence(entries: unknown[], kind: Kind, ctx: Ctx): void {
	const amountRule = kind === "allowance" ? "BR-31" : "BR-36";
	const categoryRule = kind === "allowance" ? "BR-32" : "BR-37";
	const reasonRule = kind === "allowance" ? "BR-33" : "BR-38";
	const label = kind === "allowance" ? "allowance" : "charge";
	const group = kind === "allowance" ? "BG-20" : "BG-21";
	for (const entry of entries) {
		if (
			isRecord(entry) &&
			Array.isArray(entry.actualAmount) &&
			entry.actualAmount.length > 1
		) {
			fail(ctx, "CII-SR-473", "ActualAmount should exist maximum once.");
		}
		if (!hasAmount(readPath(entry, ["actualAmount"]))) {
			fail(
				ctx,
				amountRule,
				`Each Document level ${label} (${group}) shall have a Document level ${label} amount (${kind === "allowance" ? "BT-92" : "BT-99"}).`,
			);
		}
		// CII-SR-471 requires the same VAT category code as BR-32 and BR-37.
		if (!categoryOf(entry)) {
			fail(
				ctx,
				categoryRule,
				`Each Document level ${label} (${group}) shall have a Document level ${label} VAT category code (${kind === "allowance" ? "BT-95" : "BT-102"}).`,
			);
		}
		// BR-CO-21 and BR-CO-22 allow either reason, either code, or both.
		if (
			!present(readPath(entry, ["reason"])) &&
			!present(readPath(entry, ["reasonCode"]))
		) {
			if (reasonRule !== "BR-38" || ctx.profile.id !== "extended") {
				fail(
					ctx,
					reasonRule,
					`Each Document level ${label} (${group}) shall have a Document level ${label} reason (${kind === "allowance" ? "BT-97" : "BT-104"}) or a Document level ${label} reason code (${kind === "allowance" ? "BT-98" : "BT-105"}).`,
				);
			}
		}
	}
}

function checkReasonConsistency(
	entries: unknown[],
	codelist: readonly { value: string; name: string }[],
	id: ZugferdRuleId,
	ctx: Ctx,
): void {
	if (ctx.profile.id !== "extended") {
		for (const entry of entries) {
			const reason = present(readPath(entry, ["reason"]));
			const reasonCode = present(readPath(entry, ["reasonCode"]));
			if (!reason || !reasonCode) continue;
			const named = codelist.find((item) => item.value === reasonCode);
			if (!named || normalize(named.name) !== normalize(reason)) {
				fail(
					ctx,
					id,
					id === "BR-CO-05"
						? "Document level allowance reason code (BT-98) and Document level allowance reason (BT-97) shall indicate the same type of allowance."
						: "Document level charge reason code (BT-105) and Document level charge reason (BT-104) shall indicate the same type of charge.",
				);
			}
		}
	}
}

function assertAmountSum(
	entries: unknown[],
	stated: unknown,
	id: ZugferdRuleId,
	message: string,
	ctx: Ctx,
): void {
	if (
		(id !== "BR-CO-11" && id !== "BR-CO-12") ||
		ctx.profile.id !== "extended"
	) {
		let sum = 0;
		let counted = false;
		for (const entry of entries) {
			const amount = amountNumber(readPath(entry, ["actualAmount"]));
			if (amount === undefined) continue;
			sum += amount;
			counted = true;
		}
		if (hasAmount(stated)) {
			const value = amountNumber(stated);
			if (value === undefined || !moneyEquals(value, sum))
				fail(ctx, id, message);
			return;
		}
		if (counted && !moneyEquals(sum, 0)) fail(ctx, id, message);
	}
}

function checkChargeIndicator(
	entries: unknown[],
	expectedCharge: boolean,
	ctx: Ctx,
): void {
	for (const entry of entries) {
		const indicator = chargeIndicator(readPath(entry, ["chargeIndicator"]));
		if (indicator === undefined || indicator === expectedCharge) continue;
		fail(
			ctx,
			"CII-SR-463",
			"Each Specified Trade Allowance Charge (BG-20)(BG-21) shall contain a Charge Indicator.",
		);
	}
}

function checkAccountChoice(paymentMeans: unknown[], ctx: Ctx): void {
	if (ctx.profile.id !== "extended") {
		for (const means of paymentMeans) {
			const typeCode = present(readPath(means, ["typeCode"]));
			const creditTransfer = CREDIT_TRANSFER_CODES.has(typeCode ?? "");
			for (const transfer of items(readPath(means, ["creditTransfers"]))) {
				const account = accountId(transfer);
				if (!(account.iban && account.proprietary)) continue;
				fail(
					ctx,
					creditTransfer ? "CII-SR-470" : "CII-SR-474",
					"Either the IBAN (BT-84) or a Proprietary ID (BT-84-0) shall be used.",
				);
			}
		}
	}
}

function checkVatRatePresence(entries: unknown[], ctx: Ctx): void {
	for (const entry of entries) {
		const category = categoryOf(entry);
		if (!category || category === "O") continue;
		if (rateOf(entry) === undefined) {
			fail(
				ctx,
				"CII-SR-472",
				"Each Specified Trade Allowance Charge (BG-20)(BG-21) should contain a VAT rate (BT-96).",
			);
		}
	}
}

function checkEntryVat(
	entry: unknown,
	kind: Kind,
	data: unknown,
	ctx: Ctx,
): void {
	const category = categoryOf(entry);
	const rate = rateOf(entry);
	if (category === "S") {
		requireStandardSellerTaxId(
			data,
			ctx,
			kind === "allowance" ? "BR-S-3" : "BR-S-4",
			kind,
			"Standard rated",
		);
		if (!(rate !== undefined && rate > 0)) {
			fail(
				ctx,
				kind === "allowance" ? "BR-S-6" : "BR-S-7",
				kind === "allowance"
					? 'In a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Standard rated" the Document level allowance VAT rate (BT-96) shall be greater than zero.'
					: 'In a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Standard rated" the Document level charge VAT rate (BT-103) shall be greater than zero.',
			);
		}
	}
	if (category === "Z") {
		requireStandardSellerTaxId(
			data,
			ctx,
			kind === "allowance" ? "BR-Z-3" : "BR-Z-4",
			kind,
			"Zero rated",
		);
		requireZeroRate(
			rate,
			ctx,
			kind === "allowance" ? "BR-Z-6" : "BR-Z-7",
			kind,
			"Zero rated",
		);
	}
	if (category === "E") {
		requireStandardSellerTaxId(
			data,
			ctx,
			kind === "allowance" ? "BR-E-3" : "BR-E-4",
			kind,
			"Exempt from VAT",
		);
		requireZeroRate(
			rate,
			ctx,
			kind === "allowance" ? "BR-E-6" : "BR-E-7",
			kind,
			"Exempt from VAT",
		);
	}
	if (category === "AE") {
		if (!hasStandardSellerTaxId(data) || !hasBuyerVatOrLegalId(data)) {
			fail(
				ctx,
				kind === "allowance" ? "BR-AE-3" : "BR-AE-4",
				kind === "allowance"
					? 'An Invoice that contains a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Reverse charge" shall contain the Seller VAT Identifier (BT-31), the Seller tax registration identifier (BT-32) and/or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48) and/or the Buyer legal registration identifier (BT-47).'
					: 'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Reverse charge" shall contain the Seller VAT Identifier (BT-31), the Seller tax registration identifier (BT-32) and/or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48) and/or the Buyer legal registration identifier (BT-47).',
			);
		}
	}
	if (category === "K") {
		if (!hasSellerVatOrRepresentative(data) || !hasBuyerVat(data)) {
			fail(
				ctx,
				kind === "allowance" ? "BR-IC-3" : "BR-IC-4",
				kind === "allowance"
					? 'An Invoice that contains a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Intra-community supply" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48).'
					: 'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Intra-community supply" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48).',
			);
		}
		requireZeroRate(
			rate,
			ctx,
			kind === "allowance" ? "BR-IC-6" : "BR-IC-7",
			kind,
			"Intra-community supply",
		);
	}
	if (category === "G") {
		if (!hasSellerVatOrRepresentative(data)) {
			fail(
				ctx,
				kind === "allowance" ? "BR-G-3" : "BR-G-4",
				kind === "allowance"
					? 'An Invoice that contains a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Export outside the EU" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63).'
					: 'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Export outside the EU" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63).',
			);
		}
		requireZeroRate(
			rate,
			ctx,
			kind === "allowance" ? "BR-G-6" : "BR-G-7",
			kind,
			"Export outside the EU",
		);
	}
	if (category === "O") {
		if (hasSellerVat(data) || hasRepresentativeVat(data) || hasBuyerVat(data)) {
			fail(
				ctx,
				kind === "allowance" ? "BR-O-3" : "BR-O-4",
				kind === "allowance"
					? 'An Invoice that contains a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "Not subject to VAT" shall not contain the Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) or the Buyer VAT identifier (BT-48).'
					: 'An Invoice that contains a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "Not subject to VAT" shall not contain the Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) or the Buyer VAT identifier (BT-48).',
			);
		}
		if (rate !== undefined) {
			fail(
				ctx,
				kind === "allowance" ? "BR-O-6" : "BR-O-7",
				kind === "allowance"
					? 'A Document level allowance (BG-20) where VAT category code (BT-95) is "Not subject to VAT" shall not contain a Document level allowance VAT rate (BT-96).'
					: 'A Document level charge (BG-21) where the VAT category code (BT-102) is "Not subject to VAT" shall not contain a Document level charge VAT rate (BT-103).',
			);
		}
	}
	if (category === "L" || category === "M") {
		const igic = category === "L";
		requireStandardSellerTaxId(
			data,
			ctx,
			kind === "allowance"
				? igic
					? "BR-AF-3"
					: "BR-AG-3"
				: igic
					? "BR-AF-4"
					: "BR-AG-4",
			kind,
			igic ? "IGIC" : "IPSI",
		);
		if (!(rate !== undefined && rate >= 0)) {
			fail(
				ctx,
				kind === "allowance"
					? igic
						? "BR-AF-6"
						: "BR-AG-6"
					: igic
						? "BR-AF-7"
						: "BR-AG-7",
				kind === "allowance"
					? `In a Document level allowance (BG-20) where the Document level allowance VAT category code (BT-95) is "${igic ? "IGIC" : "IPSI"}" the Document level allowance VAT rate (BT-96) shall be 0 (zero) or greater than zero.`
					: `In a Document level charge (BG-21) where the Document level charge VAT category code (BT-102) is "${igic ? "IGIC" : "IPSI"}" the Document level charge VAT rate (BT-103) shall be 0 (zero) or greater than zero.`,
			);
		}
	}
}

function checkBreakdownVat(group: Record<string, unknown>, ctx: Ctx): void {
	const category = present(group.categoryCode);
	if (category === "S") {
		if (!vatMathMatches(group)) {
			fail(
				ctx,
				"BR-S-9",
				'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where VAT category code (BT-118) is "Standard rated" shall equal the VAT category taxable amount (BT-116) multiplied by the VAT category rate (BT-119).',
			);
		}
		if (hasExemption(group)) {
			fail(
				ctx,
				"BR-S-10",
				'A VAT Breakdown (BG-23) with VAT Category code (BT-118) "Standard rate" shall not have a VAT exemption reason code (BT-121) or VAT exemption reason text (BT-120).',
			);
		}
	}
	if (category === "Z") {
		requireZeroTax(group, ctx, "BR-Z-9", "Zero rated");
		forbidExemption(group, ctx, "BR-Z-10", "Zero rated");
	}
	if (category === "E") {
		requireZeroTax(group, ctx, "BR-E-9", "Exempt from VAT");
		if (!hasExemption(group)) {
			fail(
				ctx,
				"BR-E-10",
				'A VAT Breakdown (BG-23) with VAT Category code (BT-118) "Exempt from VAT" shall have a VAT exemption reason code (BT-121) or a VAT exemption reason text (BT-120).',
			);
		}
	}
	if (category === "AE") {
		requireZeroTax(group, ctx, "BR-AE-9", "Reverse charge");
		requireExemptionMeaning(
			group,
			ctx,
			"BR-AE-10",
			"Reverse charge",
			EXEMPTION_MEANINGS.AE,
		);
	}
	if (category === "K") {
		requireZeroTax(group, ctx, "BR-IC-9", "Intra-community supply");
		requireExemptionMeaning(
			group,
			ctx,
			"BR-IC-10",
			"Intra-community supply",
			EXEMPTION_MEANINGS.K,
		);
	}
	if (category === "G") {
		requireZeroTax(group, ctx, "BR-G-9", "Export outside the EU");
		requireExemptionMeaning(
			group,
			ctx,
			"BR-G-10",
			"Export outside the EU",
			EXEMPTION_MEANINGS.G,
		);
	}
	if (category === "O") {
		requireZeroTax(group, ctx, "BR-O-9", "Not subject to VAT");
		requireExemptionMeaning(
			group,
			ctx,
			"BR-O-10",
			"Not subject to VAT",
			EXEMPTION_MEANINGS.O,
		);
	}
	if (category === "L") {
		if (!vatMathMatches(group)) {
			fail(
				ctx,
				"BR-AF-9",
				'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where VAT category code (BT-118) is "IGIC" shall equal the VAT category taxable amount (BT-116) multiplied by the VAT category rate (BT-119).',
			);
		}
		forbidExemption(group, ctx, "BR-AF-10", "IGIC");
	}
	if (category === "M") {
		if (!vatMathMatches(group)) {
			fail(
				ctx,
				"BR-AG-9",
				'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where VAT category code (BT-118) is "IPSI" shall equal the VAT category taxable amount (BT-116) multiplied by the VAT category rate (BT-119).',
			);
		}
		forbidExemption(group, ctx, "BR-AG-10", "IPSI");
	}
}

function requireStandardSellerTaxId(
	data: unknown,
	ctx: Ctx,
	id: ZugferdRuleId,
	kind: Kind,
	categoryName: string,
): void {
	if (hasStandardSellerTaxId(data)) return;
	const label = kind === "allowance" ? "allowance" : "charge";
	const group = kind === "allowance" ? "BG-20" : "BG-21";
	const code = kind === "allowance" ? "BT-95" : "BT-102";
	fail(
		ctx,
		id,
		`An Invoice that contains a Document level ${label} (${group}) where the Document level ${label} VAT category code (${code}) is "${categoryName}" shall contain the Seller VAT Identifier (BT-31), the Seller tax registration identifier (BT-32) and/or the Seller tax representative VAT identifier (BT-63).`,
	);
}

function requireZeroRate(
	rate: number | undefined,
	ctx: Ctx,
	id: ZugferdRuleId,
	kind: Kind,
	categoryName: string,
): void {
	if (rate !== undefined && Math.abs(rate) < 0.000001) return;
	const label = kind === "allowance" ? "allowance" : "charge";
	const group = kind === "allowance" ? "BG-20" : "BG-21";
	const code = kind === "allowance" ? "BT-95" : "BT-102";
	const rateCode = kind === "allowance" ? "BT-96" : "BT-103";
	fail(
		ctx,
		id,
		`In a Document level ${label} (${group}) where the Document level ${label} VAT category code (${code}) is "${categoryName}" the Document level ${label} VAT rate (${rateCode}) shall be 0 (zero).`,
	);
}

function requireZeroTax(
	group: Record<string, unknown>,
	ctx: Ctx,
	id: ZugferdRuleId,
	categoryName: string,
): void {
	const tax = amountNumber(group.calculatedAmount);
	if (tax !== undefined && Math.abs(tax) < 0.001) return;
	fail(
		ctx,
		id,
		`The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where the VAT category code (BT-118) is "${categoryName}" shall be 0 (zero).`,
	);
}

function forbidExemption(
	group: Record<string, unknown>,
	ctx: Ctx,
	id: ZugferdRuleId,
	categoryName: string,
): void {
	if (!hasExemption(group)) return;
	fail(
		ctx,
		id,
		`A VAT Breakdown (BG-23) with VAT Category code (BT-118) "${categoryName}" shall not have a VAT exemption reason code (BT-121) or VAT exemption reason text (BT-120).`,
	);
}

function requireExemptionMeaning(
	group: Record<string, unknown>,
	ctx: Ctx,
	id: ZugferdRuleId,
	categoryName: string,
	meaning: { codes: readonly string[]; phrases: readonly string[] },
): void {
	const code = present(group.exemptionReasonCode);
	const reason = normalize(present(group.exemptionReason) ?? "");
	if (
		(code && meaning.codes.some((expected) => expected === code)) ||
		meaning.phrases.some((phrase) => phrase === reason)
	) {
		return;
	}
	fail(
		ctx,
		id,
		`A VAT Breakdown (BG-23) with VAT Category code (BT-118) "${categoryName}" shall have a VAT exemption reason code (BT-121), meaning "${categoryName}" or the VAT exemption reason text (BT-120) "${categoryName}" (or the equivalent standard text in another language).`,
	);
}

function hasStandardSellerTaxId(data: unknown): boolean {
	return (
		hasSellerVat(data) ||
		hasSellerLocalTaxId(data) ||
		hasRepresentativeVat(data)
	);
}

function hasSellerVatOrRepresentative(data: unknown): boolean {
	return hasSellerVat(data) || hasRepresentativeVat(data);
}

function hasSellerVat(data: unknown): boolean {
	return !!present(
		readPath(data, [
			"transaction",
			"contract",
			"seller",
			"taxRegistration",
			"vat",
			"id",
		]),
	);
}

function hasSellerLocalTaxId(data: unknown): boolean {
	return !!present(
		readPath(data, [
			"transaction",
			"contract",
			"seller",
			"taxRegistration",
			"local",
			"id",
		]),
	);
}

function hasRepresentativeVat(data: unknown): boolean {
	return !!present(
		readPath(data, [
			"transaction",
			"contract",
			"sellerTaxRepresentative",
			"taxRegistration",
			"vat",
			"id",
		]),
	);
}

function hasBuyerVat(data: unknown): boolean {
	return !!present(
		readPath(data, [
			"transaction",
			"contract",
			"buyer",
			"taxRegistration",
			"vat",
			"id",
		]),
	);
}

function hasBuyerVatOrLegalId(data: unknown): boolean {
	return (
		hasBuyerVat(data) ||
		!!present(
			readPath(data, [
				"transaction",
				"contract",
				"buyer",
				"organization",
				"id",
			]),
		)
	);
}

function requireScheme(
	value: unknown,
	id: ZugferdRuleId,
	message: string,
	ctx: Ctx,
): void {
	if (!electronicAddressPresent(value)) return;
	if (!present(readPath(value, ["schemeId"]))) fail(ctx, id, message);
}

function electronicAddressPresent(value: unknown): boolean {
	if (typeof value === "string") return value.trim() !== "";
	return !!present(value);
}

function categoryOf(entry: unknown): string | undefined {
	return present(readPath(entry, ["categoryTradeTax", "categoryCode"]));
}

function rateOf(entry: unknown): number | undefined {
	return amountNumber(
		readPath(entry, ["categoryTradeTax", "rateApplicablePercent"]),
	);
}

function accountId(transfer: unknown): {
	iban: string | undefined;
	proprietary: string | undefined;
} {
	return {
		iban: present(readPath(transfer, ["iban"])),
		proprietary: present(readPath(transfer, ["proprietaryId"])),
	};
}

function countBics(paymentMeans: unknown[]): number {
	let count = 0;
	for (const means of paymentMeans) {
		const bic = readPath(means, ["sellerBankDetails", "bic"]);
		if (Array.isArray(bic))
			count += bic.filter((value) => present(value)).length;
		else if (present(bic)) count += 1;
	}
	return count;
}

function contactNameCount(party: unknown): number {
	let count = 0;
	for (const contact of items(readPath(party, ["contact"]))) {
		if (present(readPath(contact, ["personName"]))) count += 1;
		if (present(readPath(contact, ["departmentName"]))) count += 1;
	}
	return count;
}

function distinctValues(paymentMeans: unknown[], key: string): Set<string> {
	return new Set(
		paymentMeans.map((means) => present(readPath(means, [key])) ?? ""),
	);
}

function paymentReferenceCount(
	debit: unknown,
	paymentMeans: unknown[],
): number {
	return (
		valueCount(readPath(debit, ["paymentReference"])) +
		paymentMeans.reduce<number>(
			(sum, means) => sum + valueCount(readPath(means, ["paymentReference"])),
			0,
		)
	);
}

function valueCount(value: unknown): number {
	if (Array.isArray(value)) return value.filter((item) => present(item)).length;
	return present(value) ? 1 : 0;
}

function chargeIndicator(value: unknown): boolean | undefined {
	if (typeof value === "boolean") return value;
	if (value === "true") return true;
	if (value === "false") return false;
	if (isRecord(value) && "indicator" in value)
		return chargeIndicator(value.indicator);
	return undefined;
}

function hasExemption(group: Record<string, unknown>): boolean {
	return (
		!!present(group.exemptionReason) || !!present(group.exemptionReasonCode)
	);
}

function vatMathMatches(group: Record<string, unknown>): boolean {
	const basis = amountNumber(group.basisAmount);
	const rate = amountNumber(group.rateApplicablePercent);
	const tax = amountNumber(group.calculatedAmount);
	if (basis === undefined || rate === undefined || tax === undefined)
		return true;
	const expected = round2((basis * rate) / 100);
	return decimalPlaces(tax) <= 2 && Math.abs(tax - expected) < 0.005;
}

function moneyEquals(left: number, right: number): boolean {
	return Math.abs(left - right) < 0.001;
}

function round2(value: number): number {
	return Math.round((value + Number.EPSILON) * 100) / 100;
}

function decimalPlaces(value: number): number {
	const fraction = value.toFixed(10).split(".")[1]?.replace(/0+$/, "") ?? "";
	return fraction.length;
}

function hasAmount(value: unknown): boolean {
	return amountNumber(value) !== undefined;
}

function amountNumber(value: unknown): number | undefined {
	if (typeof value === "number")
		return Number.isFinite(value) ? value : undefined;
	if (typeof value === "string") {
		const lexical = value.trim();
		if (!/^[+-]?\d+(?:\.\d+)?$/.test(lexical)) return undefined;
		const parsed = Number(lexical);
		return Number.isFinite(parsed) ? parsed : undefined;
	}
	if (isRecord(value) && "value" in value) return amountNumber(value.value);
	return undefined;
}

function dateGiven(value: unknown): boolean {
	if (value == null) return false;
	if (value instanceof Date) return !Number.isNaN(value.getTime());
	if (typeof value === "number") return Number.isFinite(value);
	if (typeof value === "string") return value.trim() !== "";
	if (isRecord(value)) return dateGiven(value.date) || dateGiven(value.value);
	return false;
}

function readDate(value: unknown): Date | undefined {
	if (value instanceof Date) {
		return Number.isNaN(value.getTime()) ? undefined : value;
	}
	if (typeof value === "number" && Number.isFinite(value)) {
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? undefined : date;
	}
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (/^\d{8}$/.test(trimmed)) {
			const year = Number(trimmed.slice(0, 4));
			const month = Number(trimmed.slice(4, 6));
			const day = Number(trimmed.slice(6, 8));
			const date = new Date(Date.UTC(year, month - 1, day));
			return Number.isNaN(date.getTime()) ? undefined : date;
		}
		const parsed = new Date(trimmed);
		return Number.isNaN(parsed.getTime()) ? undefined : parsed;
	}
	if (isRecord(value)) {
		if (value.date != null) return readDate(value.date);
		if (value.value != null) return readDate(value.value);
	}
	return undefined;
}

function dateOrdinal(date: Date): number {
	return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function present(value: unknown): string | undefined {
	if (typeof value === "string") {
		const trimmed = value.trim();
		return trimmed || undefined;
	}
	if (!isRecord(value)) return undefined;
	if (typeof value.identifier === "string") return present(value.identifier);
	if (typeof value.value === "string") return present(value.value);
	return undefined;
}

function normalize(value: string): string {
	return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function items(value: unknown): unknown[] {
	if (value == null) return [];
	return Array.isArray(value) ? value : [value];
}

function readPath(value: unknown, path: string[]): unknown {
	let current = value;
	for (const key of path) {
		if (!isRecord(current)) return undefined;
		current = current[key];
	}
	return current;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return !!value && typeof value === "object" && !Array.isArray(value);
}

const SKIPPED_ON_EXTENDED = new Set<ZugferdRuleId>([
	"BR-S-9",
	"BR-S-10",
	"BR-Z-10",
	"BR-O-3",
	"BR-O-4",
	"BR-O-11",
	"BR-O-13",
	"BR-O-14",
	"BR-AF-10",
	"BR-AG-10",
]);

function fail(ctx: Ctx, id: ZugferdRuleId, message: string): void {
	if (ctx.profile.id === "extended" && SKIPPED_ON_EXTENDED.has(id)) return;
	throw ctx.error(id, message);
}
