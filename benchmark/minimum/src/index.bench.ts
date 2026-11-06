import { minimum } from "@node-zugferd/minimum";
import { invoiceData } from "@node-zugferd-test/test-utils/minimum/valid/invoice.js";
import { benchProfile } from "../../factory";

benchProfile(minimum, {
	small: {
		input: invoiceData,
	},
});
