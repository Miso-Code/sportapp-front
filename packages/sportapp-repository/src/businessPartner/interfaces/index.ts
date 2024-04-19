export interface Product {
	product_id: string
	business_partner_id: string
	category: string
	name: string
	url: string
	price: number
	payment_type: string
	payment_frequency: string
	image_url: string
	description: string
	sumary: string
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
