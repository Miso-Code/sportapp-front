import 'react-native'

jest.mock('react-i18next', () => {
	let language = 'en'
	return {
		useTranslation: () => {
			return {
				t: (str: string) => str,
				i18n: {
					language: language,
					changeLanguage: (lang: string) =>
						new Promise((resolve) => {
							language = lang
							resolve(lang)
						})
				}
			}
		},
		initReactI18next: {
			type: '3rdParty',
			init: () => {}
		}
	}
})

jest.mock('@react-native-async-storage/async-storage', () =>
	require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)
