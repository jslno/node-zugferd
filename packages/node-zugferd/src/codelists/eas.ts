/**
 * @see https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/Registry+of+supporting+artefacts+to+implement+EN16931#RegistryofsupportingartefactstoimplementEN16931-CEN/TC434EN16931
 */

import { createEnum } from ".";

export type EASDefinition = {
	key: string;
	code: string;
	name?: string;
	remark?: string;
};

export type EASCode = (typeof EAS)[number]["code"];

export const EAS_IDENTIFIER = "eas" as const;
export const EAS_VERSION = "13.0" as const;

export const EAS = [
	{
		key: "SYSTEM_INFORMATION_ET_REPERTOIRE_DES_ENTREPRISE_ET_DES_ETABLISSEMENTS_SIRENE",
		name: "System Information et Repertoire des Entreprise et des Etablissements: SIRENE",
		code: "0002",
		remark: undefined,
	},
	{
		key: "ORGANISATIONSNUMMER",
		name: "Organisationsnummer",
		code: "0007",
		remark: undefined,
	},
	{
		key: "SIRET_CODE",
		name: "SIRET-CODE",
		code: "0009",
		remark: undefined,
	},
	{
		key: "LY_TUNNUS",
		name: "LY-tunnus",
		code: "0037",
		remark: undefined,
	},
	{
		key: "DATA_UNIVERSAL_NUMBERING_SYSTEM_D_U_N_S_NUMBER",
		name: "Data Universal Numbering System (D-U-N-S Number)",
		code: "0060",
		remark: undefined,
	},
	{
		key: "EAN_LOCATION_CODE",
		name: "EAN Location Code",
		code: "0088",
		remark: undefined,
	},
	{
		key: "DANISH_CHAMBER_OF_COMMERCE_SCHEME_EDIRA_COMPLIANT",
		name: "DANISH CHAMBER OF COMMERCE Scheme (EDIRA compliant)",
		code: "0096",
		remark: undefined,
	},
	{
		key: "FTI_EDIFORUM_ITALIA_EDIRA_COMPLIANT",
		name: "FTI - Ediforum Italia, (EDIRA compliant)",
		code: "0097",
		remark: undefined,
	},
	{
		key: "VERENIGING_VAN_KAMERS_VAN_KOOPHANDEL_EN_FABRIEKEN_IN_NEDERLAND_ASSOCIATION_OF_CHAMBERS_OF_COMMERCE_AND_INDUSTRY_IN_THE_NETHERLANDS_SCHEME_EDIRA_COMPLIANT",
		name: "Vereniging van Kamers van Koophandel en Fabrieken in Nederland (Association of Chambers of Commerce and Industry in the Netherlands), Scheme (EDIRA compliant)",
		code: "0106",
		remark: undefined,
	},
	{
		key: "DIRECTORATES_OF_THE_EUROPEAN_COMMISSION",
		name: "Directorates of the European Commission",
		code: "0130",
		remark: undefined,
	},
	{
		key: "SIA_OBJECT_IDENTIFIERS",
		name: "SIA Object Identifiers",
		code: "0135",
		remark: undefined,
	},
	{
		key: "SECETI_OBJECT_IDENTIFIERS",
		name: "SECETI Object Identifiers",
		code: "0142",
		remark: undefined,
	},
	{
		key: "STANDARD_COMPANY_CODE",
		name: "Standard Company Code",
		code: "0147",
		remark: undefined,
	},
	{
		key: "AUSTRALIAN_BUSINESS_NUMBER_ABN_SCHEME",
		name: "Australian Business Number (ABN) Scheme",
		code: "0151",
		remark: undefined,
	},
	{
		key: "TEIKOKU_COMPANY_CODE",
		name: "Teikoku Company Code",
		code: "0170",
		remark: undefined,
	},
	{
		key: "NUMERO_DIDENTIFICATION_SUISSE_DES_ENTERPRISES_IDE_SWISS_UNIQUE_BUSINESS_IDENTIFICATION_NUMBER_UIDB_",
		name: "Numéro d'identification suisse des enterprises (IDE), Swiss Unique Business Identification Number (UIDB) ",
		code: "0183",
		remark: undefined,
	},
	{
		key: "DIGSTORG",
		name: "DIGSTORG",
		code: "0184",
		remark: undefined,
	},
	{
		key: "CORPORATE_NUMBER_OF_THE_SOCIAL_SECURITY_AND_TAX_NUMBER_SYSTEM",
		name: "Corporate Number of The Social Security and Tax Number System",
		code: "0188",
		remark: undefined,
	},
	{
		key: "DUTCH_ORIGINATORS_IDENTIFICATION_NUMBER",
		name: "Dutch Originator's Identification Number",
		code: "0190",
		remark: "Replaces 9954",
	},
	{
		key: "CENTRE_OF_REGISTERS_AND_INFORMATION_SYSTEMS_OF_THE_MINISTRY_OF_JUSTICE",
		name: "Centre of Registers and Information Systems of the Ministry of Justice",
		code: "0191",
		remark: undefined,
	},
	{
		key: "ENHETSREGISTERET_VED_BRONNOYSUNDREGISTERNE",
		name: "Enhetsregisteret ved Bronnoysundregisterne",
		code: "0192",
		remark: "Replaces 9908",
	},
	{
		key: "UBLBE_PARTY_IDENTIFIER",
		name: "UBL.BE party identifier",
		code: "0193",
		remark: undefined,
	},
	{
		key: "KOIOS_OPEN_TECHNICAL_DICTIONARY",
		name: "KOIOS Open Technical Dictionary",
		code: "0194",
		remark: undefined,
	},
	{
		key: "SINGAPORE_UEN_IDENTIFIER",
		name: "Singapore UEN identifier",
		code: "0195",
		remark: undefined,
	},
	{
		key: "KENNITALA_ICELAND_LEGAL_ID_FOR_INDIVIDUALS_AND_LEGAL_ENTITIES",
		name: "Kennitala - Iceland legal id for individuals and legal entities",
		code: "0196",
		remark: "Replaces 9917",
	},
	{ key: "ERSTORG", name: "ERSTORG", code: "0198", remark: undefined },
	{
		key: "LEGAL_ENTITY_IDENTIFIER_LEI",
		name: "Legal Entity Identifier (LEI)",
		code: "0199",
		remark: undefined,
	},
	{
		key: "LEGAL_ENTITY_CODE_LITHUANIA",
		name: "Legal entity code (Lithuania)",
		code: "0200",
		remark: undefined,
	},
	{
		key: "CODICE_UNIVOCO_UNITA_ORGANIZZATIVA_I_PA",
		name: "Codice Univoco Unità Organizzativa iPA",
		code: "0201",
		remark: "Replaces 9921",
	},
	{
		key: "INDIRIZZO_DI_POSTA_ELETTRONICA_CERTIFICATA",
		name: "Indirizzo di Posta Elettronica Certificata",
		code: "0202",
		remark: undefined,
	},
	{
		key: "E_DELIVERY_NETWORK_PARTICIPANT_IDENTIFIER",
		name: "eDelivery Network Participant identifier",
		code: "0203",
		remark: undefined,
	},
	{
		key: "LEITWEG_ID",
		name: "Leitweg-ID",
		code: "0204",
		remark: "Replaces 9958",
	},
	{ key: "CODDEST", name: "CODDEST", code: "0205", remark: undefined },
	{
		key: "NUMERO_DENTREPRISE__ONDERNEMINGSNUMMER__UNTERNEHMENSNUMMER",
		name: "Numero d'entreprise / ondernemingsnummer / Unternehmensnummer",
		code: "0208",
		remark: "Replaces 9956",
	},
	{
		key: "GS1_IDENTIFICATION_KEYS",
		name: "GS1 identification keys",
		code: "0209",
		remark: undefined,
	},
	{
		key: "CODICE_FISCALE",
		name: "CODICE FISCALE",
		code: "0210",
		remark: "Replaces 9907",
	},
	{
		key: "PARTITA_IVA",
		name: "PARTITA IVA",
		code: "0211",
		remark: "Replaces 9906",
	},
	{
		key: "FINNISH_ORGANIZATION_IDENTIFIER",
		name: "Finnish Organization Identifier",
		code: "0212",
		remark: undefined,
	},
	{
		key: "FINNISH_ORGANIZATION_VALUE_ADD_TAX_IDENTIFIER",
		name: "Finnish Organization Value Add Tax Identifier",
		code: "0213",
		remark: undefined,
	},
	{
		key: "NET_SERVICE_ID",
		name: "Net service ID",
		code: "0215",
		remark: undefined,
	},
	{ key: "OVTCODE", name: "OVTcode", code: "0216", remark: undefined },
	{
		key: "THE_NETHERLANDS_CHAMBER_OF_COMMERCE_AND_INDUSTRY_ESTABLISHMENT_NUMBER",
		name: "The Netherlands Chamber of Commerce and Industry establishment number",
		code: "0217",
		remark: undefined,
	},
	{
		key: "UNIFIED_REGISTRATION_NUMBER_LATVIA",
		name: "Unified registration number (Latvia)",
		code: "0218",
		remark: undefined,
	},
	{
		key: "THE_REGISTERED_NUMBER_OF_THE_QUALIFIED_INVOICE_ISSUER",
		name: "The registered number of the qualified invoice issuer",
		code: "0221",
		remark: undefined,
	},
	{
		key: "NATIONAL_E_INVOICING_FRAMEWORK",
		name: "National e-Invoicing Framework",
		code: "0230",
		remark: undefined,
	},
	{
		key: "DANISH_MINISTRY_OF_THE_INTERIOR_AND_HEALTH",
		name: "Danish Ministry of the Interior and Health",
		code: "9901",
		remark: undefined,
	},
	{
		key: "HUNGARY_VAT_NUMBER",
		name: "Hungary VAT number",
		code: "9910",
		remark: undefined,
	},
	{
		key: "BUSINESS_REGISTERS_NETWORK",
		name: "Business Registers Network",
		code: "9913",
		remark: undefined,
	},
	{
		key: "OSTERREICHISCHE_UMSATZSTEUER_IDENTIFIKATIONSNUMMER",
		name: "Österreichische Umsatzsteuer-Identifikationsnummer",
		code: "9914",
		remark: undefined,
	},
	{
		key: "OSTERREICHISCHES_VERWALTUNGS_BZW_ORGANISATIONSKENNZEICHEN",
		name: "Österreichisches Verwaltungs bzw. Organisationskennzeichen",
		code: "9915",
		remark: undefined,
	},
	{
		key: "SOCIETY_FOR_WORLDWIDE_INTERBANK_FINANCIAL_TELECOMMUNICATION_SWIFT",
		name: "SOCIETY FOR WORLDWIDE INTERBANK FINANCIAL, TELECOMMUNICATION S.W.I.F.T",
		code: "9918",
		remark: undefined,
	},
	{
		key: "KENNZIFFER_DES_UNTERNEHMENSREGISTERS",
		name: "Kennziffer des Unternehmensregisters",
		code: "9919",
		remark: undefined,
	},
	{
		key: "AGENCIA_ESPANOLA_DE_ADMINISTRACION_TRIBUTARIA",
		name: "Agencia Española de Administración Tributaria",
		code: "9920",
		remark: undefined,
	},
	{
		key: "ANDORRA_VAT_NUMBER",
		name: "Andorra VAT number",
		code: "9922",
		remark: undefined,
	},
	{
		key: "ALBANIA_VAT_NUMBER",
		name: "Albania VAT number",
		code: "9923",
		remark: undefined,
	},
	{
		key: "BOSNIA_AND_HERZEGOVINA_VAT_NUMBER",
		name: "Bosnia and Herzegovina VAT number",
		code: "9924",
		remark: undefined,
	},
	{
		key: "BELGIUM_VAT_NUMBER",
		name: "Belgium VAT number",
		code: "9925",
		remark: undefined,
	},
	{
		key: "BULGARIA_VAT_NUMBER",
		name: "Bulgaria VAT number",
		code: "9926",
		remark: undefined,
	},
	{
		key: "SWITZERLAND_VAT_NUMBER",
		name: "Switzerland VAT number",
		code: "9927",
		remark: undefined,
	},
	{
		key: "CYPRUS_VAT_NUMBER",
		name: "Cyprus VAT number",
		code: "9928",
		remark: undefined,
	},
	{
		key: "CZECH_REPUBLIC_VAT_NUMBER",
		name: "Czech Republic VAT number",
		code: "9929",
		remark: undefined,
	},
	{
		key: "GERMANY_VAT_NUMBER",
		name: "Germany VAT number",
		code: "9930",
		remark: undefined,
	},
	{
		key: "ESTONIA_VAT_NUMBER",
		name: "Estonia VAT number",
		code: "9931",
		remark: undefined,
	},
	{
		key: "UNITED_KINGDOM_VAT_NUMBER",
		name: "United Kingdom VAT number",
		code: "9932",
		remark: undefined,
	},
	{
		key: "GREECE_VAT_NUMBER",
		name: "Greece VAT number",
		code: "9933",
		remark: undefined,
	},
	{
		key: "CROATIA_VAT_NUMBER",
		name: "Croatia VAT number",
		code: "9934",
		remark: undefined,
	},
	{
		key: "IRELAND_VAT_NUMBER",
		name: "Ireland VAT number",
		code: "9935",
		remark: undefined,
	},
	{
		key: "LIECHTENSTEIN_VAT_NUMBER",
		name: "Liechtenstein VAT number",
		code: "9936",
		remark: undefined,
	},
	{
		key: "LITHUANIA_VAT_NUMBER",
		name: "Lithuania VAT number",
		code: "9937",
		remark: undefined,
	},
	{
		key: "LUXEMBURG_VAT_NUMBER",
		name: "Luxemburg VAT number",
		code: "9938",
		remark: undefined,
	},
	{
		key: "LATVIA_VAT_NUMBER",
		name: "Latvia VAT number",
		code: "9939",
		remark: undefined,
	},
	{
		key: "MONACO_VAT_NUMBER",
		name: "Monaco VAT number",
		code: "9940",
		remark: undefined,
	},
	{
		key: "MONTENEGRO_VAT_NUMBER",
		name: "Montenegro VAT number",
		code: "9941",
		remark: undefined,
	},
	{
		key: "MACEDONIA_THE_FORMER_YUGOSLAV_REPUBLIC_OF_VAT_NUMBER",
		name: "Macedonia, the former Yugoslav Republic of VAT number",
		code: "9942",
		remark: undefined,
	},
	{
		key: "MALTA_VAT_NUMBER",
		name: "Malta VAT number",
		code: "9943",
		remark: undefined,
	},
	{
		key: "NETHERLANDS_VAT_NUMBER",
		name: "Netherlands VAT number",
		code: "9944",
		remark: undefined,
	},
	{
		key: "POLAND_VAT_NUMBER",
		name: "Poland VAT number",
		code: "9945",
		remark: undefined,
	},
	{
		key: "PORTUGAL_VAT_NUMBER",
		name: "Portugal VAT number",
		code: "9946",
		remark: undefined,
	},
	{
		key: "ROMANIA_VAT_NUMBER",
		name: "Romania VAT number",
		code: "9947",
		remark: undefined,
	},
	{
		key: "SERBIA_VAT_NUMBER",
		name: "Serbia VAT number",
		code: "9948",
		remark: undefined,
	},
	{
		key: "SLOVENIA_VAT_NUMBER",
		name: "Slovenia VAT number",
		code: "9949",
		remark: undefined,
	},
	{
		key: "SLOVAKIA_VAT_NUMBER",
		name: "Slovakia VAT number",
		code: "9950",
		remark: undefined,
	},
	{
		key: "SAN_MARINO_VAT_NUMBER",
		name: "San Marino VAT number",
		code: "9951",
		remark: undefined,
	},
	{
		key: "TURKEY_VAT_NUMBER",
		name: "Turkey VAT number",
		code: "9952",
		remark: undefined,
	},
	{
		key: "HOLY_SEE_VATICAN_CITY_STATE_VAT_NUMBER",
		name: "Holy See (Vatican City State) VAT number",
		code: "9953",
		remark: undefined,
	},
	{
		key: "FRENCH_VAT_NUMBER",
		name: "French VAT number",
		code: "9957",
		remark: undefined,
	},
	{
		key: "EMPLOYER_IDENTIFICATION_NUMBER_EIN_USA",
		name: "Employer Identification Number (EIN, USA)",
		code: "9959",
		remark: undefined,
	},
	{
		key: "OFTP_ODETTE_FILE_TRANSFER_PROTOCOL",
		name: "O.F.T.P. (ODETTE File Transfer Protocol)",
		code: "AN",
		remark: undefined,
	},
	{
		key: "X400_ADDRESS_FOR_MAIL_TEXT",
		name: "X.400 address for mail text",
		code: "AQ",
		remark: undefined,
	},
	{
		key: "AS2_EXCHANGE",
		name: "AS2 exchange",
		code: "AS",
		remark: undefined,
	},
	{
		key: "FILE_TRANSFER_PROTOCOL",
		name: "File Transfer Protocol",
		code: "AU",
		remark: undefined,
	},
	{
		key: "ELECTRONIC_MAIL",
		name: "Electronic mail",
		code: "EM",
		remark: "SMTP email",
	},
] as const satisfies EASDefinition[];

export const Eas = createEnum(EAS, {
	keyProp: "key",
	valueProp: "code",
});
