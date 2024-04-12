import en from './en.json'
import errors from './errors.json'
import form from './form.json'
import login from './login.json'
import navbar from './navbar.json'
import nutritionalDataForm from './nutritionalDataForm.json'
import personalDataForm from './personalDataForm.json'
import profile from './profile.json'
import register from './register.json'
import sportDataForm from './sportDataForm.json'
import validations from './validations.json'
import training from './training.json'
import session from './session.json'

const defaultTranslate = {
	translation: {
		...en,
		validations,
		register,
		form,
		login,
		errors,
		profile,
		navbar,
		personalDataForm,
		sportDataForm,
		nutritionalDataForm,
		training,
		session
	}
}

export default defaultTranslate
