import {
	array,
	metadata,
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
