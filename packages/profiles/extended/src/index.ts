import { en16931 } from "@node-zugferd/en-16931";
import { base64, defineProfile } from "@node-zugferd/utils";
import { fragment } from "xmlbuilder2";
import { schema } from "./schema";

export const extended = defineProfile({
	id: "extended",
	dataRelationship: ["Alternative", "Source", "Data"],
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "EXTENDED",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	use: [en16931],
	schema,
	build(data, { root, findNode, findAllNodes, getCachedNode, setCachedNode }) {
		const crossIndustryInvoice = root.first();

		if (data.processControl) {
			const exchangedDocumentContext = findNode(
				"BG-2",
				crossIndustryInvoice,
				(node) => node.node.nodeName === "rsm:ExchangedDocumentContext",
				(fragment) => {
					const exchangedDocumentContext = fragment.ele(
						"rsm:ExchangedDocumentContext",
					);
					const refNode =
						(
							getCachedNode("BT-1-00") ||
							getCachedNode("BG-25-00") ||
							setCachedNode(
								(node) =>
									node.node.nodeName === "rsm:ExchangedDocument"
										? "BT-1-00"
										: "BG-25-00",
								crossIndustryInvoice.find((node) =>
									[
										"rsm:ExchangedDocument",
										"rsm:SupplyChainTradeTransaction",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					crossIndustryInvoice.node.insertBefore(
						exchangedDocumentContext.node,
						refNode,
					);
					return exchangedDocumentContext;
				},
			);
			if (typeof data.processControl.testIndicator === "boolean") {
				const testIndicator = fragment().ele("ram:TestIndicator");
				testIndicator
					.ele("udt:Indicator")
					.txt(data.processControl.testIndicator.toString());
				const refNode =
					(
						getCachedNode("BT-23-00") ||
						getCachedNode("BT-24-00") ||
						setCachedNode(
							(node) =>
								node.node.nodeName ===
								"ram:BusinessProcessSpecifiedDocumentContextParameter"
									? "BT-23-00"
									: "BT-24-00",
							exchangedDocumentContext.find((node) =>
								[
									"ram:BusinessProcessSpecifiedDocumentContextParameter",
									"ram:GuidelineSpecifiedDocumentContextParameter",
								].includes(node.node.nodeName),
							),
						)
					)?.node ?? null;
				exchangedDocumentContext.node.insertBefore(testIndicator.node, refNode);
			}
		}

		if (data.exchangedDocument) {
			const exchangedDocument = findNode(
				"BT-1-00",
				crossIndustryInvoice,
				(node) => node.node.nodeName === "rsm:ExchangedDocument",
				(fragment) => {
					const exchangedDocument = fragment.ele("rsm:ExchangedDocument");
					const refNode =
						findNode(
							"BT-25-00",
							crossIndustryInvoice,
							(node) =>
								node.node.nodeName === "rsm:SupplyChainTradeTransaction",
						)?.node ?? null;
					crossIndustryInvoice.node.insertBefore(
						exchangedDocument.node,
						refNode,
					);
					return exchangedDocument;
				},
			);

			if (data.exchangedDocument.name) {
				const name = fragment()
					.ele("ram:Name")
					.txt(data.exchangedDocument.name);
				const refNode =
					findNode(
						"BT-3",
						exchangedDocument,
						(node) => node.node.nodeName === "ram:TypeCode",
					)?.node ?? null;
				exchangedDocument.node.insertBefore(name.node, refNode);
			}

			if (typeof data.exchangedDocument.copyIndicator === "boolean") {
				const copyIndicator = fragment("ram:CopyIndicator");
				copyIndicator
					.ele("udt:Indicator")
					.txt(data.exchangedDocument.copyIndicator.toString());
				const refNode =
					findNode(
						"BG-1[0]",
						exchangedDocument,
						(node) => node.node.nodeName === "ram:IncludedNote",
					)?.node ?? null;
				exchangedDocument.node.insertBefore(copyIndicator.node, refNode);
			}

			if (data.exchangedDocument.language) {
				const languageId = fragment().ele("ram:LanguageID");
				languageId.txt(data.exchangedDocument.language.value);
				const refNode =
					findNode(
						"BG-1[0]",
						exchangedDocument,
						(node) => node.node.nodeName === "ram:IncludedNote",
					)?.node ?? null;
				exchangedDocument.node.insertBefore(languageId.node, refNode);
			}

			if (
				data.exchangedDocument.invoiceNotes?.length &&
				data.exchangedDocument.invoiceNotes.length > 0
			) {
				const invoiceNoteNodes = findAllNodes(
					exchangedDocument,
					(node) => node.node.nodeName === "ram:IncludedNote",
				);
				for (let i = 0; i < data.exchangedDocument.invoiceNotes.length; i++) {
					const invoiceNote = data.exchangedDocument.invoiceNotes[i];
					const invoiceNoteNode = invoiceNoteNodes[i];
					if (!invoiceNote || !invoiceNoteNode) continue;

					if (invoiceNote.contentCode) {
						const contentCode = fragment().ele("ram:ContentCode");
						contentCode.txt(invoiceNote.contentCode);
						const refNode =
							findNode(
								`BT-22[${i}]`,
								invoiceNoteNode,
								(node) => node.node.nodeName === "ram:Content",
							)?.node ?? null;
						invoiceNoteNode.node.insertBefore(contentCode.node, refNode);
					}
				}
			}

			if (data.exchangedDocument.contractualDueDate) {
				const effectiveSpecifiedPeriod = exchangedDocument.ele(
					"ram:EffectiveSpecifiedPeriod",
				);
				effectiveSpecifiedPeriod
					.ele("ram:CompleteDateTime")
					.ele("udt:DateTimeString")
					.txt(data.exchangedDocument.contractualDueDate.value)
					.att("format", data.exchangedDocument.contractualDueDate.format);
			}
		}

		if (data.transaction) {
			const supplyChainTradeTransaction = findNode(
				"BG-25-00",
				crossIndustryInvoice,
				(node) => node.node.nodeName === "rsm:SupplyChainTradeTransaction",
				() => crossIndustryInvoice.ele("rsm:SupplyChainTradeTransaction"),
			);

			const lineNodes = findAllNodes(
				supplyChainTradeTransaction,
				(node) => node.node.nodeName === "ram:IncludedSupplyChainTradeLineItem",
			);
			for (let i = 0; i < data.transaction.line.length; i++) {
				const line = data.transaction.line[i];
				const lineNode = lineNodes[i];
				if (!line || !lineNode) continue;

				if (line.position) {
					const associatedDocumentLineDoucment = findNode(
						`BT-126-00[${i}]`,
						lineNode,
						(node) =>
							node.node.nodeName === "ram:AssociatedDocumentLineDocument",
						(fragment) => {
							const associatedDocumentLineDocument = fragment.ele(
								"ram:AssociatedDocumentLineDocument",
							);
							const refNode =
								findNode(
									`BG-31[${i}]`,
									lineNode,
									(node) => node.node.nodeName === "ram:SpecifiedTradeProduct",
								)?.node ?? null;
							lineNode.node.insertBefore(
								associatedDocumentLineDocument.node,
								refNode,
							);
							return associatedDocumentLineDocument;
						},
					);

					if (line.position.parentLineId) {
						const parentLineId = fragment().ele("ram:ParentLineID");
						parentLineId.txt(line.position.parentLineId.identifier);
						const refNode =
							findNode(
								`BT-127-00[${i}][0]`,
								associatedDocumentLineDoucment,
								(node) => node.node.nodeName === "ram:IncludedNote",
							)?.node ?? null;
						associatedDocumentLineDoucment.node.insertBefore(
							parentLineId.node,
							refNode,
						);
					}

					if (line.position.lineStatusCode) {
						const lineStatusCode = fragment().ele("ram:LineStatusCode");
						lineStatusCode.txt(line.position.lineStatusCode.value);
						const refNode =
							findNode(
								`BT-127-00[${i}][0]`,
								associatedDocumentLineDoucment,
								(node) => node.node.nodeName === "ram:IncludedNote",
							)?.node ?? null;
						associatedDocumentLineDoucment.node.insertBefore(
							lineStatusCode.node,
							refNode,
						);
					}

					if (line.position.lineStatusReasonCode) {
						const lineStatusReasonCode = fragment().ele(
							"ram:LineStatusReasonCode",
						);
						lineStatusReasonCode.txt(line.position.lineStatusReasonCode);
						const refNode =
							findNode(
								`BT-127-00[${i}][0]`,
								associatedDocumentLineDoucment,
								(node) => node.node.nodeName === "ram:IncludedNote",
							)?.node ?? null;
						associatedDocumentLineDoucment.node.insertBefore(
							lineStatusReasonCode.node,
							refNode,
						);
					}

					if (
						line.position.includedNote?.length &&
						line.position.includedNote.length > 0
					) {
						const includedNoteNodes = findAllNodes(
							associatedDocumentLineDoucment,
							(node) => node.node.nodeName === "ram:IncludedNote",
						);
						for (let j = 0; j < line.position.includedNote.length; j++) {
							const note = line.position.includedNote[j];
							const includedNote = includedNoteNodes[j];
							if (!note || !includedNote) continue;

							if (note.contentCode) {
								const contentCode = fragment().ele("ram:ContentCode");
								contentCode.txt(note.contentCode);
								const refNode =
									findNode(
										`BT-127[${i}]`,
										includedNote,
										(node) => node.node.nodeName === "ram:Content",
									)?.node ?? null;
								includedNote.node.insertBefore(contentCode.node, refNode);
							}

							if (note.subjectCode) {
								includedNote.ele("ram:SubjectCode").txt(note.subjectCode.value);
							}
						}
					}
				}

				if (line.item) {
					const specifiedTradeProduct = findNode(
						`BG-31[${i}]`,
						lineNode,
						(node) => node.node.nodeName === "ram:SpecifiedTradeProduct",
						(fragment) => {
							const specifiedTradeProduct = fragment.ele(
								"ram:SpecifiedTradeProduct",
							);
							const refNode =
								findNode(
									`BG-29[${i}]`,
									lineNode,
									(node) =>
										node.node.nodeName === "ram:SpecifiedLineTradeAgreement",
								)?.node ?? null;
							lineNode.node.insertBefore(specifiedTradeProduct.node, refNode);
							return specifiedTradeProduct;
						},
					);

					if (line.item.id) {
						const id = fragment().ele("ram:ID");
						id.txt(line.item.id.identifier);
						const refNode =
							(
								getCachedNode(`BT-157[${i}]`) ||
								getCachedNode(`BT-155[${i}]`) ||
								getCachedNode(`BT-156[${i}]`) ||
								getCachedNode(`BT-153[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:GlobalID"
											? `BT-157[${i}]`
											: node.node.nodeName === "ram:SellerAssignedID"
												? `BT-155[${i}]`
												: node.node.nodeName === "ram:BuyerAssignedID"
													? `BT-156[${i}]`
													: `BT-153[${i}]`,
									specifiedTradeProduct.find((node) =>
										[
											"ram:GlobalID",
											"ram:SellerAssignedID",
											"ram:BuyerAssignedID",
											"ram:Name",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						specifiedTradeProduct.node.insertBefore(id.node, refNode);
					}

					if (line.item.industryAssignedId) {
						const industryAssignedId = fragment().ele("ram:IndustryAssignedID");
						industryAssignedId.txt(line.item.industryAssignedId.identifier);
						const refNode =
							findNode(
								`BT-153[${i}]`,
								specifiedTradeProduct,
								(node) => node.node.nodeName === "ram:Name",
							)?.node ?? null;
						specifiedTradeProduct.node.insertBefore(
							industryAssignedId.node,
							refNode,
						);
					}

					if (line.item.modelId) {
						const modelId = fragment().ele("ram:ModelID");
						modelId.txt(line.item.modelId.identifier);
						const refNode =
							findNode(
								`BT-153[${i}]`,
								specifiedTradeProduct,
								(node) => node.node.nodeName === "ram:Name",
							)?.node ?? null;
						specifiedTradeProduct.node.insertBefore(modelId.node, refNode);
					}

					if (line.item.batchId?.length && line.item.batchId.length > 0) {
						const refNode =
							(
								getCachedNode(`BG-32[${i}][0]`) ||
								getCachedNode(`BT-158-00[${i}]`) ||
								getCachedNode(`BT-159-00[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:ApplicableProductCharacteristic"
											? `BG-32[${i}][0]`
											: node.node.nodeName ===
													"ram:DesignatedProductClassification"
												? `BT-158-00[${i}]`
												: `BT-159-00[${i}]`,
									specifiedTradeProduct.find((node) =>
										[
											"ram:ApplicableProductCharacteristic",
											"ram:DesignatedProductClassification",
											"ram:OriginTradeCountry",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						for (const id of line.item.batchId) {
							const batchId = fragment().ele("ram:BatchID");
							batchId.txt(id);
							specifiedTradeProduct.node.insertBefore(batchId.node, refNode);
						}
					}
					if (line.item.brandName) {
						const brandName = fragment().ele("ram:BrandName");
						brandName.txt(line.item.brandName);
						const refNode =
							(
								getCachedNode(`BG-32[${i}][0]`) ||
								getCachedNode(`BT-158-00[${i}]`) ||
								getCachedNode(`BT-159-00[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:ApplicableProductCharacteristic"
											? `BG-32[${i}][0]`
											: node.node.nodeName ===
													"ram:DesignatedProductClassification"
												? `BT-158-00[${i}]`
												: `BT-159-00[${i}]`,
									specifiedTradeProduct.find((node) =>
										[
											"ram:ApplicableProductCharacteristic",
											"ram:DesignatedProductClassification",
											"ram:OriginTradeCountry",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						specifiedTradeProduct.node.insertBefore(brandName.node, refNode);
					}
					if (line.item.modelName) {
						const modelName = fragment().ele("ram:ModelName");
						modelName.txt(line.item.modelName);
						const refNode =
							(
								getCachedNode(`BG-32[${i}][0]`) ||
								getCachedNode(`BT-158-00[${i}]`) ||
								getCachedNode(`BT-159-00[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:ApplicableProductCharacteristic"
											? `BG-32[${i}][0]`
											: node.node.nodeName ===
													"ram:DesignatedProductClassification"
												? `BT-158-00[${i}]`
												: `BT-159-00[${i}]`,
									specifiedTradeProduct.find((node) =>
										[
											"ram:ApplicableProductCharacteristic",
											"ram:DesignatedProductClassification",
											"ram:OriginTradeCountry",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						specifiedTradeProduct.node.insertBefore(modelName.node, refNode);
					}

					if (line.item.attributes?.length && line.item.attributes.length > 0) {
						const attributeNodes = findAllNodes(
							specifiedTradeProduct,
							(node) =>
								node.node.nodeName === "ram:ApplicableProductCharacteristic",
						);
						for (let j = 0; j < line.item.attributes.length; j++) {
							const attribute = line.item.attributes[j];
							const attributeNode = attributeNodes[j];
							if (!attribute || !attributeNode) continue;

							if (attribute.typeCode) {
								const typeCode = fragment().ele("ram:TypeCode");
								typeCode.txt(attribute.typeCode.value);
								const refNode =
									findNode(
										`BT-160[${i}][${j}]`,
										attributeNode,
										(node) => node.node.nodeName === "ram:Description",
									)?.node ?? null;
								attributeNode.node.insertBefore(typeCode.node, refNode);
							}

							if (attribute.valueMeasure) {
								let value: number;
								let unitCode: string | undefined = undefined;

								if (typeof attribute.valueMeasure === "object") {
									value = attribute.valueMeasure.value;
									unitCode = attribute.valueMeasure.unitCode ?? undefined;
								} else {
									value = attribute.valueMeasure;
								}

								const valueMeasure = fragment().ele("ram:ValueMeasure");
								valueMeasure.txt(value.toString());
								if (unitCode) {
									valueMeasure.att("unitCode", unitCode);
								}

								const refNode =
									findNode(
										`BT-161[${i}][${j}]`,
										attributeNode,
										(node) => node.node.nodeName === "ram:Value",
									)?.node ?? null;
								attributeNode.node.insertBefore(valueMeasure.node, refNode);
							}
						}
					}

					if (line.item.classification?.className) {
						const designatedProductClassification = findNode(
							`BT-158-00[${i}]`,
							specifiedTradeProduct,
							(node) =>
								node.node.nodeName === "ram:DesignatedProductClassification",
							(fragment) => {
								const designatedProductClassification = fragment.ele(
									"ram:DesignatedProductClassification",
								);
								const refNode =
									findNode(
										`BT-159-00[${i}]`,
										specifiedTradeProduct,
										(node) => node.node.nodeName === "ram:OriginTradeCountry",
									)?.node ?? null;
								specifiedTradeProduct.node.insertBefore(
									designatedProductClassification.node,
									refNode,
								);
								return designatedProductClassification;
							},
						);

						designatedProductClassification
							.ele("ram:ClassName")
							.txt(line.item.classification.className);
					}

					if (line.item.instances?.length && line.item.instances.length > 0) {
						const refNode =
							findNode(
								`BT-159-00[${i}]`,
								specifiedTradeProduct,
								(node) => node.node.nodeName === "ram:OriginTradeCountry",
							)?.node ?? null;
						for (const instance of line.item.instances) {
							const individualTradeProductInstance = fragment().ele(
								"ram:IndividualTradeProductInstance",
							);
							specifiedTradeProduct.node.insertBefore(
								individualTradeProductInstance.node,
								refNode,
							);

							if (instance.batchId) {
								individualTradeProductInstance
									.ele("ram:BatchID")
									.txt(instance.batchId.identifier);
							}

							if (instance.supplierAssignedSerialId) {
								individualTradeProductInstance
									.ele("ram:SupplierAssignedSerialID")
									.txt(instance.supplierAssignedSerialId.identifier);
							}
						}
					}

					if (line.item.manufacturer) {
						const manufacturerTradeParty = specifiedTradeProduct.ele(
							"ram:ManufacturerTradeParty",
						);

						if (
							line.item.manufacturer.id?.length &&
							line.item.manufacturer.id.length > 0
						) {
							for (const id of line.item.manufacturer.id) {
								manufacturerTradeParty.ele("ram:ID").txt(id.identifier);
							}
						}

						if (
							line.item.manufacturer.globalId?.length &&
							line.item.manufacturer.globalId.length > 0
						) {
							for (const globalId of line.item.manufacturer.globalId) {
								manufacturerTradeParty
									.ele("ram:GlobalID")
									.txt(globalId.identifier)
									.att("schemeID", globalId.schemeId);
							}
						}

						if (line.item.manufacturer.name) {
							manufacturerTradeParty
								.ele("ram:Name")
								.txt(line.item.manufacturer.name);
						}

						if (line.item.manufacturer.roleCode) {
							manufacturerTradeParty
								.ele("ram:RoleCode")
								.txt(line.item.manufacturer.roleCode.value);
						}

						if (line.item.manufacturer.description) {
							manufacturerTradeParty
								.ele("ram:Description")
								.txt(line.item.manufacturer.description);
						}

						if (line.item.manufacturer.organization) {
							const specifiedLegalOrganization = manufacturerTradeParty.ele(
								"ram:SpecifiedLegalOrganization",
							);
							if (line.item.manufacturer.organization.id) {
								const id = specifiedLegalOrganization
									.ele("ram:ID")
									.txt(line.item.manufacturer.organization.id.identifier);
								if (line.item.manufacturer.organization.id.schemeId) {
									id.att(
										"schemeID",
										line.item.manufacturer.organization.id.schemeId,
									);
								}
							}
							if (line.item.manufacturer.organization.tradingName) {
								specifiedLegalOrganization
									.ele("ram:TradingBusinessName")
									.txt(line.item.manufacturer.organization.tradingName);
							}
						}

						if (line.item.manufacturer.contact) {
							const definedTradeContact = manufacturerTradeParty.ele(
								"ram:DefinedTradeContact",
							);

							if (line.item.manufacturer.contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(line.item.manufacturer.contact.personName);
							}
							if (line.item.manufacturer.contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(line.item.manufacturer.contact.departmentName);
							}
							if (line.item.manufacturer.contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(line.item.manufacturer.contact.typeCode.value);
							}
							if (line.item.manufacturer.contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(line.item.manufacturer.contact.phoneNumber);
							}
							if (line.item.manufacturer.contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(line.item.manufacturer.contact.faxNumber);
							}
							if (line.item.manufacturer.contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(line.item.manufacturer.contact.emailAddress);
							}
						}

						const postalTradeAddress = manufacturerTradeParty.ele(
							"ram:PostalTradeAddress",
						);

						if (line.item.manufacturer.postalAddress.postCode) {
							postalTradeAddress
								.ele("ram:PostcodeCode")
								.txt(line.item.manufacturer.postalAddress.postCode);
						}
						if (line.item.manufacturer.postalAddress.line1) {
							postalTradeAddress
								.ele("ram:LineOne")
								.txt(line.item.manufacturer.postalAddress.line1);
						}
						if (line.item.manufacturer.postalAddress.line2) {
							postalTradeAddress
								.ele("ram:LineTwo")
								.txt(line.item.manufacturer.postalAddress.line2);
						}
						if (line.item.manufacturer.postalAddress.line3) {
							postalTradeAddress
								.ele("ram:LineThree")
								.txt(line.item.manufacturer.postalAddress.line3);
						}
						if (line.item.manufacturer.postalAddress.city) {
							postalTradeAddress
								.ele("ram:CityName")
								.txt(line.item.manufacturer.postalAddress.city);
						}
						postalTradeAddress
							.ele("ram:CountryID")
							.txt(line.item.manufacturer.postalAddress.countryCode.value);
						if (line.item.manufacturer.postalAddress.countrySubdivision) {
							postalTradeAddress
								.ele("ram:CountrySubDivisionName")
								.txt(line.item.manufacturer.postalAddress.countrySubdivision);
						}

						if (line.item.manufacturer.electronicAddress) {
							manufacturerTradeParty
								.ele("ram:URIUniversalCommunication")
								.ele("ram:URIID")
								.txt(line.item.manufacturer.electronicAddress.identifier)
								.att(
									"schemeID",
									line.item.manufacturer.electronicAddress.schemeId,
								);
						}

						if (line.item.manufacturer.taxRegistration?.vat?.id) {
							manufacturerTradeParty
								.ele("ram:SpecifiedTaxRegistration")
								.ele("ram:ID")
								.txt(line.item.manufacturer.taxRegistration.vat.id.identifier)
								.att("schemeID", "VA");
						}

						if (line.item.manufacturer.taxRegistration?.local?.id) {
							manufacturerTradeParty
								.ele("ram:SpecifiedTaxRegistration")
								.ele("ram:ID")
								.txt(line.item.manufacturer.taxRegistration.local.id.identifier)
								.att("schemeID", "FC");
						}
					}

					if (
						line.item.includedReferencedProducts?.length &&
						line.item.includedReferencedProducts.length > 0
					) {
						for (const product of line.item.includedReferencedProducts) {
							const includedReferencedProduct = specifiedTradeProduct.ele(
								"ram:IncludedReferencedProduct",
							);

							if (product.id) {
								includedReferencedProduct
									.ele("ram:ID")
									.txt(product.id.identifier);
							}

							if (product.globalId?.length && product.globalId.length > 0) {
								for (const id of product.globalId) {
									includedReferencedProduct
										.ele("ram:GlobalID")
										.txt(id.identifier)
										.att("schemeID", id.schemeId);
								}
							}

							if (product.sellerAssignedId) {
								includedReferencedProduct
									.ele("ram:SellerAssignedID")
									.txt(product.sellerAssignedId.identifier);
							}

							if (product.buyerAssignedId) {
								includedReferencedProduct
									.ele("ram:BuyerAssignedID")
									.txt(product.buyerAssignedId.identifier);
							}

							if (product.industryAssignedId) {
								includedReferencedProduct
									.ele("ram:IndustryAssignedID")
									.txt(product.industryAssignedId.identifier);
							}

							includedReferencedProduct.ele("ram:Name").txt(product.name);

							if (product.description) {
								includedReferencedProduct
									.ele("ram:Description")
									.txt(product.description);
							}

							if (product.unitQuantity) {
								let value: number;
								let unitCode: string | undefined = undefined;

								if (typeof product.unitQuantity === "object") {
									value = product.unitQuantity.value;
									unitCode = product.unitQuantity.unitCode ?? undefined;
								} else {
									value = product.unitQuantity;
								}

								const unitQuantity =
									includedReferencedProduct.ele("ram:UnitQuantity");
								unitQuantity.txt(value.toString());
								if (unitCode) {
									unitQuantity.att("unitCode", unitCode);
								}
							}
						}
					}
				}

				if (line.priceDetails) {
					const specifiedLineTradeAgreement = findNode(
						`BG-29[${i}]`,
						lineNode,
						(node) => node.node.nodeName === "ram:SpecifiedLineTradeAgreement",
						(fragment) => {
							const specifiedLineTradeAgreement = fragment.ele(
								"ram:SpecifiedLineTradeAgreement",
							);
							const refNode =
								(
									getCachedNode(`BT-129-00[${i}]`) ||
									getCachedNode(`BG-30-00[${i}]`) ||
									setCachedNode(
										(node) =>
											node.node.nodeName === "ram:SpecifiedLineTradeAgreement"
												? `BT-129-00[${i}]`
												: `BG-30-00[${i}]`,
										lineNode.find((node) =>
											[
												"ram:SpecifiedLineTradeAgreement",
												"ram:SpecifiedLineTradeSettlement",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							lineNode.node.insertBefore(
								specifiedLineTradeAgreement.node,
								refNode,
							);
							return specifiedLineTradeAgreement;
						},
					);

					if (line.priceDetails.deliveryTerms) {
						const applicableTradeDeliveryTerms = fragment().ele(
							"ram:ApplicableTradeDeliveryTerms",
						);
						const refNode =
							(
								getCachedNode(`BT-132-00[${i}]`) ||
								getCachedNode(`BT-148-00[${i}]`) ||
								getCachedNode(`BT-146-00[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:BuyerOrderReferencedDocument"
											? `BT-132-00[${i}]`
											: node.node.nodeName === "ram:GrossPriceProductTradePrice"
												? `BT-148-00[${i}]`
												: `BT-146-00[${i}]`,
									specifiedLineTradeAgreement.find((node) =>
										[
											"ram:BuyerOrderReferencedDocument",
											"ram:GrossPriceProductTradePrice",
											"ram:NetPriceProductTradePrice",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						specifiedLineTradeAgreement.node.insertBefore(
							applicableTradeDeliveryTerms.node,
							refNode,
						);

						if (line.priceDetails.deliveryTerms.typeCode) {
							applicableTradeDeliveryTerms
								.ele("ram:DeliveryTypeCode")
								.txt(line.priceDetails.deliveryTerms.typeCode.value);
						}

						if (line.priceDetails.deliveryTerms.location) {
							const relevantTradeLocation = applicableTradeDeliveryTerms.ele(
								"ram:RelevantTradeLocation",
							);
							relevantTradeLocation
								.ele("ram:CountryID")
								.txt(
									line.priceDetails.deliveryTerms.location.countryCode.value,
								);
							relevantTradeLocation
								.ele("ram:Name")
								.txt(line.priceDetails.deliveryTerms.location.name);
						}
					}

					if (line.priceDetails.sellerOrderReferencedDocument) {
						const sellerOrderReferencedDocument = fragment().ele(
							"ram:SellerOrderReferencedDocument",
						);
						const refNode =
							(
								getCachedNode(`BT-132-00[${i}]`) ||
								getCachedNode(`BT-148-00[${i}]`) ||
								getCachedNode(`BT-146-00[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:BuyerOrderReferencedDocument"
											? `BT-132-00[${i}]`
											: node.node.nodeName === "ram:GrossPriceProductTradePrice"
												? `BT-148-00[${i}]`
												: `BT-146-00[${i}]`,
									specifiedLineTradeAgreement.find((node) =>
										[
											"ram:BuyerOrderReferencedDocument",
											"ram:GrossPriceProductTradePrice",
											"ram:NetPriceProductTradePrice",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						specifiedLineTradeAgreement.node.insertBefore(
							sellerOrderReferencedDocument.node,
							refNode,
						);

						sellerOrderReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(
								line.priceDetails.sellerOrderReferencedDocument
									.issuerAssignedId,
							);

						if (line.priceDetails.sellerOrderReferencedDocument.lineId) {
							sellerOrderReferencedDocument
								.ele("ram:LineID")
								.txt(line.priceDetails.sellerOrderReferencedDocument.lineId);
						}

						if (line.priceDetails.sellerOrderReferencedDocument.date) {
							sellerOrderReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(line.priceDetails.sellerOrderReferencedDocument.date.value)
								.att(
									"format",
									line.priceDetails.sellerOrderReferencedDocument.date.format,
								);
						}
					}

					if (line.priceDetails.associatedOrder) {
						const buyerOrderReferencedDocument = findNode(
							`BT-132-00[${i}]`,
							specifiedLineTradeAgreement,
							(node) =>
								node.node.nodeName === "ram:BuyerOrderReferencedDocument",
							(fragment) => {
								const buyerOrderReferencedDocument = fragment.ele(
									"ram:BuyerOrderReferencedDocument",
								);
								const refNode =
									(
										getCachedNode(`BT-148-00[${i}]`) ||
										getCachedNode(`BT-146-00[${i}]`) ||
										setCachedNode(
											(node) =>
												node.node.nodeName === "ram:GrossPriceProductTradePrice"
													? `BT-148-00[${i}]`
													: `BT-146-00[${i}]`,
											specifiedLineTradeAgreement.find((node) =>
												[
													"ram:GrossPriceProductTradePrice",
													"ram:NetPriceProductTradePrice",
												].includes(node.node.nodeName),
											),
										)
									)?.node ?? null;
								specifiedLineTradeAgreement.node.insertBefore(
									buyerOrderReferencedDocument.node,
									refNode,
								);
								return buyerOrderReferencedDocument;
							},
						);

						if (line.priceDetails.associatedOrder.issuerAssignedId) {
							const issuerAssignedId = fragment().ele("ram:IssuerAssignedID");
							issuerAssignedId.txt(
								line.priceDetails.associatedOrder.issuerAssignedId,
							);
							const refNode =
								findNode(
									`BT-132[${i}]`,
									buyerOrderReferencedDocument,
									(node) => node.node.nodeName === "ram:LineID",
								)?.node ?? null;
							buyerOrderReferencedDocument.node.insertBefore(
								issuerAssignedId.node,
								refNode,
							);
						}

						if (line.priceDetails.associatedOrder.date) {
							buyerOrderReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(line.priceDetails.associatedOrder.date.value)
								.att("format", line.priceDetails.associatedOrder.date.format);
						}
					}

					if (line.priceDetails.quotationReferencedDocument) {
						const quotationReferencedDocument = fragment().ele(
							"ram:QuotationReferencedDocument",
						);
						const refNode =
							(
								getCachedNode(`BT-148-00[${i}]`) ||
								getCachedNode(`BT-146-00[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:GrossPriceProductTradePrice"
											? `BT-148-00[${i}]`
											: `BT-146-00[${i}]`,
									specifiedLineTradeAgreement.find((node) =>
										[
											"ram:GrossPriceProductTradePrice",
											"ram:NetPriceProductTradePrice",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						specifiedLineTradeAgreement.node.insertBefore(
							quotationReferencedDocument.node,
							refNode,
						);

						quotationReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(
								line.priceDetails.quotationReferencedDocument.issuerAssignedId,
							);
						if (line.priceDetails.quotationReferencedDocument.lineId) {
							quotationReferencedDocument
								.ele("ram:LineID")
								.txt(line.priceDetails.quotationReferencedDocument.lineId);
						}
						if (line.priceDetails.quotationReferencedDocument.date) {
							quotationReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(line.priceDetails.quotationReferencedDocument.date.value)
								.att(
									"format",
									line.priceDetails.quotationReferencedDocument.date.format,
								);
						}
					}

					if (line.priceDetails.contractReferencedDocument) {
						const contractReferencedDocument = fragment().ele(
							"ram:ContractReferencedDocument",
						);
						const refNode =
							(
								getCachedNode(`BT-148-00[${i}]`) ||
								getCachedNode(`BT-146-00[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:GrossPriceProductTradePrice"
											? `BT-148-00[${i}]`
											: `BT-146-00[${i}]`,
									specifiedLineTradeAgreement.find((node) =>
										[
											"ram:GrossPriceProductTradePrice",
											"ram:NetPriceProductTradePrice",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						specifiedLineTradeAgreement.node.insertBefore(
							contractReferencedDocument.node,
							refNode,
						);

						if (line.priceDetails.contractReferencedDocument.issuerAssignedId) {
							contractReferencedDocument
								.ele("ram:IssuerAssignedID")
								.txt(
									line.priceDetails.contractReferencedDocument.issuerAssignedId,
								);
						}

						if (line.priceDetails.contractReferencedDocument.lineId) {
							contractReferencedDocument
								.ele("ram:LineID")
								.txt(line.priceDetails.contractReferencedDocument.lineId);
						}

						if (line.priceDetails.contractReferencedDocument.date) {
							contractReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(line.priceDetails.contractReferencedDocument.date.value)
								.att(
									"format",
									line.priceDetails.contractReferencedDocument.date.format,
								);
						}
					}

					if (
						line.priceDetails.additionalReferencedDocuments?.length &&
						line.priceDetails.additionalReferencedDocuments.length > 0
					) {
						const refNode =
							(
								getCachedNode(`BT-148-00[${i}]`) ||
								getCachedNode(`BT-146-00[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:GrossPriceProductTradePrice"
											? `BT-148-00[${i}]`
											: `BT-146-00[${i}]`,
									specifiedLineTradeAgreement.find((node) =>
										[
											"ram:GrossPriceProductTradePrice",
											"ram:NetPriceProductTradePrice",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						for (const doc of line.priceDetails.additionalReferencedDocuments) {
							const additionalReferencedDocument = fragment().ele(
								"ram:AdditionalReferencedDocument",
							);
							specifiedLineTradeAgreement.node.insertBefore(
								additionalReferencedDocument.node,
								refNode,
							);

							additionalReferencedDocument
								.ele("ram:IssuerAssignedID")
								.txt(doc.issuerAssignedId);
							if (doc.uri) {
								additionalReferencedDocument.ele("ram:URIID").txt(doc.uri);
							}

							if (doc.lineId) {
								additionalReferencedDocument.ele("ram:LineID").txt(doc.lineId);
							}

							if (doc.typeCode) {
								additionalReferencedDocument
									.ele("ram:TypeCode")
									.txt(doc.typeCode);
							}

							if (doc.name) {
								additionalReferencedDocument.ele("ram:Name").txt(doc.name);
							}

							if (doc.attachedDocument) {
								additionalReferencedDocument
									.ele("ram:AttachedDocument")
									.txt(base64.encode(doc.attachedDocument.content))
									.att("mimeCode", doc.attachedDocument.mimeType)
									.att("filename", doc.attachedDocument.filename);
							}

							if (doc.referenceTypeCode) {
								additionalReferencedDocument
									.ele("ram:ReferenceTypeCode")
									.txt(doc.referenceTypeCode);
							}

							if (doc.date) {
								additionalReferencedDocument
									.ele("ram:FormattedIssueDateTime")
									.ele("qdt:DateTimeString")
									.txt(doc.date.value)
									.att("format", doc.date.format);
							}
						}
					}

					if (line.priceDetails.grossPrice) {
						const grossPriceProductTradePrice = findNode(
							`BT-148-00[${i}]`,
							specifiedLineTradeAgreement,
							(node) =>
								node.node.nodeName === "ram:GrossPriceProductTradePrice",
							(fragment) => {
								const grossPriceProductTradePrice = fragment.ele(
									"ram:GrossPriceProductTradePrice",
								);
								const refNode =
									findNode(
										`BT-146-00[${i}]`,
										specifiedLineTradeAgreement,
										(node) =>
											node.node.nodeName === "ram:NetPriceProductTradePrice",
									)?.node ?? null;
								specifiedLineTradeAgreement.node.insertBefore(
									grossPriceProductTradePrice.node,
									refNode,
								);
								return grossPriceProductTradePrice;
							},
						);

						if (
							line.priceDetails.grossPrice.discount?.length &&
							line.priceDetails.grossPrice.discount.length > 0
						) {
							const appliedTradeAllowanceChargeNodes = findAllNodes(
								grossPriceProductTradePrice,
								(node) =>
									node.node.nodeName === "ram:AppliedTradeAllowanceCharge" &&
									[...node.node.childNodes].some(
										(child) =>
											child.nodeName === "ram:ChargeIndicator" &&
											[...child.childNodes].some(
												(c) =>
													c.nodeName === "udt:Indicator" &&
													c.textContent?.trim() === "false",
											),
									),
							);
							for (
								let j = 0;
								j < line.priceDetails.grossPrice.discount.length;
								j++
							) {
								const discount = line.priceDetails.grossPrice.discount[j];
								const appliedTradeAllowanceCharge =
									appliedTradeAllowanceChargeNodes[j];
								if (!discount || !appliedTradeAllowanceCharge) continue;

								if (typeof discount.calculationPercent === "number") {
									const calculationPercent = fragment().ele(
										"ram:CalculationPercent",
									);
									calculationPercent.txt(
										discount.calculationPercent.toString(),
									);
									const refNode =
										findNode(
											`BT-147[${i}][${j}]`,
											appliedTradeAllowanceCharge,
											(node) => node.node.nodeName === "ram:ActualAmount",
										)?.node ?? null;
									appliedTradeAllowanceCharge.node.insertBefore(
										calculationPercent.node,
										refNode,
									);
								}

								if (typeof discount.basisAmount === "number") {
									const basisAmount = fragment().ele("ram:BasisAmount");
									basisAmount.txt(discount.basisAmount.toString());
									const refNode =
										findNode(
											`BT-147[${i}][${j}]`,
											appliedTradeAllowanceCharge,
											(node) => node.node.nodeName === "ram:ActualAmount",
										)?.node ?? null;
									appliedTradeAllowanceCharge.node.insertBefore(
										basisAmount.node,
										refNode,
									);
								}

								if (discount.reasonCode) {
									appliedTradeAllowanceCharge
										.ele("ram:ReasonCode")
										.txt(discount.reasonCode.value);
								}

								if (discount.reason) {
									appliedTradeAllowanceCharge
										.ele("ram:Reason")
										.txt(discount.reason);
								}
							}
						}

						if (
							line.priceDetails.grossPrice.surcharges?.length &&
							line.priceDetails.grossPrice.surcharges.length > 0
						) {
							for (
								let j = 0;
								j < line.priceDetails.grossPrice.surcharges.length;
								j++
							) {
								const surcharge = line.priceDetails.grossPrice.surcharges[j];
								if (!surcharge) continue;

								const appliedTradeAllowanceCharge =
									grossPriceProductTradePrice.ele(
										"ram:AppliedTradeAllowanceCharge",
									);
								appliedTradeAllowanceCharge
									.ele("ram:ChargeIndicator")
									.ele("udt:Indicator")
									.txt("true");

								if (typeof surcharge.calculationPercent === "number") {
									appliedTradeAllowanceCharge
										.ele("ram:CalculationPercent")
										.txt(surcharge.calculationPercent.toString());
								}

								if (typeof surcharge.basisAmount === "number") {
									appliedTradeAllowanceCharge
										.ele("ram:BasisAmount")
										.txt(surcharge.basisAmount.toString());
								}

								if (typeof surcharge.actualAmount === "number") {
									appliedTradeAllowanceCharge
										.ele("ram:ActualAmount")
										.txt(surcharge.actualAmount.toString());
								}

								if (surcharge.reasonCode) {
									appliedTradeAllowanceCharge
										.ele("ram:ReasonCode")
										.txt(surcharge.reasonCode.value);
								}

								if (surcharge.reason) {
									appliedTradeAllowanceCharge
										.ele("ram:Reason")
										.txt(surcharge.reason);
								}
							}
						}
					}

					if (line.priceDetails.netPrice) {
						const netPriceProductTradePrice = findNode(
							`BT-146-00[${i}]`,
							specifiedLineTradeAgreement,
							(node) => node.node.nodeName === "ram:NetPriceProductTradePrice",
							() =>
								specifiedLineTradeAgreement.ele(
									"ram:NetPriceProductTradePrice",
								),
						);

						if (line.priceDetails.netPrice.includedTax) {
							const includedTradeTax = netPriceProductTradePrice.ele(
								"ram:IncludedTradeTax",
							);
							includedTradeTax
								.ele("ram:CalculatedAmount")
								.txt(
									line.priceDetails.netPrice.includedTax.calculatedAmount.toString(),
								);
							includedTradeTax.ele("ram:TypeCode").txt("VAT");

							if (line.priceDetails.netPrice.includedTax.exemptionReason) {
								includedTradeTax
									.ele("ram:ExemptionReason")
									.txt(line.priceDetails.netPrice.includedTax.exemptionReason);
							}
							includedTradeTax
								.ele("ram:CategoryCode")
								.txt(line.priceDetails.netPrice.includedTax.categoryCode.value);
							if (line.priceDetails.netPrice.includedTax.exemptionReasonCode) {
								includedTradeTax
									.ele("ram:ExemptionReasonCode")
									.txt(
										line.priceDetails.netPrice.includedTax.exemptionReasonCode
											.value,
									);
							}
							includedTradeTax
								.ele("ram:RateApplicablePercent")
								.txt(
									line.priceDetails.netPrice.includedTax.rateApplicablePercent.toString(),
								);
						}
					}

					if (line.priceDetails.itemSeller) {
						const itemSellerTradeParty = specifiedLineTradeAgreement.ele(
							"ram:ItemSellerTradeParty",
						);

						if (
							line.priceDetails.itemSeller.id?.length &&
							line.priceDetails.itemSeller.id.length > 0
						) {
							for (const id of line.priceDetails.itemSeller.id) {
								itemSellerTradeParty.ele("ram:ID").txt(id.identifier);
							}
						}

						if (
							line.priceDetails.itemSeller.globalId?.length &&
							line.priceDetails.itemSeller.globalId.length > 0
						) {
							for (const id of line.priceDetails.itemSeller.globalId) {
								const globalId = itemSellerTradeParty.ele("ram:GlobalID");
								globalId.txt(id.identifier);
								if (id.schemeId) {
									globalId.att("schemeID", id.schemeId);
								}
							}
						}

						itemSellerTradeParty
							.ele("ram:Name")
							.txt(line.priceDetails.itemSeller.name);

						if (line.priceDetails.itemSeller.roleCode) {
							itemSellerTradeParty
								.ele("ram:RoleCode")
								.txt(line.priceDetails.itemSeller.roleCode.value);
						}

						if (line.priceDetails.itemSeller.description) {
							itemSellerTradeParty
								.ele("ram:Description")
								.txt(line.priceDetails.itemSeller.description);
						}

						if (line.priceDetails.itemSeller.organization) {
							const specifiedLegalOrganization = itemSellerTradeParty.ele(
								"ram:SpecifiedLegalOrganization",
							);

							if (line.priceDetails.itemSeller.organization.id) {
								const id = specifiedLegalOrganization.ele("ram:ID");
								id.txt(line.priceDetails.itemSeller.organization.id.identifier);
								if (line.priceDetails.itemSeller.organization.id.schemeId) {
									id.att(
										"schemeID",
										line.priceDetails.itemSeller.organization.id.schemeId,
									);
								}
							}

							if (line.priceDetails.itemSeller.organization.tradingName) {
								specifiedLegalOrganization
									.ele("ram:TradingBusinessName")
									.txt(line.priceDetails.itemSeller.organization.tradingName);
							}
						}

						if (
							line.priceDetails.itemSeller.contact?.length &&
							line.priceDetails.itemSeller.contact.length > 0
						) {
							for (const contact of line.priceDetails.itemSeller.contact) {
								const definedTradeContact = itemSellerTradeParty.ele(
									"ram:DefinedTradeContact",
								);

								if (contact.personName) {
									definedTradeContact
										.ele("ram:PersonName")
										.txt(contact.personName);
								}

								if (contact.departmentName) {
									definedTradeContact
										.ele("ram:DepartmentName")
										.txt(contact.departmentName);
								}

								if (contact.typeCode) {
									definedTradeContact
										.ele("ram:TypeCode")
										.txt(contact.typeCode.value);
								}

								if (contact.phoneNumber) {
									definedTradeContact
										.ele("ram:TelephoneUniversalCommunication")
										.ele("ram:CompleteNumber")
										.txt(contact.phoneNumber);
								}

								if (contact.faxNumber) {
									definedTradeContact
										.ele("ram:FaxUniversalCommunication")
										.ele("ram:CompleteNumber")
										.txt(contact.faxNumber);
								}

								if (contact.emailAddress) {
									definedTradeContact
										.ele("ram:EmailURIUniversalCommunication")
										.ele("ram:URIID")
										.txt(contact.emailAddress);
								}
							}
						}

						if (line.priceDetails.itemSeller.postalAddress) {
							const postalTradeAddress = itemSellerTradeParty.ele(
								"ram:PostalTradeAddress",
							);

							if (line.priceDetails.itemSeller.postalAddress.postCode) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(line.priceDetails.itemSeller.postalAddress.postCode);
							}
							if (line.priceDetails.itemSeller.postalAddress.line1) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(line.priceDetails.itemSeller.postalAddress.line1);
							}
							if (line.priceDetails.itemSeller.postalAddress.line2) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(line.priceDetails.itemSeller.postalAddress.line2);
							}
							if (line.priceDetails.itemSeller.postalAddress.line3) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(line.priceDetails.itemSeller.postalAddress.line3);
							}
							if (line.priceDetails.itemSeller.postalAddress.city) {
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									line.priceDetails.itemSeller.postalAddress.countryCode.value,
								);
							if (
								line.priceDetails.itemSeller.postalAddress.countrySubdivison
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										line.priceDetails.itemSeller.postalAddress
											.countrySubdivison,
									);
							}
						}

						if (line.priceDetails.itemSeller.electronicAddress) {
							itemSellerTradeParty
								.ele("ram:URIUniversalCommunication")
								.ele("ram:URIID")
								.txt(line.priceDetails.itemSeller.electronicAddress.identifier)
								.att(
									"schemeID",
									line.priceDetails.itemSeller.electronicAddress.schemeId,
								);
						}

						if (line.priceDetails.itemSeller.taxRegistration?.vat?.id) {
							const specifiedTaxRegistration = itemSellerTradeParty.ele(
								"ram:SpecifiedTaxRegistration",
							);
							specifiedTaxRegistration
								.ele("ram:ID")
								.txt(
									line.priceDetails.itemSeller.taxRegistration.vat.id
										.identifier,
								)
								.att("schemeID", "VA");
						}

						if (line.priceDetails.itemSeller.taxRegistration?.local?.id) {
							const specifiedTaxRegistration = itemSellerTradeParty.ele(
								"ram:SpecifiedTaxRegistration",
							);
							specifiedTaxRegistration
								.ele("ram:ID")
								.txt(
									line.priceDetails.itemSeller.taxRegistration.local.id
										.identifier,
								)
								.att("schemeID", "FC");
						}
					}

					if (line.priceDetails.customerOrderReferencedDocument) {
						const ultimateCustomerOrderReferencedDocument =
							specifiedLineTradeAgreement.ele(
								"ram:UltimateCustomerOrderReferencedDocument",
							);
						ultimateCustomerOrderReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(
								line.priceDetails.customerOrderReferencedDocument
									.issuerAssignedId,
							);

						if (line.priceDetails.customerOrderReferencedDocument.lineId) {
							ultimateCustomerOrderReferencedDocument
								.ele("ram:LineID")
								.txt(line.priceDetails.customerOrderReferencedDocument.lineId);
						}

						if (line.priceDetails.customerOrderReferencedDocument.date) {
							ultimateCustomerOrderReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(
									line.priceDetails.customerOrderReferencedDocument.date.value,
								)
								.att(
									"format",
									line.priceDetails.customerOrderReferencedDocument.date.format,
								);
						}
					}
				}

				if (line.delivery) {
					const specifiedLineTradeDelivery = findNode(
						`BT-129-00[${i}]`,
						lineNode,
						(node) => node.node.nodeName === "ram:SpecifiedLineTradeDelivery",
						(fragment) => {
							const specifiedLineTradeDelivery = fragment.ele(
								"ram:SpecifiedLineTradeDelivery",
							);
							const refNode =
								findNode(
									`BG-30-00[${i}]`,
									lineNode,
									(node) =>
										node.node.nodeName === "ram:SpecifiedLineTradeSettlement",
								)?.node ?? null;
							lineNode.node.insertBefore(
								specifiedLineTradeDelivery.node,
								refNode,
							);
							return specifiedLineTradeDelivery;
						},
					);

					if (line.delivery.chargeFreeQuantity) {
						specifiedLineTradeDelivery
							.ele("ram:ChargeFreeQuantity")
							.txt(line.delivery.chargeFreeQuantity.value.toString())
							.att("unitCode", line.delivery.chargeFreeQuantity.unitCode);
					}

					if (line.delivery.packageQuantity) {
						specifiedLineTradeDelivery
							.ele("ram:PackageQuantity")
							.txt(line.delivery.packageQuantity.value.toString())
							.att("unitCode", line.delivery.packageQuantity.unitCode);
					}

					if (line.delivery.perPackageUnitQuantity) {
						specifiedLineTradeDelivery
							.ele("ram:PerPackageUnitQuantity")
							.txt(line.delivery.perPackageUnitQuantity.value.toString())
							.att("unitCode", line.delivery.perPackageUnitQuantity.unitCode);
					}

					if (line.delivery.recipient) {
						const shipToTradeParty = specifiedLineTradeDelivery.ele(
							"ram:ShipToTradeParty",
						);

						if (line.delivery.recipient.id) {
							shipToTradeParty
								.ele("ram:ID")
								.txt(line.delivery.recipient.id.identifier);
						}

						if (
							line.delivery.recipient.globalId?.length &&
							line.delivery.recipient.globalId.length > 0
						) {
							for (const id of line.delivery.recipient.globalId) {
								const globalId = shipToTradeParty.ele("ram:GlobalID");
								globalId.txt(id.identifier);
								if (id.schemeId) {
									globalId.att("schemeID", id.schemeId);
								}
							}
						}

						shipToTradeParty.ele("ram:Name").txt(line.delivery.recipient.name);

						if (line.delivery.recipient.roleCode) {
							shipToTradeParty
								.ele("ram:RoleCode")
								.txt(line.delivery.recipient.roleCode.value);
						}

						if (line.delivery.recipient.organization) {
							const specifiedLegalOrganization = shipToTradeParty.ele(
								"ram:SpecifiedLegalOrganization",
							);

							if (line.delivery.recipient.organization.id) {
								const id = specifiedLegalOrganization.ele("ram:ID");
								id.txt(line.delivery.recipient.organization.id.identifier);
								if (line.delivery.recipient.organization.id.schemeId) {
									id.att(
										"schemeID",
										line.delivery.recipient.organization.id.schemeId,
									);
								}
							}

							if (line.delivery.recipient.organization.tradingName) {
								specifiedLegalOrganization
									.ele("ram:TradingBusinessName")
									.txt(line.delivery.recipient.organization.tradingName);
							}
						}

						if (
							line.delivery.recipient.contact?.length &&
							line.delivery.recipient.contact.length > 0
						) {
							for (const contact of line.delivery.recipient.contact) {
								const definedTradeContact = shipToTradeParty.ele(
									"ram:DefinedTradeContact",
								);

								if (contact.personName) {
									definedTradeContact
										.ele("ram:PersonName")
										.txt(contact.personName);
								}

								if (contact.departmentName) {
									definedTradeContact
										.ele("ram:DepartmentName")
										.txt(contact.departmentName);
								}

								if (contact.typeCode) {
									definedTradeContact
										.ele("ram:TypeCode")
										.txt(contact.typeCode.value);
								}

								if (contact.phoneNumber) {
									definedTradeContact
										.ele("ram:TelephoneUniversalCommunication")
										.ele("ram:CompleteNumber")
										.txt(contact.phoneNumber);
								}

								if (contact.faxNumber) {
									definedTradeContact
										.ele("ram:FaxUniversalCommunication")
										.ele("ram:CompleteNumber")
										.txt(contact.faxNumber);
								}

								if (contact.emailAddress) {
									definedTradeContact
										.ele("ram:EmailURIUniversalCommunication")
										.ele("ram:URIID")
										.txt(contact.emailAddress);
								}
							}
						}

						if (line.delivery.recipient.postalAddress) {
							const postalTradeAddress = shipToTradeParty.ele(
								"ram:PostalTradeAddress",
							);

							if (line.delivery.recipient.postalAddress.postCode) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(line.delivery.recipient.postalAddress.postCode);
							}
							if (line.delivery.recipient.postalAddress.line1) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(line.delivery.recipient.postalAddress.line1);
							}
							if (line.delivery.recipient.postalAddress.line2) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(line.delivery.recipient.postalAddress.line2);
							}
							if (line.delivery.recipient.postalAddress.line3) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(line.delivery.recipient.postalAddress.line3);
							}
							if (line.delivery.recipient.postalAddress.city) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(line.delivery.recipient.postalAddress.city);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(line.delivery.recipient.postalAddress.countryCode.value);
							if (line.delivery.recipient.postalAddress.countrySubdivision) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										line.delivery.recipient.postalAddress.countrySubdivision,
									);
							}
						}

						if (line.delivery.recipient.electronicAddress) {
							shipToTradeParty
								.ele("ram:URIUniversalCommunication")
								.ele("ram:URIID")
								.txt(line.delivery.recipient.electronicAddress.identifier)
								.att(
									"schemeID",
									line.delivery.recipient.electronicAddress.schemeId,
								);
						}

						if (line.delivery.recipient.taxRegistration?.vat?.id) {
							const specifiedTaxRegistration = shipToTradeParty.ele(
								"ram:SpecifiedTaxRegistration",
							);
							specifiedTaxRegistration
								.ele("ram:ID")
								.txt(line.delivery.recipient.taxRegistration.vat.id.identifier)
								.att("schemeID", "VA");
						}
					}

					if (line.delivery.deviatingFinalRecipient) {
						const ultimateShipToTradeParty = specifiedLineTradeDelivery.ele(
							"ram:UltimateShipToTradeParty",
						);

						if (line.delivery.deviatingFinalRecipient.id) {
							ultimateShipToTradeParty
								.ele("ram:ID")
								.txt(line.delivery.deviatingFinalRecipient.id.identifier);
						}

						if (
							line.delivery.deviatingFinalRecipient.globalId?.length &&
							line.delivery.deviatingFinalRecipient.globalId.length > 0
						) {
							for (const id of line.delivery.deviatingFinalRecipient.globalId) {
								const globalId = ultimateShipToTradeParty.ele("ram:GlobalID");
								globalId.txt(id.identifier);
								if (id.schemeId) {
									globalId.att("schemeID", id.schemeId);
								}
							}
						}

						ultimateShipToTradeParty
							.ele("ram:Name")
							.txt(line.delivery.deviatingFinalRecipient.name);

						if (line.delivery.deviatingFinalRecipient.roleCode) {
							ultimateShipToTradeParty
								.ele("ram:RoleCode")
								.txt(line.delivery.deviatingFinalRecipient.roleCode.value);
						}

						if (line.delivery.deviatingFinalRecipient.organization) {
							const specifiedLegalOrganization = ultimateShipToTradeParty.ele(
								"ram:SpecifiedLegalOrganization",
							);

							if (line.delivery.deviatingFinalRecipient.organization.id) {
								const id = specifiedLegalOrganization.ele("ram:ID");
								id.txt(
									line.delivery.deviatingFinalRecipient.organization.id
										.identifier,
								);
								if (
									line.delivery.deviatingFinalRecipient.organization.id.schemeId
								) {
									id.att(
										"schemeID",
										line.delivery.deviatingFinalRecipient.organization.id
											.schemeId,
									);
								}
							}

							if (
								line.delivery.deviatingFinalRecipient.organization.tradingName
							) {
								specifiedLegalOrganization
									.ele("ram:TradingBusinessName")
									.txt(
										line.delivery.deviatingFinalRecipient.organization
											.tradingName,
									);
							}
						}

						if (
							line.delivery.deviatingFinalRecipient.contact?.length &&
							line.delivery.deviatingFinalRecipient.contact.length > 0
						) {
							for (const contact of line.delivery.deviatingFinalRecipient
								.contact) {
								const definedTradeContact = ultimateShipToTradeParty.ele(
									"ram:DefinedTradeContact",
								);

								if (contact.personName) {
									definedTradeContact
										.ele("ram:PersonName")
										.txt(contact.personName);
								}

								if (contact.departmentName) {
									definedTradeContact
										.ele("ram:DepartmentName")
										.txt(contact.departmentName);
								}

								if (contact.typeCode) {
									definedTradeContact
										.ele("ram:TypeCode")
										.txt(contact.typeCode.value);
								}

								if (contact.phoneNumber) {
									definedTradeContact
										.ele("ram:TelephoneUniversalCommunication")
										.ele("ram:CompleteNumber")
										.txt(contact.phoneNumber);
								}

								if (contact.faxNumber) {
									definedTradeContact
										.ele("ram:FaxUniversalCommunication")
										.ele("ram:CompleteNumber")
										.txt(contact.faxNumber);
								}

								if (contact.emailAddress) {
									definedTradeContact
										.ele("ram:EmailURIUniversalCommunication")
										.ele("ram:URIID")
										.txt(contact.emailAddress);
								}
							}
						}

						if (line.delivery.deviatingFinalRecipient.postalAddress) {
							const postalTradeAddress = ultimateShipToTradeParty.ele(
								"ram:PostalTradeAddress",
							);

							if (
								line.delivery.deviatingFinalRecipient.postalAddress.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										line.delivery.deviatingFinalRecipient.postalAddress
											.postCode,
									);
							}
							if (line.delivery.deviatingFinalRecipient.postalAddress.line1) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										line.delivery.deviatingFinalRecipient.postalAddress.line1,
									);
							}
							if (line.delivery.deviatingFinalRecipient.postalAddress.line2) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										line.delivery.deviatingFinalRecipient.postalAddress.line2,
									);
							}
							if (line.delivery.deviatingFinalRecipient.postalAddress.line3) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										line.delivery.deviatingFinalRecipient.postalAddress.line3,
									);
							}
							if (line.delivery.deviatingFinalRecipient.postalAddress.city) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										line.delivery.deviatingFinalRecipient.postalAddress.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									line.delivery.deviatingFinalRecipient.postalAddress
										.countryCode.value,
								);
							if (
								line.delivery.deviatingFinalRecipient.postalAddress
									.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										line.delivery.deviatingFinalRecipient.postalAddress
											.countrySubdivision,
									);
							}
						}

						if (line.delivery.deviatingFinalRecipient.electronicAddress) {
							ultimateShipToTradeParty
								.ele("ram:URIUniversalCommunication")
								.ele("ram:URIID")
								.txt(
									line.delivery.deviatingFinalRecipient.electronicAddress
										.identifier,
								)
								.att(
									"schemeID",
									line.delivery.deviatingFinalRecipient.electronicAddress
										.schemeId,
								);
						}

						if (
							line.delivery.deviatingFinalRecipient.taxRegistration?.vat?.id
						) {
							const specifiedTaxRegistration = ultimateShipToTradeParty.ele(
								"ram:SpecifiedTaxRegistration",
							);
							specifiedTaxRegistration
								.ele("ram:ID")
								.txt(
									line.delivery.deviatingFinalRecipient.taxRegistration.vat.id
										.identifier,
								)
								.att("schemeID", "VA");
						}
					}

					if (line.delivery.actualDelivery) {
						const actualDeliverySupplyChainEvent =
							specifiedLineTradeDelivery.ele(
								"ram:ActualDeliverySupplyChainEvent",
							);

						if (line.delivery.actualDelivery.deliveryTime) {
							actualDeliverySupplyChainEvent
								.ele("ram:OccurrenceDateTime")
								.ele("udt:DateTimeString")
								.txt(line.delivery.actualDelivery.deliveryTime.value)
								.att(
									"format",
									line.delivery.actualDelivery.deliveryTime.format,
								);
						}
					}

					if (line.delivery.despatchAdviceReferencedDocument) {
						const despatchAdviceReferencedDocument =
							specifiedLineTradeDelivery.ele(
								"ram:DespatchAdviceReferencedDocument",
							);
						despatchAdviceReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(
								line.delivery.despatchAdviceReferencedDocument.issuerAssignedId,
							);

						if (line.delivery.despatchAdviceReferencedDocument.lineId) {
							despatchAdviceReferencedDocument
								.ele("ram:LineID")
								.txt(line.delivery.despatchAdviceReferencedDocument.lineId);
						}

						if (line.delivery.despatchAdviceReferencedDocument.date) {
							despatchAdviceReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(line.delivery.despatchAdviceReferencedDocument.date.value)
								.att(
									"format",
									line.delivery.despatchAdviceReferencedDocument.date.format,
								);
						}
					}

					if (line.delivery.receivingAdviceReferencedDocument) {
						const receivingAdviceReferencedDocument =
							specifiedLineTradeDelivery.ele(
								"ram:ReceivingAdviceReferencedDocument",
							);
						receivingAdviceReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(
								line.delivery.receivingAdviceReferencedDocument
									.issuerAssignedId,
							);

						if (line.delivery.receivingAdviceReferencedDocument.lineId) {
							receivingAdviceReferencedDocument
								.ele("ram:LineID")
								.txt(line.delivery.receivingAdviceReferencedDocument.lineId);
						}

						if (line.delivery.receivingAdviceReferencedDocument.date) {
							receivingAdviceReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(line.delivery.receivingAdviceReferencedDocument.date.value)
								.att(
									"format",
									line.delivery.receivingAdviceReferencedDocument.date.format,
								);
						}
					}

					if (line.delivery.deliveryNoteReferencedDocument) {
						const deliveryNoteReferencedDocument =
							specifiedLineTradeDelivery.ele(
								"ram:DeliveryNoteReferencedDocument",
							);
						deliveryNoteReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(
								line.delivery.deliveryNoteReferencedDocument.issuerAssignedId,
							);

						if (line.delivery.deliveryNoteReferencedDocument.lineId) {
							deliveryNoteReferencedDocument
								.ele("ram:LineID")
								.txt(line.delivery.deliveryNoteReferencedDocument.lineId);
						}

						if (line.delivery.deliveryNoteReferencedDocument.date) {
							deliveryNoteReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(line.delivery.deliveryNoteReferencedDocument.date.value)
								.att(
									"format",
									line.delivery.deliveryNoteReferencedDocument.date.format,
								);
						}
					}
				}

				if (line.billing) {
					const specifiedLineTradeSettlement = findNode(
						`BG-30-00[${i}]`,
						lineNode,
						(node) => node.node.nodeName === "ram:SpecifiedLineTradeSettlement",
						() => lineNode.ele("ram:SpecifiedLineTradeSettlement"),
					);

					// vatBreakdown
					if (
						line.billing.vatBreakdown?.length &&
						line.billing.vatBreakdown.length > 0
					) {
						const applicableTradeTaxNodes = findAllNodes(
							specifiedLineTradeSettlement,
							(node) => node.node.nodeName === "ram:ApplicableTradeTax",
						);
						for (let j = 0; j < line.billing.vatBreakdown.length; j++) {
							const vatBreakdown = line.billing.vatBreakdown[j];
							const applicableTradeTax = applicableTradeTaxNodes[j];
							if (!vatBreakdown || !applicableTradeTax) continue;

							if (vatBreakdown.calculatedAmount) {
								const calculatedAmount = fragment().ele("ram:CalculatedAmount");
								calculatedAmount.txt(
									vatBreakdown.calculatedAmount.value.toString(),
								);
								const refNode =
									findNode(
										`BT-151-0[${i}][${j}]`,
										applicableTradeTax,
										(node) => node.node.nodeName === "ram:TypeCode",
									)?.node ?? null;
								applicableTradeTax.node.insertBefore(
									calculatedAmount.node,
									refNode,
								);
							}

							if (vatBreakdown.exemptionReason) {
								const exemptionReason = fragment().ele("ram:ExemptionReason");
								exemptionReason.txt(vatBreakdown.exemptionReason);
								const refNode =
									findNode(
										`BT-151[${i}][${j}]`,
										applicableTradeTax,
										(node) => node.node.nodeName === "ram:CategoryCode",
									)?.node ?? null;
								applicableTradeTax.node.insertBefore(
									exemptionReason.node,
									refNode,
								);
							}

							if (vatBreakdown.exemptionReasonCode) {
								const exemptionReasonCode = fragment().ele(
									"ram:ExemptionReasonCode",
								);
								exemptionReasonCode.txt(vatBreakdown.exemptionReasonCode.value);
								const refNode =
									findNode(
										`BT-152[${i}][${j}]`,
										applicableTradeTax,
										(node) =>
											node.node.nodeName === "ram:RateApplicablePercent",
									)?.node ?? null;
								applicableTradeTax.node.insertBefore(
									exemptionReasonCode.node,
									refNode,
								);
							}

							if (vatBreakdown.dueDateTypeCode) {
								const dueDateTypeCode = fragment().ele("ram:DueDateTypeCode");
								dueDateTypeCode.txt(vatBreakdown.dueDateTypeCode.value);
								const refNode =
									findNode(
										`BT-152[${i}][${j}]`,
										applicableTradeTax,
										(node) =>
											node.node.nodeName === "ram:RateApplicablePercent",
									)?.node ?? null;
								applicableTradeTax.node.insertBefore(
									dueDateTypeCode.node,
									refNode,
								);
							}
						}
					}

					if (line.billing.itemTotals) {
						const specifiedTradeSettlementLineMonetarySummation = findNode(
							`BT-131-00[${i}]`,
							specifiedLineTradeSettlement,
							(node) =>
								node.node.nodeName ===
								"ram:SpecifiedTradeSettlementLineMonetarySummation",
							(fragment) => {
								const specifiedTradeSettlementLineMonetarySummation =
									fragment.ele(
										"ram:SpecifiedTradeSettlementLineMonetarySummation",
									);
								const refNode =
									(
										getCachedNode(`BT-128-00[${i}]`) ||
										getCachedNode(`BT-133-00[${i}]`) ||
										setCachedNode(
											(node) =>
												node.node.nodeName ===
												"ram:AdditionalReferencedDocument"
													? `BT-128-00[${i}]`
													: `BT-133-00[${i}]`,
											specifiedLineTradeSettlement.find((node) =>
												[
													"ram:AdditionalReferencedDocument",
													"ram:ReceivableSpecifiedTradeAccountingAccount",
												].includes(node.node.nodeName),
											),
										)
									)?.node ?? null;
								specifiedLineTradeSettlement.node.insertBefore(
									specifiedTradeSettlementLineMonetarySummation.node,
									refNode,
								);
								return specifiedTradeSettlementLineMonetarySummation;
							},
						);

						if (line.billing.itemTotals.chargeTotalAmount) {
							specifiedTradeSettlementLineMonetarySummation
								.ele("ram:ChargeTotalAmount")
								.txt(
									line.billing.itemTotals.chargeTotalAmount.value.toString(),
								);
						}
						if (line.billing.itemTotals.allowanceTotalAmount) {
							specifiedTradeSettlementLineMonetarySummation
								.ele("ram:AllowanceTotalAmount")
								.txt(
									line.billing.itemTotals.allowanceTotalAmount.value.toString(),
								);
						}
						if (line.billing.itemTotals.taxTotalAmount) {
							const taxTotalAmount =
								specifiedTradeSettlementLineMonetarySummation.ele(
									"ram:TaxTotalAmount",
								);
							taxTotalAmount.txt(
								line.billing.itemTotals.taxTotalAmount.value.toString(),
							);
							if (line.billing.itemTotals.taxTotalAmount.currency) {
								// TODO: set currency to invocie currency code by default
								taxTotalAmount.att(
									"currencyID",
									line.billing.itemTotals.taxTotalAmount.currency,
								);
							}
						}
						if (line.billing.itemTotals.taxTotalAmountInAccountingCurrency) {
							const taxTotalAmount =
								specifiedTradeSettlementLineMonetarySummation.ele(
									"ram:TaxTotalAmount",
								);
							taxTotalAmount.txt(
								line.billing.itemTotals.taxTotalAmountInAccountingCurrency.value.toString(),
							);
							if (
								line.billing.itemTotals.taxTotalAmountInAccountingCurrency
									.currency
							) {
								// TODO: set currency to invoice tax currency code by default
								taxTotalAmount.att(
									"currencyID",
									line.billing.itemTotals.taxTotalAmountInAccountingCurrency
										.currency,
								);
							}
						}
						if (line.billing.itemTotals.grandTotalAmount) {
							specifiedTradeSettlementLineMonetarySummation
								.ele("ram:GrandTotalAmount")
								.txt(line.billing.itemTotals.grandTotalAmount.value.toString());
						}
						if (line.billing.itemTotals.totalAllowanceChargeAmount) {
							specifiedTradeSettlementLineMonetarySummation
								.ele("ram:TotalAllowanceChargeAmount")
								.txt(
									line.billing.itemTotals.totalAllowanceChargeAmount.value.toString(),
								);
						}
					}

					if (
						line.billing.precendingInvoices?.length &&
						line.billing.precendingInvoices.length > 0
					) {
						const refNode =
							(
								getCachedNode(`BT-128-00[${i}]`) ||
								getCachedNode(`BT-133-00[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:AdditionalReferencedDocument"
											? `BT-128-00[${i}]`
											: `BT-133-00[${i}]`,
									specifiedLineTradeSettlement.find((node) =>
										[
											"ram:AdditionalReferencedDocument",
											"ram:ReceivableSpecifiedTradeAccountingAccount",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						for (const precendingInvoice of line.billing.precendingInvoices) {
							const invoiceReferencedDocument = fragment().ele(
								"ram:InvoiceReferencedDocument",
							);
							specifiedLineTradeSettlement.node.insertBefore(
								invoiceReferencedDocument.node,
								refNode,
							);

							invoiceReferencedDocument
								.ele("ram:IssuerAssignedID")
								.txt(precendingInvoice.issuerAssignedId);

							if (precendingInvoice.lineId) {
								invoiceReferencedDocument
									.ele("ram:LineID")
									.txt(precendingInvoice.lineId);
							}

							if (precendingInvoice.typeCode) {
								invoiceReferencedDocument
									.ele("ram:TypeCode")
									.txt(precendingInvoice.typeCode.value);
							}

							if (precendingInvoice.date) {
								invoiceReferencedDocument
									.ele("ram:FormattedIssueDateTime")
									.ele("qdt:DateTimeString")
									.txt(precendingInvoice.date.value)
									.att("format", precendingInvoice.date.format);
							}
						}
					}

					if (line.billing.accountingReference) {
						const receivableSpecifiedTradeAccountingAccountNodes = findAllNodes(
							specifiedLineTradeSettlement,
							(node) =>
								node.node.nodeName ===
								"ram:ReceivableSpecifiedTradeAccountingAccount",
						);
						for (let j = 0; j < line.billing.accountingReference.length; j++) {
							const accountingReference = line.billing.accountingReference[j];
							const receivableSpecifiedTradeAccountingAccount =
								receivableSpecifiedTradeAccountingAccountNodes[j];
							if (
								!accountingReference ||
								!receivableSpecifiedTradeAccountingAccount
							)
								continue;

							if (accountingReference.typeCode) {
								receivableSpecifiedTradeAccountingAccount
									.ele("ram:TypeCode")
									.txt(accountingReference.typeCode);
							}
						}
					}
				}
			}

			if (data.transaction.contract) {
				const applicableHeaderTradeAgreement = findNode(
					"BT-10-00",
					supplyChainTradeTransaction,
					(node) => node.node.nodeName === "ram:ApplicableHeaderTradeAgreement",
					(fragment) => {
						const applicableHeaderTradeAgreement = fragment.ele(
							"ram:ApplicableHeaderTradeAgreement",
						);
						const refNode =
							(
								getCachedNode("BG-13-00") ||
								getCachedNode("BG-19") ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:ApplicableHeaderTradeDelivery"
											? "BG-13-00"
											: "BG-19",
									supplyChainTradeTransaction.find((node) =>
										[
											"ram:ApplicableHeaderTradeDelivery",
											"ram:ApplicableHeaderTradeSettlement",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						supplyChainTradeTransaction.node.insertBefore(
							applicableHeaderTradeAgreement.node,
							refNode,
						);
						return applicableHeaderTradeAgreement;
					},
				);

				if (data.transaction.contract.seller) {
					const sellerTradeParty = findNode(
						"BG-4",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:SellerTradeParty",
						(fragment) => {
							const sellerTradeParty = fragment.ele("ram:SellerTradeParty");
							const refNode =
								findNode(
									"BG-7",
									applicableHeaderTradeAgreement,
									(node) => node.node.nodeName === "ram:BuyerTradeParty",
								)?.node ?? null;
							applicableHeaderTradeAgreement.node.insertBefore(
								sellerTradeParty.node,
								refNode,
							);
							return applicableHeaderTradeAgreement;
						},
					);

					if (data.transaction.contract.seller.roleCode) {
						const roleCode = fragment().ele("ram:RoleCode");
						roleCode.txt(data.transaction.contract.seller.roleCode.value);
						const refNode =
							(
								getCachedNode("BT-33") ||
								getCachedNode("BT-30-00") ||
								getCachedNode("BG-6[0]") ||
								getCachedNode("BG-5") ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:Description"
											? "BT-33"
											: node.node.nodeName === "ram:SpecifiedLegalOrganization"
												? "BT-30-00"
												: node.node.nodeName === "ram:DefinedTradeContact"
													? "BG-6[0]"
													: "BG-5",
									sellerTradeParty.find((node) =>
										[
											"ram:Description",
											"ram:SpecifiedLegalOrganization",
											"ram:DefinedTradeContact",
											"ram:PostalTradeAddress",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						sellerTradeParty.node.insertBefore(roleCode.node, refNode);
					}

					if (data.transaction.contract.seller.organization) {
						const specifiedLegalOrganization = findNode(
							"BT-30-00",
							sellerTradeParty,
							(node) => node.node.nodeName === "ram:SpecifiedLegalOrganization",
							(fragment) => {
								const specifiedLegalOrganization = fragment.ele(
									"ram:SpecifiedLegalOrganization",
								);
								const refNode =
									(
										getCachedNode("BG-6[0]") ||
										getCachedNode("BG-5") ||
										setCachedNode(
											(node) =>
												node.node.nodeName === "ram:DefinedTradeContact"
													? "BG-6"
													: "BG-5",
											sellerTradeParty.find((node) =>
												[
													"ram:DefinedTradeContact",
													"ram:PostalTradeAddress",
												].includes(node.node.nodeName),
											),
										)
									)?.node ?? null;
								sellerTradeParty.node.insertBefore(
									specifiedLegalOrganization.node,
									refNode,
								);
								return specifiedLegalOrganization;
							},
						);

						if (data.transaction.contract.seller.organization.postalAddress) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.contract.seller.organization.postalAddress
									.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.contract.seller.organization.postalAddress
											.postCode,
									);
							}
							if (
								data.transaction.contract.seller.organization.postalAddress
									.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.contract.seller.organization.postalAddress
											.line1,
									);
							}
							if (
								data.transaction.contract.seller.organization.postalAddress
									.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.contract.seller.organization.postalAddress
											.line2,
									);
							}
							if (
								data.transaction.contract.seller.organization.postalAddress
									.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.contract.seller.organization.postalAddress
											.line3,
									);
							}
							if (
								data.transaction.contract.seller.organization.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.contract.seller.organization.postalAddress
											.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.contract.seller.organization.postalAddress
										.countryCode.value,
								);
							if (
								data.transaction.contract.seller.organization.postalAddress
									.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.contract.seller.organization.postalAddress
											.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.contract.seller.contact?.length &&
						data.transaction.contract.seller.contact.length > 0
					) {
						const definedTradeContactNodes = findAllNodes(
							sellerTradeParty,
							(node) => node.node.nodeName === "ram:DefinedTradeContact",
						);
						for (
							let i = 0;
							i < data.transaction.contract.seller.contact.length;
							i++
						) {
							const contact = data.transaction.contract.seller.contact[i];
							const definedTradeContact = definedTradeContactNodes[i];
							if (!contact || !definedTradeContact) continue;

							if (contact.typeCode) {
								const typeCode = fragment().ele("ram:TypeCode");
								typeCode.txt(contact.typeCode.value);
								const refNode =
									(
										getCachedNode("BT-42-00") ||
										getCachedNode("BT-43-00") ||
										setCachedNode(
											(node) =>
												node.node.nodeName ===
												"ram:TelephoneUniversalCommuniaction"
													? "BT-42-00"
													: "BT-43-00",
											definedTradeContact.find((node) =>
												[
													"ram:TelephoneUniversalCommunication",
													"ram:EmailURIUniversalCommunication",
												].includes(node.node.nodeName),
											),
										)
									)?.node ?? null;
								definedTradeContact.node.insertBefore(typeCode.node, refNode);
							}

							if (contact.faxNumber) {
								const faxUniversalCommunication = fragment().ele(
									"ram:FaxUniversalCommunication",
								);
								faxUniversalCommunication
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
								const refNode =
									findNode(
										"BT-43-00",
										definedTradeContact,
										(node) =>
											node.node.nodeName ===
											"ram:EmailURIUniversalCommunication",
									)?.node ?? null;
								definedTradeContact.node.insertBefore(
									faxUniversalCommunication.node,
									refNode,
								);
							}
						}
					}
				}

				if (data.transaction.contract.buyer) {
					const buyerTradeParty = findNode(
						"BG-7",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:BuyerTradeParty",
						(fragment) => {
							const buyerTradeParty = fragment.ele("ram:BuyerTradeParty");
							const refNode =
								(
									getCachedNode("BG-11") ||
									getCachedNode("BT-14-00") ||
									getCachedNode("BT-13-00") ||
									getCachedNode("BT-12-00") ||
									getCachedNode("BG-24[0]") ||
									getCachedNode("BT-17-00[0]") ||
									getCachedNode("BT-18-00[0]") ||
									getCachedNode("BT-11-00") ||
									setCachedNode(
										(node) => {
											if (
												node.node.nodeName ===
												"ram:SellerTaxRepresentativeTradeParty"
											) {
												return "BG-11";
											}
											if (
												node.node.nodeName ===
												"ram:SellerOrderReferencedDocument"
											) {
												return "BT-14-00";
											}
											if (
												node.node.nodeName ===
												"ram:BuyerOrderReferencedDocument"
											) {
												return "BT-13-00";
											}
											if (
												node.node.nodeName === "ram:ContractReferencedDocument"
											) {
												return "BT-12-00";
											}
											if (
												node.node.nodeName ===
												"ram:AdditionalReferencedDocument"
											) {
												const typeCode = [...node.node.childNodes].find(
													(child) => child.nodeName === "ram:TypeCode",
												);

												switch (typeCode?.textContent?.trim()) {
													case "916":
														return "BG-24[0]";
													case "50":
														return "BT-17-00";
													case "130":
														return "BT-18-00[0]";
												}
											}
											if (
												node.node.nodeName === "ram:SpecifiedProcuringProject"
											) {
												return "BT-11-00";
											}
										},
										applicableHeaderTradeAgreement.find((node) =>
											[
												"ram:SellerTaxRepresentativeTradeParty",
												"ram:SellerOrderReferencedDocument",
												"ram:BuyerOrderReferencedDocument",
												"ram:ContractReferencedDocument",
												"ram:AdditionalReferencedDocument",
												"ram:SpecifiedProcuringProject",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							applicableHeaderTradeAgreement.node.insertBefore(
								buyerTradeParty.node,
								refNode,
							);
							return buyerTradeParty;
						},
					);

					if (data.transaction.contract.buyer.roleCode) {
						const roleCode = fragment().ele("ram:RoleCode");
						roleCode.txt(data.transaction.contract.buyer.roleCode.value);
						const refNode =
							(
								getCachedNode("BT-47-00") ||
								getCachedNode("BG-9") ||
								getCachedNode("BG-8") ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:SpecifiedLegalOrganization"
											? "BT-47-00"
											: node.node.nodeName === "ram:DefinedTradeContact"
												? "BG-9"
												: "BG-8",
									buyerTradeParty.find((node) =>
										[
											"ram:SpecifiedLegalOrganization",
											"ram:DefinedTradeContact",
											"ram:PostalTradeAddress",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						buyerTradeParty.node.insertBefore(roleCode.node, refNode);
					}

					if (data.transaction.contract.buyer.description) {
						const description = fragment().ele("ram:Description");
						description.txt(data.transaction.contract.buyer.description);
						const refNode =
							(
								getCachedNode("BT-47-00") ||
								getCachedNode("BG-9") ||
								getCachedNode("BG-8") ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:SpecifiedLegalOrganization"
											? "BT-47-00"
											: node.node.nodeName === "ram:DefinedTradeContact"
												? "BG-9"
												: "BG-8",
									buyerTradeParty.find((node) =>
										[
											"ram:SpecifiedLegalOrganization",
											"ram:DefinedTradeContact",
											"ram:PostalTradeAddress",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						buyerTradeParty.node.insertBefore(description.node, refNode);
					}

					if (data.transaction.contract.buyer.organization) {
						const specifiedLegalOrganization = findNode(
							"BT-47-00",
							buyerTradeParty,
							(node) => node.node.nodeName === "ram:SpecifiedLegalOrganization",
							(fragment) => {
								const specifiedLegalOrganization = fragment.ele(
									"ram:SpecifiedLegalOrganization",
								);
								const refNode =
									(
										getCachedNode("BG-9") ||
										getCachedNode("BG-8") ||
										setCachedNode(
											(node) =>
												node.node.nodeName === "ram:DefinedTradeContact"
													? "BG-9"
													: "BG-8",
											buyerTradeParty.find((node) =>
												[
													"ram:DefinedTradeContact",
													"ram:PostalTradeAddress",
												].includes(node.node.nodeName),
											),
										)
									)?.node ?? null;
								buyerTradeParty.node.insertBefore(
									specifiedLegalOrganization.node,
									refNode,
								);
								return specifiedLegalOrganization;
							},
						);

						if (data.transaction.contract.buyer.organization.postalAddress) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.contract.buyer.organization.postalAddress
									.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.contract.buyer.organization.postalAddress
											.postCode,
									);
							}
							if (
								data.transaction.contract.buyer.organization.postalAddress.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.contract.buyer.organization.postalAddress
											.line1,
									);
							}
							if (
								data.transaction.contract.buyer.organization.postalAddress.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.contract.buyer.organization.postalAddress
											.line2,
									);
							}
							if (
								data.transaction.contract.buyer.organization.postalAddress.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.contract.buyer.organization.postalAddress
											.line3,
									);
							}
							if (
								data.transaction.contract.buyer.organization.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.contract.buyer.organization.postalAddress
											.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.contract.buyer.organization.postalAddress
										.countryCode.value,
								);
							if (
								data.transaction.contract.buyer.organization.postalAddress
									.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.contract.buyer.organization.postalAddress
											.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.contract.buyer.contact?.length &&
						data.transaction.contract.buyer.contact.length > 0
					) {
						const definedTradeContactNodes = findAllNodes(
							buyerTradeParty,
							(node) => node.node.nodeName === "ram:DefinedTradeContact",
						);
						for (
							let i = 0;
							i < data.transaction.contract.buyer.contact.length;
							i++
						) {
							const contact = data.transaction.contract.buyer.contact[i];
							const definedTradeContact = definedTradeContactNodes[i];
							if (!contact || !definedTradeContact) continue;

							if (contact.typeCode) {
								const typeCode = fragment().ele("ram:TypeCode");
								typeCode.txt(contact.typeCode.value);
								const refNode =
									(
										getCachedNode("BT-57-00") ||
										getCachedNode("BT-58-00") ||
										setCachedNode(
											(node) =>
												node.node.nodeName === "ram:TelephoneUniversalNumber"
													? "BT-57-00"
													: "BT-58-00",
											definedTradeContact.find((node) =>
												[
													"ram:TelephoneUniversalNumber",
													"ram:EmailURIUniversalCommunication",
												].includes(node.node.nodeName),
											),
										)
									)?.node ?? null;
								definedTradeContact.node.insertBefore(typeCode.node, refNode);
							}
							if (contact.faxNumber) {
								const faxUniversalCommunication = fragment().ele(
									"ram:FaxUniversalCommunication",
								);
								faxUniversalCommunication
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
								const refNode =
									findNode(
										"BT-58-00",
										definedTradeContact,
										(node) =>
											node.node.nodeName ===
											"ram:EmailURIUniversalCommunication",
									)?.node ?? null;
								definedTradeContact.node.insertBefore(
									faxUniversalCommunication.node,
									refNode,
								);
							}
						}
					}
				}

				if (data.transaction.contract.salesAgent) {
					const salesAgentTradeParty = fragment().ele(
						"ram:SalesAgentTradeParty",
					);
					const refNode =
						(
							getCachedNode("BG-11") ||
							getCachedNode("BT-14-00") ||
							getCachedNode("BT-13-00") ||
							getCachedNode("BT-12-00") ||
							getCachedNode("BG-24[0]") ||
							getCachedNode("BT-17-00[0]") ||
							getCachedNode("BT-18-00[0]") ||
							getCachedNode("BT-11-00") ||
							setCachedNode(
								(node) => {
									if (
										node.node.nodeName ===
										"ram:SellerTaxRepresentativeTradeParty"
									) {
										return "BG-11";
									}
									if (
										node.node.nodeName === "ram:SellerOrderReferencedDocument"
									) {
										return "BT-14-00";
									}
									if (
										node.node.nodeName === "ram:BuyerOrderReferencedDocument"
									) {
										return "BT-13-00";
									}
									if (node.node.nodeName === "ram:ContractReferencedDocument") {
										return "BT-12-00";
									}
									if (
										node.node.nodeName === "ram:AdditionalReferencedDocument"
									) {
										const typeCode = [...node.node.childNodes].find(
											(child) => child.nodeName === "ram:TypeCode",
										);

										switch (typeCode?.textContent?.trim()) {
											case "916":
												return "BG-24[0]";
											case "50":
												return "BT-17-00[0]";
											case "130":
												return "BT-18-00[0]";
										}
									}
									if (node.node.nodeName === "ram:SpecifiedProcuringProject") {
										return "BT-11-00";
									}
								},
								applicableHeaderTradeAgreement.find((node) =>
									[
										"ram:SellerTaxRepresentativeTradeParty",
										"ram:SellerOrderReferencedDocument",
										"ram:BuyerOrderReferencedDocument",
										"ram:ContractReferencedDocument",
										"ram:AdditionalReferencedDocument",
										"ram:SpecifiedProcuringProject",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeAgreement.node.insertBefore(
						salesAgentTradeParty.node,
						refNode,
					);

					if (data.transaction.contract.salesAgent.id) {
						salesAgentTradeParty
							.ele("ram:ID")
							.txt(data.transaction.contract.salesAgent.id.identifier);
					}
					if (
						data.transaction.contract.salesAgent.globalId?.length &&
						data.transaction.contract.salesAgent.globalId.length > 0
					) {
						for (const id of data.transaction.contract.salesAgent.globalId) {
							const globalId = salesAgentTradeParty.ele("ram:GlobalID");
							globalId.txt(id.identifier);
							if (id.schemeId) {
								globalId.att("schemeID", id.schemeId);
							}
						}
					}
					salesAgentTradeParty
						.ele("ram:Name")
						.txt(data.transaction.contract.salesAgent.name);
					if (data.transaction.contract.salesAgent.roleCode) {
						salesAgentTradeParty
							.ele("ram:RoleCode")
							.txt(data.transaction.contract.salesAgent.roleCode.value);
					}
					if (data.transaction.contract.salesAgent.organization) {
						const specifiedLegalOrganization = salesAgentTradeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);

						if (data.transaction.contract.salesAgent.organization.id) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(
								data.transaction.contract.salesAgent.organization.id.identifier,
							);
							if (
								data.transaction.contract.salesAgent.organization.id.schemeId
							) {
								id.att(
									"schemeID",
									data.transaction.contract.salesAgent.organization.id.schemeId,
								);
							}
						}

						if (data.transaction.contract.salesAgent.organization.tradingName) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(
									data.transaction.contract.salesAgent.organization.tradingName,
								);
						}

						if (
							data.transaction.contract.salesAgent.organization.postalAddress
						) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.contract.salesAgent.organization.postalAddress
									.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.contract.salesAgent.organization
											.postalAddress.postCode,
									);
							}
							if (
								data.transaction.contract.salesAgent.organization.postalAddress
									.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.contract.salesAgent.organization
											.postalAddress.line1,
									);
							}
							if (
								data.transaction.contract.salesAgent.organization.postalAddress
									.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.contract.salesAgent.organization
											.postalAddress.line2,
									);
							}
							if (
								data.transaction.contract.salesAgent.organization.postalAddress
									.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.contract.salesAgent.organization
											.postalAddress.line3,
									);
							}
							if (
								data.transaction.contract.salesAgent.organization.postalAddress
									.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.contract.salesAgent.organization
											.postalAddress.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.contract.salesAgent.organization
										.postalAddress.countryCode.value,
								);
							if (
								data.transaction.contract.salesAgent.organization.postalAddress
									.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.contract.salesAgent.organization
											.postalAddress.countrySubdivision,
									);
							}
						}
					}
					if (
						data.transaction.contract.salesAgent.contact?.length &&
						data.transaction.contract.salesAgent.contact.length > 0
					) {
						for (const contact of data.transaction.contract.salesAgent
							.contact) {
							const definedTradeContact = salesAgentTradeParty.ele(
								"ram:DefinedTradeContact",
							);
							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					const postalTradeAddress = salesAgentTradeParty.ele(
						"ram:PostalTradeAddress",
					);

					if (data.transaction.contract.salesAgent.postalAddress.postCode) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(data.transaction.contract.salesAgent.postalAddress.postCode);
					}
					if (data.transaction.contract.salesAgent.postalAddress.line1) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(data.transaction.contract.salesAgent.postalAddress.line1);
					}
					if (data.transaction.contract.salesAgent.postalAddress.line2) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(data.transaction.contract.salesAgent.postalAddress.line2);
					}
					if (data.transaction.contract.salesAgent.postalAddress.line3) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(data.transaction.contract.salesAgent.postalAddress.line3);
					}
					if (data.transaction.contract.salesAgent.postalAddress.city) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(data.transaction.contract.salesAgent.postalAddress.city);
					}
					postalTradeAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.contract.salesAgent.postalAddress.countryCode
								.value,
						);
					if (
						data.transaction.contract.salesAgent.postalAddress
							.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.contract.salesAgent.postalAddress
									.countrySubdivision,
							);
					}

					if (data.transaction.contract.salesAgent.electronicAddress) {
						postalTradeAddress
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(
								data.transaction.contract.salesAgent.electronicAddress
									.identifier,
							)
							.att(
								"schemeID",
								data.transaction.contract.salesAgent.electronicAddress.schemeId,
							);
					}

					if (data.transaction.contract.salesAgent.taxRegistration?.vat?.id) {
						postalTradeAddress
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.contract.salesAgent.taxRegistration.vat.id
									.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.contract.buyerTaxRepresentative) {
					const buyerTaxRepresentativeParty = fragment().ele(
						"ram:BuyerTaxRepresentativeTradeParty",
					);
					const refNode =
						(
							getCachedNode("BG-11") ||
							getCachedNode("BT-14-00") ||
							getCachedNode("BT-13-00") ||
							getCachedNode("BT-12-00") ||
							getCachedNode("BG-24[0]") ||
							getCachedNode("BT-17-00[0]") ||
							getCachedNode("BT-18-00[0]") ||
							getCachedNode("BT-11-00") ||
							setCachedNode(
								(node) => {
									if (
										node.node.nodeName ===
										"ram:SellerTaxRepresentativeTradeParty"
									) {
										return "BG-11";
									}
									if (
										node.node.nodeName === "ram:SellerOrderReferencedDocument"
									) {
										return "BT-14-00";
									}
									if (
										node.node.nodeName === "ram:BuyerOrderReferencedDocument"
									) {
										return "BT-13-00";
									}
									if (node.node.nodeName === "ram:ContractReferencedDocument") {
										return "BT-12-00";
									}
									if (
										node.node.nodeName === "ram:AdditionalReferencedDocument"
									) {
										const typeCode = [...node.node.childNodes].find(
											(child) => child.nodeName === "ram:TypeCode",
										);

										switch (typeCode?.textContent?.trim()) {
											case "916":
												return "BG-24[0]";
											case "50":
												return "BT-17-00[0]";
											case "130":
												return "BT-18-00[0]";
										}
									}
									if (node.node.nodeName === "ram:SpecifiedProcuringProject") {
										return "BT-11-00";
									}
								},
								applicableHeaderTradeAgreement.find((node) =>
									[
										"ram:SellerTaxRepresentativeTradeParty",
										"ram:SellerOrderReferencedDocument",
										"ram:BuyerOrderReferencedDocument",
										"ram:ContractReferencedDocument",
										"ram:AdditionalReferencedDocument",
										"ram:SpecifiedProcuringProject",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeAgreement.node.insertBefore(
						buyerTaxRepresentativeParty.node,
						refNode,
					);

					if (data.transaction.contract.buyerTaxRepresentative.id) {
						buyerTaxRepresentativeParty
							.ele("ram:ID")
							.txt(
								data.transaction.contract.buyerTaxRepresentative.id.identifier,
							);
					}
					if (
						data.transaction.contract.buyerTaxRepresentative.globalId?.length &&
						data.transaction.contract.buyerTaxRepresentative.globalId.length > 0
					) {
						for (const id of data.transaction.contract.buyerTaxRepresentative
							.globalId) {
							const globalId = buyerTaxRepresentativeParty.ele("ram:GlobalID");
							globalId.txt(id.identifier);
							if (id.schemeId) {
								globalId.att("schemeID", id.schemeId);
							}
						}
					}
					if (data.transaction.contract.buyerTaxRepresentative.roleCode) {
						buyerTaxRepresentativeParty
							.ele("ram:RoleCode")
							.txt(
								data.transaction.contract.buyerTaxRepresentative.roleCode.value,
							);
					}
					if (data.transaction.contract.buyerTaxRepresentative.organization) {
						const specifiedLegalOrganization = buyerTaxRepresentativeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);
						if (
							data.transaction.contract.buyerTaxRepresentative.organization.id
						) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(
								data.transaction.contract.buyerTaxRepresentative.organization.id
									.identifier,
							);
							if (
								data.transaction.contract.buyerTaxRepresentative.organization.id
									.schemeId
							) {
								id.att(
									"schemeID",
									data.transaction.contract.buyerTaxRepresentative.organization
										.id.schemeId,
								);
							}
						}

						if (
							data.transaction.contract.buyerTaxRepresentative.organization
								.tradingName
						) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(
									data.transaction.contract.buyerTaxRepresentative.organization
										.tradingName,
								);
						}

						if (
							data.transaction.contract.buyerTaxRepresentative.organization
								.postalAddress
						) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.contract.buyerTaxRepresentative.organization
									.postalAddress.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.contract.buyerTaxRepresentative
											.organization.postalAddress.postCode,
									);
							}
							if (
								data.transaction.contract.buyerTaxRepresentative.organization
									.postalAddress.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.contract.buyerTaxRepresentative
											.organization.postalAddress.line1,
									);
							}
							if (
								data.transaction.contract.buyerTaxRepresentative.organization
									.postalAddress.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.contract.buyerTaxRepresentative
											.organization.postalAddress.line2,
									);
							}
							if (
								data.transaction.contract.buyerTaxRepresentative.organization
									.postalAddress.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.contract.buyerTaxRepresentative
											.organization.postalAddress.line3,
									);
							}
							if (
								data.transaction.contract.buyerTaxRepresentative.organization
									.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.contract.buyerTaxRepresentative
											.organization.postalAddress.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.contract.buyerTaxRepresentative.organization
										.postalAddress.countryCode.value,
								);
							if (
								data.transaction.contract.buyerTaxRepresentative.organization
									.postalAddress.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.contract.buyerTaxRepresentative
											.organization.postalAddress.countrySubdivision,
									);
							}
						}
					}
					if (
						data.transaction.contract.buyerTaxRepresentative.contact?.length &&
						data.transaction.contract.buyerTaxRepresentative.contact.length > 0
					) {
						for (const contact of data.transaction.contract
							.buyerTaxRepresentative.contact) {
							const definedTradeContact = buyerTaxRepresentativeParty.ele(
								"ram:DefinedTradeContact",
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}
					const postalTradeAddress = buyerTaxRepresentativeParty.ele(
						"ram:PostalTradeAddress",
					);
					if (
						data.transaction.contract.buyerTaxRepresentative.postalAddress
							.postCode
					) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(
								data.transaction.contract.buyerTaxRepresentative.postalAddress
									.postCode,
							);
					}
					if (
						data.transaction.contract.buyerTaxRepresentative.postalAddress.line1
					) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(
								data.transaction.contract.buyerTaxRepresentative.postalAddress
									.line1,
							);
					}
					if (
						data.transaction.contract.buyerTaxRepresentative.postalAddress.line2
					) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(
								data.transaction.contract.buyerTaxRepresentative.postalAddress
									.line2,
							);
					}
					if (
						data.transaction.contract.buyerTaxRepresentative.postalAddress.line3
					) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(
								data.transaction.contract.buyerTaxRepresentative.postalAddress
									.line3,
							);
					}
					if (
						data.transaction.contract.buyerTaxRepresentative.postalAddress.city
					) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(
								data.transaction.contract.buyerTaxRepresentative.postalAddress
									.city,
							);
					}
					postalTradeAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.contract.buyerTaxRepresentative.postalAddress
								.countryCode.value,
						);
					if (
						data.transaction.contract.buyerTaxRepresentative.postalAddress
							.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.contract.buyerTaxRepresentative.postalAddress
									.countrySubdivision,
							);
					}

					if (
						data.transaction.contract.buyerTaxRepresentative.electronicAddress
					) {
						buyerTaxRepresentativeParty
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(
								data.transaction.contract.buyerTaxRepresentative
									.electronicAddress.identifier,
							)
							.att(
								"schemeID",
								data.transaction.contract.buyerTaxRepresentative
									.electronicAddress.schemeId,
							);
					}
					if (
						data.transaction.contract.buyerTaxRepresentative.taxRegistration
							?.vat?.id
					) {
						buyerTaxRepresentativeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.contract.buyerTaxRepresentative.taxRegistration
									.vat.id.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.contract.sellerTaxRepresentative) {
					const sellerTaxRepresentativeTradeParty = findNode(
						"BG-11",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:SellerTaxRepresentativeTradeParty",
						(fragment) => {
							const sellerTaxRepresentativeTradeParty = fragment.ele(
								"ram:SellerTaxRepresentativeTradeParty",
							);
							const refNode =
								(
									getCachedNode("BT-14-00") ||
									getCachedNode("BT-13-00") ||
									getCachedNode("BT-12-00") ||
									getCachedNode("BG-24[0]") ||
									getCachedNode("BT-17-00[0]") ||
									getCachedNode("BT-18-00[0]") ||
									getCachedNode("BT-11-00") ||
									setCachedNode(
										(node) => {
											if (
												node.node.nodeName ===
												"ram:SellerOrderReferencedDocument"
											) {
												return "BT-14-00";
											}
											if (
												node.node.nodeName ===
												"ram:BuyerOrderReferencedDocument"
											) {
												return "BT-13-00";
											}
											if (
												node.node.nodeName === "ram:ContractReferencedDocument"
											) {
												return "BT-12-00";
											}
											if (
												node.node.nodeName ===
												"ram:AdditionalReferencedDocument"
											) {
												const typeCode = [...node.node.childNodes].find(
													(child) => child.nodeName === "ram:TypeCode",
												);

												switch (typeCode?.textContent?.trim()) {
													case "916":
														return "BG-24[0]";
													case "50":
														return "BT-17-00[0]";
													case "130":
														return "BT-18-00[0]";
												}
											}
											if (
												node.node.nodeName === "ram:SpecifiedProcuringProject"
											) {
												return "BT-11-00";
											}
										},
										applicableHeaderTradeAgreement.find((node) =>
											[
												"ram:SellerOrderReferencedDocument",
												"ram:BuyerOrderReferencedDocument",
												"ram:ContractReferencedDocument",
												"ram:AdditionalReferencedDocument",
												"ram:SpecifiedProcuringProject",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							applicableHeaderTradeAgreement.node.insertBefore(
								sellerTaxRepresentativeTradeParty.node,
								refNode,
							);
							return sellerTaxRepresentativeTradeParty;
						},
					);

					if (data.transaction.contract.sellerTaxRepresentative.id) {
						const id = fragment().ele("ram:ID");
						id.txt(
							data.transaction.contract.sellerTaxRepresentative.id.identifier,
						);
						const refNode =
							findNode(
								"BT-62",
								sellerTaxRepresentativeTradeParty,
								(node) => node.node.nodeName === "ram:Name",
							)?.node ?? null;
						sellerTaxRepresentativeTradeParty.node.insertBefore(
							id.node,
							refNode,
						);
					}

					if (
						data.transaction.contract.sellerTaxRepresentative.globalId
							?.length &&
						data.transaction.contract.sellerTaxRepresentative.globalId.length >
							0
					) {
						const refNode =
							findNode(
								"BT-62",
								sellerTaxRepresentativeTradeParty,
								(node) => node.node.nodeName === "ram:Name",
							)?.node ?? null;
						for (const id of data.transaction.contract.sellerTaxRepresentative
							.globalId) {
							const globalId = fragment().ele("ram:GlobalID");
							globalId.txt(id.identifier);
							if (id.schemeId) {
								globalId.att("schemeID", id.schemeId);
							}
							sellerTaxRepresentativeTradeParty.node.insertBefore(
								globalId.node,
								refNode,
							);
						}
					}

					if (data.transaction.contract.sellerTaxRepresentative.roleCode) {
						const roleCode = fragment().ele("ram:RoleCode");
						roleCode.txt(
							data.transaction.contract.sellerTaxRepresentative.roleCode.value,
						);
						const refNode =
							findNode(
								"BG-12",
								sellerTaxRepresentativeTradeParty,
								(node) => node.node.nodeName === "ram:PostalTradeAddress",
							)?.node ?? null;
						sellerTaxRepresentativeTradeParty.node.insertBefore(
							roleCode.node,
							refNode,
						);
					}

					if (data.transaction.contract.sellerTaxRepresentative.organization) {
						const specifiedLegalOrganization = fragment().ele(
							"ram:SpecifiedLegalOrganization",
						);
						const refNode =
							findNode(
								"BG-12",
								sellerTaxRepresentativeTradeParty,
								(node) => node.node.nodeName === "ram:PostalTradeAddress",
							)?.node ?? null;
						sellerTaxRepresentativeTradeParty.node.insertBefore(
							specifiedLegalOrganization.node,
							refNode,
						);

						if (
							data.transaction.contract.sellerTaxRepresentative.organization.id
						) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(
								data.transaction.contract.sellerTaxRepresentative.organization
									.id.identifier,
							);
							if (
								data.transaction.contract.sellerTaxRepresentative.organization
									.id.schemeId
							) {
								id.att(
									"schemeID",
									data.transaction.contract.sellerTaxRepresentative.organization
										.id.schemeId,
								);
							}
						}

						if (
							data.transaction.contract.sellerTaxRepresentative.organization
								.tradingName
						) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(
									data.transaction.contract.sellerTaxRepresentative.organization
										.tradingName,
								);
						}

						if (
							data.transaction.contract.sellerTaxRepresentative.organization
								.postalAddress
						) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.contract.sellerTaxRepresentative.organization
									.postalAddress.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.contract.sellerTaxRepresentative
											.organization.postalAddress.postCode,
									);
							}
							if (
								data.transaction.contract.sellerTaxRepresentative.organization
									.postalAddress.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.contract.sellerTaxRepresentative
											.organization.postalAddress.line1,
									);
							}
							if (
								data.transaction.contract.sellerTaxRepresentative.organization
									.postalAddress.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.contract.sellerTaxRepresentative
											.organization.postalAddress.line2,
									);
							}
							if (
								data.transaction.contract.sellerTaxRepresentative.organization
									.postalAddress.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.contract.sellerTaxRepresentative
											.organization.postalAddress.line3,
									);
							}
							if (
								data.transaction.contract.sellerTaxRepresentative.organization
									.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.contract.sellerTaxRepresentative
											.organization.postalAddress.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.contract.sellerTaxRepresentative.organization
										.postalAddress.countryCode.value,
								);
							if (
								data.transaction.contract.sellerTaxRepresentative.organization
									.postalAddress.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.contract.sellerTaxRepresentative
											.organization.postalAddress.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.contract.sellerTaxRepresentative.contact?.length &&
						data.transaction.contract.sellerTaxRepresentative.contact.length > 0
					) {
						const refNode =
							findNode(
								"BG-12",
								sellerTaxRepresentativeTradeParty,
								(node) => node.node.nodeName === "ram:PostalTradeAddress",
							)?.node ?? null;
						for (const contact of data.transaction.contract
							.sellerTaxRepresentative.contact) {
							const definedTradeContact = fragment().ele(
								"ram:DefinedTradeContact",
							);
							sellerTaxRepresentativeTradeParty.node.insertBefore(
								definedTradeContact.node,
								refNode,
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					if (
						data.transaction.contract.sellerTaxRepresentative.electronicAddress
					) {
						const uriUniversalCommunication = fragment().ele(
							"ram:URIUniversalCommunication",
						);
						uriUniversalCommunication
							.ele("ram:URIID")
							.txt(
								data.transaction.contract.sellerTaxRepresentative
									.electronicAddress.identifier,
							)
							.att(
								"schemeID",
								data.transaction.contract.sellerTaxRepresentative
									.electronicAddress.schemeId,
							);
						const refNode =
							findNode(
								"BG-63-00",
								sellerTaxRepresentativeTradeParty,
								(node) => node.node.nodeName === "ram:SpecifiedTaxRegistration",
							)?.node ?? null;
						sellerTaxRepresentativeTradeParty.node.insertBefore(
							uriUniversalCommunication.node,
							refNode,
						);
					}
				}

				if (data.transaction.contract.deviatingEndUser) {
					const productEndUserTradeParty = fragment().ele(
						"ram:ProductEndUserTradeParty",
					);
					const refNode =
						(
							getCachedNode("BT-14-00") ||
							getCachedNode("BT-13-00") ||
							getCachedNode("BT-12-00") ||
							getCachedNode("BG-24[0]") ||
							getCachedNode("BT-17-00[0]") ||
							getCachedNode("BT-18-00[0]") ||
							getCachedNode("BT-11-00") ||
							setCachedNode(
								(node) => {
									if (
										node.node.nodeName === "ram:SellerOrderReferencedDocument"
									) {
										return "BT-14-00";
									}
									if (
										node.node.nodeName === "ram:BuyerOrderReferencedDocument"
									) {
										return "BT-13-00";
									}
									if (node.node.nodeName === "ram:ContractReferencedDocument") {
										return "BT-12-00";
									}
									if (
										node.node.nodeName === "ram:AdditionalReferencedDocument"
									) {
										const typeCode = [...node.node.childNodes].find(
											(child) => child.nodeName === "ram:TypeCode",
										);

										switch (typeCode?.textContent?.trim()) {
											case "916":
												return "BG-24[0]";
											case "50":
												return "BT-17-00[0]";
											case "130":
												return "BT-18-00[0]";
										}
									}
									if (node.node.nodeName === "ram:SpecifiedProcuringProject") {
										return "BT-11-00";
									}
								},
								applicableHeaderTradeAgreement.find((node) =>
									[
										"ram:SellerOrderReferencedDocument",
										"ram:BuyerOrderReferencedDocument",
										"ram:ContractReferencedDocument",
										"ram:AdditionalReferencedDocument",
										"ram:SpecifiedProcuringProject",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeAgreement.node.insertBefore(
						productEndUserTradeParty.node,
						refNode,
					);

					if (data.transaction.contract.deviatingEndUser.id) {
						productEndUserTradeParty
							.ele("ram:ID")
							.txt(data.transaction.contract.deviatingEndUser.id.identifier);
					}
					if (
						data.transaction.contract.deviatingEndUser.globalId?.length &&
						data.transaction.contract.deviatingEndUser.globalId.length > 0
					) {
						for (const id of data.transaction.contract.deviatingEndUser
							.globalId) {
							const globalId = productEndUserTradeParty.ele("ram:GlobalID");
							globalId.txt(id.identifier);
							if (id.schemeId) {
								globalId.att("schemeID", id.schemeId);
							}
						}
					}
					productEndUserTradeParty
						.ele("ram:Name")
						.txt(data.transaction.contract.deviatingEndUser.name);
					if (data.transaction.contract.deviatingEndUser.roleCode) {
						productEndUserTradeParty
							.ele("ram:RoleCode")
							.txt(data.transaction.contract.deviatingEndUser.roleCode.value);
					}

					if (data.transaction.contract.deviatingEndUser.organization) {
						const specifiedLegalOrganization = productEndUserTradeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);

						if (data.transaction.contract.deviatingEndUser.organization.id) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(
								data.transaction.contract.deviatingEndUser.organization.id
									.identifier,
							);
							if (
								data.transaction.contract.deviatingEndUser.organization.id
									.schemeId
							) {
								id.att(
									"schemeID",
									data.transaction.contract.deviatingEndUser.organization.id
										.schemeId,
								);
							}
						}

						if (
							data.transaction.contract.deviatingEndUser.organization
								.tradingName
						) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(
									data.transaction.contract.deviatingEndUser.organization
										.tradingName,
								);
						}

						if (
							data.transaction.contract.deviatingEndUser.organization
								.postalAddress
						) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.contract.deviatingEndUser.organization
									.postalAddress.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.contract.deviatingEndUser.organization
											.postalAddress.postCode,
									);
							}
							if (
								data.transaction.contract.deviatingEndUser.organization
									.postalAddress.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.contract.deviatingEndUser.organization
											.postalAddress.line1,
									);
							}
							if (
								data.transaction.contract.deviatingEndUser.organization
									.postalAddress.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.contract.deviatingEndUser.organization
											.postalAddress.line2,
									);
							}
							if (
								data.transaction.contract.deviatingEndUser.organization
									.postalAddress.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.contract.deviatingEndUser.organization
											.postalAddress.line3,
									);
							}
							if (
								data.transaction.contract.deviatingEndUser.organization
									.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.contract.deviatingEndUser.organization
											.postalAddress.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.contract.deviatingEndUser.organization
										.postalAddress.countryCode.value,
								);
							if (
								data.transaction.contract.deviatingEndUser.organization
									.postalAddress.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.contract.deviatingEndUser.organization
											.postalAddress.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.contract.deviatingEndUser.contact?.length &&
						data.transaction.contract.deviatingEndUser.contact.length > 0
					) {
						for (const contact of data.transaction.contract.deviatingEndUser
							.contact) {
							const definedTradeContact = productEndUserTradeParty.ele(
								"ram:DefinedTradeContact",
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					const postalTradeAddress = productEndUserTradeParty.ele(
						"ram:PostalTradeAddress",
					);

					if (
						data.transaction.contract.deviatingEndUser.postalAddress.postCode
					) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(
								data.transaction.contract.deviatingEndUser.postalAddress
									.postCode,
							);
					}
					if (data.transaction.contract.deviatingEndUser.postalAddress.line1) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(
								data.transaction.contract.deviatingEndUser.postalAddress.line1,
							);
					}
					if (data.transaction.contract.deviatingEndUser.postalAddress.line2) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(
								data.transaction.contract.deviatingEndUser.postalAddress.line2,
							);
					}
					if (data.transaction.contract.deviatingEndUser.postalAddress.line3) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(
								data.transaction.contract.deviatingEndUser.postalAddress.line3,
							);
					}
					if (data.transaction.contract.deviatingEndUser.postalAddress.city) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(
								data.transaction.contract.deviatingEndUser.postalAddress.city,
							);
					}
					postalTradeAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.contract.deviatingEndUser.postalAddress
								.countryCode.value,
						);
					if (
						data.transaction.contract.deviatingEndUser.postalAddress
							.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.contract.deviatingEndUser.postalAddress
									.countrySubdivision,
							);
					}

					if (data.transaction.contract.deviatingEndUser.electronicAddress) {
						postalTradeAddress
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(
								data.transaction.contract.deviatingEndUser.electronicAddress
									.identifier,
							)
							.att(
								"schemeID",
								data.transaction.contract.deviatingEndUser.electronicAddress
									.schemeId,
							);
					}

					if (
						data.transaction.contract.deviatingEndUser.taxRegistration?.vat?.id
					) {
						postalTradeAddress
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.contract.deviatingEndUser.taxRegistration.vat
									.id.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.contract.deliveryTerms) {
					const applicableTradeDeliveryTerms = fragment().ele(
						"ram:ApplicableTradeDeliveryTerms",
					);
					const refNode =
						(
							getCachedNode("BT-14-00") ||
							getCachedNode("BT-13-00") ||
							getCachedNode("BT-12-00") ||
							getCachedNode("BG-24[0]") ||
							getCachedNode("BT-17-00[0]") ||
							getCachedNode("BT-18-00[0]") ||
							getCachedNode("BT-11-00") ||
							setCachedNode(
								(node) => {
									if (
										node.node.nodeName === "ram:SellerOrderReferencedDocument"
									) {
										return "BT-14-00";
									}
									if (
										node.node.nodeName === "ram:BuyerOrderReferencedDocument"
									) {
										return "BT-13-00";
									}
									if (node.node.nodeName === "ram:ContractReferencedDocument") {
										return "BT-12-00";
									}
									if (
										node.node.nodeName === "ram:AdditionalReferencedDocument"
									) {
										const typeCode = [...node.node.childNodes].find(
											(child) => child.nodeName === "ram:TypeCode",
										);

										switch (typeCode?.textContent?.trim()) {
											case "916":
												return "BG-24[0]";
											case "50":
												return "BT-17-00[0]";
											case "130":
												return "BT-18-00[0]";
										}
									}
									if (node.node.nodeName === "ram:SpecifiedProcuringProject") {
										return "BT-11-00";
									}
								},
								applicableHeaderTradeAgreement.find((node) =>
									[
										"ram:SellerOrderReferencedDocument",
										"ram:BuyerOrderReferencedDocument",
										"ram:ContractReferencedDocument",
										"ram:AdditionalReferencedDocument",
										"ram:SpecifiedProcuringProject",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeAgreement.node.insertBefore(
						applicableTradeDeliveryTerms.node,
						refNode,
					);

					if (data.transaction.contract.deliveryTerms.typeCode) {
						applicableTradeDeliveryTerms
							.ele("ram:DeliveryTypeCode")
							.txt(data.transaction.contract.deliveryTerms.typeCode.value);
					}

					if (data.transaction.contract.deliveryTerms.location) {
						const relevantTradeLocation = applicableTradeDeliveryTerms.ele(
							"ram:RelevantTradeLocation",
						);
						relevantTradeLocation
							.ele("ram:CountryID")
							.txt(
								data.transaction.contract.deliveryTerms.location.countryCode
									.value,
							);
						relevantTradeLocation
							.ele("ram:Name")
							.txt(data.transaction.contract.deliveryTerms.location.name);
					}
				}

				if (data.transaction.contract.sellerOrderReferencedDocument?.date) {
					const sellerOrderReferencedDocument = findNode(
						"BT-14-00",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:SellerOrderReferencedDocument",
						(fragment) => {
							const sellerOrderReferencedDocument = fragment.ele(
								"ram:SellerOrderReferencedDocument",
							);
							const refNode =
								(
									getCachedNode("BT-13-00") ||
									getCachedNode("BT-12-00") ||
									getCachedNode("BG-24[0]") ||
									getCachedNode("BT-17-00[0]") ||
									getCachedNode("BT-18-00[0]") ||
									getCachedNode("BT-11-00") ||
									setCachedNode(
										(node) => {
											if (
												node.node.nodeName ===
												"ram:BuyerOrderReferencedDocument"
											) {
												return "BT-13-00";
											}
											if (
												node.node.nodeName === "ram:ContractReferencedDocument"
											) {
												return "BT-12-00";
											}
											if (
												node.node.nodeName ===
												"ram:AdditionalReferencedDocument"
											) {
												const typeCode = [...node.node.childNodes].find(
													(child) => child.nodeName === "ram:TypeCode",
												);

												switch (typeCode?.textContent?.trim()) {
													case "916":
														return "BG-24[0]";
													case "50":
														return "BT-17-00[0]";
													case "130":
														return "BT-18-00[0]";
												}
											}
											if (
												node.node.nodeName === "ram:SpecifiedProcuringProject"
											) {
												return "BT-11-00";
											}
										},
										applicableHeaderTradeAgreement.find((node) =>
											[
												"ram:BuyerOrderReferencedDocument",
												"ram:ContractReferencedDocument",
												"ram:AdditionalReferencedDocument",
												"ram:SpecifiedProcuringProject",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							applicableHeaderTradeAgreement.node.insertBefore(
								sellerOrderReferencedDocument.node,
								refNode,
							);
							return sellerOrderReferencedDocument;
						},
					);
					sellerOrderReferencedDocument
						.ele("ram:FormattedIssueDateTime")
						.ele("qdt:DateTimeString")
						.txt(
							data.transaction.contract.sellerOrderReferencedDocument.date
								.value,
						)
						.att(
							"format",
							data.transaction.contract.sellerOrderReferencedDocument.date
								.format,
						);
				}

				if (data.transaction.contract.associatedOrder?.date) {
					const buyerOrderReferencedDocument = findNode(
						"BT-13-00",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:BuyerOrderReferencedDocument",
						(fragment) => {
							const buyerOrderReferencedDocument = fragment.ele(
								"ram:BuyerOrderReferencedDocument",
							);
							const refNode =
								(
									getCachedNode("BT-12-00") ||
									getCachedNode("BG-24[0]") ||
									getCachedNode("BT-17-00[0]") ||
									getCachedNode("BT-18-00[0]") ||
									getCachedNode("BT-11-00") ||
									setCachedNode(
										(node) => {
											if (
												node.node.nodeName === "ram:ContractReferencedDocument"
											) {
												return "BT-12-00";
											}
											if (
												node.node.nodeName ===
												"ram:AdditionalReferencedDocument"
											) {
												const typeCode = [...node.node.childNodes].find(
													(child) => child.nodeName === "ram:TypeCode",
												);

												switch (typeCode?.textContent?.trim()) {
													case "916":
														return "BG-24[0]";
													case "50":
														return "BT-17-00[0]";
													case "130":
														return "BT-18-00[0]";
												}
											}
											if (
												node.node.nodeName === "ram:SpecifiedProcuringProject"
											) {
												return "BT-11-00";
											}
										},
										applicableHeaderTradeAgreement.find((node) =>
											[
												"ram:ContractReferencedDocument",
												"ram:AdditionalReferencedDocument",
												"ram:SpecifiedProcuringProject",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							applicableHeaderTradeAgreement.node.insertBefore(
								buyerOrderReferencedDocument.node,
								refNode,
							);
							return buyerOrderReferencedDocument;
						},
					);
					buyerOrderReferencedDocument
						.ele("ram:FormattedIssueDateTime")
						.ele("qdt:DateTimeString")
						.txt(data.transaction.contract.associatedOrder.date.value)
						.att(
							"format",
							data.transaction.contract.associatedOrder.date.format,
						);
				}

				if (
					data.transaction.contract.quotationReferencedDocuments?.length &&
					data.transaction.contract.quotationReferencedDocuments.length > 0
				) {
					const refNode =
						(
							getCachedNode("BT-12-00") ||
							getCachedNode("BG-24[0]") ||
							getCachedNode("BT-17-00[0]") ||
							getCachedNode("BT-18-00[0]") ||
							getCachedNode("BT-11-00") ||
							setCachedNode(
								(node) => {
									if (node.node.nodeName === "ram:ContractReferencedDocument") {
										return "BT-12-00";
									}
									if (
										node.node.nodeName === "ram:AdditionalReferencedDocument"
									) {
										const typeCode = [...node.node.childNodes].find(
											(child) => child.nodeName === "ram:TypeCode",
										);

										switch (typeCode?.textContent?.trim()) {
											case "916":
												return "BG-24[0]";
											case "50":
												return "BT-17-00[0]";
											case "130":
												return "BT-18-00[0]";
										}
									}
									if (node.node.nodeName === "ram:SpecifiedProcuringProject") {
										return "BT-11-00";
									}
								},
								applicableHeaderTradeAgreement.find((node) =>
									[
										"ram:ContractReferencedDocument",
										"ram:AdditionalReferencedDocument",
										"ram:SpecifiedProcuringProject",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;

					for (const doc of data.transaction.contract
						.quotationReferencedDocuments) {
						const quotationReferencedDocument = fragment().ele(
							"ram:ContractReferencedDocument",
						);
						applicableHeaderTradeAgreement.node.insertBefore(
							quotationReferencedDocument.node,
							refNode,
						);
						quotationReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(doc.issuerAssignedId);
						if (doc.date) {
							quotationReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(doc.date.value)
								.att("format", doc.date.format);
						}
					}
				}

				if (data.transaction.contract.associatedContract) {
					const contractReferencedDocument = findNode(
						"BT-12-00",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:ContractReferencedDocument",
						(fragment) => {
							const contractReferencedDocument = fragment.ele(
								"ram:ContractReferencedDocument",
							);
							const refNode =
								(
									getCachedNode("BG-24[0]") ||
									getCachedNode("BT-17-00[0]") ||
									getCachedNode("BT-18-00[0]") ||
									getCachedNode("BT-11-00") ||
									setCachedNode(
										(node) => {
											if (
												node.node.nodeName ===
												"ram:AdditionalReferencedDocument"
											) {
												const typeCode = [...node.node.childNodes].find(
													(child) => child.nodeName === "ram:TypeCode",
												);

												switch (typeCode?.textContent?.trim()) {
													case "916":
														return "BG-24[0]";
													case "50":
														return "BT-17-00[0]";
													case "130":
														return "BT-18-00[0]";
												}
											}
											if (
												node.node.nodeName === "ram:SpecifiedProcuringProject"
											) {
												return "BT-11-00";
											}
										},
										applicableHeaderTradeAgreement.find((node) =>
											[
												"ram:AdditionalReferencedDocument",
												"ram:SpecifiedProcuringProject",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							applicableHeaderTradeAgreement.node.insertBefore(
								contractReferencedDocument.node,
								refNode,
							);
							return contractReferencedDocument;
						},
					);
					if (data.transaction.contract.associatedContract.referenceTypeCode) {
						contractReferencedDocument
							.ele("ram:ReferenceTypeCode")
							.txt(
								data.transaction.contract.associatedContract.referenceTypeCode
									.value,
							);
					}

					if (data.transaction.contract.associatedContract.date) {
						contractReferencedDocument
							.ele("ram:FormattedIssueDateTime")
							.ele("qdt:DateTimeString")
							.txt(data.transaction.contract.associatedContract.date.value)
							.att(
								"format",
								data.transaction.contract.associatedContract.date.format,
							);
					}
				}

				if (
					data.transaction.contract.additionalSupportingDocuments?.length &&
					data.transaction.contract.additionalSupportingDocuments.length > 0
				) {
					const additionalReferencedDocumentNodes = findAllNodes(
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:AdditionalReferencedDocument" &&
							[...node.node.childNodes].some(
								(child) =>
									child.nodeName === "ram:TypeCode" &&
									child.textContent?.trim() === "916",
							),
					);
					for (
						let i = 0;
						i < data.transaction.contract.additionalSupportingDocuments.length;
						i++
					) {
						const doc =
							data.transaction.contract.additionalSupportingDocuments[i];
						const additionalReferencedDocument =
							additionalReferencedDocumentNodes[i];
						if (!doc || !additionalReferencedDocument) continue;

						if (doc.date) {
							additionalReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(doc.date.value)
								.att("format", doc.date.format);
						}
					}
				}

				if (
					data.transaction.contract.tenderOrLotReferences?.length &&
					data.transaction.contract.tenderOrLotReferences.length > 0
				) {
					const additionalReferencedDocumentNodes = findAllNodes(
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:AdditionalReferencedDocument" &&
							[...node.node.childNodes].some(
								(child) =>
									child.nodeName === "ram:TypeCode" &&
									child.textContent?.trim() === "50",
							),
					);
					for (
						let i = 0;
						i < data.transaction.contract.tenderOrLotReferences.length;
						i++
					) {
						const tenderOrLotReference =
							data.transaction.contract.tenderOrLotReferences[i];
						const additionalReferencedDocument =
							additionalReferencedDocumentNodes[i];
						if (!tenderOrLotReference || !additionalReferencedDocument)
							continue;

						if (tenderOrLotReference.date) {
							additionalReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(tenderOrLotReference.date.value)
								.att("format", tenderOrLotReference.date.format);
						}
					}
				}

				if (
					data.transaction.contract.invoicedObjectIdentifier?.length &&
					data.transaction.contract.invoicedObjectIdentifier.length > 0
				) {
					const additionalReferencedDocumentNodes = findAllNodes(
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:AdditionalReferencedDocument" &&
							[...node.node.childNodes].some(
								(child) =>
									child.nodeName === "ram:TypeCode" &&
									child.textContent?.trim() === "130",
							),
					);
					for (
						let i = 0;
						i < data.transaction.contract.invoicedObjectIdentifier.length;
						i++
					) {
						const invoicedObjectIdentifier =
							data.transaction.contract.invoicedObjectIdentifier[i];
						const additionalReferencedDocument =
							additionalReferencedDocumentNodes[i];
						if (!invoicedObjectIdentifier || !additionalReferencedDocument)
							continue;

						if (invoicedObjectIdentifier.date) {
							additionalReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(invoicedObjectIdentifier.date.value)
								.att("format", invoicedObjectIdentifier.date.format);
						}
					}
				}

				if (data.transaction.contract.buyerAgent) {
					const buyerAgentTradeParty = fragment().ele(
						"ram:BuyerAgentTradeParty",
					);
					const refNode =
						findNode(
							"BT-11-00",
							applicableHeaderTradeAgreement,
							(node) => node.node.nodeName === "ram:SpecifiedProcuringProject",
						)?.node ?? null;
					applicableHeaderTradeAgreement.node.insertBefore(
						buyerAgentTradeParty.node,
						refNode,
					);

					if (data.transaction.contract.buyerAgent.id) {
						buyerAgentTradeParty
							.ele("ram:ID")
							.txt(data.transaction.contract.buyerAgent.id.identifier);
					}

					if (
						data.transaction.contract.buyerAgent.globalId?.length &&
						data.transaction.contract.buyerAgent.globalId.length > 0
					) {
						for (const id of data.transaction.contract.buyerAgent.globalId) {
							const globalId = buyerAgentTradeParty.ele("ram:GlobalID");
							globalId.txt(id.identifier);
							if (id.schemeId) {
								globalId.att("schemeID", id.schemeId);
							}
						}
					}

					buyerAgentTradeParty
						.ele("ram:Name")
						.txt(data.transaction.contract.buyerAgent.name);
					if (data.transaction.contract.buyerAgent.roleCode) {
						buyerAgentTradeParty
							.ele("ram:RoleCode")
							.txt(data.transaction.contract.buyerAgent.roleCode.value);
					}

					if (data.transaction.contract.buyerAgent.organization) {
						const specifiedLegalOrganization = buyerAgentTradeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);

						if (data.transaction.contract.buyerAgent.organization.id) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(
								data.transaction.contract.buyerAgent.organization.id.identifier,
							);
							if (
								data.transaction.contract.buyerAgent.organization.id.schemeId
							) {
								id.att(
									"schemeID",
									data.transaction.contract.buyerAgent.organization.id.schemeId,
								);
							}
						}

						if (data.transaction.contract.buyerAgent.organization.tradingName) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(
									data.transaction.contract.buyerAgent.organization.tradingName,
								);
						}

						if (
							data.transaction.contract.buyerAgent.organization.postalAddress
						) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.contract.buyerAgent.organization.postalAddress
									.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.contract.buyerAgent.organization
											.postalAddress.postCode,
									);
							}
							if (
								data.transaction.contract.buyerAgent.organization.postalAddress
									.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.contract.buyerAgent.organization
											.postalAddress.line1,
									);
							}
							if (
								data.transaction.contract.buyerAgent.organization.postalAddress
									.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.contract.buyerAgent.organization
											.postalAddress.line2,
									);
							}
							if (
								data.transaction.contract.buyerAgent.organization.postalAddress
									.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.contract.buyerAgent.organization
											.postalAddress.line3,
									);
							}
							if (
								data.transaction.contract.buyerAgent.organization.postalAddress
									.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.contract.buyerAgent.organization
											.postalAddress.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.contract.buyerAgent.organization
										.postalAddress.countryCode.value,
								);
							if (
								data.transaction.contract.buyerAgent.organization.postalAddress
									.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.contract.buyerAgent.organization
											.postalAddress.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.contract.buyerAgent.contact?.length &&
						data.transaction.contract.buyerAgent.contact.length > 0
					) {
						for (const contact of data.transaction.contract.buyerAgent
							.contact) {
							const definedTradeContact = buyerAgentTradeParty.ele(
								"ram:DefinedTradeContact",
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					const postalTradeAddress = buyerAgentTradeParty.ele(
						"ram:PostalTradeAddress",
					);

					if (data.transaction.contract.buyerAgent.postalAddress.postCode) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(data.transaction.contract.buyerAgent.postalAddress.postCode);
					}
					if (data.transaction.contract.buyerAgent.postalAddress.line1) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(data.transaction.contract.buyerAgent.postalAddress.line1);
					}
					if (data.transaction.contract.buyerAgent.postalAddress.line2) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(data.transaction.contract.buyerAgent.postalAddress.line2);
					}
					if (data.transaction.contract.buyerAgent.postalAddress.line3) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(data.transaction.contract.buyerAgent.postalAddress.line3);
					}
					if (data.transaction.contract.buyerAgent.postalAddress.city) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(data.transaction.contract.buyerAgent.postalAddress.city);
					}
					postalTradeAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.contract.buyerAgent.postalAddress.countryCode
								.value,
						);
					if (
						data.transaction.contract.buyerAgent.postalAddress
							.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.contract.buyerAgent.postalAddress
									.countrySubdivision,
							);
					}

					if (data.transaction.contract.buyerAgent.electronicAddress) {
						buyerAgentTradeParty
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(
								data.transaction.contract.buyerAgent.electronicAddress
									.identifier,
							)
							.att(
								"schemeID",
								data.transaction.contract.buyerAgent.electronicAddress.schemeId,
							);
					}

					if (data.transaction.contract.buyerAgent.taxRegistration?.vat?.id) {
						buyerAgentTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.contract.buyerAgent.taxRegistration.vat.id
									.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (
					data.transaction.contract.customerOrderReferencedDocuments?.length &&
					data.transaction.contract.customerOrderReferencedDocuments.length > 0
				) {
					for (const doc of data.transaction.contract
						.customerOrderReferencedDocuments) {
						const ultimateCustomerOrderReferencedDocument =
							applicableHeaderTradeAgreement.ele(
								"ram:UltimateCustomerOrderReferencedDocument",
							);
						ultimateCustomerOrderReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(doc.issuerAssignedId);
						if (doc.date) {
							ultimateCustomerOrderReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(doc.date.value)
								.att("format", doc.date.format);
						}
					}
				}
			}

			if (data.transaction.delivery) {
				const applicableHeaderTradeDelivery = findNode(
					"BG-13-00",
					supplyChainTradeTransaction,
					(node) => node.node.nodeName === "ram:ApplicableHeaderTradeDelivery",
					(fragment) => {
						const applicableHeaderTradeDelivery = fragment.ele(
							"ram:ApplicableHeaderTradeDelivery",
						);
						const refNode =
							findNode(
								"BG-19",
								supplyChainTradeTransaction,
								(node) =>
									node.node.nodeName === "ram:ApplicableHeaderTradeSettlement",
							)?.node ?? null;
						supplyChainTradeTransaction.node.insertBefore(
							applicableHeaderTradeDelivery.node,
							refNode,
						);
						return applicableHeaderTradeDelivery;
					},
				);

				if (data.transaction.delivery.relatedConsignment) {
					const relatedSupplyChainConsignment = fragment().ele(
						"ram:RelatedSupplyChainConsignment",
					);
					const refNode =
						(
							getCachedNode("BG-13") ||
							getCachedNode("BT-72-000") ||
							getCachedNode("BT-16-00") ||
							getCachedNode("BT-15-00") ||
							setCachedNode(
								(node) =>
									node.node.nodeName === "ram:ShipToTradeParty"
										? "BG-13"
										: node.node.nodeName ===
												"ram:ActualDeliverySupplyChainEvent"
											? "BT-72-000"
											: node.node.nodeName ===
													"ram:DespatchAdviceReferencedDocument"
												? "BT-16-00"
												: "BT-15-00",
								applicableHeaderTradeDelivery.find((node) =>
									[
										"ram:ShipToTradeParty",
										"ram:ActualDeliverySupplyChainEvent",
										"ram:DespatchAdviceReferencedDocument",
										"ram:ReceivingAdviceReferencedDocument",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeDelivery.node.insertBefore(
						relatedSupplyChainConsignment.node,
						refNode,
					);

					if (
						data.transaction.delivery.relatedConsignment
							.transportMovementModeCode
					) {
						relatedSupplyChainConsignment
							.ele("ram:SpecifiedLogisticsTransportMovement")
							.ele("ram:ModeCode")
							.txt(
								data.transaction.delivery.relatedConsignment
									.transportMovementModeCode,
							);
					}
				}

				if (data.transaction.delivery.recipient) {
					const shipToTradeParty = findNode(
						"BG-13",
						applicableHeaderTradeDelivery,
						(node) => node.node.nodeName === "ram:ShipToTradeParty",
						(fragment) => {
							const shipToTradeParty = fragment.ele("ram:ShipToTradeParty");
							const refNode =
								(
									getCachedNode("BT-72-000") ||
									getCachedNode("BT-16-00") ||
									getCachedNode("BT-15-00") ||
									setCachedNode(
										(node) =>
											node.node.nodeName ===
											"ram:ActualDeliverySupplyChainEvent"
												? "BT-72-000"
												: node.node.nodeName ===
														"ram:DespatchAdviceReferencedDocument"
													? "BT-16-00"
													: "BT-15-00",
										applicableHeaderTradeDelivery.find((node) =>
											[
												"ram:ActualDeliverySupplyChainEvent",
												"ram:DespatchAdviceReferencedDocument",
												"ram:ReceivingAdviceReferencedDocument",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							applicableHeaderTradeDelivery.node.insertBefore(
								shipToTradeParty.node,
								refNode,
							);
							return shipToTradeParty;
						},
					);

					if (data.transaction.delivery.recipient.roleCode) {
						const roleCode = fragment().ele("ram:RoleCode");
						const refNode =
							findNode(
								"BG-15",
								shipToTradeParty,
								(node) => node.node.nodeName === "ram:PostalTradeAddress",
							)?.node ?? null;
						shipToTradeParty.node.insertBefore(roleCode.node, refNode);
					}

					if (data.transaction.delivery.recipient.organization) {
						const specifiedLegalOrganization = fragment().ele(
							"ram:SpecifiedLegalOrganization",
						);
						const refNode =
							findNode(
								"BG-15",
								shipToTradeParty,
								(node) => node.node.nodeName === "ram:PostalTradeAddress",
							)?.node ?? null;
						shipToTradeParty.node.insertBefore(
							specifiedLegalOrganization.node,
							refNode,
						);

						if (data.transaction.delivery.recipient.organization.id) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(
								data.transaction.delivery.recipient.organization.id.identifier,
							);
							if (
								data.transaction.delivery.recipient.organization.id.schemeId
							) {
								id.att(
									"schemeID",
									data.transaction.delivery.recipient.organization.id.schemeId,
								);
							}
						}

						if (data.transaction.delivery.recipient.organization.tradingName) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(
									data.transaction.delivery.recipient.organization.tradingName,
								);
						}

						if (
							data.transaction.delivery.recipient.organization.postalAddress
						) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.delivery.recipient.organization.postalAddress
									.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.delivery.recipient.organization
											.postalAddress.postCode,
									);
							}
							if (
								data.transaction.delivery.recipient.organization.postalAddress
									.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.delivery.recipient.organization
											.postalAddress.line1,
									);
							}
							if (
								data.transaction.delivery.recipient.organization.postalAddress
									.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.delivery.recipient.organization
											.postalAddress.line2,
									);
							}
							if (
								data.transaction.delivery.recipient.organization.postalAddress
									.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.delivery.recipient.organization
											.postalAddress.line3,
									);
							}
							if (
								data.transaction.delivery.recipient.organization.postalAddress
									.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.delivery.recipient.organization
											.postalAddress.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.delivery.recipient.organization.postalAddress
										.countryCode.value,
								);
							if (
								data.transaction.delivery.recipient.organization.postalAddress
									.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.delivery.recipient.organization
											.postalAddress.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.delivery.recipient.contact?.length &&
						data.transaction.delivery.recipient.contact.length > 0
					) {
						const refNode =
							findNode(
								"BG-15",
								shipToTradeParty,
								(node) => node.node.nodeName === "ram:PostalTradeAddress",
							)?.node ?? null;

						for (const contact of data.transaction.delivery.recipient.contact) {
							const definedTradeContact = fragment().ele(
								"ram:DefinedTradeContact",
							);
							shipToTradeParty.node.insertBefore(
								definedTradeContact.node,
								refNode,
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					if (data.transaction.delivery.recipient.electronicAddress) {
						shipToTradeParty
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(
								data.transaction.delivery.recipient.electronicAddress
									.identifier,
							)
							.att(
								"schemeID",
								data.transaction.delivery.recipient.electronicAddress.schemeId,
							);
					}

					if (data.transaction.delivery.recipient.taxRegistration?.vat?.id) {
						shipToTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.delivery.recipient.taxRegistration.vat.id
									.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.delivery.finalRecipient) {
					const ultimateShipToTradeParty = fragment().ele(
						"ram:UltimateShipToTradeParty",
					);
					const refNode =
						(
							getCachedNode("BT-72-000") ||
							getCachedNode("BT-16-00") ||
							getCachedNode("BT-15-00") ||
							setCachedNode(
								(node) =>
									node.node.nodeName === "ram:ActualDeliverySupplyChainEvent"
										? "BT-72-000"
										: node.node.nodeName ===
												"ram:DespatchAdviceReferencedDocument"
											? "BT-16-00"
											: "BT-15-00",
								applicableHeaderTradeDelivery.find((node) =>
									[
										"ram:ActualDeliverySupplyChainEvent",
										"ram:DespatchAdviceReferencedDocument",
										"ram:ReceivingAdviceReferencedDocument",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeDelivery.node.insertBefore(
						ultimateShipToTradeParty.node,
						refNode,
					);

					if (data.transaction.delivery.finalRecipient.id) {
						ultimateShipToTradeParty
							.ele("ram:ID")
							.txt(data.transaction.delivery.finalRecipient.id.identifier);
					}
					if (
						data.transaction.delivery.finalRecipient.globalId?.length &&
						data.transaction.delivery.finalRecipient.globalId.length > 0
					) {
						for (const id of data.transaction.delivery.finalRecipient
							.globalId) {
							const globalId = ultimateShipToTradeParty.ele("ram:GlobalID");
							globalId.txt(id.identifier);
							if (id.schemeId) {
								globalId.att("schemeID", id.schemeId);
							}
						}
					}

					ultimateShipToTradeParty
						.ele("ram:Name")
						.txt(data.transaction.delivery.finalRecipient.name);

					if (data.transaction.delivery.finalRecipient.roleCode) {
						ultimateShipToTradeParty
							.ele("ram:RoleCode")
							.txt(data.transaction.delivery.finalRecipient.roleCode.value);
					}

					if (data.transaction.delivery.finalRecipient.organization) {
						const specifiedLegalOrganization = ultimateShipToTradeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);

						if (data.transaction.delivery.finalRecipient.organization.id) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(
								data.transaction.delivery.finalRecipient.organization.id
									.identifier,
							);
							if (
								data.transaction.delivery.finalRecipient.organization.id
									.schemeId
							) {
								id.att(
									"schemeID",
									data.transaction.delivery.finalRecipient.organization.id
										.schemeId,
								);
							}
						}

						if (
							data.transaction.delivery.finalRecipient.organization.tradingName
						) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(
									data.transaction.delivery.finalRecipient.organization
										.tradingName,
								);
						}

						if (
							data.transaction.delivery.finalRecipient.organization
								.postalAddress
						) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.delivery.finalRecipient.organization
									.postalAddress.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.delivery.finalRecipient.organization
											.postalAddress.postCode,
									);
							}
							if (
								data.transaction.delivery.finalRecipient.organization
									.postalAddress.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.delivery.finalRecipient.organization
											.postalAddress.line1,
									);
							}
							if (
								data.transaction.delivery.finalRecipient.organization
									.postalAddress.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.delivery.finalRecipient.organization
											.postalAddress.line2,
									);
							}
							if (
								data.transaction.delivery.finalRecipient.organization
									.postalAddress.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.delivery.finalRecipient.organization
											.postalAddress.line3,
									);
							}
							if (
								data.transaction.delivery.finalRecipient.organization
									.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.delivery.finalRecipient.organization
											.postalAddress.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.delivery.finalRecipient.organization
										.postalAddress.countryCode.value,
								);
							if (
								data.transaction.delivery.finalRecipient.organization
									.postalAddress.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.delivery.finalRecipient.organization
											.postalAddress.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.delivery.finalRecipient.contact?.length &&
						data.transaction.delivery.finalRecipient.contact.length > 0
					) {
						for (const contact of data.transaction.delivery.finalRecipient
							.contact) {
							const definedTradeContact = ultimateShipToTradeParty.ele(
								"ram:DefinedTradeContact",
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					const postalTradeAddress = ultimateShipToTradeParty.ele(
						"ram:PostalTradeAddress",
					);

					if (data.transaction.delivery.finalRecipient.postalAddress.postCode) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(
								data.transaction.delivery.finalRecipient.postalAddress.postCode,
							);
					}
					if (data.transaction.delivery.finalRecipient.postalAddress.line1) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(
								data.transaction.delivery.finalRecipient.postalAddress.line1,
							);
					}
					if (data.transaction.delivery.finalRecipient.postalAddress.line2) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(
								data.transaction.delivery.finalRecipient.postalAddress.line2,
							);
					}
					if (data.transaction.delivery.finalRecipient.postalAddress.line3) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(
								data.transaction.delivery.finalRecipient.postalAddress.line3,
							);
					}
					if (data.transaction.delivery.finalRecipient.postalAddress.city) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(data.transaction.delivery.finalRecipient.postalAddress.city);
					}
					postalTradeAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.delivery.finalRecipient.postalAddress.countryCode
								.value,
						);
					if (
						data.transaction.delivery.finalRecipient.postalAddress
							.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.delivery.finalRecipient.postalAddress
									.countrySubdivision,
							);
					}

					if (data.transaction.delivery.finalRecipient.electronicAddress) {
						ultimateShipToTradeParty
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(
								data.transaction.delivery.finalRecipient.electronicAddress
									.identifier,
							)
							.att(
								"schemeID",
								data.transaction.delivery.finalRecipient.electronicAddress
									.schemeId,
							);
					}

					if (
						data.transaction.delivery.finalRecipient.taxRegistration?.vat?.id
					) {
						ultimateShipToTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.delivery.finalRecipient.taxRegistration.vat.id
									.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.delivery.deviatingSender) {
					const shipFromTradeParty = fragment().ele("ram:ShipFromTradeParty");
					const refNode =
						(
							getCachedNode("BT-72-000") ||
							getCachedNode("BT-16-00") ||
							getCachedNode("BT-15-00") ||
							setCachedNode(
								(node) =>
									node.node.nodeName === "ram:ActualDeliverySupplyChainEvent"
										? "BT-72-000"
										: node.node.nodeName ===
												"ram:DespatchAdviceReferencedDocument"
											? "BT-16-00"
											: "BT-15-00",
								applicableHeaderTradeDelivery.find((node) =>
									[
										"ram:ActualDeliverySupplyChainEvent",
										"ram:DespatchAdviceReferencedDocument",
										"ram:ReceivingAdviceReferencedDocument",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeDelivery.node.insertBefore(
						shipFromTradeParty.node,
						refNode,
					);

					if (data.transaction.delivery.deviatingSender.id) {
						shipFromTradeParty
							.ele("ram:ID")
							.txt(data.transaction.delivery.deviatingSender.id.identifier);
					}
					if (
						data.transaction.delivery.deviatingSender.globalId?.length &&
						data.transaction.delivery.deviatingSender.globalId.length > 0
					) {
						for (const id of data.transaction.delivery.deviatingSender
							.globalId) {
							const globalId = shipFromTradeParty.ele("ram:GlobalID");
							globalId.txt(id.identifier);
							if (id.schemeId) {
								globalId.att("schemeID", id.schemeId);
							}
						}
					}
					shipFromTradeParty
						.ele("ram:Name")
						.txt(data.transaction.delivery.deviatingSender.name);
					if (data.transaction.delivery.deviatingSender.roleCode) {
						shipFromTradeParty
							.ele("ram:RoleCode")
							.txt(data.transaction.delivery.deviatingSender.roleCode.value);
					}

					if (data.transaction.delivery.deviatingSender.organization) {
						const specifiedLegalOrganization = shipFromTradeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);

						if (data.transaction.delivery.deviatingSender.organization.id) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(
								data.transaction.delivery.deviatingSender.organization.id
									.identifier,
							);
							if (
								data.transaction.delivery.deviatingSender.organization.id
									.schemeId
							) {
								id.att(
									"schemeID",
									data.transaction.delivery.deviatingSender.organization.id
										.schemeId,
								);
							}
						}

						if (
							data.transaction.delivery.deviatingSender.organization.tradingName
						) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(
									data.transaction.delivery.deviatingSender.organization
										.tradingName,
								);
						}

						if (
							data.transaction.delivery.deviatingSender.organization
								.postalAddress
						) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.delivery.deviatingSender.organization
									.postalAddress.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.delivery.deviatingSender.organization
											.postalAddress.postCode,
									);
							}
							if (
								data.transaction.delivery.deviatingSender.organization
									.postalAddress.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.delivery.deviatingSender.organization
											.postalAddress.line1,
									);
							}
							if (
								data.transaction.delivery.deviatingSender.organization
									.postalAddress.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.delivery.deviatingSender.organization
											.postalAddress.line2,
									);
							}
							if (
								data.transaction.delivery.deviatingSender.organization
									.postalAddress.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.delivery.deviatingSender.organization
											.postalAddress.line3,
									);
							}
							if (
								data.transaction.delivery.deviatingSender.organization
									.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.delivery.deviatingSender.organization
											.postalAddress.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.delivery.deviatingSender.organization
										.postalAddress.countryCode.value,
								);
							if (
								data.transaction.delivery.deviatingSender.organization
									.postalAddress.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.delivery.deviatingSender.organization
											.postalAddress.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.delivery.deviatingSender.contact?.length &&
						data.transaction.delivery.deviatingSender.contact.length > 0
					) {
						for (const contact of data.transaction.delivery.deviatingSender
							.contact) {
							const definedTradeContact = shipFromTradeParty.ele(
								"ram:DefinedTradeContact",
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					const postalTradeAddress = shipFromTradeParty.ele(
						"ram:PostalTradeAddress",
					);

					if (
						data.transaction.delivery.deviatingSender.postalAddress.postCode
					) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(
								data.transaction.delivery.deviatingSender.postalAddress
									.postCode,
							);
					}
					if (data.transaction.delivery.deviatingSender.postalAddress.line1) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(
								data.transaction.delivery.deviatingSender.postalAddress.line1,
							);
					}
					if (data.transaction.delivery.deviatingSender.postalAddress.line2) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(
								data.transaction.delivery.deviatingSender.postalAddress.line2,
							);
					}
					if (data.transaction.delivery.deviatingSender.postalAddress.line3) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(
								data.transaction.delivery.deviatingSender.postalAddress.line3,
							);
					}
					if (data.transaction.delivery.deviatingSender.postalAddress.city) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(
								data.transaction.delivery.deviatingSender.postalAddress.city,
							);
					}
					postalTradeAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.delivery.deviatingSender.postalAddress
								.countryCode.value,
						);
					if (
						data.transaction.delivery.deviatingSender.postalAddress
							.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.delivery.deviatingSender.postalAddress
									.countrySubdivision,
							);
					}

					if (data.transaction.delivery.deviatingSender.electronicAddress) {
						shipFromTradeParty
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(
								data.transaction.delivery.deviatingSender.electronicAddress
									.identifier,
							)
							.att(
								"schemeID",
								data.transaction.delivery.deviatingSender.electronicAddress
									.schemeId,
							);
					}

					if (
						data.transaction.delivery.deviatingSender.taxRegistration?.vat?.id
					) {
						shipFromTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.delivery.deviatingSender.taxRegistration.vat.id
									.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.delivery.despatchAdvice?.date) {
					const despatchAdviceReferencedDocument = findNode(
						"BT-16-00",
						applicableHeaderTradeDelivery,
						(node) =>
							node.node.nodeName === "ram:DespatchAdviceReferencedDocument",
						(fragment) => {
							const despatchAdviceReferencedDocument = fragment.ele(
								"ram:DespatchAdviceReferencedDocument",
							);
							const refNode =
								findNode(
									"BT-15-00",
									applicableHeaderTradeDelivery,
									(node) =>
										node.node.nodeName ===
										"ram:ReceivingAdviceReferencedDocument",
								)?.node ?? null;
							applicableHeaderTradeDelivery.node.insertBefore(
								despatchAdviceReferencedDocument.node,
								refNode,
							);
							return despatchAdviceReferencedDocument;
						},
					);
					despatchAdviceReferencedDocument
						.ele("ram:FormattedIssueDateTime")
						.ele("qdt:DateTimeString")
						.txt(data.transaction.delivery.despatchAdvice.date.value)
						.att(
							"format",
							data.transaction.delivery.despatchAdvice.date.format,
						);
				}

				if (data.transaction.delivery.associatedGoodsReceipt?.date) {
					const receivingAdviceReferencedDocument = findNode(
						"BT-15-00",
						applicableHeaderTradeDelivery,
						(node) =>
							node.node.nodeName === "ram:ReceivingAdviceReferencedDocument",
						() =>
							applicableHeaderTradeDelivery.ele(
								"ram:ReceivingAdviceReferencedDocument",
							),
					);
					receivingAdviceReferencedDocument
						.ele("ram:FormattedIssueDateTime")
						.ele("qdt:DateTimeString")
						.txt(data.transaction.delivery.associatedGoodsReceipt.date.value)
						.att(
							"format",
							data.transaction.delivery.associatedGoodsReceipt.date.format,
						);
				}

				if (
					data.transaction.delivery.deliveryNoteReferencedDocuments?.length &&
					data.transaction.delivery.deliveryNoteReferencedDocuments.length > 0
				) {
					for (const doc of data.transaction.delivery
						.deliveryNoteReferencedDocuments) {
						const deliveryNoteReferencedDocument =
							applicableHeaderTradeDelivery.ele(
								"ram:DeliveryNoteReferencedDocument",
							);
						deliveryNoteReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(doc.issuerAssignedId);
						if (doc.date) {
							deliveryNoteReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(doc.date.value)
								.att("format", doc.date.format);
						}
					}
				}
			}

			if (data.transaction.debit) {
				const applicableHeaderTradeSettlement = findNode(
					"BG-19",
					supplyChainTradeTransaction,
					(node) =>
						node.node.nodeName === "ram:ApplicableHeaderTradeSettlement",
					() =>
						supplyChainTradeTransaction.ele(
							"ram:ApplicableHeaderTradeSettlement",
						),
				);

				if (data.transaction.debit.sellerReferenceNumber) {
					const invoiceIssuerReference = fragment().ele(
						"ram:InvoiceIssuerReference",
					);
					const refNode =
						(
							getCachedNode("BG-10") ||
							getCachedNode("BG-16") ||
							getCachedNode("BG-23[0]") ||
							setCachedNode(
								(node) =>
									node.node.nodeName === "ram:PayeeTradeParty"
										? "BG-10"
										: node.node.nodeName ===
												"ram:SpecifiedTradeSettlementPaymentMeans"
											? "BG-16"
											: "BG-23[0]",
								applicableHeaderTradeSettlement.find((node) =>
									[
										"ram:PayeeTradeParty",
										"ram:SpecifiedTradeSettlementPaymentMeans",
										"ram:ApplicableTradeTax",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeSettlement.node.insertBefore(
						invoiceIssuerReference.node,
						refNode,
					);
				}

				if (data.transaction.debit.invoicer) {
					const invoicerTradeParty = fragment().ele("ram:InvoicerTradeParty");
					const refNode =
						(
							getCachedNode("BG-10") ||
							getCachedNode("BG-16") ||
							getCachedNode("BG-23[0]") ||
							setCachedNode(
								(node) =>
									node.node.nodeName === "ram:PayeeTradeParty"
										? "BG-10"
										: node.node.nodeName ===
												"ram:SpecifiedTradeSettlementPaymentMeans"
											? "BG-16"
											: "BG-23[0]",
								applicableHeaderTradeSettlement.find((node) =>
									[
										"ram:PayeeTradeParty",
										"ram:SpecifiedTradeSettlementPaymentMeans",
										"ram:ApplicableTradeTax",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeSettlement.node.insertBefore(
						invoicerTradeParty.node,
						refNode,
					);

					if (data.transaction.debit.invoicer.id) {
						invoicerTradeParty
							.ele("ram:ID")
							.txt(data.transaction.debit.invoicer.id.identifier);
					}
					if (
						data.transaction.debit.invoicer.globalId?.length &&
						data.transaction.debit.invoicer.globalId.length > 0
					) {
						for (const id of data.transaction.debit.invoicer.globalId) {
							const globalId = invoicerTradeParty.ele("ram:GlobalID");
							globalId.txt(id.identifier);
							if (id.schemeId) {
								globalId.att("schemeID", id.schemeId);
							}
						}
					}

					invoicerTradeParty
						.ele("ram:Name")
						.txt(data.transaction.debit.invoicer.name);

					if (data.transaction.debit.invoicer.roleCode) {
						invoicerTradeParty
							.ele("ram:RoleCode")
							.txt(data.transaction.debit.invoicer.roleCode.value);
					}

					if (data.transaction.debit.invoicer.organization) {
						const specifiedLegalOrganization = invoicerTradeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);

						if (data.transaction.debit.invoicer.organization.id) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(
								data.transaction.debit.invoicer.organization.id.identifier,
							);
							if (data.transaction.debit.invoicer.organization.id.schemeId) {
								id.att(
									"schemeID",
									data.transaction.debit.invoicer.organization.id.schemeId,
								);
							}
						}

						if (data.transaction.debit.invoicer.organization.tradingName) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(data.transaction.debit.invoicer.organization.tradingName);
						}

						if (data.transaction.debit.invoicer.organization.postalAddress) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.debit.invoicer.organization.postalAddress
									.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.debit.invoicer.organization.postalAddress
											.postCode,
									);
							}
							if (
								data.transaction.debit.invoicer.organization.postalAddress.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.debit.invoicer.organization.postalAddress
											.line1,
									);
							}
							if (
								data.transaction.debit.invoicer.organization.postalAddress.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.debit.invoicer.organization.postalAddress
											.line2,
									);
							}
							if (
								data.transaction.debit.invoicer.organization.postalAddress.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.debit.invoicer.organization.postalAddress
											.line3,
									);
							}
							if (
								data.transaction.debit.invoicer.organization.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.debit.invoicer.organization.postalAddress
											.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.debit.invoicer.organization.postalAddress
										.countryCode.value,
								);
							if (
								data.transaction.debit.invoicer.organization.postalAddress
									.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.debit.invoicer.organization.postalAddress
											.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.debit.invoicer.contact?.length &&
						data.transaction.debit.invoicer.contact.length
					) {
						for (const contact of data.transaction.debit.invoicer.contact) {
							const definedTradeContact = invoicerTradeParty.ele(
								"ram:DefinedTradeContact",
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					const postalTradeAddress = invoicerTradeParty.ele(
						"ram:PostalTradeAddress",
					);

					if (data.transaction.debit.invoicer.postalAddress.postCode) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(data.transaction.debit.invoicer.postalAddress.postCode);
					}
					if (data.transaction.debit.invoicer.postalAddress.line1) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(data.transaction.debit.invoicer.postalAddress.line1);
					}
					if (data.transaction.debit.invoicer.postalAddress.line2) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(data.transaction.debit.invoicer.postalAddress.line2);
					}
					if (data.transaction.debit.invoicer.postalAddress.line3) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(data.transaction.debit.invoicer.postalAddress.line3);
					}
					if (data.transaction.debit.invoicer.postalAddress.city) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(data.transaction.debit.invoicer.postalAddress.city);
					}
					postalTradeAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.debit.invoicer.postalAddress.countryCode.value,
						);
					if (
						data.transaction.debit.invoicer.postalAddress.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.debit.invoicer.postalAddress
									.countrySubdivision,
							);
					}

					if (data.transaction.debit.invoicer.electronicAddress) {
						invoicerTradeParty
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(data.transaction.debit.invoicer.electronicAddress.identifier)
							.att(
								"schemeID",
								data.transaction.debit.invoicer.electronicAddress.schemeId,
							);
					}

					if (data.transaction.debit.invoicer.taxRegistration?.vat?.id) {
						invoicerTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.debit.invoicer.taxRegistration.vat.id
									.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.debit.invoicee) {
					const invoiceeTradeParty = fragment().ele("ram:InvoiceeTradeParty");
					const refNode =
						(
							getCachedNode("BG-10") ||
							getCachedNode("BG-16") ||
							getCachedNode("BG-23[0]") ||
							setCachedNode(
								(node) =>
									node.node.nodeName === "ram:PayeeTradeParty"
										? "BG-10"
										: node.node.nodeName ===
												"ram:SpecifiedTradeSettlementPaymentMeans"
											? "BG-16"
											: "BG-23[0]",
								applicableHeaderTradeSettlement.find((node) =>
									[
										"ram:PayeeTradeParty",
										"ram:SpecifiedTradeSettlementPaymentMeans",
										"ram:ApplicableTradeTax",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeSettlement.node.insertBefore(
						invoiceeTradeParty.node,
						refNode,
					);

					if (data.transaction.debit.invoicee.id) {
						invoiceeTradeParty
							.ele("ram:ID")
							.txt(data.transaction.debit.invoicee.id.identifier);
					}

					if (
						data.transaction.debit.invoicee.globalId?.length &&
						data.transaction.debit.invoicee.globalId.length > 0
					) {
						for (const id of data.transaction.debit.invoicee.globalId) {
							const globalId = invoiceeTradeParty.ele("ram:GlobalID");
							globalId.txt(id.identifier);
							if (id.schemeId) {
								globalId.att("schemeID", id.schemeId);
							}
						}
					}

					invoiceeTradeParty
						.ele("ram:Name")
						.txt(data.transaction.debit.invoicee.name);

					if (data.transaction.debit.invoicee.roleCode) {
						invoiceeTradeParty
							.ele("ram:RoleCode")
							.txt(data.transaction.debit.invoicee.roleCode.value);
					}

					if (data.transaction.debit.invoicee.organization) {
						const specifiedLegalOrganization = invoiceeTradeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);

						if (data.transaction.debit.invoicee.organization.id) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(
								data.transaction.debit.invoicee.organization.id.identifier,
							);
							if (data.transaction.debit.invoicee.organization.id.schemeId) {
								id.att(
									"schemeID",
									data.transaction.debit.invoicee.organization.id.schemeId,
								);
							}
						}

						if (data.transaction.debit.invoicee.organization.tradingName) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(data.transaction.debit.invoicee.organization.tradingName);
						}

						if (data.transaction.debit.invoicee.organization.postalAddress) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:SpecifiedLegalOrganization",
							);

							if (
								data.transaction.debit.invoicee.organization.postalAddress
									.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.debit.invoicee.organization.postalAddress
											.postCode,
									);
							}
							if (
								data.transaction.debit.invoicee.organization.postalAddress.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.debit.invoicee.organization.postalAddress
											.line1,
									);
							}
							if (
								data.transaction.debit.invoicee.organization.postalAddress.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.debit.invoicee.organization.postalAddress
											.line2,
									);
							}
							if (
								data.transaction.debit.invoicee.organization.postalAddress.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.debit.invoicee.organization.postalAddress
											.line3,
									);
							}
							if (
								data.transaction.debit.invoicee.organization.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.debit.invoicee.organization.postalAddress
											.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.debit.invoicee.organization.postalAddress
										.countryCode.value,
								);
							if (
								data.transaction.debit.invoicee.organization.postalAddress
									.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.debit.invoicee.organization.postalAddress
											.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.debit.invoicee.contact?.length &&
						data.transaction.debit.invoicee.contact.length > 0
					) {
						for (const contact of data.transaction.debit.invoicee.contact) {
							const definedTradeContact = invoiceeTradeParty.ele(
								"ram:DefinedTradeContact",
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}

							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}

							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}

							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}

							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}

							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					const postalTradeAddress = invoiceeTradeParty.ele(
						"ram:PostalTradeAddress",
					);

					if (data.transaction.debit.invoicee.postalAddress.postCode) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(data.transaction.debit.invoicee.postalAddress.postCode);
					}
					if (data.transaction.debit.invoicee.postalAddress.line1) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(data.transaction.debit.invoicee.postalAddress.line1);
					}
					if (data.transaction.debit.invoicee.postalAddress.line2) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(data.transaction.debit.invoicee.postalAddress.line2);
					}
					if (data.transaction.debit.invoicee.postalAddress.line3) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(data.transaction.debit.invoicee.postalAddress.line3);
					}
					if (data.transaction.debit.invoicee.postalAddress.city) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(data.transaction.debit.invoicee.postalAddress.city);
					}
					postalTradeAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.debit.invoicee.postalAddress.countryCode.value,
						);
					if (
						data.transaction.debit.invoicee.postalAddress.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.debit.invoicee.postalAddress
									.countrySubdivision,
							);
					}

					if (data.transaction.debit.invoicee.electronicAddress) {
						invoiceeTradeParty
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(data.transaction.debit.invoicee.electronicAddress.identifier)
							.att(
								"schemeID",
								data.transaction.debit.invoicee.electronicAddress.schemeId,
							);
					}

					if (data.transaction.debit.invoicee.taxRegistration?.vat?.id) {
						invoiceeTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.debit.invoicee.taxRegistration.vat.id
									.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.debit.payee) {
					const payeeTradeParty = findNode(
						"BG-10",
						applicableHeaderTradeSettlement,
						(node) => node.node.nodeName === "ram:PayeeTradeParty",
						(fragment) => {
							const payeeTradeParty = fragment.ele("ram:PayeeTradeParty");
							const refNode =
								(
									getCachedNode("BG-16") ||
									getCachedNode("BG-23[0]") ||
									setCachedNode(
										(node) =>
											node.node.nodeName ===
											"ram:SpecifiedTradeSettlementPaymentMeans"
												? "BG-16"
												: "BG-23[0]",
										applicableHeaderTradeSettlement.find((node) =>
											[
												"ram:SpecifiedTradeSettlementPaymentMeans",
												"ram:ApplicableTradeTax",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							applicableHeaderTradeSettlement.node.insertBefore(
								payeeTradeParty.node,
								refNode,
							);
							return payeeTradeParty;
						},
					);

					if (data.transaction.debit.payee.roleCode) {
						const roleCode = fragment().ele("ram:RoleCode");
						roleCode.txt(data.transaction.debit.payee.roleCode.value);
						const refNode =
							findNode(
								"BT-61-00",
								payeeTradeParty,
								(node) =>
									node.node.nodeName === "ram:SpecifiedLegalOrganization",
							)?.node ?? null;
						payeeTradeParty.node.insertBefore(roleCode.node, refNode);
					}

					if (data.transaction.debit.payee.organization) {
						const specifiedLegalOrganization = findNode(
							"BT-61-00",
							payeeTradeParty,
							(node) => node.node.nodeName === "ram:SpecifiedLegalOrganization",
							() => payeeTradeParty.ele("ram:SpecifiedLegalOrganization"),
						);

						if (data.transaction.debit.payee.organization.tradingName) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(data.transaction.debit.payee.organization.tradingName);
						}

						if (data.transaction.debit.payee.organization.postalAddress) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.debit.payee.organization.postalAddress.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.debit.payee.organization.postalAddress
											.postCode,
									);
							}
							if (
								data.transaction.debit.payee.organization.postalAddress.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.debit.payee.organization.postalAddress
											.line1,
									);
							}
							if (
								data.transaction.debit.payee.organization.postalAddress.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.debit.payee.organization.postalAddress
											.line2,
									);
							}
							if (
								data.transaction.debit.payee.organization.postalAddress.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.debit.payee.organization.postalAddress
											.line3,
									);
							}
							if (
								data.transaction.debit.payee.organization.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.debit.payee.organization.postalAddress
											.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.debit.payee.organization.postalAddress
										.countryCode.value,
								);
							if (
								data.transaction.debit.payee.organization.postalAddress
									.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.debit.payee.organization.postalAddress
											.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.debit.payee.contact?.length &&
						data.transaction.debit.payee.contact.length > 0
					) {
						for (const contact of data.transaction.debit.payee.contact) {
							const definedTradeContact = payeeTradeParty.ele(
								"ram:DefinedTradeContact",
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					if (data.transaction.debit.payee.postalAddress) {
						const postalTradeAddress = payeeTradeParty.ele(
							"ram:PostalTradeAddress",
						);

						if (data.transaction.debit.payee.postalAddress.postCode) {
							postalTradeAddress
								.ele("ram:PostcodeCode")
								.txt(data.transaction.debit.payee.postalAddress.postCode);
						}
						if (data.transaction.debit.payee.postalAddress.line1) {
							postalTradeAddress
								.ele("ram:LineOne")
								.txt(data.transaction.debit.payee.postalAddress.line1);
						}
						if (data.transaction.debit.payee.postalAddress.line2) {
							postalTradeAddress
								.ele("ram:LineTwo")
								.txt(data.transaction.debit.payee.postalAddress.line2);
						}
						if (data.transaction.debit.payee.postalAddress.line3) {
							postalTradeAddress
								.ele("ram:LineThree")
								.txt(data.transaction.debit.payee.postalAddress.line3);
						}
						if (data.transaction.debit.payee.postalAddress.city) {
							postalTradeAddress
								.ele("ram:CityName")
								.txt(data.transaction.debit.payee.postalAddress.city);
						}
						postalTradeAddress
							.ele("ram:CountryID")
							.txt(
								data.transaction.debit.payee.postalAddress.countryCode.value,
							);
						if (data.transaction.debit.payee.postalAddress.countrySubdivision) {
							postalTradeAddress
								.ele("ram:CountrySubDivisionName")
								.txt(
									data.transaction.debit.payee.postalAddress.countrySubdivision,
								);
						}
					}

					if (data.transaction.debit.payee.electronicAddress) {
						payeeTradeParty
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(data.transaction.debit.payee.electronicAddress.identifier)
							.att(
								"schemeID",
								data.transaction.debit.payee.electronicAddress.schemeId,
							);
					}

					if (data.transaction.debit.payee.taxRegistration?.vat?.id) {
						payeeTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.debit.payee.taxRegistration.vat.id.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.debit.payer) {
					const payerTradeParty = fragment().ele("ram:PayerTradeParty");
					const refNode =
						(
							getCachedNode("BG-16") ||
							getCachedNode("BG-23[0]") ||
							setCachedNode(
								(node) =>
									node.node.nodeName ===
									"ram:SpecifiedTradeSettlementPaymentMeans"
										? "BG-16"
										: "BG-23[0]",
								applicableHeaderTradeSettlement.find((node) =>
									[
										"ram:SpecifiedTradeSettlementPaymentMeans",
										"ram:ApplicableTradeTax",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeSettlement.node.insertBefore(
						payerTradeParty.node,
						refNode,
					);

					if (data.transaction.debit.payer.id) {
						payerTradeParty
							.ele("ram:ID")
							.txt(data.transaction.debit.payer.id.identifier);
					}
					if (
						data.transaction.debit.payer.globalId?.length &&
						data.transaction.debit.payer.globalId.length
					) {
						for (const id of data.transaction.debit.payer.globalId) {
							const globalId = payerTradeParty.ele("ram:GlobalID");
							globalId.txt(id.identifier);
							if (id.schemeId) {
								globalId.att("schemeID", id.schemeId);
							}
						}
					}

					payerTradeParty
						.ele("ram:Name")
						.txt(data.transaction.debit.payer.name);

					if (data.transaction.debit.payer.roleCode) {
						payerTradeParty
							.ele("ram:RoleCode")
							.txt(data.transaction.debit.payer.roleCode.value);
					}

					if (data.transaction.debit.payer.organization) {
						const specifiedLegalOrganization = payerTradeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);

						if (data.transaction.debit.payer.organization.id) {
							const id = specifiedLegalOrganization.ele("ram:ID");
							id.txt(data.transaction.debit.payer.organization.id.identifier);
							if (data.transaction.debit.payer.organization.id.schemeId) {
								id.att(
									"schemeID",
									data.transaction.debit.payer.organization.id.schemeId,
								);
							}
						}

						if (data.transaction.debit.payer.organization.tradingName) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(data.transaction.debit.payer.organization.tradingName);
						}

						if (data.transaction.debit.payer.organization.postalAddress) {
							const postalTradeAddress = specifiedLegalOrganization.ele(
								"ram:PostalTradeAddress",
							);

							if (
								data.transaction.debit.payer.organization.postalAddress.postCode
							) {
								postalTradeAddress
									.ele("ram:PostcodeCode")
									.txt(
										data.transaction.debit.payer.organization.postalAddress
											.postCode,
									);
							}
							if (
								data.transaction.debit.payer.organization.postalAddress.line1
							) {
								postalTradeAddress
									.ele("ram:LineOne")
									.txt(
										data.transaction.debit.payer.organization.postalAddress
											.line1,
									);
							}
							if (
								data.transaction.debit.payer.organization.postalAddress.line2
							) {
								postalTradeAddress
									.ele("ram:LineTwo")
									.txt(
										data.transaction.debit.payer.organization.postalAddress
											.line2,
									);
							}
							if (
								data.transaction.debit.payer.organization.postalAddress.line3
							) {
								postalTradeAddress
									.ele("ram:LineThree")
									.txt(
										data.transaction.debit.payer.organization.postalAddress
											.line3,
									);
							}
							if (
								data.transaction.debit.payer.organization.postalAddress.city
							) {
								postalTradeAddress
									.ele("ram:CityName")
									.txt(
										data.transaction.debit.payer.organization.postalAddress
											.city,
									);
							}
							postalTradeAddress
								.ele("ram:CountryID")
								.txt(
									data.transaction.debit.payer.organization.postalAddress
										.countryCode.value,
								);
							if (
								data.transaction.debit.payer.organization.postalAddress
									.countrySubdivision
							) {
								postalTradeAddress
									.ele("ram:CountrySubDivisionName")
									.txt(
										data.transaction.debit.payer.organization.postalAddress
											.countrySubdivision,
									);
							}
						}
					}

					if (
						data.transaction.debit.payer.contact?.length &&
						data.transaction.debit.payer.contact.length > 0
					) {
						for (const contact of data.transaction.debit.payer.contact) {
							const definedTradeContact = payerTradeParty.ele(
								"ram:DefinedTradeContact",
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
							}
							if (contact.departmentName) {
								definedTradeContact
									.ele("ram:DepartmentName")
									.txt(contact.departmentName);
							}
							if (contact.typeCode) {
								definedTradeContact
									.ele("ram:TypeCode")
									.txt(contact.typeCode.value);
							}
							if (contact.phoneNumber) {
								definedTradeContact
									.ele("ram:TelephoneUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.phoneNumber);
							}
							if (contact.faxNumber) {
								definedTradeContact
									.ele("ram:FaxUniversalCommunication")
									.ele("ram:CompleteNumber")
									.txt(contact.faxNumber);
							}
							if (contact.emailAddress) {
								definedTradeContact
									.ele("ram:EmailURIUniversalCommunication")
									.ele("ram:URIID")
									.txt(contact.emailAddress);
							}
						}
					}

					const postalTradeAddress = payerTradeParty.ele(
						"ram:PostalTradeAddress",
					);

					if (data.transaction.debit.payer.postalAddress.postCode) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(data.transaction.debit.payer.postalAddress.postCode);
					}
					if (data.transaction.debit.payer.postalAddress.line1) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(data.transaction.debit.payer.postalAddress.line1);
					}
					if (data.transaction.debit.payer.postalAddress.line2) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(data.transaction.debit.payer.postalAddress.line2);
					}
					if (data.transaction.debit.payer.postalAddress.line3) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(data.transaction.debit.payer.postalAddress.line3);
					}
					if (data.transaction.debit.payer.postalAddress.city) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(data.transaction.debit.payer.postalAddress.city);
					}
					postalTradeAddress
						.ele("ram:CountryID")
						.txt(data.transaction.debit.payer.postalAddress.countryCode.value);
					if (data.transaction.debit.payer.postalAddress.countrySubdivision) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.debit.payer.postalAddress.countrySubdivision,
							);
					}

					if (data.transaction.debit.payer.electronicAddress) {
						payerTradeParty
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID")
							.txt(data.transaction.debit.payer.electronicAddress.identifier)
							.att(
								"schemeID",
								data.transaction.debit.payer.electronicAddress.schemeId,
							);
					}

					if (data.transaction.debit.payer.taxRegistration?.vat?.id) {
						payerTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(
								data.transaction.debit.payer.taxRegistration.vat.id.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.debit.currencyExchange) {
					const taxApplicableTradeCurrencyExchange = fragment().ele(
						"ram:TaxApplicableTradeCurrencyExchange",
					);
					const refNode =
						(
							getCachedNode("BG-16") ||
							getCachedNode("BG-23[0]") ||
							setCachedNode(
								(node) =>
									node.node.nodeName ===
									"ram:SpecifiedTradeSettlementPaymentMeans"
										? "BG-16"
										: "BG-23[0]",
								applicableHeaderTradeSettlement.find((node) =>
									[
										"ram:SpecifiedTradeSettlementPaymentMeans",
										"ram:ApplicableTradeTax",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeSettlement.node.insertBefore(
						taxApplicableTradeCurrencyExchange.node,
						refNode,
					);

					taxApplicableTradeCurrencyExchange
						.ele("ram:SourceCurrencyCode")
						.txt(data.transaction.debit.currencyExchange.invoiceCurrency.value);
					taxApplicableTradeCurrencyExchange
						.ele("ram:TargetCurrencyCode")
						.txt(data.transaction.debit.currencyExchange.localCurrency.value);
					taxApplicableTradeCurrencyExchange
						.ele("ram:ConversionRate")
						.txt(
							data.transaction.debit.currencyExchange.exchangeRate.toString(),
						);

					if (data.transaction.debit.currencyExchange.exchangeRateDate) {
						taxApplicableTradeCurrencyExchange
							.ele("ram:ConversionRateDateTime")
							.ele("udt:DateTimeString")
							.txt(
								data.transaction.debit.currencyExchange.exchangeRateDate.value,
							)
							.att(
								"format",
								data.transaction.debit.currencyExchange.exchangeRateDate.format,
							);
					}
				}

				if (data.transaction.debit.paymentMeans) {
					const specifiedTradeSettlementPaymentMeans = findNode(
						"BG-16",
						applicableHeaderTradeSettlement,
						(node) =>
							node.node.nodeName === "ram:SpecifiedTradeSettlementPaymentMeans",
						(fragment) => {
							const specifiedTradeSettlementPaymentMeans = fragment.ele(
								"ram:SpecifiedTradeSettlementPaymentMeans",
							);
							const refNode =
								findNode(
									"BG-23[0]",
									applicableHeaderTradeSettlement,
									(node) => node.node.nodeName === "ram:ApplicableTradeTax",
								)?.node ?? null;
							applicableHeaderTradeSettlement.node.insertBefore(
								specifiedTradeSettlementPaymentMeans.node,
								refNode,
							);
							return specifiedTradeSettlementPaymentMeans;
						},
					);

					if (
						data.transaction.debit.paymentMeans.buyerBankDetails?.accountName
					) {
						const payerPartyDebtorFinancialAccount = findNode(
							"BT-91-00",
							specifiedTradeSettlementPaymentMeans,
							(node) =>
								node.node.nodeName === "ram:PayerPartyDebtorFinancialAccount",
							(fragment) => {
								const payerPartyDebtorFinancialAccount = fragment.ele(
									"ram:PayerPartyDebtorFinancialAccount",
								);
								const refNode =
									findNode(
										"BG-17[0]",
										specifiedTradeSettlementPaymentMeans,
										(node) =>
											node.node.nodeName ===
											"ram:PayeePartyCreditorFinancialAccount",
									)?.node ??
									findNode(
										"BT-86-00",
										specifiedTradeSettlementPaymentMeans,
										(node) =>
											node.node.nodeName ===
											"ram:PayeeSpecifiedCreditorFinancialInstitution",
									)?.node ??
									null;
								specifiedTradeSettlementPaymentMeans.node.insertBefore(
									payerPartyDebtorFinancialAccount.node,
									refNode,
								);
								return payerPartyDebtorFinancialAccount;
							},
						);

						payerPartyDebtorFinancialAccount
							.ele("ram:AccountName")
							.txt(
								data.transaction.debit.paymentMeans.buyerBankDetails
									.accountName,
							);
					}

					if (data.transaction.debit.paymentMeans.paymentServiceProvider?.bic) {
						const payerSpecifiedDebtorFinancialInstitution = fragment().ele(
							"ram:PayerSpecifiedDebtorFinancialInstitution",
						);
						const refNode =
							findNode(
								"BT-86-00",
								specifiedTradeSettlementPaymentMeans,
								(node) =>
									node.node.nodeName ===
									"ram:PayeeSpecifiedCreditorFinancialInstitution",
							)?.node ?? null;
						specifiedTradeSettlementPaymentMeans.node.insertBefore(
							payerSpecifiedDebtorFinancialInstitution.node,
							refNode,
						);

						payerSpecifiedDebtorFinancialInstitution
							.ele("ram:BICID")
							.txt(
								data.transaction.debit.paymentMeans.paymentServiceProvider.bic
									.identifier,
							);
					}
				}

				const applicableTradeTaxNodes = findAllNodes(
					applicableHeaderTradeSettlement,
					(node) => node.node.nodeName === "ram:ApplicableTradeTax",
				);
				for (let i = 0; i < data.transaction.debit.vatBreakdown.length; i++) {
					const vatBreakdown = data.transaction.debit.vatBreakdown[i];
					const applicableTradeTax = applicableTradeTaxNodes[i];
					if (!vatBreakdown || !applicableTradeTax) continue;

					if (vatBreakdown.lineTotalBasisAmount) {
						const lineTotalBasisAmount = fragment().ele(
							"ram:LineTotalBasisAmount",
						);
						lineTotalBasisAmount.txt(
							vatBreakdown.lineTotalBasisAmount.value.toString(),
						);
						const refNode =
							findNode(
								`BT-118[${i}]`,
								applicableTradeTax,
								(node) => node.node.nodeName === "ram:CategoryCode",
							)?.node ?? null;
						applicableTradeTax.node.insertBefore(
							lineTotalBasisAmount.node,
							refNode,
						);
					}

					if (vatBreakdown.allowanceChargeBasisAmount) {
						const allowanceChargeBasisAmount = fragment().ele(
							"ram:AllowanceChargeBasisAmount",
						);
						allowanceChargeBasisAmount.txt(
							vatBreakdown.allowanceChargeBasisAmount.value.toString(),
						);
						const refNode =
							findNode(
								`BT-118[${i}]`,
								applicableTradeTax,
								(node) => node.node.nodeName === "ram:CategoryCode",
							)?.node ?? null;
						applicableTradeTax.node.insertBefore(
							allowanceChargeBasisAmount.node,
							refNode,
						);
					}
				}

				if (data.transaction.debit.invoicingPeriod) {
					const billingSpecifiedPeriod = findNode(
						"BG-14",
						applicableHeaderTradeSettlement,
						(node) => node.node.nodeName === "ram:BillingSpecifiedPeriod",
						(fragment) => {
							const billingSpecifiedPeriod = fragment.ele(
								"ram:BillingSpecifiedPeriod",
							);
							const refNode =
								(
									getCachedNode("BG-20[0]") ||
									getCachedNode("BG-21[0]") ||
									getCachedNode("BT-20-00[0]") ||
									// || getCachedNode("BG-22")
									setCachedNode(
										(node) => {
											if (
												node.node.nodeName ===
												"ram:SpecifiedTradeAllowanceCharge"
											) {
												if (
													[...node.node.childNodes].some(
														(child) =>
															child.nodeName === "ram:ChargeIndicator" &&
															[...child.childNodes].some(
																(c) =>
																	c.nodeName === "udt:Indicator" &&
																	c.textContent?.trim() === "false",
															),
													)
												) {
													return "BG-20[0]";
												}
												return "BG-21[0]";
											}
											if (
												node.node.nodeName === "ram:SpecifiedTradePaymentTerms"
											) {
												return "BT-20-00[0]";
											}
											return "BG-22";
										},
										applicableHeaderTradeSettlement.find((node) =>
											[
												"ram:SpecifiedTradeAllowanceCharge",
												"ram:SpecifiedTradePaymentTerms",
												"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							applicableHeaderTradeSettlement.node.insertBefore(
								billingSpecifiedPeriod.node,
								refNode,
							);
							return billingSpecifiedPeriod;
						},
					);

					if (data.transaction.debit.invoicingPeriod.description) {
						const description = fragment().ele("ram:Description");
						description.txt(data.transaction.debit.invoicingPeriod.description);
						const refNode =
							(
								getCachedNode("BT-73-00") ||
								getCachedNode("BT-74-00") ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:StartDateTime"
											? "BT-73-00"
											: "BT-74-00",
									billingSpecifiedPeriod.find((node) =>
										["ram:StartDateTime", "ram:EndDateTime"].includes(
											node.node.nodeName,
										),
									),
								)
							)?.node ?? null;
						billingSpecifiedPeriod.node.insertBefore(description.node, refNode);
					}
				}

				if (
					data.transaction.debit.allowances?.length &&
					data.transaction.debit.allowances.length > 0
				) {
					const specifiedTradeAllowanceChargeNodes = findAllNodes(
						applicableHeaderTradeSettlement,
						(node) =>
							node.node.nodeName === "ram:SpecifiedTradeAllowanceCharge" &&
							[...node.node.childNodes].some(
								(child) =>
									child.nodeName === "ram:ChargeIndicator" &&
									[...child.childNodes].some(
										(c) =>
											c.nodeName === "udt:Indicator" &&
											c.textContent?.trim() === "false",
									),
							),
					);
					for (let i = 0; i < data.transaction.debit.allowances.length; i++) {
						const allowance = data.transaction.debit.allowances[i];
						const specifiedTradeAllowanceCharge =
							specifiedTradeAllowanceChargeNodes[i];
						if (!allowance || !specifiedTradeAllowanceCharge) continue;

						if (allowance.calculationSequence) {
							const sequenceNumeric = fragment().ele("ram:SequenceNumeric");
							sequenceNumeric.txt(allowance.calculationSequence.identifier);
							const refNode =
								(
									getCachedNode("BT-94") ||
									getCachedNode("BT-93") ||
									getCachedNode("BT-92") ||
									setCachedNode(
										(node) =>
											node.node.nodeName === "ram:CalculationPercent"
												? "BT-94"
												: node.node.nodeName === "ram:BasisAmount"
													? "BT-93"
													: "BT-92",
										specifiedTradeAllowanceCharge.find((node) =>
											[
												"ram:CalculationPercent",
												"ram:BasisAmount",
												"ram:ActualAmount",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							specifiedTradeAllowanceCharge.node.insertBefore(
								sequenceNumeric.node,
								refNode,
							);
						}
						if (allowance.basisQuantity) {
							let value: number;
							let unitCode: string | undefined = undefined;
							if (typeof allowance.basisQuantity === "number") {
								value = allowance.basisQuantity;
							} else {
								value = allowance.basisQuantity.value;
								unitCode = allowance.basisQuantity.unitCode ?? undefined;
							}
							const basisQuantity = fragment().ele("ram:BasisQuantity");
							basisQuantity.txt(value.toString());
							if (unitCode) {
								basisQuantity.att("unitCode", unitCode);
							}

							const refNode =
								findNode(
									"BT-92",
									specifiedTradeAllowanceCharge,
									(node) => node.node.nodeName === "ram:ActualAmount",
								)?.node ?? null;
							specifiedTradeAllowanceCharge.node.insertBefore(
								basisQuantity.node,
								refNode,
							);
						}

						const categoryTradeTax = findNode(
							`BT-95-00[${i}]`,
							specifiedTradeAllowanceCharge,
							(node) => node.node.nodeName === "ram:CategoryTradeTax",
							() => specifiedTradeAllowanceCharge.ele("ram:CategoryTradeTax"),
						);

						if (allowance.categoryTradeTax.exemptionReason) {
							const exemptionReason = fragment()
								.ele("ram:ExemptionReason")
								.txt(allowance.categoryTradeTax.exemptionReason);
							const refNode =
								findNode(
									`BT-95[${i}]`,
									categoryTradeTax,
									(node) => node.node.nodeName === "ram:CategoryCode",
								)?.node ?? null;
							categoryTradeTax.node.insertBefore(exemptionReason.node, refNode);
						}

						if (allowance.categoryTradeTax.exemptionReasonCode) {
							const exemptionReasonCode = fragment()
								.ele("ram:ExemptionReasonCode")
								.txt(allowance.categoryTradeTax.exemptionReasonCode.value);
							const refNode =
								findNode(
									`BT-96[${i}]`,
									categoryTradeTax,
									(node) => node.node.nodeName === "ram:RateApplicablePercent",
								)?.node ?? null;
							categoryTradeTax.node.insertBefore(
								exemptionReasonCode.node,
								refNode,
							);
						}
					}
				}

				if (
					data.transaction.debit.charges?.length &&
					data.transaction.debit.charges.length > 0
				) {
					const specifiedTradeAllowanceChargeNodes = findAllNodes(
						applicableHeaderTradeSettlement,
						(node) =>
							node.node.nodeName === "ram:SpecifiedTradeAllowanceCharge" &&
							[...node.node.childNodes].some(
								(child) =>
									child.nodeName === "ram:ChargeIndicator" &&
									[...child.childNodes].some(
										(c) =>
											c.nodeName === "udt:Indicator" &&
											c.textContent?.trim() === "true",
									),
							),
					);
					for (let i = 0; i < data.transaction.debit.charges.length; i++) {
						const charge = data.transaction.debit.charges[i];
						const specifiedTradeAllowanceCharge =
							specifiedTradeAllowanceChargeNodes[i];
						if (!charge || !specifiedTradeAllowanceCharge) continue;

						if (charge.calculationSequence) {
							const sequenceNumeric = fragment().ele("ram:SequenceNumeric");
							sequenceNumeric.txt(charge.calculationSequence.identifier);
							const refNode =
								(
									getCachedNode("BT-101") ||
									getCachedNode("BT-100") ||
									getCachedNode("BT-99") ||
									setCachedNode(
										(node) =>
											node.node.nodeName === "ram:CalculationPercent"
												? "BT-101"
												: node.node.nodeName === "ram:BasisAmount"
													? "BT-100"
													: "BT-99",
										specifiedTradeAllowanceCharge.find((node) =>
											[
												"ram:CalculationPercent",
												"ram:BasisAmount",
												"ram:ActualAmount",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							specifiedTradeAllowanceCharge.node.insertBefore(
								sequenceNumeric.node,
								refNode,
							);
						}
						if (charge.basisQuantity) {
							let value: number;
							let unitCode: string | undefined = undefined;
							if (typeof charge.basisQuantity === "number") {
								value = charge.basisQuantity;
							} else {
								value = charge.basisQuantity.value;
								unitCode = charge.basisQuantity.unitCode ?? undefined;
							}
							const basisQuantity = fragment().ele("ram:BasisQuantity");
							basisQuantity.txt(value.toString());
							if (unitCode) {
								basisQuantity.att("unitCode", unitCode);
							}

							const refNode =
								findNode(
									"BT-99",
									specifiedTradeAllowanceCharge,
									(node) => node.node.nodeName === "ram:ActualAmount",
								)?.node ?? null;
							specifiedTradeAllowanceCharge.node.insertBefore(
								basisQuantity.node,
								refNode,
							);
						}

						const categoryTradeTax = findNode(
							`BT-95-00[${i}]`,
							specifiedTradeAllowanceCharge,
							(node) => node.node.nodeName === "ram:CategoryTradeTax",
							() => specifiedTradeAllowanceCharge.ele("ram:CategoryTradeTax"),
						);

						if (charge.categoryTradeTax.exemptionReason) {
							const exemptionReason = fragment()
								.ele("ram:ExemptionReason")
								.txt(charge.categoryTradeTax.exemptionReason);
							const refNode =
								findNode(
									`BT-102[${i}]`,
									categoryTradeTax,
									(node) => node.node.nodeName === "ram:CategoryCode",
								)?.node ?? null;
							categoryTradeTax.node.insertBefore(exemptionReason.node, refNode);
						}

						if (charge.categoryTradeTax.exemptionReasonCode) {
							const exemptionReasonCode = fragment()
								.ele("ram:ExemptionReasonCode")
								.txt(charge.categoryTradeTax.exemptionReasonCode.value);
							const refNode =
								findNode(
									`BT-103[${i}]`,
									categoryTradeTax,
									(node) => node.node.nodeName === "ram:RateApplicablePercent",
								)?.node ?? null;
							categoryTradeTax.node.insertBefore(
								exemptionReasonCode.node,
								refNode,
							);
						}
					}
				}

				if (
					data.transaction.debit.logisticsServiceFees?.length &&
					data.transaction.debit.logisticsServiceFees.length > 0
				) {
					const refNode =
						(
							getCachedNode("BT-20-00[0]") ||
							setCachedNode(
								(node) =>
									node.node.nodeName === "ram:SpecifiedTradePaymentTerms"
										? "BT-20-00[0]"
										: "BG-22",
								applicableHeaderTradeSettlement.find((node) =>
									[
										"ram:SpecifiedTradePaymentTerms",
										"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					for (const logisticsServiceFee of data.transaction.debit
						.logisticsServiceFees) {
						const specifiedLogisticsServiceCharge = fragment().ele(
							"ram:SpecifiedLogisticsServiceCharge",
						);
						applicableHeaderTradeSettlement.node.insertBefore(
							specifiedLogisticsServiceCharge.node,
							refNode,
						);

						specifiedLogisticsServiceCharge
							.ele("ram:Description")
							.txt(logisticsServiceFee.description);
						specifiedLogisticsServiceCharge
							.ele("ram:AppliedAmount")
							.txt(logisticsServiceFee.feeAmount.value.toString());

						if (
							logisticsServiceFee.appliedTradeTax?.length &&
							logisticsServiceFee.appliedTradeTax.length > 0
						) {
							for (const tax of logisticsServiceFee.appliedTradeTax) {
								const appliedTradeTax = specifiedLogisticsServiceCharge.ele(
									"ram:AppliedTradeTax",
								);
								appliedTradeTax.ele("ram:TypeCode").txt("VAT");
								if (tax.exemptionReason) {
									appliedTradeTax
										.ele("ram:ExemptionReason")
										.txt(tax.exemptionReason);
								}
								appliedTradeTax
									.ele("ram:CategoryCode")
									.txt(tax.categoryCode.value);
								if (tax.exemptionReasonCode) {
									appliedTradeTax
										.ele("ram:ExemptionReasonCode")
										.txt(tax.exemptionReasonCode.value);
								}
								appliedTradeTax
									.ele("ram:RateApplicablePercent")
									.txt(tax.rateApplicablePercent.toString());
							}
						}
					}
				}

				if (
					data.transaction.debit.paymentTerms?.length &&
					data.transaction.debit.paymentTerms.length > 0
				) {
					const specifiedTradePaymentTermsNodes = findAllNodes(
						applicableHeaderTradeSettlement,
						(node) => node.node.nodeName === "ram:SpecifiedTradePaymentTerms",
					);
					for (let i = 0; i < data.transaction.debit.paymentTerms.length; i++) {
						const paymentTerms = data.transaction.debit.paymentTerms[i];
						const specifiedTradePaymentTerms =
							specifiedTradePaymentTermsNodes[i];
						if (!paymentTerms || !specifiedTradePaymentTerms) continue;

						if (paymentTerms.partialPaymentAmount) {
							specifiedTradePaymentTerms
								.ele("ram:PartialPaymentAmount")
								.txt(paymentTerms.partialPaymentAmount.value.toString());
						}

						if (
							paymentTerms.penaltyTerms?.length &&
							paymentTerms.penaltyTerms.length > 0
						) {
							for (const penaltyTerms of paymentTerms.penaltyTerms) {
								const applicableTradePaymentPenaltyTerms =
									specifiedTradePaymentTerms.ele(
										"ram:ApplicableTradePaymentPenaltyTerms",
									);

								if (penaltyTerms.maturityReferenceDate) {
									applicableTradePaymentPenaltyTerms
										.ele("ram:BasisDateTime")
										.ele("udt:DateTimeString")
										.txt(penaltyTerms.maturityReferenceDate.value)
										.att("format", penaltyTerms.maturityReferenceDate.format);
								}

								if (penaltyTerms.dueDatePeriodBasis) {
									let value: number;
									let unitCode: string | undefined = undefined;

									if (typeof penaltyTerms.dueDatePeriodBasis === "number") {
										value = penaltyTerms.dueDatePeriodBasis;
									} else {
										value = penaltyTerms.dueDatePeriodBasis.value;
										unitCode =
											penaltyTerms.dueDatePeriodBasis.unitCode ?? undefined;
									}

									const basisPeriodMeasure =
										applicableTradePaymentPenaltyTerms.ele(
											"ram:BasisPeriodMeasure",
										);
									basisPeriodMeasure.txt(value.toString());
									if (unitCode) {
										basisPeriodMeasure.att("unitCode", unitCode);
									}
								}

								if (penaltyTerms.basisAmount) {
									applicableTradePaymentPenaltyTerms
										.ele("ram:BasisAmount")
										.txt(penaltyTerms.basisAmount.value.toString());
								}

								if (typeof penaltyTerms.calculationPercent === "number") {
									applicableTradePaymentPenaltyTerms
										.ele("ram:CalculationPercent")
										.txt(penaltyTerms.calculationPercent.toString());
								}

								if (penaltyTerms.actualPenaltyAmount) {
									applicableTradePaymentPenaltyTerms
										.ele("ram:ActualPenaltyAmount")
										.txt(penaltyTerms.actualPenaltyAmount.value.toString());
								}
							}
						}

						if (
							paymentTerms.discountTerms?.length &&
							paymentTerms.discountTerms.length > 0
						) {
							for (const discountTerms of paymentTerms.discountTerms) {
								const applicableTradePaymentDiscountTerms =
									specifiedTradePaymentTerms.ele(
										"ram:ApplicableTradePaymentDiscountTerms",
									);

								if (discountTerms.maturityReferenceDate) {
									applicableTradePaymentDiscountTerms
										.ele("ram:BasisDateTime")
										.ele("udt:DateTimeString")
										.txt(discountTerms.maturityReferenceDate.value)
										.att("format", discountTerms.maturityReferenceDate.format);
								}

								if (discountTerms.dueDatePeriodBasis) {
									let value: number;
									let unitCode: string | undefined = undefined;

									if (typeof discountTerms.dueDatePeriodBasis === "number") {
										value = discountTerms.dueDatePeriodBasis;
									} else {
										value = discountTerms.dueDatePeriodBasis.value;
										unitCode =
											discountTerms.dueDatePeriodBasis.unitCode ?? undefined;
									}

									const basisPeriodMeasure =
										applicableTradePaymentDiscountTerms.ele(
											"ram:BasisPeriodMeasure",
										);
									basisPeriodMeasure.txt(value.toString());
									if (unitCode) {
										basisPeriodMeasure.att("unitCode", unitCode);
									}
								}

								if (discountTerms.basisAmount) {
									applicableTradePaymentDiscountTerms
										.ele("ram:BasisAmount")
										.txt(discountTerms.basisAmount.value.toString());
								}

								if (typeof discountTerms.calculationPercent === "number") {
									applicableTradePaymentDiscountTerms
										.ele("ram:CalculationPercent")
										.txt(discountTerms.calculationPercent.toString());
								}

								if (discountTerms.actualDiscountAmount) {
									applicableTradePaymentDiscountTerms
										.ele("ram:ActualDiscountAmount")
										.txt(discountTerms.actualDiscountAmount.value.toString());
								}
							}
						}

						if (
							paymentTerms.payeePerPayment?.length &&
							paymentTerms.payeePerPayment.length > 0
						) {
							for (const payee of paymentTerms.payeePerPayment) {
								const payeeTradeParty = applicableHeaderTradeSettlement.ele(
									"ram:PayeeTradeParty",
								);

								if (payee.id) {
									payeeTradeParty.ele("ram:ID").txt(payee.id.identifier);
								}

								if (payee.globalId?.length && payee.globalId.length > 0) {
									for (const id of payee.globalId) {
										const globalId = payeeTradeParty.ele("ram:GlobalID");
										globalId.txt(id.identifier);
										if (id.schemeId) {
											globalId.att("schemeID", id.schemeId);
										}
									}
								}

								payeeTradeParty.ele("ram:Name").txt(payee.name);

								if (payee.roleCode) {
									payeeTradeParty.ele("ram:RoleCode").txt(payee.roleCode.value);
								}

								if (payee.organization) {
									const specifiedLegalOrganization = payeeTradeParty.ele(
										"ram:SpecifiedLegalOrganization",
									);

									if (payee.organization.id) {
										const id = specifiedLegalOrganization.ele("ram:ID");
										id.txt(payee.organization.id.identifier);
										if (payee.organization.id.schemeId) {
											id.att("schemeID", payee.organization.id.schemeId);
										}
									}

									if (payee.organization.tradingName) {
										specifiedLegalOrganization
											.ele("ram:TradingBusinessName")
											.txt(payee.organization.tradingName);
									}

									if (payee.organization.postalAddress) {
										const postalTradeAddress = specifiedLegalOrganization.ele(
											"ram:PostalTradeAddress",
										);

										if (payee.organization.postalAddress.postCode) {
											postalTradeAddress
												.ele("ram:PostcodeCode")
												.txt(payee.organization.postalAddress.postCode);
										}
										if (payee.organization.postalAddress.line1) {
											postalTradeAddress
												.ele("ram:LineOne")
												.txt(payee.organization.postalAddress.line1);
										}
										if (payee.organization.postalAddress.line2) {
											postalTradeAddress
												.ele("ram:LineTwo")
												.txt(payee.organization.postalAddress.line2);
										}
										if (payee.organization.postalAddress.line3) {
											postalTradeAddress
												.ele("ram:LineThree")
												.txt(payee.organization.postalAddress.line3);
										}
										if (payee.organization.postalAddress.city) {
											postalTradeAddress
												.ele("ram:CityName")
												.txt(payee.organization.postalAddress.city);
										}
										postalTradeAddress
											.ele("ram:CountryID")
											.txt(payee.organization.postalAddress.countryCode.value);
										if (payee.organization.postalAddress.countrySubdivision) {
											postalTradeAddress
												.ele("ram:CountrySubDivisionName")
												.txt(
													payee.organization.postalAddress.countrySubdivision,
												);
										}
									}
								}

								if (payee.contact?.length && payee.contact.length > 0) {
									for (const contact of payee.contact) {
										const definedTradeContact = payeeTradeParty.ele(
											"ram:DefinedTradeContact",
										);

										if (contact.personName) {
											definedTradeContact
												.ele("ram:PersonName")
												.txt(contact.personName);
										}
										if (contact.departmentName) {
											definedTradeContact
												.ele("ram:DepartmentName")
												.txt(contact.departmentName);
										}
										if (contact.typeCode) {
											definedTradeContact
												.ele("ram:TypeCode")
												.txt(contact.typeCode.value);
										}
										if (contact.phoneNumber) {
											definedTradeContact
												.ele("ram:TelephoneUniversalCommunication")
												.ele("ram:CompleteNumber")
												.txt(contact.phoneNumber);
										}
										if (contact.faxNumber) {
											definedTradeContact
												.ele("ram:FaxUniversalCommunication")
												.ele("ram:CompleteNumber")
												.txt(contact.faxNumber);
										}
										if (contact.emailAddress) {
											definedTradeContact
												.ele("ram:EmailURIUniversalCommunication")
												.ele("ram:URIID")
												.txt(contact.emailAddress);
										}
									}
								}

								const postalTradeAddress = payeeTradeParty.ele(
									"ram:PostalTradeAddress",
								);

								if (payee.postalAddress.postCode) {
									postalTradeAddress
										.ele("ram:PostcodeCode")
										.txt(payee.postalAddress.postCode);
								}
								if (payee.postalAddress.line1) {
									postalTradeAddress
										.ele("ram:LineOne")
										.txt(payee.postalAddress.line1);
								}
								if (payee.postalAddress.line2) {
									postalTradeAddress
										.ele("ram:LineTwo")
										.txt(payee.postalAddress.line2);
								}
								if (payee.postalAddress.line3) {
									postalTradeAddress
										.ele("ram:LineThree")
										.txt(payee.postalAddress.line3);
								}
								if (payee.postalAddress.city) {
									postalTradeAddress
										.ele("ram:CityName")
										.txt(payee.postalAddress.city);
								}
								postalTradeAddress
									.ele("ram:CountryID")
									.txt(payee.postalAddress.countryCode.value);
								if (payee.postalAddress.countrySubdivision) {
									postalTradeAddress
										.ele("ram:CountrySubDivisionName")
										.txt(payee.postalAddress.countrySubdivision);
								}

								if (payee.electronicAddress) {
									payeeTradeParty
										.ele("ram:URIUniversalCommunication")
										.ele("ram:URIID")
										.txt(payee.electronicAddress.identifier)
										.att("schemeID", payee.electronicAddress.schemeId);
								}

								if (payee.taxRegistration?.vat?.id) {
									payeeTradeParty
										.ele("ram:SpecifiedTaxRegistration")
										.ele("ram:ID")
										.txt(payee.taxRegistration.vat.id.identifier)
										.att("schemeID", "VA");
								}
							}
						}
					}
				}

				if (
					data.transaction.debit.financialAdjustments?.length &&
					data.transaction.debit.financialAdjustments.length > 0
				) {
					const refNode =
						findNode(
							"BG-3[0]",
							applicableHeaderTradeSettlement,
							(node) => node.node.nodeName === "ram:InvoiceReferencedDocument",
						)?.node ??
						findNode(
							"BT-19-00",
							applicableHeaderTradeSettlement,
							(node) =>
								node.node.nodeName ===
								"ram:ReceivableSpecifiedTradeAccountingAccount",
						)?.node ??
						null;
					for (const financialAdjustment of data.transaction.debit
						.financialAdjustments) {
						const specifiedFinancialAdjustment = fragment().ele(
							"ram:SpecifiedFinancialAdjustment",
						);
						applicableHeaderTradeSettlement.node.insertBefore(
							specifiedFinancialAdjustment.node,
							refNode,
						);

						specifiedFinancialAdjustment
							.ele("ram:Reason")
							.txt(financialAdjustment.reason);
						specifiedFinancialAdjustment
							.ele("ram:ActualAmount")
							.txt(financialAdjustment.actualAmount.value.toString());
					}
				}

				if (
					data.transaction.debit.precendingInvoices?.length &&
					data.transaction.debit.precendingInvoices.length > 0
				) {
					const invoiceReferenceDocumentNodes = findAllNodes(
						applicableHeaderTradeSettlement,
						(node) => node.node.nodeName === "ram:InvoiceReferenceDocument",
					);
					for (
						let i = 0;
						i < data.transaction.debit.precendingInvoices.length;
						i++
					) {
						const precendingInvoice =
							data.transaction.debit.precendingInvoices[i];
						const invoiceReferenceDocument = invoiceReferenceDocumentNodes[i];
						if (!precendingInvoice || !invoiceReferenceDocument) continue;

						if (precendingInvoice.typeCode) {
							const typeCode = fragment().ele("ram:TypeCode");
							typeCode.txt(precendingInvoice.typeCode);
							const refNode =
								findNode(
									`BT-26-00[${i}]`,
									invoiceReferenceDocument,
									(node) => node.node.nodeName === "ram:FormattedIssueDateTime",
								)?.node ?? null;
							invoiceReferenceDocument.node.insertBefore(
								typeCode.node,
								refNode,
							);
						}
					}
				}

				if (data.transaction.debit.accounting?.typeCode) {
					const receivableSpecifiedTradeAccountingAccount = findNode(
						"BT-19-00",
						applicableHeaderTradeSettlement,
						(node) =>
							node.node.nodeName ===
							"ram:ReceivableSpecifiedTradeAccountingAccount",
						(fragment) =>
							applicableHeaderTradeSettlement.ele(
								"ram:ReceivableSpecifiedTradeAccountingAccount",
							),
					);
					receivableSpecifiedTradeAccountingAccount
						.ele("ram:TypeCode")
						.txt(data.transaction.debit.accounting.typeCode);
				}

				if (
					data.transaction.debit.advancePayments?.length &&
					data.transaction.debit.advancePayments.length > 0
				) {
					for (const advancePayment of data.transaction.debit.advancePayments) {
						const specifiedAdvancePayment = applicableHeaderTradeSettlement.ele(
							"ram:SpecifiedAdvancePayment",
						);
						specifiedAdvancePayment
							.ele("ram:PaidAmount")
							.txt(advancePayment.paidAmount.value.toString());

						if (advancePayment.date) {
							specifiedAdvancePayment
								.ele("ram:FormattedReceivedDateTime")
								.ele("qdt:DateTimeString")
								.txt(advancePayment.date.value)
								.att("format", advancePayment.date.format);
						}

						for (const includedTax of advancePayment.includedTax) {
							const includedTradeTax = specifiedAdvancePayment.ele(
								"ram:IncludedTradeTax",
							);
							includedTradeTax
								.ele("ram:CalculatedAmount")
								.txt(includedTax.calculatedAmount.value.toString());
							includedTradeTax.ele("ram:TypeCode").txt(includedTax.typeCode);
							if (includedTax.exemptionReason) {
								includedTradeTax
									.ele("ram:ExemptionReason")
									.txt(includedTax.exemptionReason);
							}
							if (includedTax.categoryCode) {
								includedTradeTax
									.ele("ram:CategoryCode")
									.txt(includedTax.categoryCode.value);
							}
							if (includedTax.exemptionReasonCode) {
								includedTradeTax
									.ele("ram:ExemptionReasonCode")
									.txt(includedTax.exemptionReasonCode.value);
							}
							includedTradeTax
								.ele("ram:RateApplicablePercent")
								.txt(includedTax.rateApplicablePercent.toString());
						}

						if (advancePayment.precendingInvoice) {
							const invoiceSpecifiedReferencedDocument =
								specifiedAdvancePayment.ele(
									"ram:InvoiceSpecifiedReferencedDocument",
								);

							invoiceSpecifiedReferencedDocument
								.ele("ram:IssuerAssignedID")
								.txt(advancePayment.precendingInvoice.issuerAssignedId);
							if (advancePayment.precendingInvoice.typeCode) {
								invoiceSpecifiedReferencedDocument
									.ele("ram:TypeCode")
									.txt(advancePayment.precendingInvoice.typeCode);
							}

							if (advancePayment.precendingInvoice.date) {
								invoiceSpecifiedReferencedDocument
									.ele("ram:FormattedIssueDateTime")
									.ele("qdt:DateTimeString")
									.txt(advancePayment.precendingInvoice.date.value)
									.att("format", advancePayment.precendingInvoice.date.format);
							}
						}
					}
				}
			}
		}
	},
	rules(data, ctx) {},
});
