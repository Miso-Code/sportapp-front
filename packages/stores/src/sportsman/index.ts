import UserApi from '@sportapp/sportapp-repository/src/user'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useAuthStore } from '..'
import { customStorage } from '../utils/storages'
import { ISportsmanState, ISportsmanStore } from './interfaces'

export const initialSportsmanState: ISportsmanState = {
	error: undefined,
	loading: false,
	trainers: undefined,
	sportsmanAppointments: undefined
}

export const useSportsmanStore = create(
	persist<ISportsmanStore>(
		(set) => ({
			...initialSportsmanState,
			setError: (error) => set((state) => ({ ...state, error })),
			setLoading: (loading) => set((state) => ({ ...state, loading })),
			clearState: () =>
				set((state) => ({ ...state, ...initialSportsmanState })),
			getAllTrainers: async () => {
				const userApi = new UserApi()
				try {
					set((state) => ({ ...state, loading: true }))
					const authToken =
						useAuthStore.getState().authToken?.accessToken
					const trainers = await userApi.getAllTrainers({
						options: {
							headers: {
								Authorization: `Bearer ${authToken}`
							}
						}
					})
					if (trainers) {
						set((state) => ({
							...state,
							trainers,
							loading: false,
							error: undefined
						}))
						return true
					}
				} catch (error) {
					set((state) => ({
						...state,
						error: 'errors.trainer.getAll',
						loading: false
					}))
				} finally {
					set((state) => ({ ...state, loading: false }))
				}
				return false
			},
			addSportsmanAppointment: async (payload) => {
				const userApi = new UserApi()
				try {
					set((state) => ({ ...state, loading: true }))
					const authToken =
						useAuthStore.getState().authToken?.accessToken
					const response = await userApi.addSportsmanAppointment({
						data: payload,
						options: {
							headers: {
								Authorization: `Bearer ${authToken}`
							}
						}
					})
					if (response) {
						set((state) => ({
							...state,
							loading: false,
							error: undefined
						}))
						return true
					}
				} catch (error) {
					set((state) => ({
						...state,
						error: 'errors.sportsmanAppointment.add',
						loading: false
					}))
				} finally {
					set((state) => ({ ...state, loading: false }))
				}
				return false
			},
			getAllSportsmanAppointments: async () => {
				const userApi = new UserApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken =
						useAuthStore.getState().authToken?.accessToken
					const sportsmanAppointments =
						await userApi.getAllSportsmanAppointments({
							options: {
								headers: {
									Authorization: `Bearer ${authToken}`
								}
							}
						})
					if (sportsmanAppointments) {
						set((state) => ({
							...state,
							sportsmanAppointments,
							loading: false,
							error: undefined
						}))
						return true
					}
				} catch (error) {
					set((state) => ({
						...state,
						error: 'errors.sportsmanAppointment.getAll',
						loading: false
					}))
				} finally {
					set((state) => ({ ...state, loading: false }))
				}
				return false
			}
		}),
		{
			name: 'sportsman-store',
			storage: createJSONStorage(() => customStorage())
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('SportsmanStore', useSportsmanStore)
}
