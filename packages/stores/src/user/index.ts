import UserApi from '@sportapp/sportapp-repository/src/user'
import { PersonalProfileUpdateRequest } from '@sportapp/sportapp-repository/src/user/interfaces/api/personalProfile'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { customStorage } from '../utils/storages'
import { IUserState, IUserStore } from './interfaces'
import { useAuthStore } from '../auth'

export const initialUserState: IUserState = {
	user: undefined,
	error: undefined,
	loading: false
}

export const useUserStore = create(
	persist<IUserStore>(
		(set) => ({
			...initialUserState,
			setError: (error) => set({ error }),
			setLoading: (loading) => set({ loading }),
			setUser: (user) => set({ user }),
			clearState: () => set({ ...initialUserState }, true),
			getProfile: async () => {
				const userApi = new UserApi()

				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken = useAuthStore.getState().authToken
					const response = await userApi.getPersonalProfile({
						options: {
							headers: {
								Authorization: `Bearer ${authToken}`
							}
						}
					})

					if (response) {
						set((state) => ({
							...state,
							user: {
								profileData: response
							},
							loading: false
						}))
						return response
					}

					set((state) => ({
						...state,
						error: 'errors.user.base',
						loading: false
					}))

					return undefined
				} catch (e) {
					set((state) => ({
						...state,
						loading: false,
						error: 'errors.user.base'
					}))
					return undefined
				}
			},
			updateProfile: async (data: PersonalProfileUpdateRequest) => {
				const userApi = new UserApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken = useAuthStore.getState().authToken
					const response = await userApi.updatePersonalProfile(data, {
						headers: {
							Authorization: `Bearer ${authToken}`
						}
					})

					if (response) {
						set((state) => ({
							...state,
							user: {
								profileData: response
							},
							loading: false
						}))
					}

					set((state) => ({
						...state,
						error: 'errors.user.base',
						loading: false
					}))
				} catch (e) {
					set((state) => ({
						...state,
						loading: false,
						error: 'errors.user.base'
					}))
				}
			}
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => customStorage())
		}
	)
)
