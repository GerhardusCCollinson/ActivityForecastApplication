import * as esbuild from 'esbuild'

await esbuild.build({
	entryPoints: ['src/index.ts'],
	format: 'cjs',
	bundle: true,
	platform: 'node',
	treeShaking: true,
	target: ['node20.4'],
	outfile: './dist/index.cjs',
})

