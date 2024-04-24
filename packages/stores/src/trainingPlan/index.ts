import trainingPlanApi from '@sportapp/sportapp-repository/src/trainingPlan'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
import { ITrainingPlanState, ITrainingPlanStore } from './interfaces'
import { useAuthStore } from '..'

export const initialTrainingPlanState: ITrainingPlanState = {
	trainingPlanSessions: []
}

export const useTrainingPlanStore = create<ITrainingPlanStore>(
	// persist<ITrainingPlanStore>( #FIXME: This is not working on expo
	(set) => ({
		...initialTrainingPlanState,
		getTrainingPlan: async () => {
			const api = new trainingPlanApi()
			const authToken = useAuthStore.getState().authToken?.accessToken
			const trainingPlanSessions = await api.getTrainingPlan({
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			})
			if (!trainingPlanSessions) return
			set({ trainingPlanSessions })
			return trainingPlanSessions
		},
		clearState: () =>
			set((state) => ({ ...state, ...initialTrainingPlanState }))
	})
	// 	{
	// 		name: 'Sport-storage',
	// 		storage: createJSONStorage(() => sessionStorages)
	// 	}
	// )
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('SportStore', useTrainingPlanStore)
}
