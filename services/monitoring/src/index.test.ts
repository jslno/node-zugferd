import { beforeEach, describe, expect, it, vi } from "vitest";
import type { EmailJobsQueuePayload } from "./index";
import worker from "./index";
import type { Update } from "./lib/schema";

const { extractUpdate, createIssue } = vi.hoisted(() => ({
	extractUpdate: vi.fn(),
	createIssue: vi.fn(),
}));

vi.mock("./lib/extract", () => ({ extractUpdate }));
vi.mock("./lib/github", () => ({ createIssue }));

const validUpdate: Update = {
	isUpdate: true,
	confidence: 0.95,
	zugferdVersion: "3.0",
	facturXVersion: null,
	releaseDate: "2026-11-20",
	summary: {
		title: "ZUGFeRD 3.0 released",
		description: "The ZUGFeRD specification has a new release.",
	},
	changes: [],
	affectedProfiles: ["EN 16931"],
	references: [],
};

function makeEmailMessage(options: { from?: string; messageId?: string } = {}) {
	const rawEmail = [
		`From: ${options.from ?? "Forum elektronische Rechnung Deutschland <info@awv-net.de>"}`,
		"To: monitoring@example.com",
		`Message-ID: ${options.messageId ?? "<release-123@example.com>"}`,
		"Subject: ZUGFeRD 3.0 released",
		"Date: Fri, 20 Nov 2026 12:00:00 +0000",
		"Content-Type: text/plain; charset=utf-8",
		"",
		"Die ZUGFeRD-Spezifikation 3.0 wurde veröffentlicht.",
	].join("\r\n");
	const bytes = new TextEncoder().encode(rawEmail);

	return {
		from: "info@awv-net.de",
		to: "monitoring@example.com",
		headers: new Headers({
			From:
				options.from ??
				"Forum elektronische Rechnung Deutschland <info@awv-net.de>",
			"Message-ID": options.messageId ?? "<release-123@example.com>",
		}),
		raw: new ReadableStream<Uint8Array>({
			start(controller) {
				controller.enqueue(bytes);
				controller.close();
			},
		}),
		rawSize: bytes.byteLength,
		canBeForwarded: false,
		setReject: vi.fn(),
		forward: vi.fn(),
		reply: vi.fn(),
	} satisfies ForwardableEmailMessage;
}

function makeQueueBatch(body: EmailJobsQueuePayload) {
	const ack = vi.fn();
	const retry = vi.fn();
	return {
		batch: { messages: [{ body, ack, retry }] },
		ack,
		retry,
	};
}

describe("monitoring email flow", () => {
	beforeEach(() => {
		extractUpdate.mockReset();
		createIssue.mockReset();
	});

	it("parses an allowed email, queues it, extracts an update, and creates an issue", async () => {
		const sent: EmailJobsQueuePayload[] = [];
		const emailEnv = {
			EMAIL_JOBS: {
				send: vi.fn(async (payload: EmailJobsQueuePayload) =>
					sent.push(payload),
				),
			},
		};

		await worker.email!(makeEmailMessage(), emailEnv as never, {} as never);

		expect(sent).toHaveLength(1);
		expect(sent[0]).toMatchObject({
			messageId: "<release-123@example.com>",
			from: "info@awv-net.de",
			subject: "ZUGFeRD 3.0 released",
			body: expect.stringContaining(
				"Die ZUGFeRD-Spezifikation 3.0 wurde veröffentlicht.",
			),
		});

		extractUpdate.mockResolvedValueOnce({ output: validUpdate });
		const queue = makeQueueBatch(sent[0]);
		await worker.queue!(
			{ messages: queue.batch.messages } as never,
			{} as never,
			{} as never,
		);

		expect(extractUpdate).toHaveBeenCalledWith(expect.anything(), sent[0]);
		expect(createIssue).toHaveBeenCalledWith(
			"<release-123@example.com>",
			validUpdate,
		);
		expect(queue.ack).toHaveBeenCalledOnce();
		expect(queue.retry).not.toHaveBeenCalled();
	});

	it("does not queue email from a sender outside the allowlist", async () => {
		const send = vi.fn();
		await worker.email!(
			makeEmailMessage({ from: "attacker@example.com" }),
			{ EMAIL_JOBS: { send } } as never,
			{} as never,
		);

		expect(send).not.toHaveBeenCalled();
	});

	it("acknowledges messages that are not updates or below the confidence threshold", async () => {
		const notAnUpdate = { ...validUpdate, isUpdate: false };
		const lowConfidence = { ...validUpdate, confidence: 0.5 };
		extractUpdate
			.mockResolvedValueOnce({ output: notAnUpdate })
			.mockResolvedValueOnce({ output: lowConfidence });

		for (const _update of [notAnUpdate, lowConfidence]) {
			const queue = makeQueueBatch({
				messageId: "<release-123@example.com>",
				from: "info@awv-net.de",
				date: null,
				subject: "Announcement",
				body: "An email body",
			});
			await worker.queue!(
				{ messages: queue.batch.messages } as never,
				{} as never,
				{} as never,
			);

			expect(queue.ack).toHaveBeenCalledOnce();
			expect(queue.retry).not.toHaveBeenCalled();
		}

		expect(createIssue).not.toHaveBeenCalled();
	});

	it("retries the queue message when extraction or issue creation fails", async () => {
		const payload: EmailJobsQueuePayload = {
			messageId: "<release-123@example.com>",
			from: "info@awv-net.de",
			date: null,
			subject: "Announcement",
			body: "An email body",
		};
		extractUpdate.mockRejectedValueOnce(new Error("AI unavailable"));
		const queue = makeQueueBatch(payload);

		await worker.queue!(
			{ messages: queue.batch.messages } as never,
			{} as never,
			{} as never,
		);

		expect(queue.ack).not.toHaveBeenCalled();
		expect(queue.retry).toHaveBeenCalledWith({ delaySeconds: 60 * 60 * 3 });

		extractUpdate.mockResolvedValueOnce({ output: validUpdate });
		createIssue.mockRejectedValueOnce(new Error("GitHub unavailable"));
		const issueQueue = makeQueueBatch(payload);

		await worker.queue!(
			{ messages: issueQueue.batch.messages } as never,
			{} as never,
			{} as never,
		);

		expect(issueQueue.ack).not.toHaveBeenCalled();
		expect(issueQueue.retry).toHaveBeenCalledWith({
			delaySeconds: 60 * 60 * 3,
		});
	});

	it("ignores emails missing required headers", async () => {
		const send = vi.fn();
		for (const message of [
			makeEmailMessage({ from: "" }),
			makeEmailMessage({ messageId: "" }),
		]) {
			await worker.email!(
				message,
				{ EMAIL_JOBS: { send } } as never,
				{} as never,
			);
		}

		expect(send).not.toHaveBeenCalled();
	});
});
