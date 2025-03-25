import type { EndpointContext } from "better-call";
import type { ZugferdApiContext } from "../init";

export type GenericEndpointContext = EndpointContext<string, any> & {
	context: ZugferdApiContext;
};
