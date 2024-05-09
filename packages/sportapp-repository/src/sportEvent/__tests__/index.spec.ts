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

describe('SportEventApi', () => {
	describe('getAllSportEvents', () => {
		it('should call the getAllSportEvents endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: [
						{
							event_id: 'event_id',
							sport_id: 'sport_id',
							location_latitude: 1,
							location_longitude: 1,
							start_date: '2024-05-08T23:14:16.147Z',
							end_date: '2024-05-08T23:14:16.147Z',
							title: 'title',
							capacity: 10,
							description: 'description'
						},
						{
							event_id: 'event_id2',
							sport_id: 'sport_id',
							location_latitude: 1,
							location_longitude: 1,
							start_date: '2024-05-08T23:14:16.147Z',
							end_date: '2024-05-08T23:14:16.147Z',
							title: 'title',
							capacity: 10,
							description: 'description'
						}
					]
				})
			)
			const api = new sportApi()
			const response = await api.getAllSportEvents()

			expect(response).toStrictEqual([
				{
					event_id: 'event_id',
					sport_id: 'sport_id',
					location_latitude: 1,
					location_longitude: 1,
					start_date: '2024-05-08T23:14:16.147Z',
					end_date: '2024-05-08T23:14:16.147Z',
					title: 'title',
					capacity: 10,
					description: 'description'
				},
				{
					event_id: 'event_id2',
					sport_id: 'sport_id',
					location_latitude: 1,
					location_longitude: 1,
					start_date: '2024-05-08T23:14:16.147Z',
					end_date: '2024-05-08T23:14:16.147Z',
					title: 'title',
					capacity: 10,
					description: 'description'
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
			const response = await api.getAllSportEvents()

			expect(response).toBeUndefined()
		})
	})

	describe('getSportEventById', () => {
		it('should call the getSportEventById endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						event_id: 'event_id',
						sport_id: 'sport_id',
						location_latitude: 1,
						location_longitude: 1,
						start_date: '2024-05-08T23:14:16.147Z',
						end_date: '2024-05-08T23:14:16.147Z',
						title: 'title',
						capacity: 10,
						description: 'description'
					}
				})
			)
			const api = new sportApi()
			const response = await api.getSportEventById('sport_id')

			expect(response).toStrictEqual({
				event_id: 'event_id',
				sport_id: 'sport_id',
				location_latitude: 1,
				location_longitude: 1,
				start_date: '2024-05-08T23:14:16.147Z',
				end_date: '2024-05-08T23:14:16.147Z',
				title: 'title',
				capacity: 10,
				description: 'description'
			})
		})

		it('should return undefined if the request fails', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const api = new sportApi()
			const response = await api.getSportEventById('sport_id')

			expect(response).toBeUndefined()
		})
	})
})
