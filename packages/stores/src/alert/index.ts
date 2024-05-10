import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { customStorage } from '../utils/storages'
import { IAlertState, IAlertStore, Alert } from './interfaces'

export const initialAlertState: IAlertState = {
	alert: undefined,
	alertHistory: []
}

export const useAlertStore = create(
	persist<IAlertStore>(
		(set) => ({
			...initialAlertState,
			setAlert: (alert: Alert | undefined) => {
				if (!alert) {
					set((state) => ({ ...state, alert: undefined }))
					return
				}
				alert.createAt = new Date()
				set((state) => ({
					...state,
					alert,
					alertHistory: [...state.alertHistory, alert]
				}))
				setTimeout(() => {
					set((state) => ({ ...state, alert: undefined }))
				}, alert.ttl ?? 5000)
			},
			addHiddenAlertToHistory: (
				alert: Alert // adds alert to alertHistory withot showing it
			) => {
				alert.createAt = new Date()

				set((state) => ({
					...state,
					alertHistory: [...state.alertHistory, alert]
				}))
			},
			clearState: () =>
				set((state) => ({ ...state, ...initialAlertState }))
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => customStorage())
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('AuthStore', useAlertStore)
}
