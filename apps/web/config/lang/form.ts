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
		max: 'validations.max.string',
		url: 'validations.url'
	},
	array: {
		...defaultLocale.array,
		min: 'validations.min.string',
		max: 'validations.max.string'
	},
	number: {
		...defaultLocale.number,
		min: 'validations.min.string',
		max: 'validations.max.string',
		positive: 'validations.positive'
	},
	date: {
		...defaultLocale.date,
		min: 'validations.min.date',
		max: 'validations.max.date'
	}
}

setLocale(yupLocale)
