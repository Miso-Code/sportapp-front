import es from './es.json'
import validations from './validations.json'
import register from './register.json'
import form from './form.json'
import errors from './errors.json'

const defaultTranslate = {
	translation: {
		...es,
		validations,
		register,
		form,
		errors
	}
}

export default defaultTranslate
