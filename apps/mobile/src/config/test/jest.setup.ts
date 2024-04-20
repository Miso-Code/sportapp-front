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

jest.mock('@react-native-async-storage/async-storage', () =>
	require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
