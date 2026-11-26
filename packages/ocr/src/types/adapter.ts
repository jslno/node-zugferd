import type { RunAgentInput } from "@ag-ui/core";
import type { StandardSchemaV1 } from "@standard-schema/spec";

export interface GenerateObjectInput<Schema extends StandardSchemaV1>
	extends RunAgentInput {
	outputSchema: Schema;
}

export interface Adapter {
	id: (string & {}) | "";

	generateObject<Schema extends StandardSchemaV1>(
		input: GenerateObjectInput<Schema>,
	): Promise<StandardSchemaV1.InferOutput<Schema>>;
}
