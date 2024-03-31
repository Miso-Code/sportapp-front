import { LocaleObject, setLocale, defaultLocale } from 'yup'

const yupLocale: LocaleObject = {
	...defaultLocale,
	mixed: {
		...defaultLocale.mixed,
		default: 'validations.invalid',
		required: 'validations.required'
	}
}

setLocale(yupLocale)
