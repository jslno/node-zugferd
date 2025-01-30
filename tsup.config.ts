import { defineConfig } from 'tsup'

export default defineConfig({
	format: ['cjs', 'esm'],
	entry: ['./src/index.ts'],
	publicDir: './src/assets',
	dts: true,
	shims: true,
	skipNodeModulesBundle: true,
	clean: true
})
