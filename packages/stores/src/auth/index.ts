import UserApi from '@sportapp/sportapp-repository/src/user'
import {
	RegisterFullUserRequest,
	RegisterUserRequest
} from '@sportapp/sportapp-repository/src/user/interfaces'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IAuthState, IAuthStore, User } from './interfaces'

export const initialAuthState: IAuthState = {
	user: undefined,
	isAuth: false,
	error: undefined,
	loading: false
}

export const useAuthStore = create(
	persist<IAuthStore>(
		(set, get) => ({
			...initialAuthState,
			login: async (email, password) => {
				// WIP login logic
				if (email === 'a' && password === 'b') {
					set((state) => ({ ...state, isAuth: true }))
					return true
				}
				return false
			},
			logout: () => {
				// WIP logout logic
				set((state) => ({
					...state,
					user: undefined,
					isAuth: false,
					loading: false,
					error: undefined
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
							user: userPayload,
							loading: false
						}))
						return true
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

				return await userApi.registerFull(user.id, request)
			},
			setError: (error) => set({ error }),
			setLoading: (loading) => set({ loading }),
			setUser: (user: User) => set({ user }),
			clearState: () =>
				set((state) => ({ ...state, ...initialAuthState }))
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => sessionStorage)
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('AuthStore', useAuthStore)
}
