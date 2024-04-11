import 'config/lang/form.ts'
import { InferType, object, string } from 'yup'

const schema = object().shape({
	name: string().required(),
	lastName: string().required(),
	email: string().email().required(),
	password: string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'validations.password.restrictions'
		)
		.required(),
	documentType: string().required(),
	documentNumber: string().required(),
	nationality: object().shape({
		country: string().required(),
		city: string().required()
	}),
	residence: object().shape({
		country: string().required(),
		city: string().required(),
		lengthOfStay: string().required()
	}),
	gender: string().required(),
	birthday: string().required()
})

export default schema

export type FormData = InferType<typeof schema>
