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

export interface LoginUserRequest {
	email: string
	password: string
}

export interface LoginUserResponse {
	access_token: string
	access_token_expires_minutes: number
	refresh_token: string
	refresh_token_expires_minutes: number
}

export interface SportSessionLocationRequest {
	latitude: number
	longitude: number
	accuracy: number
	altitude: number
	altitude_accuracy: number
	heading: number
	speed: number
}
export interface StartSportSessionRequest {
	user_id: string
	started_at: string
	sport_id: string
	initial_location: SportSessionLocationRequest
}

export interface StartSportSessionResponse {
	session_id: string
	sport_id: string
	user_id: string
	start_date: string
}

export interface AddSportSessionLocationRequest
	extends SportSessionLocationRequest {
	session_id: string
}

export interface AddSportSessionLocationResponse
	extends AddSportSessionLocationRequest {}

export interface FinishSportSessionRequest {
	session_id: string
	duration: number
	steps?: number
	distance?: number
	calories?: number
	average_speed?: number
	min_heartrate?: number
	max_heartrate?: number
	avg_heartrate?: number
}

export interface FullSportSessionResponse
	extends FinishSportSessionRequest,
		StartSportSessionResponse {}
