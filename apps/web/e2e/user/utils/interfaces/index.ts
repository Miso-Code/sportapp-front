export interface Limitation {
	name: string
	description: string
}

export interface Sport {
	favoriteSport: string
	trainingObjective: string
	trainingDays: string[]
	trainingHours: number
	weight: number
	height: number
	limitation: Limitation[]
}

export interface Nutritional {
	allergy: string[]
	preference: string
}

export interface User {
	email: string
	password: string
	name: string
	lastName: string
	documentType: string
	documentNumber: string
	birthDate: string
	gender: string
	country: string
	city: string
	countryResidence: string
	cityResidence: string
	lengthOfStay: number
	sport: Sport
	nutritional: Nutritional
}

export type DocumentTypeKey = 'Cédula de ciudadanía'
export type GenderTypeKey = 'Masculino'
export type AllergyType = 'GLUTEN_FREE' | 'LACTOSE_FREE'
export type PreferenceType = 'VEGETARIAN'
