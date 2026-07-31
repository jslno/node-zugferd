import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const vatex = [
	{
		value: "VATEX-EU-79-C",
		name: "Exempt based on article 79, point c of Council Directive 2006/112/EC",
		remark:
			"\nRepayment of expenditure is not an exemption in the sense of the VAT Directive but may be handled as such in the context of the EN16931.\n        ",
		key: "EXEMPT_BASED_ON_ARTICLE_79_POINT_C_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132",
		name: "Exempt based on article 132 of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1A",
		name: "Exempt based on article 132, section 1 (a) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_A_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1B",
		name: "Exempt based on article 132, section 1 (b) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_B_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1C",
		name: "Exempt based on article 132, section 1 (c) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_C_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1D",
		name: "Exempt based on article 132, section 1 (d) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_D_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1E",
		name: "Exempt based on article 132, section 1 (e) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_E_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1F",
		name: "Exempt based on article 132, section 1 (f) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_F_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1G",
		name: "Exempt based on article 132, section 1 (g) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_G_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1H",
		name: "Exempt based on article 132, section 1 (h) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_H_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1I",
		name: "Exempt based on article 132, section 1 (i) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_I_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1J",
		name: "Exempt based on article 132, section 1 (j) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_J_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1K",
		name: "Exempt based on article 132, section 1 (k) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_K_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1L",
		name: "Exempt based on article 132, section 1 (l) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_L_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1M",
		name: "Exempt based on article 132, section 1 (m) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_M_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1N",
		name: "Exempt based on article 132, section 1 (n) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_N_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1O",
		name: "Exempt based on article 132, section 1 (o) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_O_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1P",
		name: "Exempt based on article 132, section 1 (p) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_P_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-132-1Q",
		name: "Exempt based on article 132, section 1 (q) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_132_SECTION_1_Q_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143",
		name: "Exempt based on article 143 of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1A",
		name: "Exempt based on article 143, section 1 (a) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_A_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1B",
		name: "Exempt based on article 143, section 1 (b) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_B_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1C",
		name: "Exempt based on article 143, section 1 (c) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_C_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1D",
		name: "Exempt based on article 143, section 1 (d) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_D_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1E",
		name: "Exempt based on article 143, section 1 (e) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_E_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1F",
		name: "Exempt based on article 143, section 1 (f) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_F_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1FA",
		name: "Exempt based on article 143, section 1 (fa) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_FA_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1G",
		name: "Exempt based on article 143, section 1 (g) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_G_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1H",
		name: "Exempt based on article 143, section 1 (h) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_H_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1I",
		name: "Exempt based on article 143, section 1 (i) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_I_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1J",
		name: "Exempt based on article 143, section 1 (j) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_J_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1K",
		name: "Exempt based on article 143, section 1 (k) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_K_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-143-1L",
		name: "Exempt based on article 143, section 1 (l) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_143_SECTION_1_L_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-144",
		name: "Exempt based on article 144 of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_144_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-146-1E",
		name: "Exempt based on article 146 section 1 (e) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_146_SECTION_1_E_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-148",
		name: "Exempt based on article 148 of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_148_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-148-A",
		name: "Exempt based on article 148, section (a) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_148_SECTION_A_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-148-B",
		name: "Exempt based on article 148, section (b) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_148_SECTION_B_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-148-C",
		name: "Exempt based on article 148, section (c) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_148_SECTION_C_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-148-D",
		name: "Exempt based on article 148, section (d) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_148_SECTION_D_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-148-E",
		name: "Exempt based on article 148, section (e) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_148_SECTION_E_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-148-F",
		name: "Exempt based on article 148, section (f) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_148_SECTION_F_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-148-G",
		name: "Exempt based on article 148, section (g) of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_148_SECTION_G_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-151",
		name: "Exempt based on article 151 of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_151_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-151-1A",
		name: "Exempt based on article 151, section 1 (a) of Council Directive 2006/112/EC ",
		key: "EXEMPT_BASED_ON_ARTICLE_151_SECTION_1_A_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-151-1AA",
		name: "Exempt based on article 151, section 1 (aa) of Council Directive 2006/112/EC ",
		key: "EXEMPT_BASED_ON_ARTICLE_151_SECTION_1_AA_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-151-1B",
		name: "Exempt based on article 151, section 1 (b) of Council Directive 2006/112/EC ",
		key: "EXEMPT_BASED_ON_ARTICLE_151_SECTION_1_B_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-151-1C",
		name: "Exempt based on article 151, section 1 (c) of Council Directive 2006/112/EC ",
		key: "EXEMPT_BASED_ON_ARTICLE_151_SECTION_1_C_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-151-1D",
		name: "Exempt based on article 151, section 1 (d) of Council Directive 2006/112/EC ",
		key: "EXEMPT_BASED_ON_ARTICLE_151_SECTION_1_D_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-151-1E",
		name: "Exempt based on article 151, section 1 (e) of Council Directive 2006/112/EC ",
		key: "EXEMPT_BASED_ON_ARTICLE_151_SECTION_1_E_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-153",
		name: "Exempt based on article 153 of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_153_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-159",
		name: "Exempt based on article 159 of Council Directive 2006/112/EC",
		key: "EXEMPT_BASED_ON_ARTICLE_159_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-309",
		name: "Exempt based on article 309 of Council Directive 2006/112/EC ",
		key: "EXEMPT_BASED_ON_ARTICLE_309_OF_COUNCIL_DIRECTIVE_2006_112_EC",
	},
	{
		value: "VATEX-EU-AE",
		name: "Reverse charge",
		remark: "\nOnly use with VAT category code AE\n        ",
		key: "REVERSE_CHARGE",
	},
	{
		value: "VATEX-EU-D",
		name: "Travel agents VAT scheme.",
		remark: "\nOnly use with VAT category code E\n        ",
		key: "TRAVEL_AGENTS_VAT_SCHEME",
	},
	{
		value: "VATEX-EU-F",
		name: "Second hand goods VAT scheme.",
		remark: "\nOnly use with VAT category code E\n        ",
		key: "SECOND_HAND_GOODS_VAT_SCHEME",
	},
	{
		value: "VATEX-EU-G",
		name: "Export outside the EU",
		remark: "\nOnly use with VAT category code G\n        ",
		key: "EXPORT_OUTSIDE_THE_EU",
	},
	{
		value: "VATEX-EU-I",
		name: "Works of art VAT scheme.",
		remark: "\nOnly use with VAT category code E\n        ",
		key: "WORKS_OF_ART_VAT_SCHEME",
	},
	{
		value: "VATEX-EU-IC",
		name: "Intra-community supply",
		remark: "\nOnly use with VAT category code K\n        ",
		key: "INTRA_COMMUNITY_SUPPLY",
	},
	{
		value: "VATEX-EU-J",
		name: "Collectors items and antiques VAT scheme.",
		remark: "\nOnly use with VAT category code E\n        ",
		key: "COLLECTORS_ITEMS_AND_ANTIQUES_VAT_SCHEME",
	},
	{
		value: "VATEX-EU-O",
		name: "Not subject to VAT",
		remark: "\nOnly use with VAT category code O\n        ",
		key: "NOT_SUBJECT_TO_VAT",
	},
	{
		value: "VATEX-FR-FRANCHISE",
		name: "France domestic VAT franchise in base",
		remark: "\nFor domestic invoicing in France\n        ",
		key: "FRANCE_DOMESTIC_VAT_FRANCHISE_IN_BASE",
	},
	{
		value: "VATEX-FR-CNWVAT",
		name: "France domestic Credit Notes without VAT, due to supplier forfeit of VAT for discount",
		remark: "\nFor domestic Credit Notes only in France\n        ",
		key: "FRANCE_DOMESTIC_CREDIT_NOTES_WITHOUT_VAT_DUE_TO_SUPPLIER_FORFEIT_OF_VAT_FOR_DISCOUNT",
	},
	{
		value: "VATEX-FR-CGI261-1",
		name: "Exempt based on 1 of article 261 of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_1_OF_ARTICLE_261_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261-2",
		name: "Exempt based on 2 of article 261 of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_2_OF_ARTICLE_261_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261-3",
		name: "Exempt based on 3 of article 261 of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_3_OF_ARTICLE_261_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261-4",
		name: "Exempt based on 4 of article 261 of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_4_OF_ARTICLE_261_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261-5",
		name: "Exempt based on 5 of article 261 of the Code Général des Impôts (CGI ; General tax code) ",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_5_OF_ARTICLE_261_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261-7",
		name: "Exempt based on 7 of article 261 of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_7_OF_ARTICLE_261_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261-8",
		name: "Exempt based on 8 of article 261 of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_8_OF_ARTICLE_261_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261A",
		name: "Exempt based on article 261 A of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_ARTICLE_261_A_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261B",
		name: "Exempt based on article 261 B of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_ARTICLE_261_B_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261C-1",
		name: "Exempt based on 1° of article 261 C of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_1_OF_ARTICLE_261_C_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261C-2",
		name: "Exempt based on 2° of article 261 C of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_2_OF_ARTICLE_261_C_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261C-3",
		name: "Exempt based on 3° of article 261 C of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_3_OF_ARTICLE_261_C_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261D-1",
		name: "Exempt based on 1° of article 261 D of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_1_OF_ARTICLE_261_D_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261D-1BIS",
		name: "Exempt based on 1°bis of article 261 D of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_1_BIS_OF_ARTICLE_261_D_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261D-2",
		name: "Exempt based on 2° of article 261 D of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_2_OF_ARTICLE_261_D_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261D-3",
		name: "Exempt based on 3° of article 261 D of the Code Général des Impôts (CGI ; General tax code)\nExonération de TVA - Article 261 D-3° du Code Général des Impôts ",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_3_OF_ARTICLE_261_D_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE_EXONE_RATION_DE_TVA_ARTICLE_261_D_3_DU_CODE_GE_NE_RAL_DES_IMPO_TS",
	},
	{
		value: "VATEX-FR-CGI261D-4",
		name: "Exempt based on 4° of article 261 D of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_4_OF_ARTICLE_261_D_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261E-1",
		name: "Exempt based on 1° of article 261 E of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_1_OF_ARTICLE_261_E_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI261E-2",
		name: "Exempt based on 2° of article 261 E of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_2_OF_ARTICLE_261_E_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI277A",
		name: "Exempt based on article 277 A of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_ARTICLE_277_A_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI275",
		name: "Exempt based on article 275 of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_ARTICLE_275_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-298SEXDECIESA",
		name: "Exempt based on article 298 sexdecies A of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_ARTICLE_298_SEXDECIES_A_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-CGI295",
		name: "Exempt based on article 295 of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_ARTICLE_295_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
	{
		value: "VATEX-FR-AE",
		name: "Exempt based on 2 of article 283 of the Code Général des Impôts (CGI ; General tax code)",
		remark: "\nOnly for domestic invoicing in France\n        ",
		key: "EXEMPT_BASED_ON_2_OF_ARTICLE_283_OF_THE_CODE_GE_NE_RAL_DES_IMPO_TS_CGI_GENERAL_TAX_CODE",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		vatex: typeof vatex;
	}
}
registerCodelist("vatex", vatex);

export default vatex;
