import { basic } from "@node-zugferd/basic";
import { getMetadata } from "@node-zugferd/data-types";
import { minimum } from "@node-zugferd/minimum";

function unwrapSchema(schema) {
	let current = schema;
	while (true) {
		if (current.type === "nullish" && "wrapped" in current) {
			current = current.wrapped;
			continue;
		}
		if ("pipe" in current && Array.isArray(current.pipe)) {
			current = current.pipe[0];
			continue;
		}
		break;
	}
	return current;
}

function isObjectLike(schema) {
	const u = unwrapSchema(schema);
	return u.type === "object" && "entries" in u;
}

function isArrayLike(schema) {
	const u = unwrapSchema(schema);
	return u.type === "array" || u.type === "as_array";
}

function getObjectEntries(schema) {
	const u = unwrapSchema(schema);
	return u.type === "object" && "entries" in u ? u.entries : undefined;
}

function mergeColliding(a, b) {
	if (isArrayLike(b) && isObjectLike(a)) return b;
	if (isArrayLike(a) && isObjectLike(b)) return a;
	const ae = getObjectEntries(a);
	const be = getObjectEntries(b);
	if (ae && be) return { kind: "schema", type: "intersect", options: [a, b] };
	return b;
}

function deepMerge(a, b) {
	const merged = { ...a };
	for (const [k, v] of Object.entries(b)) {
		merged[k] = k in merged ? mergeColliding(merged[k], v) : v;
	}
	return merged;
}

function getChildren(schema) {
	const u = unwrapSchema(schema);
	if (u.type === "intersect" && "options" in u) {
		let merged = {};
		for (const opt of u.options) {
			const c = getChildren(opt);
			if (c) merged = deepMerge(merged, c);
		}
		return Object.keys(merged).length ? merged : undefined;
	}
	return getObjectEntries(schema);
}

function countLeaves(schema) {
	const children = getChildren(schema);
	if (!children) return 1;
	return Object.values(children).reduce((n, v) => n + countLeaves(v), 0);
}

function countWithMetadata(schema) {
	let count = 0;
	const walk = (s) => {
		const md = getMetadata(s);
		if (md.id) count += 1;
		const children = getChildren(s);
		if (children) {
			for (const v of Object.values(children)) walk(v);
			return;
		}
		const u = unwrapSchema(s);
		if (u.type === "array" || u.type === "as_array") walk(u.item);
	};
	walk(schema);
	return count;
}

for (const [name, profile] of [
	["minimum", minimum],
	["basic", basic],
]) {
	const top = getChildren(profile.schema) ?? {};
	console.log(
		`${name}: root=${profile.schema.type}, topKeys=${Object.keys(top).join(",")}, leaves=${countLeaves(profile.schema)}, withMetadata=${countWithMetadata(profile.schema)}`,
	);
}
