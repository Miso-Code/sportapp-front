import en from './en.json'
import validations from './validations.json'
import register from './register.json'
import form from './form.json'
import errors from './errors.json'
import login from './login.json'
import profile from './profile.json'
import navbar from './navbar.json'

const defaultTranslate = {
	translation: {
		...en,
		validations,
		register,
		form,
		login,
		errors,
		profile,
		navbar
	}
}

export default defaultTranslate
