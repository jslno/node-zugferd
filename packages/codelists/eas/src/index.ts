import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const eas = [
	{
		value: "0002",
		name: "System Information et Repertoire des Entreprise et des Etablissements: SIRENE",
		key: "SYSTEM_INFORMATION_ET_REPERTOIRE_DES_ENTREPRISE_ET_DES_ETABLISSEMENTS_SIRENE",
	},
	{ value: "0007", name: "Organisationsnummer", key: "ORGANISATIONSNUMMER" },
	{ value: "0009", name: "SIRET-CODE", key: "SIRET_CODE" },
	{ value: "0037", name: "LY-tunnus", key: "LY_TUNNUS" },
	{
		value: "0060",
		name: "Data Universal Numbering System (D-U-N-S Number)",
		key: "DATA_UNIVERSAL_NUMBERING_SYSTEM_D_U_N_S_NUMBER",
	},
	{ value: "0088", name: "EAN Location Code", key: "EAN_LOCATION_CODE" },
	{
		value: "0096",
		name: "The Danish Business Authority - P-number (DK:P)",
		key: "THE_DANISH_BUSINESS_AUTHORITY_P_NUMBER_DK_P",
	},
	{
		value: "0097",
		name: "FTI - Ediforum Italia, (EDIRA compliant)",
		key: "FTI_EDIFORUM_ITALIA_EDIRA_COMPLIANT",
	},
	{
		value: "0106",
		name: "Vereniging van Kamers van Koophandel en Fabrieken in Nederland (Association of\nChambers of Commerce and Industry in the Netherlands), Scheme (EDIRA compliant)",
		key: "VERENIGING_VAN_KAMERS_VAN_KOOPHANDEL_EN_FABRIEKEN_IN_NEDERLAND_ASSOCIATION_OF_CHAMBERS_OF_COMMERCE_AND_INDUSTRY_IN_THE_NETHERLANDS_SCHEME_EDIRA_COMPLIANT",
	},
	{
		value: "0130",
		name: "Directorates of the European Commission",
		key: "DIRECTORATES_OF_THE_EUROPEAN_COMMISSION",
	},
	{
		value: "0135",
		name: "SIA Object Identifiers",
		key: "SIA_OBJECT_IDENTIFIERS",
	},
	{
		value: "0142",
		name: "SECETI Object Identifiers",
		key: "SECETI_OBJECT_IDENTIFIERS",
	},
	{
		value: "0147",
		name: "Standard Company Code",
		key: "STANDARD_COMPANY_CODE",
	},
	{
		value: "0151",
		name: "Australian Business Number (ABN) Scheme",
		key: "AUSTRALIAN_BUSINESS_NUMBER_ABN_SCHEME",
	},
	{
		value: "0154",
		name: "Identification number of economic subjects: (ICO)",
		key: "IDENTIFICATION_NUMBER_OF_ECONOMIC_SUBJECTS_ICO",
	},
	{
		value: "0158",
		name: "Identification number of economic subject (ICO) Act on State Statistics of 29 November 2001, § 27",
		key: "IDENTIFICATION_NUMBER_OF_ECONOMIC_SUBJECT_ICO_ACT_ON_STATE_STATISTICS_OF_29_NOVEMBER_2001_27",
	},
	{ value: "0170", name: "Teikoku Company Code", key: "TEIKOKU_COMPANY_CODE" },
	{
		value: "0177",
		name: "Odette International Limited ",
		key: "ODETTE_INTERNATIONAL_LIMITED",
	},
	{
		value: "0183",
		name: "Numéro d'identification suisse des enterprises (IDE), Swiss Unique Business Identification Number (UIDB) ",
		key: "NUME_RO_D_IDENTIFICATION_SUISSE_DES_ENTERPRISES_IDE_SWISS_UNIQUE_BUSINESS_IDENTIFICATION_NUMBER_UIDB",
	},
	{ value: "0184", name: "DIGSTORG", key: "DIGSTORG" },
	{
		value: "0188",
		name: "Corporate Number of The Social Security and Tax Number System",
		key: "CORPORATE_NUMBER_OF_THE_SOCIAL_SECURITY_AND_TAX_NUMBER_SYSTEM",
	},
	{
		value: "0190",
		name: "Dutch Originator's Identification Number",
		key: "DUTCH_ORIGINATOR_S_IDENTIFICATION_NUMBER",
	},
	{
		value: "0191",
		name: "Centre of Registers and Information Systems of the Ministry of Justice",
		key: "CENTRE_OF_REGISTERS_AND_INFORMATION_SYSTEMS_OF_THE_MINISTRY_OF_JUSTICE",
	},
	{
		value: "0192",
		name: "Enhetsregisteret ved Bronnoysundregisterne ",
		key: "ENHETSREGISTERET_VED_BRONNOYSUNDREGISTERNE",
	},
	{
		value: "0193",
		name: "UBL.BE party identifier",
		key: "UBL_BE_PARTY_IDENTIFIER",
	},
	{
		value: "0194",
		name: "KOIOS Open Technical Dictionary",
		key: "KOIOS_OPEN_TECHNICAL_DICTIONARY",
	},
	{
		value: "0195",
		name: "Singapore UEN identifier",
		key: "SINGAPORE_UEN_IDENTIFIER",
	},
	{
		value: "0196",
		name: "Kennitala - Iceland legal id for individuals and legal entities",
		key: "KENNITALA_ICELAND_LEGAL_ID_FOR_INDIVIDUALS_AND_LEGAL_ENTITIES",
	},
	{ value: "0198", name: "ERSTORG", key: "ERSTORG" },
	{
		value: "0199",
		name: "Global legal entity identifier (GLEIF)",
		key: "GLOBAL_LEGAL_ENTITY_IDENTIFIER_GLEIF",
	},
	{
		value: "0200",
		name: "Legal entity code (Lithuania)",
		key: "LEGAL_ENTITY_CODE_LITHUANIA",
	},
	{
		value: "0201",
		name: "Codice Univoco Unità Organizzativa iPA",
		key: "CODICE_UNIVOCO_UNITA_ORGANIZZATIVA_I_PA",
	},
	{
		value: "0202",
		name: "Indirizzo di Posta Elettronica Certificata",
		key: "INDIRIZZO_DI_POSTA_ELETTRONICA_CERTIFICATA",
	},
	{
		value: "0203",
		name: "eDelivery Network Participant identifier",
		key: "E_DELIVERY_NETWORK_PARTICIPANT_IDENTIFIER",
	},
	{ value: "0204", name: "Leitweg-ID", key: "LEITWEG_ID" },
	{ value: "0205", name: "CODDEST", key: "CODDEST" },
	{
		value: "0208",
		name: "Numero d'entreprise / ondernemingsnummer / Unternehmensnummer",
		key: "NUMERO_D_ENTREPRISE_ONDERNEMINGSNUMMER_UNTERNEHMENSNUMMER",
	},
	{
		value: "0209",
		name: "GS1 identification keys",
		key: "GS1_IDENTIFICATION_KEYS",
	},
	{ value: "0210", name: "CODICE FISCALE", key: "CODICE_FISCALE" },
	{ value: "0211", name: "PARTITA IVA", key: "PARTITA_IVA" },
	{
		value: "0212",
		name: "Finnish Organization Identifier",
		key: "FINNISH_ORGANIZATION_IDENTIFIER",
	},
	{
		value: "0213",
		name: "Finnish Organization Value Add Tax Identifier",
		key: "FINNISH_ORGANIZATION_VALUE_ADD_TAX_IDENTIFIER",
	},
	{ value: "0215", name: "Net service ID", key: "NET_SERVICE_ID" },
	{ value: "0216", name: "OVTcode", key: "OV_TCODE" },
	{
		value: "0217",
		name: "The Netherlands Chamber of Commerce and Industry establishment number",
		key: "THE_NETHERLANDS_CHAMBER_OF_COMMERCE_AND_INDUSTRY_ESTABLISHMENT_NUMBER",
	},
	{
		value: "0218",
		name: "Unified registration number (Latvia)",
		key: "UNIFIED_REGISTRATION_NUMBER_LATVIA",
	},
	{
		value: "0221",
		name: " The registered number of the qualified invoice issuer",
		key: "THE_REGISTERED_NUMBER_OF_THE_QUALIFIED_INVOICE_ISSUER",
	},
	{
		value: "0225",
		name: " FRCTC ELECTRONIC ADDRESS",
		key: "FRCTC_ELECTRONIC_ADDRESS",
	},
	{
		value: "0230",
		name: " National e-Invoicing Framework",
		key: "NATIONAL_E_INVOICING_FRAMEWORK",
	},
	{
		value: "0235",
		name: "UAE Tax Identification Number (TIN)",
		key: "UAE_TAX_IDENTIFICATION_NUMBER_TIN",
	},
	{
		value: "0240",
		name: "Register of legal persons (in French : Répertoire des personnes morales)",
		key: "REGISTER_OF_LEGAL_PERSONS_IN_FRENCH_RE_PERTOIRE_DES_PERSONNES_MORALES",
	},
	{ value: "9910", name: "Hungary VAT number", key: "HUNGARY_VAT_NUMBER" },
	{
		value: "9913",
		name: "Business Registers Network ",
		key: "BUSINESS_REGISTERS_NETWORK",
	},
	{
		value: "9914",
		name: "Österreichische Umsatzsteuer-Identifikationsnummer ",
		key: "O_STERREICHISCHE_UMSATZSTEUER_IDENTIFIKATIONSNUMMER",
	},
	{
		value: "9915",
		name: "Österreichisches Verwaltungs bzw.\nOrganisationskennzeichen",
		key: "O_STERREICHISCHES_VERWALTUNGS_BZW_ORGANISATIONSKENNZEICHEN",
	},
	{
		value: "9918",
		name: "SOCIETY FOR WORLDWIDE INTERBANK FINANCIAL, TELECOMMUNICATION S.W.I.F.T",
		key: "SOCIETY_FOR_WORLDWIDE_INTERBANK_FINANCIAL_TELECOMMUNICATION_S_W_I_F_T",
	},
	{
		value: "9919",
		name: "Kennziffer des Unternehmensregisters ",
		key: "KENNZIFFER_DES_UNTERNEHMENSREGISTERS",
	},
	{
		value: "9920",
		name: "Agencia Española de Administración Tributaria ",
		key: "AGENCIA_ESPAN_OLA_DE_ADMINISTRACIO_N_TRIBUTARIA",
	},
	{ value: "9922", name: "Andorra VAT number", key: "ANDORRA_VAT_NUMBER" },
	{ value: "9923", name: "Albania VAT number", key: "ALBANIA_VAT_NUMBER" },
	{
		value: "9924",
		name: "Bosnia and Herzegovina VAT number",
		key: "BOSNIA_AND_HERZEGOVINA_VAT_NUMBER",
	},
	{ value: "9925", name: "Belgium VAT number", key: "BELGIUM_VAT_NUMBER" },
	{ value: "9926", name: "Bulgaria VAT number", key: "BULGARIA_VAT_NUMBER" },
	{
		value: "9927",
		name: "Switzerland VAT number",
		key: "SWITZERLAND_VAT_NUMBER",
	},
	{ value: "9928", name: "Cyprus VAT number", key: "CYPRUS_VAT_NUMBER" },
	{
		value: "9929",
		name: "Czech Republic VAT number",
		key: "CZECH_REPUBLIC_VAT_NUMBER",
	},
	{ value: "9930", name: "Germany VAT number", key: "GERMANY_VAT_NUMBER" },
	{ value: "9931", name: "Estonia VAT number", key: "ESTONIA_VAT_NUMBER" },
	{
		value: "9932",
		name: "United Kingdom VAT number",
		key: "UNITED_KINGDOM_VAT_NUMBER",
	},
	{ value: "9933", name: "Greece VAT number", key: "GREECE_VAT_NUMBER" },
	{ value: "9934", name: "Croatia VAT number", key: "CROATIA_VAT_NUMBER" },
	{ value: "9935", name: "Ireland VAT number", key: "IRELAND_VAT_NUMBER" },
	{
		value: "9936",
		name: "Liechtenstein VAT number",
		key: "LIECHTENSTEIN_VAT_NUMBER",
	},
	{ value: "9937", name: "Lithuania VAT number", key: "LITHUANIA_VAT_NUMBER" },
	{ value: "9938", name: "Luxemburg VAT number", key: "LUXEMBURG_VAT_NUMBER" },
	{ value: "9939", name: "Latvia VAT number", key: "LATVIA_VAT_NUMBER" },
	{ value: "9940", name: "Monaco VAT number", key: "MONACO_VAT_NUMBER" },
	{
		value: "9941",
		name: "Montenegro VAT number",
		key: "MONTENEGRO_VAT_NUMBER",
	},
	{
		value: "9942",
		name: "Macedonia, the former Yugoslav Republic of VAT number",
		key: "MACEDONIA_THE_FORMER_YUGOSLAV_REPUBLIC_OF_VAT_NUMBER",
	},
	{ value: "9943", name: "Malta VAT number", key: "MALTA_VAT_NUMBER" },
	{
		value: "9944",
		name: "Netherlands VAT number",
		key: "NETHERLANDS_VAT_NUMBER",
	},
	{ value: "9945", name: "Poland VAT number", key: "POLAND_VAT_NUMBER" },
	{ value: "9946", name: "Portugal VAT number", key: "PORTUGAL_VAT_NUMBER" },
	{ value: "9947", name: "Romania VAT number", key: "ROMANIA_VAT_NUMBER" },
	{ value: "9948", name: "Serbia VAT number", key: "SERBIA_VAT_NUMBER" },
	{ value: "9949", name: "Slovenia VAT number", key: "SLOVENIA_VAT_NUMBER" },
	{ value: "9950", name: "Slovakia VAT number", key: "SLOVAKIA_VAT_NUMBER" },
	{
		value: "9951",
		name: "San Marino VAT number",
		key: "SAN_MARINO_VAT_NUMBER",
	},
	{ value: "9952", name: "Turkey VAT number", key: "TURKEY_VAT_NUMBER" },
	{
		value: "9953",
		name: "Holy See (Vatican City State) VAT number",
		key: "HOLY_SEE_VATICAN_CITY_STATE_VAT_NUMBER",
	},
	{ value: "9957", name: "French VAT number", key: "FRENCH_VAT_NUMBER" },
	{
		value: "9959",
		name: "Employer Identification Number (EIN, USA)",
		key: "EMPLOYER_IDENTIFICATION_NUMBER_EIN_USA",
	},
	{
		value: "AN",
		name: "O.F.T.P. (ODETTE File Transfer Protocol)",
		key: "O_F_T_P_ODETTE_FILE_TRANSFER_PROTOCOL",
	},
	{
		value: "AQ ",
		name: "X.400 address for mail text",
		key: "X_400_ADDRESS_FOR_MAIL_TEXT",
	},
	{ value: "AS ", name: "AS2 exchange ", key: "AS2_EXCHANGE" },
	{
		value: "AU ",
		name: "File Transfer Protocol",
		key: "FILE_TRANSFER_PROTOCOL",
	},
	{ value: "EM", name: "Electronic mail (SMPT)", key: "ELECTRONIC_MAIL_SMPT" },
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		eas: typeof eas;
	}
}
registerCodelist("eas", eas);

export default eas;
