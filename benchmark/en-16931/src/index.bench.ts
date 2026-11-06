import { en16931 } from "@node-zugferd/en-16931";
import { invoiceTransferData } from "@node-zugferd-test/test-utils/en-16931/valid/invoice-transfer.js";
import { simpleData } from "@node-zugferd-test/test-utils/en-16931/valid/simple.js";
import { travelExpenseReportData } from "@node-zugferd-test/test-utils/en-16931/valid/travel-expense-report.js";
import { benchProfile } from "../../factory";

benchProfile(en16931, {
	small: {
		input: simpleData,
	},
	medium: {
		input: invoiceTransferData,
	},
	large: {
		input: travelExpenseReportData,
	},
});
