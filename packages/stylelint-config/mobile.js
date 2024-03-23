module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-react-native'],
	rules: {
		'react-native/css-property-no-unknown': true
	},
	ignoreFiles: ['**/coverage/**']
}
