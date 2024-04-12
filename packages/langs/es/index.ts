import errors from './errors.json'
import es from './es.json'
import form from './form.json'
import login from './login.json'
import navbar from './navbar.json'
import nutritionalDataForm from './nutritionalDataForm.json'
import personalDataForm from './personalDataForm.json'
import profile from './profile.json'
import register from './register.json'
import sportDataForm from './sportDataForm.json'
import validations from './validations.json'

const defaultTranslate = {
	translation: {
		...es,
		validations,
		register,
		form,
		login,
		errors,
		profile,
		personalDataForm,
		navbar,
		sportDataForm,
		nutritionalDataForm
	}
}

export default defaultTranslate
