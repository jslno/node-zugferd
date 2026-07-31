import { convert } from "xmlbuilder2";
import type {
	XMLSerializedAsObject,
	XMLSerializedAsObjectArray,
} from "xmlbuilder2/lib/interfaces";

type XPathPredicate =
	| {
			type: "equals-literal";
			left: string;
			right: string;
	  }
	| {
			type: "equals-path";
			left: string;
			right: string;
	  };

export type XPathMethods = {
	querySelectorAll: <T = unknown>(selector: string) => XPathNode<T>[];
	querySelector: <T = unknown>(selector: string) => XPathNode<T> | null;
};

export type XPathNode<T = unknown> = {
	original: T;
} & (T extends string | XMLSerializedAsObject | XMLSerializedAsObjectArray
	? XPathMethods
	: unknown extends T
		? XPathMethods
		: {});

const createXPathNode = <T>(original: T): XPathNode<T> => {
	if (
		typeof original === "string" ||
		(original && typeof original === "object") ||
		Array.isArray(original)
	) {
		return {
			original,
			...createXPath(
				original as string | XMLSerializedAsObject | XMLSerializedAsObjectArray,
			),
		} as any;
	}

	return { original } as any;
};

export const createXPath = (
	input: string | XMLSerializedAsObject | XMLSerializedAsObjectArray,
): XPathMethods => {
	let xml: XMLSerializedAsObject | XMLSerializedAsObjectArray;
	try {
		xml =
			typeof input === "string" ? convert(input, { format: "object" }) : input;
	} catch {
		return {} as XPathMethods;
	}

	const parseSegment = (s: string) => {
		const match = s.match(/^([^\[]+)(?:\[(.+)\])?$/);

		if (!match) return { tag: s, predicate: null };

		return {
			tag: match[1],
			predicate: match[2] ? parsePredicate(match[2]) : null,
		};
	};

	const parsePredicate = (input: string): XPathPredicate => {
		const match = input.match(/^(.+?)\s*=\s*(.+)$/);
		if (!match) throw new Error(input);

		const left = match[1]?.trim();
		const right = match[2]?.trim();

		if (!left || !right) throw new Error(input);

		const literal = right.match(/^(['"])(.*)\1$/);

		if (literal?.[2]) {
			return {
				type: "equals-literal",
				left,
				right: literal[2],
			};
		}

		return {
			type: "equals-path",
			left,
			right,
		};
	};

	const getValue = (v: unknown): string => {
		if (v == null) return "";
		if (typeof v === "string") return v;
		if (typeof v === "number" || typeof v === "boolean") return String(v);

		if (typeof v === "object") {
			const obj = v as Record<string, unknown>;
			if (obj["#"] != null) return String(obj["#"]);
		}

		return String(v);
	};

	const valuesEqual = (left: string, right: string): boolean => {
		if (left === right) return true;

		const leftNum = Number(left);
		const rightNum = Number(right);

		if (
			left !== "" &&
			right !== "" &&
			!Number.isNaN(leftNum) &&
			!Number.isNaN(rightNum)
		) {
			return leftNum === rightNum;
		}

		return false;
	};

	const splitPath = (selector: string): string[] => {
		const parts: string[] = [];
		let current = "";
		let bracketDepth = 0;

		for (const char of selector.replace(/^\//, "")) {
			if (char === "[") bracketDepth++;
			if (char === "]") bracketDepth--;

			if (char === "/" && bracketDepth === 0) {
				parts.push(current);
				current = "";
			} else {
				current += char;
			}
		}

		if (current) parts.push(current);

		return parts;
	};

	const evalPath = (node: unknown, path: string): unknown => {
		let cur = node;

		const parts = path.split("/");

		for (const p of parts) {
			if (!cur || typeof cur !== "object") return undefined;
			cur = (cur as Record<string, unknown>)[p];
		}

		return cur;
	};

	const resolve = (node: unknown, parts: string[]): unknown[] => {
		let current: unknown[] = [node];

		for (const raw of parts) {
			const { tag, predicate } = parseSegment(raw);
			const next: unknown[] = [];

			if (!tag) throw new Error(`Invalid tag in segment: ${raw}`);

			for (const item of current) {
				if (!item || typeof item !== "object") continue;

				const obj = item as Record<string, unknown>;
				const value = obj[tag];

				const candidates = Array.isArray(value) ? value : [value];

				for (const c of candidates) {
					if (c == null) continue;

					if (!predicate) {
						next.push(c);
						continue;
					}

					const left = getValue(evalPath(c, predicate.left));

					if (predicate.type === "equals-literal") {
						if (valuesEqual(left, predicate.right)) next.push(c);
					} else {
						const right = getValue(evalPath(c, predicate.right));
						if (valuesEqual(left, right)) next.push(c);
					}
				}
			}

			current = next;
		}

		return current;
	};

	return {
		querySelectorAll<T = unknown>(selector: string): XPathNode<T>[] {
			return resolve(xml, splitPath(selector)).map((original) =>
				createXPathNode<T>(original as T),
			) as XPathNode<T>[];
		},
		querySelector<T = unknown>(selector: string): XPathNode<T> | null {
			return this.querySelectorAll<T>(selector)[0] ?? null;
		},
	};
};
