import '@testing-library/jest-dom'

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

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => jest.fn()
}))
