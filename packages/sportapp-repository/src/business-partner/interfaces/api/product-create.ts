import { AxiosRequestConfig } from 'axios'

type BaseProductCreateRequest = {
	category: string
	name: string
	summary: string
	url: string
	price: number
	payment_type: string
	payment_frequency?: string
	description: string
}

export type WithBase64Image = BaseProductCreateRequest & {
	image_base64: string
	image_url?: never
}
export type WithUrlImage = BaseProductCreateRequest & {
	image_base64?: never
	image_url: string
}

export type ProductCreateRequest = WithBase64Image | WithUrlImage

export interface ProductCreateRequestPayload {
	product: ProductCreateRequest
	options: AxiosRequestConfig
}

export interface ProductCreateResponse {
	product_id: string
	business_partner_id: string
	category: string
	name: string
	summary: string
	url: string
	price: number
	payment_type: string
	payment_frequency: string
	image_url: string
	description: string
	active: boolean
}
