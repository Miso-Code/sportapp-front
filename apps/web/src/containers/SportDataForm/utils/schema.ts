import 'config/lang/form.ts'
import { InferType, array, number, object, string } from 'yup'

export const schemaBase = object().shape({
	favouriteSportId: string(),
	trainingObjective: string(),
	trainingFrequency: string(),
	weight: number(),
	height: number(),
	availableTrainingHoursPerWeek: number(),
	limitations: array().of(
		object().shape({
			description: string().required(),
			name: string().required(),
			limitation_id: string().notRequired()
		})
	),
	imc: number()
})

export const schemaRequired = object().shape({
	favouriteSportId: string().required(),
	trainingObjective: string().required(),
	trainingFrequency: string().required(),
	weight: number().required(),
	height: number().required(),
	availableTrainingHoursPerWeek: number().required(),
	limitations: array()
		.of(
			object().shape({
				description: string().required(),
				name: string().required(),
				limitation_id: string().notRequired()
			})
		)
		.required(),
	imc: number()
})

export type FormDataBase = InferType<typeof schemaBase>
export type FormDataRequired = InferType<typeof schemaRequired>
