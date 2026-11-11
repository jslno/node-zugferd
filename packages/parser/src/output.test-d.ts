import { expectTypeOf, test } from "vitest";
import type { ParserOutput } from "./output";

test("maps schema output leaves to parser output", () => {
	type Sample = {
		issued: { date: Date; value: string; format: "102" };
		code: { value: "380"; codelist: "untdid1001" };
		note?: string;
		total: { value: number };
		priced: { value: number; currency?: "EUR" };
		qty: { value: number; unitCode: "H87" };
		bareQty: { value: number; unitCode?: undefined };
		id: { identifier: string; schemeId?: undefined };
		ref: { identifier: string; schemeId?: string };
		file: { content: Uint8Array; mimeType: string; filename: string };
		rate: number;
		flag: "yes";
		lines: { net: { value: number; currency: "EUR" } }[];
	};

	type Schema<Output> = { "~types": { output: Output } };

	expectTypeOf<ParserOutput<Schema<Sample>>>().toEqualTypeOf<{
		issued: { format: string; date: Date; value: string };
		code: string;
		note?: string;
		total: { value: number };
		priced: { value: number; currency?: string };
		qty: { value: number; unitCode: string };
		bareQty: { value: number };
		id: string;
		ref: string | { value: string; schemeId?: string };
		file: File;
		rate: number;
		flag: string;
		lines: { net: { value: number; currency: string } }[];
	}>();
});
