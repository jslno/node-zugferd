import type { Awaitable } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import type {
	Node,
	PageSize,
	RGB,
	Theme,
	ThemeFonts,
} from "@node-zugferd/pdf-template";
import {
	definePdfTemplate,
	hline,
	hstack,
	PageSizes,
	renderFlow,
	StandardFonts,
	stripeTheme,
	table,
	text,
	vstack,
} from "@node-zugferd/pdf-template";
import { createT } from "./i18n";
import * as defaultTranslations from "./i18n/translations";
import type {
	AdjustmentView,
	LabeledValue,
	LineView,
	Section,
} from "./view-model";
import { invoiceView } from "./view-model";

type Font = StandardFonts | string | Uint8Array | ArrayBuffer;

const mapAsync = async <T extends Record<PropertyKey, any>, R>(
	obj: T,
	fn: (value: T[keyof T], key: keyof T) => Awaitable<R>,
): Promise<{ [K in keyof T]: Awaited<R> }> => {
	const entries = await Promise.all(
		Object.entries(obj).map(async ([k, v]) => [
			k,
			await fn(v as T[keyof T], k as keyof T),
		]),
	);

	return Object.fromEntries(entries) as { [K in keyof T]: Awaited<R> };
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

const present = (nodes: Array<Node | undefined>): Node[] =>
	nodes.filter((node): node is Node => !!node);

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

			const translations = {
				...defaultTranslations,
				...cfg.translations,
			};
			const locale = (props.locale ?? cfg.defaultLocale) as InferLocale<T>;
			if (!translations[locale]) {
				throw new ZugferdError(
					`Unsupported locale "${String(locale)}". Supported locales are: ${Object.keys(translations).join(", ")}`,
				);
			}
			const t = createT({ locale, translations });
			const view = invoiceView(ctx.data, t, locale);

			const theme = (props.theme ?? stripeTheme)(fonts);
			const pageSize = props.pageSize ?? cfg.defaultPageSize;
			const pageInner = pageSize.width - theme.spacing.xxl * 2;
			const column = (pageInner - theme.spacing.lg) / 2;

			type Align = "left" | "right";

			const prose = (
				value: string,
				width?: number,
				align: Align = "left",
				color?: RGB,
			) => {
				const parts = value.split("\n").filter((line) => line.length > 0);
				const line = (content: string) =>
					text(content, {
						...theme.type.body,
						wrap: true,
						...(color ? { color } : {}),
						...(width ? { width } : {}),
						...(align === "right" ? { align: "right" as const } : {}),
					});
				const [first, ...rest] = parts;
				if (!first) return text(" ", theme.type.body);
				if (rest.length === 0) return line(first);
				return vstack(
					{
						gap: 1,
						...(width ? { width } : {}),
						align: align === "right" ? "end" : "start",
					},
					line(first),
					...rest.map(line),
				);
			};

			const field = (
				row: LabeledValue,
				width: number,
				align: Align = "left",
			) => {
				const [head, ...rest] = row.value
					.split("\n")
					.filter((line) => line.length > 0);
				return prose(
					[`${row.label}: ${head ?? ""}`, ...rest].join("\n"),
					width,
					align,
				);
			};

			const findRow = (section: Section | undefined, label: string) =>
				section?.rows.find((row) => row.label === label);

			const omitRows = (
				section: Section | undefined,
				labels: string[],
			): Section | undefined => {
				if (!section) return undefined;
				const hidden = new Set(labels);
				const rows = section.rows.filter((row) => !hidden.has(row.label));
				return rows.length > 0 ? { ...section, rows } : undefined;
			};

			const sectionBlock = (
				section: Section,
				width: number,
				align: Align = "left",
			) =>
				vstack(
					{
						width,
						gap: 2,
						align: align === "right" ? "end" : "start",
					},
					text(section.title, {
						...theme.type.body,
						font: theme.bold,
						width,
						wrap: true,
						...(align === "right" ? { align: "right" as const } : {}),
					}),
					...section.rows.map((row) => field(row, width, align)),
				);

			const plainSellerLabels = [t.email, t.phone, t.contactEmail];
			const letterheadLabels = [
				t.registeredName,
				t.name,
				t.tradeName,
				t.address,
				t.contactName,
				t.department,
				...plainSellerLabels,
			];

			const number = findRow(view.document, t.invoiceNumber);
			const issueDate = findRow(view.document, t.issueDate);
			const documentMeta = view.document.rows.filter(
				(row) => row !== number && row !== issueDate,
			);
			const periodValue = [
				findRow(view.invoicing, t.invoicingPeriodStart)?.value,
				findRow(view.invoicing, t.invoicingPeriodEnd)?.value,
			]
				.filter((value): value is string => !!value)
				.join(" - ");
			const dates = [
				issueDate,
				view.dueDate,
				periodValue
					? { label: t.servicePeriod, value: periodValue }
					: undefined,
				findRow(view.delivery, t.deliveryDate),
			].filter((row): row is LabeledValue => !!row);

			const sellerName =
				findRow(view.seller, t.registeredName) ?? findRow(view.seller, t.name);
			const sellerTrade = findRow(view.seller, t.tradeName);
			const sellerAddress = findRow(view.seller, t.address);
			const sellerPlain = plainSellerLabels
				.map((label) => findRow(view.seller, label))
				.filter((row): row is LabeledValue => !!row);
			const sellerContact = [t.contactName, t.department]
				.map((label) => findRow(view.seller, label))
				.filter((row): row is LabeledValue => !!row);
			const sellerIds = omitRows(view.seller, letterheadLabels);

			const buyerName =
				findRow(view.buyer, t.registeredName) ?? findRow(view.buyer, t.name);
			const buyerTrade = findRow(view.buyer, t.tradeName);
			const buyerAddress = findRow(view.buyer, t.address);
			const buyerRows = [
				...(view.buyer?.rows.filter(
					(row) =>
						row !== buyerName && row !== buyerTrade && row !== buyerAddress,
				) ?? []),
				...(view.buyerIdentifiers?.rows ?? []),
			];

			const sellerLetterhead = present([
				sellerName
					? text(sellerName.value, {
							...theme.type.h3,
							font: theme.bold,
							width: column,
							wrap: true,
							align: "right",
						})
					: undefined,
				sellerTrade ? prose(sellerTrade.value, column, "right") : undefined,
				sellerAddress
					? prose(sellerAddress.value, column, "right", theme.colors.muted)
					: undefined,
				...sellerPlain.map((row) =>
					prose(row.value, column, "right", theme.colors.muted),
				),
				...sellerContact.map((row) => field(row, column, "right")),
			]);

			const buyerBlock = present([
				buyerName
					? text(buyerName.value, {
							...theme.type.body,
							font: theme.bold,
							width: column,
							wrap: true,
						})
					: undefined,
				buyerTrade ? prose(buyerTrade.value, column) : undefined,
				buyerAddress ? prose(buyerAddress.value, column) : undefined,
				...buyerRows.map((row) => field(row, column)),
			]);

			const dateWidth =
				dates.length > 0
					? Math.min(
							column,
							(pageInner - theme.spacing.lg * (dates.length - 1)) /
								dates.length,
						)
					: column;

			const adjustmentRow = (kind: string, item: AdjustmentView): LineView => ({
				articleId: "",
				description: item.reason ? `${kind}: ${item.reason}` : kind,
				quantity: item.percent,
				unitPrice: item.basis,
				totalNet: item.amount,
				vat: item.vat,
			});
			const itemRows = [
				...view.lines,
				...view.allowances.map((item) =>
					adjustmentRow(view.allowanceTitle, item),
				),
				...view.charges.map((item) => adjustmentRow(view.chargeTitle, item)),
			];

			const rightCell = (value: string) => ({
				content: text(value || " ", {
					...theme.type.body,
					wrap: true,
				}),
				align: "right" as const,
			});
			const descriptionCell = (primary: string, secondary: string) => {
				const details = secondary
					.split("\n")
					.filter((line) => line.length > 0)
					.map((line) =>
						text(line, {
							...theme.type.caption,
							color: theme.colors.muted,
							wrap: true,
						}),
					);
				return vstack(
					{ gap: 1 },
					...present([primary ? prose(primary) : undefined, ...details]),
				);
			};

			const summaryWidth = Math.round(pageInner * 0.46);
			const vatLines = view.vatRows.filter(
				(row) =>
					row.amount ||
					row.base ||
					row.rate ||
					row.category ||
					row.exemptionReason ||
					row.exemptionReasonCode ||
					row.vatPoint,
			);
			const skipTotalVat = vatLines.length === 1 && !!vatLines[0]?.amount;
			const summaryRows = [
				...view.totals
					.filter((row) => !row.emphasize && row.label === t.totalNet)
					.map((row) => ({ ...row, detail: "" })),
				...vatLines.map((row) => ({
					label: [
						t.vatAmount,
						[row.rate, row.category].filter(Boolean).join(" "),
					]
						.filter(Boolean)
						.join(" "),
					value: row.amount || row.base,
					detail: [
						row.exemptionReason,
						row.exemptionReasonCode,
						row.base ? `${t.vatBase}: ${row.base}` : "",
						row.vatPoint ? `${t.vatPointDate}: ${row.vatPoint}` : "",
					]
						.filter(Boolean)
						.join("\n"),
					emphasize: false,
				})),
				...view.totals
					.filter(
						(row) =>
							!row.emphasize &&
							row.label !== t.totalNet &&
							!(skipTotalVat && row.label === t.totalVat),
					)
					.map((row) => ({ ...row, detail: "" })),
			];
			const amountDue = view.totals.find((row) => row.emphasize);

			const summaryLine = (
				label: string,
				value: string,
				detail: string,
				emphasize = false,
			) =>
				hstack(
					{
						width: summaryWidth,
						justify: "between",
						gap: theme.spacing.md,
						align: "start",
					},
					vstack(
						{ gap: 1, align: "start" },
						text(label, {
							...(emphasize ? theme.type.h3 : theme.type.body),
							font: emphasize ? theme.bold : theme.type.body.font,
						}),
						...detail
							.split("\n")
							.filter((line) => line.length > 0)
							.map((line) =>
								text(line, {
									...theme.type.caption,
									color: theme.colors.muted,
								}),
							),
					),
					text(value, {
						...(emphasize ? theme.type.h3 : theme.type.body),
						font: emphasize ? theme.bold : theme.type.body.font,
					}),
				);

			const summaryBlock = () => {
				if (summaryRows.length === 0 && !amountDue) return undefined;
				return vstack(
					{ width: pageInner, gap: theme.spacing.xs, align: "end" },
					...summaryRows.map((row) =>
						summaryLine(row.label, row.value, row.detail),
					),
					...(amountDue
						? [
								hline({
									color: theme.colors.ink,
									thickness: 0.8,
									width: summaryWidth,
								}),
								summaryLine(amountDue.label, amountDue.value, "", true),
							]
						: []),
				);
			};

			const cardInner = pageInner - theme.spacing.lg * 2;
			const termsCard = () => {
				const notes = view.notes?.rows ?? [];
				if (!view.paymentTerms && notes.length === 0) return undefined;
				return vstack(
					{
						...theme.card,
						width: pageInner,
						gap: theme.spacing.xs,
					},
					...present([
						view.paymentTerms
							? text(view.paymentTerms.label, {
									...theme.type.body,
									font: theme.bold,
								})
							: undefined,
						view.paymentTerms
							? prose(view.paymentTerms.value, cardInner)
							: undefined,
						view.notes
							? text(view.notes.title, {
									...theme.type.body,
									font: theme.bold,
								})
							: undefined,
						...notes.map((row) => prose(row.value, cardInner)),
					]),
				);
			};

			const paymentColumn = present([
				view.payee ? sectionBlock(view.payee, column) : undefined,
				view.payment ? sectionBlock(view.payment, column) : undefined,
			]);
			const footer = () => {
				const left =
					paymentColumn.length > 0
						? vstack({ width: column, gap: theme.spacing.md }, ...paymentColumn)
						: undefined;
				const right = sellerIds
					? vstack(
							{ width: column, gap: 2, align: "end" },
							...sellerIds.rows.map((row) => field(row, column, "right")),
						)
					: undefined;
				if (!left && !right) return undefined;
				return hstack(
					{
						width: pageInner,
						align: "start",
						justify: left && right ? "between" : right ? "end" : "start",
					},
					...present([left, right]),
				);
			};

			const regulatory = view.regulatoryNotes
				? vstack(
						{ width: pageInner, gap: 2 },
						text(view.regulatoryNotes.title, {
							...theme.type.caption,
							font: theme.bold,
							color: theme.colors.muted,
						}),
						...view.regulatoryNotes.rows.map((row) =>
							prose(row.value, pageInner, "left", theme.colors.muted),
						),
					)
				: undefined;

			const invoicingRest = omitRows(view.invoicing, [
				t.invoicingPeriodStart,
				t.invoicingPeriodEnd,
			]);
			const deliveryRest = omitRows(view.delivery, [t.deliveryDate]);

			await renderFlow(
				pdf,
				[
					vstack(
						{ gap: theme.spacing.xl, width: pageInner },
						...present([
							hstack(
								{
									width: pageInner,
									justify: "between",
									align: "start",
									gap: theme.spacing.lg,
								},
								...present([
									vstack(
										{ width: column, gap: theme.spacing.xs },
										text(view.document.title, {
											...theme.type.h1,
											width: column,
											wrap: true,
										}),
										...(number
											? [
													text(number.value, {
														...theme.type.body,
														color: theme.colors.muted,
														width: column,
														wrap: true,
													}),
												]
											: []),
										...documentMeta.map((row) => field(row, column)),
									),
									sellerLetterhead.length > 0
										? vstack(
												{ width: column, gap: 2, align: "end" },
												...sellerLetterhead,
											)
										: undefined,
								]),
							),
							buyerBlock.length > 0
								? vstack({ width: column, gap: 2 }, ...buyerBlock)
								: undefined,
							dates.length > 0
								? hstack(
										{
											width: pageInner,
											gap: theme.spacing.lg,
											align: "start",
										},
										...dates.map((row) =>
											vstack(
												{ width: dateWidth, gap: 2 },
												text(row.label, {
													...theme.type.body,
													font: theme.bold,
													width: dateWidth,
													wrap: true,
												}),
												prose(row.value, dateWidth),
											),
										),
									)
								: undefined,
							view.references
								? sectionBlock(view.references, pageInner)
								: undefined,
							invoicingRest
								? sectionBlock(invoicingRest, pageInner)
								: undefined,
							deliveryRest ? sectionBlock(deliveryRest, pageInner) : undefined,
							view.taxRepresentative
								? sectionBlock(view.taxRepresentative, pageInner)
								: undefined,
							itemRows.length > 0
								? table({
										width: pageInner,
										columns: [
											{ width: "2.4fr" },
											{ width: "0.8fr", align: "right" },
											{ width: "1.1fr", align: "right" },
											{ width: "0.7fr", align: "right" },
											{ width: "1.1fr", align: "right" },
										],
										header: [
											text(view.lineHeaders.description, {
												...theme.type.label,
												font: theme.bold,
											}),
											{
												content: text(view.lineHeaders.quantity, {
													...theme.type.label,
													font: theme.bold,
												}),
												align: "right" as const,
											},
											{
												content: text(view.lineHeaders.unitPrice, {
													...theme.type.label,
													font: theme.bold,
												}),
												align: "right" as const,
											},
											{
												content: text(view.lineHeaders.vat, {
													...theme.type.label,
													font: theme.bold,
												}),
												align: "right" as const,
											},
											{
												content: text(view.lineHeaders.totalNet, {
													...theme.type.label,
													font: theme.bold,
												}),
												align: "right" as const,
											},
										],
										rows: itemRows.map((line) => [
											descriptionCell(line.description, line.articleId),
											rightCell(line.quantity),
											rightCell(line.unitPrice),
											rightCell(line.vat),
											rightCell(line.totalNet),
										]),
										rowDivider: theme.hr,
										headerDivider: {
											color: theme.colors.ink,
											thickness: 0.8,
										},
									})
								: undefined,
							summaryBlock(),
							termsCard(),
							footer(),
							regulatory,
						]),
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
