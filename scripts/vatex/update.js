const fs = require("fs/promises");

const source =
  "https://www.xrepository.de/api/xrepository/urn:xoev-de:kosit:codeliste:vatex_1/download/VATEX_1.json";

const main = async () => {
  console.info(
    `
Updating VATEX
from ${source}
`
  );

  const res = await fetch(new URL(source).toString(), {
    method: "GET",
  });

  const data = await res.json();

  if (!data["daten"] || !data["metadaten"]) {
    throw new Error("Invalid response");
  }

  const identifier = data["metadaten"]["kennungInhalt"];
  const version = data["metadaten"]["version"];
  const mappedData = data["daten"].map(([code, name, description, remark]) => {
    const formattedCode = JSON.stringify(code);
    const formattedName = name !== null ? JSON.stringify(name) : "undefined";
    const formattedDescription =
      description !== null ? JSON.stringify(description) : "undefined";
    const formattedRemark =
      remark !== null ? JSON.stringify(remark) : "undefined";

    return `
\t{
\t\tcode:${
      formattedCode.length >= 80 - 8
        ? `\n\t\t\t${formattedCode}`
        : ` ${formattedCode}`
    },
\t\tname:${
      formattedName.length >= 80 - 8
        ? `\n\t\t\t${formattedName}`
        : ` ${formattedName}`
    },
\t\tdescription:${
      formattedDescription.length >= 80 - 15
        ? `\n\t\t\t${formattedDescription}`
        : ` ${formattedDescription}`
    },
\t\tremark:${
      formattedRemark.length >= 80 - 9
        ? `\n\t\t\t${formattedRemark}`
        : ` ${formattedRemark}`
    }
\t},`;
  });

  const content = `/**
 * Generated by ${"`"}scripts/vatex/update.js${"`"} on ${new Date().toUTCString()}
 * 
 * @see https://www.xrepository.de/details/urn:xoev-de:kosit:codeliste:vatex_1
 */

export type VatExDefinition = {
\tcode: string;
\tname?: string;
\tdescription?: string;
\tremark?: string
};

export type VatExCode = (typeof VATEX)[number]["code"];

export const VATEX_IDENTIFIER = "${identifier}" as const;
export const VATEX_VERSION = "${version}" as const;

export const VATEX = [${mappedData.join("")}${
    mappedData.length > 0 ? "\n" : ""
  }] as const satisfies VatExDefinition[];
`;

  await fs.writeFile(`./packages/node-zugferd/src/codelists/vatex.ts`, content);

  console.log(`Finished Updating VATEX`);
};

void main();
