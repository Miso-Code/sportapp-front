import { LocaleObject, setLocale, defaultLocale } from 'yup'

const yupLocale: LocaleObject = {
	...defaultLocale,
	mixed: {
		...defaultLocale.mixed,
		default: 'validations.invalid',
		required: 'validations.required'
	},
	string: {
		...defaultLocale.string,
		email: 'validations.email'
	}
}

setLocale(yupLocale)
