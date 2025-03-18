const fs = require("fs/promises");
const path = require("path");

const main = async ([filePath]) => {
  if (!filePath) {
    throw new Error("Missing argument `path`");
  }

  const file = await fs.readFile(path.resolve(process.cwd(), filePath));
  const data = JSON.parse(file.toString("utf-8"));

  const mappedData = data["daten"].map(([code, name, description]) => {
    const formattedCode = JSON.stringify(code);
    const formattedName = !!name ? JSON.stringify(name) : "undefined";
    const formattedDescription = !!description
      ? JSON.stringify(description)
      : "undefined";

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
\t},`;
  });

  await fs.writeFile(
    "./packages/node-zugferd/src/codelists/generated/untdid.5305.ts",
    `export type Untdid5305Definition = {
\tcode: string;
\tname?: string;
\tdescription?: string;
};

export type Untdid5305Code = (typeof UNTDID_5305)[number]["code"];

/**
 * Generated by ${"`"}scripts/untdid.5305.js${"`"} on ${new Date().toUTCString()}
 * 
 * @see https://www.xrepository.de/details/urn:xoev-de:kosit:codeliste:untdid.5305
 */
export const UNTDID_5305 = [${mappedData.join("")}${
      mappedData.length > 0 ? "\n" : ""
    }] as const satisfies Untdid5305Definition[];
`
  );
};

void main(process.argv.slice(2));
