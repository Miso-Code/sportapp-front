import sportSessionApi from '@sportapp/sportapp-repository/src/sportSession'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
import { ISportSessionState, ISportSessionStore } from './interfaces'

export const initialSportSessionState: ISportSessionState = {
	sportSession: undefined,
	sportSessions: [
		{
			session_id: '1',
			sport_id: '1',
			user_id: '4',
			start_date: '2024-03-31T06:44:23',
			duration: 41,
			steps: 560,
			distance: 20,
			calories: 829,
			average_speed: 2.36,
			min_heartrate: 60,
			max_heartrate: 157,
			avg_heartrate: 126
		},
		{
			session_id: '2',
			sport_id: '3',
			user_id: '1',
			start_date: '2024-04-01T23:27:06',
			duration: 64,
			steps: 545,
			distance: 100,
			calories: 107,
			average_speed: 3.01,
			min_heartrate: 67,
			max_heartrate: 149,
			avg_heartrate: 136
		},
		{
			session_id: '3',
			sport_id: '4',
			user_id: '10',
			start_date: '2024-04-13T13:17:26',
			duration: 80,
			steps: 419,
			distance: 7,
			calories: 507,
			average_speed: 1.56,
			min_heartrate: 68,
			max_heartrate: 150,
			avg_heartrate: 140
		},
		{
			session_id: '4',
			sport_id: '2',
			user_id: '8',
			start_date: '2024-05-07T09:52:18',
			duration: 93,
			steps: 125,
			distance: 77,
			calories: 854,
			average_speed: 1.51,
			min_heartrate: 88,
			max_heartrate: 143,
			avg_heartrate: 75
		},
		{
			session_id: '5',
			sport_id: '3',
			user_id: '2',
			start_date: '2024-04-06T16:14:22',
			duration: 33,
			steps: 879,
			distance: 83,
			calories: 693,
			average_speed: 2.24,
			min_heartrate: 61,
			max_heartrate: 164,
			avg_heartrate: 157
		},
		{
			session_id: '6',
			sport_id: '3',
			user_id: '10',
			start_date: '2024-04-10T06:15:36',
			duration: 69,
			steps: 749,
			distance: 51,
			calories: 979,
			average_speed: 2.36,
			min_heartrate: 72,
			max_heartrate: 161,
			avg_heartrate: 150
		},
		{
			session_id: '7',
			sport_id: '3',
			user_id: '2',
			start_date: '2024-03-31T21:38:14',
			duration: 109,
			steps: 651,
			distance: 47,
			calories: 958,
			average_speed: 1.53,
			min_heartrate: 60,
			max_heartrate: 140,
			avg_heartrate: 85
		},
		{
			session_id: '8',
			sport_id: '1',
			user_id: '4',
			start_date: '2024-04-03T15:43:23',
			duration: 97,
			steps: 506,
			distance: 92,
			calories: 690,
			average_speed: 2.04,
			min_heartrate: 85,
			max_heartrate: 162,
			avg_heartrate: 159
		}
	]
}

export const useSportSessionStore = create<ISportSessionStore>(
	// persist<ISportSessionStore>( #FIXME: This is not working on expo
	(set) => ({
		...initialSportSessionState,
		setSportSession: (session) =>
			set((state) => ({ ...state, sportSession: session })),

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

			if (!sportSession) return
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
