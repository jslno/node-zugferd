import untdid1001 from "@node-zugferd/codelist-untdid-1001";
import { formatCurrency } from "@node-zugferd/pdf-template";
import type { Translations } from "./i18n";

export type LabeledValue = {
	label: string;
	value: string;
	emphasize?: boolean;
};

export type Section = {
	id: string;
	title: string;
	rows: LabeledValue[];
};

export type LineHeaders = {
	articleId: string;
	description: string;
	quantity: string;
	unitPrice: string;
	totalNet: string;
	vat: string;
};

export type LineView = LineHeaders;

export type AdjustmentHeaders = {
	reason: string;
	percent: string;
	basis: string;
	amount: string;
	vat: string;
};

export type AdjustmentView = AdjustmentHeaders;

export type VatHeaders = {
	exemptionReason: string;
	exemptionReasonCode: string;
	category: string;
	rate: string;
	base: string;
	amount: string;
	vatPoint: string;
};

export type VatView = VatHeaders;

export type InvoiceView = {
	document: Section;
	seller?: Section;
	taxRepresentative?: Section;
	buyer?: Section;
	buyerIdentifiers?: Section;
	references?: Section;
	invoicing?: Section;
	delivery?: Section;
	lineTitle: string;
	lineHeaders: LineHeaders;
	lines: LineView[];
	allowanceTitle: string;
	allowanceHeaders: AdjustmentHeaders;
	allowances: AdjustmentView[];
	chargeTitle: string;
	chargeHeaders: AdjustmentHeaders;
	charges: AdjustmentView[];
	vatTitle: string;
	vatHeaders: VatHeaders;
	vatRows: VatView[];
	paymentTerms?: LabeledValue;
	dueDate?: LabeledValue;
	totals: LabeledValue[];
	payee?: Section;
	payment?: Section;
	notes?: Section;
	regulatoryNotes?: Section;
};

const isCreditNote = (invoiceTypeCode: string | undefined) => {
	if (!invoiceTypeCode) return false;
	const entry = untdid1001.find((item) => item.value === invoiceTypeCode);
	if (!entry || !("interpretation" in entry)) return false;
	return entry.interpretation === "Credit Note";
};

const rec = (value: unknown): Record<string, unknown> | undefined => {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		return value as Record<string, unknown>;
	}
	return undefined;
};

const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const textOf = (value: unknown): string | undefined => {
	if (typeof value !== "string") return undefined;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
};

const codeOf = (value: unknown): string | undefined => {
	const plain = textOf(value);
	if (plain) return plain;
	return textOf(rec(value)?.value);
};

const amountOf = (value: unknown): number | undefined => {
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (
		typeof value === "string" &&
		value.trim() &&
		Number.isFinite(Number(value))
	) {
		return Number(value);
	}
	const raw = rec(value)?.value;
	if (typeof raw === "number" && Number.isFinite(raw)) return raw;
	if (typeof raw === "string" && raw.trim() && Number.isFinite(Number(raw))) {
		return Number(raw);
	}
	return undefined;
};

const idOf = (value: unknown): string | undefined => {
	if (Array.isArray(value)) {
		const parts = value.map(idOf).filter((part): part is string => !!part);
		return parts.length > 0 ? parts.join(", ") : undefined;
	}
	const plain = textOf(value);
	if (plain) return plain;
	const identifier = textOf(rec(value)?.identifier);
	if (!identifier) return undefined;
	const schemeId = textOf(rec(value)?.schemeId);
	return schemeId ? `${identifier} (${schemeId})` : identifier;
};

const joinParts = (parts: Array<string | undefined>, separator: string) => {
	const present = parts.filter((part): part is string => !!part);
	return present.length > 0 ? present.join(separator) : undefined;
};

const labeled = (
	label: string,
	value: string | undefined,
): LabeledValue | undefined => (value ? { label, value } : undefined);

const rows = (...parts: Array<LabeledValue | undefined>): LabeledValue[] =>
	parts.filter((part): part is LabeledValue => !!part);

const section = (
	id: string,
	title: string,
	body: LabeledValue[],
): Section | undefined =>
	body.length > 0 ? { id, title, rows: body } : undefined;

const formatDate = (value: unknown, locale: string): string | undefined => {
	const date =
		value instanceof Date
			? value
			: rec(value)?.date instanceof Date
				? (rec(value)?.date as Date)
				: undefined;
	if (!date || Number.isNaN(date.getTime())) return undefined;
	return date.toLocaleDateString(locale, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		timeZone: "UTC",
	});
};

const formatPercent = (value: unknown, locale: string): string | undefined => {
	const amount = amountOf(value);
	if (amount === undefined) return undefined;
	return new Intl.NumberFormat(locale, {
		style: "percent",
		maximumFractionDigits: 2,
	}).format(amount / 100);
};

const formatQuantity = (value: unknown, locale: string): string | undefined => {
	const quantity = rec(value);
	const amount = amountOf(quantity ?? value);
	if (amount === undefined) return undefined;
	const formatted = new Intl.NumberFormat(locale, {
		maximumFractionDigits: 4,
	}).format(amount);
	const unit = textOf(quantity?.unitCode);
	return unit ? `${formatted} ${unit}` : formatted;
};

const displayName = (
	locale: string,
	type: "currency" | "region",
	code: string,
) => {
	try {
		return new Intl.DisplayNames(locale, { type }).of(code);
	} catch {
		return undefined;
	}
};

const formatCurrencyCode = (code: string, locale: string) => {
	const name = displayName(locale, "currency", code);
	return name && name.toUpperCase() !== code.toUpperCase()
		? `${name} (${code})`
		: code;
};

const formatCountry = (code: string, locale: string) =>
	displayName(locale, "region", code) ?? code;

const formatMoney = (
	value: unknown,
	currency: string | undefined,
	locale: string,
): string | undefined => {
	const amount = amountOf(value);
	if (amount === undefined) return undefined;
	if (!currency) {
		return new Intl.NumberFormat(locale, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	}
	return formatCurrency(amount, { currency, locale });
};

const addressOf = (value: unknown, locale: string): string | undefined => {
	const address = rec(value);
	if (!address) return undefined;
	const countryCode = codeOf(address.countryCode);
	const cityLine = joinParts(
		[textOf(address.postCode), textOf(address.city)],
		" ",
	);
	return joinParts(
		[
			textOf(address.line1),
			textOf(address.line2),
			textOf(address.line3),
			cityLine,
			textOf(address.countrySubdivision),
			countryCode ? formatCountry(countryCode, locale) : undefined,
		],
		"\n",
	);
};

const contactRows = (
	contact: Record<string, unknown> | undefined,
	t: Translations,
) =>
	rows(
		labeled(t.contactName, textOf(contact?.personName)),
		labeled(t.department, textOf(contact?.departmentName)),
		labeled(t.phone, textOf(contact?.phoneNumber)),
		labeled(t.contactEmail, textOf(contact?.emailAddress)),
	);

const partyIds = (
	party: Record<string, unknown> | undefined,
	t: Translations,
	options?: { localTax?: boolean },
) => {
	const organization = rec(party?.organization);
	const tax = rec(party?.taxRegistration);
	return rows(
		labeled(t.privateId, idOf(party?.id)),
		labeled(t.globalId, idOf(party?.globalId)),
		labeled(t.legalId, idOf(organization?.id)),
		labeled(t.vatId, idOf(rec(tax?.vat)?.id)),
		options?.localTax
			? labeled(t.localTaxId, idOf(rec(tax?.local)?.id))
			: undefined,
	);
};

const adjustmentOf = (
	entry: unknown,
	currency: string | undefined,
	locale: string,
): AdjustmentView | undefined => {
	const item = rec(entry);
	if (!item) return undefined;
	const tax = rec(item.categoryTradeTax);
	const reason = textOf(item.reason) ?? codeOf(item.reasonCode) ?? "";
	const percent = formatPercent(item.calculationPercent, locale) ?? "";
	const basis = formatMoney(item.basisAmount, currency, locale) ?? "";
	const amount = formatMoney(item.actualAmount, currency, locale) ?? "";
	const vat = codeOf(tax?.categoryCode) ?? "";
	if (!reason && !percent && !basis && !amount && !vat) return undefined;
	return { reason, percent, basis, amount, vat };
};

export const invoiceView = (
	data: object,
	t: Translations,
	locale: string,
): InvoiceView => {
	const root = rec(data) ?? {};
	const document = rec(root.exchangedDocument);
	const transaction = rec(root.transaction);
	const contract = rec(transaction?.contract);
	const delivery = rec(transaction?.delivery);
	const debit = rec(transaction?.debit);
	const seller = rec(contract?.seller);
	const buyer = rec(contract?.buyer);
	const currency = codeOf(debit?.invoiceCurrencyCode);
	const money = (value: unknown) => formatMoney(value, currency, locale);

	const typeCode = codeOf(document?.invoiceTypeCode);
	const processType = textOf(
		rec(rec(root.processControl)?.businessContextInfo)?.processType,
	);
	const documentSection: Section = {
		id: "document",
		title: isCreditNote(typeCode) ? t.creditNote : t.invoice,
		rows: rows(
			labeled(t.invoiceNumber, idOf(document?.invoiceNumber)),
			labeled(t.issueDate, formatDate(document?.invoiceIssueDate, locale)),
			labeled(
				t.currency,
				currency ? formatCurrencyCode(currency, locale) : undefined,
			),
			labeled(t.businessProcess, processType),
		),
	};

	const representative = rec(contract?.sellerTaxRepresentative);
	const taxRepresentative = section(
		"taxRepresentative",
		t.taxRepresentative,
		rows(
			labeled(t.name, textOf(representative?.name)),
			labeled(t.address, addressOf(representative?.postalAddress, locale)),
			labeled(
				t.vatId,
				idOf(rec(rec(representative?.taxRegistration)?.vat)?.id),
			),
		),
	);

	const buyerSection = section("buyer", t.buyer, [
		...rows(
			labeled(t.name, textOf(buyer?.name)),
			labeled(t.tradeName, textOf(rec(buyer?.organization)?.tradingName)),
			labeled(t.address, addressOf(buyer?.postalAddress, locale)),
			labeled(t.email, idOf(buyer?.electronicAddress)),
		),
		...contactRows(rec(buyer?.contact), t),
	]);

	const buyerIdentifiers = section(
		"buyerIdentifiers",
		t.buyerIdentifiers,
		partyIds(buyer, t),
	);

	const project = rec(contract?.projectReference);
	const invoicedObject = rec(contract?.invoicedObjectIdentifier);
	const references = section(
		"references",
		t.references,
		rows(
			labeled(t.buyerReference, textOf(contract?.buyerReference)),
			labeled(
				t.projectReference,
				joinParts([textOf(project?.id), textOf(project?.name)], " - "),
			),
			labeled(
				t.contractReference,
				textOf(rec(contract?.associatedContract)?.issuerAssignedId),
			),
			labeled(
				t.purchaseOrder,
				textOf(rec(contract?.associatedOrder)?.issuerAssignedId),
			),
			labeled(
				t.salesOrder,
				textOf(rec(contract?.sellerOrderReferencedDocument)?.issuerAssignedId),
			),
			labeled(
				t.receivingAdvice,
				textOf(rec(delivery?.associatedGoodsReceipt)?.issuerAssignedId),
			),
			labeled(
				t.despatchAdvice,
				textOf(rec(delivery?.despatchAdvice)?.issuerAssignedId),
			),
			labeled(
				t.tenderOrLot,
				textOf(rec(contract?.tenderOrLotReferences)?.issuerAssignedId),
			),
			labeled(
				t.invoicedObject,
				joinParts(
					[
						idOf(invoicedObject?.issuerAssignedId),
						textOf(invoicedObject?.referenceTypeCode),
					],
					" - ",
				),
			),
			labeled(
				t.buyerAccounting,
				textOf(rec(debit?.accounting)?.buyerReference),
			),
		),
	);

	const period = rec(debit?.invoicingPeriod);
	const preceding = list(debit?.precendingInvoices).flatMap((invoice) => {
		const item = rec(invoice);
		return rows(
			labeled(t.precedingInvoice, textOf(item?.issuerAssignedId)),
			labeled(t.precedingInvoiceDate, formatDate(item?.issueDate, locale)),
		);
	});
	const invoicing = section(
		"invoicing",
		t.invoicing,
		rows(
			labeled(t.invoicingPeriodStart, formatDate(period?.startDate, locale)),
			labeled(t.invoicingPeriodEnd, formatDate(period?.endDate, locale)),
			...preceding,
		),
	);

	const recipient = rec(delivery?.recipient);
	const deliverySection = section(
		"delivery",
		t.delivery,
		rows(
			labeled(t.deliveryLocation, idOf(recipient?.locationId)),
			labeled(t.globalId, idOf(recipient?.globalLocationId)),
			labeled(t.deliverTo, textOf(recipient?.name)),
			labeled(t.address, addressOf(recipient?.postalAddress, locale)),
			labeled(
				t.deliveryDate,
				formatDate(rec(delivery?.actualDelivery)?.date, locale),
			),
		),
	);

	const lines = list(transaction?.line).flatMap((line) => {
		const item = rec(rec(line)?.item);
		const position = rec(rec(line)?.position);
		const price = rec(rec(rec(line)?.priceDetails)?.netPrice);
		const billing = rec(rec(line)?.billing);
		const articleId = joinParts(
			[
				idOf(position?.lineId),
				idOf(item?.sellerAssignedId),
				idOf(item?.buyerAssignedId),
				idOf(item?.globalId),
			],
			" - ",
		);
		const description = joinParts(
			[textOf(item?.name), textOf(item?.description)],
			"\n",
		);
		const quantity = formatQuantity(
			rec(rec(line)?.delivery)?.billedQuantity,
			locale,
		);
		const unitPrice = money(price?.chargeAmount);
		const totalNet = money(rec(billing?.itemTotals)?.lineTotalAmount);
		const vat =
			formatPercent(
				rec(billing?.vatBreakdown)?.rateApplicablePercent,
				locale,
			) ?? codeOf(rec(billing?.vatBreakdown)?.categoryCode);
		if (
			!articleId &&
			!description &&
			!quantity &&
			!unitPrice &&
			!totalNet &&
			!vat
		) {
			return [];
		}
		return [
			{
				articleId: articleId ?? "",
				description: description ?? "",
				quantity: quantity ?? "",
				unitPrice: unitPrice ?? "",
				totalNet: totalNet ?? "",
				vat: vat ?? "",
			},
		];
	});

	const allowances = list(debit?.allowances).flatMap((entry) => {
		const row = adjustmentOf(entry, currency, locale);
		return row ? [row] : [];
	});
	const charges = list(debit?.charges).flatMap((entry) => {
		const row = adjustmentOf(entry, currency, locale);
		return row ? [row] : [];
	});

	const vatRows = list(debit?.vatBreakdown).map((entry) => {
		const item = rec(entry);
		return {
			exemptionReason: textOf(item?.exemptionReason) ?? "",
			exemptionReasonCode: codeOf(item?.exemptionReasonCode) ?? "",
			category: codeOf(item?.categoryCode) ?? "",
			rate: formatPercent(item?.rateApplicablePercent, locale) ?? "",
			base: money(item?.basisAmount) ?? "",
			amount: money(item?.calculatedAmount) ?? "",
			vatPoint: codeOf(item?.dueDateTypeCode) ?? "",
		};
	});

	const totalsSource = rec(debit?.documentTotals);
	const accountingVat = rec(totalsSource?.taxTotalAmountAccountingCurrency);
	const accountingCurrency =
		textOf(accountingVat?.currency) ?? codeOf(accountingVat?.currency);
	const totals = rows(
		labeled(t.totalNet, money(totalsSource?.taxBasisTotalAmount)),
		labeled(t.totalVat, money(totalsSource?.taxTotalAmount)),
		labeled(
			t.totalVatAccounting,
			formatMoney(
				totalsSource?.taxTotalAmountAccountingCurrency,
				accountingCurrency,
				locale,
			),
		),
		labeled(t.totalGross, money(totalsSource?.grandTotalAmount)),
		labeled(t.prepaid, money(totalsSource?.prepaidAmount)),
		labeled(t.rounding, money(totalsSource?.roundingAmount)),
	);
	const due = money(totalsSource?.duePayableAmount);
	if (due) totals.push({ label: t.dueForPayment, value: due, emphasize: true });

	const terms = rec(debit?.paymentTerms);
	const payeeParty = rec(debit?.payee);
	const payee = section(
		"payee",
		t.payee,
		rows(
			labeled(t.name, textOf(payeeParty?.name)),
			labeled(t.privateId, idOf(payeeParty?.id)),
			labeled(t.globalId, idOf(payeeParty?.globalId)),
			labeled(t.legalId, idOf(rec(payeeParty?.organization)?.id)),
		),
	);

	const means = rec(debit?.paymentMeans);
	const transfers = list(means?.creditTransfers).flatMap((transfer) => {
		const item = rec(transfer);
		return rows(
			labeled(t.iban, idOf(item?.iban)),
			labeled(t.proprietaryId, idOf(item?.proprietaryId)),
			labeled(t.accountName, textOf(item?.accountName)),
		);
	});
	const payment = section(
		"payment",
		t.payment,
		rows(
			labeled(t.paymentType, codeOf(means?.typeCode)),
			labeled(t.paymentInformation, textOf(means?.information)),
			labeled(t.remittance, textOf(debit?.paymentReference)),
			labeled(t.creditorReference, idOf(debit?.creditorReferenceId)),
			...transfers,
			labeled(t.bic, idOf(rec(means?.sellerBankDetails)?.bic)),
		),
	);

	const noteRows = list(document?.invoiceNotes).flatMap((note) => {
		const item = rec(note);
		const content = textOf(item?.content);
		if (!content) return [];
		const subject = codeOf(item?.subjectCode);
		return [{ subject, content }];
	});
	const notes = section(
		"notes",
		t.notes,
		noteRows
			.filter((note) => note.subject !== "REG")
			.map((note) => ({
				label: note.subject ?? t.notes,
				value: note.content,
			})),
	);
	const regulatoryNotes = section(
		"regulatoryNotes",
		t.regulatoryNotes,
		noteRows
			.filter((note) => note.subject === "REG")
			.map((note) => ({ label: t.regulatoryNotes, value: note.content })),
	);

	const sellerRows = rows(
		labeled(t.registeredName, textOf(seller?.name)),
		labeled(t.tradeName, textOf(rec(seller?.organization)?.tradingName)),
		labeled(t.address, addressOf(seller?.postalAddress, locale)),
		labeled(t.email, idOf(seller?.electronicAddress)),
		...contactRows(rec(seller?.contact), t),
		...partyIds(seller, t, { localTax: true }),
	);

	return {
		document: documentSection,
		seller: section("seller", t.seller, sellerRows),
		taxRepresentative,
		buyer: buyerSection,
		buyerIdentifiers,
		references,
		invoicing,
		delivery: deliverySection,
		lineTitle: t.lines,
		lineHeaders: {
			articleId: t.articleId,
			description: t.description,
			quantity: t.quantity,
			unitPrice: t.unitPrice,
			totalNet: t.totalNet,
			vat: t.vat,
		},
		lines,
		allowanceTitle: t.allowances,
		allowanceHeaders: {
			reason: t.reason,
			percent: t.percent,
			basis: t.basis,
			amount: t.amount,
			vat: t.vat,
		},
		allowances,
		chargeTitle: t.charges,
		chargeHeaders: {
			reason: t.reason,
			percent: t.percent,
			basis: t.basis,
			amount: t.amount,
			vat: t.vat,
		},
		charges,
		vatTitle: t.vatBreakdown,
		vatHeaders: {
			exemptionReason: t.exemptionReason,
			exemptionReasonCode: t.exemptionReasonCode,
			category: t.vatCategory,
			rate: t.vatRate,
			base: t.vatBase,
			amount: t.vatAmount,
			vatPoint: t.vatPointDate,
		},
		vatRows: vatRows.filter((row) =>
			Object.values(row).some((value) => value.length > 0),
		),
		paymentTerms: labeled(t.paymentTerms, textOf(terms?.description)),
		dueDate: labeled(t.dueDate, formatDate(terms?.dueDate, locale)),
		totals,
		payee,
		payment,
		notes,
		regulatoryNotes,
	};
};
