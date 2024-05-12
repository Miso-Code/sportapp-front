import nutritionalPlanApi from '@sportapp/sportapp-repository/src/nutritionalPlan'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
import { INutritionalPlanState, INutritionalPlanStore } from './interfaces'
import { useAuthStore } from '..'

export const initialNutritionalPlanState: INutritionalPlanState = {
	planDishes: [],
	loading: false
}

export const useNutritionalPlanStore = create<INutritionalPlanStore>(
	// persist<INutritionalPlanStore>( #FIXME: This is not working on expo
	(set) => ({
		...initialNutritionalPlanState,
		getNutritionalPlan: async (request) => {
			set({ loading: true })
			const api = new nutritionalPlanApi()
			const authToken = useAuthStore.getState().authToken?.accessToken
			const planDishes = await api.getAllNutritionalPlanDishes(request, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			})
			if (!planDishes) {
				set({ loading: false })
				return
			}
			set({ planDishes, loading: false })
			return planDishes
		},
		notifyCaloryIntake: async (request) => {
			const api = new nutritionalPlanApi()
			const authToken = useAuthStore.getState().authToken?.accessToken
			return await api.notifyCaloryIntake(request, {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			})
		},
		clearState: () =>
			set((state) => ({ ...state, ...initialNutritionalPlanState }))
	})
	// 	{
	// 		name: 'NutritionalPlan-storage',
	// 		storage: createJSONStorage(() => sessionStorages)
	// 	}
	// )
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('NutritionalPlanStore', useNutritionalPlanStore)
}
