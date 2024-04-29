import { AxiosRequestConfig } from 'axios'

type WeekDay =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday'
export interface SportProfileBase {
	training_objective: string
	weight: number
	height: number
	available_training_hours: number
	available_weekdays: WeekDay[]
	preferred_training_start_time: string
	training_limitations: TrainingLimitation[]
	bmi: number
	favourite_sport_id: string
}

export interface SportProfileRequestPayload {
	options?: AxiosRequestConfig
}

export interface SportProfileResponse extends SportProfileBase {}

export interface SportProfileUpdateRequest {
	favourite_sport_id: string
	training_objective: string
	weight: number
	height: number
	available_training_hours: number
	training_limitations: TrainingLimitationRequest[]
	available_weekdays: WeekDay[]
	preferred_training_start_time: string
}

export interface TrainingLimitation {
	limitation_id: string
	name: string
	description: string
}

export interface TrainingLimitationRequest {
	limitation_id?: string
	name: string
	description: string
}

export interface SportProfileUpdateResponse extends SportProfileBase {}
