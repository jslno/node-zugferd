import { assign } from "../../../utils/assign";
import { ZugferdBuilder } from "../../builder";

export const getExchangedDocument = ZugferdBuilder.createGroup(
	(builder, { input }) => {
		builder
			.assign("ram:ID", input.document?.number)
			.assign("ram:TypeCode", input.document?.typeCode)
			.assign(
				"ram:IssueDateTime/udt:DateTimeString",
				{
					"#": input.document!.issueDate,
					"@format": "102",
				},
				{
					condition: input.document?.issueDate !== undefined,
				},
			)
			.assign(
				"ram:IncludeNote",
				input.document?.includedNotes?.map(
					(note: Record<string, any> | undefined) => {
						const out: Record<string, any> = {};

						assign(out, "ram:Content", note?.content);
						assign(out, "ram:SubjectCode", note?.subjectCode);

						return out;
					},
				),
				{
					minProfile: "basic-wl",
					condition:
						input.document?.includedNotes?.length &&
						input.document.includedNotes.length > 0,
				},
			);
	},
);
