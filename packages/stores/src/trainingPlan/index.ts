import trainingPlanApi from '@sportapp/sportapp-repository/src/trainingPlan'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
import { ITrainingPlanState, ITrainingPlanStore } from './interfaces'
import { useAuthStore } from '..'

export const initialTrainingPlanState: ITrainingPlanState = {
	trainingPlanSessions: [
		{
			"training_plan_session_id": "3d20ebc1-88b1-414d-a6ae-d91840d41d12",
			"weekday": "friday",
			"start_time": "10:00 AM",
			"warm_up": 0.35000000000000003,
			"cardio": 0.7000000000000001,
			"strength": 0.525,
			"cool_down": 0.17500000000000002,
			"user_id": "588003f9-2de8-4eb8-a7d7-6419e412a0f6"
		},
		{
			"training_plan_session_id": "af2fbb73-fd58-4237-a2cf-97f719a109e7",
			"weekday": "wednesday",
			"start_time": "10:00 AM",
			"warm_up": 0.35000000000000003,
			"cardio": 0.7000000000000001,
			"strength": 0.525,
			"cool_down": 0.17500000000000002,
			"user_id": "588003f9-2de8-4eb8-a7d7-6419e412a0f6"
		},
		{
			"training_plan_session_id": "651fcb74-3be0-46c1-baa4-801d4f8bf963",
			"weekday": "monday",
			"start_time": "10:00 AM",
			"warm_up": 0.35000000000000003,
			"cardio": 0.7000000000000001,
			"strength": 0.525,
			"cool_down": 0.17500000000000002,
			"user_id": "588003f9-2de8-4eb8-a7d7-6419e412a0f6"
		}
	]
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
		clearState: () => set((state) => ({ ...state, ...initialTrainingPlanState }))
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
