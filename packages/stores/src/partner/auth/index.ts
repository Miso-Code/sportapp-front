import BusinessPartnerApi from '@sportapp/sportapp-repository/src/business-partner'
import {
	RegisterBusinessPartnerRequest,
	RegisterBusinessPartnerResponse
} from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/register'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { customStorage } from '../../utils/storages'
import { IAuthState, IAuthStore } from './interfaces'

export const initialAuthState: IAuthState = {
	user: undefined,
	isAuth: false,
	error: undefined,
	loading: false,
	authToken: undefined
}

export const usePartnerAuthStore = create(
	persist<IAuthStore>(
		(set, get) => ({
			...initialAuthState,
			login: async ({ email, password }) => {
				const businessPartnerApi = new BusinessPartnerApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const response = await businessPartnerApi.login({
						email,
						password
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
								refreshToken: response.refresh_token, // TODO: this is not safe to be stored in the client this way
								refreshTokenExpirationMinutes:
									response.refresh_token_expires_minutes
							},
							user: {
								...state.user!,
								id: response.user_id // TODO: Crafty
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
			logout: () => {
				// WIP logout logic
				set((state) => ({
					...state,
					user: undefined,
					isAuth: false,
					loading: false,
					error: undefined,
					authToken: undefined
				}))
			},
			register: async (request: RegisterBusinessPartnerRequest) => {
				const businessPartnerApi = new BusinessPartnerApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const response = await businessPartnerApi.register(request)

					if (
						response &&
						typeof response === 'object' &&
						response.business_partner_id
					) {
						const businessPartnerPayload: RegisterBusinessPartnerResponse =
							{
								...response
							}
						set((state) => ({
							...state,
							user: businessPartnerPayload
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
			setError: (error) => set({ error }),
			setLoading: (loading) => set({ loading }),
			setUser: (user: RegisterBusinessPartnerResponse) => set({ user }),
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
	mountStoreDevtool('AuthPartnerStore', usePartnerAuthStore)
}
