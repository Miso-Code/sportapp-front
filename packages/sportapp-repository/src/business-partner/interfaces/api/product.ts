import { AxiosRequestConfig } from 'axios'

export interface ProductGetRequestPayload {
	options: AxiosRequestConfig
	params: {
		offset: number
		limit: number
	}
}

export interface Product {
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
