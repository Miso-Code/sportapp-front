import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
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
	debug: true
})

export default i18n
