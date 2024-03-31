import { object, string } from 'yup'
import baseSchema from 'containers/Register/Default/utils/schema'
import 'config/lang/form.ts'

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
		})
	})
)

export default schema
