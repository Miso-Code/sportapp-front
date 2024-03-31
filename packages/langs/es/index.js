import es from './es.json'
import validations from './validations.json'
import register from './register.json'
import form from './form.json'

const defaultTranslate = {
	translation: {
		...es,
		validations,
		register,
		form
	}
}

export default defaultTranslate
