import type { ProjectReflection } from "typedoc";
import { Application, TSConfigReader } from "typedoc";

export async function parseEntryPoints(options: {
	name: string;
	entryPoints: string[];
	tsconfig: string;
}): Promise<ProjectReflection> {
	const app = await Application.bootstrap(
		{
			name: options.name,
			entryPoints: options.entryPoints.map(toTypeDocPath),
			tsconfig: toTypeDocPath(options.tsconfig),
			skipErrorChecking: true,
			excludeInternal: true,
			excludePrivate: true,
			alwaysCreateEntryPointModule: true,
			readme: "none",
			logLevel: "Warn",
		},
		[new TSConfigReader()],
	);

	// Project references can pull entry files into another program (for example a
	// test tsconfig that includes the same src). TypeDoc then no longer sees them.
	app.options.setCompilerOptions(
		app.options.getFileNames(),
		app.options.getCompilerOptions(app.logger),
		[],
	);

	const project = await app.convert();
	if (!project) {
		throw new Error(`TypeDoc could not parse ${options.name}`);
	}
	return project;
}

function toTypeDocPath(filePath: string) {
	return filePath.replaceAll("\\", "/");
}
