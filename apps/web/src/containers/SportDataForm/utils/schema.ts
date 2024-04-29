import 'config/lang/form.ts'
import { InferType, array, number, object, string } from 'yup'

export const schemaBase = object().shape({
	favouriteSportId: string(),
	trainingObjective: string(),
	weight: number(),
	height: number(),
	weekdays: array().of(string()),
	preferedTrainingStartTime: string(),
	availableTrainingHoursPerDay: number(),
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
	weight: number().required(),
	height: number().required(),
	weekdays: array().of(string()).min(1).required(),
	preferedTrainingStartTime: string().required(),
	availableTrainingHoursPerDay: number().min(1).max(24).required(),
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
