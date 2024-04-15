import UserApi from '@sportapp/sportapp-repository/src/user'
import { NutritionalLimitations } from '@sportapp/sportapp-repository/src/user/interfaces/api/nutritionalProfile'
import { PersonalProfileUpdateRequest } from '@sportapp/sportapp-repository/src/user/interfaces/api/personalProfile'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useAuthStore } from '../auth'
import { customStorage } from '../utils/storages'
import { IUserState, IUserStore } from './interfaces'

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
					const authToken =
						useAuthStore.getState().authToken?.accessToken
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
								...state.user,
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
					const authToken =
						useAuthStore.getState().authToken?.accessToken
					const response = await userApi.updatePersonalProfile(data, {
						headers: {
							Authorization: `Bearer ${authToken}`
						}
					})

					if (response) {
						set((state) => ({
							...state,
							user: {
								...state.user,
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
			},
			getSport: async () => {
				const userApi = new UserApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken =
						useAuthStore.getState().authToken?.accessToken
					const response = await userApi.getSportProfile({
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
								...state.user,
								sportData: response
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
			updateSport: async (data) => {
				const userApi = new UserApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken =
						useAuthStore.getState().authToken?.accessToken
					const response = await userApi.updateSportProfile(data, {
						headers: {
							Authorization: `Bearer ${authToken}`
						}
					})

					if (response) {
						set((state) => ({
							...state,
							user: {
								...state.user,
								sportData: response
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
			},
			getNutrition: async () => {
				const userApi = new UserApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken =
						useAuthStore.getState().authToken?.accessToken
					const response = await userApi.getNutritionalProfile({
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
								...state.user,
								nutritionData: response
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
			updateNutrition: async (data) => {
				const userApi = new UserApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken =
						useAuthStore.getState().authToken?.accessToken
					const response = await userApi.updateNutritionalProfile(
						data,
						{
							headers: {
								Authorization: `Bearer ${authToken}`
							}
						}
					)

					if (response) {
						set((state) => ({
							...state,
							user: {
								...state.user,
								nutritionData: response
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
			},
			getAllNutritionalLimitations: async (): Promise<
				NutritionalLimitations[] | undefined
			> => {
				const userApi = new UserApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken =
						useAuthStore.getState().authToken?.accessToken
					const response = await userApi.getAllNutritionalLimitations(
						{
							headers: {
								Authorization: `Bearer ${authToken}`
							}
						}
					)

					if (response) {
						set((state) => ({
							...state,
							user: {
								...state.user,
								nutritionalLimitations: response
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
			}
		}),
		{
			name: 'user-storage',
			storage: createJSONStorage(() => customStorage())
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('UserStore', useUserStore)
}
