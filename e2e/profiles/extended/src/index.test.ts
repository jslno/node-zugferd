import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { describe } from "vitest";
import { collectiveInvoice3OrdersData } from "./data/valid/collective-invoice-3-orders.js";
import { costAccountingData } from "./data/valid/cost-accounting.js";
import { finalProjectInvoiceData } from "./data/valid/final-project-invoice.js";
import { foreignCurrencyData } from "./data/valid/foreign-currency.js";
import { goodsInvoiceData } from "./data/valid/goods-invoice.js";
import { intraCommunitySupplyMultipleOrders } from "./data/valid/intra-community-supply-multiple-orders.js";
import { invoiceCorrectionData } from "./data/valid/invoice-correction.js";
import { machineSerialNoData } from "./data/valid/machine-serial-no.js";
import { simpleConstructionProFormaInvoice1Data } from "./data/valid/simple-construction-pro-forma-invoice-1.js";
import { simpleConstructionProFormaInvoice2Data } from "./data/valid/simple-construction-pro-forma-invoice-2.js";
import { simpleFinalConstructionInvoiceData } from "./data/valid/simple-final-construction-invoice.js";
import { smallBusinessOwnerWithoutVATData } from "./data/valid/small-business-owner-without-vat.js";
import { subInvoiceLineCoffeeBundleSetData } from "./data/valid/sub-invoice-line-coffee-bundle-set.js";
import { subInvoiceLineFallProtectionSetData } from "./data/valid/sub-invoice-line-fall-protection-set.js";
import { subInvoiceLineHardwareData } from "./data/valid/sub-invoice-line-hardware.js";
import { subInvoiceLineOfficeSuppliesData } from "./data/valid/sub-invoice-line-office-supplies.js";
import { subInvoiceLineProFormaInvoiceData } from "./data/valid/sub-invoice-line-pro-forma-invoice.js";
import { taxFreeIntraCommunitySupplyData } from "./data/valid/tax-free-intra-community-supply.js";
import { invoicer } from "./invoicer.js";

describe("extended profile", () => {
	validInvoiceTestFactory(invoicer, "extended", [
		{
			label: "SubInvoiceLine Coffee bundle set",
			data: subInvoiceLineCoffeeBundleSetData,
		},
		{ label: "SubInvoiceLine Hardware", data: subInvoiceLineHardwareData },
		{
			label: "SubInvoiceLine Fall protection set",
			data: subInvoiceLineFallProtectionSetData,
		},
		{
			label: "SubInvoiceLine Office supplies",
			data: subInvoiceLineOfficeSuppliesData,
		},
		{
			label: "SubInvoiceLine Pro forma invoice",
			data: subInvoiceLineProFormaInvoiceData,
		},
		{
			label: "Tax free intra community supply",
			data: taxFreeIntraCommunitySupplyData,
		},
		{
			label: "Collective invoice 3 orders",
			data: collectiveInvoice3OrdersData,
		},
		{ label: "Machine serial no", data: machineSerialNoData },
		{
			label: "Small business owner without VAT number",
			data: smallBusinessOwnerWithoutVATData,
		},
		{
			label: "Origin country customs tariff no. HS_UNSPSC_TST_eClass_STQ",
			data: foreignCurrencyData,
		},
		{ label: "Goods invoice", data: goodsInvoiceData },
		{ label: "Invoice correction", data: invoiceCorrectionData },
		{ label: "Final project invoice", data: finalProjectInvoiceData },
		{ label: "Cost accounting", data: costAccountingData },
		{
			label: "Intra community supply (multiple orders)",
			data: intraCommunitySupplyMultipleOrders,
		},
		{ label: "Foreign currency", data: foreignCurrencyData },
		{
			label: "Simple construction pro forma invoice 1",
			data: simpleConstructionProFormaInvoice1Data,
		},
		{
			label: "Simple construction pro forma invoice 2",
			data: simpleConstructionProFormaInvoice2Data,
		},
		{
			label: "Simple final construction invoice",
			data: simpleFinalConstructionInvoiceData,
		},
	]);

	// todo: test rules
});
