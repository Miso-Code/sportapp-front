import en from './en.json'
import validations from './validations.json'
import register from './register.json'
import form from './form.json'

const defaultTranslate = {
	translation: {
		...en,
		validations,
		register,
		form
	}
}

export default defaultTranslate
