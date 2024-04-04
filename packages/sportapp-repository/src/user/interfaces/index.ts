export interface RegisterUserRequest {
	first_name: string
	last_name: string
	email: string
	password: string
}

export interface RegisterUserResponse {}

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
