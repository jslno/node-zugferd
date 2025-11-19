import { ZugferdBuilder } from "../../../builder";

export const getBuyerTradeParty = ZugferdBuilder.createGroup(
	(builder, { input }) => {
		builder
			.runIfMinProfile("basic-wl", (builder) => {
				builder
					.assign(
						"ram:ID",
						input.tradeTransaction?.tradeAgreement?.buyer.identifier,
					)
					.assign(
						"ram:GlobalID/#",
						input.tradeTransaction?.tradeAgreement?.buyer.globalIdentifier
							?.value,
					)
					.assign(
						"ram:GlobalID/@schemeID",
						input.tradeTransaction?.tradeAgreement?.buyer.globalIdentifier
							?.schemeID,
					);
			})
			.assign("ram:Name", input.tradeTransaction?.tradeAgreement?.buyer.name)
			//#region Organization
			.assign(
				"ram:SpecifiedLegalOrganization/ram:ID",
				input.tradeTransaction?.tradeAgreement?.buyer.organization
					?.legalRegistrationID?.value,
			)
			.assign(
				"ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
				input.tradeTransaction?.tradeAgreement?.buyer.organization
					?.legalRegistrationID?.schemeID,
			)
			//#endregion
			.runIfMinProfile("basic-wl", (builder) => {
				//#region Buyer Postal Address
				builder
					.assign(
						"ram:PostalTradeAddress/ram:PostcodeCode",
						input.tradeTransaction?.tradeAgreement?.buyer.postalAddress
							.postCode,
					)
					.assign(
						"ram:PostalTradeAddress/ram:LineOne",
						input.tradeTransaction?.tradeAgreement?.buyer.postalAddress.line1,
					)
					.assign(
						"ram:PostalTradeAddress/ram:LineTwo",
						input.tradeTransaction?.tradeAgreement?.buyer.postalAddress.line2,
					)
					.assign(
						"ram:PostalTradeAddress/ram:LineThree",
						input.tradeTransaction?.tradeAgreement?.buyer.postalAddress.line3,
					)
					.assign(
						"ram:PostalTradeAddress/ram:CityName",
						input.tradeTransaction?.tradeAgreement?.buyer.postalAddress.city,
					)
					.assign(
						"ram:PostalTradeAddress/ram:CountryID",
						input.tradeTransaction?.tradeAgreement?.buyer.postalAddress
							.countryCode,
					)
					.assign(
						"ram:PostalTradeAddress/ram:CountrySubDivisionName",
						input.tradeTransaction?.tradeAgreement?.buyer.postalAddress
							.countrySubdivision,
					)
					//#endregion
					//#region Buyer electronic address
					.assign(
						"ram:URIUniversalCommunication/ram:URIID/#",
						input.tradeTransaction?.tradeAgreement?.buyer.electronicAddress
							?.value,
					)
					.assign(
						"ram:URIUniversalCommunication/ram:URIID/@schemeID",
						input.tradeTransaction?.tradeAgreement?.buyer.electronicAddress
							?.schemeID,
					)
					//#endregion
					//#region Buyer Tax Information
					.assign(
						"ram:SpecifiedTaxRegistration",
						{
							"ram:ID": {
								"#": input.tradeTransaction?.tradeAgreement?.buyer
									.taxInformation?.vatID,
								"@schemeID": "VA",
							},
						},
						{
							array: true,
							condition:
								input.tradeTransaction?.tradeAgreement?.buyer.taxInformation
									?.vatID,
						},
					);
				//#endregion
			});
	},
);
