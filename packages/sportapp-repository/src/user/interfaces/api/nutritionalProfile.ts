import { AxiosRequestConfig } from 'axios'

export interface NutritionalProfileBase {
	food_preference: string
	nutritional_limitations: string[]
}

export interface NutritionalLimitations {
	name: string
	description: string
	limitation_id: string
}

export interface NutritionalProfileRequestPayload {
	options?: AxiosRequestConfig
}

export interface NutritionalProfileResponse extends NutritionalProfileBase {}

export interface NutritionalProfileUpdateRequest {
	food_preference: string
	nutritional_limitations: string[]
}

export interface NutritionalProfileUpdateResponse
	extends NutritionalProfileBase {}
