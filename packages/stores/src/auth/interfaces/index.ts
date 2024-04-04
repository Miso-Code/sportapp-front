import { RegisterUserRequest } from '@sportapp/sportapp-repository/src/user/interfaces'

export interface IAuthStore extends IAuthState, IAuthActions {}

export interface IAuthState {
	isAuth: boolean
	error: string | undefined
	loading: boolean
}

export interface IAuthActions {
	login: (email: string, password: string) => Promise<boolean>
	logout: () => void
	setError: (error: string) => void
	setLoading: (isAuth: boolean) => void
	register: (request: RegisterUserRequest) => Promise<boolean>
}
