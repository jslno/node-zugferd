import { defineConfig } from "tsup";

export default defineConfig((env) => {
	return {
		entry: {
			index: "./src/index.ts",
			profile: "./src/profiles/index.ts",
			"profile/minimum": "./src/profiles/minimum/index.ts",
			"profile/basic": "./src/profiles/basic/index.ts",
			"profile/basic-wl": "./src/profiles/basic-wl/index.ts",
			"profile/en16931": "./src/profiles/en16931/index.ts",
			"profile/extended": "./src/profiles/extended/index.ts",
			types: "./src/types/index.ts",
			"codelist/untdid.1001": "./src/codelists/untdid/1001.ts",
			"codelist/untdid.1153": "./src/codelists/untdid/1153.ts",
			"codelist/untdid.1229": "./src/codelists/untdid/1229.ts",
			"codelist/untdid.2005": "./src/codelists/untdid/2005.ts",
			"codelist/untdid.3139": "./src/codelists/untdid/3139.ts",
			"codelist/untdid.4451": "./src/codelists/untdid/4451.ts",
			"codelist/untdid.4461": "./src/codelists/untdid/4461.ts",
			"codelist/untdid.5189": "./src/codelists/untdid/5189.ts",
			"codelist/untdid.5305": "./src/codelists/untdid/5305.ts",
			"codelist/untdid.7143": "./src/codelists/untdid/7143.ts",
			"codelist/untdid.7161": "./src/codelists/untdid/7161.ts",
			"codelist/vatex": "./src/codelists/vatex.ts",
			"codelist/eas": "./src/codelists/eas.ts",
			"codelist/currency-codes": "./src/codelists/currency-codes.ts",
		},
		format: ["cjs", "esm"],
		bundle: true,
		publicDir: "./src/assets",
		splitting: false,
		cjsInterop: true,
		skipNodeModulesBundle: true,
	};
});
