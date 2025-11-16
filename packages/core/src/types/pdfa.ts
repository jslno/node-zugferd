import type { PDFDocument } from "@cantoo/pdf-lib";
import type { Profile } from "../profile";
import type { Awaitable } from "./helper";

type Metadata = {
	subject: string;
	creator?: string | undefined;
	producer?: string | null | undefined;
};

export type ToPDFaOptions<P extends Profile = Profile> = {
	metadata: Metadata | ((input: P["$Input"]) => Awaitable<Metadata>);
	additionalFiles?: File[] | undefined;
};

export type PDFaDocument = Omit<
	PDFDocument,
	| "setCreator"
	| "setProducer"
	| "setSubject"
	| "setCreationDate"
	| "setModificationDate"
	| "attach"
>;
