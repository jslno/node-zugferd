import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { describe } from "vitest";
import { creditNoteData } from "./data/valid/credit-note.js";
import { deviatingPayeeData } from "./data/valid/deviating-payee.js";
import { discountsData } from "./data/valid/discounts.js";
import { electronData } from "./data/valid/electron.js";
import { electronicAddressData } from "./data/valid/electronic-address.js";
import { intraCommunitySuppliesData } from "./data/valid/intra-community-supplies.js";
import { invoiceCorrectionData } from "./data/valid/invoice-correction.js";
import { invoiceTransferData } from "./data/valid/invoice-transfer.js";
import { liabilityInsuranceInsuranceTaxData } from "./data/valid/liability-insurance-insurance-tax.js";
import { motorInsuranceGrossPricesData } from "./data/valid/motor-insurance-gross-prices.js";
import { partialInvoice1Data } from "./data/valid/partial-invoice-1.js";
import { partialInvoice2Data } from "./data/valid/partial-invoice-2.js";
import { photovoltaicData } from "./data/valid/photovoltaic.js";
import { physiotherapistData } from "./data/valid/physiotherapist.js";
import { publicTransportData } from "./data/valid/public-transport.js";
import { rentData } from "./data/valid/rent.js";
import { sepaPrenotificationData } from "./data/valid/sepa-prenotification.js";
import { serviceChargeStatementData } from "./data/valid/service-charge-statement.js";
import { simpleData } from "./data/valid/simple.js";
import { simpleDueDateData } from "./data/valid/simple-due-date.js";
import { simpleNegativePaymentData } from "./data/valid/simple-negative-payment-due.js";
import { smallBusinessOwnerWithoutVatData } from "./data/valid/small-business-owner-without-vat-number.js";
import { taxExemptInternationalSupplyData } from "./data/valid/tax-exempt-international-supply.js";
import { taxRateApplicablePropertyInsuranceData } from "./data/valid/tax-rate-applicable-property-insurance.js";
import { travelExpenseReportData } from "./data/valid/travel-expense-report.js";
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
