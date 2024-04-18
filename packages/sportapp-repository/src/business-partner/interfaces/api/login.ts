export interface LoginBusinessPartnerRequest {
	email: string
	password: string
}

export interface LoginBusinessPartnerResponse {
	user_id: string
	access_token: string
	access_token_expires_minutes: number
	refresh_token: string
	refresh_token_expires_minutes: number
}
