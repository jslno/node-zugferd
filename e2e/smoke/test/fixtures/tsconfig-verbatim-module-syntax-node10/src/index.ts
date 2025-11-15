import { MINIMUM } from "@node-zugferd/minimum";
import { MINIMUM_Buchungshilfe } from "@node-zugferd/test-utils/invoices/valid/MINIMUM_Buchungshilfe";
import { createZugferd } from "node-zugferd";

export const zugferd = createZugferd({
	profile: MINIMUM,
});

zugferd.create(MINIMUM_Buchungshilfe).toXML().catch();
