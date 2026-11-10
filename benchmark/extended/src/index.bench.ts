import { extended } from "@node-zugferd/extended";
import { collectiveInvoice3OrdersData } from "@node-zugferd-test/test-utils/extended/valid/collective-invoice-3-orders.js";
import { costAccountingData } from "@node-zugferd-test/test-utils/extended/valid/cost-accounting.js";
import { finalProjectInvoiceData } from "@node-zugferd-test/test-utils/extended/valid/final-project-invoice.js";
import { benchProfile } from "../../factory";

benchProfile(extended, {
	small: {
		input: finalProjectInvoiceData,
	},
	medium: {
		input: costAccountingData,
	},
	large: {
		input: collectiveInvoice3OrdersData,
	},
});
