import UserApi from '@sportapp/sportapp-repository/src/user'
import {
	RegisterFullUserRequest,
	RegisterUserRequest
} from '@sportapp/sportapp-repository/src/user/interfaces'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { customStorage } from '../utils/storages'
import { IAuthState, IAuthStore, User } from './interfaces'

export const initialAuthState: IAuthState = {
	user: undefined,
	isAuth: false,
	error: undefined,
	loading: false,
	authToken: undefined
}

export const useAuthStore = create(
	persist<IAuthStore>(
		(set, get) => ({
			...initialAuthState,
			login: async ({ email, password }) => {
				const userApi = new UserApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const response = await userApi.login({ email, password })

					if (response && response.access_token) {
						set((state) => ({
							...state,
							isAuth: true,
							loading: false,
							authToken: {
								accessToken: response.access_token,
								accessTokenExpirationMinutes:
									response.access_token_expires_minutes,
								refreshToken: response.refresh_token,
								refreshTokenExpirationMinutes:
									response.refresh_token_expires_minutes
							},
							user: {
								...state.user!,
								id: response.user_id
							}
						}))
						return true
					}

					set((state) => ({
						...state,
						error: 'errors.login.base',
						loading: false
					}))

					return false
				} catch (e) {
					set((state) => ({
						...state,
						loading: false,
						error: 'errors.login.base'
					}))
					return false
				}
			},
			refreshToken: async () => {
				const userApi = new UserApi()
				const refreshToken = get().authToken?.refreshToken
				if (!refreshToken) {
					return false
				}

				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const response = await userApi.loginRefresh({
						refresh_token: refreshToken
					})

					if (response && response.access_token) {
						set((state) => ({
							...state,
							isAuth: true,
							loading: false,
							authToken: {
								accessToken: response.access_token,
								accessTokenExpirationMinutes:
									response.access_token_expires_minutes,
								refreshToken: response.refresh_token,
								refreshTokenExpirationMinutes:
									response.refresh_token_expires_minutes
							}
						}))
						return true
					}

					set((state) => ({
						...state,
						error: 'errors.login.base',
						isAuth: false,
						loading: false
					}))

					return false
				} catch (e) {
					set((state) => ({
						...state,
						loading: false,
						isAuth: false,
						error: 'errors.login.base'
					}))
					return false
				}
			},
			logout: () => {
				set((state) => ({
					...state,
					user: undefined,
					isAuth: false,
					loading: false,
					error: undefined,
					authToken: undefined
				}))
			},
			register: async (request: RegisterUserRequest) => {
				const userApi = new UserApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const response = await userApi.register(request)

					if (
						response &&
						typeof response === 'object' &&
						response.id
					) {
						const userPayload: User = {
							...response
						}
						set((state) => ({
							...state,
							user: userPayload
						}))

						const loginResponse = await get().login({
							email: request.email,
							password: request.password
						})

						return loginResponse
					}

					set((state) => ({
						...state,
						error: 'errors.register.base',
						loading: false
					}))

					return false
				} catch (e) {
					set((state) => ({
						...state,
						loading: false,
						error: 'errors.register.base'
					}))
					return false
				}
			},
			registerFull: async (request: RegisterFullUserRequest) => {
				const userApi = new UserApi()
				const user = get().user

				if (!user) {
					return false
				}

				set((state) => ({
					...state,
					loading: true,
					isAuth: true
				}))

				try {
					return await userApi.registerFull(request, {
						headers: {
							Authorization: `Bearer ${get().authToken?.accessToken}`
						}
					})
				} catch (error) {
					set((state) => ({
						...state,
						error: 'errors.register.full'
					}))
					return false
				} finally {
					set((state) => ({
						...state,
						loading: false
					}))
				}
			},
			setError: (error) => set({ error }),
			setLoading: (loading) => set({ loading }),
			setUser: (user: User) => set({ user }),
			clearState: () =>
				set((state) => ({ ...state, ...initialAuthState }))
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => customStorage())
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('AuthStore', useAuthStore)
}
