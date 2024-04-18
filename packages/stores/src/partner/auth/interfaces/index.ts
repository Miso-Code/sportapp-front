import { LoginBusinessPartnerRequest } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/login'

import {
	RegisterBusinessPartnerRequest,
	RegisterBusinessPartnerResponse
} from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/register'

export interface IAuthStore extends IAuthState, IAuthActions {}

export interface IAuthState {
	user: RegisterBusinessPartnerResponse | undefined
	isAuth: boolean
	error: string | undefined
	loading: boolean
	authToken?: {
		accessToken: string
		accessTokenExpirationMinutes: number
		refreshToken: string
		refreshTokenExpirationMinutes: number
	}
}

export interface IAuthActions {
	login: (payload: LoginBusinessPartnerRequest) => Promise<boolean>
	logout: () => void
	setError: (error: string) => void
	setLoading: (isAuth: boolean) => void
	register: (request: RegisterBusinessPartnerRequest) => Promise<boolean>
	setUser: (partner: RegisterBusinessPartnerResponse) => void
	clearState: () => void
}
