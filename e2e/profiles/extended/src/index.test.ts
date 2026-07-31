import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { describe } from "vitest";
import { collectiveInvoice3OrdersData } from "@node-zugferd-test/test-utils/extended/valid/collective-invoice-3-orders.js";
import { costAccountingData } from "@node-zugferd-test/test-utils/extended/valid/cost-accounting.js";
import { finalProjectInvoiceData } from "@node-zugferd-test/test-utils/extended/valid/final-project-invoice.js";
import { foreignCurrencyData } from "@node-zugferd-test/test-utils/extended/valid/foreign-currency.js";
import { goodsInvoiceData } from "@node-zugferd-test/test-utils/extended/valid/goods-invoice.js";
import { intraCommunitySupplyMultipleOrders } from "@node-zugferd-test/test-utils/extended/valid/intra-community-supply-multiple-orders.js";
import { invoiceCorrectionData } from "@node-zugferd-test/test-utils/extended/valid/invoice-correction.js";
import { machineSerialNoData } from "@node-zugferd-test/test-utils/extended/valid/machine-serial-no.js";
import { simpleConstructionProFormaInvoice1Data } from "@node-zugferd-test/test-utils/extended/valid/simple-construction-pro-forma-invoice-1.js";
import { simpleConstructionProFormaInvoice2Data } from "@node-zugferd-test/test-utils/extended/valid/simple-construction-pro-forma-invoice-2.js";
import { simpleFinalConstructionInvoiceData } from "@node-zugferd-test/test-utils/extended/valid/simple-final-construction-invoice.js";
import { smallBusinessOwnerWithoutVATData } from "@node-zugferd-test/test-utils/extended/valid/small-business-owner-without-vat.js";
import { subInvoiceLineCoffeeBundleSetData } from "@node-zugferd-test/test-utils/extended/valid/sub-invoice-line-coffee-bundle-set.js";
import { subInvoiceLineFallProtectionSetData } from "@node-zugferd-test/test-utils/extended/valid/sub-invoice-line-fall-protection-set.js";
import { subInvoiceLineHardwareData } from "@node-zugferd-test/test-utils/extended/valid/sub-invoice-line-hardware.js";
import { subInvoiceLineOfficeSuppliesData } from "@node-zugferd-test/test-utils/extended/valid/sub-invoice-line-office-supplies.js";
import { subInvoiceLineProFormaInvoiceData } from "@node-zugferd-test/test-utils/extended/valid/sub-invoice-line-pro-forma-invoice.js";
import { taxFreeIntraCommunitySupplyData } from "@node-zugferd-test/test-utils/extended/valid/tax-free-intra-community-supply.js";
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
