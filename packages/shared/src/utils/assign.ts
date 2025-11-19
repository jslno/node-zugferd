import { defu } from "defu";

export type AssignOptions = {
	condition?: boolean | undefined;
	array?: boolean | undefined;
};

export function assign(
	target: Record<string, any>,
	path: string,
	value: unknown,
	options?: AssignOptions | undefined,
) {
	if (
		options?.condition === false ||
		(options?.condition === undefined && value === undefined)
	) {
		return;
	}
	const segments = path.split("/");
	const last = segments.pop();
	if (!last) {
		return;
	}

	let current = target;
	for (const segment of segments) {
		if (!current[segment] || typeof current[segment] !== "object") {
			current[segment] = {};
		}
		current = current[segment];
	}

	if (options?.array === true) {
		const existing = current[last];
		if (Array.isArray(existing)) {
			existing.push(value);
		} else if (existing) {
			current[last] = [existing, value];
		} else {
			current[last] = [value];
		}
		return;
	} else {
		if (typeof current[last] === "object" && typeof value === "object") {
			current[last] = defu(value, current[last]);
		} else {
			current[last] = value;
		}
	}
}
