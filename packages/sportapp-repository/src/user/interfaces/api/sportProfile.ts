import { AxiosRequestConfig } from 'axios'

export interface SportProfileBase {
	training_objective: string
	weight: number
	height: number
	available_training_hours: number
	training_frequency: string
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
	training_frequency: string
	training_limitations: TrainingLimitationRequest[]
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
