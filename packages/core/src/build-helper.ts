// TODO: move xmlbuilder2 to peer deps
import { fragment } from "xmlbuilder2";
import type { XMLBuilder } from "./types";

export function createBuildHelper() {
	const cache = new Map<string, XMLBuilder>();

	function setCachedNode<Node extends XMLBuilder>(
		id: string | ((node: Node) => string | undefined),
		node: Node,
	): Node;
	function setCachedNode<Node extends XMLBuilder>(
		id: string | ((node: Node) => string | undefined),
		node: Node | undefined,
	): Node | undefined;
	function setCachedNode<Node extends XMLBuilder>(
		id: string | ((node: Node) => string | undefined),
		node: Node | undefined,
	): Node | undefined {
		if (!node) return node;
		const nodeId = typeof id === "function" ? id(node) : id;
		if (nodeId === undefined) return node;
		cache.set(nodeId, node);
		return node;
	}

	const getCachedNode = (id: string): XMLBuilder | undefined => cache.get(id);

	function findNode(
		id: string,
		builder: XMLBuilder,
		fn: Parameters<XMLBuilder["find"]>[0],
	): XMLBuilder | undefined;
	function findNode(
		id: string,
		builder: XMLBuilder,
		fn: Parameters<XMLBuilder["find"]>[0],
		fallback: XMLBuilder | ((fragment: XMLBuilder) => XMLBuilder),
	): XMLBuilder;
	function findNode(
		id: string,
		builder: XMLBuilder,
		fn: Parameters<XMLBuilder["find"]>[0],
		fallback: XMLBuilder | ((fragment: XMLBuilder) => Promise<XMLBuilder>),
	): Promise<XMLBuilder>;
	function findNode(
		id: string,
		builder: XMLBuilder,
		fn: Parameters<XMLBuilder["find"]>[0],
		fallback?:
			| XMLBuilder
			| ((fragment: XMLBuilder) => XMLBuilder | Promise<XMLBuilder>),
	): XMLBuilder | Promise<XMLBuilder> | undefined {
		if (cache.has(id)) {
			return cache.get(id)!;
		}

		const node =
			builder.find(fn) ??
			(typeof fallback === "function" ? fallback(fragment()) : fallback);
		if (node instanceof Promise) {
			return node.then((node) => setCachedNode(id, node));
		} else if (node) {
			return setCachedNode(id, node);
		}
		return undefined;
	}

	function findAllNodes(
		builder: XMLBuilder,
		fn: Parameters<XMLBuilder["filter"]>[0],
	) {
		return builder.filter(fn);
	}

	return {
		setCachedNode,
		getCachedNode,
		findNode,
		findAllNodes,
	};
}

export type BuildHelper = ReturnType<typeof createBuildHelper>;
