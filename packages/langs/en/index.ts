import config from './config.json'
import en from './en.json'
import errors from './errors.json'
import form from './form.json'
import login from './login.json'
import navbar from './navbar.json'
import nutritionalDataForm from './nutritionalDataForm.json'
import personalDataForm from './personalDataForm.json'
import profile from './profile.json'
import register from './register.json'
import session from './session.json'
import sportDataForm from './sportDataForm.json'
import training from './training.json'
import validations from './validations.json'
import productService from './productService.json'
import productCreate from './productCreate.json'
import productObtain from './productObtain.json'
import productUpdate from './productUpdate.json'
import paymentPlans from './paymentPlans.json'
import motivation from './motivation.json'
import paymentPurchased from './paymentPurchased.json'
import preference from './preference.json'
import language from './language.json'
import otherService from './otherService.json'
import nutritionalPlan from './nutritionalPlan.json'

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
		session,
		config,
		productService,
		productCreate,
		productObtain,
		productUpdate,
		paymentPlans,
		motivation,
		paymentPurchased,
		preference,
		language,
		otherService,
		nutritionalPlan
	}
}

export default defaultTranslate
