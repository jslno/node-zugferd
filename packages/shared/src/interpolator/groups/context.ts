import { ZugferdBuilder } from "../builder";

export const getExchangedDocumentContext = ZugferdBuilder.createGroup(
	(builder, { input }) => {
		builder
			.assign(
				"ram:BusinessProcessSpecifiedDocumentContextParameter/ram:ID",
				input.context?.businessProcessType,
			)
			.assign(
				"ram:GuidelineSpecifiedDocumentContextParameter/ram:ID",
				input.context?.specificationIdentifier,
			);
	},
);
