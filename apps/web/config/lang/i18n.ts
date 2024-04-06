import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@sportapp/langs/en'
import es from '@sportapp/langs/es'

const resources = {
	en,
	es
}

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources,
	lng: 'es',
	debug: true,
	interpolation: {
		// not needed for react as it escapes by default
		escapeValue: false
	}
})

export default { i18n }
