import fullRegisterSchema from '@/containers/Register/Full/utils/schema'
import 'config/lang/form.ts'
import { InferType, object, string } from 'yup'

const personalDataDefaultSchema = object().shape({
	password: string().notRequired(),
	name: string().required(),
	lastName: string().required(),
	email: string().email().required()
})

const personalDataSchema = fullRegisterSchema.concat(personalDataDefaultSchema)

export default personalDataSchema

export type FormData = InferType<typeof personalDataSchema>
