import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { describe } from "vitest";
import { invoiceCorrectionData } from "./data/valid/invoice-correction.js";
import { simpleData } from "./data/valid/simple.js";
import { taxiRideData } from "./data/valid/taxi-ride.js";
import { invoicer } from "./invoicer.js";

describe("basic profile", () => {
	validInvoiceTestFactory(invoicer, "basic", [
		{ label: "Simple invoice", data: simpleData },
		{ label: "Invoice correction", data: invoiceCorrectionData },
		{ label: "Taxi ride invoice", data: taxiRideData },
	]);

	// todo: test rules
});
