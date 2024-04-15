import { AxiosRequestConfig } from 'axios'

export interface PersonalProfileRequestPayload {
	options?: AxiosRequestConfig
}
export interface PersonalProfileRequest {}

export interface PersonalProfileBase {
	email: string
	first_name: string
	last_name: string
	identification_type: string
	identification_number: string
	gender: string
	country_of_birth: string
	city_of_birth: string
	country_of_residence: string
	city_of_residence: string
	residence_age: number
	birth_date: string
}

export interface PersonalProfileResponse extends PersonalProfileBase {}

export interface PersonalProfileUpdateRequest extends PersonalProfileBase {}

export interface PersonalProfileUpdateResponse extends PersonalProfileBase {}
