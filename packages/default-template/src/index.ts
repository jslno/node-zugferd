import type { Awaitable } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import type {
	Node,
	PageSize,
	Theme,
	ThemeFonts,
} from "@node-zugferd/pdf-template";
import {
	definePdfTemplate,
	renderFlow,
	vstack,
	hstack,
	text,
	spacer,
	stripeTheme,
	StandardFonts,
	PageSizes,
	link,
	table,
	formatCurrency,
} from "@node-zugferd/pdf-template";
import untdid1001 from "@node-zugferd/codelist-untdid-1001";
import { createT } from "./i18n";
import * as defaultTranslations from "./i18n/translations";

type Font = StandardFonts | string | Uint8Array | ArrayBuffer;

const mapAsync = async <T extends Record<PropertyKey, any>, R>(
	obj: T,
	fn: (value: T[keyof T], key: keyof T) => Awaitable<R>,
): Promise<{ [K in keyof T]: Awaited<R> }> => {
	const entries = await Promise.all(
		Object.entries(obj).map(async ([k, v]) => [
			k,
			await fn(v as any, k as any),
		]),
	);

	return Object.fromEntries(entries) as any;
};

const supportedProfiles = [
	"minimum",
	"basic-wl",
	"basic",
	"en-16931",
	"extended",
	"xrechnung",
] as const;
type SupportedProfile = (typeof supportedProfiles)[number];
const isSupportedProfile = (id: string): id is SupportedProfile =>
	supportedProfiles.includes(id as SupportedProfile);

const isCreditNote = (invoiceTypeCode: string) => {
	const entry = untdid1001.find((entry) => entry.value === invoiceTypeCode);
	if (!entry || !("interpretation" in entry)) return false;
	return entry.interpretation === "Credit Note";
};

const filterNodes = (arr: (Node | false | 0 | undefined | null)[]): Node[] =>
	arr.filter((val): val is Node => !!val);

type InferLocale<T extends Record<string, defaultTranslations.Translations>> =
	keyof typeof defaultTranslations & keyof T;

export type DefaultTemplateConfig<
	T extends Record<
		string,
		defaultTranslations.Translations
	> = typeof defaultTranslations,
> = {
	translations?: T | undefined;
	defaultLocale?: InferLocale<T> | undefined;
	defaultPageSize?: PageSize | undefined;
};

export const defaultTemplate = <
	const T extends Record<
		string,
		defaultTranslations.Translations
	> = typeof defaultTranslations,
>(
	config?: DefaultTemplateConfig<T> | undefined,
) => {
	const cfg = {
		defaultPageSize: PageSizes.A4,
		defaultLocale: "en" as const,
		...(config ?? {}),
	} satisfies DefaultTemplateConfig<T>;

	return definePdfTemplate({
		async template(pdf, props, ctx) {
			const fonts = await mapAsync(
				{
					font: StandardFonts.Helvetica,
					bold: StandardFonts.HelveticaBold,
					italic: StandardFonts.HelveticaOblique,
					...(props.fonts ?? {}),
				},
				(font) => pdf.embedFont(font),
			);
			if (!isSupportedProfile(ctx.profile.id)) {
				throw new ZugferdError(
					`Unsupported profile "${ctx.profile.id}". Supported profiles are: ${supportedProfiles.join(", ")}`,
				);
			}
			const profile = ctx.profile.id;
			// TODO
			if (!["basic", "en-16931", "extended", "xrechnung"].includes(profile)) {
				ctx.context.logger.warn(
					"Fiscal mandatory information may not be applicable for this profile.",
				);
			}

			const t = createT({
				locale: props.locale ?? cfg.defaultLocale,
				translations: {
					...defaultTranslations,
					...cfg.translations,
				},
			});

			const theme = (props.theme ?? stripeTheme)(fonts);

			const pageSize = props.pageSize ?? cfg.defaultPageSize;
			const PAGE_INNER = pageSize.width - theme.spacing.xxl * 2;

			const heading = () => {
				return hstack(
					{
						gap: theme.spacing.lg,
					},
					vstack({
						padding: theme.spacing.md,
						width: (PAGE_INNER - theme.spacing.lg) / 2,
						gap: theme.spacing.md,
					}),
					vstack(
						{
							padding: theme.spacing.md,
							width: (PAGE_INNER - theme.spacing.lg) / 2,
							gap: theme.spacing.md,
							alignSelf: "end",
						},
						text(
							`${
								isCreditNote(ctx.data.exchangedDocument.invoiceTypeCode.value)
									? t.creditNote
									: t.invoice
							} #${ctx.data.exchangedDocument.invoiceNumber.identifier}`,
							{
								...theme.type.h1,
								alignSelf: "end",
							},
						),
						text(
							ctx.data.exchangedDocument.invoiceIssueDate.date.toLocaleDateString(
								props.locale,
								{
									year: "numeric",
									month: "2-digit",
									day: "2-digit",
								},
							),
							{
								...theme.type.body,
								color: theme.colors.muted,
								alignSelf: "end",
							},
						),
					),
				);
			};

			const vendorDetails = () => {
				const seller = () => {
					const nodes: Node[] = [];
					const seller = ctx.data.transaction.contract.seller;

					if (seller.name) {
						nodes.push(
							text(seller.name, {
								...theme.type.body,
							}),
						);
					}
					if (seller.organization?.tradingName) {
						nodes.push(
							text(seller.organization.tradingName, {
								...theme.type.body,
							}),
						);
					}
					if (seller.postalAddress.line1) {
						nodes.push(
							text(seller.postalAddress.line1, {
								...theme.type.body,
							}),
						);
					}
					if (seller.postalAddress.line2) {
						nodes.push(
							text(seller.postalAddress.line2, {
								...theme.type.body,
							}),
						);
					}
					if (seller.postalAddress.line3) {
						nodes.push(
							text(seller.postalAddress.line3, {
								...theme.type.body,
							}),
						);
					}
					if (seller.postalAddress.postCode || seller.postalAddress.city) {
						nodes.push(
							text(
								filterNodes([
									seller.postalAddress.postCode,
									seller.postalAddress.city,
								]).join(" "),
								{
									...theme.type.body,
								},
							),
						);
					}
					if (
						seller.postalAddress.countrySubdivision ||
						seller.postalAddress.countryCode
					) {
						nodes.push(
							text(
								filterNodes([
									seller.postalAddress.countrySubdivision,
									seller.postalAddress.countryCode.value,
								]).join(", "),
								{
									...theme.type.body,
								},
							),
						);
					}
					if (
						seller.electronicAddress?.schemeId === "EM" &&
						seller.electronicAddress.value
					) {
						nodes.push(
							text(seller.electronicAddress.value, {
								...theme.type.body,
							}),
						);
					}

					return vstack({}, ...nodes);
				};

				const sellerContact = () => {
					const nodes: Node[] = [];
					const contact = ctx.data.transaction.contract.seller.contact;
					if (!contact || Object.keys(contact).length === 0) return;

					if (contact.personName) {
						nodes.push(
							text(contact.personName, {
								...theme.type.body,
							}),
						);
					}
					if (contact.phoneNumber) {
						nodes.push(
							text(contact.phoneNumber, {
								...theme.type.body,
							}),
						);
					}
					if (contact.faxNumber) {
						nodes.push(
							text(contact.faxNumber, {
								...theme.type.body,
							}),
						);
					}
					if (contact.emailAddress) {
						nodes.push(
							text(contact.emailAddress, {
								...theme.type.body,
							}),
						);
					}

					return vstack({}, ...nodes);
				};

				return vstack(
					{
						padding: theme.spacing.md,
						width: (PAGE_INNER - theme.spacing.lg) / 2,
						gap: theme.spacing.md,
					},
					...filterNodes([seller(), sellerContact()]),
				);
			};

			const clientDetails = () => {
				const buyer = () => {
					const nodes: Node[] = [];
					const buyer = ctx.data.transaction.contract.buyer;

					if (buyer.name) {
						nodes.push(
							text(buyer.name, {
								...theme.type.body,
								alignSelf: "end",
							}),
						);
					}
					if (buyer.organization?.tradingName) {
						nodes.push(
							text(buyer.organization?.tradingName, {
								...theme.type.body,
								alignSelf: "end",
							}),
						);
					}
					if (buyer.postalAddress.line1) {
						nodes.push(
							text(buyer.postalAddress.line1, {
								...theme.type.body,
								alignSelf: "end",
							}),
						);
					}
					if (buyer.postalAddress.line2) {
						nodes.push(
							text(buyer.postalAddress.line2, {
								...theme.type.body,
								alignSelf: "end",
							}),
						);
					}
					if (buyer.postalAddress.line3) {
						nodes.push(
							text(buyer.postalAddress.line3, {
								...theme.type.body,
								alignSelf: "end",
							}),
						);
					}
					if (buyer.postalAddress.postCode || buyer.postalAddress.city) {
						nodes.push(
							text(
								filterNodes([
									buyer.postalAddress.postCode,
									buyer.postalAddress.city,
								]).join(" "),
								{
									...theme.type.body,
									alignSelf: "end",
								},
							),
						);
					}
					if (
						buyer.postalAddress.countrySubdivision ||
						buyer.postalAddress.countryCode
					) {
						nodes.push(
							text(
								filterNodes([
									buyer.postalAddress.countrySubdivision,
									buyer.postalAddress.countryCode.value,
								]).join(", "),
								{
									...theme.type.body,
									alignSelf: "end",
								},
							),
						);
					}
					if (
						buyer.electronicAddress?.schemeId === "EM" &&
						buyer.electronicAddress.value
					) {
						nodes.push(
							text(buyer.electronicAddress.value, {
								...theme.type.body,
								alignSelf: "end",
							}),
						);
					}

					return vstack(
						{
							alignSelf: "end",
						},
						...nodes,
					);
				};

				const buyerContact = () => {
					const nodes: Node[] = [];
					const contact = ctx.data.transaction.contract.buyer.contact;
					if (!contact || Object.keys(contact).length === 0) return;

					if (contact.personName) {
						nodes.push(
							text(contact.personName, {
								...theme.type.body,
								alignSelf: "end",
							}),
						);
					}
					if (contact.phoneNumber) {
						nodes.push(
							text(contact.phoneNumber, {
								...theme.type.body,
								alignSelf: "end",
							}),
						);
					}
					if (contact.faxNumber) {
						nodes.push(
							text(contact.faxNumber, {
								...theme.type.body,
								alignSelf: "end",
							}),
						);
					}
					if (contact.emailAddress) {
						nodes.push(
							text(contact.emailAddress, {
								...theme.type.body,
								alignSelf: "end",
							}),
						);
					}

					return vstack(
						{
							alignSelf: "end",
						},
						...nodes,
					);
				};

				return vstack(
					{
						padding: theme.spacing.md,
						width: (PAGE_INNER - theme.spacing.lg) / 2,
						gap: theme.spacing.md,
					},
					...filterNodes([buyer(), buyerContact()]),
				);
			};

			const itemsTable = () => {
				const lines = ctx.data.transaction.line ?? [];
				return vstack(
					{
						gap: theme.spacing.md,
					},
					table({
						width: PAGE_INNER,
						columns: [
							{ width: "1fr" },
							{ width: "2fr" },
							{ width: "1fr" },
							{ width: "1fr", align: "right" },
							{ width: "1fr", align: "right" },
							{ width: "1fr", align: "right" },
						],
						header: [
							text("#", { ...theme.type.label }),
							text("Description", { ...theme.type.label }),
							text("Quantity", { ...theme.type.label }),
							text("Unit Price", { ...theme.type.label, alignSelf: "end" }),
							text("Total Net", { ...theme.type.label, alignSelf: "end" }),
							text("VAT", { ...theme.type.label, alignSelf: "end" }),
						],
						rows: lines.map((line: any, i: number) => [
							text(line.position.lineId.value ?? `${i + 1}`, {
								...theme.type.body,
							}),
							text(line.item.name ?? line.item.description ?? "", {
								...theme.type.body,
								maxLines: 1,
							}),
							text(
								[
									`${line.delivery.billedQuantity.value ?? 1}`,
									line.delivery.billedQuantity.unitCode,
								]
									.filter(Boolean)
									.join(" "),
								{
									...theme.type.body,
								},
							),
							text(
								formatCurrency(line.priceDetails.netPrice.chargeAmount ?? 0, {
									currency:
										ctx.data.transaction.debit.invoiceCurrencyCode.value,
									locale: props.locale ?? cfg.defaultLocale,
								}),
								{
									...theme.type.body,
									alignSelf: "end",
								},
							),
							text(
								formatCurrency(
									line.billing.itemTotals.lineTotalAmount.value ?? 0,
									{
										currency:
											ctx.data.transaction.debit.invoiceCurrencyCode.value,
										locale: props.locale ?? cfg.defaultLocale,
									},
								),
								{
									...theme.type.body,
									alignSelf: "end",
								},
							),
							text(line.billing.vatBreakdown?.categoryCode?.value ?? "", {
								...theme.type.body,
								alignSelf: "end",
							}),
						]),
						rowDivider: theme.hr,
						headerDivider: { color: theme.colors.ink, thickness: 0.8 },
					}),
					table({
						width: PAGE_INNER,
						columns: [
							{ width: "1fr" },
							{ width: "2fr" },
							{ width: "1fr" },
							{ width: "1fr", align: "right" },
							{ width: "1fr", align: "right" },
							{ width: "1fr", align: "right" },
						],
						rows: [
							...(ctx.data.transaction.debit.allowances ?? []).map(
								(allowance: any) => [
									text("", { ...theme.type.body }),
									text(allowance.reason ?? "", {
										...theme.type.body,
										maxLines: 1,
									}),
									text(
										typeof allowance.calculationPercent === "number"
											? `${allowance.calculationPercent}%`
											: "",
										{ ...theme.type.body },
									),
									text(
										formatCurrency(
											allowance.basisAmount?.value?.toString() ?? "",
											{
												currency:
													ctx.data.transaction.debit.invoiceCurrencyCode.value,
												locale: props.locale ?? cfg.defaultLocale,
											},
										),
										{
											...theme.type.body,
											alignSelf: "end",
										},
									),
									text(
										formatCurrency(
											-Math.abs(allowance.actualAmount.value ?? 0),
											{
												currency:
													ctx.data.transaction.debit.invoiceCurrencyCode.value,
												locale: props.locale ?? cfg.defaultLocale,
											},
										),
										{ ...theme.type.body, alignSelf: "end" },
									),
									text(allowance.categoryTradeTax?.categoryCode?.value ?? "", {
										...theme.type.body,
										alignSelf: "end",
									}),
								],
							),
							...(ctx.data.transaction.debit.charges ?? []).map(
								(charge: any) => [
									text("", { ...theme.type.body }),
									text(charge.reason ?? "", {
										...theme.type.body,
										maxLines: 1,
									}),
									text(
										typeof charge.calculationPercent === "number"
											? `${charge.calculationPercent}%`
											: "",
										{ ...theme.type.body },
									),
									text(
										charge.basisAmount
											? formatCurrency(charge.basisAmount.value, {
													currency:
														ctx.data.transaction.debit.invoiceCurrencyCode
															.value,
													locale: props.locale ?? cfg.defaultLocale,
												})
											: "",
										{
											...theme.type.body,
											alignSelf: "end",
										},
									),
									text(
										formatCurrency(charge.actualAmount.value ?? 0, {
											currency:
												ctx.data.transaction.debit.invoiceCurrencyCode.value,
											locale: props.locale ?? cfg.defaultLocale,
										}),
										{ ...theme.type.body, alignSelf: "end" },
									),
									text(charge.categoryTradeTax?.categoryCode?.value ?? "", {
										...theme.type.body,
										alignSelf: "end",
									}),
								],
							),
						],
						borderSides: {
							top: {
								color: theme.hr.color,
								width: theme.hr.thickness,
							},
						},
						rowDivider: theme.hr,
					}),
					table({
						width: PAGE_INNER,
						header: [
							text("VAT breakdown", { ...theme.type.label }),
							text("VAT code", { ...theme.type.label, alignSelf: "end" }),
							text("VAT rate", { ...theme.type.label, alignSelf: "end" }),
							text("VAT base", { ...theme.type.label, alignSelf: "end" }),
							text("VAT amount", { ...theme.type.label, alignSelf: "end" }),
						],
						columns: [
							{ width: "2fr" },
							{ width: "1fr", align: "right" },
							{ width: "1fr", align: "right" },
							{ width: "1fr", align: "right" },
							{ width: "1fr", align: "right" },
						],
						rows: ctx.data.transaction.debit.vatBreakdown.map(
							(vatBreakdown: any) => [
								text(vatBreakdown.exemptionReason ?? "", {
									...theme.type.body,
									maxLines: 1,
								}),
								text(vatBreakdown.categoryCode.value, {
									...theme.type.body,
									alignSelf: "end",
								}),
								text(
									typeof vatBreakdown.rateApplicablePercent === "number"
										? `${vatBreakdown.rateApplicablePercent}%`
										: "",
									{
										...theme.type.body,
										alignSelf: "end",
									},
								),
								text(
									formatCurrency(vatBreakdown.basisAmount.value, {
										currency:
											ctx.data.transaction.debit.invoiceCurrencyCode.value,
										locale: props.locale ?? cfg.defaultLocale,
									}),
									{
										...theme.type.body,
										alignSelf: "end",
									},
								),
								text(
									formatCurrency(vatBreakdown.calculatedAmount.value, {
										currency:
											ctx.data.transaction.debit.invoiceCurrencyCode.value,
										locale: props.locale ?? cfg.defaultLocale,
									}),
									{
										...theme.type.body,
										alignSelf: "end",
									},
								),
							],
						),
						rowDivider: theme.hr,
						headerDivider: { color: theme.colors.ink, thickness: 0.8 },
					}),
					hstack(
						{ gap: theme.spacing.lg, align: "stretch" },
						vstack(
							{
								width: (PAGE_INNER - theme.spacing.lg) / 2,
								justify: "between",
							},
							vstack(
								{},
								text("BT-8", { ...theme.type.body }),
								text(
									ctx.data.transaction.debit.paymentTerms?.description ?? "",
									{ ...theme.type.body },
								),
							),
							text(
								ctx.data.transaction.debit.paymentTerms?.dueDate
									? `Due date: ${ctx.data.transaction.debit.paymentTerms.dueDate.date.toLocaleDateString(
											props.locale ?? cfg.defaultLocale,
											{
												year: "numeric",
												month: "2-digit",
												day: "2-digit",
											},
										)}`
									: "",
								{ ...theme.type.body },
							),
						),
						vstack(
							{
								width: (PAGE_INNER - theme.spacing.lg) / 2,
							},
							table({
								width: (PAGE_INNER - theme.spacing.lg) / 2,
								header: [
									text("Total Net", { ...theme.type.label, alignSelf: "end" }),
									text("Total VAT", { ...theme.type.label, alignSelf: "end" }),
									text("Total Gross", {
										...theme.type.label,
										alignSelf: "end",
									}),
								],
								columns: [
									{ width: "1fr", align: "right" },
									{ width: "1fr", align: "right" },
									{ width: "1fr", align: "right" },
								],
								rows: [
									[
										text(
											formatCurrency(
												ctx.data.transaction.debit.documentTotals
													.taxBasisTotalAmount.value,
												{
													currency:
														ctx.data.transaction.debit.invoiceCurrencyCode
															.value,
													locale: props.locale ?? cfg.defaultLocale,
												},
											),
											{ ...theme.type.body, alignSelf: "end" },
										),
										text(
											formatCurrency(
												ctx.data.transaction.debit.documentTotals.taxTotalAmount
													.value,
												{
													currency:
														ctx.data.transaction.debit.documentTotals
															.taxTotalAmount.currency,
													locale: props.locale ?? cfg.defaultLocale,
												},
											),
											{ ...theme.type.body, alignSelf: "end" },
										),
										text(
											formatCurrency(
												ctx.data.transaction.debit.documentTotals
													.grandTotalAmount.value,
												{
													currency:
														ctx.data.transaction.debit.invoiceCurrencyCode
															.value,
													locale: props.locale ?? cfg.defaultLocale,
												},
											),
											{ ...theme.type.body, alignSelf: "end" },
										),
									],
								],
								rowDivider: theme.hr,
								headerDivider: { color: theme.colors.ink, thickness: 0.8 },
							}),
							table({
								width: (PAGE_INNER - theme.spacing.lg) / 2,
								columns: [
									{
										width: "2fr",
									},
									{
										width: "1fr",
										align: "right",
									},
								],
								rows: [
									[
										text("Prepaid Amount", { ...theme.type.label }),
										text(
											formatCurrency(
												ctx.data.transaction.debit.documentTotals.prepaidAmount
													?.value ?? 0,
												{
													currency:
														ctx.data.transaction.debit.invoiceCurrencyCode
															.value,
													locale: props.locale ?? cfg.defaultLocale,
												},
											),
											{ ...theme.type.body, alignSelf: "end" },
										),
									],
									[
										text("Due for payment", { ...theme.type.label }),
										text(
											formatCurrency(
												ctx.data.transaction.debit.documentTotals
													.duePayableAmount.value,
												{
													currency:
														ctx.data.transaction.debit.invoiceCurrencyCode
															.value,
													locale: props.locale ?? cfg.defaultLocale,
												},
											),
											{
												...theme.type.body,
												font: theme.bold,
												alignSelf: "end",
											},
										),
									],
								],
								borderSides: {
									top: {
										color: theme.hr.color,
										width: theme.hr.thickness,
									},
								},
								rowDivider: theme.hr,
							}),
						),
					),
				);
			};

			await renderFlow(
				pdf,
				[
					heading(),
					hstack(
						{
							gap: theme.spacing.lg,
							wrap: true,
						},
						vendorDetails(),
						clientDetails(),
						itemsTable(),
					),
				],
				{
					margin: theme.spacing.xxl,
					size: pageSize,
				},
			);

			return pdf;
		},
		$Infer: {} as {
			Props: {
				Input: {
					fonts?: Partial<Record<keyof ThemeFonts, Font>> | undefined;
					theme?: ((fonts: ThemeFonts) => Theme) | undefined;
					locale?: InferLocale<T> | undefined;
					pageSize?: PageSize | undefined;
				};
			};
		},
	});
};

export type { Translations } from "./i18n";
