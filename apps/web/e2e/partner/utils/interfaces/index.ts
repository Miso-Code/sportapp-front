export interface Partner {
	email: string
	password: string
	companyName: string
	products: Products[]
}

export interface Products {
	category: string
	name: string
	url: string
	price: string
	paymentType: string
	mediaShow: string
	imageUrl: string
	summary: string
	description: string
	sport: string
}
