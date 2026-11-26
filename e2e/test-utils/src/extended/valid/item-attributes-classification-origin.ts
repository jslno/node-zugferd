/* cSpell:disable */

import type { extended } from "@node-zugferd/extended";
import { goodsInvoiceData } from "./goods-invoice.js";

export const itemAttributesClassificationOriginData: typeof extended.$Infer.Input =
	{
		...goodsInvoiceData,
		transaction: {
			...goodsInvoiceData.transaction,
			line: (goodsInvoiceData.transaction?.line ?? []).map((line, index) =>
				index === 0
					? {
							...line,
							item: {
								...line.item,
								batchId: ["BATCH-1"],
								brandName: "Brand",
								modelName: "Model",
								classification: {
									classCode: [
										{
											value: "23456789123",
											schemeId: "HS",
											schemeVersion: "2022",
										},
									],
									className: "Customs tariff",
								},
								originTradeCountry: "DE",
							},
						}
					: line,
			),
		},
	};
