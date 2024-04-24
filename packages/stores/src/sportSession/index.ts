import sportSessionApi from '@sportapp/sportapp-repository/src/sportSession'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
import { ISportSessionState, ISportSessionStore } from './interfaces'
import { useAuthStore } from '..'

export const initialSportSessionState: ISportSessionState = {
	sportSession: undefined,
	sportSessions: []
}

export const useSportSessionStore = create<ISportSessionStore>(
	// persist<ISportSessionStore>( #FIXME: This is not working on expo
	(set) => ({
		...initialSportSessionState,
		setSportSession: (session) =>
			set((state) => ({ ...state, sportSession: session })),

		startSportSession: async (request) => {
			const sessionApi = new sportSessionApi()
			const authToken = useAuthStore.getState().authToken?.accessToken
			return await sessionApi.createSportSession(
				{
					...request
				},
				{
					headers: {
						Authorization: `Bearer ${authToken}`
					}
				}
			)
		},
		addSessionLocation: async (request) => {
			const sessionApi = new sportSessionApi()
			const authToken = useAuthStore.getState().authToken?.accessToken
			return await sessionApi.addSportSessionLocation(
				{
					...request
				},
				{
					headers: {
						Authorization: `Bearer ${authToken}`
					}
				}
			)
		},

		finishSportSession: async (request) => {
			const sessionApi = new sportSessionApi()
			const authToken = useAuthStore.getState().authToken?.accessToken
			const sportSession = await sessionApi.finishSportSession(
				{
					...request
				},
				{
					headers: {
						Authorization: `Bearer ${authToken}`
					}
				}
			)

			if (!sportSession) return
			set((state) => ({ ...state, sportSession }))

			return sportSession
		},

		getSportSessions: async () => {
			const sessionApi = new sportSessionApi()
			const authToken = useAuthStore.getState().authToken?.accessToken
			const sportSessions = await sessionApi.getAllSportSessions({
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			})
			if (!sportSessions) return
			set((state) => ({ ...state, sportSessions }))
			return sportSessions
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
