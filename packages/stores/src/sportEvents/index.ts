import sportEventApi from '@sportapp/sportapp-repository/src/sportEvent'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
import { ISportEventState, ISportEventStore } from './interfaces'
import { useAuthStore } from '..'

export const initialSportEventState: ISportEventState = {
	sportEvents: [{
		event_id: '1',
		title: 'Fake event',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		location_latitude: 0,
		location_longitude: 0,
		sport_id: '1',
		start_date: new Date().toISOString(),
		end_date: new Date().toISOString(),
		capacity: 0,
	}],
	loading: false,
}

export const useSportEventStore = create<ISportEventStore>(
	// persist<ISportEventStore>( #FIXME: This is not working on expo
	(set) => ({
		...initialSportEventState,
		getSportEvents: async (latitude, longitude) => {
			set({ loading: true })
			const api = new sportEventApi()
			const authToken = useAuthStore.getState().authToken?.accessToken
			const sportEvents = await api.getAllSportEvents(latitude, longitude, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			})
			if (!sportEvents) {
				set({ loading: false })
				return
			}
			set({ sportEvents, loading: false})
			return sportEvents
		},
		getSportEvent(sport_id) {
			set({ loading: true })
			const api = new sportEventApi()
			const authToken = useAuthStore.getState().authToken?.accessToken
			set({ loading: false })
			return api.getSportEventById(sport_id, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			})
		},
		clearState: () => set((state) => ({ ...state, ...initialSportEventState }))
	})
	// 	{
	// 		name: 'SportEvent-storage',
	// 		storage: createJSONStorage(() => sessionStorages)
	// 	}
	// )
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('SportEventStore', useSportEventStore)
}
