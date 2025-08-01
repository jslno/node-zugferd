const fs = require("fs/promises");
const { Biome } = require("@biomejs/js-api/nodejs");
const { toScreamingSnakeCase } = require("../utils");

const source =
  "https://www.xrepository.de/api/xrepository/urn:xoev-de:kosit:codeliste:icd_5/download/ICD_5.json";

const main = async () => {
  console.info(
    `
Updating ISO 6523
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
  const mappedData = data["daten"].map(([code, name, description]) => {
    const formattedCode = JSON.stringify(code);
    const formattedName = name !== null ? JSON.stringify(name) : "undefined";
    const formattedDescription =
      description !== null ? JSON.stringify(description) : "undefined";

    return `{ key:${JSON.stringify(toScreamingSnakeCase(name))}, code:${formattedCode}, name:${formattedName}, description:${formattedDescription}, },`;
  });

  const biome = new Biome();
  const { projectKey } = biome.openProject(".");

  const content = `/**
 * Generated by ${"`"}scripts/iso.6523/update.js${"`"} on ${new Date().toUTCString()}
 * 
 * @see https://www.xrepository.de/details/urn:xoev-de:kosit:codeliste:icd_5
 */

import { createEnum } from "..";

export type Iso6523Definition = {
  key: string;
  code: string;
  name: string;
  description?: string;
};

export type Iso6523Code = (typeof ISO_6523)[number]["code"];

export const ISO_6523_IDENTIFIER = "${identifier}" as const;
export const ISO_6523_VERSION = "${version}" as const;

export const ISO_6523 = [${mappedData.join("")}${
    mappedData.length > 0 ? "\n" : ""
  }] as const satisfies Iso6523Definition[];

export const Iso6523 = createEnum(ISO_6523, {
  keyProp: "key",
  valueProp: "code",
});
`;

  const filename = "6523.gen.ts";

  await fs.writeFile(
    `./packages/node-zugferd/src/codelists/iso/${filename}`,
    biome.formatContent(projectKey, content, { filePath: filename }).content
  );

  console.log(`Finished Updating ISO 6523`);
};

void main();