import type { ZugferdProfile } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import type { PDFDocument } from "pdf-lib";

const escapeXml = (value: string) => {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
};

export const buildXmp = (
	doc: PDFDocument,
	{
		extensionSchema: {
			uri = "urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#",
			namespace = "fx",
			fieldNameMap = {
				type: "DocumentType",
				fileName: "DocumentFileName",
				version: "Version",
				conformanceLevel: "ConformanceLevel",
			},
			...extensionSchema
		},
	}: ZugferdProfile,
	config?:
		| {
				type?: string | undefined;
		  }
		| undefined,
) => {
	const xmp = `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
    <x:xmpmeta xmlns:x="adobe:ns:meta/">
      <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
        <rdf:Description xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/" rdf:about="">
          <pdfaid:part>3</pdfaid:part>
          <pdfaid:conformance>B</pdfaid:conformance>
        </rdf:Description>

        <rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/" rdf:about="">
          <dc:format>application/pdf</dc:format>
          <dc:title>
            <rdf:Alt>
              <rdf:li xml:lang="x-default">
                ${escapeXml(doc.getTitle() || "")}
              </rdf:li>
            </rdf:Alt>
          </dc:title>
          <dc:creator>
            <rdf:Seq>
              <rdf:li>
                ${escapeXml(doc.getAuthor() || "")}
              </rdf:li>
            </rdf:Seq>
          </dc:creator>
        </rdf:Description>

        <rdf:Description xmlns:pdf="http://ns.adobe.com/pdf/1.3/" rdf:about="">
          <pdf:Producer>
            ${escapeXml(doc.getProducer() || "")}
          </pdf:Producer>
          <pdf:PDFVersion>1.7</pdf:PDFVersion>
        </rdf:Description>

        <rdf:Description xmlns:xmp="http://ns.adobe.com/xap/1.0/" rdf:about="">
          <xmp:CreatorTool>
            ${escapeXml(doc.getCreator() || `node-zugferd@v${NODE_ZUGFERD_VERSION || "1.0.0"} <https://github.com/jslno/node-zugferd>`)}
          </xmp:CreatorTool>
          <xmp:CreateDate>
            ${(doc.getCreationDate() ?? new Date()).toISOString().split(".")[0] + "Z"}
          </xmp:CreateDate>
          <xmp:ModifyDate>
            ${(doc.getModificationDate() ?? new Date()).toISOString().split(".")[0] + "Z"}
          </xmp:ModifyDate>
        </rdf:Description>

        <rdf:Description xmlns:${escapeXml(namespace)}="${escapeXml(uri)}" rdf:about="">
          ${Object.entries(fieldNameMap)
						.map(([key, nodeName]) => {
							let value = extensionSchema[key as keyof typeof extensionSchema];
							if (!value) return "";
							if (key === "type" && Array.isArray(value)) {
								value = (config?.type ?? value[0]) as any;
							}
							return `<${escapeXml(namespace)}:${escapeXml(nodeName)}>${escapeXml(`${value}`)}</${escapeXml(namespace)}:${escapeXml(nodeName)}>`;
						})
						.join("\n")}
        </rdf:Description>
      </rdf:RDF>
    </x:xmpmeta>
    <?xpacket end="w"?>`.trim();

	return xmp;
};
