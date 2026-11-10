import { basic } from "@node-zugferd/basic";
import { simpleData } from "@node-zugferd-test/test-utils/basic/valid/simple.js";
import { benchProfile } from "../../factory";

benchProfile(basic, {
	small: {
		input: simpleData,
	},
});
