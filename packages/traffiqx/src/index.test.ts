import { describe, expect, it, vi } from "vitest";
import { traffiqx } from "./index";

const provider = {
	providerId: "test-provider",
	baseUrl: "https://example.test/tia/v1",
	headers: { "x-provider": "test" },
};

const createActions = (options: Record<string, unknown> = {}) => {
	const plugin = traffiqx({
		provider,
		$fetch: vi.fn().mockResolvedValue({ data: "ok", error: null }) as never,
		...options,
	} as never);
	return {
		actions: (plugin.actions as () => any)().traffiqx,
		fetch: options.$fetch as ReturnType<typeof vi.fn>,
	};
};

describe("traffiqx plugin", () => {
	it("selects a provider from a provider list and rejects missing or unknown IDs", async () => {
		const fetch = vi.fn().mockResolvedValue({ data: [], error: null });
		const { actions } = createActions({
			provider: [
				provider,
				{ ...provider, providerId: "other", baseUrl: "https://other.test" },
			],
			$fetch: fetch,
		});

		await actions.inbox.list({
			traffiqxId: "client",
			providerId: "other",
			accessToken: "token",
		});
		expect(fetch.mock.calls[0]?.[1].baseURL).toBe("https://other.test");
		await expect(
			actions.inbox.list({ traffiqxId: "client", accessToken: "token" }),
		).rejects.toThrow("providerId");
		await expect(
			actions.inbox.list({
				traffiqxId: "client",
				providerId: "missing",
				accessToken: "token",
			}),
		).rejects.toThrow("Unknown TRAFFIQX provider");
	});

	it("passes provider headers, filters, dates, and metadata to an inbox list request", async () => {
		const fetch = vi.fn().mockResolvedValue({ data: [], error: null });
		const { actions } = createActions({ $fetch: fetch });
		const from = new Date("2025-01-01T00:00:00Z");

		await actions.inbox.list({
			traffiqxId: "client",
			downloaded: true,
			from_date: from,
			to_date: "2025-01-31",
			accessToken: async ({ meta }: { meta: unknown }) => {
				expect(meta).toEqual({ trace: "abc" });
				return "dynamic-token";
			},
			meta: { trace: "abc" },
			fetchOptions: {
				query: { custom: "value" },
				headers: { "x-extra": "yes" },
			},
		});

		const [url, request] = fetch.mock.calls[0] ?? [];
		expect(url).toContain("inbox-documents");
		expect(request.baseURL).toBe(provider.baseUrl);
		expect(request.params.traffiqxId).toBe("client");
		expect(request.query).toMatchObject({
			downloaded: true,
			from_date: from.toISOString(),
			custom: "value",
		});
		expect(request.headers).toMatchObject({
			accept: "application/json",
			"x-provider": "test",
			"x-extra": "yes",
		});
		await expect(request.auth.token()).resolves.toBe("dynamic-token");
	});

	it.each([
		["from_date", { from_date: "not-a-date" }],
		["to_date", { to_date: "not-a-date" }],
	])("rejects an invalid %s", async (field, date) => {
		const fetch = vi.fn();
		const { actions } = createActions({ $fetch: fetch });

		await expect(
			actions.inbox.list({
				traffiqxId: "client",
				accessToken: "token",
				...date,
			}),
		).rejects.toThrow(`Field \`${field}\` must be a valid date.`);
		expect(fetch).not.toHaveBeenCalled();
	});

	it("allows per-request access tokens to override the configured token", async () => {
		const fetch = vi.fn().mockResolvedValue({ data: "ok", error: null });
		const { actions } = createActions({
			$fetch: fetch,
			accessToken: "configured",
		});
		await actions.outbox.status({
			traffiqxId: "c",
			documentId: "d",
			accessToken: "override",
		});
		await expect(fetch.mock.calls[0]?.[1].auth.token()).resolves.toBe(
			"override",
		);
	});

	it("rejects requests without an access token", async () => {
		const { actions } = createActions();
		await expect(actions.outbox.list({ traffiqxId: "client" })).rejects.toThrow(
			"accessToken is required",
		);
	});

	it("uses encoded identifiers and returns the raw successful inbox download response", async () => {
		const response = new Response("zip contents");
		const fetch = vi.fn().mockResolvedValue(response);
		const { actions } = createActions({ fetch });
		const result = await actions.inbox.download({
			traffiqxId: "client/a",
			documentId: "doc ?",
			accessToken: "token",
		});

		expect(fetch.mock.calls[0]?.[0]).toBe(
			`${provider.baseUrl}/traffiqx-clients/client%2Fa/inbox-documents/doc%20%3F`,
		);
		expect(fetch.mock.calls[0]?.[1].headers).toMatchObject({
			authorization: "Bearer token",
			accept: "application/zip",
		});
		expect(result).toEqual({ data: response, error: null });
	});

	it("returns structured error information for a failed outbox download", async () => {
		const response = new Response(
			JSON.stringify({ title: "Not found", detail: "Missing document" }),
			{
				status: 404,
				statusText: "Not Found",
				headers: { "content-type": "application/json" },
			},
		);
		const { actions } = createActions({
			fetch: vi.fn().mockResolvedValue(response),
		});
		const result = await actions.outbox.download({
			traffiqxId: "client",
			documentId: "missing",
			accessToken: "token",
		});

		expect(result.data).toBeNull();
		expect(result.error).toMatchObject({
			title: "Not found",
			detail: "Missing document",
			status: 404,
			statusText: "Not Found",
		});
	});

	it("builds a PDF multipart upload and rejects documents over 100 MiB", async () => {
		const fetch = vi.fn().mockResolvedValue({
			data: { document_id: "d", href: "/d" },
			error: null,
		});
		const { actions } = createActions({ $fetch: fetch, accessToken: "token" });
		await actions.upload({ traffiqxId: "client", data: "cGRm" });
		const request = fetch.mock.calls[0]?.[1];
		expect(request.method).toBe("POST");
		expect(request.body).toBeInstanceOf(FormData);
		expect((request.body as FormData).get("data")).toBeInstanceOf(Blob);
		expect(((request.body as FormData).get("data") as Blob).type).toBe(
			"application/pdf",
		);
		await expect(
			actions.upload({ traffiqxId: "client", data: new Uint8Array(104857601) }),
		).rejects.toThrow("too large");
	});

	it("uploads structured XML and PDF in separate correctly typed multipart fields", async () => {
		const fetch = vi.fn().mockResolvedValue({
			data: { document_id: "d", href: "/d" },
			error: null,
		});
		const { actions } = createActions({ $fetch: fetch, accessToken: "token" });
		await actions.uploadStructuredData({
			traffiqxId: "client",
			data: "<Invoice />",
			/* cSpell:disable-next-line */
			view_component: "JVBERi0=",
		});
		const body = fetch.mock.calls[0]?.[1].body as FormData;
		expect((body.get("data") as Blob).type).toBe("application/xml");
		expect(await (body.get("data") as Blob).text()).toBe("<Invoice />");
		expect((body.get("view_component") as Blob).type).toBe("application/pdf");
	});
});
