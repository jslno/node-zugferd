import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { describe } from "vitest";
import { bookingGuideData } from "./data/valid/booking-guide.js";
import { invoiceData } from "./data/valid/invoice.js";
import { invoicer } from "./invoicer.js";

describe("minimum profile", () => {
	validInvoiceTestFactory(invoicer, "minimum", [
		{ label: "Invoice", data: invoiceData },
		{ label: "Booking guide", data: bookingGuideData },
	]);

	// todo: test rules
});
