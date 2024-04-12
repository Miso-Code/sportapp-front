import 'config/lang/form.ts'
import { InferType, array, object, string } from 'yup'

export const schemaBase = object().shape({
	allergyType: array().of(string()),
	foodPreferences: string()
})

export const schemaRequired = object().shape({
	allergyType: array().of(string()).required(),
	foodPreferences: string().required()
})

export type FormDataBase = InferType<typeof schemaBase>
export type FormDataRequired = InferType<typeof schemaRequired>
