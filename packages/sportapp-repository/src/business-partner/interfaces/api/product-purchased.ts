import { AxiosRequestConfig } from 'axios'

export interface ProductPurchasedRequestPayload {
	options: AxiosRequestConfig
	params: {
		offset: number
		limit: number
	}
}

export interface ProductPurchased {
	product_transaction_id: string
	product_id: string
	user_id: string
	user_name: string
	user_email: string
	transaction_date: string
	transaction_status: string
	product_data: ProductData
}

export interface ProductData {
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
