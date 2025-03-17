import { init } from "./init";
import { type ZugferdOptions } from "./types/options";
import { createDocumentFactory } from "./document/create";
import { validateDocumentFactory } from "./document/validate";

export const zugferd = <O extends ZugferdOptions>(options: O) => {
	const context = init(options);

	return {
		context,
		create: createDocumentFactory(context, options),
		validate: validateDocumentFactory(context),
	};
};
