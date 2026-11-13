import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { electronData } from "@node-zugferd-test/test-utils/xrechnung/valid/electron.js";
import { operatingCostStatementData } from "@node-zugferd-test/test-utils/xrechnung/valid/operating-cost-statement.js";
import { simpleData } from "@node-zugferd-test/test-utils/xrechnung/valid/simple.js";
import { travelExpenseReportingData } from "@node-zugferd-test/test-utils/xrechnung/valid/travel-expense-reporting.js";
import { describe } from "vitest";
import { invoicer } from "./invoicer.js";

describe("xrechnung profile", () => {
	validInvoiceTestFactory(invoicer, "xrechnung", [
		{ label: "Electron", data: electronData },
		{ label: "Travel expense reporting", data: travelExpenseReportingData },
		{ label: "Operating cost statement", data: operatingCostStatementData },
		{ label: "Simple", data: simpleData },
	]);
});
