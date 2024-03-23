module.exports = {
	extends: ['@commitlint/config-conventional'],
	parserPreset: {
		parserOpts: {
			issuePrefixes: ['PSA-']
		}
	},
	rules: {
		'references-empty': [2, 'never']
	}
}
