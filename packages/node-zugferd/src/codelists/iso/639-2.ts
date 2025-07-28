/**
 * @see https://www.loc.gov/standards/iso639-2/php/code_list.php
 */

import { createEnum } from "..";

export type Iso639_2Definition = {
	key: string;
	code: string;
	name: string;
};

export type Iso639_2Code = (typeof ISO_639_2)[number]["code"];

export const ISO_639_2_IDENTIFIER = "iso.639-2";

export const ISO_639_2 = [
	{
		key: "AFAR",
		name: "Afar",
		code: "aar",
	},
	{
		key: "ABKHAZIAN",
		name: "Abkhazian",
		code: "abk",
	},
	{
		key: "ACHINESE",
		name: "Achinese",
		code: "ace",
	},
	{
		key: "ACOLI",
		name: "Acoli",
		code: "ach",
	},
	{
		key: "ADANGME",
		name: "Adangme",
		code: "ada",
	},
	{
		key: "ADYGHE_ADYGEI",
		name: "Adyghe; Adygei",
		code: "ady",
	},
	{
		key: "AFRO_ASIATIC_LANGUAGES",
		name: "Afro-Asiatic languages",
		code: "afa",
	},
	{
		key: "AFRIHILI",
		name: "Afrihili",
		code: "afh",
	},
	{
		key: "AFRIKAANS",
		name: "Afrikaans",
		code: "afr",
	},
	{
		key: "AINU",
		name: "Ainu",
		code: "ain",
	},
	{
		key: "AKAN",
		name: "Akan",
		code: "aka",
	},
	{
		key: "AKKADIAN",
		name: "Akkadian",
		code: "akk",
	},
	{
		key: "ALBANIAN",
		name: "Albanian",
		code: "alb",
	},
	{
		key: "ALEUT",
		name: "Aleut",
		code: "ale",
	},
	{
		key: "ALGONQUIAN_LANGUAGES",
		name: "Algonquian languages",
		code: "alg",
	},
	{
		key: "SOUTHERN_ALTAI",
		name: "Southern Altai",
		code: "alt",
	},
	{
		key: "AMHARIC",
		name: "Amharic",
		code: "amh",
	},
	{
		key: "ENGLISH_OLD_CA450_1100",
		name: "English, Old (ca.450-1100)",
		code: "ang",
	},
	{
		key: "ANGIKA",
		name: "Angika",
		code: "anp",
	},
	{
		key: "APACHE_LANGUAGES",
		name: "Apache languages",
		code: "apa",
	},
	{
		key: "ARABIC",
		name: "Arabic",
		code: "ara",
	},
	{
		key: "OFFICIAL_ARAMAIC_700_300_BCE_IMPERIAL_ARAMAIC_700_300_BCE",
		name: "Official Aramaic (700-300 BCE); Imperial Aramaic (700-300 BCE)",
		code: "arc",
	},
	{
		key: "ARAGONESE",
		name: "Aragonese",
		code: "arg",
	},
	{
		key: "ARMENIAN",
		name: "Armenian",
		code: "arm",
	},
	{
		key: "MAPUDUNGUN_MAPUCHE",
		name: "Mapudungun; Mapuche",
		code: "arn",
	},
	{
		key: "ARAPAHO",
		name: "Arapaho",
		code: "arp",
	},
	{
		key: "ARTIFICIAL_LANGUAGES",
		name: "Artificial languages",
		code: "art",
	},
	{
		key: "ARAWAK",
		name: "Arawak",
		code: "arw",
	},
	{
		key: "ASSAMESE",
		name: "Assamese",
		code: "asm",
	},
	{
		key: "ASTURIAN_BABLE_LEONESE_ASTURLEONESE",
		name: "Asturian; Bable; Leonese; Asturleonese",
		code: "ast",
	},
	{
		key: "ATHAPASCAN_LANGUAGES",
		name: "Athapascan languages",
		code: "ath",
	},
	{
		key: "AUSTRALIAN_LANGUAGES",
		name: "Australian languages",
		code: "aus",
	},
	{
		key: "AVARIC",
		name: "Avaric",
		code: "ava",
	},
	{
		key: "AVESTAN",
		name: "Avestan",
		code: "ave",
	},
	{
		key: "AWADHI",
		name: "Awadhi",
		code: "awa",
	},
	{
		key: "AYMARA",
		name: "Aymara",
		code: "aym",
	},
	{
		key: "AZERBAIJANI",
		name: "Azerbaijani",
		code: "aze",
	},
	{
		key: "BANDA_LANGUAGES",
		name: "Banda languages",
		code: "bad",
	},
	{
		key: "BAMILEKE_LANGUAGES",
		name: "Bamileke languages",
		code: "bai",
	},
	{
		key: "BASHKIR",
		name: "Bashkir",
		code: "bak",
	},
	{
		key: "BALUCHI",
		name: "Baluchi",
		code: "bal",
	},
	{
		key: "BAMBARA",
		name: "Bambara",
		code: "bam",
	},
	{
		key: "BALINESE",
		name: "Balinese",
		code: "ban",
	},
	{
		key: "BASQUE",
		name: "Basque",
		code: "baq",
	},
	{
		key: "BASA",
		name: "Basa",
		code: "bas",
	},
	{
		key: "BALTIC_LANGUAGES",
		name: "Baltic languages",
		code: "bat",
	},
	{
		key: "BEJA_BEDAWIYET",
		name: "Beja; Bedawiyet",
		code: "bej",
	},
	{
		key: "BELARUSIAN",
		name: "Belarusian",
		code: "bel",
	},
	{
		key: "BEMBA",
		name: "Bemba",
		code: "bem",
	},
	{
		key: "BENGALI",
		name: "Bengali",
		code: "ben",
	},
	{
		key: "BERBER_LANGUAGES",
		name: "Berber languages",
		code: "ber",
	},
	{
		key: "BHOJPURI",
		name: "Bhojpuri",
		code: "bho",
	},
	{
		key: "BIHARI_LANGUAGES",
		name: "Bihari languages",
		code: "bih",
	},
	{
		key: "BIKOL",
		name: "Bikol",
		code: "bik",
	},
	{
		key: "BINI_EDO",
		name: "Bini; Edo",
		code: "bin",
	},
	{
		key: "BISLAMA",
		name: "Bislama",
		code: "bis",
	},
	{
		key: "SIKSIKA",
		name: "Siksika",
		code: "bla",
	},
	{
		key: "BANTU_LANGUAGES",
		name: "Bantu languages",
		code: "bnt",
	},
	{
		key: "BOSNIAN",
		name: "Bosnian",
		code: "bos",
	},
	{
		key: "BRAJ",
		name: "Braj",
		code: "bra",
	},
	{
		key: "BRETON",
		name: "Breton",
		code: "bre",
	},
	{
		key: "BATAK_LANGUAGES",
		name: "Batak languages",
		code: "btk",
	},
	{
		key: "BURIAT",
		name: "Buriat",
		code: "bua",
	},
	{
		key: "BUGINESE",
		name: "Buginese",
		code: "bug",
	},
	{
		key: "BULGARIAN",
		name: "Bulgarian",
		code: "bul",
	},
	{
		key: "BURMESE",
		name: "Burmese",
		code: "bur",
	},
	{
		key: "BLIN_BILIN",
		name: "Blin; Bilin",
		code: "byn",
	},
	{
		key: "CADDO",
		name: "Caddo",
		code: "cad",
	},
	{
		key: "CENTRAL_AMERICAN_INDIAN_LANGUAGES",
		name: "Central American Indian languages",
		code: "cai",
	},
	{
		key: "GALIBI_CARIB",
		name: "Galibi Carib",
		code: "car",
	},
	{
		key: "CATALAN_VALENCIAN",
		name: "Catalan; Valencian",
		code: "cat",
	},
	{
		key: "CAUCASIAN_LANGUAGES",
		name: "Caucasian languages",
		code: "cau",
	},
	{
		key: "CEBUANO",
		name: "Cebuano",
		code: "ceb",
	},
	{
		key: "CELTIC_LANGUAGES",
		name: "Celtic languages",
		code: "cel",
	},
	{
		key: "CZECH",
		name: "Czech",
		code: "cze",
	},
	{
		key: "CHAMORRO",
		name: "Chamorro",
		code: "cha",
	},
	{
		key: "CHIBCHA",
		name: "Chibcha",
		code: "chb",
	},
	{
		key: "CHECHEN",
		name: "Chechen",
		code: "che",
	},
	{
		key: "CHAGATAI",
		name: "Chagatai",
		code: "chg",
	},
	{
		key: "CHINESE",
		name: "Chinese",
		code: "chi",
	},
	{
		key: "CHUUKESE",
		name: "Chuukese",
		code: "chk",
	},
	{
		key: "MARI",
		name: "Mari",
		code: "chm",
	},
	{
		key: "CHINOOK_JARGON",
		name: "Chinook jargon",
		code: "chn",
	},
	{
		key: "CHOCTAW",
		name: "Choctaw",
		code: "cho",
	},
	{
		key: "CHIPEWYAN_DENE_SULINE",
		name: "Chipewyan; Dene Suline",
		code: "chp",
	},
	{
		key: "CHEROKEE",
		name: "Cherokee",
		code: "chr",
	},
	{
		key: "CHURCH_SLAVIC_OLD_SLAVONIC_CHURCH_SLAVONIC_OLD_BULGARIAN_OLD_CHURCH_SLAVONIC",
		name: "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic",
		code: "chu",
	},
	{
		key: "CHUVASH",
		name: "Chuvash",
		code: "chv",
	},
	{
		key: "CHEYENNE",
		name: "Cheyenne",
		code: "chy",
	},
	{
		key: "CHAMIC_LANGUAGES",
		name: "Chamic languages",
		code: "cmc",
	},
	{
		key: "MONTENEGRIN",
		name: "Montenegrin",
		code: "cnr",
	},
	{
		key: "COPTIC",
		name: "Coptic",
		code: "cop",
	},
	{
		key: "CORNISH",
		name: "Cornish",
		code: "cor",
	},
	{
		key: "CORSICAN",
		name: "Corsican",
		code: "cos",
	},
	{
		key: "CREOLES_AND_PIDGINS_ENGLISH_BASED",
		name: "Creoles and pidgins, English based",
		code: "cpe",
	},
	{
		key: "CREOLES_AND_PIDGINS_FRENCH_BASED",
		name: "Creoles and pidgins, French-based",
		code: "cpf",
	},
	{
		key: "CREOLES_AND_PIDGINS_PORTUGUESE_BASED",
		name: "Creoles and pidgins, Portuguese-based",
		code: "cpp",
	},
	{
		key: "CREE",
		name: "Cree",
		code: "cre",
	},
	{
		key: "CRIMEAN_TATAR_CRIMEAN_TURKISH",
		name: "Crimean Tatar; Crimean Turkish",
		code: "crh",
	},
	{
		key: "CREOLES_AND_PIDGINS",
		name: "Creoles and pidgins",
		code: "crp",
	},
	{
		key: "KASHUBIAN",
		name: "Kashubian",
		code: "csb",
	},
	{
		key: "CUSHITIC_LANGUAGES",
		name: "Cushitic languages",
		code: "cus",
	},
	{
		key: "DAKOTA",
		name: "Dakota",
		code: "dak",
	},
	{
		key: "DANISH",
		name: "Danish",
		code: "dan",
	},
	{
		key: "DARGWA",
		name: "Dargwa",
		code: "dar",
	},
	{
		key: "LAND_DAYAK_LANGUAGES",
		name: "Land Dayak languages",
		code: "day",
	},
	{
		key: "DELAWARE",
		name: "Delaware",
		code: "del",
	},
	{
		key: "SLAVE_ATHAPASCAN",
		name: "Slave (Athapascan)",
		code: "den",
	},
	{
		key: "TLICHO_DOGRIB",
		name: "Tlicho; Dogrib",
		code: "dgr",
	},
	{
		key: "DINKA",
		name: "Dinka",
		code: "din",
	},
	{
		key: "DIVEHI_DHIVEHI_MALDIVIAN",
		name: "Divehi; Dhivehi; Maldivian",
		code: "div",
	},
	{
		key: "DOGRI_MACROLANGUAGE",
		name: "Dogri (macrolanguage)",
		code: "doi",
	},
	{
		key: "DRAVIDIAN_LANGUAGES",
		name: "Dravidian languages",
		code: "dra",
	},
	{
		key: "LOWER_SORBIAN",
		name: "Lower Sorbian",
		code: "dsb",
	},
	{
		key: "DUALA",
		name: "Duala",
		code: "dua",
	},
	{
		key: "DUTCH_MIDDLE_CA1050_1350",
		name: "Dutch, Middle (ca.1050-1350)",
		code: "dum",
	},
	{
		key: "DUTCH_FLEMISH",
		name: "Dutch; Flemish",
		code: "dut",
	},
	{
		key: "DYULA",
		name: "Dyula",
		code: "dyu",
	},
	{
		key: "DZONGKHA",
		name: "Dzongkha",
		code: "dzo",
	},
	{
		key: "EFIK",
		name: "Efik",
		code: "efi",
	},
	{
		key: "EGYPTIAN_ANCIENT",
		name: "Egyptian (Ancient)",
		code: "egy",
	},
	{
		key: "EKAJUK",
		name: "Ekajuk",
		code: "eka",
	},
	{
		key: "ELAMITE",
		name: "Elamite",
		code: "elx",
	},
	{
		key: "ENGLISH",
		name: "English",
		code: "eng",
	},
	{
		key: "ENGLISH_MIDDLE_1100_1500",
		name: "English, Middle (1100-1500)",
		code: "enm",
	},
	{
		key: "ESPERANTO",
		name: "Esperanto",
		code: "epo",
	},
	{
		key: "ESTONIAN",
		name: "Estonian",
		code: "est",
	},
	{
		key: "EWE",
		name: "Ewe",
		code: "ewe",
	},
	{
		key: "EWONDO",
		name: "Ewondo",
		code: "ewo",
	},
	{
		key: "FANG",
		name: "Fang",
		code: "fan",
	},
	{
		key: "FAROESE",
		name: "Faroese",
		code: "fao",
	},
	{
		key: "FANTI",
		name: "Fanti",
		code: "fat",
	},
	{
		key: "FIJIAN",
		name: "Fijian",
		code: "fij",
	},
	{
		key: "FILIPINO_PILIPINO",
		name: "Filipino; Pilipino",
		code: "fil",
	},
	{
		key: "FINNISH",
		name: "Finnish",
		code: "fin",
	},
	{
		key: "FINNO_UGRIAN_LANGUAGES",
		name: "Finno-Ugrian languages",
		code: "fiu",
	},
	{
		key: "FON",
		name: "Fon",
		code: "fon",
	},
	{
		key: "FRENCH",
		name: "French",
		code: "fre",
	},
	{
		key: "FRENCH_MIDDLE_CA1400_1600",
		name: "French, Middle (ca.1400-1600)",
		code: "frm",
	},
	{
		key: "FRENCH_OLD_842_CA1400",
		name: "French, Old (842-ca.1400)",
		code: "fro",
	},
	{
		key: "NORTHERN_FRISIAN",
		name: "Northern Frisian",
		code: "frr",
	},
	{
		key: "EASTERN_FRISIAN",
		name: "Eastern Frisian",
		code: "frs",
	},
	{
		key: "WESTERN_FRISIAN",
		name: "Western Frisian",
		code: "fry",
	},
	{
		key: "FULAH",
		name: "Fulah",
		code: "ful",
	},
	{
		key: "FRIULIAN",
		name: "Friulian",
		code: "fur",
	},
	{
		key: "GA",
		name: "Ga",
		code: "gaa",
	},
	{
		key: "GAYO",
		name: "Gayo",
		code: "gay",
	},
	{
		key: "GBAYA",
		name: "Gbaya",
		code: "gba",
	},
	{
		key: "GERMANIC_LANGUAGES",
		name: "Germanic languages",
		code: "gem",
	},
	{
		key: "GEORGIAN",
		name: "Georgian",
		code: "geo",
	},
	{
		key: "GERMAN",
		name: "German",
		code: "ger",
	},
	{
		key: "GEEZ",
		name: "Geez",
		code: "gez",
	},
	{
		key: "GILBERTESE",
		name: "Gilbertese",
		code: "gil",
	},
	{
		key: "GAELIC_SCOTTISH_GAELIC",
		name: "Gaelic; Scottish Gaelic",
		code: "gla",
	},
	{
		key: "IRISH",
		name: "Irish",
		code: "gle",
	},
	{
		key: "GALICIAN",
		name: "Galician",
		code: "glg",
	},
	{
		key: "MANX",
		name: "Manx",
		code: "glv",
	},
	{
		key: "GERMAN_MIDDLE_HIGH_CA1050_1500",
		name: "German, Middle High (ca.1050-1500)",
		code: "gmh",
	},
	{
		key: "GERMAN_OLD_HIGH_CA750_1050",
		name: "German, Old High (ca.750-1050)",
		code: "goh",
	},
	{
		key: "GONDI",
		name: "Gondi",
		code: "gon",
	},
	{
		key: "GORONTALO",
		name: "Gorontalo",
		code: "gor",
	},
	{
		key: "GOTHIC",
		name: "Gothic",
		code: "got",
	},
	{
		key: "GREBO",
		name: "Grebo",
		code: "grb",
	},
	{
		key: "GREEK_ANCIENT_TO_1453",
		name: "Greek, Ancient (to 1453)",
		code: "grc",
	},
	{
		key: "GREEK_MODERN_1453_",
		name: "Greek, Modern (1453-)",
		code: "gre",
	},
	{
		key: "GUARANI",
		name: "Guarani",
		code: "grn",
	},
	{
		key: "SWISS_GERMAN_ALEMANNIC_ALSATIAN",
		name: "Swiss German; Alemannic; Alsatian",
		code: "gsw",
	},
	{
		key: "GUJARATI",
		name: "Gujarati",
		code: "guj",
	},
	{
		key: "GWICHIN",
		name: "Gwich'in",
		code: "gwi",
	},
	{
		key: "HAIDA",
		name: "Haida",
		code: "hai",
	},
	{
		key: "HAITIAN_HAITIAN_CREOLE",
		name: "Haitian; Haitian Creole",
		code: "hat",
	},
	{
		key: "HAUSA",
		name: "Hausa",
		code: "hau",
	},
	{
		key: "HAWAIIAN",
		name: "Hawaiian",
		code: "haw",
	},
	{
		key: "HEBREW",
		name: "Hebrew",
		code: "heb",
	},
	{
		key: "HERERO",
		name: "Herero",
		code: "her",
	},
	{
		key: "HILIGAYNON",
		name: "Hiligaynon",
		code: "hil",
	},
	{
		key: "HIMACHALI_LANGUAGES_WESTERN_PAHARI_LANGUAGES",
		name: "Himachali languages; Western Pahari languages",
		code: "him",
	},
	{
		key: "HINDI",
		name: "Hindi",
		code: "hin",
	},
	{
		key: "HITTITE",
		name: "Hittite",
		code: "hit",
	},
	{
		key: "HMONG_MONG",
		name: "Hmong; Mong",
		code: "hmn",
	},
	{
		key: "HIRI_MOTU",
		name: "Hiri Motu",
		code: "hmo",
	},
	{
		key: "CROATIAN",
		name: "Croatian",
		code: "hrv",
	},
	{
		key: "UPPER_SORBIAN",
		name: "Upper Sorbian",
		code: "hsb",
	},
	{
		key: "HUNGARIAN",
		name: "Hungarian",
		code: "hun",
	},
	{
		key: "HUPA",
		name: "Hupa",
		code: "hup",
	},
	{
		key: "IBAN",
		name: "Iban",
		code: "iba",
	},
	{
		key: "IGBO",
		name: "Igbo",
		code: "ibo",
	},
	{
		key: "ICELANDIC",
		name: "Icelandic",
		code: "ice",
	},
	{
		key: "IDO",
		name: "Ido",
		code: "ido",
	},
	{
		key: "SICHUAN_YI_NUOSU",
		name: "Sichuan Yi; Nuosu",
		code: "iii",
	},
	{
		key: "IJO_LANGUAGES",
		name: "Ijo languages",
		code: "ijo",
	},
	{
		key: "INUKTITUT",
		name: "Inuktitut",
		code: "iku",
	},
	{
		key: "INTERLINGUE_OCCIDENTAL",
		name: "Interlingue; Occidental",
		code: "ile",
	},
	{
		key: "ILOKO",
		name: "Iloko",
		code: "ilo",
	},
	{
		key: "INTERLINGUA_INTERNATIONAL_AUXILIARY_LANGUAGE_ASSOCIATION",
		name: "Interlingua (International Auxiliary Language Association)",
		code: "ina",
	},
	{
		key: "INDIC_LANGUAGES",
		name: "Indic languages",
		code: "inc",
	},
	{
		key: "INDONESIAN",
		name: "Indonesian",
		code: "ind",
	},
	{
		key: "INDO_EUROPEAN_LANGUAGES",
		name: "Indo-European languages",
		code: "ine",
	},
	{
		key: "INGUSH",
		name: "Ingush",
		code: "inh",
	},
	{
		key: "INUPIAQ",
		name: "Inupiaq",
		code: "ipk",
	},
	{
		key: "IRANIAN_LANGUAGES",
		name: "Iranian languages",
		code: "ira",
	},
	{
		key: "IROQUOIAN_LANGUAGES",
		name: "Iroquoian languages",
		code: "iro",
	},
	{
		key: "ITALIAN",
		name: "Italian",
		code: "ita",
	},
	{
		key: "JAVANESE",
		name: "Javanese",
		code: "jav",
	},
	{
		key: "LOJBAN",
		name: "Lojban",
		code: "jbo",
	},
	{
		key: "JAPANESE",
		name: "Japanese",
		code: "jpn",
	},
	{
		key: "JUDEO_PERSIAN",
		name: "Judeo-Persian",
		code: "jpr",
	},
	{
		key: "JUDEO_ARABIC",
		name: "Judeo-Arabic",
		code: "jrb",
	},
	{
		key: "KARA_KALPAK",
		name: "Kara-Kalpak",
		code: "kaa",
	},
	{
		key: "KABYLE",
		name: "Kabyle",
		code: "kab",
	},
	{
		key: "KACHIN_JINGPHO",
		name: "Kachin; Jingpho",
		code: "kac",
	},
	{
		key: "KALAALLISUT_GREENLANDIC",
		name: "Kalaallisut; Greenlandic",
		code: "kal",
	},
	{
		key: "KAMBA",
		name: "Kamba",
		code: "kam",
	},
	{
		key: "KANNADA",
		name: "Kannada",
		code: "kan",
	},
	{
		key: "KAREN_LANGUAGES",
		name: "Karen languages",
		code: "kar",
	},
	{
		key: "KASHMIRI",
		name: "Kashmiri",
		code: "kas",
	},
	{
		key: "KANURI",
		name: "Kanuri",
		code: "kau",
	},
	{
		key: "KAWI",
		name: "Kawi",
		code: "kaw",
	},
	{
		key: "KAZAKH",
		name: "Kazakh",
		code: "kaz",
	},
	{
		key: "KABARDIAN",
		name: "Kabardian",
		code: "kbd",
	},
	{
		key: "KHASI",
		name: "Khasi",
		code: "kha",
	},
	{
		key: "KHOISAN_LANGUAGES",
		name: "Khoisan languages",
		code: "khi",
	},
	{
		key: "CENTRAL_KHMER",
		name: "Central Khmer",
		code: "khm",
	},
	{
		key: "KHOTANESE_SAKAN",
		name: "Khotanese; Sakan",
		code: "kho",
	},
	{
		key: "KIKUYU_GIKUYU",
		name: "Kikuyu; Gikuyu",
		code: "kik",
	},
	{
		key: "KINYARWANDA",
		name: "Kinyarwanda",
		code: "kin",
	},
	{
		key: "KIRGHIZ_KYRGYZ",
		name: "Kirghiz; Kyrgyz",
		code: "kir",
	},
	{
		key: "KIMBUNDU",
		name: "Kimbundu",
		code: "kmb",
	},
	{
		key: "KONKANI_MACROLANGUAGE",
		name: "Konkani (macrolanguage)",
		code: "kok",
	},
	{
		key: "KOMI",
		name: "Komi",
		code: "kom",
	},
	{
		key: "KONGO",
		name: "Kongo",
		code: "kon",
	},
	{
		key: "KOREAN",
		name: "Korean",
		code: "kor",
	},
	{
		key: "KOSRAEAN",
		name: "Kosraean",
		code: "kos",
	},
	{
		key: "KPELLE",
		name: "Kpelle",
		code: "kpe",
	},
	{
		key: "KARACHAY_BALKAR",
		name: "Karachay-Balkar",
		code: "krc",
	},
	{
		key: "KARELIAN",
		name: "Karelian",
		code: "krl",
	},
	{
		key: "KRU_LANGUAGES",
		name: "Kru languages",
		code: "kro",
	},
	{
		key: "KURUKH",
		name: "Kurukh",
		code: "kru",
	},
	{
		key: "KUANYAMA_KWANYAMA",
		name: "Kuanyama; Kwanyama",
		code: "kua",
	},
	{
		key: "KUMYK",
		name: "Kumyk",
		code: "kum",
	},
	{
		key: "KURDISH",
		name: "Kurdish",
		code: "kur",
	},
	{
		key: "KUTENAI",
		name: "Kutenai",
		code: "kut",
	},
	{
		key: "LADINO",
		name: "Ladino",
		code: "lad",
	},
	{
		key: "LAHNDA",
		name: "Lahnda",
		code: "lah",
	},
	{
		key: "LAMBA",
		name: "Lamba",
		code: "lam",
	},
	{
		key: "LAO",
		name: "Lao",
		code: "lao",
	},
	{
		key: "LATIN",
		name: "Latin",
		code: "lat",
	},
	{
		key: "LATVIAN",
		name: "Latvian",
		code: "lav",
	},
	{
		key: "LEZGHIAN",
		name: "Lezghian",
		code: "lez",
	},
	{
		key: "LIMBURGAN_LIMBURGER_LIMBURGISH",
		name: "Limburgan; Limburger; Limburgish",
		code: "lim",
	},
	{
		key: "LINGALA",
		name: "Lingala",
		code: "lin",
	},
	{
		key: "LITHUANIAN",
		name: "Lithuanian",
		code: "lit",
	},
	{
		key: "MONGO",
		name: "Mongo",
		code: "lol",
	},
	{
		key: "LOZI",
		name: "Lozi",
		code: "loz",
	},
	{
		key: "LUXEMBOURGISH_LETZEBURGESCH",
		name: "Luxembourgish; Letzeburgesch",
		code: "ltz",
	},
	{
		key: "LUBA_LULUA",
		name: "Luba-Lulua",
		code: "lua",
	},
	{
		key: "LUBA_KATANGA",
		name: "Luba-Katanga",
		code: "lub",
	},
	{
		key: "GANDA",
		name: "Ganda",
		code: "lug",
	},
	{
		key: "LUISENO",
		name: "Luiseno",
		code: "lui",
	},
	{
		key: "LUNDA",
		name: "Lunda",
		code: "lun",
	},
	{
		key: "LUO_KENYA_AND_TANZANIA",
		name: "Luo (Kenya and Tanzania)",
		code: "luo",
	},
	{
		key: "LUSHAI",
		name: "Lushai",
		code: "lus",
	},
	{
		key: "MACEDONIAN",
		name: "Macedonian",
		code: "mac",
	},
	{
		key: "MADURESE",
		name: "Madurese",
		code: "mad",
	},
	{
		key: "MAGAHI",
		name: "Magahi",
		code: "mag",
	},
	{
		key: "MARSHALLESE",
		name: "Marshallese",
		code: "mah",
	},
	{
		key: "MAITHILI",
		name: "Maithili",
		code: "mai",
	},
	{
		key: "MAKASAR",
		name: "Makasar",
		code: "mak",
	},
	{
		key: "MALAYALAM",
		name: "Malayalam",
		code: "mal",
	},
	{
		key: "MANDINGO",
		name: "Mandingo",
		code: "man",
	},
	{
		key: "MAORI",
		name: "Maori",
		code: "mao",
	},
	{
		key: "AUSTRONESIAN_LANGUAGES",
		name: "Austronesian languages",
		code: "map",
	},
	{
		key: "MARATHI",
		name: "Marathi",
		code: "mar",
	},
	{
		key: "MASAI",
		name: "Masai",
		code: "mas",
	},
	{
		key: "MALAY_MACROLANGUAGE",
		name: "Malay (macrolanguage)",
		code: "may",
	},
	{
		key: "MOKSHA",
		name: "Moksha",
		code: "mdf",
	},
	{
		key: "MANDAR",
		name: "Mandar",
		code: "mdr",
	},
	{
		key: "MENDE",
		name: "Mende",
		code: "men",
	},
	{
		key: "IRISH_MIDDLE_900_1200",
		name: "Irish, Middle (900-1200)",
		code: "mga",
	},
	{
		key: "MIKMAQ_MICMAC",
		name: "Mi'kmaq; Micmac",
		code: "mic",
	},
	{
		key: "MINANGKABAU",
		name: "Minangkabau",
		code: "min",
	},
	{
		key: "UNCODED_LANGUAGES",
		name: "Uncoded languages",
		code: "mis",
	},
	{
		key: "MON_KHMER_LANGUAGES",
		name: "Mon-Khmer languages",
		code: "mkh",
	},
	{
		key: "MALAGASY",
		name: "Malagasy",
		code: "mlg",
	},
	{
		key: "MALTESE",
		name: "Maltese",
		code: "mlt",
	},
	{
		key: "MANCHU",
		name: "Manchu",
		code: "mnc",
	},
	{
		key: "MANIPURI",
		name: "Manipuri",
		code: "mni",
	},
	{
		key: "MANOBO_LANGUAGES",
		name: "Manobo languages",
		code: "mno",
	},
	{
		key: "MOHAWK",
		name: "Mohawk",
		code: "moh",
	},
	{
		key: "MONGOLIAN",
		name: "Mongolian",
		code: "mon",
	},
	{
		key: "MOSSI",
		name: "Mossi",
		code: "mos",
	},
	{
		key: "MULTIPLE_LANGUAGES",
		name: "Multiple languages",
		code: "mul",
	},
	{
		key: "MUNDA_LANGUAGES",
		name: "Munda languages",
		code: "mun",
	},
	{
		key: "CREEK",
		name: "Creek",
		code: "mus",
	},
	{
		key: "MIRANDESE",
		name: "Mirandese",
		code: "mwl",
	},
	{
		key: "MARWARI",
		name: "Marwari",
		code: "mwr",
	},
	{
		key: "MAYAN_LANGUAGES",
		name: "Mayan languages",
		code: "myn",
	},
	{
		key: "ERZYA",
		name: "Erzya",
		code: "myv",
	},
	{
		key: "NAHUATL_LANGUAGES",
		name: "Nahuatl languages",
		code: "nah",
	},
	{
		key: "NORTH_AMERICAN_INDIAN_LANGUAGES",
		name: "North American Indian languages",
		code: "nai",
	},
	{
		key: "NEAPOLITAN",
		name: "Neapolitan",
		code: "nap",
	},
	{
		key: "NAURU",
		name: "Nauru",
		code: "nau",
	},
	{
		key: "NAVAJO_NAVAHO",
		name: "Navajo; Navaho",
		code: "nav",
	},
	{
		key: "NDEBELE_SOUTH_SOUTH_NDEBELE",
		name: "Ndebele, South; South Ndebele",
		code: "nbl",
	},
	{
		key: "NDEBELE_NORTH_NORTH_NDEBELE",
		name: "Ndebele, North; North Ndebele",
		code: "nde",
	},
	{
		key: "NDONGA",
		name: "Ndonga",
		code: "ndo",
	},
	{
		key: "LOW_GERMAN_LOW_SAXON_GERMAN_LOW_SAXON_LOW",
		name: "Low German; Low Saxon; German, Low; Saxon, Low",
		code: "nds",
	},
	{
		key: "NEPALI_MACROLANGUAGE",
		name: "Nepali (macrolanguage)",
		code: "nep",
	},
	{
		key: "NEPAL_BHASA_NEWARI",
		name: "Nepal Bhasa; Newari",
		code: "new",
	},
	{
		key: "NIAS",
		name: "Nias",
		code: "nia",
	},
	{
		key: "NIGER_KORDOFANIAN_LANGUAGES",
		name: "Niger-Kordofanian languages",
		code: "nic",
	},
	{
		key: "NIUEAN",
		name: "Niuean",
		code: "niu",
	},
	{
		key: "NORWEGIAN_NYNORSK_NYNORSK_NORWEGIAN",
		name: "Norwegian Nynorsk; Nynorsk, Norwegian",
		code: "nno",
	},
	{
		key: "BOKMAL_NORWEGIAN_NORWEGIAN_BOKMAL",
		name: "Bokmål, Norwegian; Norwegian Bokmål",
		code: "nob",
	},
	{
		key: "NOGAI",
		name: "Nogai",
		code: "nog",
	},
	{
		key: "NORSE_OLD",
		name: "Norse, Old",
		code: "non",
	},
	{
		key: "NORWEGIAN",
		name: "Norwegian",
		code: "nor",
	},
	{
		key: "NKO",
		name: "N'Ko",
		code: "nqo",
	},
	{
		key: "PEDI_SEPEDI_NORTHERN_SOTHO",
		name: "Pedi; Sepedi; Northern Sotho",
		code: "nso",
	},
	{
		key: "NUBIAN_LANGUAGES",
		name: "Nubian languages",
		code: "nub",
	},
	{
		key: "CLASSICAL_NEWARI_OLD_NEWARI_CLASSICAL_NEPAL_BHASA",
		name: "Classical Newari; Old Newari; Classical Nepal Bhasa",
		code: "nwc",
	},
	{
		key: "CHICHEWA_CHEWA_NYANJA",
		name: "Chichewa; Chewa; Nyanja",
		code: "nya",
	},
	{
		key: "NYAMWEZI",
		name: "Nyamwezi",
		code: "nym",
	},
	{
		key: "NYANKOLE",
		name: "Nyankole",
		code: "nyn",
	},
	{
		key: "NYORO",
		name: "Nyoro",
		code: "nyo",
	},
	{
		key: "NZIMA",
		name: "Nzima",
		code: "nzi",
	},
	{
		key: "OCCITAN_POST_1500",
		name: "Occitan (post 1500)",
		code: "oci",
	},
	{
		key: "OJIBWA",
		name: "Ojibwa",
		code: "oji",
	},
	{
		key: "ORIYA_MACROLANGUAGE",
		name: "Oriya (macrolanguage)",
		code: "ori",
	},
	{
		key: "OROMO",
		name: "Oromo",
		code: "orm",
	},
	{
		key: "OSAGE",
		name: "Osage",
		code: "osa",
	},
	{
		key: "OSSETIAN_OSSETIC",
		name: "Ossetian; Ossetic",
		code: "oss",
	},
	{
		key: "TURKISH_OTTOMAN_1500_1928",
		name: "Turkish, Ottoman (1500-1928)",
		code: "ota",
	},
	{
		key: "OTOMIAN_LANGUAGES",
		name: "Otomian languages",
		code: "oto",
	},
	{
		key: "PAPUAN_LANGUAGES",
		name: "Papuan languages",
		code: "paa",
	},
	{
		key: "PANGASINAN",
		name: "Pangasinan",
		code: "pag",
	},
	{
		key: "PAHLAVI",
		name: "Pahlavi",
		code: "pal",
	},
	{
		key: "PAMPANGA_KAPAMPANGAN",
		name: "Pampanga; Kapampangan",
		code: "pam",
	},
	{
		key: "PANJABI_PUNJABI",
		name: "Panjabi; Punjabi",
		code: "pan",
	},
	{
		key: "PAPIAMENTO",
		name: "Papiamento",
		code: "pap",
	},
	{
		key: "PALAUAN",
		name: "Palauan",
		code: "pau",
	},
	{
		key: "PERSIAN_OLD_CA600_400_BC",
		name: "Persian, Old (ca.600-400 B.C.)",
		code: "peo",
	},
	{
		key: "PERSIAN",
		name: "Persian",
		code: "per",
	},
	{
		key: "PHILIPPINE_LANGUAGES",
		name: "Philippine languages",
		code: "phi",
	},
	{
		key: "PHOENICIAN",
		name: "Phoenician",
		code: "phn",
	},
	{
		key: "PALI",
		name: "Pali",
		code: "pli",
	},
	{
		key: "POLISH",
		name: "Polish",
		code: "pol",
	},
	{
		key: "POHNPEIAN",
		name: "Pohnpeian",
		code: "pon",
	},
	{
		key: "PORTUGUESE",
		name: "Portuguese",
		code: "por",
	},
	{
		key: "PRAKRIT_LANGUAGES",
		name: "Prakrit languages",
		code: "pra",
	},
	{
		key: "PROVENCAL_OLD_TO_1500OCCITAN_OLD_TO_1500",
		name: "Provençal, Old (to 1500);Occitan, Old (to 1500)",
		code: "pro",
	},
	{
		key: "PUSHTO_PASHTO",
		name: "Pushto; Pashto",
		code: "pus",
	},
	{
		key: "RESERVED_FOR_LOCAL_USE",
		name: "Reserved for local use",
		code: "qaa-qtz",
	},
	{
		key: "QUECHUA",
		name: "Quechua",
		code: "que",
	},
	{
		key: "RAJASTHANI",
		name: "Rajasthani",
		code: "raj",
	},
	{
		key: "RAPANUI",
		name: "Rapanui",
		code: "rap",
	},
	{
		key: "RAROTONGAN_COOK_ISLANDS_MAORI",
		name: "Rarotongan; Cook Islands Maori",
		code: "rar",
	},
	{
		key: "ROMANCE_LANGUAGES",
		name: "Romance languages",
		code: "roa",
	},
	{
		key: "ROMANSH",
		name: "Romansh",
		code: "roh",
	},
	{
		key: "ROMANY",
		name: "Romany",
		code: "rom",
	},
	{
		key: "ROMANIAN_MOLDAVIAN_MOLDOVAN",
		name: "Romanian; Moldavian; Moldovan",
		code: "rum",
	},
	{
		key: "RUNDI",
		name: "Rundi",
		code: "run",
	},
	{
		key: "AROMANIAN_ARUMANIAN_MACEDO_ROMANIAN",
		name: "Aromanian; Arumanian; Macedo-Romanian",
		code: "rup",
	},
	{
		key: "RUSSIAN",
		name: "Russian",
		code: "rus",
	},
	{
		key: "SANDAWE",
		name: "Sandawe",
		code: "sad",
	},
	{
		key: "SANGO",
		name: "Sango",
		code: "sag",
	},
	{
		key: "YAKUT",
		name: "Yakut",
		code: "sah",
	},
	{
		key: "SOUTH_AMERICAN_INDIAN_LANGUAGES",
		name: "South American Indian languages",
		code: "sai",
	},
	{
		key: "SALISHAN_LANGUAGES",
		name: "Salishan languages",
		code: "sal",
	},
	{
		key: "SAMARITAN_ARAMAIC",
		name: "Samaritan Aramaic",
		code: "sam",
	},
	{
		key: "SANSKRIT",
		name: "Sanskrit",
		code: "san",
	},
	{
		key: "SASAK",
		name: "Sasak",
		code: "sas",
	},
	{
		key: "SANTALI",
		name: "Santali",
		code: "sat",
	},
	{
		key: "SICILIAN",
		name: "Sicilian",
		code: "scn",
	},
	{
		key: "SCOTS",
		name: "Scots",
		code: "sco",
	},
	{
		key: "SELKUP",
		name: "Selkup",
		code: "sel",
	},
	{
		key: "SEMITIC_LANGUAGES",
		name: "Semitic languages",
		code: "sem",
	},
	{
		key: "IRISH_OLD_TO_900",
		name: "Irish, Old (to 900)",
		code: "sga",
	},
	{
		key: "SIGN_LANGUAGES",
		name: "Sign Languages",
		code: "sgn",
	},
	{
		key: "SHAN",
		name: "Shan",
		code: "shn",
	},
	{
		key: "SIDAMO",
		name: "Sidamo",
		code: "sid",
	},
	{
		key: "SINHALA_SINHALESE",
		name: "Sinhala; Sinhalese",
		code: "sin",
	},
	{
		key: "SIOUAN_LANGUAGES",
		name: "Siouan languages",
		code: "sio",
	},
	{
		key: "SINO_TIBETAN_LANGUAGES",
		name: "Sino-Tibetan languages",
		code: "sit",
	},
	{
		key: "SLAVIC_LANGUAGES",
		name: "Slavic languages",
		code: "sla",
	},
	{
		key: "SLOVAK",
		name: "Slovak",
		code: "slo",
	},
	{
		key: "SLOVENIAN",
		name: "Slovenian",
		code: "slv",
	},
	{
		key: "SOUTHERN_SAMI",
		name: "Southern Sami",
		code: "sma",
	},
	{
		key: "NORTHERN_SAMI",
		name: "Northern Sami",
		code: "sme",
	},
	{
		key: "SAMI_LANGUAGES",
		name: "Sami languages",
		code: "smi",
	},
	{
		key: "LULE_SAMI",
		name: "Lule Sami",
		code: "smj",
	},
	{
		key: "INARI_SAMI",
		name: "Inari Sami",
		code: "smn",
	},
	{
		key: "SAMOAN",
		name: "Samoan",
		code: "smo",
	},
	{
		key: "SKOLT_SAMI",
		name: "Skolt Sami",
		code: "sms",
	},
	{
		key: "SHONA",
		name: "Shona",
		code: "sna",
	},
	{
		key: "SINDHI",
		name: "Sindhi",
		code: "snd",
	},
	{
		key: "SONINKE",
		name: "Soninke",
		code: "snk",
	},
	{
		key: "SOGDIAN",
		name: "Sogdian",
		code: "sog",
	},
	{
		key: "SOMALI",
		name: "Somali",
		code: "som",
	},
	{
		key: "SONGHAI_LANGUAGES",
		name: "Songhai languages",
		code: "son",
	},
	{
		key: "SOTHO_SOUTHERN",
		name: "Sotho, Southern",
		code: "sot",
	},
	{
		key: "SPANISH_CASTILIAN",
		name: "Spanish; Castilian",
		code: "spa",
	},
	{
		key: "SARDINIAN",
		name: "Sardinian",
		code: "srd",
	},
	{
		key: "SRANAN_TONGO",
		name: "Sranan Tongo",
		code: "srn",
	},
	{
		key: "SERBIAN",
		name: "Serbian",
		code: "srp",
	},
	{
		key: "SERER",
		name: "Serer",
		code: "srr",
	},
	{
		key: "NILO_SAHARAN_LANGUAGES",
		name: "Nilo-Saharan languages",
		code: "ssa",
	},
	{
		key: "SWATI",
		name: "Swati",
		code: "ssw",
	},
	{
		key: "SUKUMA",
		name: "Sukuma",
		code: "suk",
	},
	{
		key: "SUNDANESE",
		name: "Sundanese",
		code: "sun",
	},
	{
		key: "SUSU",
		name: "Susu",
		code: "sus",
	},
	{
		key: "SUMERIAN",
		name: "Sumerian",
		code: "sux",
	},
	{
		key: "SWAHILI_MACROLANGUAGE",
		name: "Swahili (macrolanguage)",
		code: "swa",
	},
	{
		key: "SWEDISH",
		name: "Swedish",
		code: "swe",
	},
	{
		key: "CLASSICAL_SYRIAC",
		name: "Classical Syriac",
		code: "syc",
	},
	{
		key: "SYRIAC",
		name: "Syriac",
		code: "syr",
	},
	{
		key: "TAHITIAN",
		name: "Tahitian",
		code: "tah",
	},
	{
		key: "TAI_LANGUAGES",
		name: "Tai languages",
		code: "tai",
	},
	{
		key: "TAMIL",
		name: "Tamil",
		code: "tam",
	},
	{
		key: "TATAR",
		name: "Tatar",
		code: "tat",
	},
	{
		key: "TELUGU",
		name: "Telugu",
		code: "tel",
	},
	{
		key: "TIMNE",
		name: "Timne",
		code: "tem",
	},
	{
		key: "TERENO",
		name: "Tereno",
		code: "ter",
	},
	{
		key: "TETUM",
		name: "Tetum",
		code: "tet",
	},
	{
		key: "TAJIK",
		name: "Tajik",
		code: "tgk",
	},
	{
		key: "TAGALOG",
		name: "Tagalog",
		code: "tgl",
	},
	{
		key: "THAI",
		name: "Thai",
		code: "tha",
	},
	{
		key: "TIBETAN",
		name: "Tibetan",
		code: "tib",
	},
	{
		key: "TIGRE",
		name: "Tigre",
		code: "tig",
	},
	{
		key: "TIGRINYA",
		name: "Tigrinya",
		code: "tir",
	},
	{
		key: "TIV",
		name: "Tiv",
		code: "tiv",
	},
	{
		key: "TOKELAU",
		name: "Tokelau",
		code: "tkl",
	},
	{
		key: "KLINGON_TLH_INGAN_HOL",
		name: "Klingon; tlhIngan-Hol",
		code: "tlh",
	},
	{
		key: "TLINGIT",
		name: "Tlingit",
		code: "tli",
	},
	{
		key: "TAMASHEK",
		name: "Tamashek",
		code: "tmh",
	},
	{
		key: "TONGA_NYASA",
		name: "Tonga (Nyasa)",
		code: "tog",
	},
	{
		key: "TONGA_TONGA_ISLANDS",
		name: "Tonga (Tonga Islands)",
		code: "ton",
	},
	{
		key: "TOK_PISIN",
		name: "Tok Pisin",
		code: "tpi",
	},
	{
		key: "TSIMSHIAN",
		name: "Tsimshian",
		code: "tsi",
	},
	{
		key: "TSWANA",
		name: "Tswana",
		code: "tsn",
	},
	{
		key: "TSONGA",
		name: "Tsonga",
		code: "tso",
	},
	{
		key: "TURKMEN",
		name: "Turkmen",
		code: "tuk",
	},
	{
		key: "TUMBUKA",
		name: "Tumbuka",
		code: "tum",
	},
	{
		key: "TUPI_LANGUAGES",
		name: "Tupi languages",
		code: "tup",
	},
	{
		key: "TURKISH",
		name: "Turkish",
		code: "tur",
	},
	{
		key: "ALTAIC_LANGUAGES",
		name: "Altaic languages",
		code: "tut",
	},
	{
		key: "TUVALU",
		name: "Tuvalu",
		code: "tvl",
	},
	{
		key: "TWI",
		name: "Twi",
		code: "twi",
	},
	{
		key: "TUVINIAN",
		name: "Tuvinian",
		code: "tyv",
	},
	{
		key: "UDMURT",
		name: "Udmurt",
		code: "udm",
	},
	{
		key: "UGARITIC",
		name: "Ugaritic",
		code: "uga",
	},
	{
		key: "UIGHUR_UYGHUR",
		name: "Uighur; Uyghur",
		code: "uig",
	},
	{
		key: "UKRAINIAN",
		name: "Ukrainian",
		code: "ukr",
	},
	{
		key: "UMBUNDU",
		name: "Umbundu",
		code: "umb",
	},
	{
		key: "UNDETERMINED",
		name: "Undetermined",
		code: "und",
	},
	{
		key: "URDU",
		name: "Urdu",
		code: "urd",
	},
	{
		key: "UZBEK",
		name: "Uzbek",
		code: "uzb",
	},
	{
		key: "VAI",
		name: "Vai",
		code: "vai",
	},
	{
		key: "VENDA",
		name: "Venda",
		code: "ven",
	},
	{
		key: "VIETNAMESE",
		name: "Vietnamese",
		code: "vie",
	},
	{
		key: "VOLAPUK",
		name: "Volapük",
		code: "vol",
	},
	{
		key: "VOTIC",
		name: "Votic",
		code: "vot",
	},
	{
		key: "WAKASHAN_LANGUAGES",
		name: "Wakashan languages",
		code: "wak",
	},
	{
		key: "WOLAITTA_WOLAYTTA",
		name: "Wolaitta; Wolaytta",
		code: "wal",
	},
	{
		key: "WARAY",
		name: "Waray",
		code: "war",
	},
	{
		key: "WASHO",
		name: "Washo",
		code: "was",
	},
	{
		key: "WELSH",
		name: "Welsh",
		code: "wel",
	},
	{
		key: "SORBIAN_LANGUAGES",
		name: "Sorbian languages",
		code: "wen",
	},
	{
		key: "WALLOON",
		name: "Walloon",
		code: "wln",
	},
	{
		key: "WOLOF",
		name: "Wolof",
		code: "wol",
	},
	{
		key: "KALMYK_OIRAT",
		name: "Kalmyk; Oirat",
		code: "xal",
	},
	{
		key: "XHOSA",
		name: "Xhosa",
		code: "xho",
	},
	{
		key: "YAO",
		name: "Yao",
		code: "yao",
	},
	{
		key: "YAPESE",
		name: "Yapese",
		code: "yap",
	},
	{
		key: "YIDDISH",
		name: "Yiddish",
		code: "yid",
	},
	{
		key: "YORUBA",
		name: "Yoruba",
		code: "yor",
	},
	{
		key: "YUPIK_LANGUAGES",
		name: "Yupik languages",
		code: "ypk",
	},
	{
		key: "ZAPOTEC",
		name: "Zapotec",
		code: "zap",
	},
	{
		key: "BLISSYMBOLS_BLISSYMBOLICS_BLISS",
		name: "Blissymbols; Blissymbolics; Bliss",
		code: "zbl",
	},
	{
		key: "ZENAGA",
		name: "Zenaga",
		code: "zen",
	},
	{
		key: "STANDARD_MOROCCAN_TAMAZIGHT",
		name: "Standard Moroccan Tamazight",
		code: "zgh",
	},
	{
		key: "ZHUANG_CHUANG",
		name: "Zhuang; Chuang",
		code: "zha",
	},
	{
		key: "ZANDE_LANGUAGES",
		name: "Zande languages",
		code: "znd",
	},
	{
		key: "ZULU",
		name: "Zulu",
		code: "zul",
	},
	{
		key: "ZUNI",
		name: "Zuni",
		code: "zun",
	},
	{
		key: "NO_LINGUISTIC_CONTENT_NOT_APPLICABLE",
		name: "No linguistic content; Not applicable",
		code: "zxx",
	},
	{
		key: "ZAZA_DIMILI_DIMLI_KIRDKI_KIRMANJKI_ZAZAKI",
		name: "Zaza; Dimili; Dimli; Kirdki; Kirmanjki; Zazaki",
		code: "zza",
	},
] as const satisfies Iso639_2Definition[];

export const Iso639_2 = createEnum(ISO_639_2, {
	keyProp: "key",
	valueProp: "code",
});
