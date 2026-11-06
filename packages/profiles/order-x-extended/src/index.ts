import { orderX } from "@node-zugferd/order-x";
import { defineProfile } from "@node-zugferd/utils";
import { fragment } from "xmlbuilder2";
import { schema } from "./schema";

export const orderXExtended = defineProfile({
	id: "order-x-extended",
	version: "1.0",
	dataRelationship: ["Data", "Source", "Alternative"],
	extensionSchema: {
		type: ["ORDER", "ORDER_RESPONSE", "ORDER_CHANGE"],
		version: "1.0",
		conformanceLevel: "EXTENDED",
		fileName: "order-x.xml",
	},
	use: [orderX],
	schema,
	build(data, { root, findNode, findAllNodes }) {
		const SCRDMCCBDACIOMessageStructure = root.first();

		const exchangedDocument = findNode(
			"8",
			SCRDMCCBDACIOMessageStructure,
			(node) => node.node.nodeName === "rsm:ExchangedDocument",
			() => SCRDMCCBDACIOMessageStructure.ele("rsm:ExchangedDocument"),
		);

		if (
			data.exchangedDocument.language?.length &&
			data.exchangedDocument.language.length > 0
		) {
			const refNode =
				findNode(
					"19",
					exchangedDocument,
					(node) => node.node.nodeName === "ram:PurposeCode",
				)?.node ??
				findNode(
					"20",
					exchangedDocument,
					(node) => node.node.nodeName === "ram:RequestedResponseTypeCode",
				)?.node ??
				findNode(
					"21[0]",
					exchangedDocument,
					(node) => node.node.nodeName === "ram:IncludedNote",
				)?.node ??
				findNode(
					"25",
					exchangedDocument,
					(node) => node.node.nodeName === "ram:EffectiveSpecifiedPeriod",
				)?.node ??
				null;
			for (const language of data.exchangedDocument.language) {
				const languageId = fragment().ele("ram:LanguageID").txt(language.value);
				exchangedDocument.node.insertBefore(languageId.node, refNode);
			}
		}

		if (
			data.exchangedDocument.documentNotes?.length &&
			data.exchangedDocument.documentNotes.length > 0
		) {
			const includedNotes = findAllNodes(
				exchangedDocument,
				(node) => node.node.nodeName === "ram:IncludedNote",
			);
			for (let i = 0; i < data.exchangedDocument.documentNotes.length; i++) {
				const note = data.exchangedDocument.documentNotes[i];
				const includedNote = includedNotes[i];
				if (!note || !includedNote) continue;

				if (note.contentCode) {
					const refNode =
						findNode(
							`23[${i}][0]`,
							includedNote,
							(node) => node.node.nodeName === "ram:Content",
						)?.node ?? null;
					const contentCode = fragment()
						.ele("ram:ContentCode")
						.txt(note.contentCode.identifier);
					includedNote.node.insertBefore(contentCode.node, refNode);
				}
			}
		}

		const supplyChainTradeTransaction = findNode(
			"32",
			SCRDMCCBDACIOMessageStructure,
			(node) => node.node.nodeName === "rsm:SupplyChainTradeTransaction",
			() =>
				SCRDMCCBDACIOMessageStructure.ele("rsm:SupplyChainTradeTransaction"),
		);

		// line
		(() => {
			if (data.transaction.line?.length && data.transaction.line.length > 0) {
				const lineNodes = findAllNodes(
					supplyChainTradeTransaction,
					(node) =>
						node.node.nodeName === "ram:IncludedSupplyChainTradeLineItem",
				);
				for (let i = 0; i < data.transaction.line.length; i++) {
					const includedSupplyChainTradeLineItem = lineNodes[i];
					const line = data.transaction.line[i];
					if (!includedSupplyChainTradeLineItem || !line) continue;

					if (line.position) {
						const associatedDocumentLineDocument = findNode(
							`34[${i}]`,
							includedSupplyChainTradeLineItem,
							(node) =>
								node.node.nodeName === "ram:AssociatedDocumentLineDocument",
							(fragment) => {
								const associatedDocumentLineDocument = fragment.ele(
									"ram:AssociatedDocumentLineDocument",
								);

								return associatedDocumentLineDocument;
							},
						);
						if (
							line.position.includedNotes?.length &&
							line.position.includedNotes.length > 0
						) {
							const includedNotes = findAllNodes(
								associatedDocumentLineDocument,
								(node) => node.node.nodeName === "ram:IncludedNote",
							);
							for (let j = 0; j < line.position.includedNotes.length; j++) {
								const note = line.position.includedNotes[j];
								const includedNote = includedNotes[j];
								if (!note || !includedNote) continue;

								if (note.contentCode) {
								}
							}
						}
					}
				}
			}
		})();
	},
	rules(data, ctx) {},
});
