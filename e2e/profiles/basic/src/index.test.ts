import {
	parseValidInvoiceTestFactory,
	validInvoiceTestFactory,
} from "@node-zugferd-test/profile-base/factory";
import { invoiceCorrectionData } from "@node-zugferd-test/test-utils/basic/valid/invoice-correction.js";
import { simpleData } from "@node-zugferd-test/test-utils/basic/valid/simple.js";
import { taxiRideData } from "@node-zugferd-test/test-utils/basic/valid/taxi-ride.js";
import { describe } from "vitest";
import { invoicer } from "./invoicer.js";

const invoices = [
	{ label: "Simple invoice", data: simpleData },
	{ label: "Invoice correction", data: invoiceCorrectionData },
	{ label: "Taxi ride invoice", data: taxiRideData },
];

describe("basic profile", () => {
	validInvoiceTestFactory(invoicer, "basic", invoices);

	// todo: test rules
});

describe("parse basic profile", () => {
	parseValidInvoiceTestFactory(invoicer, "basic", invoices);
});
