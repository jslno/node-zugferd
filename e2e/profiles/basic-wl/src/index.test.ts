import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { describe } from "vitest";
import { bookingGuideData } from "./data/valid/booking-guide.js";
import { simpleData } from "./data/valid/simple.js";
import { invoicer } from "./invoicer.js";

describe("basic-wl profile", () => {
	validInvoiceTestFactory(invoicer, "basic-wl", [
		{ label: "Simple invoice", data: simpleData },
		{ label: "Booking guide", data: bookingGuideData },
	]);

	// todo: test rules
});
