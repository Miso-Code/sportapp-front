import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IAuthState, IAuthStore } from './interfaces'
import UserApi from '@sportapp/sportapp-repository/src/user'
import { RegisterUserRequest } from '@sportapp/sportapp-repository/src/user/interfaces'

export const initialAuthState: IAuthState = {
	isAuth: false,
	error: undefined,
	loading: false
}

export const useAuthStore = create(
	persist<IAuthStore>(
		(set) => ({
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
				// WIP register logic

				return await userApi.register(request)
			},
			setError: (error) => set({ error }),
			setLoading: (loading) => set({ loading })
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('AuthStore', useAuthStore)
}
