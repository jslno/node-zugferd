import { validInvoiceTestFactory } from "@node-zugferd-test/profile-base/factory";
import { describe } from "vitest";
import { changeData } from "@node-zugferd-test/test-utils/order-x-basic/valid/change.js";
import { orderBasicData } from "@node-zugferd-test/test-utils/order-x-basic/valid/order-basic-data.js";
import { orderFullData } from "@node-zugferd-test/test-utils/order-x-basic/valid/order-full-data.js";
import { responseData } from "@node-zugferd-test/test-utils/order-x-basic/valid/response.js";
import { responseBasicData } from "@node-zugferd-test/test-utils/order-x-basic/valid/response-basic-data.js";
import { responseOkData } from "@node-zugferd-test/test-utils/order-x-basic/valid/response-ok.js";
import { orderDeliveredData } from "@node-zugferd-test/test-utils/order-x-basic/valid/order-delivered.js";
import { responseAnRNoChangeData } from "@node-zugferd-test/test-utils/order-x-basic/valid/response-a&r-no-change.js";
import { responseMultipleDelData } from "@node-zugferd-test/test-utils/order-x-basic/valid/response-multiple-del.js";
import { responseAddedSubstitutedData } from "@node-zugferd-test/test-utils/order-x-basic/valid/response-added-substituted.js";
import { orderPickUpData } from "@node-zugferd-test/test-utils/order-x-basic/valid/order-pick-up.js";
import { responseNokData } from "@node-zugferd-test/test-utils/order-x-basic/valid/response-nok.js";
import { invoicer } from "./invoicer.js";

describe("order-x basic profile", () => {
	validInvoiceTestFactory(invoicer, "order-x-basic", [
		{ label: "Order basic data", data: orderBasicData },
		{ label: "Order full data", data: orderFullData },
		{ label: "Change", data: changeData, config: { type: "ORDER_CHANGE" } },
		{
			label: "Response",
			data: responseData,
			config: { type: "ORDER_RESPONSE" },
		},
		{
			label: "Response basic data",
			data: responseBasicData,
			config: { type: "ORDER_RESPONSE" },
		},
		{
			label: "Response OK",
			data: responseOkData,
			config: { type: "ORDER_RESPONSE" },
		},
		{
			label: "Order delivered",
			data: orderDeliveredData,
		},
		{
			label: "Response A&R no change",
			data: responseAnRNoChangeData,
			config: { type: "ORDER_RESPONSE" },
		},
		{
			label: "Response multiple DEL",
			data: responseMultipleDelData,
			config: { type: "ORDER_RESPONSE" },
		},
		{
			label: "Response added substituted",
			data: responseAddedSubstitutedData,
			config: { type: "ORDER_RESPONSE" },
		},
		{
			label: "Order pick up",
			data: orderPickUpData,
		},
		{
			label: "Response NOK",
			data: responseNokData,
			config: { type: "ORDER_RESPONSE" },
		},
	]);

	// todo: test rules
});
