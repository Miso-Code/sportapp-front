import {
	RegisterFullUserRequest,
	RegisterUserRequest
} from '@sportapp/sportapp-repository/src/user/interfaces'

export interface IAuthStore extends IAuthState, IAuthActions {}

export interface IAuthState {
	user: User | undefined
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

export interface User {
	id: string
	email: string
	first_name: string
	last_name: string
}

export interface IAuthActions {
	login: (payload: { email: string; password: string }) => Promise<boolean>
	logout: () => void
	setError: (error: string) => void
	setLoading: (isAuth: boolean) => void
	register: (request: RegisterUserRequest) => Promise<boolean>
	registerFull: (request: RegisterFullUserRequest) => Promise<boolean>
	setUser: (user: User) => void
	clearState: () => void
}
