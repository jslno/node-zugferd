const codelists = [
	import("./country"),
	import("./currency"),
	import("./icd"),
	import("./untdid-1001"),
	import("./untdid-1153"),
	import("./vat-id"),
	import("./fiscal-id"),
	import("./vat-cat"),
	import("./time"),
	import("./text"),
	import("./payment"),
	import("./untdid-5305"),
	import("./allowance"),
	import("./item"),
	import("./charge"),
	import("./mime"),
	import("./eas"),
	import("./vatex"),
	import("./unit"),
	import("./line-status"),
	import("./language"),
	import("./characteristic"),
	import("./line-reason"),
	import("./incoterms"),
	import("./transport"),
	import("./date"),
	import("./hybrid-document"),
	import("./hybrid-conformance"),
	import("./filename"),
	import("./hybrid-version"),

	import("./untdid-3035"),
	import("./untdid-3139"),
];

const main = async () => {
	for await (const codelist of codelists) {
		await codelist.default.generate();
	}

	return Promise.resolve();
};

void main();
