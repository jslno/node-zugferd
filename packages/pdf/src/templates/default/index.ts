import type {
	Content,
	TableCell,
	TDocumentDefinitions,
} from "pdfmake/interfaces";
import type { InvoiceTemplate, TemplateContext } from "../../types";

export type DefaultTemplateOptions = {
	/**
	 * Logo (PNG or JPEG) rendered in the top right corner.
	 */
	logo?: Buffer | Uint8Array | string;
	/**
	 * Width of the logo in pt.
	 *
	 * @default 140
	 */
	logoWidth?: number;
	/**
	 * Color used for table rules and emphasis.
	 *
	 * @default "#333333"
	 */
	accentColor?: string;
	/**
	 * Single line with the sender's address above the recipient's address
	 * field (DIN 5008 "Rücksendeangabe"), e.g.
	 * `"Lieferant GmbH · Lieferantenstraße 20 · 80333 München"`.
	 * Defaults to a line derived from the seller data.
	 */
	senderLine?: string;
	/**
	 * Footer columns repeated on every page. Use them for the mandatory
	 * German business details: company, registration court and number,
	 * managing directors, bank details, …
	 */
	footer?: {
		columns: string[];
	};
	/**
	 * Overrides for individual labels of the built-in German label set.
	 */
	labels?: Partial<Record<keyof typeof defaultLabels, string>>;
};

const defaultLabels = {
	invoice: "Rechnung",
	invoiceTitle: "Rechnung Nr.",
	invoiceNumber: "Rechnungs-Nr.",
	invoiceDate: "Rechnungsdatum",
	customerNumber: "Kunden-Nr.",
	deliveryDate: "Lieferdatum",
	servicePeriod: "Leistungszeitraum",
	sellerVatId: "USt-IdNr.",
	sellerTaxNumber: "Steuernummer",
	position: "Pos.",
	description: "Bezeichnung",
	quantity: "Menge",
	unitPrice: "Einzelpreis",
	lineTotal: "Gesamt",
	netAmounts: "Beträge in EUR (netto)",
	subtotal: "Zwischensumme (netto)",
	allowances: "Nachlässe",
	charges: "Zuschläge",
	taxBasis: "Steuerbasis (netto)",
	vat: "USt.",
	grandTotal: "Gesamtbetrag",
	prepaid: "Bereits gezahlt",
	duePayable: "Zahlbetrag",
	page: "Seite",
	of: "von",
} as const;

const joinAddress = (party: any): string[] => {
	const address = party?.postalAddress ?? {};
	return [
		party?.name,
		address.line1,
		address.line2,
		address.line3,
		[address.postCode, address.city].filter(Boolean).join(" "),
	].filter((line) => !!line && String(line).trim().length > 0);
};

/**
 * The built-in invoice template: a classic German business letter layout
 * (DIN 5008 inspired) rendering all content required by § 14 Abs. 4 UStG
 * from the invoice data. Requires the BASIC profile or higher, since
 * MINIMUM and BASIC WL lack line items and are not valid invoices under
 * German fiscal law.
 */
export const defaultTemplate = (
	options: DefaultTemplateOptions = {},
): InvoiceTemplate => {
	const labels = { ...defaultLabels, ...options.labels };
	const accent = options.accentColor ?? "#333333";

	return (ctx: TemplateContext): TDocumentDefinitions => {
		const { data, formatters } = ctx;

		const lines: any[] = data.transaction?.line ?? [];
		if (lines.length === 0) {
			throw new Error(
				"[@node-zugferd/pdf] The default template requires at least one invoice line (profile BASIC or higher). Provide a custom template for line-less profiles.",
			);
		}

		const seller = data.transaction?.tradeAgreement?.seller ?? {};
		const buyer = data.transaction?.tradeAgreement?.buyer ?? {};
		const settlement = data.transaction?.tradeSettlement ?? {};
		const summation = settlement.monetarySummation ?? {};
		const currency = settlement.currencyCode;
		const vatBreakdown: any[] = settlement.vatBreakdown ?? [];
		const deliveryDate =
			data.transaction?.tradeDelivery?.information?.deliveryDate;

		const currencyFmt = (value: string | number | undefined) =>
			value === undefined ? "" : formatters.currency(value, currency);

		const senderLine =
			options.senderLine ??
			[seller.name, ...joinAddress(seller).slice(1)].join(" · ");

		const metaRows: Array<[string, string]> = [
			[labels.invoiceNumber, String(data.number ?? "")],
			[
				labels.invoiceDate,
				data.issueDate ? formatters.date(data.issueDate) : "",
			],
		];
		if (buyer.identifier) {
			metaRows.push([labels.customerNumber, String(buyer.identifier)]);
		}
		if (deliveryDate) {
			metaRows.push([labels.deliveryDate, formatters.date(deliveryDate)]);
		}
		const invoicingPeriod = settlement.invoicingPeriod;
		if (invoicingPeriod?.startDate || invoicingPeriod?.endDate) {
			metaRows.push([
				labels.servicePeriod,
				[
					invoicingPeriod.startDate &&
						formatters.date(invoicingPeriod.startDate),
					invoicingPeriod.endDate && formatters.date(invoicingPeriod.endDate),
				]
					.filter(Boolean)
					.join(" – "),
			]);
		}
		if (seller.taxRegistration?.vatIdentifier) {
			metaRows.push([labels.sellerVatId, seller.taxRegistration.vatIdentifier]);
		} else if (seller.taxRegistration?.localIdentifier) {
			metaRows.push([
				labels.sellerTaxNumber,
				seller.taxRegistration.localIdentifier,
			]);
		}

		const percent = (rate: string | number | undefined) =>
			rate === undefined ? "" : `${formatters.quantity(rate)} %`;

		const lineRows: TableCell[][] = lines.map((line, index) => {
			const quantity = line.tradeDelivery?.billedQuantity;
			const unitPrice = line.tradeAgreement?.netTradePrice?.chargeAmount;
			const lineTotal =
				line.tradeSettlement?.monetarySummation?.lineTotalAmount ??
				(unitPrice !== undefined && quantity?.amount !== undefined
					? Number(unitPrice) * Number(quantity.amount)
					: undefined);
			const vatRate = line.tradeSettlement?.tradeTax?.rateApplicablePercent;

			return [
				{ text: line.identifier ?? String(index + 1), alignment: "right" },
				{ text: line.tradeProduct?.name ?? "" },
				{
					text: quantity
						? formatters.quantity(quantity.amount, quantity.unitMeasureCode)
						: "",
					alignment: "right",
				},
				{ text: currencyFmt(unitPrice), alignment: "right" },
				{ text: percent(vatRate), alignment: "right" },
				{ text: currencyFmt(lineTotal), alignment: "right" },
			];
		});

		const totalRows: Array<[string, string, boolean?]> = [];
		if (summation.lineTotalAmount !== undefined) {
			totalRows.push([labels.subtotal, currencyFmt(summation.lineTotalAmount)]);
		}
		if (Number(summation.allowanceTotalAmount ?? 0) !== 0) {
			totalRows.push([
				labels.allowances,
				`- ${currencyFmt(summation.allowanceTotalAmount)}`,
			]);
		}
		if (Number(summation.chargeTotalAmount ?? 0) !== 0) {
			totalRows.push([
				labels.charges,
				currencyFmt(summation.chargeTotalAmount),
			]);
		}
		if (
			summation.taxBasisTotalAmount !== undefined &&
			summation.taxBasisTotalAmount !== summation.lineTotalAmount
		) {
			totalRows.push([
				labels.taxBasis,
				currencyFmt(summation.taxBasisTotalAmount),
			]);
		}
		for (const vat of vatBreakdown) {
			totalRows.push([
				`zzgl. ${percent(vat.rateApplicablePercent ?? 0)} ${labels.vat}`,
				currencyFmt(vat.calculatedAmount),
			]);
		}
		if (summation.grandTotalAmount !== undefined) {
			totalRows.push([
				labels.grandTotal,
				currencyFmt(summation.grandTotalAmount),
				true,
			]);
		}
		if (Number(summation.prepaidAmount ?? 0) !== 0) {
			totalRows.push([
				labels.prepaid,
				`- ${currencyFmt(summation.prepaidAmount)}`,
			]);
			totalRows.push([
				labels.duePayable,
				currencyFmt(summation.duePayableAmount),
				true,
			]);
		}

		const exemptionNotes = vatBreakdown
			.map((vat) => vat.exemptionReason)
			.filter(Boolean);
		const notes: string[] = [
			...(data.includedNote ?? []).map((note: any) => note.content),
			...(settlement.paymentTerms?.description
				? [settlement.paymentTerms.description]
				: []),
			...exemptionNotes,
		].filter(Boolean);

		const content: Content[] = [
			// address field + document meta
			{
				columns: [
					{
						width: "*",
						stack: [
							{
								text: senderLine,
								fontSize: 7,
								color: "#666666",
								margin: [0, 0, 0, 8],
							},
							{ text: joinAddress(buyer).join("\n"), lineHeight: 1.2 },
						],
					},
					{
						width: "auto",
						table: {
							body: metaRows.map(([label, value]) => [
								{ text: label, color: "#666666" },
								{ text: value, alignment: "right" },
							]),
						},
						layout: "noBorders",
						fontSize: 9,
					},
				],
				columnGap: 24,
				margin: [0, 60, 0, 32],
			},
			// title
			{
				text: `${labels.invoiceTitle} ${data.number ?? ""}`,
				bold: true,
				fontSize: 13,
				color: accent,
				margin: [0, 0, 0, 12],
			},
			// line items
			{
				table: {
					headerRows: 1,
					widths: [24, "*", 55, 65, 40, 70],
					body: [
						(
							[
								[labels.position, "right"],
								[labels.description, "left"],
								[labels.quantity, "right"],
								[labels.unitPrice, "right"],
								[labels.vat, "right"],
								[labels.lineTotal, "right"],
							] as const
						).map(
							([text, alignment]): TableCell => ({
								text,
								alignment,
								bold: true,
								color: accent,
							}),
						),
						...lineRows,
					],
				},
				layout: {
					hLineWidth: (i: number, node: any) =>
						i === 0 || i === 1 || i === node.table.body.length ? 0.75 : 0.25,
					vLineWidth: () => 0,
					hLineColor: () => accent,
					paddingTop: () => 5,
					paddingBottom: () => 5,
				},
				fontSize: 9,
			},
			// totals
			{
				columns: [
					{ width: "*", text: "" },
					{
						width: "auto",
						table: {
							body: totalRows.map(([label, value, emphasized]) => [
								{ text: label, bold: !!emphasized },
								{ text: value, alignment: "right", bold: !!emphasized },
							]),
						},
						layout: "noBorders",
						fontSize: 9,
					},
				],
				margin: [0, 12, 0, 24],
			},
			// notes, payment terms, tax exemption reasons
			...notes.map(
				(note): Content => ({
					text: note,
					fontSize: 9,
					margin: [0, 0, 0, 8],
				}),
			),
		];

		return {
			pageSize: "A4",
			pageMargins: [57, 40, 42, options.footer ? 90 : 60],
			...(options.logo
				? {
						header: {
							image:
								typeof options.logo === "string"
									? options.logo
									: `data:image/png;base64,${Buffer.from(options.logo).toString("base64")}`,
							width: options.logoWidth ?? 140,
							alignment: "right",
							margin: [0, 24, 42, 0],
						},
					}
				: {}),
			footer: (currentPage, pageCount) => ({
				stack: [
					...(options.footer
						? [
								{
									columns: options.footer.columns.map((column) => ({
										text: column,
										fontSize: 7,
										color: "#666666",
									})),
									columnGap: 16,
								},
							]
						: []),
					{
						text: `${labels.page} ${currentPage} ${labels.of} ${pageCount}`,
						alignment: "right",
						fontSize: 7,
						color: "#666666",
						margin: [0, 6, 0, 0],
					},
				],
				margin: [57, 12, 42, 0],
			}),
			content,
		};
	};
};
