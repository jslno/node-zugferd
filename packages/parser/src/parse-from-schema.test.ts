import {
	array,
	date,
	metadata,
	nullish,
	object,
	pipe,
	text,
	walkSchema,
} from "@node-zugferd/data-types";
import { describe, expect, it } from "vitest";
import { parseFromSchema } from "./parse-from-schema";
import { createXPath } from "./xpath";

const libraryXml = `
  <library>
    <section name="fiction">
      <book id="1" lang="en">
        <title>The Lost City</title>
        <meta>
          <pages>320</pages>
          <rating>4.5</rating>
        </meta>
      </book>
      <book id="2" lang="en">
        <title>Deep Sea</title>
        <meta>
          <pages>210</pages>
          <rating>4.0</rating>
        </meta>
      </book>
    </section>
    <section name="non-fiction">
      <book id="3" lang="en">
        <title>Space Exploration</title>
        <meta>
          <pages>500</pages>
          <rating>5.0</rating>
        </meta>
      </book>
    </section>
  </library>
`;

const librarySchema = object({
	section: array(
		object({
			book: array(
				object({
					pages: pipe(
						text(),
						metadata({
							xpath: "library/section/book/meta/pages",
						}),
					),
					rating: pipe(
						text(),
						metadata({
							xpath: "library/section/book/meta/rating",
						}),
					),
				}),
			),
		}),
	),
});

describe("parse-from-schema", () => {
	it("assigns nested array values using wildcard indexes", () => {
		const xpath = createXPath(libraryXml);
		const profile = { schema: librarySchema } as never;

		const result = parseFromSchema({
			profile,
			xml: xpath.querySelector("library")!.original as never,
			xpath,
			context: {} as never,
		});

		expect(result.section).toEqual([
			{
				book: [
					{ pages: "320", rating: "4.5" },
					{ pages: "210", rating: "4.0" },
				],
			},
			{
				book: [{ pages: "500", rating: "5.0" }],
			},
		]);
	});

	it("maps wildcard paths to the correct nested array positions", () => {
		const xpath = createXPath(libraryXml);
		const profile = { schema: librarySchema } as never;

		const result: any = parseFromSchema({
			profile,
			xml: xpath.querySelector("library")!.original as never,
			xpath,
			context: {} as never,
		});

		expect(result.section?.[0]?.book?.[1]?.pages).toBe("210");
		expect(result.section?.[1]?.book?.[0]?.rating).toBe("5.0");
	});
});

const invoiceNotesXml = `
  <rsm:CrossIndustryInvoice>
    <rsm:ExchangedDocument>
      <ram:IncludedNote>
        <ram:Content>Note 1</ram:Content>
      </ram:IncludedNote>
      <ram:IncludedNote>
        <ram:Content>Note 2</ram:Content>
        <ram:SubjectCode>ABC</ram:SubjectCode>
      </ram:IncludedNote>
    </rsm:ExchangedDocument>
  </rsm:CrossIndustryInvoice>
`;

const invoiceNotesSchema = object({
	exchangedDocument: pipe(
		nullish(
			object({
				invoiceNotes: pipe(
					nullish(
						array(
							object({
								content: pipe(
									text(),
									metadata({
										id: "BT-22",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote/ram:Content",
									}),
								),
								subjectCode: pipe(
									nullish(text()),
									metadata({
										id: "BT-21",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote/ram:SubjectCode",
									}),
								),
							}),
						),
					),
					metadata({
						id: "BG-1",
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote",
					}),
				),
			}),
		),
		metadata({
			id: "BT-1-00",
		}),
	),
});

describe("parse-from-schema invoice notes", () => {
	it("parses repeated IncludedNote elements when schema field names differ from xml tags", () => {
		const xpath = createXPath(invoiceNotesXml);
		const profile = { schema: invoiceNotesSchema } as never;

		const result = parseFromSchema({
			profile,
			xml: xpath.querySelector("rsm:CrossIndustryInvoice")!.original as never,
			xpath,
			context: {} as never,
		});

		expect(result.exchangedDocument?.invoiceNotes).toEqual([
			{ content: "Note 1" },
			{ content: "Note 2", subjectCode: "ABC" },
		]);
	});
});

describe("parse-from-schema entities", () => {
	it("preserves XML entities by default", () => {
		const xml = `<root><name>Metallbau Leipzig GmbH &amp; Co. KG</name></root>`;
		const xpath = createXPath(xml);
		const schema = object({
			name: pipe(text(), metadata({ xpath: "/root/name" })),
		});
		const result: any = parseFromSchema({
			profile: { schema } as never,
			xml: xpath.querySelector("root")!.original as never,
			xpath,
			context: {} as never,
		});

		expect(result.name).toBe("Metallbau Leipzig GmbH &amp; Co. KG");
	});

	it("decodes XML entities when decodeEntities is enabled", () => {
		const xml = `<root><name>Metallbau Leipzig GmbH &amp; Co. KG</name></root>`;
		const xpath = createXPath(xml);
		const schema = object({
			name: pipe(text(), metadata({ xpath: "/root/name" })),
		});
		const result: any = parseFromSchema({
			profile: { schema } as never,
			xml: xpath.querySelector("root")!.original as never,
			xpath,
			context: {} as never,
			decodeEntities: true,
		});

		expect(result.name).toBe("Metallbau Leipzig GmbH & Co. KG");
	});
});

describe("parse-from-schema nested arrays", () => {
	it("resolves nested array length when parent object has business-term id but no xpath", () => {
		const xml = `
			<rsm:CrossIndustryInvoice>
				<rsm:SupplyChainTradeTransaction>
					<ram:IncludedSupplyChainTradeLineItem>
						<ram:SpecifiedTradeProduct>
							<ram:Name>Miettage</ram:Name>
							<ram:ApplicableProductCharacteristic>
								<ram:Description>Fahrzeug-Kennzeichen</ram:Description>
								<ram:Value>M-MM 0000</ram:Value>
							</ram:ApplicableProductCharacteristic>
						</ram:SpecifiedTradeProduct>
					</ram:IncludedSupplyChainTradeLineItem>
				</rsm:SupplyChainTradeTransaction>
			</rsm:CrossIndustryInvoice>
		`;
		const schema = object({
			transaction: object({
				line: pipe(
					array(
						object({
							item: pipe(
								object({
									name: pipe(
										text(),
										metadata({
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:Name",
										}),
									),
									attributes: pipe(
										nullish(
											array(
												object({
													description: pipe(
														text(),
														metadata({
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Description",
														}),
													),
													value: pipe(
														text(),
														metadata({
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Value",
														}),
													),
												}),
											),
										),
										metadata({
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic",
										}),
									),
								}),
								metadata({
									id: "BG-31",
								}),
							),
						}),
					),
					metadata({
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem",
					}),
				),
			}),
		});
		const xpath = createXPath(xml);
		const result: any = parseFromSchema({
			profile: { schema } as never,
			xml: xpath.querySelector("rsm:CrossIndustryInvoice")!.original as never,
			xpath,
			context: {} as never,
		});

		expect(result).toEqual({
			transaction: {
				line: [
					{
						item: {
							name: "Miettage",
							attributes: [
								{
									description: "Fahrzeug-Kennzeichen",
									value: "M-MM 0000",
								},
							],
						},
					},
				],
			},
		});
	});

	it("resolves nested array length from xpath when schema key differs from xml tag", () => {
		const xml = `
			<rsm:CrossIndustryInvoice>
				<rsm:SupplyChainTradeTransaction>
					<ram:IncludedSupplyChainTradeLineItem>
						<ram:SpecifiedTradeProduct>
							<ram:Name>Miettage</ram:Name>
							<ram:ApplicableProductCharacteristic>
								<ram:Description>Fahrzeug-Kennzeichen</ram:Description>
								<ram:Value>M-MM 0000</ram:Value>
							</ram:ApplicableProductCharacteristic>
						</ram:SpecifiedTradeProduct>
					</ram:IncludedSupplyChainTradeLineItem>
				</rsm:SupplyChainTradeTransaction>
			</rsm:CrossIndustryInvoice>
		`;
		const schema = object({
			transaction: object({
				line: pipe(
					array(
						object({
							item: object({
								name: pipe(
									text(),
									metadata({
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:Name",
									}),
								),
								attributes: pipe(
									nullish(
										array(
											object({
												description: pipe(
													text(),
													metadata({
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Description",
													}),
												),
												value: pipe(
													text(),
													metadata({
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Value",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic",
									}),
								),
							}),
						}),
					),
					metadata({
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem",
					}),
				),
			}),
		});
		const xpath = createXPath(xml);
		const result: any = parseFromSchema({
			profile: { schema } as never,
			xml: xpath.querySelector("rsm:CrossIndustryInvoice")!.original as never,
			xpath,
			context: {} as never,
		});

		expect(result).toEqual({
			transaction: {
				line: [
					{
						item: {
							name: "Miettage",
							attributes: [
								{
									description: "Fahrzeug-Kennzeichen",
									value: "M-MM 0000",
								},
							],
						},
					},
				],
			},
		});
	});
});

describe("parse-from-schema dates", () => {
	it("parses format 102 dates without an off-by-one day shift", () => {
		const xml = `
			<rsm:CrossIndustryInvoice>
				<rsm:ExchangedDocument>
					<ram:IssueDateTime>
						<udt:DateTimeString format="102">20200305</udt:DateTimeString>
					</ram:IssueDateTime>
				</rsm:ExchangedDocument>
			</rsm:CrossIndustryInvoice>
		`;
		const schema = object({
			exchangedDocument: object({
				invoiceIssueDate: pipe(
					date(),
					metadata({
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IssueDateTime/udt:DateTimeString",
					}),
				),
			}),
		});
		const xpath = createXPath(xml);
		const result: any = parseFromSchema({
			profile: { schema } as never,
			xml: xpath.querySelector("rsm:CrossIndustryInvoice")!.original as never,
			xpath,
			context: {} as never,
		});

		expect(result.exchangedDocument.invoiceIssueDate).toEqual(
			new Date("2020-03-05"),
		);
	});
});

describe("walkSchema array expansion", () => {
	it("expands array paths with concrete indexes when resolveArrayLength is provided", () => {
		const visits: Array<{ path: string; indexes: number[] }> = [];

		walkSchema(
			librarySchema,
			({ path, indexes }) => {
				if (path.includes("*")) {
					visits.push({ path: path.join("."), indexes: [...indexes] });
				}
			},
			{
				resolveArrayLength: (arrayPath, indexes) => {
					const key = arrayPath.join(".");

					if (key === "section") {
						return 2;
					}

					if (key === "section.*.book") {
						return indexes[0] === 0 ? 2 : 1;
					}

					return 0;
				},
			},
		);

		expect(visits).toContainEqual({
			path: "section.*.book",
			indexes: [0],
		});
		expect(visits).toContainEqual({
			path: "section.*.book.*.pages",
			indexes: [0, 1],
		});
		expect(visits).toContainEqual({
			path: "section.*.book.*.rating",
			indexes: [1, 0],
		});
	});
});
