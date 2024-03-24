module.exports = {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
					'/^foo-/'
				]
			}
		],
		'media-feature-range-notation': 'prefix',
		'declaration-block-no-redundant-longhand-properties': [
			true,
			{
				ignoreShorthands: ['/^grid.*/']
			}
		]
	}
}
