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
		email: 'validations.email',
		min: 'validations.min.string',
		max: 'validations.max.string'
	},
	array: {
		...defaultLocale.array,
		min: 'validations.min.string',
		max: 'validations.max.string'
	},
	number: {
		...defaultLocale.number,
		min: 'validations.min.string',
		max: 'validations.max.string'
	}
}

setLocale(yupLocale)
