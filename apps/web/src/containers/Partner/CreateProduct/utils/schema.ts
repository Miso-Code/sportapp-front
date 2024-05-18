import 'config/lang/form.ts'
import { InferType, mixed, number, object, string } from 'yup'

const schema = object().shape({
	category: string().required(),
	name: string().required(),
	summary: string().required(),
	url: string().url().required(),
	price: number().min(1).required(),
	paymentType: string().required(),
	paymentFrequency: string().when('paymentType', {
		is: 'subscription',
		then: () => string().required()
	}),
	description: string().required(),
	typeImage: string().oneOf(['true', 'false']).required(),
	image_base64: mixed().when('typeImage', {
		is: 'true',
		then: () => mixed().required()
	}),
	imageUrl: string().when('typeImage', {
		is: 'false',
		then: () => string().required()
	}),
	sport_id: string().required()
})

export default schema

export type FormData = InferType<typeof schema>
