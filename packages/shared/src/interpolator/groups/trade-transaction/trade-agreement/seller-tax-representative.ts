import { ZugferdBuilder } from "../../../builder";

export const getSellerTaxRepresentativeTradeParty = ZugferdBuilder.createGroup(
	(builder, { input }) => {
		builder
			.assign(
				"ram:Name",
				input.tradeTransaction?.tradeAgreement?.sellerTaxRepresentative?.name,
			)
			//#region Postal Address
			.assign(
				"ram:PostalTradeAddress/ram:PostcodeCode",
				input.tradeTransaction?.tradeAgreement?.sellerTaxRepresentative
					?.postalAddress.postCode,
			)
			.assign(
				"ram:PostalTradeAddress/ram:LineOne",
				input.tradeTransaction?.tradeAgreement?.sellerTaxRepresentative
					?.postalAddress.line1,
			)
			.assign(
				"ram:PostalTradeAddress/ram:LineTwo",
				input.tradeTransaction?.tradeAgreement?.sellerTaxRepresentative
					?.postalAddress.line2,
			)
			.assign(
				"ram:PostalTradeAddress/ram:LineThree",
				input.tradeTransaction?.tradeAgreement?.sellerTaxRepresentative
					?.postalAddress.line3,
			)
			.assign(
				"ram:PostalTradeAddress/ram:CityName",
				input.tradeTransaction?.tradeAgreement?.sellerTaxRepresentative
					?.postalAddress.city,
			)
			.assign(
				"ram:PostalTradeAddress/ram:CountryID",
				input.tradeTransaction?.tradeAgreement?.sellerTaxRepresentative
					?.postalAddress.countryCode,
			)
			.assign(
				"ram:PostalTradeAddress/ram:CountrySubDivisionName",
				input.tradeTransaction?.tradeAgreement?.sellerTaxRepresentative
					?.postalAddress.countrySubdivision,
			)
			//#endregion
			//#region Tax information
			.assign(
				"ram:SpecifiedTaxRegistration",
				{
					"ram:ID": {
						"#": input.tradeTransaction?.tradeAgreement?.sellerTaxRepresentative
							?.taxInformation?.vatID,
						"@schemeID": "VA",
					},
				},
				{
					array: true,
					condition:
						input.tradeTransaction?.tradeAgreement?.sellerTaxRepresentative
							?.taxInformation?.vatID !== undefined,
				},
			);
		//#endregion
	},
);
