import z from "zod";
import { type Schema } from "../../types/schema";
import { dateTimeStringFormatter } from "../../utils/helper";
import { UNTDID_5189 } from "../../codelists/untdid/5189.gen";
import { UNTDID_7161 } from "../../codelists/untdid/7161.gen";
import { REC20 } from "../../codelists/rec20.gen";
import { REC21 } from "../../codelists/rec21.gen";
import { ISO_6523 } from "../../codelists/iso/6523.gen";
import { UNTDID_5305 } from "../../codelists/untdid/5305.gen";

export const basicSchema = {
	specificationIdentifier: {
		type: "string",
		required: false,
		defaultValue: "urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic",
	},
	transaction: {
		type: "object",
		required: false,
		shape: {
			/**
			 * Invoice Line
			 *
			 * A group of business terms providing information on individual Invoice lines.
			 */
			line: {
				key: "BG-25",
				type: "object[]",
				description: `**Invoice Line**

A group of business terms providing information on individual Invoice lines.`,
				validator: z.array(z.any()).min(1),
				group: "line",
				shape: {
					/**
					 * Grouping of general position information
					 */
					identifier: {
						key: "BT-126",
						type: "string",
						description: "Grouping of general position information",
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:LineID",
					},
					/**
					 * Invoice line note
					 *
					 * A textual note that gives unstructured information that is relevant to the Invoice line.
					 */
					note: {
						key: "BT-127",
						type: "string",
						description: `**Invoice line note**

A textual note that gives unstructured information that is relevant to the Invoice line.`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:Content",
					},
					/**
					 * Item information
					 *
					 * A group of business terms providing information about the goods and services invoiced.
					 */
					tradeProduct: {
						key: "BG-31",
						type: "object",
						description: `**Item information**

A group of business terms providing information about the goods and services invoiced.`,
						shape: {
							/**
							 * Item standard identifier
							 *
							 * An item identifier based on a registered scheme.
							 *
							 * CHORUSPRO: this field is limited to 40 characters
							 *
							 * BR-64: The Item standard identifier (BT-157) shall have a Scheme identifier
							 */
							globalIdentifier: {
								key: "BT-157",
								type: "object",
								required: false,
								description: `**Item standard identifier**

An item identifier based on a registered scheme.

CHORUSPRO: this field is limited to 40 characters

BR-64: The Item standard identifier (BT-157) shall have a Scheme identifier`,
								shape: {
									/**
									 * Item standard identifier
									 *
									 * An item identifier based on a registered scheme.
									 *
									 * CHORUSPRO: this field is limited to 40 characters
									 *
									 * BR-64: The Item standard identifier (BT-157) shall have a Scheme identifier
									 */
									value: {
										type: "string",
										description: `**Item standard identifier**

An item identifier based on a registered scheme.

CHORUSPRO: this field is limited to 40 characters

BR-64: The Item standard identifier (BT-157) shall have a Scheme identifier`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * The identification scheme identifier of the Item standard identifier
									 *
									 * The identification scheme shall be identified from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: ISO_6523.map(({ code }) => code),
										description: `**Scheme identifier**

The identification scheme identifier of the Item standard identifier

The identification scheme shall be identified from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Item name
							 *
							 * A name for an item.
							 */
							name: {
								key: "BT-153",
								type: "string",
								description: `**Item name**

A name for an item.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:Name",
							},
						},
					},
					/**
					 * Price details
					 *
					 * A group of business terms providing information about the price applied for the goods and services invoiced on the Invoice line.
					 */
					tradeAgreement: {
						key: "BG-29",
						type: "object",
						description: `**Price details**

A group of business terms providing information about the price applied for the goods and services invoiced on the Invoice line.`,
						shape: {
							/**
							 * Detailed information on the gross price of the item
							 */
							grossTradePrice: {
								key: "BT-148-00",
								type: "object",
								description:
									"Detailed information on the gross price of the item",
								required: false,
								shape: {
									/**
									 * Item gross price
									 *
									 * The unit price, exclusive of VAT, before subtracting Item price discount.
									 *
									 * The Item gross price MUST NOT be negative
									 *
									 * BR-28: The Item gross price (BT-148) shall NOT be negative.
									 */
									chargeAmount: {
										key: "BT-148",
										type: "string | number",
										description: `**Item gross price**

The unit price, exclusive of VAT, before subtracting Item price discount.

The Item gross price MUST NOT be negative

BR-28: The Item gross price (BT-148) shall NOT be negative.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:ChargeAmount",
									},
									/**
									 * Item price base quantity
									 *
									 * The number of item units to which the price applies.
									 *
									 * Optional, if filled and if BT-148 is present (EN16931 and EXTENDED profiles), then it should be the same value than BT-149-1
									 */
									basisQuantity: {
										key: "BT-149-1",
										type: "object",
										description: `**Item price base quantity**

The number of item units to which the price applies.

Optional, if filled and if BT-148 is present (EN16931 and EXTENDED profiles), then it should be the same value than BT-149-1`,
										required: false,
										shape: {
											/**
											 * Item price base quantity
											 *
											 * The number of item units to which the price applies.
											 *
											 * Optional, if filled and if BT-148 is present (EN16931 and EXTENDED profiles), then it should be the same value than BT-149-1
											 */
											amount: {
												type: "string | number",
												description: `**Item price base quantity**

The number of item units to which the price applies.

Optional, if filled and if BT-148 is present (EN16931 and EXTENDED profiles), then it should be the same value than BT-149-1`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:BasisQuantity",
											},
											/**
											 * Item price base quantity unit of measure code
											 *
											 * The unit of measure that applies to the Item price base quantity.
											 *
											 * The Item price base quantity unit of measure shall be the same as the Invoiced quantity unit of measure (BT-130).
											 *
											 * In particular, the most common units of measurement are:
											 * - LTR = litre (1 dm3)
											 * - MTQ = cubic meter
											 * - KGM = kilogram
											 * - MTR = meter
											 * - C62 = unit
											 * - TNE = ton
											 *
											 * BT-130, BT-150 and BT-150-1 must be equal if stated.
											 */
											unitMeasureCode: {
												type: [
													...REC20.map(({ code }) => code),
													...REC21.map(({ code }) => code),
												],
												description: `**Item price base quantity unit of measure code**

The unit of measure that applies to the Item price base quantity.

The Item price base quantity unit of measure shall be the same as the Invoiced quantity unit of measure (BT-130).

In particular, the most common units of measurement are:
- LTR = litre (1 dm3)
- MTQ = cubic meter
- KGM = kilogram
- MTR = meter
- C62 = unit
- TNE = ton

BT-130, BT-150 and BT-150-1 must be equal if stated.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:BasisQuantity/@unitCode",
											},
										},
									},
									/**
									 * Price-related discounts
									 *
									 * Detailed information on discounts and charges
									 */
									discounts: {
										key: "BT-147-00",
										type: "object",
										description: `**Price-related discounts**

Detailed information on discounts and charges`,
										required: false,
										shape: {
											/**
											 * Item price discount
											 *
											 * The total discount subtracted from the Item gross price to calculate the Item net price.
											 *
											 * Only applies if the discount is provided per unit and if it is not included in the Item gross price.
											 */
											actualAmount: {
												key: "BT-147",
												type: "string | number",
												description: `**Item price discount**

The total discount subtracted from the Item gross price to calculate the Item net price.

Only applies if the discount is provided per unit and if it is not included in the Item gross price.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:ActualAmount",
												additionalXml: {
													chargeIndicator: {
														key: "BT-147-01",
														type: "boolean",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:ChargeIndicator/udt:Indicator",
														defaultValue: false,
													},
												},
											},
										},
									},
								},
							},
							/**
							 * Detailed information on the net price of the item
							 *
							 * The net price includes all surchages and discounts, except for VAT.
							 */
							netTradePrice: {
								key: "BT-146-00",
								type: "object",
								description: `**Detailed information on the net price of the item**

The net price includes all surchages and discounts, except for VAT.`,
								required: false,
								shape: {
									/**
									 * Item net price
									 *
									 * The price of an item, exclusive of VAT, after subtracting item price discount.
									 *
									 * The Item net price has to be equal with the Item gross price less the Item price discount.
									 *
									 * The Item net price MUST NOT be negative
									 *
									 * BR-26: Each  Invoice  line  (BG-25)  shall  contain  the  Item  net  price (BT-146).
									 *
									 * BR-27: The Item net price (BT-146) shall NOT be negative.
									 */
									chargeAmount: {
										key: "BT-146",
										type: "string | number",
										description: `**Item net price**

The price of an item, exclusive of VAT, after subtracting item price discount.

The Item net price has to be equal with the Item gross price less the Item price discount.

The Item net price MUST NOT be negative

BR-26: Each  Invoice  line  (BG-25)  shall  contain  the  Item  net  price (BT-146).

BR-27: The Item net price (BT-146) shall NOT be negative.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:ChargeAmount",
									},
									/**
									 * Item price base quantity
									 *
									 * The number of item units to which the price applies.
									 *
									 * Optional, if filled and if BT-148 is present (EN16931 and EXTENDED profiles), then it should be the same value than BT-149-1
									 */
									basisQuantity: {
										key: "BT-149",
										type: "object",
										description: `**Item price base quantity**

The number of item units to which the price applies.

Optional, if filled and if BT-148 is present (EN16931 and EXTENDED profiles), then it should be the same value than BT-149-1`,
										required: false,
										shape: {
											/**
											 * Item price base quantity
											 *
											 * The number of item units to which the price applies.
											 *
											 * Optional, if filled and if BT-148 is present (EN16931 and EXTENDED profiles), then it should be the same value than BT-149-1
											 */
											amount: {
												type: "string | number",
												description: `**Item price base quantity**

The number of item units to which the price applies.

Optional, if filled and if BT-148 is present (EN16931 and EXTENDED profiles), then it should be the same value than BT-149-1`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:BasisQuantity",
											},
											/**
											 * Item price base quantity unit of measure code
											 *
											 * The unit of measure that applies to the Item price base quantity.
											 *
											 * The Item price base quantity unit of measure shall be the same as the Invoiced quantity unit of measure (BT-130).
											 *
											 * In particular, the most common units of measurement are:
											 * - LTR = litre (1 dm3)
											 * - MTQ = cubic meter
											 * - KGM = kilogram
											 * - MTR = meter
											 * - C62 = unit
											 * - TNE = ton
											 *
											 * BT-130, BT-150 and BT-150-1 must be equal if stated.
											 */
											unitMeasureCode: {
												type: [
													...REC20.map(({ code }) => code),
													...REC21.map(({ code }) => code),
												],
												description: `**Item price base quantity unit of measure code**

The unit of measure that applies to the Item price base quantity.

The Item price base quantity unit of measure shall be the same as the Invoiced quantity unit of measure (BT-130).

In particular, the most common units of measurement are:
- LTR = litre (1 dm3)
- MTQ = cubic meter
- KGM = kilogram
- MTR = meter
- C62 = unit
- TNE = ton

BT-130, BT-150 and BT-150-1 must be equal if stated.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:BasisQuantity/@unitCode",
											},
										},
									},
								},
							},
						},
					},
					/**
					 * Grouping of delivery details on line level
					 */
					tradeDelivery: {
						key: "BT-129-00",
						type: "object",
						description: "Grouping of delivery details on line level",
						required: false,
						shape: {
							/**
							 * Invoiced quantity
							 *
							 * The quantity of items (goods or services) that is charged in the Invoice line.
							 *
							 * CHORUS PRO: Invoiced quantity is supported on 10 digits maximum.
							 *
							 * BR-22: Each  Invoice  line  (BG-25)  shall  have  an  Invoiced  quantity (BT-129).
							 */
							billedQuantity: {
								key: "BT-129",
								type: "object",
								description: `**Invoiced quantity**

The quantity of items (goods or services) that is charged in the Invoice line.

CHORUS PRO: Invoiced quantity is supported on 10 digits maximum.

BR-22: Each  Invoice  line  (BG-25)  shall  have  an  Invoiced  quantity (BT-129).`,
								shape: {
									/**
									 * Invoiced quantity
									 *
									 * The quantity of items (goods or services) that is charged in the Invoice line.
									 *
									 * CHORUS PRO: Invoiced quantity is supported on 10 digits maximum.
									 *
									 * BR-22: Each  Invoice  line  (BG-25)  shall  have  an  Invoiced  quantity (BT-129).
									 */
									amount: {
										type: "string | number",
										description: `**Invoiced quantity**

The quantity of items (goods or services) that is charged in the Invoice line.

CHORUS PRO: Invoiced quantity is supported on 10 digits maximum.

BR-22: Each  Invoice  line  (BG-25)  shall  have  an  Invoiced  quantity (BT-129).`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:BilledQuantity",
									},
									/**
									 * Invoiced quantity unit of measure
									 *
									 * The unit of measure that applies to the invoiced quantity.
									 *
									 * The unit of measure shall be chosen from the lists in UN/ECE Recommendation N°. 20 “Codes for Units of Measure Used in International Trade” [7] and UN/ECE Recommendation N° 21 “Codes for Passengers, Types of Cargo, Packages and Packaging Materials (with Complementary Codes for Package Names)” [19] applying the method described in UN/ECE Rec N° 20 Intro 2.a). Note that in most cases it is not needed for Buyers and Sellers to implement these lists fully in their software. Sellers need only to support the units needed for their goods and services; Buyers only need to verify that the units used in the Invoice are equal to the units used in other documents (such as Contract, Catalogue, Order and Despatch advice).
									 *
									 * In particular, the most common units of measurement are:
									 * - LTR = litre (1 dm3)
									 * - MTQ = cubic meter
									 * - KGM = kilogram
									 * - MTR = meter
									 * - C62 = unit
									 * - TNE = ton
									 *
									 * BR-23: An Invoice line (BG-25) shall have an Invoiced quantity unit of measure code (BT-130).
									 */
									unitMeasureCode: {
										key: "BT-130",
										type: [
											...REC20.map(({ code }) => code),
											...REC21.map(({ code }) => code),
										],
										description: `**Invoiced quantity unit of measure**

The unit of measure that applies to the invoiced quantity.

The unit of measure shall be chosen from the lists in UN/ECE Recommendation N°. 20 “Codes for Units of Measure Used in International Trade” [7] and UN/ECE Recommendation N° 21 “Codes for Passengers, Types of Cargo, Packages and Packaging Materials (with Complementary Codes for Package Names)” [19] applying the method described in UN/ECE Rec N° 20 Intro 2.a). Note that in most cases it is not needed for Buyers and Sellers to implement these lists fully in their software. Sellers need only to support the units needed for their goods and services; Buyers only need to verify that the units used in the Invoice are equal to the units used in other documents (such as Contract, Catalogue, Order and Despatch advice).

In particular, the most common units of measurement are:
- LTR = litre (1 dm3)
- MTQ = cubic meter
- KGM = kilogram
- MTR = meter
- C62 = unit
- TNE = ton

BR-23: An Invoice line (BG-25) shall have an Invoiced quantity unit of measure code (BT-130).`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:BilledQuantity/@unitCode",
									},
								},
							},
						},
					},

					/**
					 * Grouping of billing information at line level
					 */
					tradeSettlement: {
						key: "BG-30-00",
						type: "object",
						description: "Grouping of billing information at line level",
						required: false,
						shape: {
							/**
							 * Line VAT Information
							 *
							 * A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.
							 */
							tradeTax: {
								key: "BG-30",
								type: "object",
								description: `**Line VAT Information**

A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.`,
								shape: {
									/**
									 * Invoiced item VAT category code, Content
									 *
									 * The VAT category code for the invoiced item.
									 *
									 * For more information on the recommended codes, please refer to subclause 6.3.3.2 - Specification of VAT category codes.
									 */
									typeCode: {
										key: "BT-151-0",
										type: "string",
										description: `**Invoiced item VAT category code, Content**

The VAT category code for the invoiced item.

For more information on the recommended codes, please refer to subclause 6.3.3.2 - Specification of VAT category codes.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:TypeCode",
									},
									/**
									 * Invoiced item VAT category code
									 *
									 * The VAT category code for the invoiced item.
									 *
									 * The following entries of UNTDID 5305 [6] are used (further clarification between brackets):
									 * - Standard rate (Liable for VAT in a standard way)
									 * - Zero rated goods (Liable for VAT with a percentage rate of zero)
									 * - Exempt from tax (VAT/IGIC/IPSI)
									 * - VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)
									 * - VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)
									 * - Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)
									 * - Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)
									 * - Canary Islands General Indirect Tax (Liable for IGIC tax)
									 * - Liable for IPSI (Ceuta/Melilla tax)
									 *
									 * The VAT category codes are as follows:
									 * - S = Standard VAT rate
									 * - Z = Zero rated goods
									 * - E = VAT exempt
									 * - AE = Reverse charge
									 * - K = Intra-Community supply (specific reverse charge)
									 * - G = Exempt VAT for Export outside EU
									 * - O = Outside VAT scope
									 * - L = Canary Islands
									 * - M = Ceuta and Mellila
									 *
									 * BR-CO-4: Each Invoice line  (BG-25) shall be categorized with an Invoiced item VAT category code (BT-151).
									 */
									categoryCode: {
										key: "BT-151",
										type: UNTDID_5305.map(({ code }) => code),
										description: `**Invoiced item VAT category code**

The VAT category code for the invoiced item.

The following entries of UNTDID 5305 [6] are used (further clarification between brackets):
- Standard rate (Liable for VAT in a standard way)
- Zero rated goods (Liable for VAT with a percentage rate of zero)
- Exempt from tax (VAT/IGIC/IPSI)
- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)
- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)
- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)
- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)
- Canary Islands General Indirect Tax (Liable for IGIC tax)
- Liable for IPSI (Ceuta/Melilla tax)

The VAT category codes are as follows:
- S = Standard VAT rate
- Z = Zero rated goods
- E = VAT exempt
- AE = Reverse charge
- K = Intra-Community supply (specific reverse charge)
- G = Exempt VAT for Export outside EU
- O = Outside VAT scope
- L = Canary Islands
- M = Ceuta and Mellila

BR-CO-4: Each Invoice line  (BG-25) shall be categorized with an Invoiced item VAT category code (BT-151).`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:CategoryCode",
									},
									/**
									 * Invoiced item VAT rate
									 *
									 * The VAT rate, represented as percentage that applies to the invoiced item.
									 *
									 * The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)
									 */
									rateApplicablePercent: {
										key: "BT-152",
										type: "string | number",
										description: `**Invoiced item VAT rate**

The VAT rate, represented as percentage that applies to the invoiced item.

The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:RateApplicablePercent",
									},
								},
							},
							/**
							 * Invoice Line Period
							 *
							 * A group of business terms providing information about the Invoice period relevant for the Invoice line.
							 *
							 * Is also called Invoice line delivery period.
							 */
							linePeriod: {
								key: "BG-26",
								type: "object",
								description: `**Invoice Line Period**

A group of business terms providing information about the Invoice period relevant for the Invoice line.

Is also called Invoice line delivery period.`,
								required: false,
								shape: {
									/**
									 * Start of the invoice line billing period
									 *
									 * Invoice line period start date
									 *
									 * The date when the Invoice period for this Invoice line starts.
									 *
									 * This date must be less than or equal to the end date of the period (BT-135), if it exists
									 *
									 * BR-CO-20: If  Invoice  line  period  (BG-26)  is  used,  the  Invoice  line period start date (BT-134) or the Invoice line period end date (BT-135) shall be filled, or both.
									 */
									startDate: {
										key: "BT-134",
										type: "date",
										description: `**Start of the invoice line billing period**

Invoice line period start date

The date when the Invoice period for this Invoice line starts.

This date must be less than or equal to the end date of the period (BT-135), if it exists

BR-CO-20: If  Invoice  line  period  (BG-26)  is  used,  the  Invoice  line period start date (BT-134) or the Invoice line period end date (BT-135) shall be filled, or both.`,
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
										additionalXml: {
											format: {
												key: "BT-134-0",
												type: "string",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString/@format",
												defaultValue: "102",
											},
										},
									},
									/**
									 * End of the invoice line billing period
									 *
									 * Invoice line period end date
									 *
									 * The date when the Invoice period for this Invoice line ends.
									 *
									 * The date is the last day of the period.
									 *
									 * This date must be greater than or equal to the period start date (BT-134), if it exists
									 *
									 * BR-30: If both Invoice line period start date (BT-134) and Invoice line  period  end  date  (BT-135)  are  given  then  the  Invoice line period end date (BT-135) shall be later or equal to the Invoice line period start date (BT-134).
									 *
									 * BR-CO-20: If  Invoice  line  period  (BG-26)  is  used,  the  Invoice  line period start date (BT-134) or the Invoice line period end date (BT-135) shall be filled, or both.
									 */
									endDate: {
										key: "BT-135",
										type: "date",
										description: `**End of the invoice line billing period**

Invoice line period end date

The date when the Invoice period for this Invoice line ends.

The date is the last day of the period.

This date must be greater than or equal to the period start date (BT-134), if it exists

BR-30: If both Invoice line period start date (BT-134) and Invoice line  period  end  date  (BT-135)  are  given  then  the  Invoice line period end date (BT-135) shall be later or equal to the Invoice line period start date (BT-134).

BR-CO-20: If  Invoice  line  period  (BG-26)  is  used,  the  Invoice  line period start date (BT-134) or the Invoice line period end date (BT-135) shall be filled, or both.`,
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
										additionalXml: {
											format: {
												key: "BT-135-0",
												type: "string",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString/@format",
												defaultValue: "102",
											},
										},
									},
								},
							},
							/**
							 * Invoice Line Allowances
							 *
							 * A group of business terms providing information about allowances applicable to the individual Invoice line.
							 *
							 * Invoice line allowancess are subject to the same VAT rate as the line they relate to. If invoice line allowances are subject to a different VAT rate, they must be treated as standalone (negative) invoice lines
							 */
							allowances: {
								key: "BG-27",
								type: "object[]",
								required: false,
								description: `**Invoice Line Allowances**

A group of business terms providing information about allowances applicable to the individual Invoice line.

Invoice line allowancess are subject to the same VAT rate as the line they relate to. If invoice line allowances are subject to a different VAT rate, they must be treated as standalone (negative) invoice lines`,
								group: "line-allowances",
								shape: {
									/**
									 * Invoice line allowance amount
									 *
									 * The amount of an allowance, without VAT.
									 */
									actualAmount: {
										key: "BT-136",
										type: "string | number",
										description: `**Invoice line allowance amount**

The amount of an allowance, without VAT.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[line-allowances]/ram:ActualAmount",
										additionalXml: {
											chargeIndicator: {
												key: "BG-27-0",
												type: "boolean",
												defaultValue: false,
											},
										},
									},
									/**
									 * Invoice line allowance reason code
									 *
									 * The reason for the Invoice line allowance, expressed as a code.
									 *
									 * Use entries of the UNTDID 5189 code list [6]. The Invoice line level allowance reason code and the Invoice line level allowance reason shall indicate the same allowance reason.
									 *
									 * In particular, the following codes and reasons can be used:
									 * - AA = Advertising discount
									 * - ABL = Packing supplement
									 * - ADR = Other services
									 * - ADT = Removal
									 * - FC = transportation costs
									 * - FI = Financial expenses
									 * - LA = Labeling
									 */
									reasonCode: {
										key: "BT-140",
										type: UNTDID_5189.map(({ code }) => code),
										description: `**Invoice line allowance reason code**

The reason for the Invoice line allowance, expressed as a code.

Use entries of the UNTDID 5189 code list [6]. The Invoice line level allowance reason code and the Invoice line level allowance reason shall indicate the same allowance reason.

In particular, the following codes and reasons can be used:
- AA = Advertising discount
- ABL = Packing supplement
- ADR = Other services
- ADT = Removal
- FC = transportation costs
- FI = Financial expenses
- LA = Labeling`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[line-allowances]/ram:ReasonCode",
									},
									/**
									 * Invoice line allowance reason
									 *
									 * The reason for the Invoice line allowance, expressed as text.
									 */
									reason: {
										key: "BT-139",
										type: "string",
										description: `**Invoice line allowance reason**

The reason for the Invoice line allowance, expressed as text.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[line-allowances]/ram:Reason",
									},
								},
							},
							/**
							 * Invoice Line Charges
							 *
							 * A group of business terms providing information about charges and taxes other than VAT applicable to the individual Invoice line.
							 *
							 * All charges and taxes are assumed to be liable to the same VAT rate as the Invoice line.
							 *
							 * Invoice line charges are subject to the same VAT rate as that of the line to which they relate. If invoice line charges are subject to a different VAT rate, they must be treated as stand-alone invoice lines.
							 */
							charges: {
								key: "BG-28",
								type: "object[]",
								required: false,
								description: `**Invoice Line Charges**

A group of business terms providing information about charges and taxes other than VAT applicable to the individual Invoice line.

All charges and taxes are assumed to be liable to the same VAT rate as the Invoice line.

Invoice line charges are subject to the same VAT rate as that of the line to which they relate. If invoice line charges are subject to a different VAT rate, they must be treated as stand-alone invoice lines.`,
								group: "line-charges",
								sibling: (data, { line }) =>
									data.transaction.line[line]?.tradeSettlement?.allowances,
								shape: {
									/**
									 * Invoice line charge amount
									 *
									 * The amount of a charge, without VAT.
									 */
									actualAmount: {
										key: "BT-141",
										type: "string | number",
										description: `**Invoice line charge amount**

The amount of a charge, without VAT.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[line-charges]/ram:ActualAmount",
										additionalXml: {
											chargeIndicator: {
												key: "BG-28-0",
												type: "boolean",
												defaultValue: true,
											},
										},
									},
									/**
									 * Invoice line charge reason code
									 *
									 * The reason for the Invoice line charge, expressed as a code.
									 *
									 * Use entries of the UNTDID 7161 code list [6]. The Invoice line charge reason code and the Invoice line charge reason shall indicate the same charge reason.
									 *
									 * In particular, the following codes and reasons can be used:
									 * - AA = Advertising discount
									 * - ABL = Packing supplement
									 * - ADR = Other services
									 * - ADT = Removal
									 * - FC = transportation costs
									 * - FI = Financial expenses
									 * - LA = Labeling
									 *
									 * BR-44: Each Invoice line charge (BG-28) shall have an Invoice line charge  reason  (BT-144)  or  an  Invoice  line  charge  reason code (BT-145).
									 *
									 * BR-CO-8: Invoice  line  charge  reason  code  (BT-145)  and  Invoice line charge reason (BT144) shall indicate the same type of charge reason.
									 *
									 * BR-CO-24: Each Invoice line charge (BG-28) shall contain an Invoice line  charge  reason  (BT-144)  or  an  Invoice  line  charge reason code (BT-145), or both.
									 */
									reasonCode: {
										key: "BT-145",
										type: UNTDID_7161.map(({ code }) => code),
										description: `**Invoice line charge reason code**

The reason for the Invoice line charge, expressed as a code.

Use entries of the UNTDID 7161 code list [6]. The Invoice line charge reason code and the Invoice line charge reason shall indicate the same charge reason.

In particular, the following codes and reasons can be used:
- AA = Advertising discount
- ABL = Packing supplement
- ADR = Other services
- ADT = Removal
- FC = transportation costs
- FI = Financial expenses
- LA = Labeling

BR-44: Each Invoice line charge (BG-28) shall have an Invoice line charge  reason  (BT-144)  or  an  Invoice  line  charge  reason code (BT-145).

BR-CO-8: Invoice  line  charge  reason  code  (BT-145)  and  Invoice line charge reason (BT144) shall indicate the same type of charge reason.

BR-CO-24: Each Invoice line charge (BG-28) shall contain an Invoice line  charge  reason  (BT-144)  or  an  Invoice  line  charge reason code (BT-145), or both.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[line-charges]/ram:ReasonCode",
									},
									/**
									 * Invoice line charge reason
									 *
									 * The reason for the Invoice line charge, expressed as text.
									 */
									reason: {
										key: "BT-144",
										type: "string",
										description: `**Invoice line charge reason**

The reason for the Invoice line charge, expressed as text.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[line-charges]/ram:Reason",
									},
								},
							},
							/**
							 * Detailed information about item totals
							 */
							monetarySummation: {
								key: "BT-131-00",
								type: "object",
								description: "Detailed information about item totals",
								required: false,
								shape: {
									/**
									 * Invoice line net amount
									 *
									 * The total amount of the Invoice line.
									 *
									 * The amount is “net” without VAT, i.e. inclusive of line level allowances and charges as well as other relevant taxes.
									 */
									lineTotalAmount: {
										key: "BT-131",
										type: "string | number",
										description: `**Invoice line net amount**

The total amount of the Invoice line.

The amount is “net” without VAT, i.e. inclusive of line level allowances and charges as well as other relevant taxes.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:LineTotalAmount",
									},
								},
							},
						},
					},
				},
			},
		},
	},
} satisfies Schema;
