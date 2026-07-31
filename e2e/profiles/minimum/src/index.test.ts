import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { describe } from "vitest";
import { bookingGuideData } from "@node-zugferd-test/test-utils/minimum/valid/booking-guide.js";
import { invoiceData } from "@node-zugferd-test/test-utils/minimum/valid/invoice.js";
import { invoicer } from "./invoicer.js";

describe("minimum profile", () => {
	validInvoiceTestFactory(invoicer, "minimum", [
		{ label: "Invoice", data: invoiceData },
		{ label: "Booking guide", data: bookingGuideData },
	]);

	// todo: test rules
});
