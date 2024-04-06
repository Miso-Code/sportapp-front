import { InferType, object, string } from 'yup'
import 'config/lang/form.ts'

const schema = object().shape({
	name: string().required(),
	lastName: string().required(),
	email: string().email().required(),
	password: string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			'validations.password.restrictions'
		)
		.required()
})

export default schema

export type FormData = InferType<typeof schema>
