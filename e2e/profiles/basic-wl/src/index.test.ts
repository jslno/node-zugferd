import {
	parseValidInvoiceTestFactory,
	validInvoiceTestFactory,
} from "@node-zugferd-test/profile-base/factory";
import { bookingGuideData } from "@node-zugferd-test/test-utils/basic-wl/valid/booking-guide.js";
import { simpleData } from "@node-zugferd-test/test-utils/basic-wl/valid/simple.js";
import { describe } from "vitest";
import { invoicer } from "./invoicer.js";

const invoices = [
	{ label: "Simple invoice", data: simpleData },
	{ label: "Booking guide", data: bookingGuideData },
];

describe("basic-wl profile", () => {
	validInvoiceTestFactory(invoicer, "basic-wl", invoices);

	// todo: test rules
});

describe("parse basic-wl profile", () => {
	parseValidInvoiceTestFactory(invoicer, "basic-wl", invoices);
});
