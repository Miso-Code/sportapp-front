import { AxiosRequestConfig } from 'axios'

export interface TrainerGetAllRequest {
	options: AxiosRequestConfig
}

export interface Trainer {
	trainer_id: string
	first_name: string
	last_name: string
}

export interface SportsmanAppointmentRequestPayload {
	data: SportsmanAppointmentRequest
	options?: AxiosRequestConfig
}

export interface SportsmanAppointmentRequest {
	appointment_date: string
	appointment_type: string
	trainer_id: string
	appointment_reason: string
}

export interface SportsmanAppointmentAllRequest {
	options: AxiosRequestConfig
}

export interface SportsmanAppointmentAllResponse {
	appointment_id: string
	user_id: string
	appointment_date: string
	appointment_type: string
	appointment_location?: string
	trainer_id: string
	appointment_reason: string
}
