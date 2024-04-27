import 'config/lang/form.ts'
import { InferType, number, object, string } from 'yup'

export const paymentSchema = object().shape({
	amount: number().min(1).required(),
	number: string().min(16).required(),
	name: string().required(),
	expiry: string().min(5).required(),
	cvc: string().min(3).required()
})

export type FormPaymentData = InferType<typeof paymentSchema>
