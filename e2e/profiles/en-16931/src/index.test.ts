import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { describe } from "vitest";
import { creditNoteData } from "@node-zugferd-test/test-utils/en-16931/valid/credit-note.js";
import { deviatingPayeeData } from "@node-zugferd-test/test-utils/en-16931/valid/deviating-payee.js";
import { discountsData } from "@node-zugferd-test/test-utils/en-16931/valid/discounts.js";
import { electronData } from "@node-zugferd-test/test-utils/en-16931/valid/electron.js";
import { electronicAddressData } from "@node-zugferd-test/test-utils/en-16931/valid/electronic-address.js";
import { intraCommunitySuppliesData } from "@node-zugferd-test/test-utils/en-16931/valid/intra-community-supplies.js";
import { invoiceCorrectionData } from "@node-zugferd-test/test-utils/en-16931/valid/invoice-correction.js";
import { invoiceTransferData } from "@node-zugferd-test/test-utils/en-16931/valid/invoice-transfer.js";
import { liabilityInsuranceInsuranceTaxData } from "@node-zugferd-test/test-utils/en-16931/valid/liability-insurance-insurance-tax.js";
import { motorInsuranceGrossPricesData } from "@node-zugferd-test/test-utils/en-16931/valid/motor-insurance-gross-prices.js";
import { partialInvoice1Data } from "@node-zugferd-test/test-utils/en-16931/valid/partial-invoice-1.js";
import { partialInvoice2Data } from "@node-zugferd-test/test-utils/en-16931/valid/partial-invoice-2.js";
import { photovoltaicData } from "@node-zugferd-test/test-utils/en-16931/valid/photovoltaic.js";
import { physiotherapistData } from "@node-zugferd-test/test-utils/en-16931/valid/physiotherapist.js";
import { publicTransportData } from "@node-zugferd-test/test-utils/en-16931/valid/public-transport.js";
import { rentData } from "@node-zugferd-test/test-utils/en-16931/valid/rent.js";
import { sepaPrenotificationData } from "@node-zugferd-test/test-utils/en-16931/valid/sepa-prenotification.js";
import { serviceChargeStatementData } from "@node-zugferd-test/test-utils/en-16931/valid/service-charge-statement.js";
import { simpleData } from "@node-zugferd-test/test-utils/en-16931/valid/simple.js";
import { simpleDueDateData } from "@node-zugferd-test/test-utils/en-16931/valid/simple-due-date.js";
import { simpleNegativePaymentData } from "@node-zugferd-test/test-utils/en-16931/valid/simple-negative-payment-due.js";
import { smallBusinessOwnerWithoutVatData } from "@node-zugferd-test/test-utils/en-16931/valid/small-business-owner-without-vat-number.js";
import { taxExemptInternationalSupplyData } from "@node-zugferd-test/test-utils/en-16931/valid/tax-exempt-international-supply.js";
import { taxRateApplicablePropertyInsuranceData } from "@node-zugferd-test/test-utils/en-16931/valid/tax-rate-applicable-property-insurance.js";
import { travelExpenseReportData } from "@node-zugferd-test/test-utils/en-16931/valid/travel-expense-report.js";
import { invoicer } from "./invoicer.js";

describe("en-16931 profile", () => {
	validInvoiceTestFactory(invoicer, "en-16931", [
		{ label: "Invoice transfer", data: invoiceTransferData },
		{ label: "Travel expense report", data: travelExpenseReportData },
		{
			label: "Tax rate applicable property insurance",
			data: taxRateApplicablePropertyInsuranceData,
		},
		{ label: "SEPA prenotification", data: sepaPrenotificationData },
		{
			label: "Tax exempt international supply",
			data: taxExemptInternationalSupplyData,
		},
		{ label: "Partial invoice 1", data: partialInvoice1Data },
		{ label: "Partial invoice 2", data: partialInvoice2Data },
		{ label: "Deviating payee", data: deviatingPayeeData },
		{ label: "Service charge statement", data: serviceChargeStatementData },
		{ label: "Simple invoice", data: simpleData },
		{ label: "Simple due date invoice", data: simpleDueDateData },
		{
			label: "Simple negative payment due invoice",
			data: simpleNegativePaymentData,
		},
		{ label: "Electron", data: electronData },
		{ label: "Electronic address", data: electronicAddressData },
		{ label: "Credit note", data: creditNoteData },
		{
			label: "Liability insurance insurance tax",
			data: liabilityInsuranceInsuranceTaxData,
		},
		{ label: "Intra community supplies", data: intraCommunitySuppliesData },
		{
			label: "Small business owner without VAT number",
			data: smallBusinessOwnerWithoutVatData,
		},
		{
			label: "Motor insurance gross prices",
			data: motorInsuranceGrossPricesData,
		},
		{ label: "Rent", data: rentData },
		{ label: "Public transport", data: publicTransportData },
		{ label: "Photovoltaic", data: photovoltaicData },
		{ label: "Physiotherapist", data: physiotherapistData },
		{ label: "Discounts", data: discountsData },
		{ label: "Invoice correction", data: invoiceCorrectionData },
	]);

	// todo: test rules
});
