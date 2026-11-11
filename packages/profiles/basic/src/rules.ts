import allowanceCodes from "@node-zugferd/codelist-allowance";
import chargeCodes from "@node-zugferd/codelist-charge";
import type {
	ZugferdProfileRulesContext,
	ZugferdRuleId,
} from "@node-zugferd/core";

type Ctx = ZugferdProfileRulesContext;
type Cardinality = "atLeast" | "exactly";
type SellerKind =
	| "standard"
	| "vatOrRep"
	| "reverseCharge"
	| "intraCommunity"
	| "notSubject";
type RateKind = "positive" | "zero" | "nonNegative" | "absent";
type SumKind = "byRate" | "category";

type VatCategory = {
	code: string;
	name: string;
	cardinality: Cardinality;
	presenceId: ZugferdRuleId;
	seller: SellerKind;
	sellerId: ZugferdRuleId;
	rate: RateKind;
	rateId: ZugferdRuleId;
	sum: SumKind;
	sumId: ZugferdRuleId;
};

const VAT_CATEGORIES: VatCategory[] = [
	vat("S", "Standard rated", "atLeast", "standard", "positive", "byRate", {
		presence: "BR-S-1",
		seller: "BR-S-2",
		rate: "BR-S-5",
		sum: "BR-S-8",
	}),
	vat("Z", "Zero rated", "exactly", "standard", "zero", "category", {
		presence: "BR-Z-1",
		seller: "BR-Z-2",
		rate: "BR-Z-5",
		sum: "BR-Z-8",
	}),
	vat("E", "Exempt from VAT", "exactly", "standard", "zero", "category", {
		presence: "BR-E-1",
		seller: "BR-E-2",
		rate: "BR-E-5",
		sum: "BR-E-8",
	}),
	vat("AE", "Reverse charge", "exactly", "reverseCharge", "zero", "category", {
		presence: "BR-AE-1",
		seller: "BR-AE-2",
		rate: "BR-AE-5",
		sum: "BR-AE-8",
	}),
	vat(
		"K",
		"Intra-community supply",
		"exactly",
		"intraCommunity",
		"zero",
		"category",
		{
			presence: "BR-IC-1",
			seller: "BR-IC-2",
			rate: "BR-IC-5",
			sum: "BR-IC-8",
		},
	),
	vat("G", "Export outside the EU", "exactly", "vatOrRep", "zero", "category", {
		presence: "BR-G-1",
		seller: "BR-G-2",
		rate: "BR-G-5",
		sum: "BR-G-8",
	}),
	vat(
		"O",
		"Not subject to VAT",
		"exactly",
		"notSubject",
		"absent",
		"category",
		{
			presence: "BR-O-1",
			seller: "BR-O-2",
			rate: "BR-O-5",
			sum: "BR-O-8",
		},
	),
	vat("L", "IGIC", "atLeast", "standard", "nonNegative", "byRate", {
		presence: "BR-AF-1",
		seller: "BR-AF-2",
		rate: "BR-AF-5",
		sum: "BR-AF-8",
	}),
	vat("M", "IPSI", "atLeast", "standard", "nonNegative", "byRate", {
		presence: "BR-AG-1",
		seller: "BR-AG-2",
		rate: "BR-AG-5",
		sum: "BR-AG-8",
	}),
];

export function enforceBasicRules(data: unknown, ctx: Ctx): void {
	const lines = items(readPath(data, ["transaction", "line"]));
	if (lines.length === 0) {
		fail(
			ctx,
			"BR-16",
			"An Invoice shall have at least one Invoice line (BG-25).",
		);
	}
	for (const line of lines) checkLine(line, ctx);

	const debit = readPath(data, ["transaction", "debit"]);
	const allowances = items(readPath(debit, ["allowances"]));
	const charges = items(readPath(debit, ["charges"]));
	checkLineTotal(lines, debit, ctx);
	checkSplitPayment(data, lines, allowances, charges, ctx);
	checkVat(data, lines, allowances, charges, debit, ctx);
}

function checkLine(line: unknown, ctx: Ctx): void {
	if (!present(readPath(line, ["position", "lineId"]))) {
		fail(
			ctx,
			"BR-21",
			"Each Invoice line (BG-25) shall have an Invoice line identifier (BT-126).",
		);
	}

	const quantity = readPath(line, ["delivery", "billedQuantity"]);
	const quantityValue = isRecord(quantity)
		? amountNumber(quantity.value)
		: amountNumber(quantity);
	if (ctx.profile.id !== "extended" && quantityValue === undefined) {
		fail(
			ctx,
			"BR-22",
			"Each Invoice line (BG-25) shall have an Invoiced quantity (BT-129).",
		);
	}
	if (
		ctx.profile.id !== "extended" &&
		(!isRecord(quantity) || !present(quantity.unitCode))
	) {
		fail(
			ctx,
			"BR-23",
			"An Invoice line (BG-25) shall have an Invoiced quantity unit of measure code (BT-130).",
		);
	}

	const lineTotal = readPath(line, [
		"billing",
		"itemTotals",
		"lineTotalAmount",
	]);
	if (ctx.profile.id !== "extended" && !hasAmount(lineTotal)) {
		fail(
			ctx,
			"BR-24",
			"Each Invoice line (BG-25) shall have an Invoice line net amount (BT-131).",
		);
	}
	if (decimalPlaces(lineTotal) > 2) {
		fail(
			ctx,
			"BR-DEC-23",
			"The allowed maximum number of decimals for the Invoice line net amount (BT-131) is 2.",
		);
	}

	if (!present(readPath(line, ["item", "name"]))) {
		fail(
			ctx,
			"BR-25",
			"Each Invoice line (BG-25) shall contain the Item name (BT-153).",
		);
	}

	const netPrice = readPath(line, ["priceDetails", "netPrice", "chargeAmount"]);
	if (ctx.profile.id !== "extended" && !hasAmount(netPrice)) {
		fail(
			ctx,
			"BR-26",
			"Each Invoice line (BG-25) shall contain the Item net price (BT-146).",
		);
	}
	if (ctx.profile.id !== "extended" && (amountNumber(netPrice) ?? 0) < 0) {
		fail(ctx, "BR-27", "The Item net price (BT-146) shall NOT be negative.");
	}
	const grossPrice = readPath(line, [
		"priceDetails",
		"grossPrice",
		"chargeAmount",
	]);
	if (
		ctx.profile.id !== "extended" &&
		hasAmount(grossPrice) &&
		(amountNumber(grossPrice) ?? 0) < 0
	) {
		fail(ctx, "BR-28", "The Item gross price (BT-148) shall NOT be negative.");
	}

	checkPeriod(readPath(line, ["billing", "invoicePeriod"]), ctx);
	for (const allowance of items(readPath(line, ["billing", "allowances"]))) {
		checkLineAllowance(allowance, ctx);
	}
	for (const charge of items(readPath(line, ["billing", "charges"]))) {
		checkLineCharge(charge, ctx);
	}
	checkAttributes(readPath(line, ["item", "attributes"]), ctx);
	requireScheme(
		readPath(line, ["item", "globalId"]),
		"BR-64",
		"The Item standard identifier (BT-157) shall have a Scheme identifier.",
		ctx,
	);
	for (const classCode of items(
		readPath(line, ["item", "classification", "classCode"]),
	)) {
		requireScheme(
			classCode,
			"BR-65",
			"The Item classification identifier (BT-158) shall have a Scheme identifier.",
			ctx,
		);
	}
	if (ctx.profile.id !== "extended" && lineCategories(line).length === 0) {
		fail(
			ctx,
			"BR-CO-04",
			"Each Invoice line (BG-25) shall be categorized with an Invoiced item VAT category code (BT-151).",
		);
	}
}

function checkPeriod(period: unknown, ctx: Ctx): void {
	if (!isRecord(period)) return;
	const startGiven = dateGiven(period.startDate);
	const endGiven = dateGiven(period.endDate);
	if (!startGiven && !endGiven) {
		fail(
			ctx,
			"BR-CO-20",
			"If Invoice line period (BG-26) is used, the Invoice line period start date (BT-134) or the Invoice line period end date (BT-135) shall be filled, or both.",
		);
	}
	if (!startGiven || !endGiven) return;
	const start = readDate(period.startDate);
	const end = readDate(period.endDate);
	if (!start || !end || dateOrdinal(end) < dateOrdinal(start)) {
		fail(
			ctx,
			"BR-30",
			"If both Invoice line period start date (BT-134) and Invoice line period end date (BT-135) are given then the Invoice line period end date (BT-135) shall be later or equal to the Invoice line period start date (BT-134).",
		);
	}
}

function checkLineAllowance(entry: unknown, ctx: Ctx): void {
	const amount = readPath(entry, ["actualAmount"]);
	if (!hasAmount(amount)) {
		fail(
			ctx,
			"BR-41",
			"Each Invoice line allowance (BG-27) shall have an Invoice line allowance amount (BT-136).",
		);
	}
	if (decimalPlaces(amount) > 2) {
		fail(
			ctx,
			"BR-DEC-24",
			"The allowed maximum number of decimals for the Invoice line allowance amount (BT-136) is 2.",
		);
	}
	const basis = readPath(entry, ["basisAmount"]);
	if (hasAmount(basis) && decimalPlaces(basis) > 2) {
		fail(
			ctx,
			"BR-DEC-25",
			"The allowed maximum number of decimals for the Invoice line allowance base amount (BT-137) is 2.",
		);
	}
	const reason = present(readPath(entry, ["reason"]));
	const reasonCode = present(readPath(entry, ["reasonCode"]));
	// BR-CO-23 is the same constraint: a reason, a reason code, or both.
	if (!reason && !reasonCode) {
		fail(
			ctx,
			"BR-42",
			"Each Invoice line allowance (BG-27) shall have an Invoice line allowance reason (BT-139) or an Invoice line allowance reason code (BT-140).",
		);
	}
	if (
		reason &&
		reasonCode &&
		!reasonsMatch(reason, reasonCode, allowanceCodes)
	) {
		fail(
			ctx,
			"BR-CO-07",
			"Invoice line allowance reason code (BT-140) and Invoice line allowance reason (BT-139) shall indicate the same type of allowance reason.",
		);
	}
}

function checkLineCharge(entry: unknown, ctx: Ctx): void {
	const amount = readPath(entry, ["actualAmount"]);
	if (!hasAmount(amount)) {
		fail(
			ctx,
			"BR-43",
			"Each Invoice line charge (BG-28) shall have an Invoice line charge amount (BT-141).",
		);
	}
	if (decimalPlaces(amount) > 2) {
		fail(
			ctx,
			"BR-DEC-27",
			"The allowed maximum number of decimals for the Invoice line charge amount (BT-141) is 2.",
		);
	}
	const basis = readPath(entry, ["basisAmount"]);
	if (hasAmount(basis) && decimalPlaces(basis) > 2) {
		fail(
			ctx,
			"BR-DEC-28",
			"The allowed maximum number of decimals for the Invoice line charge base amount (BT-142) is 2.",
		);
	}
	const reason = present(readPath(entry, ["reason"]));
	const reasonCode = present(readPath(entry, ["reasonCode"]));
	// BR-CO-24 is the same constraint: a reason, a reason code, or both.
	if (ctx.profile.id !== "extended" && !reason && !reasonCode) {
		fail(
			ctx,
			"BR-44",
			"Each Invoice line charge (BG-28) shall have an Invoice line charge reason (BT-144) or an Invoice line charge reason code (BT-145).",
		);
	}
	if (
		ctx.profile.id !== "extended" &&
		reason &&
		reasonCode &&
		!reasonsMatch(reason, reasonCode, chargeCodes)
	) {
		fail(
			ctx,
			"BR-CO-08",
			"Invoice line charge reason code (BT-145) and Invoice line charge reason (BT-144) shall indicate the same type of charge reason.",
		);
	}
}

function checkAttributes(attributes: unknown, ctx: Ctx): void {
	if (ctx.profile.id !== "extended") {
		for (const attribute of items(attributes)) {
			const name =
				present(readPath(attribute, ["description"])) ??
				present(readPath(attribute, ["name"]));
			if (!name || !present(readPath(attribute, ["value"]))) {
				fail(
					ctx,
					"BR-54",
					"Each Item attribute (BG-32) shall contain an Item attribute name (BT-160) and an Item attribute value (BT-161).",
				);
			}
		}
	}
}

function checkLineTotal(lines: unknown[], debit: unknown, ctx: Ctx): void {
	let sum = 0;
	for (const line of lines) {
		sum +=
			amountNumber(
				readPath(line, ["billing", "itemTotals", "lineTotalAmount"]),
			) ?? 0;
	}
	const stated = amountNumber(
		readPath(debit, ["documentTotals", "lineTotalAmount"]),
	);
	if (
		ctx.profile.id !== "extended" &&
		(stated === undefined || !moneyEquals(stated, sum))
	) {
		fail(
			ctx,
			"BR-CO-10",
			"Sum of Invoice line net amount (BT-106) = ∑ Invoice line net amount (BT-131).",
		);
	}
}

function checkSplitPayment(
	data: unknown,
	lines: unknown[],
	allowances: unknown[],
	charges: unknown[],
	ctx: Ctx,
): void {
	if (!usesCategory(lines, allowances, charges, "B")) return;
	const sellerCountry = present(
		readPath(data, [
			"transaction",
			"contract",
			"seller",
			"postalAddress",
			"countryCode",
		]),
	);
	const buyerCountry = present(
		readPath(data, [
			"transaction",
			"contract",
			"buyer",
			"postalAddress",
			"countryCode",
		]),
	);
	if (sellerCountry !== "IT" || buyerCountry !== "IT") {
		fail(
			ctx,
			"BR-B-01",
			'An Invoice where the VAT category code (BT-151, BT-95 or BT-102) is "Split payment" shall be a domestic Italian invoice.',
		);
	}
	if (usesCategory(lines, allowances, charges, "S")) {
		fail(
			ctx,
			"BR-B-02",
			'An Invoice that contains an Invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is "Split payment" shall not contain an Invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is "Standard rated".',
		);
	}
}

function checkVat(
	data: unknown,
	lines: unknown[],
	allowances: unknown[],
	charges: unknown[],
	debit: unknown,
	ctx: Ctx,
): void {
	const breakdowns = items(readPath(debit, ["vatBreakdown"])).filter(isRecord);
	for (const rule of VAT_CATEGORIES) {
		const groups = breakdowns.filter(
			(group) => present(group.categoryCode) === rule.code,
		);
		if (
			usesCategory(lines, allowances, charges, rule.code) &&
			!matchesCardinality(groups.length, rule.cardinality)
		) {
			fail(ctx, rule.presenceId, presenceMessage(rule));
		}
		if (lineUses(lines, rule.code)) {
			assertSeller(rule, data, ctx);
			assertLineRates(rule, lines, ctx);
		}
		if (rule.code === "O") assertNotSubjectLines(lines, breakdowns, ctx);
		assertBreakdownSums(rule, groups, lines, allowances, charges, ctx);
	}
}

function assertSeller(rule: VatCategory, data: unknown, ctx: Ctx): void {
	const allowed =
		rule.seller === "standard"
			? hasStandardSellerTaxId(data)
			: rule.seller === "vatOrRep"
				? hasSellerVatOrRepresentative(data)
				: rule.seller === "reverseCharge"
					? hasStandardSellerTaxId(data) && hasBuyerVatOrLegalId(data)
					: rule.seller === "intraCommunity"
						? hasSellerVatOrRepresentative(data) && hasBuyerVat(data)
						: !hasSellerVat(data) &&
							!hasRepresentativeVat(data) &&
							!hasBuyerVat(data);
	if (!allowed) fail(ctx, rule.sellerId, sellerMessage(rule));
}

function assertLineRates(rule: VatCategory, lines: unknown[], ctx: Ctx): void {
	for (const line of lines) {
		for (const tax of lineTaxes(line)) {
			if (present(tax.categoryCode) !== rule.code) continue;
			if (!rateAllowed(rule.rate, amountNumber(tax.rateApplicablePercent))) {
				fail(ctx, rule.rateId, rateMessage(rule));
			}
		}
	}
}

function assertNotSubjectLines(
	lines: unknown[],
	breakdowns: Record<string, unknown>[],
	ctx: Ctx,
): void {
	if (!breakdowns.some((group) => present(group.categoryCode) === "O")) return;
	for (const line of lines) {
		if (lineCategories(line).some((code) => code !== "O")) {
			fail(
				ctx,
				"BR-O-12",
				'An Invoice that contains a VAT breakdown group (BG-23) with a VAT category code (BT-118) "Not subject to VAT" shall not contain an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is not "Not subject to VAT".',
			);
		}
	}
}

function assertBreakdownSums(
	rule: VatCategory,
	groups: Record<string, unknown>[],
	lines: unknown[],
	allowances: unknown[],
	charges: unknown[],
	ctx: Ctx,
): void {
	for (const group of groups) {
		const basis = amountNumber(group.basisAmount);
		if (basis === undefined) continue;
		const rate =
			rule.sum === "byRate"
				? amountNumber(group.rateApplicablePercent)
				: undefined;
		if (rule.sum === "byRate" && rate === undefined) continue;
		const expected = taxableSum(
			lines,
			allowances,
			charges,
			rule.code,
			rule.sum === "byRate" ? rate : undefined,
		);
		if (!moneyEquals(basis, expected)) fail(ctx, rule.sumId, sumMessage(rule));
	}
}

function taxableSum(
	lines: unknown[],
	allowances: unknown[],
	charges: unknown[],
	category: string,
	rate: number | undefined,
): number {
	let sum = 0;
	for (const line of lines) {
		if (!lineUses([line], category)) continue;
		if (
			rate !== undefined &&
			!lineTaxes(line).some(
				(tax) =>
					present(tax.categoryCode) === category &&
					sameRate(amountNumber(tax.rateApplicablePercent), rate),
			)
		) {
			continue;
		}
		sum +=
			amountNumber(
				readPath(line, ["billing", "itemTotals", "lineTotalAmount"]),
			) ?? 0;
	}
	for (const entry of charges) {
		if (!entryMatches(entry, category, rate)) continue;
		sum += amountNumber(readPath(entry, ["actualAmount"])) ?? 0;
	}
	for (const entry of allowances) {
		if (!entryMatches(entry, category, rate)) continue;
		sum -= amountNumber(readPath(entry, ["actualAmount"])) ?? 0;
	}
	return sum;
}

function entryMatches(
	entry: unknown,
	category: string,
	rate: number | undefined,
): boolean {
	if (categoryOf(entry) !== category) return false;
	if (rate === undefined) return true;
	return sameRate(rateOf(entry), rate);
}

function usesCategory(
	lines: unknown[],
	allowances: unknown[],
	charges: unknown[],
	category: string,
): boolean {
	return (
		lineUses(lines, category) ||
		allowances.some((entry) => categoryOf(entry) === category) ||
		charges.some((entry) => categoryOf(entry) === category)
	);
}

function lineUses(lines: unknown[], category: string): boolean {
	return lines.some((line) => lineCategories(line).includes(category));
}

function lineCategories(line: unknown): string[] {
	return lineTaxes(line).flatMap((tax) => {
		const category = present(tax.categoryCode);
		return category ? [category] : [];
	});
}

function lineTaxes(line: unknown): Record<string, unknown>[] {
	return items(readPath(line, ["billing", "vatBreakdown"])).filter(isRecord);
}

function categoryOf(entry: unknown): string | undefined {
	return present(readPath(entry, ["categoryTradeTax", "categoryCode"]));
}

function rateOf(entry: unknown): number | undefined {
	return amountNumber(
		readPath(entry, ["categoryTradeTax", "rateApplicablePercent"]),
	);
}

function matchesCardinality(count: number, cardinality: Cardinality): boolean {
	return cardinality === "atLeast" ? count >= 1 : count === 1;
}

function rateAllowed(kind: RateKind, rate: number | undefined): boolean {
	switch (kind) {
		case "positive":
			return rate !== undefined && rate > 0;
		case "zero":
			return rate === 0;
		case "nonNegative":
			return rate !== undefined && rate >= 0;
		case "absent":
			return rate === undefined;
	}
}

function sameRate(
	left: number | undefined,
	right: number | undefined,
): boolean {
	if (left === undefined || right === undefined) return false;
	return Math.abs(left - right) < 0.0001;
}

function reasonsMatch(
	reason: string,
	reasonCode: string,
	codelist: readonly { value: string; name: string }[],
): boolean {
	const named = codelist.find((item) => item.value === reasonCode);
	return !!named && normalize(named.name) === normalize(reason);
}

function requireScheme(
	value: unknown,
	id: ZugferdRuleId,
	message: string,
	ctx: Ctx,
): void {
	if (!identifierPresent(value)) return;
	if (!present(readPath(value, ["schemeId"]))) fail(ctx, id, message);
}

function identifierPresent(value: unknown): boolean {
	if (typeof value === "string") return value.trim() !== "";
	return !!present(value);
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

function vat(
	code: string,
	name: string,
	cardinality: Cardinality,
	seller: SellerKind,
	rate: RateKind,
	sum: SumKind,
	ids: {
		presence: ZugferdRuleId;
		seller: ZugferdRuleId;
		rate: ZugferdRuleId;
		sum: ZugferdRuleId;
	},
): VatCategory {
	return {
		code,
		name,
		cardinality,
		presenceId: ids.presence,
		seller,
		sellerId: ids.seller,
		rate,
		rateId: ids.rate,
		sum,
		sumId: ids.sum,
	};
}

function presenceMessage(rule: VatCategory): string {
	const quantity =
		rule.cardinality === "atLeast" ? "at least one" : "exactly one";
	return `An Invoice that contains an Invoice line (BG-25), a Document level allowance (BG-20) or a Document level charge (BG-21) where the VAT category code (BT-151, BT-95 or BT-102) is "${rule.name}" shall contain ${quantity} VAT breakdown (BG-23) with the VAT category code (BT-118) equal to "${rule.name}".`;
}

function sellerMessage(rule: VatCategory): string {
	if (rule.seller === "notSubject") {
		return `An Invoice that contains an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "${rule.name}" shall not contain the Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) or the Buyer VAT identifier (BT-48).`;
	}
	if (rule.seller === "vatOrRep") {
		return `An Invoice that contains an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "${rule.name}" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63).`;
	}
	if (rule.seller === "intraCommunity") {
		return `An Invoice that contains an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "${rule.name}" shall contain the Seller VAT Identifier (BT-31) or the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48).`;
	}
	const buyer =
		rule.seller === "reverseCharge"
			? " and the Buyer VAT identifier (BT-48) and/or the Buyer legal registration identifier (BT-47)"
			: "";
	return `An Invoice that contains an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "${rule.name}" shall contain the Seller VAT Identifier (BT-31), the Seller tax registration identifier (BT-32) and/or the Seller tax representative VAT identifier (BT-63)${buyer}.`;
}

function rateMessage(rule: VatCategory): string {
	const requirement =
		rule.rate === "positive"
			? "shall be greater than zero"
			: rule.rate === "zero"
				? "shall be 0 (zero)"
				: rule.rate === "nonNegative"
					? "shall be 0 (zero) or greater than zero"
					: "shall not contain an Invoiced item VAT rate (BT-152)";
	if (rule.rate === "absent") {
		return `An Invoice line (BG-25) where the VAT category code (BT-151) is "${rule.name}" ${requirement}.`;
	}
	return `In an Invoice line (BG-25) where the Invoiced item VAT category code (BT-151) is "${rule.name}" the Invoiced item VAT rate (BT-152) ${requirement}.`;
}

function sumMessage(rule: VatCategory): string {
	if (rule.sum === "byRate") {
		return `For each different value of VAT category rate (BT-119) where the VAT category code (BT-118) is "${rule.name}", the VAT category taxable amount (BT-116) in a VAT breakdown (BG-23) shall equal the sum of Invoice line net amounts (BT-131) plus the sum of document level charge amounts (BT-99) minus the sum of document level allowance amounts (BT-92) where the VAT category code (BT-151, BT-102, BT-95) is "${rule.name}" and the VAT rate (BT-152, BT-103, BT-96) equals the VAT category rate (BT-119).`;
	}
	return `In a VAT breakdown (BG-23) where the VAT category code (BT-118) is "${rule.name}" the VAT category taxable amount (BT-116) shall equal the sum of Invoice line net amounts (BT-131) minus the sum of Document level allowance amounts (BT-92) plus the sum of Document level charge amounts (BT-99) where the VAT category codes (BT-151, BT-95, BT-102) are "${rule.name}".`;
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

function decimalPlaces(value: unknown): number {
	const lexical = lexicalAmount(value);
	if (lexical !== undefined) {
		const match = /^[+-]?\d+(?:\.(\d+))?$/.exec(lexical);
		return match?.[1]?.length ?? 0;
	}
	const numeric = amountNumber(value);
	if (numeric === undefined) return 0;
	const fraction = numeric.toFixed(10).split(".")[1]?.replace(/0+$/, "") ?? "";
	return fraction.length;
}

function lexicalAmount(value: unknown): string | undefined {
	if (typeof value === "string") return value.trim();
	if (isRecord(value) && typeof value.value === "string")
		return value.value.trim();
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
	"BR-S-1",
	"BR-S-8",
	"BR-Z-1",
	"BR-Z-8",
	"BR-E-1",
	"BR-E-8",
	"BR-AE-1",
	"BR-AE-8",
	"BR-IC-1",
	"BR-IC-8",
	"BR-G-1",
	"BR-G-8",
	"BR-O-1",
	"BR-O-2",
	"BR-O-8",
	"BR-O-12",
	"BR-AF-1",
	"BR-AF-8",
	"BR-AG-1",
	"BR-AG-8",
]);

function fail(ctx: Ctx, id: ZugferdRuleId, message: string): void {
	if (ctx.profile.id === "extended" && SKIPPED_ON_EXTENDED.has(id)) return;
	throw ctx.error(id, message);
}
