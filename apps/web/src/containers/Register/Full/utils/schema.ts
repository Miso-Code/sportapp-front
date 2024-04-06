import 'config/lang/form.ts'
import baseSchema from 'containers/Register/Default/utils/schema'
import { InferType, object, string } from 'yup'

const schema = baseSchema.concat(
	object().shape({
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
)

export default schema

export type FormData = InferType<typeof schema>
