import 'config/lang/form.ts'
import { InferType, date, object, string } from 'yup'

const schema = object().shape({
	name: string().notRequired(),
	lastName: string().notRequired(),
	email: string().email().notRequired(),
	password: string().notRequired(),
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
	birthday: date().required()
})

export default schema

export type FormData = InferType<typeof schema>
