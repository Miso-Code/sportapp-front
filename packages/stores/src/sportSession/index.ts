import sportSessionApi from '@sportapp/sportapp-repository/src/sportSession'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
import { ISportSessionState, ISportSessionStore } from './interfaces'

export const initialSportSessionState: ISportSessionState = {}

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
			return await sessionApi.finishSportSession({
				...request
			})
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
