import '@testing-library/jest-dom'

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

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => jest.fn(),
	useLocation: () => ({
		pathname: '/'
	})
}))

jest.mock('@uiw/react-md-editor', () => ({
	__esModule: true,
	default: () => 'MD_EDITOR'
}))

jest.mock('rehype-sanitize', () => ({
	__esModule: true,
	default: jest.fn()
}))

const mockGeolocation = {
	getCurrentPosition: jest.fn().mockImplementation((success) =>
		Promise.resolve(
			success({
				coords: {
					latitude: 10,
					longitude: 10
				}
			})
		)
	)
}

// @ts-ignore
global.navigator.geolocation = mockGeolocation
