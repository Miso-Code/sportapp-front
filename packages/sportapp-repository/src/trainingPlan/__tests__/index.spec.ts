import trainingPlanApi from '../index'
import { sportappApi } from '../../index'

jest.mock('../../index', () => ({
	sportappApi: {
		post: jest.fn(),
		get: jest.fn(),
		patch: jest.fn(),
		delete: jest.fn()
	}
}))

jest.mock('../../utils/global-variables', () => ({
	globalVariables: jest.fn(() => ({
		EXPO_PUBLIC_SPORTAPP_API_URL: 'http://localhost:3000/api'
	}))
}))

global.fetch = jest.fn(() => Promise.resolve({ body: {} })) as jest.Mock

describe('SportApi', () => {
	describe('getTrainingPlan', () => {
		it('should call the getTrainingPlan endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: [
						{
							"training_plan_session_id": "training_plan_session_id",
							"weekday": "monday",
							"start_time": "00:00 AM",
							"warm_up": 1,
							"cardio": 2,
							"strength": 3,
							"cool_down": 4,
							"user_id": "user_id"
						},
						{
							"training_plan_session_id": "training_plan_session_id2",
							"weekday": "tuesday",
							"start_time": "00:00 AM",
							"warm_up": 1,
							"cardio": 2,
							"strength": 3,
							"cool_down": 4,
							"user_id": "user_id"
						}
					]
				})
			)
			const api = new trainingPlanApi()
			const response = await api.getTrainingPlan()

			expect(response).toStrictEqual([
				{
					"training_plan_session_id": "training_plan_session_id",
					"weekday": "monday",
					"start_time": "00:00 AM",
					"warm_up": 1,
					"cardio": 2,
					"strength": 3,
					"cool_down": 4,
					"user_id": "user_id"
				},
				{
					"training_plan_session_id": "training_plan_session_id2",
					"weekday": "tuesday",
					"start_time": "00:00 AM",
					"warm_up": 1,
					"cardio": 2,
					"strength": 3,
					"cool_down": 4,
					"user_id": "user_id"
				}
			])
		})

		it('should return undefined if the request fails', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const api = new trainingPlanApi()
			const response = await api.getTrainingPlan()

			expect(response).toBeUndefined()
		})
	})
})
