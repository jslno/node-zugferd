import { defineProfile } from "@node-zugferd/utils";
import { schema } from "./schema";

export const orderXBasic = defineProfile({
	id: "order-x-basic",
	dataRelationship: ["Data", "Source", "Alternative"],
	extensionSchema: {
		type: ["ORDER", "ORDER_RESPONSE", "ORDER_CHANGE"],
		version: "1.0",
		conformanceLevel: "BASIC",
		fileName: "order-x.xml",
	},
	schema,
	build(data, { root, profile }) {
		const SCRDMCCBDACIOMessageStructure = root.ele(
			"rsm:SCRDMCCBDACIOMessageStructure",
		);
		SCRDMCCBDACIOMessageStructure.att(
			"xmlns:rsm",
			"urn:un:unece:uncefact:data:SCRDMCCBDACIOMessageStructure:100",
		)
			.att(
				"xmlns:udt",
				"urn:un:unece:uncefact:data:standard:UnqualifiedDataType:128",
			)
			.att(
				"xmlns:qdt",
				"urn:un:unece:uncefact:data:standard:QualifiedDataType:128",
			)
			.att(
				"xmlns:ram",
				"urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:128",
			)
			.att("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
		(() => {
			const exchangedDocumentContext = SCRDMCCBDACIOMessageStructure.ele(
				"rsm:ExchangedDocumentContext",
			);

			if (typeof data.processControl?.testIndicator === "boolean") {
				exchangedDocumentContext
					.ele("ram:TestIndicator")
					.ele("udt:Indicator")
					.txt(data.processControl?.testIndicator === true ? "true" : "false");
			}

			if (data.processControl?.businessContextInfo) {
				const businessProcressSpecifiedDocumentContextParameter =
					exchangedDocumentContext.ele(
						"ram:BusinessProcessSpecifiedDocumentContextParameter",
					);

				if (data.processControl.businessContextInfo.processType) {
					businessProcressSpecifiedDocumentContextParameter
						.ele("ram:ID")
						.txt(data.processControl.businessContextInfo.processType);
				}
			}

			const guidelineSpecifiedDocumentContextParameter =
				exchangedDocumentContext.ele(
					"ram:GuidelineSpecifiedDocumentContextParameter",
				);
			guidelineSpecifiedDocumentContextParameter.ele("ram:ID").txt(
				data.processControl?.applicationRecommendationInfo
					?.specificationIdentifier?.identifier ??
					(() => {
						switch (profile.id) {
							case "x-order":
								return "urn:order-x.eu:1p0:comfort";
							case "x-order-extended":
								return "urn:order-x.eu:1p0:extended";
							default:
								return "urn:order-x.eu:1p0:basic";
						}
					})(),
			);
		})();

		(() => {
			const exchangedDocument = SCRDMCCBDACIOMessageStructure.ele(
				"rsm:ExchangedDocument",
			);
			exchangedDocument.ele("ram:ID").txt(data.exchangedDocument.orderId);
			if (data.exchangedDocument.name) {
				exchangedDocument.ele("ram:Name").txt(data.exchangedDocument.name);
			}
			exchangedDocument
				.ele("ram:TypeCode")
				.txt(data.exchangedDocument.orderTypeCode.value);
			if (data.exchangedDocument.statusCode) {
				exchangedDocument
					.ele("ram:StatusCode")
					.txt(data.exchangedDocument.statusCode.value);
			}
			exchangedDocument
				.ele("ram:IssueDateTime")
				.ele("udt:DateTimeString")
				.txt(data.exchangedDocument.orderIssueDate.value)
				.att("format", data.exchangedDocument.orderIssueDate.format);
			if (typeof data.exchangedDocument.copyIndicator === "boolean") {
				exchangedDocument
					.ele("ram:CopyIndicator")
					.ele("udt:Indicator")
					.txt(
						data.exchangedDocument.copyIndicator === true ? "true" : "false",
					);
			}
			if (data.exchangedDocument.purposeCode) {
				exchangedDocument
					.ele("ram:PurposeCode")
					.txt(data.exchangedDocument.purposeCode.value);
			}
			if (data.exchangedDocument.requestedResponseCode) {
				exchangedDocument
					.ele("ram:RequestedResponseTypeCode")
					.txt(data.exchangedDocument.requestedResponseCode);
			}
			if (
				data.exchangedDocument.documentNotes?.length &&
				data.exchangedDocument.documentNotes.length > 0
			) {
				for (const note of data.exchangedDocument.documentNotes) {
					const includedNote = exchangedDocument.ele("ram:IncludedNote");
					includedNote.ele("ram:Content").txt(note.content);
					if (note.subjectCode) {
						includedNote.ele("ram:SubjectCode").txt(note.subjectCode.value);
					}
				}
			}
		})();

		const supplyChainTradeTransaction = SCRDMCCBDACIOMessageStructure.ele(
			"rsm:SupplyChainTradeTransaction",
		);
		if (data.transaction.line?.length && data.transaction.line.length > 0) {
			for (const line of data.transaction.line) {
				const includedSupplyChainTradeLineItem =
					supplyChainTradeTransaction.ele(
						"ram:IncludedSupplyChainTradeLineItem",
					);

				const associatedDocumentLineDocument =
					includedSupplyChainTradeLineItem.ele(
						"ram:AssociatedDocumentLineDocument",
					);
				associatedDocumentLineDocument
					.ele("ram:LineID")
					.txt(line.position.lineId);
				if (line.position.lineStatusCode) {
					associatedDocumentLineDocument
						.ele("ram:LineStatusCode")
						.txt(line.position.lineStatusCode.value);
				}
				if (
					line.position.includedNotes?.length &&
					line.position.includedNotes.length > 0
				) {
					for (const note of line.position.includedNotes) {
						const includedNote =
							associatedDocumentLineDocument.ele("ram:IncludedNote");
						includedNote.ele("ram:Content").txt(note.content);
						if (note.subjectCode) {
							includedNote.ele("ram:SubjectCode").txt(note.subjectCode.value);
						}
					}
				}
				if (line.item) {
					const specifiedTradeProduct = includedSupplyChainTradeLineItem.ele(
						"ram:SpecifiedTradeProduct",
					);
					if (line.item.globalId) {
						specifiedTradeProduct
							.ele("ram:GlobalID")
							.txt(line.item.globalId.identifier)
							.att("schemeID", line.item.globalId.schemeId);
					}
					if (line.item.sellerAssignedId) {
						specifiedTradeProduct
							.ele("ram:SellerAssignedID")
							.txt(line.item.sellerAssignedId);
					}
					if (line.item.buyerAssignedId) {
						specifiedTradeProduct
							.ele("ram:BuyerAssignedID")
							.txt(line.item.buyerAssignedId);
					}
					if (line.item.name) {
						specifiedTradeProduct.ele("ram:Name").txt(line.item.name);
					}
				}
				if (line.substitutedItem) {
					const substitutedReferencedProduct =
						includedSupplyChainTradeLineItem.ele(
							"ram:SubstitutedReferencedProduct",
						);
					if (
						line.substitutedItem.globalId?.length &&
						line.substitutedItem.globalId.length > 0
					) {
						for (const globalId of line.substitutedItem.globalId) {
							substitutedReferencedProduct
								.ele("ram:GlobalID")
								.txt(globalId.identifier)
								.att("schemeID", globalId.schemeId);
						}
					}
					if (line.substitutedItem.sellerAssignedId) {
						substitutedReferencedProduct
							.ele("ram:SellerAssignedID")
							.txt(line.substitutedItem.sellerAssignedId);
					}
					if (line.substitutedItem.buyerAssignedId) {
						substitutedReferencedProduct
							.ele("ram:BuyerAssignedID")
							.txt(line.substitutedItem.buyerAssignedId);
					}
					if (line.substitutedItem.name) {
						substitutedReferencedProduct
							.ele("ram:Name")
							.txt(line.substitutedItem.name);
					}
				}
				const specifiedLineTradeAgreement =
					includedSupplyChainTradeLineItem.ele(
						"ram:SpecifiedLineTradeAgreement",
					);
				if (line.priceDetails.associatedOrder?.lineId) {
					specifiedLineTradeAgreement
						.ele("ram:BuyerOrderReferencedDocument")
						.ele("ram:LineID")
						.txt(line.priceDetails.associatedOrder.lineId);
				}
				const netPriceProductTradePrice = specifiedLineTradeAgreement.ele(
					"ram:NetPriceProductTradePrice",
				);
				netPriceProductTradePrice
					.ele("ram:ChargeAmount")
					.txt(line.priceDetails.netPrice.chargeAmount.toString());
				if (line.priceDetails.netPrice.basisQuantity) {
					const basisQuantity =
						netPriceProductTradePrice.ele("ram:BasisQuantity");
					basisQuantity.txt(
						line.priceDetails.netPrice.basisQuantity.value.toString(),
					);
					if (line.priceDetails.netPrice.basisQuantity.unitCode) {
						basisQuantity.att(
							"unitCode",
							line.priceDetails.netPrice.basisQuantity.unitCode,
						);
					}
				}

				if (line.priceDetails.blanketOrderReference) {
					specifiedLineTradeAgreement
						.ele("ram:BlanketOrderReferencedDocument")
						.ele("ram:LineID")
						.txt(line.priceDetails.blanketOrderReference.lineId);
				}

				const specifiedLineTradeDelivery = includedSupplyChainTradeLineItem.ele(
					"ram:SpecifiedLineTradeDelivery",
				);
				if (typeof line.delivery.partialDeliveryAllowed === "boolean") {
					specifiedLineTradeDelivery
						.ele("ram:PartialDeliveryAllowedIndicator")
						.ele("udt:Indicator")
						.txt(
							line.delivery.partialDeliveryAllowed === true ? "true" : "false",
						);
				}
				specifiedLineTradeDelivery
					.ele("ram:RequestedQuantity")
					.txt(line.delivery.requestedQuantity.value.toString())
					.att("unitCode", line.delivery.requestedQuantity.unitCode);
				if (line.delivery.agreedQuantity) {
					specifiedLineTradeDelivery
						.ele("ram:AgreedQuantity")
						.txt(line.delivery.agreedQuantity.value.toString())
						.att("unitCode", line.delivery.agreedQuantity.unitCode);
				}

				const specifiedLineTradeSettlement =
					includedSupplyChainTradeLineItem.ele(
						"ram:SpecifiedLineTradeSettlement",
					);
				specifiedLineTradeSettlement
					.ele("ram:SpecifiedTradeSettlementLineMonetarySummation")
					.ele("ram:LineTotalAmount")
					.txt(line.billing.itemTotals.lineTotalAmount.value.toString());
			}
		}

		const applicableHeaderTradeAgreement = supplyChainTradeTransaction.ele(
			"ram:ApplicableHeaderTradeAgreement",
		);
		if (data.transaction.contract.buyerReference) {
			applicableHeaderTradeAgreement
				.ele("ram:BuyerReference")
				.txt(data.transaction.contract.buyerReference);
		}

		(() => {
			const sellerTradeParty = applicableHeaderTradeAgreement.ele(
				"ram:SellerTradeParty",
			);
			if (data.transaction.contract.seller.id) {
				sellerTradeParty.ele("ram:ID").txt(data.transaction.contract.seller.id);
			}
			if (
				data.transaction.contract.seller.globalId?.length &&
				data.transaction.contract.seller.globalId.length > 0
			) {
				for (const globalId of data.transaction.contract.seller.globalId) {
					sellerTradeParty
						.ele("ram:GlobalID")
						.txt(globalId.identifier)
						.att("schemeID", globalId.schemeId);
				}
			}
			sellerTradeParty
				.ele("ram:Name")
				.txt(data.transaction.contract.seller.name);
			if (data.transaction.contract.seller.organization) {
				const specifiedLegalOrganization = sellerTradeParty.ele(
					"ram:SpecifiedLegalOrganization",
				);
				if (data.transaction.contract.seller.organization.id) {
					const id = specifiedLegalOrganization
						.ele("ram:ID")
						.txt(data.transaction.contract.seller.organization.id.identifier);
					if (data.transaction.contract.seller.organization.id.schemeId) {
						id.att(
							"schemeID",
							data.transaction.contract.seller.organization.id.schemeId,
						);
					}
				}
				if (data.transaction.contract.seller.organization.tradingName) {
					specifiedLegalOrganization
						.ele("ram:TradingBusinessName")
						.txt(data.transaction.contract.seller.organization.tradingName);
				}
			}

			const contacts = !!data.transaction.contract.seller.contact
				? Array.isArray(data.transaction.contract.seller.contact)
					? (data.transaction.contract.seller
							.contact as (typeof data.transaction.contract.seller.contact)[])
					: [data.transaction.contract.seller.contact]
				: undefined;
			if (contacts?.length && contacts.length) {
				for (const contact of contacts) {
					const definedTradeContact = sellerTradeParty.ele(
						"ram:DefinedTradeContact",
					);
					if (contact.personName) {
						definedTradeContact.ele("ram:PersonName").txt(contact.personName);
					}
					if (contact.departmentName) {
						definedTradeContact
							.ele("ram:DepartmentName")
							.txt(contact.departmentName);
					}
					if (contact.phoneNumber) {
						definedTradeContact
							.ele("ram:TelephoneUniversalCommunication")
							.ele("ram:CompleteNumber")
							.txt(contact.phoneNumber);
					}
					if (contact.emailAddress) {
						definedTradeContact
							.ele("ram:EmailURIUniversalCommunication")
							.ele("ram:URIID")
							.txt(contact.emailAddress);
					}
				}
			}
			if (data.transaction.contract.seller.postalAddress) {
				const postalTradeAddress = sellerTradeParty.ele(
					"ram:PostalTradeAddress",
				);
				if (data.transaction.contract.seller.postalAddress.postCode) {
					postalTradeAddress
						.ele("ram:PostcodeCode")
						.txt(data.transaction.contract.seller.postalAddress.postCode);
				}
				if (data.transaction.contract.seller.postalAddress.line1) {
					postalTradeAddress
						.ele("ram:LineOne")
						.txt(data.transaction.contract.seller.postalAddress.line1);
				}
				if (data.transaction.contract.seller.postalAddress.line2) {
					postalTradeAddress
						.ele("ram:LineTwo")
						.txt(data.transaction.contract.seller.postalAddress.line2);
				}
				if (data.transaction.contract.seller.postalAddress.line3) {
					postalTradeAddress
						.ele("ram:LineThree")
						.txt(data.transaction.contract.seller.postalAddress.line3);
				}
				if (data.transaction.contract.seller.postalAddress.city) {
					postalTradeAddress
						.ele("ram:CityName")
						.txt(data.transaction.contract.seller.postalAddress.city);
				}
				postalTradeAddress
					.ele("ram:CountryID")
					.txt(
						data.transaction.contract.seller.postalAddress.countryCode.value,
					);
				if (data.transaction.contract.seller.postalAddress.countrySubdivision) {
					postalTradeAddress
						.ele("ram:CountrySubDivisionName")
						.txt(
							data.transaction.contract.seller.postalAddress.countrySubdivision,
						);
				}
			}
			if (data.transaction.contract.seller.electronicAddress) {
				sellerTradeParty
					.ele("ram:URIUniversalCommunication")
					.ele("ram:URIID")
					.txt(data.transaction.contract.seller.electronicAddress.identifier)
					.att(
						"schemeID",
						data.transaction.contract.seller.electronicAddress.schemeId,
					);
			}
			const vatRegistrations = !!data.transaction.contract.seller
				.taxRegistration?.vat
				? Array.isArray(data.transaction.contract.seller.taxRegistration.vat)
					? (data.transaction.contract.seller.taxRegistration
							.vat as (typeof data.transaction.contract.seller.taxRegistration.vat)[])
					: [data.transaction.contract.seller.taxRegistration.vat]
				: undefined;
			if (vatRegistrations?.length && vatRegistrations.length > 0) {
				for (const vat of vatRegistrations) {
					sellerTradeParty
						.ele("ram:SpecifiedTaxRegistration")
						.ele("ram:ID")
						.txt(vat.id.identifier)
						.att("schemeID", "VA");
				}
			}
		})();

		(() => {
			const buyerTradeParty = applicableHeaderTradeAgreement.ele(
				"ram:BuyerTradeParty",
			);
			if (data.transaction.contract.buyer.id) {
				buyerTradeParty
					.ele("ram:ID")
					.txt(data.transaction.contract.buyer.id.identifier);
			}
			if (
				data.transaction.contract.buyer.globalId?.length &&
				data.transaction.contract.buyer.globalId.length > 0
			) {
				for (const globalId of data.transaction.contract.buyer.globalId) {
					buyerTradeParty
						.ele("ram:GlobalID")
						.txt(globalId.identifier)
						.att("schemeID", globalId.schemeId);
				}
			}
			buyerTradeParty.ele("ram:Name").txt(data.transaction.contract.buyer.name);
			if (data.transaction.contract.buyer.organization) {
				const specifiedLegalOrganization = buyerTradeParty.ele(
					"ram:SpecifiedLegalOrganization",
				);
				if (data.transaction.contract.buyer.organization.id) {
					const id = specifiedLegalOrganization
						.ele("ram:ID")
						.txt(data.transaction.contract.buyer.organization.id.identifier);
					if (data.transaction.contract.buyer.organization.id.schemeId) {
						id.att(
							"schemeID",
							data.transaction.contract.buyer.organization.id.schemeId,
						);
					}
				}
				if (data.transaction.contract.buyer.organization.tradingName) {
					specifiedLegalOrganization
						.ele("ram:TradingBusinessName")
						.txt(data.transaction.contract.buyer.organization.tradingName);
				}
			}

			const contacts = !!data.transaction.contract.buyer.contact
				? Array.isArray(data.transaction.contract.buyer.contact)
					? (data.transaction.contract.buyer
							.contact as (typeof data.transaction.contract.buyer.contact)[])
					: [data.transaction.contract.buyer.contact]
				: undefined;
			if (contacts?.length && contacts.length > 0) {
				for (const contact of contacts) {
					const definedTradeContact = buyerTradeParty.ele(
						"ram:DefinedTradeContact",
					);
					if (contact.personName) {
						definedTradeContact.ele("ram:PersonName").txt(contact.personName);
					}
					if (contact.departmentName) {
						definedTradeContact
							.ele("ram:DepartmentName")
							.txt(contact.departmentName);
					}
					if (contact.phoneNumber) {
						definedTradeContact
							.ele("ram:TelephoneUniversalCommunication")
							.ele("ram:CompleteNumber")
							.txt(contact.phoneNumber);
					}
					if (contact.emailAddress) {
						definedTradeContact
							.ele("ram:EmailURIUniversalCommunication")
							.ele("ram:URIID")
							.txt(contact.emailAddress);
					}
				}
			}
			const postalTradeAddress = buyerTradeParty.ele("ram:PostalTradeAddress");
			if (data.transaction.contract.buyer.postalAddress.postCode) {
				postalTradeAddress
					.ele("ram:PostcodeCode")
					.txt(data.transaction.contract.buyer.postalAddress.postCode);
			}
			if (data.transaction.contract.buyer.postalAddress.line1) {
				postalTradeAddress
					.ele("ram:LineOne")
					.txt(data.transaction.contract.buyer.postalAddress.line1);
			}
			if (data.transaction.contract.buyer.postalAddress.line2) {
				postalTradeAddress
					.ele("ram:LineTwo")
					.txt(data.transaction.contract.buyer.postalAddress.line2);
			}
			if (data.transaction.contract.buyer.postalAddress.line3) {
				postalTradeAddress
					.ele("ram:LineThree")
					.txt(data.transaction.contract.buyer.postalAddress.line3);
			}
			if (data.transaction.contract.buyer.postalAddress.city) {
				postalTradeAddress
					.ele("ram:CityName")
					.txt(data.transaction.contract.buyer.postalAddress.city);
			}
			postalTradeAddress
				.ele("ram:CountryID")
				.txt(data.transaction.contract.buyer.postalAddress.countryCode.value);
			if (data.transaction.contract.buyer.postalAddress.countrySubdivision) {
				postalTradeAddress
					.ele("ram:CountrySubDivisionName")
					.txt(
						data.transaction.contract.buyer.postalAddress.countrySubdivision,
					);
			}

			if (data.transaction.contract.buyer.electronicAddress) {
				buyerTradeParty
					.ele("ram:URIUniversalCommunication")
					.ele("ram:URIID")
					.txt(data.transaction.contract.buyer.electronicAddress.identifier)
					.att(
						"schemeID",
						data.transaction.contract.buyer.electronicAddress.schemeId,
					);
			}

			const vatRegistrations = !!data.transaction.contract.buyer.taxRegistration
				?.vat
				? Array.isArray(data.transaction.contract.buyer.taxRegistration.vat)
					? (data.transaction.contract.buyer.taxRegistration
							.vat as (typeof data.transaction.contract.buyer.taxRegistration.vat)[])
					: [data.transaction.contract.buyer.taxRegistration.vat]
				: undefined;
			if (vatRegistrations?.length && vatRegistrations.length > 0) {
				for (const vat of vatRegistrations) {
					if (!vat.id) continue;
					buyerTradeParty
						.ele("ram:SpecifiedTaxRegistration")
						.ele("ram:ID")
						.txt(vat.id.identifier)
						.att("schemeID", "VA");
				}
			}
		})();

		if (data.transaction.contract.deliveryTerms) {
			const applicableTradeDeliveryTerms = applicableHeaderTradeAgreement.ele(
				"ram:ApplicableTradeDeliveryTerms",
			);
			if (data.transaction.contract.deliveryTerms.deliveryCode) {
				applicableTradeDeliveryTerms
					.ele("ram:DeliveryTypeCode")
					.txt(data.transaction.contract.deliveryTerms.deliveryCode.value);
			}
			if (data.transaction.contract.deliveryTerms.deliveryMode) {
				applicableTradeDeliveryTerms
					.ele("ram:FunctionCode")
					.txt(data.transaction.contract.deliveryTerms.deliveryMode.value);
			}
		}

		if (data.transaction.contract.associatedOrder) {
			applicableHeaderTradeAgreement
				.ele("ram:BuyerOrderReferencedDocument")
				.ele("ram:IssuerAssignedID")
				.txt(data.transaction.contract.associatedOrder.issuerAssignedId);
		}

		if (data.transaction.contract.quotationReference) {
			applicableHeaderTradeAgreement
				.ele("ram:QuotationReferencedDocument")
				.ele("ram:IssuerAssignedID")
				.txt(data.transaction.contract.quotationReference.issuerAssignedId);
		}

		if (data.transaction.contract.contractReference) {
			applicableHeaderTradeAgreement
				.ele("ram:ContractReferencedDocument")
				.ele("ram:IssuerAssignedID")
				.txt(data.transaction.contract.contractReference.issuerAssignedId);
		}

		if (data.transaction.contract.blanketOrderReference) {
			applicableHeaderTradeAgreement
				.ele("ram:BlanketOrderReferencedDocument")
				.ele("ram:IssuerAssignedID")
				.txt(data.transaction.contract.blanketOrderReference.issuerAssignedId);
		}

		if (data.transaction.contract.previousOrderReference) {
			applicableHeaderTradeAgreement
				.ele("ram:PreviousOrderReferencedDocument")
				.ele("ram:IssuerAssignedID")
				.txt(data.transaction.contract.previousOrderReference.issuerAssignedId);
		}

		if (data.transaction.contract.previousOrderChangeReference) {
			applicableHeaderTradeAgreement
				.ele("ram:PreviousOrderChangeReferencedDocument")
				.ele("ram:IssuerAssignedID")
				.txt(
					data.transaction.contract.previousOrderChangeReference
						.issuerAssignedId,
				);
		}

		if (data.transaction.contract.previousOrderResponseReference) {
			applicableHeaderTradeAgreement
				.ele("ram:PreviousOrderResponseReferencedDocument")
				.ele("ram:IssuerAssignedID")
				.txt(
					data.transaction.contract.previousOrderResponseReference
						.issuerAssignedId,
				);
		}

		const applicableHeaderTradeDelivery = supplyChainTradeTransaction.ele(
			"ram:ApplicableHeaderTradeDelivery",
		);

		if (data.transaction.delivery.recipient) {
			const shipToTradeParty = applicableHeaderTradeDelivery.ele(
				"ram:ShipToTradeParty",
			);

			if (data.transaction.delivery.recipient.id) {
				shipToTradeParty
					.ele("ram:ID")
					.txt(data.transaction.delivery.recipient.id.identifier);
			}
			if (
				data.transaction.delivery.recipient.globalId?.length &&
				data.transaction.delivery.recipient.globalId.length > 0
			) {
				for (const globalId of data.transaction.delivery.recipient.globalId) {
					shipToTradeParty
						.ele("ram:GlobalID")
						.txt(globalId.identifier)
						.att("schemeID", globalId.schemeId);
				}
			}
			shipToTradeParty
				.ele("ram:Name")
				.txt(data.transaction.delivery.recipient.name);

			const contacts = !!data.transaction.delivery.recipient.contact
				? Array.isArray(data.transaction.delivery.recipient.contact)
					? (data.transaction.delivery.recipient
							.contact as (typeof data.transaction.delivery.recipient.contact)[])
					: [data.transaction.delivery.recipient.contact]
				: undefined;
			if (contacts?.length && contacts.length > 0) {
				for (const contact of contacts) {
					const definedTradeContact = shipToTradeParty.ele(
						"ram:DefinedTradeContact",
					);
					if (contact.personName) {
						definedTradeContact.ele("ram:PersonName").txt(contact.personName);
					}
					if (contact.departmentName) {
						definedTradeContact
							.ele("ram:DepartmentName")
							.txt(contact.departmentName);
					}
					if (contact.phoneNumber) {
						definedTradeContact
							.ele("ram:TelephoneUniversalCommunication")
							.ele("ram:CompleteNumber")
							.txt(contact.phoneNumber);
					}
					if (contact.emailAddress) {
						definedTradeContact
							.ele("ram:EmailURIUniversalCommunication")
							.ele("ram:URIID")
							.txt(contact.emailAddress);
					}
				}
			}

			const postalTradeAddress = shipToTradeParty.ele("ram:PostalTradeAddress");

			if (data.transaction.delivery.recipient.postalAddress.postCode) {
				postalTradeAddress
					.ele("ram:PostcodeCode")
					.txt(data.transaction.delivery.recipient.postalAddress.postCode);
			}
			if (data.transaction.delivery.recipient.postalAddress.line1) {
				postalTradeAddress
					.ele("ram:LineOne")
					.txt(data.transaction.delivery.recipient.postalAddress.line1);
			}
			if (data.transaction.delivery.recipient.postalAddress.line2) {
				postalTradeAddress
					.ele("ram:LineTwo")
					.txt(data.transaction.delivery.recipient.postalAddress.line2);
			}
			if (data.transaction.delivery.recipient.postalAddress.line3) {
				postalTradeAddress
					.ele("ram:LineThree")
					.txt(data.transaction.delivery.recipient.postalAddress.line3);
			}
			if (data.transaction.delivery.recipient.postalAddress.city) {
				postalTradeAddress
					.ele("ram:CityName")
					.txt(data.transaction.delivery.recipient.postalAddress.city);
			}
			postalTradeAddress
				.ele("ram:CountryID")
				.txt(
					data.transaction.delivery.recipient.postalAddress.countryCode.value,
				);
			if (
				data.transaction.delivery.recipient.postalAddress.countrySubdivision
			) {
				postalTradeAddress
					.ele("ram:CountrySubDivisionName")
					.txt(
						data.transaction.delivery.recipient.postalAddress
							.countrySubdivision,
					);
			}

			if (data.transaction.delivery.recipient.electronicAddress) {
				shipToTradeParty
					.ele("ram:URIUniversalCommunication")
					.ele("ram:URIID")
					.txt(data.transaction.delivery.recipient.electronicAddress.identifier)
					.att(
						"schemeID",
						data.transaction.delivery.recipient.electronicAddress.schemeId,
					);
			}
		}

		if (data.transaction.delivery.sender) {
			const shipFromTradeParty = applicableHeaderTradeDelivery.ele(
				"ram:ShipFromTradeParty",
			);

			if (data.transaction.delivery.sender.id) {
				shipFromTradeParty
					.ele("ram:ID")
					.txt(data.transaction.delivery.sender.id.identifier);
			}
			if (
				data.transaction.delivery.sender.globalId?.length &&
				data.transaction.delivery.sender.globalId.length > 0
			) {
				for (const globalId of data.transaction.delivery.sender.globalId) {
					shipFromTradeParty
						.ele("ram:GlobalID")
						.txt(globalId.identifier)
						.att("schemeID", globalId.schemeId);
				}
			}
			shipFromTradeParty
				.ele("ram:Name")
				.txt(data.transaction.delivery.sender.name);
			const contacts = !!data.transaction.delivery.sender.contact
				? Array.isArray(data.transaction.delivery.sender.contact)
					? data.transaction.delivery.sender.contact
					: [data.transaction.delivery.sender.contact]
				: undefined;
			if (contacts?.length && contacts.length > 0) {
				for (const contact of contacts) {
					const definedTradeContact = shipFromTradeParty.ele(
						"ram:DefinedTradeContact",
					);
					if (contact.personName) {
						definedTradeContact.ele("ram:PersonName").txt(contact.personName);
					}
					if (contact.departmentName) {
						definedTradeContact
							.ele("ram:DepartmentName")
							.txt(contact.departmentName);
					}
					if (contact.phoneNumber) {
						definedTradeContact
							.ele("ram:TelephoneUniversalCommunication")
							.ele("ram:CompleteNumber")
							.txt(contact.phoneNumber);
					}
					if (contact.emailAddress) {
						definedTradeContact
							.ele("ram:EmailURIUniversalCommunication")
							.ele("ram:URIID")
							.txt(contact.emailAddress);
					}
				}
			}
			if (data.transaction.delivery.sender.postalAddress) {
				const postalTradeAddress = shipFromTradeParty.ele(
					"ram:PostalTradeAddress",
				);
				if (data.transaction.delivery.sender.postalAddress.postCode) {
					postalTradeAddress
						.ele("ram:PostcodeCode")
						.txt(data.transaction.delivery.sender.postalAddress.postCode);
				}
				if (data.transaction.delivery.sender.postalAddress.line1) {
					postalTradeAddress
						.ele("ram:LineOne")
						.txt(data.transaction.delivery.sender.postalAddress.line1);
				}
				if (data.transaction.delivery.sender.postalAddress.line2) {
					postalTradeAddress
						.ele("ram:LineTwo")
						.txt(data.transaction.delivery.sender.postalAddress.line2);
				}
				if (data.transaction.delivery.sender.postalAddress.line3) {
					postalTradeAddress
						.ele("ram:LineThree")
						.txt(data.transaction.delivery.sender.postalAddress.line3);
				}
				if (data.transaction.delivery.sender.postalAddress.city) {
					postalTradeAddress
						.ele("ram:CityName")
						.txt(data.transaction.delivery.sender.postalAddress.city);
				}
				postalTradeAddress
					.ele("ram:CountryID")
					.txt(
						data.transaction.delivery.sender.postalAddress.countryCode.value,
					);
				if (data.transaction.delivery.sender.postalAddress.countrySubdivision) {
					postalTradeAddress
						.ele("ram:CountrySubDivisionName")
						.txt(
							data.transaction.delivery.sender.postalAddress.countrySubdivision,
						);
				}
			}
			if (data.transaction.delivery.sender.electronicAddress) {
				shipFromTradeParty
					.ele("ram:URIUniversalCommunication")
					.ele("ram:URIID")
					.txt(data.transaction.delivery.sender.electronicAddress.identifier)
					.att(
						"schemeID",
						data.transaction.delivery.sender.electronicAddress.schemeId,
					);
			}
		}

		if (
			data.transaction.delivery.requestedDeliveries?.length &&
			data.transaction.delivery.requestedDeliveries.length > 0
		) {
			for (const requestedDelivery of data.transaction.delivery
				.requestedDeliveries) {
				const requestedDeliverySupplyChainEvent =
					applicableHeaderTradeDelivery.ele(
						"ram:RequestedDeliverySupplyChainEvent",
					);
				if (requestedDelivery.date) {
					requestedDeliverySupplyChainEvent
						.ele("ram:OccurrenceDateTime")
						.ele("udt:DateTimeString")
						.txt(requestedDelivery.date.value)
						.att("format", requestedDelivery.date.format);
				}
				if (requestedDelivery.period) {
					const occurrenceSpecifiedPeriod =
						requestedDeliverySupplyChainEvent.ele(
							"ram:OccurrenceSpecifiedPeriod",
						);
					if (requestedDelivery.period.startDate) {
						occurrenceSpecifiedPeriod
							.ele("ram:StartDateTime")
							.ele("udt:DateTimeString")
							.txt(requestedDelivery.period.startDate.value)
							.att("format", requestedDelivery.period.startDate.format);
					}
					if (requestedDelivery.period.endDate) {
						occurrenceSpecifiedPeriod
							.ele("ram:EndDateTime")
							.ele("udt:DateTimeString")
							.txt(requestedDelivery.period.endDate.value)
							.att("format", requestedDelivery.period.endDate.format);
					}
				}
			}
		}

		if (
			data.transaction.delivery.requestedPickUps?.length &&
			data.transaction.delivery.requestedPickUps.length > 0
		) {
			for (const requestedPickup of data.transaction.delivery
				.requestedPickUps) {
				const requestedDespatchSupplyChainEvent =
					applicableHeaderTradeDelivery.ele(
						"ram:RequestedDespatchSupplyChainEvent",
					);
				if (requestedPickup.date) {
					requestedDespatchSupplyChainEvent
						.ele("ram:OccurrenceDateTime")
						.ele("udt:DateTimeString")
						.txt(requestedPickup.date.value)
						.att("format", requestedPickup.date.format);
				}
				if (requestedPickup.period) {
					const occurrenceSpecifiedPeriod =
						requestedDespatchSupplyChainEvent.ele(
							"ram:OccurrenceSpecifiedPeriod",
						);
					if (requestedPickup.period.startDate) {
						occurrenceSpecifiedPeriod
							.ele("ram:StartDateTime")
							.ele("udt:DateTimeString")
							.txt(requestedPickup.period.startDate.value)
							.att("format", requestedPickup.period.startDate.format);
					}
					if (requestedPickup.period.endDate) {
						occurrenceSpecifiedPeriod
							.ele("ram:EndDateTime")
							.ele("udt:DateTimeString")
							.txt(requestedPickup.period.endDate.value)
							.att("format", requestedPickup.period.endDate.format);
					}
				}
			}
		}

		const applicableHeaderTradeSettlement = supplyChainTradeTransaction.ele(
			"ram:ApplicableHeaderTradeSettlement",
		);
		applicableHeaderTradeSettlement
			.ele("ram:OrderCurrencyCode")
			.txt(data.transaction.debit.orderCurrency.value);

		const specifiedTradeSettlementHeaderMonetarySummation =
			applicableHeaderTradeSettlement.ele(
				"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
			);
		specifiedTradeSettlementHeaderMonetarySummation
			.ele("ram:LineTotalAmount")
			.txt(
				data.transaction.debit.documentTotals.lineTotalAmount.value.toString(),
			);
		if (data.transaction.debit.documentTotals.chargeTotalAmount) {
			specifiedTradeSettlementHeaderMonetarySummation
				.ele("ram:ChargeTotalAmount")
				.txt(
					data.transaction.debit.documentTotals.chargeTotalAmount.value.toString(),
				);
		}
		if (data.transaction.debit.documentTotals.allowanceTotalAmount) {
			specifiedTradeSettlementHeaderMonetarySummation
				.ele("ram:AllowanceTotalAmount")
				.txt(
					data.transaction.debit.documentTotals.allowanceTotalAmount.value.toString(),
				);
		}
		specifiedTradeSettlementHeaderMonetarySummation
			.ele("ram:TaxBasisTotalAmount")
			.txt(
				data.transaction.debit.documentTotals.taxBasisTotalAmount.value.toString(),
			);
		if (data.transaction.debit.documentTotals.taxTotalAmount) {
			specifiedTradeSettlementHeaderMonetarySummation
				.ele("ram:TaxTotalAmount")
				.txt(
					data.transaction.debit.documentTotals.taxTotalAmount.value.toString(),
				)
				.att(
					"currencyID",
					data.transaction.debit.documentTotals.taxTotalAmount.currency,
				);
		}
		if (data.transaction.debit.documentTotals.grandTotalAmount) {
			specifiedTradeSettlementHeaderMonetarySummation
				.ele("ram:GrandTotalAmount")
				.txt(
					data.transaction.debit.documentTotals.grandTotalAmount.value.toString(),
				);
		}

		if (data.transaction.debit.accounting?.buyerReference) {
			applicableHeaderTradeSettlement
				.ele("ram:ReceivableSpecifiedTradeAccountingAccount")
				.ele("ram:ID")
				.txt(data.transaction.debit.accounting.buyerReference);
		}
	},
	rules(data, ctx) {},
});
