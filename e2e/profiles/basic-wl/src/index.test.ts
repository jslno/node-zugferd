import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { describe } from "vitest";
import { bookingGuideData } from "@node-zugferd-test/test-utils/basic-wl/valid/booking-guide.js";
import { simpleData } from "@node-zugferd-test/test-utils/basic-wl/valid/simple.js";
import { invoicer } from "./invoicer.js";

describe("basic-wl profile", () => {
	validInvoiceTestFactory(invoicer, "basic-wl", [
		{ label: "Simple invoice", data: simpleData },
		{ label: "Booking guide", data: bookingGuideData },
	]);

	// todo: test rules
});
