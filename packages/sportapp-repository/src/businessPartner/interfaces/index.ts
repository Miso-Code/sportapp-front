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
