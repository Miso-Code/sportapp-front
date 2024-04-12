import 'react-native'

jest.mock('react-i18next', () => ({
	useTranslation: () => {
		return {
			t: (str: string) => str,
			i18n: {
				changeLanguage: () => new Promise(() => {})
			}
		}
	},
	initReactI18next: {
		type: '3rdParty',
		init: () => {}
	}
}))

global.console = {
	...console,
	// uncomment to ignore a specific log level
	// log: jest.fn(),
	debug: jest.fn(),
	info: jest.fn(),
	// warn: jest.fn(),
	error: jest.fn()
}
