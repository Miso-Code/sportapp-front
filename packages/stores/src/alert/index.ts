import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { customStorage } from '../utils/storages'
import { IAlertState, IAlertStore, Alert } from './interfaces'

export const initialAlertState: IAlertState = {
	alert: undefined
}

export const useAlertStore = create(
	persist<IAlertStore>(
		(set) => ({
			...initialAlertState,
			setAlert: (alert: Alert) => {
				set((state) => ({ ...state, alert }))
				if (!alert) return
				setTimeout(() => {
					set((state) => ({ ...state, alert: undefined }))
				}, alert.ttl ?? 5000)
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
