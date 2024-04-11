import 'config/lang/form.ts'
import { InferType, number, object, string } from 'yup'

export const schemaBase = object().shape({
	favouriteSportId: number(),
	trainingObjective: string(),
	trainingFrequency: string(),
	weight: number(),
	height: number(),
	availableTrainingHoursPerWeek: number(),
	limitations: string()
})

export const schemaRequired = object().shape({
	favouriteSportId: number().required(),
	trainingObjective: string().required(),
	trainingFrequency: string().required(),
	weight: number().required(),
	height: number().required(),
	availableTrainingHoursPerWeek: number().required(),
	limitations: string().required()
})

export type FormDataBase = InferType<typeof schemaBase>
export type FormDataRequired = InferType<typeof schemaRequired>
