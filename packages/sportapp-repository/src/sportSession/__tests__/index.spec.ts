import SportSessionApi from '../index'
import {
	StartSportSessionRequest,
	AddSportSessionLocationRequest,
	FinishSportSessionRequest
} from '../interfaces'
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

describe('SportSessionApi', () => {
	describe('startSession', () => {
		it('should call the startSession endpoint', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						session_id: 'session_id',
						sport_id: 'sport_id',
						user_id: 'user_id',
						started_at: 'started_at'
					}
				})
			)
			const api = new SportSessionApi()
			const data: StartSportSessionRequest = {
				user_id: 'user_id',
				started_at: 'started_at',
				sport_id: 'sport_id',
				initial_location: {
					latitude: 1,
					longitude: 1,
					accuracy: 1,
					altitude: 1,
					altitude_accuracy: 1,
					heading: 1,
					speed: 1
				}
			}
			const response = await api.createSportSession(data)

			expect(response).toStrictEqual({
				session_id: 'session_id',
				sport_id: 'sport_id',
				user_id: 'user_id',
				started_at: 'started_at'
			})
		})

		it('should return undefined if the startSession fails', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const api = new SportSessionApi()
			const data: StartSportSessionRequest = {
				user_id: 'user_id',
				started_at: 'started_at',
				sport_id: 'sport_id',
				initial_location: {
					latitude: 1,
					longitude: 1,
					accuracy: 1,
					altitude: 1,
					altitude_accuracy: 1,
					heading: 1,
					speed: 1
				}
			}
			const response = await api.createSportSession(data)

			expect(response).toBeUndefined()
		})
	})

	describe('addSportSessionLocation', () => {
		it('should call the addSportSessionLocation endpoint', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						session_id: 'session_id',
						sport_id: 'sport_id',
						user_id: 'user_id',
						started_at: 'started_at'
					}
				})
			)
			const userApi = new SportSessionApi()
			const data: AddSportSessionLocationRequest = {
				session_id: 'session_id',
				latitude: 1,
				longitude: 1,
				accuracy: 1,
				altitude: 1,
				altitude_accuracy: 1,
				heading: 1,
				speed: 1
			}
			const response = await userApi.addSportSessionLocation(data)

			expect(response).toStrictEqual({
				session_id: 'session_id',
				sport_id: 'sport_id',
				user_id: 'user_id',
				started_at: 'started_at'
			})
		})

		it('should return undefined if the addSportSessionLocation fails', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new SportSessionApi()
			const data: AddSportSessionLocationRequest = {
				session_id: 'session_id',
				latitude: 1,
				longitude: 1,
				accuracy: 1,
				altitude: 1,
				altitude_accuracy: 1,
				heading: 1,
				speed: 1
			}
			const response = await userApi.addSportSessionLocation(data)

			expect(response).toBeUndefined()
		})
	})
	describe('finishSportSession', () => {
		it('should call the finishSportSession endpoint', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						session_id: 'session_id',
						sport_id: 'sport_id',
						user_id: 'user_id',
						started_at: 'started_at'
					}
				})
			)
			const api = new SportSessionApi()

			const data: FinishSportSessionRequest = {
				session_id: 'session_id',
				duration: 1,
				steps: 1,
				distance: 1,
				calories: 1,
				average_speed: 1,
				min_heartrate: 1,
				max_heartrate: 1,
				avg_heartrate: 1
			}
			const response = await api.finishSportSession(data)

			expect(response).toStrictEqual({
				session_id: 'session_id',
				sport_id: 'sport_id',
				user_id: 'user_id',
				started_at: 'started_at'
			})
		})

		it('should return undefined if the finishSportSession fails', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const api = new SportSessionApi()
			const data: FinishSportSessionRequest = {
				session_id: 'session_id',
				duration: 1,
				steps: 1,
				distance: 1,
				calories: 1,
				average_speed: 1,
				min_heartrate: 1,
				max_heartrate: 1,
				avg_heartrate: 1
			}
			const response = await api.finishSportSession(data)

			expect(response).toBeUndefined()
		})
	})
	describe('getAllSportSessions', () => {
		it('should call the getAllSportSessions endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: [
						{
							session_id: 'session_id',
							sport_id: 'sport_id',
							user_id: 'user_id',
							started_at: 'started_at'
						}
					]
				})
			)
			const api = new SportSessionApi()
			const response = await api.getAllSportSessions()

			expect(response).toStrictEqual([
				{
					session_id: 'session_id',
					sport_id: 'sport_id',
					user_id: 'user_id',
					started_at: 'started_at'
				}
			])
		})

		it('should return undefined if the getAllSportSessions fails', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const api = new SportSessionApi()
			const response = await api.getAllSportSessions()

			expect(response).toBeUndefined()
		})
	})
})
