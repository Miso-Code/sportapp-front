import 'config/lang/form.ts'
import { InferType, boolean, date, object, string } from 'yup'

export const virtualAppointmentSchema = object().shape({
	date: date().required(),
	training: string().required(),
	description: string().required(),
	type: boolean().required(),
	address: string().when('type', {
		is: false,
		then: () => string().required()
	})
})

export type FormVirtualAppointmentData = InferType<
	typeof virtualAppointmentSchema
>
