import { act, renderHook } from '@testing-library/react'
import { useNutritionalPlanStore } from '../index'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

jest.mock('@sportapp/sportapp-repository/src/nutritionalPlan', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			getAllNutritionalPlanDishes: jest.fn().mockReturnValue([
				{
					week_day: 'week_day',
					name_es: 'name',
					category: 'category',
					calories: 100,
					protein: 100,
					carbs: 100,
					fat: 100
				},
				{
					week_day: 'week_day2',
					name_es: 'name2',
					category: 'category2',
					calories: 200,
					protein: 200,
					carbs: 200,
					fat: 200
				}
			]),
			notifyCaloryIntake: jest.fn().mockReturnValue({
				user_id: 'user_id',
				message: 'message'
			})
		}))
	}
})

describe('NutritionalPlanStore', () => {
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
		const { result } = renderHook(() => useNutritionalPlanStore())
		const { clearState } = result.current

		await act(async () => {
			await clearState()
		})

		expect(result.current.planDishes).toStrictEqual([])
	})

	describe('getNutritionalPlan', () => {
		const initialStoreState = useNutritionalPlanStore.getState()

		beforeEach(() => {
			useNutritionalPlanStore.setState(initialStoreState)
		})

		it('should return and set all planDishes', async () => {
			const { result } = renderHook(() => useNutritionalPlanStore())

			expect(result.current.planDishes).toStrictEqual([])

			const { getNutritionalPlan } = result.current

			await act(async () => {
				const planDishes = await getNutritionalPlan({ lang: 'en' })
				expect(planDishes).toStrictEqual([
					{
						week_day: 'week_day',
						name_es: 'name',
						category: 'category',
						calories: 100,
						protein: 100,
						carbs: 100,
						fat: 100
					},
					{
						week_day: 'week_day2',
						name_es: 'name2',
						category: 'category2',
						calories: 200,
						protein: 200,
						carbs: 200,
						fat: 200
					}
				])
			})

			expect(result.current.planDishes).toStrictEqual([
				{
					week_day: 'week_day',
					name_es: 'name',
					category: 'category',
					calories: 100,
					protein: 100,
					carbs: 100,
					fat: 100
				},
				{
					week_day: 'week_day2',
					name_es: 'name2',
					category: 'category2',
					calories: 200,
					protein: 200,
					carbs: 200,
					fat: 200
				}
			])
		})
		it('should notify calory intake', async () => {
			const { result } = renderHook(() => useNutritionalPlanStore())
			const { notifyCaloryIntake } = result.current

			let response = undefined
			await act(async () => {
				response = await notifyCaloryIntake({
					calories_burn_expected: 100,
					calories_burn: 100,
					lang: 'en'
				})
			})

			expect(response).toStrictEqual({
				user_id: 'user_id',
				message: 'message'
			})
		})
	})
})
