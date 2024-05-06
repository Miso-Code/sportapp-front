export enum productCategory {
	equipment = 'Equipos',
	apparel = 'Ropa',
	nutrition = 'Nutrición',
	training_services = 'Servicios de entrenamiento',
	wellness = 'Bienestar',
	sports_technology = 'Tecnología deportiva',
	medical_services = 'Servicios médicos'
}

export type ProductCategoryKey = keyof typeof productCategory
export type ProductCategory = `${productCategory}`

export enum productPaymentType {
	unique = 'Pago único',
	periodic = 'Pago periódico'
}

export type ProductPaymentTypeKey = keyof typeof productPaymentType
export type ProductPaymentType = `${productPaymentType}`
