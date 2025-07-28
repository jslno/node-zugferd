/**
 * @see https://www.iso.org/obp/ui/#search
 */

import { createEnum } from "..";

export type Iso3166Definition = {
	key: string;
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
		key: "AFGHANISTAN",
		name: "Afghanistan",
		code: {
			alpha2: "AF",
			alpha3: "AFG",
			numeric: "004",
		},
	},
	{
		key: "ALBANIA",
		name: "Albania",
		code: {
			alpha2: "AL",
			alpha3: "ALB",
			numeric: "008",
		},
	},
	{
		key: "ALGERIA",
		name: "Algeria",
		code: {
			alpha2: "DZ",
			alpha3: "DZA",
			numeric: "012",
		},
	},
	{
		key: "AMERICAN_SAMOA",
		name: "American Samoa",
		code: {
			alpha2: "AS",
			alpha3: "ASM",
			numeric: "016",
		},
	},
	{
		key: "ANDORRA",
		name: "Andorra",
		code: {
			alpha2: "AD",
			alpha3: "AND",
			numeric: "020",
		},
	},
	{
		key: "ANGOLA",
		name: "Angola",
		code: {
			alpha2: "AO",
			alpha3: "AGO",
			numeric: "024",
		},
	},
	{
		key: "ANGUILLA",
		name: "Anguilla",
		code: {
			alpha2: "AI",
			alpha3: "AIA",
			numeric: "660",
		},
	},
	{
		key: "ANTARCTICA",
		name: "Antarctica",
		code: {
			alpha2: "AQ",
			alpha3: "ATA",
			numeric: "010",
		},
	},
	{
		key: "ANTIGUA_AND_BARBUDA",
		name: "Antigua and Barbuda",
		code: {
			alpha2: "AG",
			alpha3: "ATG",
			numeric: "028",
		},
	},
	{
		key: "ARGENTINA",
		name: "Argentina",
		code: {
			alpha2: "AR",
			alpha3: "ARG",
			numeric: "032",
		},
	},
	{
		key: "ARMENIA",
		name: "Armenia",
		code: {
			alpha2: "AM",
			alpha3: "ARM",
			numeric: "051",
		},
	},
	{
		key: "ARUBA",
		name: "Aruba",
		code: {
			alpha2: "AW",
			alpha3: "ABW",
			numeric: "533",
		},
	},
	{
		key: "AUSTRALIA",
		name: "Australia",
		code: {
			alpha2: "AU",
			alpha3: "AUS",
			numeric: "036",
		},
	},
	{
		key: "AUSTRIA",
		name: "Austria",
		code: {
			alpha2: "AT",
			alpha3: "AUT",
			numeric: "040",
		},
	},
	{
		key: "AZERBAIJAN",
		name: "Azerbaijan",
		code: {
			alpha2: "AZ",
			alpha3: "AZE",
			numeric: "031",
		},
	},
	{
		key: "BAHAMAS_THE",
		name: "Bahamas (the)",
		code: {
			alpha2: "BS",
			alpha3: "BHS",
			numeric: "044",
		},
	},
	{
		key: "BAHRAIN",
		name: "Bahrain",
		code: {
			alpha2: "BH",
			alpha3: "BHR",
			numeric: "048",
		},
	},
	{
		key: "BANGLADESH",
		name: "Bangladesh",
		code: {
			alpha2: "BD",
			alpha3: "BGD",
			numeric: "050",
		},
	},
	{
		key: "BARBADOS",
		name: "Barbados",
		code: {
			alpha2: "BB",
			alpha3: "BRB",
			numeric: "052",
		},
	},
	{
		key: "BELARUS",
		name: "Belarus",
		code: {
			alpha2: "BY",
			alpha3: "BLR",
			numeric: "112",
		},
	},
	{
		key: "BELGIUM",
		name: "Belgium",
		code: {
			alpha2: "BE",
			alpha3: "BEL",
			numeric: "056",
		},
	},
	{
		key: "BELIZE",
		name: "Belize",
		code: {
			alpha2: "BZ",
			alpha3: "BLZ",
			numeric: "084",
		},
	},
	{
		key: "BENIN",
		name: "Benin",
		code: {
			alpha2: "BJ",
			alpha3: "BEN",
			numeric: "204",
		},
	},
	{
		key: "BERMUDA",
		name: "Bermuda",
		code: {
			alpha2: "BM",
			alpha3: "BMU",
			numeric: "060",
		},
	},
	{
		key: "ALAND_ISLANDS",
		name: "Åland Islands",
		code: {
			alpha2: "AX",
			alpha3: "ALA",
			numeric: "248",
		},
	},
	{
		key: "BHUTAN",
		name: "Bhutan",
		code: {
			alpha2: "BT",
			alpha3: "BTN",
			numeric: "064",
		},
	},
	{
		key: "BOLIVIA_PLURINATIONAL_STATE_OF",
		name: "Bolivia (Plurinational State of)",
		code: {
			alpha2: "BO",
			alpha3: "BOL",
			numeric: "068",
		},
	},
	{
		key: "BONAIRE_SINT_EUSTATIUS_AND_SABA",
		name: "Bonaire, Sint Eustatius and Saba",
		code: {
			alpha2: "BQ",
			alpha3: "BES",
			numeric: "535",
		},
	},
	{
		key: "BOSNIA_AND_HERZEGOVINA",
		name: "Bosnia and Herzegovina",
		code: {
			alpha2: "BA",
			alpha3: "BIH",
			numeric: "070",
		},
	},
	{
		key: "BOTSWANA",
		name: "Botswana",
		code: {
			alpha2: "BW",
			alpha3: "BWA",
			numeric: "072",
		},
	},
	{
		key: "BOUVET_ISLAND",
		name: "Bouvet Island",
		code: {
			alpha2: "BV",
			alpha3: "BVT",
			numeric: "074",
		},
	},
	{
		key: "BRAZIL",
		name: "Brazil",
		code: {
			alpha2: "BR",
			alpha3: "BRA",
			numeric: "076",
		},
	},
	{
		key: "BRITISH_INDIAN_OCEAN_TERRITORY_THE",
		name: "British Indian Ocean Territory (the)",
		code: {
			alpha2: "IO",
			alpha3: "IOT",
			numeric: "086",
		},
	},
	{
		key: "BRUNEI_DARUSSALAM",
		name: "Brunei Darussalam",
		code: {
			alpha2: "BN",
			alpha3: "BRN",
			numeric: "096",
		},
	},
	{
		key: "BULGARIA",
		name: "Bulgaria",
		code: {
			alpha2: "BG",
			alpha3: "BGR",
			numeric: "100",
		},
	},
	{
		key: "BURKINA_FASO",
		name: "Burkina Faso",
		code: {
			alpha2: "BF",
			alpha3: "BFA",
			numeric: "854",
		},
	},
	{
		key: "BURUNDI",
		name: "Burundi",
		code: {
			alpha2: "BI",
			alpha3: "BDI",
			numeric: "108",
		},
	},
	{
		key: "CABO_VERDE",
		name: "Cabo Verde",
		code: {
			alpha2: "CV",
			alpha3: "CPV",
			numeric: "132",
		},
	},
	{
		key: "CAMBODIA",
		name: "Cambodia",
		code: {
			alpha2: "KH",
			alpha3: "KHM",
			numeric: "116",
		},
	},
	{
		key: "CAMEROON",
		name: "Cameroon",
		code: {
			alpha2: "CM",
			alpha3: "CMR",
			numeric: "120",
		},
	},
	{
		key: "CANADA",
		name: "Canada",
		code: {
			alpha2: "CA",
			alpha3: "CAN",
			numeric: "124",
		},
	},
	{
		key: "CAYMAN_ISLANDS_THE",
		name: "Cayman Islands (the)",
		code: {
			alpha2: "KY",
			alpha3: "CYM",
			numeric: "136",
		},
	},
	{
		key: "CENTRAL_AFRICAN_REPUBLIC_THE",
		name: "Central African Republic (the)",
		code: {
			alpha2: "CF",
			alpha3: "CAF",
			numeric: "140",
		},
	},
	{
		key: "CHAD",
		name: "Chad",
		code: {
			alpha2: "TD",
			alpha3: "TCD",
			numeric: "148",
		},
	},
	{
		key: "CHILE",
		name: "Chile",
		code: {
			alpha2: "CL",
			alpha3: "CHL",
			numeric: "152",
		},
	},
	{
		key: "CHINA",
		name: "China",
		code: {
			alpha2: "CN",
			alpha3: "CHN",
			numeric: "156",
		},
	},
	{
		key: "CHRISTMAS_ISLAND",
		name: "Christmas Island",
		code: {
			alpha2: "CX",
			alpha3: "CXR",
			numeric: "162",
		},
	},
	{
		key: "COCOS_KEELING_ISLANDS_THE",
		name: "Cocos (Keeling) Islands (the)",
		code: {
			alpha2: "CC",
			alpha3: "CCK",
			numeric: "166",
		},
	},
	{
		key: "COLOMBIA",
		name: "Colombia",
		code: {
			alpha2: "CO",
			alpha3: "COL",
			numeric: "170",
		},
	},
	{
		key: "COMOROS_THE",
		name: "Comoros (the)",
		code: {
			alpha2: "KM",
			alpha3: "COM",
			numeric: "174",
		},
	},
	{
		key: "CONGO_THE_DEMOCRATIC_REPUBLIC_OF_THE",
		name: "Congo (the Democratic Republic of the)",
		code: {
			alpha2: "CD",
			alpha3: "COD",
			numeric: "180",
		},
	},
	{
		key: "CONGO_THE",
		name: "Congo (the)",
		code: {
			alpha2: "CG",
			alpha3: "COG",
			numeric: "178",
		},
	},
	{
		key: "COOK_ISLANDS_THE",
		name: "Cook Islands (the)",
		code: {
			alpha2: "CK",
			alpha3: "COK",
			numeric: "184",
		},
	},
	{
		key: "COSTA_RICA",
		name: "Costa Rica",
		code: {
			alpha2: "CR",
			alpha3: "CRI",
			numeric: "188",
		},
	},
	{
		key: "CROATIA",
		name: "Croatia",
		code: {
			alpha2: "HR",
			alpha3: "HRV",
			numeric: "191",
		},
	},
	{
		key: "CUBA",
		name: "Cuba",
		code: {
			alpha2: "CU",
			alpha3: "CUB",
			numeric: "192",
		},
	},
	{
		key: "CURACAO",
		name: "Curaçao",
		code: {
			alpha2: "CW",
			alpha3: "CUW",
			numeric: "531",
		},
	},
	{
		key: "CYPRUS",
		name: "Cyprus",
		code: {
			alpha2: "CY",
			alpha3: "CYP",
			numeric: "196",
		},
	},
	{
		key: "CZECHIA",
		name: "Czechia",
		code: {
			alpha2: "CZ",
			alpha3: "CZE",
			numeric: "203",
		},
	},
	{
		key: "COTE_DIVOIRE",
		name: "Côte d'Ivoire",
		code: {
			alpha2: "CI",
			alpha3: "CIV",
			numeric: "384",
		},
	},
	{
		key: "DENMARK",
		name: "Denmark",
		code: {
			alpha2: "DK",
			alpha3: "DNK",
			numeric: "208",
		},
	},
	{
		key: "DJIBOUTI",
		name: "Djibouti",
		code: {
			alpha2: "DJ",
			alpha3: "DJI",
			numeric: "262",
		},
	},
	{
		key: "DOMINICA",
		name: "Dominica",
		code: {
			alpha2: "DM",
			alpha3: "DMA",
			numeric: "212",
		},
	},
	{
		key: "DOMINICAN_REPUBLIC_THE",
		name: "Dominican Republic (the)",
		code: {
			alpha2: "DO",
			alpha3: "DOM",
			numeric: "214",
		},
	},
	{
		key: "ECUADOR",
		name: "Ecuador",
		code: {
			alpha2: "EC",
			alpha3: "ECU",
			numeric: "218",
		},
	},
	{
		key: "EGYPT",
		name: "Egypt",
		code: {
			alpha2: "EG",
			alpha3: "EGY",
			numeric: "818",
		},
	},
	{
		key: "EL_SALVADOR",
		name: "El Salvador",
		code: {
			alpha2: "SV",
			alpha3: "SLV",
			numeric: "222",
		},
	},
	{
		key: "EQUATORIAL_GUINEA",
		name: "Equatorial Guinea",
		code: {
			alpha2: "GQ",
			alpha3: "GNQ",
			numeric: "226",
		},
	},
	{
		key: "ERITREA",
		name: "Eritrea",
		code: {
			alpha2: "ER",
			alpha3: "ERI",
			numeric: "232",
		},
	},
	{
		key: "ESTONIA",
		name: "Estonia",
		code: {
			alpha2: "EE",
			alpha3: "EST",
			numeric: "233",
		},
	},
	{
		key: "ESWATINI",
		name: "Eswatini",
		code: {
			alpha2: "SZ",
			alpha3: "SWZ",
			numeric: "748",
		},
	},
	{
		key: "ETHIOPIA",
		name: "Ethiopia",
		code: {
			alpha2: "ET",
			alpha3: "ETH",
			numeric: "231",
		},
	},
	{
		key: "FALKLAND_ISLANDS_THE_MALVINAS",
		name: "Falkland Islands (the) [Malvinas]",
		code: {
			alpha2: "FK",
			alpha3: "FLK",
			numeric: "238",
		},
	},
	{
		key: "FAROE_ISLANDS_THE",
		name: "Faroe Islands (the)",
		code: {
			alpha2: "FO",
			alpha3: "FRO",
			numeric: "234",
		},
	},
	{
		key: "FIJI",
		name: "Fiji",
		code: {
			alpha2: "FJ",
			alpha3: "FJI",
			numeric: "242",
		},
	},
	{
		key: "FINLAND",
		name: "Finland",
		code: {
			alpha2: "FI",
			alpha3: "FIN",
			numeric: "246",
		},
	},
	{
		key: "FRANCE",
		name: "France",
		code: {
			alpha2: "FR",
			alpha3: "FRA",
			numeric: "250",
		},
	},
	{
		key: "FRENCH_GUIANA",
		name: "French Guiana",
		code: {
			alpha2: "GF",
			alpha3: "GUF",
			numeric: "254",
		},
	},
	{
		key: "FRENCH_POLYNESIA",
		name: "French Polynesia",
		code: {
			alpha2: "PF",
			alpha3: "PYF",
			numeric: "258",
		},
	},
	{
		key: "FRENCH_SOUTHERN_TERRITORIES_THE",
		name: "French Southern Territories (the)",
		code: {
			alpha2: "TF",
			alpha3: "ATF",
			numeric: "260",
		},
	},
	{
		key: "GABON",
		name: "Gabon",
		code: {
			alpha2: "GA",
			alpha3: "GAB",
			numeric: "266",
		},
	},
	{
		key: "GAMBIA_THE",
		name: "Gambia (the)",
		code: {
			alpha2: "GM",
			alpha3: "GMB",
			numeric: "270",
		},
	},
	{
		key: "GEORGIA",
		name: "Georgia",
		code: {
			alpha2: "GE",
			alpha3: "GEO",
			numeric: "268",
		},
	},
	{
		key: "GERMANY",
		name: "Germany",
		code: {
			alpha2: "DE",
			alpha3: "DEU",
			numeric: "276",
		},
	},
	{
		key: "GHANA",
		name: "Ghana",
		code: {
			alpha2: "GH",
			alpha3: "GHA",
			numeric: "288",
		},
	},
	{
		key: "GIBRALTAR",
		name: "Gibraltar",
		code: {
			alpha2: "GI",
			alpha3: "GIB",
			numeric: "292",
		},
	},
	{
		key: "GREECE",
		name: "Greece",
		code: {
			alpha2: "GR",
			alpha3: "GRC",
			numeric: "300",
		},
	},
	{
		key: "GREENLAND",
		name: "Greenland",
		code: {
			alpha2: "GL",
			alpha3: "GRL",
			numeric: "304",
		},
	},
	{
		key: "GRENADA",
		name: "Grenada",
		code: {
			alpha2: "GD",
			alpha3: "GRD",
			numeric: "308",
		},
	},
	{
		key: "GUADELOUPE",
		name: "Guadeloupe",
		code: {
			alpha2: "GP",
			alpha3: "GLP",
			numeric: "312",
		},
	},
	{
		key: "GUAM",
		name: "Guam",
		code: {
			alpha2: "GU",
			alpha3: "GUM",
			numeric: "316",
		},
	},
	{
		key: "GUATEMALA",
		name: "Guatemala",
		code: {
			alpha2: "GT",
			alpha3: "GTM",
			numeric: "320",
		},
	},
	{
		key: "GUERNSEY",
		name: "Guernsey",
		code: {
			alpha2: "GG",
			alpha3: "GGY",
			numeric: "831",
		},
	},
	{
		key: "GUINEA",
		name: "Guinea",
		code: {
			alpha2: "GN",
			alpha3: "GIN",
			numeric: "324",
		},
	},
	{
		key: "GUINEA_BISSAU",
		name: "Guinea-Bissau",
		code: {
			alpha2: "GW",
			alpha3: "GNB",
			numeric: "624",
		},
	},
	{
		key: "GUYANA",
		name: "Guyana",
		code: {
			alpha2: "GY",
			alpha3: "GUY",
			numeric: "328",
		},
	},
	{
		key: "HAITI",
		name: "Haiti",
		code: {
			alpha2: "HT",
			alpha3: "HTI",
			numeric: "332",
		},
	},
	{
		key: "HEARD_ISLAND_AND_MC_DONALD_ISLANDS",
		name: "Heard Island and McDonald Islands",
		code: {
			alpha2: "HM",
			alpha3: "HMD",
			numeric: "334",
		},
	},
	{
		key: "HOLY_SEE_THE",
		name: "Holy See (the)",
		code: {
			alpha2: "VA",
			alpha3: "VAT",
			numeric: "336",
		},
	},
	{
		key: "HONDURAS",
		name: "Honduras",
		code: {
			alpha2: "HN",
			alpha3: "HND",
			numeric: "340",
		},
	},
	{
		key: "HONG_KONG",
		name: "Hong Kong",
		code: {
			alpha2: "HK",
			alpha3: "HKG",
			numeric: "344",
		},
	},
	{
		key: "HUNGARY",
		name: "Hungary",
		code: {
			alpha2: "HU",
			alpha3: "HUN",
			numeric: "348",
		},
	},
	{
		key: "ICELAND",
		name: "Iceland",
		code: {
			alpha2: "IS",
			alpha3: "ISL",
			numeric: "352",
		},
	},
	{
		key: "INDIA",
		name: "India",
		code: {
			alpha2: "IN",
			alpha3: "IND",
			numeric: "356",
		},
	},
	{
		key: "INDONESIA",
		name: "Indonesia",
		code: {
			alpha2: "ID",
			alpha3: "IDN",
			numeric: "360",
		},
	},
	{
		key: "IRAN_ISLAMIC_REPUBLIC_OF",
		name: "Iran (Islamic Republic of)",
		code: {
			alpha2: "IR",
			alpha3: "IRN",
			numeric: "364",
		},
	},
	{
		key: "IRAQ",
		name: "Iraq",
		code: {
			alpha2: "IQ",
			alpha3: "IRQ",
			numeric: "368",
		},
	},
	{
		key: "IRELAND",
		name: "Ireland",
		code: {
			alpha2: "IE",
			alpha3: "IRL",
			numeric: "372",
		},
	},
	{
		key: "ISLE_OF_MAN",
		name: "Isle of Man",
		code: {
			alpha2: "IM",
			alpha3: "IMN",
			numeric: "833",
		},
	},
	{
		key: "ISRAEL",
		name: "Israel",
		code: {
			alpha2: "IL",
			alpha3: "ISR",
			numeric: "376",
		},
	},
	{
		key: "ITALY",
		name: "Italy",
		code: {
			alpha2: "IT",
			alpha3: "ITA",
			numeric: "380",
		},
	},
	{
		key: "JAMAICA",
		name: "Jamaica",
		code: {
			alpha2: "JM",
			alpha3: "JAM",
			numeric: "388",
		},
	},
	{
		key: "JAPAN",
		name: "Japan",
		code: {
			alpha2: "JP",
			alpha3: "JPN",
			numeric: "392",
		},
	},
	{
		key: "JERSEY",
		name: "Jersey",
		code: {
			alpha2: "JE",
			alpha3: "JEY",
			numeric: "832",
		},
	},
	{
		key: "JORDAN",
		name: "Jordan",
		code: {
			alpha2: "JO",
			alpha3: "JOR",
			numeric: "400",
		},
	},
	{
		key: "KAZAKHSTAN",
		name: "Kazakhstan",
		code: {
			alpha2: "KZ",
			alpha3: "KAZ",
			numeric: "398",
		},
	},
	{
		key: "KENYA",
		name: "Kenya",
		code: {
			alpha2: "KE",
			alpha3: "KEN",
			numeric: "404",
		},
	},
	{
		key: "KIRIBATI",
		name: "Kiribati",
		code: {
			alpha2: "KI",
			alpha3: "KIR",
			numeric: "296",
		},
	},
	{
		key: "KOREA_THE_DEMOCRATIC_PEOPLES_REPUBLIC_OF",
		name: "Korea (the Democratic People's Republic of)",
		code: {
			alpha2: "KP",
			alpha3: "PRK",
			numeric: "408",
		},
	},
	{
		key: "KOREA_THE_REPUBLIC_OF",
		name: "Korea (the Republic of)",
		code: {
			alpha2: "KR",
			alpha3: "KOR",
			numeric: "410",
		},
	},
	{
		key: "KUWAIT",
		name: "Kuwait",
		code: {
			alpha2: "KW",
			alpha3: "KWT",
			numeric: "414",
		},
	},
	{
		key: "KYRGYZSTAN",
		name: "Kyrgyzstan",
		code: {
			alpha2: "KG",
			alpha3: "KGZ",
			numeric: "417",
		},
	},
	{
		key: "LAO_PEOPLES_DEMOCRATIC_REPUBLIC_THE",
		name: "Lao People's Democratic Republic (the)",
		code: {
			alpha2: "LA",
			alpha3: "LAO",
			numeric: "418",
		},
	},
	{
		key: "LATVIA",
		name: "Latvia",
		code: {
			alpha2: "LV",
			alpha3: "LVA",
			numeric: "428",
		},
	},
	{
		key: "LEBANON",
		name: "Lebanon",
		code: {
			alpha2: "LB",
			alpha3: "LBN",
			numeric: "422",
		},
	},
	{
		key: "LESOTHO",
		name: "Lesotho",
		code: {
			alpha2: "LS",
			alpha3: "LSO",
			numeric: "426",
		},
	},
	{
		key: "LIBERIA",
		name: "Liberia",
		code: {
			alpha2: "LR",
			alpha3: "LBR",
			numeric: "430",
		},
	},
	{
		key: "LIBYA",
		name: "Libya",
		code: {
			alpha2: "LY",
			alpha3: "LBY",
			numeric: "434",
		},
	},
	{
		key: "LIECHTENSTEIN",
		name: "Liechtenstein",
		code: {
			alpha2: "LI",
			alpha3: "LIE",
			numeric: "438",
		},
	},
	{
		key: "LITHUANIA",
		name: "Lithuania",
		code: {
			alpha2: "LT",
			alpha3: "LTU",
			numeric: "440",
		},
	},
	{
		key: "LUXEMBOURG",
		name: "Luxembourg",
		code: {
			alpha2: "LU",
			alpha3: "LUX",
			numeric: "442",
		},
	},
	{
		key: "MACAO",
		name: "Macao",
		code: {
			alpha2: "MO",
			alpha3: "MAC",
			numeric: "446",
		},
	},
	{
		key: "MADAGASCAR",
		name: "Madagascar",
		code: {
			alpha2: "MG",
			alpha3: "MDG",
			numeric: "450",
		},
	},
	{
		key: "MALAWI",
		name: "Malawi",
		code: {
			alpha2: "MW",
			alpha3: "MWI",
			numeric: "454",
		},
	},
	{
		key: "MALAYSIA",
		name: "Malaysia",
		code: {
			alpha2: "MY",
			alpha3: "MYS",
			numeric: "458",
		},
	},
	{
		key: "MALDIVES",
		name: "Maldives",
		code: {
			alpha2: "MV",
			alpha3: "MDV",
			numeric: "462",
		},
	},
	{
		key: "MALI",
		name: "Mali",
		code: {
			alpha2: "ML",
			alpha3: "MLI",
			numeric: "466",
		},
	},
	{
		key: "MALTA",
		name: "Malta",
		code: {
			alpha2: "MT",
			alpha3: "MLT",
			numeric: "470",
		},
	},
	{
		key: "MARSHALL_ISLANDS_THE",
		name: "Marshall Islands (the)",
		code: {
			alpha2: "MH",
			alpha3: "MHL",
			numeric: "584",
		},
	},
	{
		key: "MARTINIQUE",
		name: "Martinique",
		code: {
			alpha2: "MQ",
			alpha3: "MTQ",
			numeric: "474",
		},
	},
	{
		key: "MAURITANIA",
		name: "Mauritania",
		code: {
			alpha2: "MR",
			alpha3: "MRT",
			numeric: "478",
		},
	},
	{
		key: "MAURITIUS",
		name: "Mauritius",
		code: {
			alpha2: "MU",
			alpha3: "MUS",
			numeric: "480",
		},
	},
	{
		key: "MAYOTTE",
		name: "Mayotte",
		code: {
			alpha2: "YT",
			alpha3: "MYT",
			numeric: "175",
		},
	},
	{
		key: "MEXICO",
		name: "Mexico",
		code: {
			alpha2: "MX",
			alpha3: "MEX",
			numeric: "484",
		},
	},
	{
		key: "MICRONESIA_FEDERATED_STATES_OF",
		name: "Micronesia (Federated States of)",
		code: {
			alpha2: "FM",
			alpha3: "FSM",
			numeric: "583",
		},
	},
	{
		key: "MOLDOVA_THE_REPUBLIC_OF",
		name: "Moldova (the Republic of)",
		code: {
			alpha2: "MD",
			alpha3: "MDA",
			numeric: "498",
		},
	},
	{
		key: "MONACO",
		name: "Monaco",
		code: {
			alpha2: "MC",
			alpha3: "MCO",
			numeric: "492",
		},
	},
	{
		key: "MONGOLIA",
		name: "Mongolia",
		code: {
			alpha2: "MN",
			alpha3: "MNG",
			numeric: "496",
		},
	},
	{
		key: "MONTENEGRO",
		name: "Montenegro",
		code: {
			alpha2: "ME",
			alpha3: "MNE",
			numeric: "499",
		},
	},
	{
		key: "MONTSERRAT",
		name: "Montserrat",
		code: {
			alpha2: "MS",
			alpha3: "MSR",
			numeric: "500",
		},
	},
	{
		key: "MOROCCO",
		name: "Morocco",
		code: {
			alpha2: "MA",
			alpha3: "MAR",
			numeric: "504",
		},
	},
	{
		key: "MOZAMBIQUE",
		name: "Mozambique",
		code: {
			alpha2: "MZ",
			alpha3: "MOZ",
			numeric: "508",
		},
	},
	{
		key: "MYANMAR",
		name: "Myanmar",
		code: {
			alpha2: "MM",
			alpha3: "MMR",
			numeric: "104",
		},
	},
	{
		key: "NAMIBIA",
		name: "Namibia",
		code: {
			alpha2: "NA",
			alpha3: "NAM",
			numeric: "516",
		},
	},
	{
		key: "NAURU",
		name: "Nauru",
		code: {
			alpha2: "NR",
			alpha3: "NRU",
			numeric: "520",
		},
	},
	{
		key: "NEPAL",
		name: "Nepal",
		code: {
			alpha2: "NP",
			alpha3: "NPL",
			numeric: "524",
		},
	},
	{
		key: "NETHERLANDS_KINGDOM_OF_THE",
		name: "Netherlands (Kingdom of the)",
		code: {
			alpha2: "NL",
			alpha3: "NLD",
			numeric: "528",
		},
	},
	{
		key: "NEW_CALEDONIA",
		name: "New Caledonia",
		code: {
			alpha2: "NC",
			alpha3: "NCL",
			numeric: "540",
		},
	},
	{
		key: "NEW_ZEALAND",
		name: "New Zealand",
		code: {
			alpha2: "NZ",
			alpha3: "NZL",
			numeric: "554",
		},
	},
	{
		key: "NICARAGUA",
		name: "Nicaragua",
		code: {
			alpha2: "NI",
			alpha3: "NIC",
			numeric: "558",
		},
	},
	{
		key: "NIGER_THE",
		name: "Niger (the)",
		code: {
			alpha2: "NE",
			alpha3: "NER",
			numeric: "562",
		},
	},
	{
		key: "NIGERIA",
		name: "Nigeria",
		code: {
			alpha2: "NG",
			alpha3: "NGA",
			numeric: "566",
		},
	},
	{
		key: "NIUE",
		name: "Niue",
		code: {
			alpha2: "NU",
			alpha3: "NIU",
			numeric: "570",
		},
	},
	{
		key: "NORFOLK_ISLAND",
		name: "Norfolk Island",
		code: {
			alpha2: "NF",
			alpha3: "NFK",
			numeric: "574",
		},
	},
	{
		key: "NORTH_MACEDONIA",
		name: "North Macedonia",
		code: {
			alpha2: "MK",
			alpha3: "MKD",
			numeric: "807",
		},
	},
	{
		key: "NORTHERN_MARIANA_ISLANDS_THE",
		name: "Northern Mariana Islands (the)",
		code: {
			alpha2: "MP",
			alpha3: "MNP",
			numeric: "580",
		},
	},
	{
		key: "NORWAY",
		name: "Norway",
		code: {
			alpha2: "NO",
			alpha3: "NOR",
			numeric: "578",
		},
	},
	{
		key: "OMAN",
		name: "Oman",
		code: {
			alpha2: "OM",
			alpha3: "OMN",
			numeric: "512",
		},
	},
	{
		key: "PAKISTAN",
		name: "Pakistan",
		code: {
			alpha2: "PK",
			alpha3: "PAK",
			numeric: "586",
		},
	},
	{
		key: "PALAU",
		name: "Palau",
		code: {
			alpha2: "PW",
			alpha3: "PLW",
			numeric: "585",
		},
	},
	{
		key: "PALESTINE_STATE_OF",
		name: "Palestine, State of",
		code: {
			alpha2: "PS",
			alpha3: "PSE",
			numeric: "275",
		},
	},
	{
		key: "PANAMA",
		name: "Panama",
		code: {
			alpha2: "PA",
			alpha3: "PAN",
			numeric: "591",
		},
	},
	{
		key: "PAPUA_NEW_GUINEA",
		name: "Papua New Guinea",
		code: {
			alpha2: "PG",
			alpha3: "PNG",
			numeric: "598",
		},
	},
	{
		key: "PARAGUAY",
		name: "Paraguay",
		code: {
			alpha2: "PY",
			alpha3: "PRY",
			numeric: "600",
		},
	},
	{
		key: "PERU",
		name: "Peru",
		code: {
			alpha2: "PE",
			alpha3: "PER",
			numeric: "604",
		},
	},
	{
		key: "PHILIPPINES_THE",
		name: "Philippines (the)",
		code: {
			alpha2: "PH",
			alpha3: "PHL",
			numeric: "608",
		},
	},
	{
		key: "PITCAIRN",
		name: "Pitcairn",
		code: {
			alpha2: "PN",
			alpha3: "PCN",
			numeric: "612",
		},
	},
	{
		key: "POLAND",
		name: "Poland",
		code: {
			alpha2: "PL",
			alpha3: "POL",
			numeric: "616",
		},
	},
	{
		key: "PORTUGAL",
		name: "Portugal",
		code: {
			alpha2: "PT",
			alpha3: "PRT",
			numeric: "620",
		},
	},
	{
		key: "PUERTO_RICO",
		name: "Puerto Rico",
		code: {
			alpha2: "PR",
			alpha3: "PRI",
			numeric: "630",
		},
	},
	{
		key: "QATAR",
		name: "Qatar",
		code: {
			alpha2: "QA",
			alpha3: "QAT",
			numeric: "634",
		},
	},
	{
		key: "ROMANIA",
		name: "Romania",
		code: {
			alpha2: "RO",
			alpha3: "ROU",
			numeric: "642",
		},
	},
	{
		key: "RUSSIAN_FEDERATION_THE",
		name: "Russian Federation (the)",
		code: {
			alpha2: "RU",
			alpha3: "RUS",
			numeric: "643",
		},
	},
	{
		key: "RWANDA",
		name: "Rwanda",
		code: {
			alpha2: "RW",
			alpha3: "RWA",
			numeric: "646",
		},
	},
	{
		key: "REUNION",
		name: "Réunion",
		code: {
			alpha2: "RE",
			alpha3: "REU",
			numeric: "638",
		},
	},
	{
		key: "SAINT_BARTHELEMY",
		name: "Saint Barthélemy",
		code: {
			alpha2: "BL",
			alpha3: "BLM",
			numeric: "652",
		},
	},
	{
		key: "SAINT_HELENA_ASCENSION_AND_TRISTAN_DA_CUNHA",
		name: "Saint Helena, Ascension and Tristan da Cunha",
		code: {
			alpha2: "SH",
			alpha3: "SHN",
			numeric: "654",
		},
	},
	{
		key: "SAINT_KITTS_AND_NEVIS",
		name: "Saint Kitts and Nevis",
		code: {
			alpha2: "KN",
			alpha3: "KNA",
			numeric: "659",
		},
	},
	{
		key: "SAINT_LUCIA",
		name: "Saint Lucia",
		code: {
			alpha2: "LC",
			alpha3: "LCA",
			numeric: "662",
		},
	},
	{
		key: "SAINT_MARTIN_FRENCH_PART",
		name: "Saint Martin (French part)",
		code: {
			alpha2: "MF",
			alpha3: "MAF",
			numeric: "663",
		},
	},
	{
		key: "SAINT_PIERRE_AND_MIQUELON",
		name: "Saint Pierre and Miquelon",
		code: {
			alpha2: "PM",
			alpha3: "SPM",
			numeric: "666",
		},
	},
	{
		key: "SAINT_VINCENT_AND_THE_GRENADINES",
		name: "Saint Vincent and the Grenadines",
		code: {
			alpha2: "VC",
			alpha3: "VCT",
			numeric: "670",
		},
	},
	{
		key: "SAMOA",
		name: "Samoa",
		code: {
			alpha2: "WS",
			alpha3: "WSM",
			numeric: "882",
		},
	},
	{
		key: "SAN_MARINO",
		name: "San Marino",
		code: {
			alpha2: "SM",
			alpha3: "SMR",
			numeric: "674",
		},
	},
	{
		key: "SAO_TOME_AND_PRINCIPE",
		name: "Sao Tome and Principe",
		code: {
			alpha2: "ST",
			alpha3: "STP",
			numeric: "678",
		},
	},
	{
		key: "SAUDI_ARABIA",
		name: "Saudi Arabia",
		code: {
			alpha2: "SA",
			alpha3: "SAU",
			numeric: "682",
		},
	},
	{
		key: "SENEGAL",
		name: "Senegal",
		code: {
			alpha2: "SN",
			alpha3: "SEN",
			numeric: "686",
		},
	},
	{
		key: "SERBIA",
		name: "Serbia",
		code: {
			alpha2: "RS",
			alpha3: "SRB",
			numeric: "688",
		},
	},
	{
		key: "SEYCHELLES",
		name: "Seychelles",
		code: {
			alpha2: "SC",
			alpha3: "SYC",
			numeric: "690",
		},
	},
	{
		key: "SIERRA_LEONE",
		name: "Sierra Leone",
		code: {
			alpha2: "SL",
			alpha3: "SLE",
			numeric: "694",
		},
	},
	{
		key: "SINGAPORE",
		name: "Singapore",
		code: {
			alpha2: "SG",
			alpha3: "SGP",
			numeric: "702",
		},
	},
	{
		key: "SINT_MAARTEN_DUTCH_PART",
		name: "Sint Maarten (Dutch part)",
		code: {
			alpha2: "SX",
			alpha3: "SXM",
			numeric: "534",
		},
	},
	{
		key: "SLOVAKIA",
		name: "Slovakia",
		code: {
			alpha2: "SK",
			alpha3: "SVK",
			numeric: "703",
		},
	},
	{
		key: "SLOVENIA",
		name: "Slovenia",
		code: {
			alpha2: "SI",
			alpha3: "SVN",
			numeric: "705",
		},
	},
	{
		key: "SOLOMON_ISLANDS",
		name: "Solomon Islands",
		code: {
			alpha2: "SB",
			alpha3: "SLB",
			numeric: "090",
		},
	},
	{
		key: "SOMALIA",
		name: "Somalia",
		code: {
			alpha2: "SO",
			alpha3: "SOM",
			numeric: "706",
		},
	},
	{
		key: "SOUTH_AFRICA",
		name: "South Africa",
		code: {
			alpha2: "ZA",
			alpha3: "ZAF",
			numeric: "710",
		},
	},
	{
		key: "SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS",
		name: "South Georgia and the South Sandwich Islands",
		code: {
			alpha2: "GS",
			alpha3: "SGS",
			numeric: "239",
		},
	},
	{
		key: "SOUTH_SUDAN",
		name: "South Sudan",
		code: {
			alpha2: "SS",
			alpha3: "SSD",
			numeric: "728",
		},
	},
	{
		key: "SPAIN",
		name: "Spain",
		code: {
			alpha2: "ES",
			alpha3: "ESP",
			numeric: "724",
		},
	},
	{
		key: "SRI_LANKA",
		name: "Sri Lanka",
		code: {
			alpha2: "LK",
			alpha3: "LKA",
			numeric: "144",
		},
	},
	{
		key: "SUDAN_THE",
		name: "Sudan (the)",
		code: {
			alpha2: "SD",
			alpha3: "SDN",
			numeric: "729",
		},
	},
	{
		key: "SURINAME",
		name: "Suriname",
		code: {
			alpha2: "SR",
			alpha3: "SUR",
			numeric: "740",
		},
	},
	{
		key: "SVALBARD_AND_JAN_MAYEN",
		name: "Svalbard and Jan Mayen",
		code: {
			alpha2: "SJ",
			alpha3: "SJM",
			numeric: "744",
		},
	},
	{
		key: "SWEDEN",
		name: "Sweden",
		code: {
			alpha2: "SE",
			alpha3: "SWE",
			numeric: "752",
		},
	},
	{
		key: "SWITZERLAND",
		name: "Switzerland",
		code: {
			alpha2: "CH",
			alpha3: "CHE",
			numeric: "756",
		},
	},
	{
		key: "SYRIAN_ARAB_REPUBLIC_THE",
		name: "Syrian Arab Republic (the)",
		code: {
			alpha2: "SY",
			alpha3: "SYR",
			numeric: "760",
		},
	},
	{
		key: "TAIWAN_PROVINCE_OF_CHINA",
		name: "Taiwan (Province of China)",
		code: {
			alpha2: "TW",
			alpha3: "TWN",
			numeric: "158",
		},
	},
	{
		key: "TAJIKISTAN",
		name: "Tajikistan",
		code: {
			alpha2: "TJ",
			alpha3: "TJK",
			numeric: "762",
		},
	},
	{
		key: "TANZANIA_THE_UNITED_REPUBLIC_OF",
		name: "Tanzania, the United Republic of",
		code: {
			alpha2: "TZ",
			alpha3: "TZA",
			numeric: "834",
		},
	},
	{
		key: "THAILAND",
		name: "Thailand",
		code: {
			alpha2: "TH",
			alpha3: "THA",
			numeric: "764",
		},
	},
	{
		key: "TIMOR_LESTE",
		name: "Timor-Leste",
		code: {
			alpha2: "TL",
			alpha3: "TLS",
			numeric: "626",
		},
	},
	{
		key: "TOGO",
		name: "Togo",
		code: {
			alpha2: "TG",
			alpha3: "TGO",
			numeric: "768",
		},
	},
	{
		key: "TOKELAU",
		name: "Tokelau",
		code: {
			alpha2: "TK",
			alpha3: "TKL",
			numeric: "772",
		},
	},
	{
		key: "TONGA",
		name: "Tonga",
		code: {
			alpha2: "TO",
			alpha3: "TON",
			numeric: "776",
		},
	},
	{
		key: "TRINIDAD_AND_TOBAGO",
		name: "Trinidad and Tobago",
		code: {
			alpha2: "TT",
			alpha3: "TTO",
			numeric: "780",
		},
	},
	{
		key: "TUNISIA",
		name: "Tunisia",
		code: {
			alpha2: "TN",
			alpha3: "TUN",
			numeric: "788",
		},
	},
	{
		key: "TURKMENISTAN",
		name: "Turkmenistan",
		code: {
			alpha2: "TM",
			alpha3: "TKM",
			numeric: "795",
		},
	},
	{
		key: "TURKS_AND_CAICOS_ISLANDS_THE",
		name: "Turks and Caicos Islands (the)",
		code: {
			alpha2: "TC",
			alpha3: "TCA",
			numeric: "796",
		},
	},
	{
		key: "TUVALU",
		name: "Tuvalu",
		code: {
			alpha2: "TV",
			alpha3: "TUV",
			numeric: "798",
		},
	},
	{
		key: "TURKIYE",
		name: "Türkiye",
		code: {
			alpha2: "TR",
			alpha3: "TUR",
			numeric: "792",
		},
	},
	{
		key: "UGANDA",
		name: "Uganda",
		code: {
			alpha2: "UG",
			alpha3: "UGA",
			numeric: "800",
		},
	},
	{
		key: "UKRAINE",
		name: "Ukraine",
		code: {
			alpha2: "UA",
			alpha3: "UKR",
			numeric: "804",
		},
	},
	{
		key: "UNITED_ARAB_EMIRATES_THE",
		name: "United Arab Emirates (the)",
		code: {
			alpha2: "AE",
			alpha3: "ATR",
			numeric: "784",
		},
	},
	{
		key: "UNITED_KINGDOM_OF_GREAT_BRITAIN_AND_NORTHERN_IRELAND_THE",
		name: "United Kingdom of Great Britain and Northern Ireland (the)",
		code: {
			alpha2: "GB",
			alpha3: "GBR",
			numeric: "826",
		},
	},
	{
		key: "UNITED_STATES_MINOR_OUTLYING_ISLANDS_THE",
		name: "United States Minor Outlying Islands (the)",
		code: {
			alpha2: "UM",
			alpha3: "UMI",
			numeric: "581",
		},
	},
	{
		key: "UNITED_STATES_OF_AMERICA_THE",
		name: "United States of America (the)",
		code: {
			alpha2: "US",
			alpha3: "USA",
			numeric: "840",
		},
	},
	{
		key: "URUGUAY",
		name: "Uruguay",
		code: {
			alpha2: "UY",
			alpha3: "URY",
			numeric: "858",
		},
	},
	{
		key: "UZBEKISTAN",
		name: "Uzbekistan",
		code: {
			alpha2: "UZ",
			alpha3: "UZB",
			numeric: "860",
		},
	},
	{
		key: "VANUATU",
		name: "Vanuatu",
		code: {
			alpha2: "VU",
			alpha3: "VUT",
			numeric: "548",
		},
	},
	{
		key: "VENEZUELA_BOLIVARIAN_REPUBLIC_OF",
		name: "Venezuela (Bolivarian Republic of)",
		code: {
			alpha2: "VE",
			alpha3: "VEN",
			numeric: "862",
		},
	},
	{
		key: "VIET_NAM",
		name: "Viet Nam",
		code: {
			alpha2: "VN",
			alpha3: "VNM",
			numeric: "704",
		},
	},
	{
		key: "VIRGIN_ISLANDS_BRITISH",
		name: "Virgin Islands (British)",
		code: {
			alpha2: "VG",
			alpha3: "VGB",
			numeric: "092",
		},
	},
	{
		key: "VIRGIN_ISLANDS_US",
		name: "Virgin Islands (U.S.)",
		code: {
			alpha2: "VI",
			alpha3: "VIR",
			numeric: "850",
		},
	},
	{
		key: "WALLIS_AND_FUTUNA",
		name: "Wallis and Futuna",
		code: {
			alpha2: "WF",
			alpha3: "WLF",
			numeric: "876",
		},
	},
	{
		key: "WESTERN_SAHARA",
		name: "Western Sahara*",
		code: {
			alpha2: "EH",
			alpha3: "ESH",
			numeric: "732",
		},
	},
	{
		key: "YEMEN",
		name: "Yemen",
		code: {
			alpha2: "YE",
			alpha3: "YEM",
			numeric: "887",
		},
	},
	{
		key: "ZAMBIA",
		name: "Zambia",
		code: {
			alpha2: "ZM",
			alpha3: "ZMB",
			numeric: "894",
		},
	},
	{
		key: "ZIMBABWE",
		name: "Zimbabwe",
		code: {
			alpha2: "ZW",
			alpha3: "ZWE",
			numeric: "716",
		},
	},
] as const satisfies Iso3166Definition[];

export const Iso3166 = createEnum(ISO_3166, {
	keyProp: "key",
	valueProp: "code.alpha2",
});
