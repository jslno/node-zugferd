import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const transport = [
	{
		value: "0",
		name: "Transport mode not specified",
		description:
			"Transport mode has not been specified\nNotes:\n1) This code can be used when the mode is not known or when information on it is not available at the time of issuing the document concerned.",
		key: "TRANSPORT_MODE_NOT_SPECIFIED",
	},
	{
		value: "1",
		name: "Maritime transport",
		description: "Transport of goods and/or persons is by sea.",
		key: "MARITIME_TRANSPORT",
	},
	{
		value: "2",
		name: "Rail transport",
		description: "Transport of goods and/or persons is by rail.",
		key: "RAIL_TRANSPORT",
	},
	{
		value: "3",
		name: "Road transport",
		description: "Transport of goods and/or persons is by road.",
		key: "ROAD_TRANSPORT",
	},
	{
		value: "4",
		name: "Air transport",
		description: "Transport of goods and/or persons is by air.",
		key: "AIR_TRANSPORT",
	},
	{
		value: "5",
		name: "Mail",
		description:
			"Method to convey goods is by mail\nNotes:\n1) This code is provided for practical reasons, despite the fact that mail is not a genuine mode of transport. In many countries, the value of merchandise exported and imported by mail is considerable, but the exporter or importer concerned would be unable to state by which mode postal items had been conveyed.",
		key: "MAIL",
	},
	{
		value: "6",
		name: "Multimodal transpo",
		description:
			"Method to convey goods and/or persons is by multimodal transport.\nNotes:\n1) This code is provided for practical reasons, despite the fact that multimodal transport is not a genuine mode of transport. It can be used when goods are carried by at least two different modes from a place at which the goods are taken in charge by a transport operator to a place designated for delivery, on the basis of one transport contract. (Operations of pick-up and delivery of goods carried out in the performance of a single mode of transport, as defined in such a contract, shall not be considered as multimodal transport).",
		key: "MULTIMODAL_TRANSPO",
	},
	{
		value: "7",
		name: "Fixed transport installation",
		description:
			"Transport of item is via a fixed transport installation.\nNotes:\n1) This code applies to installations for continuous transport such as pipelines, ropeways and electric power lines.",
		key: "FIXED_TRANSPORT_INSTALLATION",
	},
	{
		value: "8",
		name: "Inland water transport",
		description: "Transport of goods and/or persons is by inland water.",
		key: "INLAND_WATER_TRANSPORT",
	},
	{
		value: "9",
		name: "Transport mode not applicable",
		description: "The mode of transport is not applicable.",
		key: "TRANSPORT_MODE_NOT_APPLICABLE",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		transport: typeof transport;
	}
}
registerCodelist("transport", transport);

export default transport;
