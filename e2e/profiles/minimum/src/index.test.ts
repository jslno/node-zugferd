import {
	parseValidInvoiceTestFactory,
	validInvoiceTestFactory,
} from "@node-zugferd-test/profile-base/factory";
import { bookingGuideData } from "@node-zugferd-test/test-utils/minimum/valid/booking-guide.js";
import { invoiceData } from "@node-zugferd-test/test-utils/minimum/valid/invoice.js";
import { describe } from "vitest";
import { invoicer } from "./invoicer.js";

const invoices = [
	{ label: "Invoice", data: invoiceData },
	{ label: "Booking guide", data: bookingGuideData },
];

describe("minimum profile", () => {
	validInvoiceTestFactory(invoicer, "minimum", invoices);

	// todo: test rules
});

describe("parse minimum profile", () => {
	parseValidInvoiceTestFactory(invoicer, "minimum", invoices);
});
