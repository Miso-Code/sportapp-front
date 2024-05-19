import { ProductCreateRequest } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product-create'
import { RegisterBusinessPartnerRequest } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/register'

export interface User {
	email: string
	password: string
	first_name: string
	last_name: string
	identification_type: 'CC' | 'CE' | 'PA'
	identification_number: string
	country_of_birth: string
	city_of_birth: string
	country_of_residence: string
	city_of_residence: string
	residence_age: number
	birth_date: string
	gender: 'M' | 'F' | 'O'
}

interface Limitation {
	name: string
	description: string
}

type DayOfWeek =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday'

export interface SportData {
	favourite_sport: string
	training_objective: string
	days_of_week: DayOfWeek[]
	preferred_training_start_time: string
	available_training_hours: number
	weight: number
	height: number
	bmi: number
	limitations: Limitation[]
}

type NutritionalLimitation = 'gluten' | 'lactose' | 'nuts' | 'seafood' | 'sugar'

type FoodPreference = 'vegetarian' | 'vegan' | 'all'

export interface NutritionalData {
	nutritional_limitations: NutritionalLimitation[]
	food_preference: FoodPreference
}

export interface TrainingSession {
	duration: number
}

export interface BusinessPartner extends RegisterBusinessPartnerRequest {
	token?: string
}

export type Product = ProductCreateRequest

export interface CreditCard {
	cardHolder: string
	number: string
	expMonth: string
	expYear: string
	cvv: string
}

export interface ProductCheckout {
	quantity: number
	card: CreditCard
}
