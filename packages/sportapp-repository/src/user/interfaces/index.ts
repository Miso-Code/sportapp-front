export interface RegisterUserRequest {
	first_name: string
	last_name: string
	email: string
	password: string
}

export interface RegisterUserResponse {
	id: string
	email: string
	first_name: string
	last_name: string
}

export enum Status {
	SUCCESS = 'success',
	ERROR = 'error',
	PROCESSING = 'processing'
}

export interface RegisterUserStreamResponse {
	status: `${Status}`
	message: string
	data?: RegisterUserDataResponse
}
export interface RegisterUserDataResponse {
	id: string
	email: string
	first_name: string
	last_name: string
}

export interface RegisterFullUserRequest {
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

export interface RegisterFullUserResponse {
	user_id: string
	first_name: string
	last_name: string
	email: string
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
