import { ZugferdBuilder } from "../../../builder";

export const getSellerTradeParty = ZugferdBuilder.createGroup(
	(builder, { input }) => {
		builder
			.runIfMinProfile("basic-wl", (builder) => {
				builder
					.assign(
						"ram:ID",
						input.tradeTransaction?.tradeAgreement?.seller.identifier,
						{
							array: true,
						},
					)
					.assign(
						"ram:GlobalID/#",
						input.tradeTransaction?.tradeAgreement?.seller.globalIdentifier
							?.value,
					)
					.assign(
						"ram:GlobalID/@schemeID",
						input.tradeTransaction?.tradeAgreement?.seller.globalIdentifier
							?.schemeID,
					);
			})
			.assign("ram:Name", input.tradeTransaction?.tradeAgreement?.seller.name)
			//#region Organization
			.assign(
				"ram:SpecifiedLegalOrganization/ram:ID/#",
				input.tradeTransaction?.tradeAgreement?.seller.organization
					?.legalRegistrationID?.value,
			)
			.assign(
				"ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
				input.tradeTransaction?.tradeAgreement?.seller.organization
					?.legalRegistrationID?.schemeID,
			)
			.assign(
				"ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
				input.tradeTransaction?.tradeAgreement?.seller.organization
					?.tradingName,
				{
					minProfile: "basic-wl",
				},
			)
			//#endregion
			//#region Seller postal address
			.runIfMinProfile("basic-wl", (builder) => {
				builder
					.assign(
						"ram:PostalTradeAddress/ram:PostcodeCode",
						input.tradeTransaction?.tradeAgreement?.seller.postalAddress
							?.postCode,
					)
					.assign(
						"ram:PostalTradeAddress/ram:LineOne",
						input.tradeTransaction?.tradeAgreement?.seller.postalAddress?.line1,
					)
					.assign(
						"ram:PostalTradeAddress/ram:LineTwo",
						input.tradeTransaction?.tradeAgreement?.seller.postalAddress?.line2,
					)
					.assign(
						"ram:PostalTradeAddress/ram:LineThree",
						input.tradeTransaction?.tradeAgreement?.seller.postalAddress?.line3,
					)
					.assign(
						"ram:PostalTradeAddress/ram:CityName",
						input.tradeTransaction?.tradeAgreement?.seller.postalAddress?.city,
					);
			})
			.assign(
				"ram:PostalTradeAddress/ram:CountryID",
				input.tradeTransaction?.tradeAgreement?.seller.postalAddress
					?.countryCode,
			)
			.assign(
				"ram:PostalTradeAddress/ram:CountrySubDivisionName",
				input.tradeTransaction?.tradeAgreement?.seller.postalAddress
					?.countrySubdivision,
				{
					minProfile: "basic-wl",
				},
			)
			//#endregion
			//#region Seller electronic address
			.runIfMinProfile("basic-wl", (builder) => {
				builder
					.assign(
						"ram:URIUniversalCommunication/ram:URIID/#",
						input.tradeTransaction?.tradeAgreement?.seller.electronicAddress
							?.value,
					)
					.assign(
						"ram:URIUniversalCommunication/ram:URIID/@schemeID",
						input.tradeTransaction?.tradeAgreement?.seller.electronicAddress
							?.schemeID,
					);
			})
			//#endregion
			//#region Seller tax information
			.assign(
				"ram:SpecifiedTaxRegistration",
				{
					"ram:ID": {
						"#": input.tradeTransaction?.tradeAgreement?.seller.taxInformation
							?.vatID,
						"@schemeID": "VA",
					},
				},
				{
					array: true,
					condition:
						input.tradeTransaction?.tradeAgreement?.seller.taxInformation
							?.vatID !== undefined,
				},
			)
			.assign(
				"ram:SpecifiedTaxRegistration",
				{
					"ram:ID": {
						"#": input.tradeTransaction?.tradeAgreement?.seller.taxInformation
							?.localID,
						"@schemeID": "FC",
					},
				},
				{
					array: true,
					condition:
						input.tradeTransaction?.tradeAgreement?.seller.taxInformation
							?.localID !== undefined,
				},
			);
		//#endregion
	},
);
