import { act, renderHook } from '@testing-library/react'
import { useTrainingPlanStore } from '../index'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

jest.mock('@sportapp/sportapp-repository/src/trainingPlan', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			getTrainingPlan: jest.fn().mockResolvedValue([
				{
					training_plan_session_id: 'training_plan_session_id',
					weekday: 'monday',
					start_time: '00:00 AM',
					warm_up: 1,
					cardio: 2,
					strength: 3,
					cool_down: 4,
					user_id: 'user_id'
				},
				{
					training_plan_session_id: 'training_plan_session_id2',
					weekday: 'tuesday',
					start_time: '00:00 AM',
					warm_up: 1,
					cardio: 2,
					strength: 3,
					cool_down: 4,
					user_id: 'user_id'
				}
			])
		}))
	}
})

describe('TrainingPlanStore', () => {
	const OLD_ENV = process.env
	beforeEach(() => {
		jest.resetModules()
		process.env = { ...OLD_ENV }
	})

	afterEach(async () => {
		process.env = OLD_ENV
		jest.clearAllMocks()
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => useTrainingPlanStore())
		const { clearState } = result.current

		await act(async () => {
			await clearState()
		})

		expect(result.current.trainingPlanSessions).toStrictEqual([])
	})

	describe('getTrainingPlan', () => {
		const initialStoreState = useTrainingPlanStore.getState()

		beforeEach(() => {
			useTrainingPlanStore.setState(initialStoreState)
		})

		it('should return and set all trainingPlanSessions', async () => {
			const { result } = renderHook(() => useTrainingPlanStore())

			expect(result.current.trainingPlanSessions).toStrictEqual([])

			const { getTrainingPlan } = result.current

			await act(async () => {
				const trainingPlanSessions = await getTrainingPlan()
				expect(trainingPlanSessions).toStrictEqual([
					{
						training_plan_session_id: 'training_plan_session_id',
						weekday: 'monday',
						start_time: '00:00 AM',
						warm_up: 1,
						cardio: 2,
						strength: 3,
						cool_down: 4,
						user_id: 'user_id'
					},
					{
						training_plan_session_id: 'training_plan_session_id2',
						weekday: 'tuesday',
						start_time: '00:00 AM',
						warm_up: 1,
						cardio: 2,
						strength: 3,
						cool_down: 4,
						user_id: 'user_id'
					}
				])
			})

			expect(result.current.trainingPlanSessions).toStrictEqual([
				{
					training_plan_session_id: 'training_plan_session_id',
					weekday: 'monday',
					start_time: '00:00 AM',
					warm_up: 1,
					cardio: 2,
					strength: 3,
					cool_down: 4,
					user_id: 'user_id'
				},
				{
					training_plan_session_id: 'training_plan_session_id2',
					weekday: 'tuesday',
					start_time: '00:00 AM',
					warm_up: 1,
					cardio: 2,
					strength: 3,
					cool_down: 4,
					user_id: 'user_id'
				}
			])
		})
	})
})
