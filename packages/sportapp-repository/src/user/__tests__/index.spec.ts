import UserApi from '../index'
import { RegisterFullUserRequest, RegisterUserRequest } from '../interfaces'
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
		VITE_SPORTAPP_API_URL: 'http://localhost:3000/api'
	}))
}))
const response = {
	pipeThrough: jest.fn(() => ({
		getReader: jest.fn(() => ({
			read: jest.fn(() =>
				Promise.resolve({
					done: false,
					value: 'User created'
				})
			)
		}))
	}))
}

global.fetch = jest.fn(() => Promise.resolve({ body: response })) as jest.Mock

describe('UserApi', () => {
	describe('register', () => {
		beforeEach(() => {
			;(fetch as jest.Mock).mockClear()
		})

		it('should call the register endpoint', async () => {
			const userApi = new UserApi()
			const data: RegisterUserRequest = {
				email: 'test@correo.com',
				first_name: 'test',
				last_name: 'test',
				password: '1234567Uu*'
			}
			await userApi.register(data)

			expect(fetch).toHaveBeenCalledWith(
				'http://localhost:3000/api/users',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				}
			)
		})

		it('should return true if the user is created', async () => {
			const data: RegisterUserRequest = {
				email: 'tests@correo.com',
				first_name: 'test',
				last_name: 'test',
				password: '1234567Uu*'
			}

			;(fetch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({ body: response })
			)
			const userApi = new UserApi()

			const result = await userApi.register(data)

			expect(result).toBe(true)
		})

		it('should return false if the user is not created', async () => {
			const data: RegisterUserRequest = {
				email: 'tests@correo.com',
				first_name: 'test',
				last_name: 'test',
				password: '1234567Uu*'
			}
			const response = {
				pipeThrough: jest.fn(() => ({
					getReader: jest.fn(() => ({
						read: jest.fn(() =>
							Promise.resolve({
								done: false,
								value: 'User already exists'
							})
						)
					}))
				}))
			}

			;(fetch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({ body: response })
			)
			const userApi = new UserApi()

			const result = await userApi.register(data)

			expect(result).toBe(false)
		})

		it('should return false if there is an error', async () => {
			const data: RegisterUserRequest = {
				email: 'tests@correo.com',
				first_name: 'test',
				last_name: 'test',
				password: '1234567Uu*'
			}

			;(fetch as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()

			try {
				await userApi.register(data)
			} catch (error) {
				expect(error).toBe('error')
			}
		})
	})

	describe('registerFull', () => {
		it('should call the registerFull endpoint', async () => {
			const userApi = new UserApi()
			const data: RegisterFullUserRequest = {
				birth_date: '1990-01-01',
				city_of_birth: 'test',
				city_of_residence: 'test',
				country_of_birth: 'test',
				country_of_residence: 'test',
				gender: 'M',
				identification_number: '12345678',
				identification_type: 'CC',
				residence_age: 1
			}
			const uuid = '1234'
			await userApi.registerFull(uuid, data)

			expect(sportappApi.post).toHaveBeenCalledWith(
				`/users/${uuid}/complete-registration`,
				data
			)
		})
	})
})
