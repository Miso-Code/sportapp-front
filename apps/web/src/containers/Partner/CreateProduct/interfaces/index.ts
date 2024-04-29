import { FormData } from '../utils/schema'

export interface Props {
	className?: string
	onHandleSubmit: (data: FormData) => void
	disabled?: boolean
	isLoading?: boolean
	defaultValues?: Partial<FormData>
	buttonText?: string
}

export enum ProductCategory {
	EQUIPMENT = 'equipment',
	APPAREL = 'apparel',
	NUTRITION = 'nutrition',
	TRAINING_SERVICES = 'training_services',
	WELLNESS = 'wellness',
	SPORTS_TECHNOLOGY = 'sports_technology',
	MEDICAL_SERVICES = 'medical_services'
}

export enum PaymentType {
	UNIQUE = 'unique',
	PERIODIC = 'periodic'
}

export enum PaymentFrequency {
	WEEKLY = 'weekly',
	MONTHLY = 'monthly',
	ANNUALLY = 'annually',
	BI_ANNUALLY = 'bi_annually',
	QUARTERLY = 'quarterly',
	OTHER = 'other'
}

export enum ImageType {
	URL = 'url',
	FILE = 'file'
}
