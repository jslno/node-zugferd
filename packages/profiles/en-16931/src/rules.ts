import type {
	ZugferdProfileRulesContext,
	ZugferdRuleId,
} from "@node-zugferd/core";

type Ctx = Pick<ZugferdProfileRulesContext, "error">;

const CARD_DIGITS = /^\d{4,6}$/;

export function enforceEn16931Rules(data: unknown, ctx: Ctx): void {
	const debit = readPath(data, ["transaction", "debit"]);
	for (const means of items(readPath(debit, ["paymentMeans"]))) {
		checkPaymentCard(readPath(means, ["cardInfo"]), ctx);
	}

	const documents = items(
		readPath(data, [
			"transaction",
			"contract",
			"additionalSupportingDocuments",
		]),
	);
	for (const document of documents) {
		if (!present(readPath(document, ["issuerAssignedId"]))) {
			fail(
				ctx,
				"BR-52",
				"Each Additional supporting document (BG-24) shall contain a Supporting document reference (BT-122).",
			);
		}
	}
	if (
		documents.reduce<number>(
			(count, document) =>
				count + occurrenceCount(readPath(document, ["name"])),
			0,
		) > 1
	) {
		fail(
			ctx,
			"CII-SR-475",
			"Only one AdditionalReferencedDocument Name BT-123 is allowed with TypeCode 916.",
		);
	}
	if (
		documents.reduce<number>(
			(count, document) =>
				count + occurrenceCount(readPath(document, ["attachedDocument"])),
			0,
		) > 1
	) {
		fail(
			ctx,
			"CII-SR-476",
			"Only one AdditionalReferencedDocument AttachmentBinaryObject BT-125 is allowed with TypeCode 916.",
		);
	}
}

function checkPaymentCard(card: unknown, ctx: Ctx): void {
	if (!isRecord(card)) return;
	const account = present(card.accountNumber);
	if (!account || !CARD_DIGITS.test(account)) {
		fail(
			ctx,
			"BR-51",
			"The last 4 to 6 digits of the Payment card primary account number (BT-87) shall be present if Payment card information (BG-18) is provided in the Invoice.",
		);
	}
}

function occurrenceCount(value: unknown): number {
	if (value == null) return 0;
	if (Array.isArray(value)) {
		return value.reduce((count, item) => count + occurrenceCount(item), 0);
	}
	if (typeof value === "string") return value.trim() === "" ? 0 : 1;
	return 1;
}

function present(value: unknown): string | undefined {
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
	if (typeof value === "string") {
		const trimmed = value.trim();
		return trimmed || undefined;
	}
	if (!isRecord(value)) return undefined;
	if (typeof value.identifier === "string") return present(value.identifier);
	if (typeof value.value === "string" || typeof value.value === "number") {
		return present(value.value);
	}
	return undefined;
}

function items(value: unknown): unknown[] {
	if (value == null) return [];
	return Array.isArray(value) ? value : [value];
}

function readPath(value: unknown, path: string[]): unknown {
	let current = value;
	for (const key of path) {
		if (!isRecord(current)) return undefined;
		current = current[key];
	}
	return current;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return !!value && typeof value === "object" && !Array.isArray(value);
}

function fail(ctx: Ctx, id: ZugferdRuleId, message: string): never {
	throw ctx.error(id, message);
}
