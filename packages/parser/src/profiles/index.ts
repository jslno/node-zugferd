import { basic } from "./basic";
import { basicWL } from "./basic-wl";
import { en16931 } from "./en-16931";
import { extended } from "./extended";
import { minimum } from "./minimum";

export const defaultProfileMap = {
	minimum,
	"basic-wl": basicWL,
	basic,
	"en-16931": en16931,
	extended,
};
