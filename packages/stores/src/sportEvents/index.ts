import sportEventApi from '@sportapp/sportapp-repository/src/sportEvent'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ISportEventState, ISportEventStore } from './interfaces'
import { useAuthStore } from '..'
import { customStorage } from '../utils/storages'

export const initialSportEventState: ISportEventState = {
	sportEvents: [],
	loading: false
}

export const useSportEventStore = create(
	persist<ISportEventStore>(
		(set) => ({
			...initialSportEventState,
			getSportEvents: async (latitude, longitude) => {
				set((state) => ({ ...state, loading: true }))
				const api = new sportEventApi()
				const authToken = useAuthStore.getState().authToken?.accessToken
				const sportEvents = await api.getAllSportEvents(
					latitude,
					longitude,
					{
						headers: {
							Authorization: `Bearer ${authToken}`
						}
					}
				)
				if (!sportEvents) {
					set((state) => ({ ...state, loading: false }))
					return
				}
				set((state) => ({ ...state, sportEvents, loading: false }))
				return sportEvents
			},
			getSportEvent(sport_id) {
				set((state) => ({ ...state, loading: true }))
				const api = new sportEventApi()
				const authToken = useAuthStore.getState().authToken?.accessToken
				set((state) => ({ ...state, loading: false }))
				return api.getSportEventById(sport_id, {
					headers: {
						Authorization: `Bearer ${authToken}`
					}
				})
			},
			clearState: () =>
				set((state) => ({ ...state, ...initialSportEventState }))
		}),
		{
			name: 'SportEvent-storage',
			storage: createJSONStorage(() => customStorage())
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('SportEventStore', useSportEventStore)
}
