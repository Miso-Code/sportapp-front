import { AxiosRequestConfig } from 'axios'

export interface UpdatePlanRequestPayload {
	data: UpdatePlanRequest
	options?: AxiosRequestConfig
}
export interface UpdatePlanRequest {
	subscription_type: string
	payment_data: PaymentData
}

export type subscriptionType = `${ESubscription}`

export enum ESubscription {
	FREE = 'free',
	INTERMEDIATE = 'intermediate',
	PREMIUM = 'premium'
}

export interface PaymentData {
	card_number: string
	card_holder: string
	card_expiration_date: string
	card_cvv: string
	amount: number
}

export interface UpdatePlanResponse {
	status: string
	message: string
	subscription_start_date: string
	subscription_end_date: string
}
