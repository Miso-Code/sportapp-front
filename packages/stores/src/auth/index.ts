import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IAuthState, IAuthStore } from './interfaces'
import UserApi from '@sportapp/sportapp-repository/src/user'
import {
	RegisterFullUserRequest,
	RegisterUserRequest
} from '@sportapp/sportapp-repository/src/user/interfaces'

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
					set({ isAuth: true })
					return true
				}
				return false
			},
			logout: () => {
				// WIP logout logic
				set({ isAuth: false })
			},
			register: async (request: RegisterUserRequest) => {
				const userApi = new UserApi()

				return await userApi.register(request)
			},
			registerFull: async (request: RegisterFullUserRequest) => {
				const userApi = new UserApi()
				const user = get().user

				if (!user) {
					return false
				}

				return await userApi.registerFull(user.id, request)
			},
			setError: (error) => set({ error }),
			setLoading: (loading) => set({ loading })
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
