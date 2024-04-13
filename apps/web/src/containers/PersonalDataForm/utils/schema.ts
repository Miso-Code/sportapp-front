import defaultRegisterSchema from '@/containers/Register/Default/utils/schema'
import 'config/lang/form.ts'
import { InferType, object, string } from 'yup'

const fullRegisterSchema = object().shape({
	password: string(),
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

const personalDataSchema = defaultRegisterSchema.concat(fullRegisterSchema)

export default personalDataSchema

export type FormData = InferType<typeof personalDataSchema>
