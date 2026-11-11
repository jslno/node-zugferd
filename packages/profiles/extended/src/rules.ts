import characteristicCodes from "@node-zugferd/codelist-characteristic";
import chargeCodes from "@node-zugferd/codelist-charge";
import textCodes from "@node-zugferd/codelist-text";
import untdid5153 from "@node-zugferd/codelist-untdid-5153";
import type {
	ZugferdProfileRulesContext,
	ZugferdRuleId,
} from "@node-zugferd/core";

type Ctx = Pick<ZugferdProfileRulesContext, "error">;
type ContributionKind = "line" | "allowance" | "charge" | "logistics";

type Contribution = {
	kind: ContributionKind;
	amount: number;
	category: string;
	rate: number | undefined;
	exemption: string;
};

type VatRule = {
	code: string;
	name: string;
	presence: ZugferdRuleId;
	sum: ZugferdRuleId;
};

const LINE_SUBTYPES = new Set(["DETAIL", "GROUP", "INFORMATION"]);
const TOLERANCE = 0.01;
const EPSILON = 1e-9;

const VAT_RULES: VatRule[] = [
	vat("S", "Standard rated", "BR-FXEXT-S-01", "BR-FXEXT-S-08b"),
	vat("Z", "Zero rated", "BR-FXEXT-Z-01", "BR-FXEXT-Z-08b"),
	vat("E", "Exempt from VAT", "BR-FXEXT-E-01", "BR-FXEXT-E-08b"),
	vat("AE", "Reverse charge", "BR-FXEXT-AE-01", "BR-FXEXT-AE-08b"),
	vat("K", "Intra-community supply", "BR-FXEXT-IC-01", "BR-FXEXT-IC-08b"),
	vat("G", "Export outside the EU", "BR-FXEXT-G-01", "BR-FXEXT-G-08b"),
	vat("O", "Not subject to VAT", "BR-FXEXT-O-01", "BR-FXEXT-O-08b"),
	vat("L", "IGIC", "BR-FXEXT-AF-01", "BR-FXEXT-AF-08b"),
	vat("M", "IPSI", "BR-FXEXT-AG-01", "BR-FXEXT-AG-08b"),
];

const PARTY_PATHS = [
	["transaction", "contract", "salesAgent"],
	["transaction", "contract", "buyerTaxRepresentative"],
	["transaction", "contract", "deviatingEndUser"],
	["transaction", "contract", "buyerAgent"],
	["transaction", "delivery", "recipient"],
	["transaction", "delivery", "finalRecipient"],
	["transaction", "delivery", "deviatingSender"],
	["transaction", "debit", "invoicer"],
	["transaction", "debit", "invoicee"],
	["transaction", "debit", "payee"],
	["transaction", "debit", "payer"],
];

export function enforceExtendedRules(data: unknown, ctx: Ctx): void {
	const lines = items(readPath(data, ["transaction", "line"]));
	const debit = readPath(data, ["transaction", "debit"]);
	const allowances = items(readPath(debit, ["allowances"]));
	const charges = items(readPath(debit, ["charges"]));
	const logistics = items(readPath(debit, ["logisticsServiceFees"]));
	const breakdowns = items(readPath(debit, ["vatBreakdown"])).filter(isRecord);
	const contributions = collectContributions(
		lines,
		allowances,
		charges,
		logistics,
	);

	checkLines(lines, ctx);
	checkHierarchy(lines, ctx);
	checkAttributes(lines, ctx);
	checkLineNotes(lines, ctx);
	checkLineCharges(lines, ctx);
	checkDocumentCharges(charges, ctx);
	checkInvoiceNotes(data, ctx);
	checkPartners(data, ctx);
	checkTotals(lines, debit, allowances, charges, logistics, ctx);
	checkVat(breakdowns, contributions, ctx);
}

function vat(
	code: string,
	name: string,
	presence: ZugferdRuleId,
	sum: ZugferdRuleId,
): VatRule {
	return { code, name, presence, sum };
}

function checkLines(lines: unknown[], ctx: Ctx): void {
	for (const line of lines) {
		const kind = subtype(line);
		if (kind && !LINE_SUBTYPES.has(kind)) {
			fail(
				ctx,
				"BR-FXEXT-05",
				'The code for the subtype of the invoice line item (BT-X-8) must be "DETAIL", "GROUP", or "INFORMATION".',
			);
		}
		if (!isRegular(line)) continue;
		if (!hasCategory(line)) {
			fail(
				ctx,
				"BR-FXEXT-CO-04",
				'Each Invoice line (BG-25) shall be categorized with an Invoiced item VAT category code (BT-151), if the subtype of the invoice line item (BT-X-8) is "DETAIL" or is not specified.',
			);
		}
		if (!hasQuantity(line)) {
			fail(
				ctx,
				"BR-FXEXT-BR-22",
				'Each Invoice line (BG-25) shall have an Invoiced quantity (BT-129), if the subtype of the invoice line item (BT-X-8) is "DETAIL" or is not specified.',
			);
		}
		if (!hasUnit(line)) {
			fail(
				ctx,
				"BR-FXEXT-BR-23",
				'An Invoice line (BG-25) shall have an Invoiced quantity unit of measure code (BT-130), if the subtype of the invoice line item (BT-X-8) is "DETAIL" or is not specified.',
			);
		}
		if (lineNet(line) === undefined) {
			fail(
				ctx,
				"BR-FXEXT-BR-24",
				'Each Invoice line (BG-25) shall have an Invoice line net amount (BT-131), if the subtype of the invoice line item (BT-X-8) is "DETAIL" or is not specified.',
			);
		}
		if (!hasNetPrice(line)) {
			fail(
				ctx,
				"BR-FXEXT-BR-26",
				'Each Invoice line (BG-25) shall contain the Item net price (BT-146), if the subtype of the invoice line item (BT-X-8) is "DETAIL" or is not specified.',
			);
		}
	}
}

function checkHierarchy(lines: unknown[], ctx: Ctx): void {
	for (const line of lines) {
		if (!parentLineId(line) || subtype(line)) continue;
		fail(
			ctx,
			"BR-FXEXT-06",
			"If the identifier of the parent line (BT-X-304) is used, the subtype of the invoice line item (BT-X-8) must be specified.",
		);
	}
	for (const line of lines) {
		const parent = parentLineId(line);
		if (!parent) continue;
		const exists = lines.some(
			(other) => other !== line && lineId(other) === parent,
		);
		if (!exists) {
			fail(
				ctx,
				"BR-FXEXT-11",
				"Each identifier of the parent line (BT-X-304) must refer to an existing invoice line identifier (BT-126) of another invoice line (BG-25).",
			);
		}
	}
	for (const line of lines) {
		if (subtype(line) !== "GROUP" || lineNet(line) === undefined) continue;
		const children = directChildren(lines, lineId(line));
		let sum = 0;
		for (const child of children) {
			const kind = subtype(child);
			if (kind !== "DETAIL" && kind !== "GROUP") continue;
			sum += lineNet(child) ?? 0;
		}
		if (!moneyEquals(lineNet(line) ?? 0, sum)) {
			fail(
				ctx,
				"BR-FXEXT-08",
				"A GROUP invoice line net amount (BT-131) must equal the sum of the invoice line net amounts of the next lower DETAIL or GROUP lines.",
			);
		}
	}
	for (const line of lines) {
		if (subtype(line) !== "GROUP" || lineNet(line) === undefined) continue;
		const id = lineId(line);
		if (!id) continue;
		for (const descendant of descendants(lines, id)) {
			if (
				subtype(descendant) === "GROUP" &&
				lineNet(descendant) === undefined
			) {
				fail(
					ctx,
					"BR-FXEXT-12",
					"If a GROUP invoice line has an invoice line net amount (BT-131), every lower GROUP line must also have an invoice line net amount (BT-131).",
				);
			}
		}
	}
}

function checkAttributes(lines: unknown[], ctx: Ctx): void {
	for (const line of lines) {
		for (const attribute of items(readPath(line, ["item", "attributes"]))) {
			checkAttribute(attribute, ctx);
		}
	}
}

function checkAttribute(attribute: unknown, ctx: Ctx): void {
	const name =
		present(readPath(attribute, ["description"])) ??
		present(readPath(attribute, ["name"]));
	const code = present(readPath(attribute, ["typeCode"]));
	if (!name && !code) {
		fail(
			ctx,
			"BR-FXEXT-BR-54-1",
			"Each Item attribute (BG-32) shall contain an Item attribute name (BT-160) or an Item attribute code (BT-X-11), or both.",
		);
	}
	const value = present(readPath(attribute, ["value"]));
	const hasMeasure =
		amountNumber(readPath(attribute, ["valueMeasure"])) !== undefined;
	if ((value && hasMeasure) || (!value && !hasMeasure)) {
		fail(
			ctx,
			"BR-FXEXT-BR-54-2",
			"Each Item attribute (BG-32) shall contain an Item attribute value (BT-161) or an Item attribute value with unit of measure (BT-X-12), but not both.",
		);
	}
	if (code && !characteristicCodes.some((item) => item.value === code)) {
		fail(
			ctx,
			"BR-FXEXT-04",
			"Item attribute code (BT-X-11) shall use a value from UNTDED 6313 plus the Factur-X extension.",
		);
	}
}

function checkLineNotes(lines: unknown[], ctx: Ctx): void {
	for (const line of lines) {
		for (const note of items(readPath(line, ["position", "includedNote"]))) {
			checkCodedNote(
				note,
				"BR-FXEXT-02",
				"If the invoice line free text subject code (BT-X-10) is specified, either the coded invoice line free text (BT-X-9) or the invoice line free text (BT-127) must be specified. If both are specified, they must have the same meaning.",
				ctx,
			);
		}
	}
}

function checkLineCharges(lines: unknown[], ctx: Ctx): void {
	for (const line of lines) {
		for (const charge of items(readPath(line, ["billing", "charges"]))) {
			const reason = present(readPath(charge, ["reason"]));
			const code = present(readPath(charge, ["reasonCode"]));
			if (!reason && !code) {
				fail(
					ctx,
					"BR-FXEXT-CO-24",
					"Each Invoice line charge (BG-28) shall contain an Invoice line charge reason (BT-144) or an Invoice line charge reason code (BT-145) or an Invoice line tax type code (BT-193).",
				);
			}
			if (reason && code && !chargeReasonsMatch(reason, code)) {
				fail(
					ctx,
					"BR-FXEXT-CO-08",
					"Invoice line charge reason code (BT-145) or invoice line tax type code (BT-193) and invoice line charge reason (BT-144) shall indicate the same type of charge.",
				);
			}
		}
	}
}

function checkDocumentCharges(charges: unknown[], ctx: Ctx): void {
	for (const charge of charges) {
		const reason = present(readPath(charge, ["reason"]));
		const code = present(readPath(charge, ["reasonCode"]));
		if (!reason && !code) {
			fail(
				ctx,
				"BR-FXEXT-CO-22",
				"Each Document level charge (BG-21) shall contain a Document level charge reason (BT-104), a Document level non-VAT tax (BT-177), or a Document level charge reason code (BT-105).",
			);
		}
		if (reason && code && !chargeReasonsMatch(reason, code)) {
			fail(
				ctx,
				"BR-FXEXT-CO-06",
				"Document level charge reason code (BT-105) and Document level charge reason (BT-104) or Document level non-VAT tax (BT-177) shall indicate the same type of charge.",
			);
		}
	}
}

function checkInvoiceNotes(data: unknown, ctx: Ctx): void {
	for (const note of items(
		readPath(data, ["exchangedDocument", "invoiceNotes"]),
	)) {
		checkCodedNote(
			note,
			"BR-FXEXT-01",
			"If the invoice free text subject code (BT-21) is specified, either the coded message free text (BT-X-5) or the message free text (BT-22) must be specified. If both are specified, they must have the same meaning.",
			ctx,
		);
	}
}

function checkCodedNote(
	note: unknown,
	id: ZugferdRuleId,
	message: string,
	ctx: Ctx,
): void {
	if (!present(readPath(note, ["subjectCode"]))) return;
	const coded = present(readPath(note, ["contentCode"]));
	const free = present(readPath(note, ["content"]));
	if (!coded && !free) fail(ctx, id, message);
	if (coded && free && !textsMatch(coded, free)) fail(ctx, id, message);
}

function checkPartners(data: unknown, ctx: Ctx): void {
	for (const party of parties(data)) {
		const registration = readPath(party, ["taxRegistration"]);
		if (!isRecord(registration)) continue;
		for (const [key, value] of Object.entries(registration)) {
			if (key === "vat" || !taxIdPresent(value)) continue;
			fail(
				ctx,
				"BR-FXEXT-03",
				"Only a VAT registration identifier may be provided for a line or document ship-to, ultimate ship-to, ship-from, sales agent, buyer tax representative, product end user, buyer agent, invoicer, invoicee, payee, payer, or payment-term payee.",
			);
		}
	}
}

function parties(data: unknown): unknown[] {
	const found: unknown[] = [];
	for (const line of items(readPath(data, ["transaction", "line"]))) {
		found.push(readPath(line, ["delivery", "recipient"]));
		found.push(readPath(line, ["delivery", "deviatingFinalRecipient"]));
	}
	for (const path of PARTY_PATHS) found.push(readPath(data, path));
	for (const terms of items(
		readPath(data, ["transaction", "debit", "paymentTerms"]),
	)) {
		found.push(...items(readPath(terms, ["payeePerPayment"])));
	}
	return found;
}

function checkTotals(
	lines: unknown[],
	debit: unknown,
	allowances: unknown[],
	charges: unknown[],
	logistics: unknown[],
	ctx: Ctx,
): void {
	const totals = readPath(debit, ["documentTotals"]);
	const nets = detailNets(lines);
	const allowanceAmounts = entryAmounts(allowances, ["actualAmount"]);
	const chargeAmounts = entryAmounts(charges, ["actualAmount"]);
	const logisticsAmounts = entryAmounts(logistics, ["feeAmount"]);
	const thirdParty = entryAmounts(
		items(readPath(debit, ["financialAdjustments"])),
		["actualAmount"],
	);

	if (
		!withinTolerance(
			readPath(totals, ["lineTotalAmount"]),
			sum(nets),
			nets.length,
		)
	) {
		fail(
			ctx,
			"BR-FXEXT-CO-10",
			"Sum of invoice line net amount (BT-106) shall equal the sum of detail invoice line net amounts (BT-131), within a tolerance of 0.01 per line net amount.",
		);
	}
	if (
		!withinTolerance(
			readPath(totals, ["allowanceTotalAmount"]),
			sum(allowanceAmounts),
			allowanceAmounts.length,
		)
	) {
		fail(
			ctx,
			"BR-FXEXT-CO-11",
			"Sum of allowances on document level (BT-107) shall equal the sum of document level allowance amounts (BT-92), within a tolerance of 0.01 per allowance.",
		);
	}
	if (
		!withinTolerance(
			readPath(totals, ["chargeTotalAmount"]),
			sum(chargeAmounts) + sum(logisticsAmounts),
			chargeAmounts.length + logisticsAmounts.length,
		)
	) {
		fail(
			ctx,
			"BR-FXEXT-CO-12",
			"Sum of charges on document level (BT-108) shall equal the sum of document level charge amounts (BT-99) and logistics service fee amounts (BT-X-272), within a tolerance of 0.01 per amount.",
		);
	}
	if (
		!withinTolerance(
			readPath(totals, ["taxBasisTotalAmount"]),
			sum(nets) - sum(allowanceAmounts) + sum(chargeAmounts),
			nets.length + allowanceAmounts.length + chargeAmounts.length,
		)
	) {
		fail(
			ctx,
			"BR-FXEXT-CO-13",
			"Invoice total amount without VAT (BT-109) shall equal the sum of detail line net amounts minus document allowances plus document charges, within a tolerance of 0.01 per amount.",
		);
	}

	const taxBasis = amountNumber(readPath(totals, ["taxBasisTotalAmount"])) ?? 0;
	const taxTotal = readPath(totals, ["taxTotalAmount"]);
	const invoiceCurrency = present(readPath(debit, ["invoiceCurrencyCode"]));
	const calculationCount =
		nets.length +
		allowanceAmounts.length +
		chargeAmounts.length +
		logisticsAmounts.length;
	if (taxInInvoiceCurrency(taxTotal, invoiceCurrency)) {
		if (
			!withinTolerance(
				readPath(totals, ["grandTotalAmount"]),
				taxBasis + (amountNumber(taxTotal) ?? 0),
				calculationCount,
			)
		) {
			fail(
				ctx,
				"BR-FXEXT-CO-15",
				"Invoice total amount with VAT (BT-112) shall equal the invoice total without VAT (BT-109) plus the invoice total VAT amount (BT-110), within a tolerance of 0.01 per amount, when the VAT amount currency equals the invoice currency (BT-5).",
			);
		}
	} else if (
		!moneyEquals(
			amountNumber(readPath(totals, ["grandTotalAmount"])) ?? 0,
			taxBasis,
		)
	) {
		fail(
			ctx,
			"BR-FXEXT-CO-15",
			"Invoice total amount with VAT (BT-112) shall equal the invoice total amount without VAT (BT-109) when the invoice total VAT amount is absent or uses another currency.",
		);
	}

	const due =
		(amountNumber(readPath(totals, ["grandTotalAmount"])) ?? 0) -
		(amountNumber(readPath(totals, ["prepaidAmount"])) ?? 0) +
		(amountNumber(readPath(totals, ["roundingAmount"])) ?? 0) +
		sum(thirdParty);
	if (
		!moneyEquals(amountNumber(readPath(totals, ["duePayableAmount"])) ?? 0, due)
	) {
		fail(
			ctx,
			"BR-FXEXT-CO-16",
			"Amount due for payment (BT-115) shall equal the invoice total with VAT (BT-112) minus the paid amount (BT-113) plus the rounding amount (BT-114) plus the sum of third-party charge amounts (BT-179).",
		);
	}
}

function checkVat(
	breakdowns: Record<string, unknown>[],
	contributions: Contribution[],
	ctx: Ctx,
): void {
	for (const rule of VAT_RULES) {
		const used = contributions.some((item) => item.category === rule.code);
		if (!used) continue;
		const found = breakdowns.some(
			(group) => present(group.categoryCode) === rule.code,
		);
		if (!found) {
			fail(
				ctx,
				rule.presence,
				`An invoice that contains a detail line, document allowance, document charge, or logistics service fee with VAT category "${rule.code}" ("${rule.name}") shall contain at least one VAT breakdown (BG-23) with that category.`,
			);
		}
	}
	for (const rule of VAT_RULES)
		checkCategorySum(rule, breakdowns, contributions, ctx);
	checkStandardTax(breakdowns, contributions, ctx);
}

function checkCategorySum(
	rule: VatRule,
	breakdowns: Record<string, unknown>[],
	contributions: Contribution[],
	ctx: Ctx,
): void {
	for (const group of breakdowns) {
		if (present(group.categoryCode) !== rule.code) continue;
		const basis = amountNumber(group.basisAmount);
		if (basis === undefined) continue;
		const rate = amountNumber(group.rateApplicablePercent);
		const exemption = exemptionKey(
			group.exemptionReason,
			group.exemptionReasonCode,
		);
		const ungrouped = evaluate(contributions, rule.code, rate);
		const grouped = evaluate(contributions, rule.code, rate, exemption);
		if (within(basis, ungrouped) || within(basis, grouped)) continue;
		fail(
			ctx,
			rule.sum,
			`VAT category taxable amount (BT-116) for "${rule.code}" ("${rule.name}") shall equal detail line nets minus allowances plus charges and logistics fees for that category, within a tolerance of 0.01 per amount.`,
		);
	}
}

function checkStandardTax(
	breakdowns: Record<string, unknown>[],
	contributions: Contribution[],
	ctx: Ctx,
): void {
	for (const group of breakdowns) {
		if (present(group.categoryCode) !== "S") continue;
		const basis = amountNumber(group.basisAmount);
		const tax = amountNumber(group.calculatedAmount);
		const rate = amountNumber(group.rateApplicablePercent);
		if (basis === undefined || tax === undefined || rate === undefined)
			continue;
		const exemption = exemptionKey(
			group.exemptionReason,
			group.exemptionReasonCode,
		);
		const ungrouped = contributions.filter((item) =>
			matches(item, "S", rate),
		).length;
		const grouped = contributions.filter((item) =>
			matches(item, "S", rate, exemption),
		).length;
		const count = Math.max(ungrouped, grouped);
		const expected = (basis * rate) / 100;
		if (Math.abs(tax - expected) <= TOLERANCE * count + EPSILON) continue;
		fail(
			ctx,
			"BR-FXEXT-S-09b",
			'VAT category tax amount (BT-117) shall equal the VAT category taxable amount (BT-116) multiplied by the VAT rate (BT-119) / 100, within a tolerance of 0.01 per matching amount, where the VAT category code is "Standard rated" (S).',
		);
	}
}

function collectContributions(
	lines: unknown[],
	allowances: unknown[],
	charges: unknown[],
	logistics: unknown[],
): Contribution[] {
	return [
		...lines.flatMap(lineContributions),
		...allowances.flatMap((entry) => tradeContributions(entry, "allowance")),
		...charges.flatMap((entry) => tradeContributions(entry, "charge")),
		...logistics.flatMap(logisticsContributions),
	];
}

function lineContributions(line: unknown): Contribution[] {
	if (!isRegular(line)) return [];
	const amount = lineNet(line);
	if (amount === undefined) return [];
	const seen = new Set<string>();
	const result: Contribution[] = [];
	for (const tax of lineTaxes(line)) {
		const category = present(tax.categoryCode);
		if (!category) continue;
		const rate = amountNumber(tax.rateApplicablePercent);
		const exemption = exemptionKey(
			tax.exemptionReason,
			tax.exemptionReasonCode,
		);
		const key = `${category}|${rate ?? ""}|${exemption}`;
		if (seen.has(key)) continue;
		seen.add(key);
		result.push({ kind: "line", amount, category, rate, exemption });
	}
	return result;
}

function tradeContributions(
	entry: unknown,
	kind: "allowance" | "charge",
): Contribution[] {
	const amount = amountNumber(readPath(entry, ["actualAmount"]));
	const category = present(
		readPath(entry, ["categoryTradeTax", "categoryCode"]),
	);
	if (amount === undefined || !category) return [];
	return [
		{
			kind,
			amount,
			category,
			rate: amountNumber(
				readPath(entry, ["categoryTradeTax", "rateApplicablePercent"]),
			),
			exemption: exemptionKey(
				readPath(entry, ["categoryTradeTax", "exemptionReason"]),
				readPath(entry, ["categoryTradeTax", "exemptionReasonCode"]),
			),
		},
	];
}

function logisticsContributions(fee: unknown): Contribution[] {
	const amount = amountNumber(readPath(fee, ["feeAmount"]));
	if (amount === undefined) return [];
	const seen = new Set<string>();
	const result: Contribution[] = [];
	for (const tax of items(readPath(fee, ["appliedTradeTax"])).filter(
		isRecord,
	)) {
		const category = present(tax.categoryCode);
		if (!category || seen.has(category)) continue;
		seen.add(category);
		result.push({
			kind: "logistics",
			amount,
			category,
			rate: amountNumber(tax.rateApplicablePercent),
			exemption: exemptionKey(tax.exemptionReason, tax.exemptionReasonCode),
		});
	}
	return result;
}

function evaluate(
	contributions: Contribution[],
	category: string,
	rate: number | undefined,
	exemption?: string,
): { total: number; count: number } {
	const matched = contributions.filter((item) =>
		matches(item, category, rate, exemption),
	);
	let total = 0;
	for (const item of matched) {
		total += item.kind === "allowance" ? -item.amount : item.amount;
	}
	return { total, count: matched.length };
}

function matches(
	item: Contribution,
	category: string,
	rate: number | undefined,
	exemption?: string,
): boolean {
	if (item.category !== category) return false;
	if (rate !== undefined && !sameRate(item.rate, rate)) return false;
	if (exemption !== undefined && item.exemption !== exemption) return false;
	return true;
}

function within(
	basis: number,
	result: { total: number; count: number },
): boolean {
	return Math.abs(basis - result.total) <= TOLERANCE * result.count + EPSILON;
}

function directChildren(lines: unknown[], id: string | undefined): unknown[] {
	if (!id) return [];
	return lines.filter((line) => parentLineId(line) === id);
}

function descendants(lines: unknown[], rootId: string): unknown[] {
	const result: unknown[] = [];
	const queue = [rootId];
	const seen = new Set<string>();
	while (queue.length > 0) {
		const id = queue.shift();
		if (!id || seen.has(id)) continue;
		seen.add(id);
		for (const line of lines) {
			if (parentLineId(line) !== id) continue;
			result.push(line);
			const child = lineId(line);
			if (child) queue.push(child);
		}
	}
	return result.filter((line) => lineId(line) !== rootId);
}

function isRegular(line: unknown): boolean {
	const kind = subtype(line);
	return kind === undefined || kind === "DETAIL";
}

function subtype(line: unknown): string | undefined {
	return present(readPath(line, ["position", "lineStatusReasonCode"]));
}

function lineId(line: unknown): string | undefined {
	return present(readPath(line, ["position", "lineId"]));
}

function parentLineId(line: unknown): string | undefined {
	return present(readPath(line, ["position", "parentLineId"]));
}

function lineNet(line: unknown): number | undefined {
	return amountNumber(
		readPath(line, ["billing", "itemTotals", "lineTotalAmount"]),
	);
}

function hasCategory(line: unknown): boolean {
	return lineTaxes(line).some((tax) => present(tax.categoryCode));
}

function hasQuantity(line: unknown): boolean {
	return (
		amountNumber(readPath(line, ["delivery", "billedQuantity"])) !== undefined
	);
}

function hasUnit(line: unknown): boolean {
	const quantity = readPath(line, ["delivery", "billedQuantity"]);
	return isRecord(quantity) && !!present(quantity.unitCode);
}

function hasNetPrice(line: unknown): boolean {
	return (
		amountNumber(
			readPath(line, ["priceDetails", "netPrice", "chargeAmount"]),
		) !== undefined
	);
}

function lineTaxes(line: unknown): Record<string, unknown>[] {
	return items(readPath(line, ["billing", "vatBreakdown"])).filter(isRecord);
}

function detailNets(lines: unknown[]): number[] {
	const result: number[] = [];
	for (const line of lines) {
		if (!isRegular(line)) continue;
		const amount = lineNet(line);
		if (amount !== undefined) result.push(amount);
	}
	return result;
}

function entryAmounts(entries: unknown[], path: string[]): number[] {
	const result: number[] = [];
	for (const entry of entries) {
		const amount = amountNumber(readPath(entry, path));
		if (amount !== undefined) result.push(amount);
	}
	return result;
}

function taxInInvoiceCurrency(
	taxTotal: unknown,
	invoiceCurrency: string | undefined,
): boolean {
	if (!hasAmount(taxTotal)) return false;
	const currency = isRecord(taxTotal) ? present(taxTotal.currency) : undefined;
	if (!currency) return true;
	return (
		!!invoiceCurrency && normalize(currency) === normalize(invoiceCurrency)
	);
}

function chargeReasonsMatch(reason: string, code: string): boolean {
	return (
		reasonsMatch(reason, code, chargeCodes) ||
		reasonsMatch(reason, code, untdid5153)
	);
}

function reasonsMatch(
	reason: string,
	code: string,
	codelist: readonly { value: string; name: string }[],
): boolean {
	const named = codelist.find((item) => item.value === code);
	return !!named && normalize(named.name) === normalize(reason);
}

function textsMatch(coded: string, free: string): boolean {
	const named = textCodes.find((item) => item.value === coded);
	return !!named && normalize(named.name) === normalize(free);
}

function exemptionKey(reason: unknown, code: unknown): string {
	return `${normalize(present(reason) ?? "")}|${(present(code) ?? "").toUpperCase()}`;
}

function withinTolerance(
	stated: unknown,
	expected: number,
	count: number,
): boolean {
	const amount = amountNumber(stated) ?? 0;
	return Math.abs(amount - expected) <= TOLERANCE * count + EPSILON;
}

function moneyEquals(left: number, right: number): boolean {
	return Math.abs(left - right) < 0.001;
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

function sum(values: number[]): number {
	return values.reduce<number>((total, value) => total + value, 0);
}

function sameRate(
	left: number | undefined,
	right: number | undefined,
): boolean {
	if (left === undefined || right === undefined) return false;
	return Math.abs(left - right) < 0.0001;
}

function taxIdPresent(value: unknown): boolean {
	if (Array.isArray(value)) return value.some((item) => taxIdPresent(item));
	if (typeof value === "number") return Number.isFinite(value);
	if (typeof value === "string") return value.trim() !== "";
	if (!isRecord(value)) return false;
	return !!(
		present(value.id) ||
		present(value.identifier) ||
		present(value.value)
	);
}

function present(value: unknown): string | undefined {
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
	if (typeof value === "string") {
		const trimmed = value.trim();
		return trimmed || undefined;
	}
	if (!isRecord(value)) return undefined;
	if (typeof value.identifier === "string") return present(value.identifier);
	if (typeof value.value === "string" || typeof value.value === "number") {
		return present(value.value);
	}
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

function fail(ctx: Ctx, id: ZugferdRuleId, message: string): never {
	throw ctx.error(id, message);
}
