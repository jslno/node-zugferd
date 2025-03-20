/**
 * @see https://www.iso.org/obp/ui/#search
 */

export type Iso3166Definition = {
	name: string;
	code: {
		alpha2: string;
		alpha3: string;
		numeric: string;
	};
};

export type Iso3166Code = (typeof ISO_3166)[number]["code"]["alpha2"];

export const ISO_3166_IDENTIFIER = "iso.3166";

export const ISO_3166 = [
	{
		name: "Afghanistan",
		code: {
			alpha2: "AF",
			alpha3: "AFG",
			numeric: "004",
		},
	},
	{
		name: "Albania",
		code: {
			alpha2: "AL",
			alpha3: "ALB",
			numeric: "008",
		},
	},
	{
		name: "Algeria",
		code: {
			alpha2: "DZ",
			alpha3: "DZA",
			numeric: "012",
		},
	},
	{
		name: "American Samoa",
		code: {
			alpha2: "AS",
			alpha3: "ASM",
			numeric: "016",
		},
	},
	{
		name: "Andorra",
		code: {
			alpha2: "AD",
			alpha3: "AND",
			numeric: "020",
		},
	},
	{
		name: "Angola",
		code: {
			alpha2: "AO",
			alpha3: "AGO",
			numeric: "024",
		},
	},
	{
		name: "Anguilla",
		code: {
			alpha2: "AI",
			alpha3: "AIA",
			numeric: "660",
		},
	},
	{
		name: "Antarctica",
		code: {
			alpha2: "AQ",
			alpha3: "ATA",
			numeric: "010",
		},
	},
	{
		name: "Antigua and Barbuda",
		code: {
			alpha2: "AG",
			alpha3: "ATG",
			numeric: "028",
		},
	},
	{
		name: "Argentina",
		code: {
			alpha2: "AR",
			alpha3: "ARG",
			numeric: "032",
		},
	},
	{
		name: "Armenia",
		code: {
			alpha2: "AM",
			alpha3: "ARM",
			numeric: "051",
		},
	},
	{
		name: "Aruba",
		code: {
			alpha2: "AW",
			alpha3: "ABW",
			numeric: "533",
		},
	},
	{
		name: "Australia",
		code: {
			alpha2: "AU",
			alpha3: "AUS",
			numeric: "036",
		},
	},
	{
		name: "Austria",
		code: {
			alpha2: "AT",
			alpha3: "AUT",
			numeric: "040",
		},
	},
	{
		name: "Azerbaijan",
		code: {
			alpha2: "AZ",
			alpha3: "AZE",
			numeric: "031",
		},
	},
	{
		name: "Bahamas (the)",
		code: {
			alpha2: "BS",
			alpha3: "BHS",
			numeric: "044",
		},
	},
	{
		name: "Bahrain",
		code: {
			alpha2: "BH",
			alpha3: "BHR",
			numeric: "048",
		},
	},
	{
		name: "Bangladesh",
		code: {
			alpha2: "BD",
			alpha3: "BGD",
			numeric: "050",
		},
	},
	{
		name: "Barbados",
		code: {
			alpha2: "BB",
			alpha3: "BRB",
			numeric: "052",
		},
	},
	{
		name: "Belarus",
		code: {
			alpha2: "BY",
			alpha3: "BLR",
			numeric: "112",
		},
	},
	{
		name: "Belgium",
		code: {
			alpha2: "BE",
			alpha3: "BEL",
			numeric: "056",
		},
	},
	{
		name: "Belize",
		code: {
			alpha2: "BZ",
			alpha3: "BLZ",
			numeric: "084",
		},
	},
	{
		name: "Benin",
		code: {
			alpha2: "BJ",
			alpha3: "BEN",
			numeric: "204",
		},
	},
	{
		name: "Bermuda",
		code: {
			alpha2: "BM",
			alpha3: "BMU",
			numeric: "060",
		},
	},
	{
		name: "Åland Islands",
		code: {
			alpha2: "AX",
			alpha3: "ALA",
			numeric: "248",
		},
	},
	{
		name: "Bhutan",
		code: {
			alpha2: "BT",
			alpha3: "BTN",
			numeric: "064",
		},
	},
	{
		name: "Bolivia (Plurinational State of)",
		code: {
			alpha2: "BO",
			alpha3: "BOL",
			numeric: "068",
		},
	},
	{
		name: "Bonaire, Sint Eustatius and Saba",
		code: {
			alpha2: "BQ",
			alpha3: "BES",
			numeric: "535",
		},
	},
	{
		name: "Bosnia and Herzegovina",
		code: {
			alpha2: "BA",
			alpha3: "BIH",
			numeric: "070",
		},
	},
	{
		name: "Botswana",
		code: {
			alpha2: "BW",
			alpha3: "BWA",
			numeric: "072",
		},
	},
	{
		name: "Bouvet Island",
		code: {
			alpha2: "BV",
			alpha3: "BVT",
			numeric: "074",
		},
	},
	{
		name: "Brazil",
		code: {
			alpha2: "BR",
			alpha3: "BRA",
			numeric: "076",
		},
	},
	{
		name: "British Indian Ocean Territory (the)",
		code: {
			alpha2: "IO",
			alpha3: "IOT",
			numeric: "086",
		},
	},
	{
		name: "Brunei Darussalam",
		code: {
			alpha2: "BN",
			alpha3: "BRN",
			numeric: "096",
		},
	},
	{
		name: "Bulgaria",
		code: {
			alpha2: "BG",
			alpha3: "BGR",
			numeric: "100",
		},
	},
	{
		name: "Burkina Faso",
		code: {
			alpha2: "BF",
			alpha3: "BFA",
			numeric: "854",
		},
	},
	{
		name: "Burundi",
		code: {
			alpha2: "BI",
			alpha3: "BDI",
			numeric: "108",
		},
	},
	{
		name: "Cabo Verde",
		code: {
			alpha2: "CV",
			alpha3: "CPV",
			numeric: "132",
		},
	},
	{
		name: "Cambodia",
		code: {
			alpha2: "KH",
			alpha3: "KHM",
			numeric: "116",
		},
	},
	{
		name: "Cameroon",
		code: {
			alpha2: "CM",
			alpha3: "CMR",
			numeric: "120",
		},
	},
	{
		name: "Canada",
		code: {
			alpha2: "CA",
			alpha3: "CAN",
			numeric: "124",
		},
	},
	{
		name: "Cayman Islands (the)",
		code: {
			alpha2: "KY",
			alpha3: "CYM",
			numeric: "136",
		},
	},
	{
		name: "Central African Republic (the)",
		code: {
			alpha2: "CF",
			alpha3: "CAF",
			numeric: "140",
		},
	},
	{
		name: "Chad",
		code: {
			alpha2: "TD",
			alpha3: "TCD",
			numeric: "148",
		},
	},
	{
		name: "Chile",
		code: {
			alpha2: "CL",
			alpha3: "CHL",
			numeric: "152",
		},
	},
	{
		name: "China",
		code: {
			alpha2: "CN",
			alpha3: "CHN",
			numeric: "156",
		},
	},
	{
		name: "Christmas Island",
		code: {
			alpha2: "CX",
			alpha3: "CXR",
			numeric: "162",
		},
	},
	{
		name: "Cocos (Keeling) Islands (the)",
		code: {
			alpha2: "CC",
			alpha3: "CCK",
			numeric: "166",
		},
	},
	{
		name: "Colombia",
		code: {
			alpha2: "CO",
			alpha3: "COL",
			numeric: "170",
		},
	},
	{
		name: "Comoros (the)",
		code: {
			alpha2: "KM",
			alpha3: "COM",
			numeric: "174",
		},
	},
	{
		name: "Congo (the Democratic Republic of the)",
		code: {
			alpha2: "CD",
			alpha3: "COD",
			numeric: "180",
		},
	},
	{
		name: "Congo (the)",
		code: {
			alpha2: "CG",
			alpha3: "COG",
			numeric: "178",
		},
	},
	{
		name: "Cook Islands (the)",
		code: {
			alpha2: "CK",
			alpha3: "COK",
			numeric: "184",
		},
	},
	{
		name: "Costa Rica",
		code: {
			alpha2: "CR",
			alpha3: "CRI",
			numeric: "188",
		},
	},
	{
		name: "Croatia",
		code: {
			alpha2: "HR",
			alpha3: "HRV",
			numeric: "191",
		},
	},
	{
		name: "Cuba",
		code: {
			alpha2: "CU",
			alpha3: "CUB",
			numeric: "192",
		},
	},
	{
		name: "Curaçao",
		code: {
			alpha2: "CW",
			alpha3: "CUW",
			numeric: "531",
		},
	},
	{
		name: "Cyprus",
		code: {
			alpha2: "CY",
			alpha3: "CYP",
			numeric: "196",
		},
	},
	{
		name: "Czechia",
		code: {
			alpha2: "CZ",
			alpha3: "CZE",
			numeric: "203",
		},
	},
	{
		name: "Côte d'Ivoire",
		code: {
			alpha2: "CI",
			alpha3: "CIV",
			numeric: "384",
		},
	},
	{
		name: "Denmark",
		code: {
			alpha2: "DK",
			alpha3: "DNK",
			numeric: "208",
		},
	},
	{
		name: "Djibouti",
		code: {
			alpha2: "DJ",
			alpha3: "DJI",
			numeric: "262",
		},
	},
	{
		name: "Dominica",
		code: {
			alpha2: "DM",
			alpha3: "DMA",
			numeric: "212",
		},
	},
	{
		name: "Dominican Republic (the)",
		code: {
			alpha2: "DO",
			alpha3: "DOM",
			numeric: "214",
		},
	},
	{
		name: "Ecuador",
		code: {
			alpha2: "EC",
			alpha3: "ECU",
			numeric: "218",
		},
	},
	{
		name: "Egypt",
		code: {
			alpha2: "EG",
			alpha3: "EGY",
			numeric: "818",
		},
	},
	{
		name: "El Salvador",
		code: {
			alpha2: "SV",
			alpha3: "SLV",
			numeric: "222",
		},
	},
	{
		name: "Equatorial Guinea",
		code: {
			alpha2: "GQ",
			alpha3: "GNQ",
			numeric: "226",
		},
	},
	{
		name: "Eritrea",
		code: {
			alpha2: "ER",
			alpha3: "ERI",
			numeric: "232",
		},
	},
	{
		name: "Estonia",
		code: {
			alpha2: "EE",
			alpha3: "EST",
			numeric: "233",
		},
	},
	{
		name: "Eswatini",
		code: {
			alpha2: "SZ",
			alpha3: "SWZ",
			numeric: "748",
		},
	},
	{
		name: "Ethiopia",
		code: {
			alpha2: "ET",
			alpha3: "ETH",
			numeric: "231",
		},
	},
	{
		name: "Falkland Islands (the) [Malvinas]",
		code: {
			alpha2: "FK",
			alpha3: "FLK",
			numeric: "238",
		},
	},
	{
		name: "Faroe Islands (the)",
		code: {
			alpha2: "FO",
			alpha3: "FRO",
			numeric: "234",
		},
	},
	{
		name: "Fiji",
		code: {
			alpha2: "FJ",
			alpha3: "FJI",
			numeric: "242",
		},
	},
	{
		name: "Finland",
		code: {
			alpha2: "FI",
			alpha3: "FIN",
			numeric: "246",
		},
	},
	{
		name: "France",
		code: {
			alpha2: "FR",
			alpha3: "FRA",
			numeric: "250",
		},
	},
	{
		name: "French Guiana",
		code: {
			alpha2: "GF",
			alpha3: "GUF",
			numeric: "254",
		},
	},
	{
		name: "French Polynesia",
		code: {
			alpha2: "PF",
			alpha3: "PYF",
			numeric: "258",
		},
	},
	{
		name: "French Southern Territories (the)",
		code: {
			alpha2: "TF",
			alpha3: "ATF",
			numeric: "260",
		},
	},
	{
		name: "Gabon",
		code: {
			alpha2: "GA",
			alpha3: "GAB",
			numeric: "266",
		},
	},
	{
		name: "Gambia (the)",
		code: {
			alpha2: "GM",
			alpha3: "GMB",
			numeric: "270",
		},
	},
	{
		name: "Georgia",
		code: {
			alpha2: "GE",
			alpha3: "GEO",
			numeric: "268",
		},
	},
	{
		name: "Germany",
		code: {
			alpha2: "DE",
			alpha3: "DEU",
			numeric: "276",
		},
	},
	{
		name: "Ghana",
		code: {
			alpha2: "GH",
			alpha3: "GHA",
			numeric: "288",
		},
	},
	{
		name: "Gibraltar",
		code: {
			alpha2: "GI",
			alpha3: "GIB",
			numeric: "292",
		},
	},
	{
		name: "Greece",
		code: {
			alpha2: "GR",
			alpha3: "GRC",
			numeric: "300",
		},
	},
	{
		name: "Greenland",
		code: {
			alpha2: "GL",
			alpha3: "GRL",
			numeric: "304",
		},
	},
	{
		name: "Grenada",
		code: {
			alpha2: "GD",
			alpha3: "GRD",
			numeric: "308",
		},
	},
	{
		name: "Guadeloupe",
		code: {
			alpha2: "GP",
			alpha3: "GLP",
			numeric: "312",
		},
	},
	{
		name: "Guam",
		code: {
			alpha2: "GU",
			alpha3: "GUM",
			numeric: "316",
		},
	},
	{
		name: "Guatemala",
		code: {
			alpha2: "GT",
			alpha3: "GTM",
			numeric: "320",
		},
	},
	{
		name: "Guernsey",
		code: {
			alpha2: "GG",
			alpha3: "GGY",
			numeric: "831",
		},
	},
	{
		name: "Guinea",
		code: {
			alpha2: "GN",
			alpha3: "GIN",
			numeric: "324",
		},
	},
	{
		name: "Guinea-Bissau",
		code: {
			alpha2: "GW",
			alpha3: "GNB",
			numeric: "624",
		},
	},
	{
		name: "Guyana",
		code: {
			alpha2: "GY",
			alpha3: "GUY",
			numeric: "328",
		},
	},
	{
		name: "Haiti",
		code: {
			alpha2: "HT",
			alpha3: "HTI",
			numeric: "332",
		},
	},
	{
		name: "Heard Island and McDonald Islands",
		code: {
			alpha2: "HM",
			alpha3: "HMD",
			numeric: "334",
		},
	},
	{
		name: "Holy See (the)",
		code: {
			alpha2: "VA",
			alpha3: "VAT",
			numeric: "336",
		},
	},
	{
		name: "Honduras",
		code: {
			alpha2: "HN",
			alpha3: "HND",
			numeric: "340",
		},
	},
	{
		name: "Hong Kong",
		code: {
			alpha2: "HK",
			alpha3: "HKG",
			numeric: "344",
		},
	},
	{
		name: "Hungary",
		code: {
			alpha2: "HU",
			alpha3: "HUN",
			numeric: "348",
		},
	},
	{
		name: "Iceland",
		code: {
			alpha2: "IS",
			alpha3: "ISL",
			numeric: "352",
		},
	},
	{
		name: "India",
		code: {
			alpha2: "IN",
			alpha3: "IND",
			numeric: "356",
		},
	},
	{
		name: "Indonesia",
		code: {
			alpha2: "ID",
			alpha3: "IDN",
			numeric: "360",
		},
	},
	{
		name: "Iran (Islamic Republic of)",
		code: {
			alpha2: "IR",
			alpha3: "IRN",
			numeric: "364",
		},
	},
	{
		name: "Iraq",
		code: {
			alpha2: "IQ",
			alpha3: "IRQ",
			numeric: "368",
		},
	},
	{
		name: "Ireland",
		code: {
			alpha2: "IE",
			alpha3: "IRL",
			numeric: "372",
		},
	},
	{
		name: "Isle of Man",
		code: {
			alpha2: "IM",
			alpha3: "IMN",
			numeric: "833",
		},
	},
	{
		name: "Israel",
		code: {
			alpha2: "IL",
			alpha3: "ISR",
			numeric: "376",
		},
	},
	{
		name: "Italy",
		code: {
			alpha2: "IT",
			alpha3: "ITA",
			numeric: "380",
		},
	},
	{
		name: "Jamaica",
		code: {
			alpha2: "JM",
			alpha3: "JAM",
			numeric: "388",
		},
	},
	{
		name: "Japan",
		code: {
			alpha2: "JP",
			alpha3: "JPN",
			numeric: "392",
		},
	},
	{
		name: "Jersey",
		code: {
			alpha2: "JE",
			alpha3: "JEY",
			numeric: "832",
		},
	},
	{
		name: "Jordan",
		code: {
			alpha2: "JO",
			alpha3: "JOR",
			numeric: "400",
		},
	},
	{
		name: "Kazakhstan",
		code: {
			alpha2: "KZ",
			alpha3: "KAZ",
			numeric: "398",
		},
	},
	{
		name: "Kenya",
		code: {
			alpha2: "KE",
			alpha3: "KEN",
			numeric: "404",
		},
	},
	{
		name: "Kiribati",
		code: {
			alpha2: "KI",
			alpha3: "KIR",
			numeric: "296",
		},
	},
	{
		name: "Korea (the Democratic People's Republic of)",
		code: {
			alpha2: "KP",
			alpha3: "PRK",
			numeric: "408",
		},
	},
	{
		name: "Korea (the Republic of)",
		code: {
			alpha2: "KR",
			alpha3: "KOR",
			numeric: "410",
		},
	},
	{
		name: "Kuwait",
		code: {
			alpha2: "KW",
			alpha3: "KWT",
			numeric: "414",
		},
	},
	{
		name: "Kyrgyzstan",
		code: {
			alpha2: "KG",
			alpha3: "KGZ",
			numeric: "417",
		},
	},
	{
		name: "Lao People's Democratic Republic (the)",
		code: {
			alpha2: "LA",
			alpha3: "LAO",
			numeric: "418",
		},
	},
	{
		name: "Latvia",
		code: {
			alpha2: "LV",
			alpha3: "LVA",
			numeric: "428",
		},
	},
	{
		name: "Lebanon",
		code: {
			alpha2: "LB",
			alpha3: "LBN",
			numeric: "422",
		},
	},
	{
		name: "Lesotho",
		code: {
			alpha2: "LS",
			alpha3: "LSO",
			numeric: "426",
		},
	},
	{
		name: "Liberia",
		code: {
			alpha2: "LR",
			alpha3: "LBR",
			numeric: "430",
		},
	},
	{
		name: "Libya",
		code: {
			alpha2: "LY",
			alpha3: "LBY",
			numeric: "434",
		},
	},
	{
		name: "Liechtenstein",
		code: {
			alpha2: "LI",
			alpha3: "LIE",
			numeric: "438",
		},
	},
	{
		name: "Lithuania",
		code: {
			alpha2: "LT",
			alpha3: "LTU",
			numeric: "440",
		},
	},
	{
		name: "Luxembourg",
		code: {
			alpha2: "LU",
			alpha3: "LUX",
			numeric: "442",
		},
	},
	{
		name: "Macao",
		code: {
			alpha2: "MO",
			alpha3: "MAC",
			numeric: "446",
		},
	},
	{
		name: "Madagascar",
		code: {
			alpha2: "MG",
			alpha3: "MDG",
			numeric: "450",
		},
	},
	{
		name: "Malawi",
		code: {
			alpha2: "MW",
			alpha3: "MWI",
			numeric: "454",
		},
	},
	{
		name: "Malaysia",
		code: {
			alpha2: "MY",
			alpha3: "MYS",
			numeric: "458",
		},
	},
	{
		name: "Maldives",
		code: {
			alpha2: "MV",
			alpha3: "MDV",
			numeric: "462",
		},
	},
	{
		name: "Mali",
		code: {
			alpha2: "ML",
			alpha3: "MLI",
			numeric: "466",
		},
	},
	{
		name: "Malta",
		code: {
			alpha2: "MT",
			alpha3: "MLT",
			numeric: "470",
		},
	},
	{
		name: "Marshall Islands (the)",
		code: {
			alpha2: "MH",
			alpha3: "MHL",
			numeric: "584",
		},
	},
	{
		name: "Martinique",
		code: {
			alpha2: "MQ",
			alpha3: "MTQ",
			numeric: "474",
		},
	},
	{
		name: "Mauritania",
		code: {
			alpha2: "MR",
			alpha3: "MRT",
			numeric: "478",
		},
	},
	{
		name: "Mauritius",
		code: {
			alpha2: "MU",
			alpha3: "MUS",
			numeric: "480",
		},
	},
	{
		name: "Mayotte",
		code: {
			alpha2: "YT",
			alpha3: "MYT",
			numeric: "175",
		},
	},
	{
		name: "Mexico",
		code: {
			alpha2: "MX",
			alpha3: "MEX",
			numeric: "484",
		},
	},
	{
		name: "Micronesia (Federated States of)",
		code: {
			alpha2: "FM",
			alpha3: "FSM",
			numeric: "583",
		},
	},
	{
		name: "Moldova (the Republic of)",
		code: {
			alpha2: "MD",
			alpha3: "MDA",
			numeric: "498",
		},
	},
	{
		name: "Monaco",
		code: {
			alpha2: "MC",
			alpha3: "MCO",
			numeric: "492",
		},
	},
	{
		name: "Mongolia",
		code: {
			alpha2: "MN",
			alpha3: "MNG",
			numeric: "496",
		},
	},
	{
		name: "Montenegro",
		code: {
			alpha2: "ME",
			alpha3: "MNE",
			numeric: "499",
		},
	},
	{
		name: "Montserrat",
		code: {
			alpha2: "MS",
			alpha3: "MSR",
			numeric: "500",
		},
	},
	{
		name: "Morocco",
		code: {
			alpha2: "MA",
			alpha3: "MAR",
			numeric: "504",
		},
	},
	{
		name: "Mozambique",
		code: {
			alpha2: "MZ",
			alpha3: "MOZ",
			numeric: "508",
		},
	},
	{
		name: "Myanmar",
		code: {
			alpha2: "MM",
			alpha3: "MMR",
			numeric: "104",
		},
	},
	{
		name: "Namibia",
		code: {
			alpha2: "NA",
			alpha3: "NAM",
			numeric: "516",
		},
	},
	{
		name: "Nauru",
		code: {
			alpha2: "NR",
			alpha3: "NRU",
			numeric: "520",
		},
	},
	{
		name: "Nepal",
		code: {
			alpha2: "NP",
			alpha3: "NPL",
			numeric: "524",
		},
	},
	{
		name: "Netherlands (Kingdom of the)",
		code: {
			alpha2: "NL",
			alpha3: "NLD",
			numeric: "528",
		},
	},
	{
		name: "New Caledonia",
		code: {
			alpha2: "NC",
			alpha3: "NCL",
			numeric: "540",
		},
	},
	{
		name: "New Zealand",
		code: {
			alpha2: "NZ",
			alpha3: "NZL",
			numeric: "554",
		},
	},
	{
		name: "Nicaragua",
		code: {
			alpha2: "NI",
			alpha3: "NIC",
			numeric: "558",
		},
	},
	{
		name: "Niger (the)",
		code: {
			alpha2: "NE",
			alpha3: "NER",
			numeric: "562",
		},
	},
	{
		name: "Nigeria",
		code: {
			alpha2: "NG",
			alpha3: "NGA",
			numeric: "566",
		},
	},
	{
		name: "Niue",
		code: {
			alpha2: "NU",
			alpha3: "NIU",
			numeric: "570",
		},
	},
	{
		name: "Norfolk Island",
		code: {
			alpha2: "NF",
			alpha3: "NFK",
			numeric: "574",
		},
	},
	{
		name: "North Macedonia",
		code: {
			alpha2: "MK",
			alpha3: "MKD",
			numeric: "807",
		},
	},
	{
		name: "Northern Mariana Islands (the)",
		code: {
			alpha2: "MP",
			alpha3: "MNP",
			numeric: "580",
		},
	},
	{
		name: "Norway",
		code: {
			alpha2: "NO",
			alpha3: "NOR",
			numeric: "578",
		},
	},
	{
		name: "Oman",
		code: {
			alpha2: "OM",
			alpha3: "OMN",
			numeric: "512",
		},
	},
	{
		name: "Pakistan",
		code: {
			alpha2: "PK",
			alpha3: "PAK",
			numeric: "586",
		},
	},
	{
		name: "Palau",
		code: {
			alpha2: "PW",
			alpha3: "PLW",
			numeric: "585",
		},
	},
	{
		name: "Palestine, State of",
		code: {
			alpha2: "PS",
			alpha3: "PSE",
			numeric: "275",
		},
	},
	{
		name: "Panama",
		code: {
			alpha2: "PA",
			alpha3: "PAN",
			numeric: "591",
		},
	},
	{
		name: "Papua New Guinea",
		code: {
			alpha2: "PG",
			alpha3: "PNG",
			numeric: "598",
		},
	},
	{
		name: "Paraguay",
		code: {
			alpha2: "PY",
			alpha3: "PRY",
			numeric: "600",
		},
	},
	{
		name: "Peru",
		code: {
			alpha2: "PE",
			alpha3: "PER",
			numeric: "604",
		},
	},
	{
		name: "Philippines (the)",
		code: {
			alpha2: "PH",
			alpha3: "PHL",
			numeric: "608",
		},
	},
	{
		name: "Pitcairn",
		code: {
			alpha2: "PN",
			alpha3: "PCN",
			numeric: "612",
		},
	},
	{
		name: "Poland",
		code: {
			alpha2: "PL",
			alpha3: "POL",
			numeric: "616",
		},
	},
	{
		name: "Portugal",
		code: {
			alpha2: "PT",
			alpha3: "PRT",
			numeric: "620",
		},
	},
	{
		name: "Puerto Rico",
		code: {
			alpha2: "PR",
			alpha3: "PRI",
			numeric: "630",
		},
	},
	{
		name: "Qatar",
		code: {
			alpha2: "QA",
			alpha3: "QAT",
			numeric: "634",
		},
	},
	{
		name: "Romania",
		code: {
			alpha2: "RO",
			alpha3: "ROU",
			numeric: "642",
		},
	},
	{
		name: "Russian Federation (the)",
		code: {
			alpha2: "RU",
			alpha3: "RUS",
			numeric: "643",
		},
	},
	{
		name: "Rwanda",
		code: {
			alpha2: "RW",
			alpha3: "RWA",
			numeric: "646",
		},
	},
	{
		name: "Réunion",
		code: {
			alpha2: "RE",
			alpha3: "REU",
			numeric: "638",
		},
	},
	{
		name: "Saint Barthélemy",
		code: {
			alpha2: "BL",
			alpha3: "BLM",
			numeric: "652",
		},
	},
	{
		name: "Saint Helena, Ascension and Tristan da Cunha",
		code: {
			alpha2: "SH",
			alpha3: "SHN",
			numeric: "654",
		},
	},
	{
		name: "Saint Kitts and Nevis",
		code: {
			alpha2: "KN",
			alpha3: "KNA",
			numeric: "659",
		},
	},
	{
		name: "Saint Lucia",
		code: {
			alpha2: "LC",
			alpha3: "LCA",
			numeric: "662",
		},
	},
	{
		name: "Saint Martin (French part)",
		code: {
			alpha2: "MF",
			alpha3: "MAF",
			numeric: "663",
		},
	},
	{
		name: "Saint Pierre and Miquelon",
		code: {
			alpha2: "PM",
			alpha3: "SPM",
			numeric: "666",
		},
	},
	{
		name: "Saint Vincent and the Grenadines",
		code: {
			alpha2: "VC",
			alpha3: "VCT",
			numeric: "670",
		},
	},
	{
		name: "Samoa",
		code: {
			alpha2: "WS",
			alpha3: "WSM",
			numeric: "882",
		},
	},
	{
		name: "San Marino",
		code: {
			alpha2: "SM",
			alpha3: "SMR",
			numeric: "674",
		},
	},
	{
		name: "Sao Tome and Principe",
		code: {
			alpha2: "ST",
			alpha3: "STP",
			numeric: "678",
		},
	},
	{
		name: "Saudi Arabia",
		code: {
			alpha2: "SA",
			alpha3: "SAU",
			numeric: "682",
		},
	},
	{
		name: "Senegal",
		code: {
			alpha2: "SN",
			alpha3: "SEN",
			numeric: "686",
		},
	},
	{
		name: "Serbia",
		code: {
			alpha2: "RS",
			alpha3: "SRB",
			numeric: "688",
		},
	},
	{
		name: "Seychelles",
		code: {
			alpha2: "SC",
			alpha3: "SYC",
			numeric: "690",
		},
	},
	{
		name: "Sierra Leone",
		code: {
			alpha2: "SL",
			alpha3: "SLE",
			numeric: "694",
		},
	},
	{
		name: "Singapore",
		code: {
			alpha2: "SG",
			alpha3: "SGP",
			numeric: "702",
		},
	},
	{
		name: "Sint Maarten (Dutch part)",
		code: {
			alpha2: "SX",
			alpha3: "SXM",
			numeric: "534",
		},
	},
	{
		name: "Slovakia",
		code: {
			alpha2: "SK",
			alpha3: "SVK",
			numeric: "703",
		},
	},
	{
		name: "Slovenia",
		code: {
			alpha2: "SI",
			alpha3: "SVN",
			numeric: "705",
		},
	},
	{
		name: "Solomon Islands",
		code: {
			alpha2: "SB",
			alpha3: "SLB",
			numeric: "090",
		},
	},
	{
		name: "Somalia",
		code: {
			alpha2: "SO",
			alpha3: "SOM",
			numeric: "706",
		},
	},
	{
		name: "South Africa",
		code: {
			alpha2: "ZA",
			alpha3: "ZAF",
			numeric: "710",
		},
	},
	{
		name: "South Georgia and the South Sandwich Islands",
		code: {
			alpha2: "GS",
			alpha3: "SGS",
			numeric: "239",
		},
	},
	{
		name: "South Sudan",
		code: {
			alpha2: "SS",
			alpha3: "SSD",
			numeric: "728",
		},
	},
	{
		name: "Spain",
		code: {
			alpha2: "ES",
			alpha3: "ESP",
			numeric: "724",
		},
	},
	{
		name: "Sri Lanka",
		code: {
			alpha2: "LK",
			alpha3: "LKA",
			numeric: "144",
		},
	},
	{
		name: "Sudan (the)",
		code: {
			alpha2: "SD",
			alpha3: "SDN",
			numeric: "729",
		},
	},
	{
		name: "Suriname",
		code: {
			alpha2: "SR",
			alpha3: "SUR",
			numeric: "740",
		},
	},
	{
		name: "Svalbard and Jan Mayen",
		code: {
			alpha2: "SJ",
			alpha3: "SJM",
			numeric: "744",
		},
	},
	{
		name: "Sweden",
		code: {
			alpha2: "SE",
			alpha3: "SWE",
			numeric: "752",
		},
	},
	{
		name: "Switzerland",
		code: {
			alpha2: "CH",
			alpha3: "CHE",
			numeric: "756",
		},
	},
	{
		name: "Syrian Arab Republic (the)",
		code: {
			alpha2: "SY",
			alpha3: "SYR",
			numeric: "760",
		},
	},
	{
		name: "Taiwan (Province of China)",
		code: {
			alpha2: "TW",
			alpha3: "TWN",
			numeric: "158",
		},
	},
	{
		name: "Tajikistan",
		code: {
			alpha2: "TJ",
			alpha3: "TJK",
			numeric: "762",
		},
	},
	{
		name: "Tanzania, the United Republic of",
		code: {
			alpha2: "TZ",
			alpha3: "TZA",
			numeric: "834",
		},
	},
	{
		name: "Thailand",
		code: {
			alpha2: "TH",
			alpha3: "THA",
			numeric: "764",
		},
	},
	{
		name: "Timor-Leste",
		code: {
			alpha2: "TL",
			alpha3: "TLS",
			numeric: "626",
		},
	},
	{
		name: "Togo",
		code: {
			alpha2: "TG",
			alpha3: "TGO",
			numeric: "768",
		},
	},
	{
		name: "Tokelau",
		code: {
			alpha2: "TK",
			alpha3: "TKL",
			numeric: "772",
		},
	},
	{
		name: "Tonga",
		code: {
			alpha2: "TO",
			alpha3: "TON",
			numeric: "776",
		},
	},
	{
		name: "Trinidad and Tobago",
		code: {
			alpha2: "TT",
			alpha3: "TTO",
			numeric: "780",
		},
	},
	{
		name: "Tunisia",
		code: {
			alpha2: "TN",
			alpha3: "TUN",
			numeric: "788",
		},
	},
	{
		name: "Turkmenistan",
		code: {
			alpha2: "TM",
			alpha3: "TKM",
			numeric: "795",
		},
	},
	{
		name: "Turks and Caicos Islands (the)",
		code: {
			alpha2: "TC",
			alpha3: "TCA",
			numeric: "796",
		},
	},
	{
		name: "Tuvalu",
		code: {
			alpha2: "TV",
			alpha3: "TUV",
			numeric: "798",
		},
	},
	{
		name: "Türkiye",
		code: {
			alpha2: "TR",
			alpha3: "TUR",
			numeric: "792",
		},
	},
	{
		name: "Uganda",
		code: {
			alpha2: "UG",
			alpha3: "UGA",
			numeric: "800",
		},
	},
	{
		name: "Ukraine",
		code: {
			alpha2: "UA",
			alpha3: "UKR",
			numeric: "804",
		},
	},
	{
		name: "United Arab Emirates (the)",
		code: {
			alpha2: "AE",
			alpha3: "ATR",
			numeric: "784",
		},
	},
	{
		name: "United Kingdom of Great Britain and Northern Ireland (the)",
		code: {
			alpha2: "GB",
			alpha3: "GBR",
			numeric: "826",
		},
	},
	{
		name: "United States Minor Outlying Islands (the)",
		code: {
			alpha2: "UM",
			alpha3: "UMI",
			numeric: "581",
		},
	},
	{
		name: "United States of America (the)",
		code: {
			alpha2: "US",
			alpha3: "USA",
			numeric: "840",
		},
	},
	{
		name: "Uruguay",
		code: {
			alpha2: "UY",
			alpha3: "URY",
			numeric: "858",
		},
	},
	{
		name: "Uzbekistan",
		code: {
			alpha2: "UZ",
			alpha3: "UZB",
			numeric: "860",
		},
	},
	{
		name: "Vanuatu",
		code: {
			alpha2: "VU",
			alpha3: "VUT",
			numeric: "548",
		},
	},
	{
		name: "Venezuela (Bolivarian Republic of)",
		code: {
			alpha2: "VE",
			alpha3: "VEN",
			numeric: "862",
		},
	},
	{
		name: "Viet Nam",
		code: {
			alpha2: "VN",
			alpha3: "VNM",
			numeric: "704",
		},
	},
	{
		name: "Virgin Islands (British)",
		code: {
			alpha2: "VG",
			alpha3: "VGB",
			numeric: "092",
		},
	},
	{
		name: "Virgin Islands (U.S.)",
		code: {
			alpha2: "VI",
			alpha3: "VIR",
			numeric: "850",
		},
	},
	{
		name: "Wallis and Futuna",
		code: {
			alpha2: "WF",
			alpha3: "WLF",
			numeric: "876",
		},
	},
	{
		name: "Western Sahara*",
		code: {
			alpha2: "EH",
			alpha3: "ESH",
			numeric: "732",
		},
	},
	{
		name: "Yemen",
		code: {
			alpha2: "YE",
			alpha3: "YEM",
			numeric: "887",
		},
	},
	{
		name: "Zambia",
		code: {
			alpha2: "ZM",
			alpha3: "ZMB",
			numeric: "894",
		},
	},
	{
		name: "Zimbabwe",
		code: {
			alpha2: "ZW",
			alpha3: "ZWE",
			numeric: "716",
		},
	},
] as const satisfies Iso3166Definition[];
