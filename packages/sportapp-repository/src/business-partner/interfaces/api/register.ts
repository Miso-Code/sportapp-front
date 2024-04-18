export interface RegisterBusinessPartnerRequest {
	email: string
	password: string
	business_partner_name: string
}

export interface RegisterBusinessPartnerResponse {
	business_partner_id: string
	business_partner_name: string
	email: string
}
