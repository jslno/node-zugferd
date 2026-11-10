import { basicWL } from "@node-zugferd/basic-wl";
import { simpleData } from "@node-zugferd-test/test-utils/basic-wl/valid/simple.js";
import { benchProfile } from "../../factory";

benchProfile(basicWL, {
	small: {
		input: simpleData,
	},
});
