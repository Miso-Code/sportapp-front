import alertsApi from '..'
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

describe('alertsApi', () => {
	it('should create an instance of alertsApi', () => {
		const alerts = new alertsApi()
		expect(alerts).toBeInstanceOf(alertsApi)
	})

	describe('createOrUpdateUserDeviceToken', () => {
		it('should call the registerDeviceToken endpoint', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						device_token: 'device'
					}
				})
			)

			const api = new alertsApi()
			const response = await api.createOrUpdateUserDeviceToken('device')

			expect(response).toBe(true)
		})

		it('should call the registerDeviceToken endpoint and return undefined', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)

			const api = new alertsApi()
			const response = await api.createOrUpdateUserDeviceToken('device')

			expect(response).toBe(false)
		})

		it('should call the registerDeviceToken endpoint and return undefined', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.reject({
					status: 400
				})
			)

			const api = new alertsApi()
			const response = await api.createOrUpdateUserDeviceToken('device')

			expect(response).toBe(undefined)
		})
	})
})
