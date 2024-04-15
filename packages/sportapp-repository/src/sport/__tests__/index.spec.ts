import sportApi from '../index'
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
	describe('getAllSports', () => {
		it('should call the getAllSports endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: [
						{
							sport_id: 'sport_id',
							name: 'name'
						},
						{
							sport_id: 'sport_id2',
							name: 'name2'
						}
					]
				})
			)
			const api = new sportApi()
			const response = await api.getAllSports()

			expect(response).toStrictEqual([
				{
					sport_id: 'sport_id',
					name: 'name'
				},
				{
					sport_id: 'sport_id2',
					name: 'name2'
				}
			])
		})

		it('should return undefined if the request fails', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const api = new sportApi()
			const response = await api.getAllSports()

			expect(response).toBeUndefined()
		})
	})

	describe('getSportById', () => {
		it('should call the getSportById endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						sport_id: 'sport_id',
						name: 'name'
					}
				})
			)
			const api = new sportApi()
			const response = await api.getSportById('sport_id')

			expect(response).toStrictEqual({
				sport_id: 'sport_id',
				name: 'name'
			})
		})

		it('should return undefined if the request fails', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const api = new sportApi()
			const response = await api.getSportById('sport_id')

			expect(response).toBeUndefined()
		})
	})
})
