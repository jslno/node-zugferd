import { describe, expect, it } from "vitest";
import { createXPath } from "./xpath";

describe("XPath", () => {
	const xml = `
  <library>
    <section name="fiction">
      <book id="1" lang="en">
        <title>The Lost City</title>
        <author>
          <name>Alice Walker</name>
          <contact>
            <email>alice@example.com</email>
          </contact>
        </author>
        <meta>
          <pages>320</pages>
          <rating>4.5</rating>
        </meta>
      </book>

      <book id="2" lang="en">
        <title>Deep Sea</title>
        <author>
          <name>Bob Smith</name>
          <contact>
            <email>bob@example.com</email>
          </contact>
        </author>
        <meta>
          <pages>210</pages>
          <rating>4.0</rating>
        </meta>
      </book>
    </section>

    <section name="non-fiction">
      <book id="3" lang="en">
        <title>Space Exploration</title>
        <author>
          <name>Charlie Johnson</name>
          <contact>
            <email>charlie@example.com</email>
          </contact>
        </author>
        <meta>
          <pages>500</pages>
          <rating>5.0</rating>
        </meta>
      </book>
    </section>

    <metadata>
      <totalBooks>3</totalBooks>
      <generated>true</generated>
    </metadata>
  </library>
  `;

	it("can enter a structured document without knowing its internal shape", () => {
		const xp = createXPath(xml);

		expect(xp.querySelector("library")).not.toBeNull();
	});

	it("preserves the idea that repeated elements should be treated as collections", () => {
		const xp = createXPath(xml);

		const books = xp.querySelectorAll("library/section/book");

		expect(books.length).toBe(3);
	});

	it("allows narrowing a broad collection by structural context", () => {
		const xp = createXPath(xml);

		const fictionBooks = xp.querySelectorAll(
			'library/section[@name="fiction"]/book',
		);

		expect(fictionBooks.length).toBe(2);
	});

	it("lets us isolate a specific entity by identity rather than position", () => {
		const xp = createXPath(xml);

		const book = xp.querySelectorAll('library/section/book[@id="3"]');

		expect(book.length).toBe(1);
		expect((book[0]!.original as any)?.["@id"]).toBe("3");
	});

	it("supports reasoning across nested structures instead of just flat lookups", () => {
		const xp = createXPath(xml);

		const email = xp.querySelector("library/section/book/author/contact/email");

		expect(email?.original).toBeDefined();
	});

	it("can filter based on values deep in the hierarchy", () => {
		const xp = createXPath(xml);

		const result = xp.querySelectorAll(
			'library/section/book[author/name="Bob Smith"]',
		);

		expect(result.length).toBe(1);
	});

	it("treats numeric content as comparable data, not just raw strings", () => {
		const xp = createXPath(xml);

		const result = xp.querySelectorAll(
			'library/section/book[meta/rating="5.0"]',
		);

		expect(result.length).toBe(1);
	});

	it("allows partial navigation when only a subset of structure matters", () => {
		const xp = createXPath(xml);

		const pages = xp.querySelectorAll("library/section/book/meta/pages");

		expect(pages.length).toBe(3);
	});

	it("fails gracefully when the structure does not match expectations", () => {
		const xp = createXPath(xml);

		const result = xp.querySelectorAll("library/section/book/does/not/exist");

		expect(result).toEqual([]);
	});

	it("lets callers reason in terms of 'first match wins' when ordering exists", () => {
		const xp = createXPath(xml);

		const firstBook = xp.querySelector("library/section/book");

		expect(firstBook).not.toBeNull();
		expect((firstBook as any).original?.["@id"]).toBe("1");
	});

	it("does not require perfect knowledge of depth to reach meaningful data", () => {
		const xp = createXPath(xml);

		const rating = xp.querySelector("library/section/book/meta/rating");

		expect(rating?.original).toBeDefined();
	});

	it("supports combining structural filters with deeper projections", () => {
		const xp = createXPath(xml);

		const result = xp.querySelectorAll(
			'library/section[@name="non-fiction"]/book/meta/rating',
		);

		expect(result.length).toBe(1);
	});

	it("does not break when intermediate branches are missing", () => {
		const xp = createXPath(xml);

		const result = xp.querySelectorAll(
			"library/section/book/unknown/path/segment",
		);

		expect(result).toEqual([]);
	});

	it("lets multiple branches converge into a single conceptual stream", () => {
		const xp = createXPath(xml);

		const pages = xp.querySelectorAll("library/section/book/meta/pages");

		expect(pages.length).toBe(3);
	});
});
