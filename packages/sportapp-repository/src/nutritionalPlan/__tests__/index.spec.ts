import nutritionalPlanApi from '../index'
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

describe('NutritionalPlanApi', () => {
	describe('getAllNutritionalPlanDishes', () => {
		it('should call the getAllNutritionalPlanDishes endpoint', async () => {
			; (sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: [
						{
							week_day: 'week_day',
							name: 'name',
							category: 'category',
							calories: 100,
							protein: 100,
							carbs: 100,
							fat: 100
						},
						{
							week_day: 'week_day2',
							name: 'name2',
							category: 'category2',
							calories: 200,
							protein: 200,
							carbs: 200,
							fat: 200
						}
					]
				})
			)
			const api = new nutritionalPlanApi()
			const response = await api.getAllNutritionalPlanDishes(
				{ lang: 'en' },
				{}
			)

			expect(response).toStrictEqual([
				{
					week_day: 'week_day',
					name: 'name',
					category: 'category',
					calories: 100,
					protein: 100,
					carbs: 100,
					fats: 100
				},
				{
					week_day: 'week_day2',
					name: 'name2',
					category: 'category2',
					calories: 200,
					protein: 200,
					carbs: 200,
					fats: 200
				}
			])
		})

		it('should call the getAllNutritionalPlanDishes endpoint translated', async () => {
			; (sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: [
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
					]
				})
			)
			const api = new nutritionalPlanApi()
			const response = await api.getAllNutritionalPlanDishes(
				{ lang: 'es' },
				{}
			)

			expect(response).toStrictEqual([
				{
					week_day: 'week_day',
					name: 'name',
					category: 'category',
					calories: 100,
					protein: 100,
					carbs: 100,
					fats: 100
				},
				{
					week_day: 'week_day2',
					name: 'name2',
					category: 'category2',
					calories: 200,
					protein: 200,
					carbs: 200,
					fats: 200
				}
			])
		})

		it('should return undefined if the request fails', async () => {
			; (sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const api = new nutritionalPlanApi()
			const response = await api.getAllNutritionalPlanDishes(
				{ lang: 'en' },
				{}
			)

			expect(response).toBeUndefined()
		})
	})
	describe('notifyCaloryIntake', () => {
		it('should call the notifyCaloryIntake endpoint', async () => {
			; (sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						user_id: 'user_id',
						message: 'message'
					}
				})
			)
			const api = new nutritionalPlanApi()
			const response = await api.notifyCaloryIntake(
				{ lang: 'en', calories_burn: 1000, calories_burn_expected: 2000 },
				{}
			)

			expect(response).toStrictEqual({
				user_id: 'user_id',
				message: 'message'
			})
		})

		it('should return undefined if the request fails', async () => {
			; (sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const api = new nutritionalPlanApi()
			const response = await api.notifyCaloryIntake(
				{ lang: 'en', calories_burn: 1000, calories_burn_expected: 2000 },
				{}
			)

			expect(response).toBeUndefined()
		})
	})
})
