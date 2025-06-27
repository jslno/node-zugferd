/**
 * @see https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/Registry+of+supporting+artefacts+to+implement+EN16931#RegistryofsupportingartefactstoimplementEN16931-CEN/TC434EN16931
 */

export type EASDefinition = {
	code: string;
	name?: string;
	remark?: string;
};

export type EASCode = (typeof EAS)[number]["code"];

export const EAS_IDENTIFIER = "eas" as const;
export const EAS_VERSION = "13.0" as const;

export const EAS = [
	{
		code: "0002",
		name: "System Information et Repertoire des Entreprise et des Etablissements: SIRENE",
		remark: undefined,
	},
	{
		code: "0007",
		name: "Organisationsnummer",
		remark: undefined,
	},
	{
		code: "0009",
		name: "SIRET-CODE",
		remark: undefined,
	},
	{
		code: "0037",
		name: "LY-tunnus",
		remark: undefined,
	},
	{
		code: "0060",
		name: "Data Universal Numbering System (D-U-N-S Number)",
		remark: undefined,
	},
	{
		code: "0088",
		name: "EAN Location Code",
		remark: undefined,
	},
	{
		code: "0096",
		name: "DANISH CHAMBER OF COMMERCE Scheme (EDIRA compliant)",
		remark: undefined,
	},
	{
		code: "0097",
		name: "FTI - Ediforum Italia, (EDIRA compliant)",
		remark: undefined,
	},
	{
		code: "0106",
		name: "Vereniging van Kamers van Koophandel en Fabrieken in Nederland (Association of Chambers of Commerce and Industry in the Netherlands), Scheme (EDIRA compliant)",
		remark: undefined,
	},
	{
		code: "0130",
		name: "Directorates of the European Commission",
		remark: undefined,
	},
	{
		code: "0135",
		name: "SIA Object Identifiers",
		remark: undefined,
	},
	{
		code: "0142",
		name: "SECETI Object Identifiers",
		remark: undefined,
	},
	{
		code: "0147",
		name: "Standard Company Code",
		remark: undefined,
	},
	{
		code: "0151",
		name: "Australian Business Number (ABN) Scheme",
		remark: undefined,
	},
	{
		code: "0170",
		name: "Teikoku Company Code",
		remark: undefined,
	},
	{
		code: "0183",
		name: "Numéro d'identification suisse des enterprises (IDE), Swiss Unique Business Identification Number (UIDB) ",
		remark: undefined,
	},
	{
		code: "0184",
		name: "DIGSTORG",
		remark: undefined,
	},
	{
		code: "0188",
		name: "Corporate Number of The Social Security and Tax Number System",
		remark: undefined,
	},
	{
		code: "0190",
		name: "Dutch Originator's Identification Number",
		remark: "Replaces 9954",
	},
	{
		code: "0191",
		name: "Centre of Registers and Information Systems of the Ministry of Justice",
		remark: undefined,
	},
	{
		code: "0192",
		name: "Enhetsregisteret ved Bronnoysundregisterne",
		remark: "Replaces 9908",
	},
	{
		code: "0193",
		name: "UBL.BE party identifier",
		remark: undefined,
	},
	{
		code: "0194",
		name: "KOIOS Open Technical Dictionary",
		remark: undefined,
	},
	{
		code: "0195",
		name: "Singapore UEN identifier",
		remark: undefined,
	},
	{
		code: "0196",
		name: "Kennitala - Iceland legal id for individuals and legal entities",
		remark: "Replaces 9917",
	},
	{
		code: "0198",
		name: "ERSTORG",
		remark: undefined,
	},
	{
		code: "0199",
		name: "Legal Entity Identifier (LEI)",
		remark: undefined,
	},
	{
		code: "0200",
		name: "Legal entity code (Lithuania)",
		remark: undefined,
	},
	{
		code: "0201",
		name: "Codice Univoco Unità Organizzativa iPA",
		remark: "Replaces 9921",
	},
	{
		code: "0202",
		name: "Indirizzo di Posta Elettronica Certificata",
		remark: undefined,
	},
	{
		code: "0203",
		name: "eDelivery Network Participant identifier",
		remark: undefined,
	},
	{
		code: "0204",
		name: "Leitweg-ID",
		remark: "Replaces 9958",
	},
	{
		code: "0205",
		name: "CODDEST",
		remark: undefined,
	},
	{
		code: "0208",
		name: "Numero d'entreprise / ondernemingsnummer / Unternehmensnummer",
		remark: "Replaces 9956",
	},
	{
		code: "0209",
		name: "GS1 identification keys",
		remark: undefined,
	},
	{
		code: "0210",
		name: "CODICE FISCALE",
		remark: "Replaces 9907",
	},
	{
		code: "0211",
		name: "PARTITA IVA",
		remark: "Replaces 9906",
	},
	{
		code: "0212",
		name: "Finnish Organization Identifier",
		remark: undefined,
	},
	{
		code: "0213",
		name: "Finnish Organization Value Add Tax Identifier",
		remark: undefined,
	},
	{
		code: "0215",
		name: "Net service ID",
		remark: undefined,
	},
	{
		code: "0216",
		name: "OVTcode",
		remark: undefined,
	},
	{
		code: "0217",
		name: "The Netherlands Chamber of Commerce and Industry establishment number",
		remark: undefined,
	},
	{
		code: "0218",
		name: "Unified registration number (Latvia)",
		remark: undefined,
	},
	{
		code: "0221",
		name: "The registered number of the qualified invoice issuer",
		remark: undefined,
	},
	{
		code: "0230",
		name: "National e-Invoicing Framework",
		remark: undefined,
	},
	{
		code: "9901",
		name: "Danish Ministry of the Interior and Health",
		remark: undefined,
	},
	{
		code: "9910",
		name: "Hungary VAT number",
		remark: undefined,
	},
	{
		code: "9913",
		name: "Business Registers Network",
		remark: undefined,
	},
	{
		code: "9914",
		name: "Österreichische Umsatzsteuer-Identifikationsnummer",
		remark: undefined,
	},
	{
		code: "9915",
		name: "Österreichisches Verwaltungs bzw. Organisationskennzeichen",
		remark: undefined,
	},
	{
		code: "9918",
		name: "SOCIETY FOR WORLDWIDE INTERBANK FINANCIAL, TELECOMMUNICATION S.W.I.F.T",
		remark: undefined,
	},
	{
		code: "9919",
		name: "Kennziffer des Unternehmensregisters",
		remark: undefined,
	},
	{
		code: "9920",
		name: "Agencia Española de Administración Tributaria",
		remark: undefined,
	},
	{
		code: "9922",
		name: "Andorra VAT number",
		remark: undefined,
	},
	{
		code: "9923",
		name: "Albania VAT number",
		remark: undefined,
	},
	{
		code: "9924",
		name: "Bosnia and Herzegovina VAT number",
		remark: undefined,
	},
	{
		code: "9925",
		name: "Belgium VAT number",
		remark: undefined,
	},
	{
		code: "9926",
		name: "Bulgaria VAT number",
		remark: undefined,
	},
	{
		code: "9927",
		name: "Switzerland VAT number",
		remark: undefined,
	},
	{
		code: "9928",
		name: "Cyprus VAT number",
		remark: undefined,
	},
	{
		code: "9929",
		name: "Czech Republic VAT number",
		remark: undefined,
	},
	{
		code: "9930",
		name: "Germany VAT number",
		remark: undefined,
	},
	{
		code: "9931",
		name: "Estonia VAT number",
		remark: undefined,
	},
	{
		code: "9932",
		name: "United Kingdom VAT number",
		remark: undefined,
	},
	{
		code: "9933",
		name: "Greece VAT number",
		remark: undefined,
	},
	{
		code: "9934",
		name: "Croatia VAT number",
		remark: undefined,
	},
	{
		code: "9935",
		name: "Ireland VAT number",
		remark: undefined,
	},
	{
		code: "9936",
		name: "Liechtenstein VAT number",
		remark: undefined,
	},
	{
		code: "9937",
		name: "Lithuania VAT number",
		remark: undefined,
	},
	{
		code: "9938",
		name: "Luxemburg VAT number",
		remark: undefined,
	},
	{
		code: "9939",
		name: "Latvia VAT number",
		remark: undefined,
	},
	{
		code: "9940",
		name: "Monaco VAT number",
		remark: undefined,
	},
	{
		code: "9941",
		name: "Montenegro VAT number",
		remark: undefined,
	},
	{
		code: "9942",
		name: "Macedonia, the former Yugoslav Republic of VAT number",
		remark: undefined,
	},
	{
		code: "9943",
		name: "Malta VAT number",
		remark: undefined,
	},
	{
		code: "9944",
		name: "Netherlands VAT number",
		remark: undefined,
	},
	{
		code: "9945",
		name: "Poland VAT number",
		remark: undefined,
	},
	{
		code: "9946",
		name: "Portugal VAT number",
		remark: undefined,
	},
	{
		code: "9947",
		name: "Romania VAT number",
		remark: undefined,
	},
	{
		code: "9948",
		name: "Serbia VAT number",
		remark: undefined,
	},
	{
		code: "9949",
		name: "Slovenia VAT number",
		remark: undefined,
	},
	{
		code: "9950",
		name: "Slovakia VAT number",
		remark: undefined,
	},
	{
		code: "9951",
		name: "San Marino VAT number",
		remark: undefined,
	},
	{
		code: "9952",
		name: "Turkey VAT number",
		remark: undefined,
	},
	{
		code: "9953",
		name: "Holy See (Vatican City State) VAT number",
		remark: undefined,
	},
	{
		code: "9957",
		name: "French VAT number",
		remark: undefined,
	},
	{
		code: "9959",
		name: "Employer Identification Number (EIN, USA)",
		remark: undefined,
	},
	{
		code: "AN",
		name: "O.F.T.P. (ODETTE File Transfer Protocol)",
		remark: undefined,
	},
	{
		code: "AQ",
		name: "X.400 address for mail text",
		remark: undefined,
	},
	{
		code: "AS",
		name: "AS2 exchange",
		remark: undefined,
	},
	{
		code: "AU",
		name: "File Transfer Protocol",
		remark: undefined,
	},
	{
		code: "EM",
		name: "Electronic mail",
		remark: "SMTP email",
	},
] as const satisfies EASDefinition[];
