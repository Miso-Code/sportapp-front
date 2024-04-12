import sportSessionApi from '@sportapp/sportapp-repository/src/sportSession'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
import { ISportSessionState, ISportSessionStore } from './interfaces'

export const initialSportSessionState: ISportSessionState = {
	sportSession: undefined
}

export const useSportSessionStore = create<ISportSessionStore>(
	// persist<ISportSessionStore>( #FIXME: This is not working on expo
	(set) => ({
		...initialSportSessionState,
		startSportSession: async (request) => {
			const sessionApi = new sportSessionApi()

			return await sessionApi.createSportSession({
				...request
			})
		},
		addSessionLocation: async (request) => {
			const sessionApi = new sportSessionApi()
			return await sessionApi.addSportSessionLocation({
				...request
			})
		},

		finishSportSession: async (request) => {
			const sessionApi = new sportSessionApi()
			const sportSession = await sessionApi.finishSportSession({
				...request
			})

			if (!sportSession) {
				setTimeout(() => {
					set((state) => ({
						...state,
						sportSession: {
							session_id: '1',
							sport_id: '1',
							user_id: '1',
							start_date: new Date().toISOString(),
							duration: 60,
							steps: 85,
							distance: 70,
							calories: 5,
							average_speed: 1.78,
							min_heartrate: 80,
							max_heartrate: 150,
							avg_heartrate: 133
						}
					}))
				}, 2000)
			}

			set((state) => ({ ...state, sportSession }))

			return sportSession
		},
		clearState: () =>
			set((state) => ({ ...state, ...initialSportSessionState }))
	})
	// 	{
	// 		name: 'SportSession-storage',
	// 		storage: createJSONStorage(() => sessionStorages)
	// 	}
	// )
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('SportSessionStore', useSportSessionStore)
}
