import sportApi from '@sportapp/sportapp-repository/src/sport'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
import { ISportState, ISportStore } from './interfaces'

export const initialSportState: ISportState = {
	sports: []
}

export const useSportStore = create<ISportStore>(
	// persist<ISportStore>( #FIXME: This is not working on expo
	(set) => ({
		...initialSportState,
		getSports: async () => {
			const api = new sportApi()

			const sports = await api.getAllSports()
			set({ sports })
			return sports
		},
		getSport(sport_id) {
			const api = new sportApi()

			return api.getSportById(sport_id)
		},
		clearState: () => set((state) => ({ ...state, ...initialSportState }))
	})
	// 	{
	// 		name: 'Sport-storage',
	// 		storage: createJSONStorage(() => sessionStorages)
	// 	}
	// )
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('SportStore', useSportStore)
}
