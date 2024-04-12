import 'config/lang/form.ts'
import { InferType, array, number, object, string } from 'yup'

export const schemaBase = object().shape({
	favouriteSportId: number(),
	trainingObjective: string(),
	trainingFrequency: string(),
	weight: number(),
	height: number(),
	availableTrainingHoursPerWeek: number(),
	limitations: array().of(string()),
	imc: number()
})

export const schemaRequired = object().shape({
	favouriteSportId: number().required(),
	trainingObjective: string().required(),
	trainingFrequency: string().required(),
	weight: number().required(),
	height: number().required(),
	availableTrainingHoursPerWeek: number().required(),
	limitations: array().of(string()).required(),
	imc: number()
})

export type FormDataBase = InferType<typeof schemaBase>
export type FormDataRequired = InferType<typeof schemaRequired>
