import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { IAuthState, IAuthStore } from './interfaces'

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
