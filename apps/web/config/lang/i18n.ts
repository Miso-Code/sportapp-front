import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@sportapp/langs/en.json'
import es from '@sportapp/langs/es.json'

const resources = {
	en,
	es
}

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources,
	lng: 'es'
})

export default { i18n }
