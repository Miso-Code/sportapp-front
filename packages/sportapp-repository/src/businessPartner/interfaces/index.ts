export interface Product {
	product_id: string
	business_partner_id: string
	category:
		| 'equipement'
		| 'apparel'
		| 'nutrition'
		| 'training_services'
		| 'wellness'
		| 'sports_technology'
		| 'medical_services'
	name: string
	url: string
	price: number
	payment_type: 'unique' | 'periodic'
	payment_frequency:
		| 'other'
		| 'weekly'
		| 'monthly'
		| 'annually'
		| 'bi_annually'
		| 'quarterly'
	image_url: string
	description: string
	summary: string
	active: boolean
}

export interface PaginatedRequest {
	limit: number
	offset: number
}

export interface SearchRequest {
	search?: string
}

export interface ProductRequest extends PaginatedRequest, SearchRequest {}

export interface PurchaseProductRequest {
	user_name: string
	user_email: string
	payment_data: {
		card_number: string
		card_holder: string
		card_expiration_date: string
		card_cvv: string
		amount: number
	}
	product_id: string
}

export interface PurchaseProductResponse {
	transaction_id: string
	transaction_status: 'failed' | 'completed'
	transaction_date: string
	message: string
}
