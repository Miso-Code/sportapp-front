const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		'@react-native',
		'eslint:recommended',
		'prettier',
		'eslint-config-turbo'
	],
	rules: {
		'eslint-comments/no-unlimited-disable': 'off',
		'no-console': 'warn'
	}
}
