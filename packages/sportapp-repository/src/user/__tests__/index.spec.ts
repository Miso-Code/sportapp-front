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
					value: 'data: {"status": "success", "message": "User created", "data": {"id": "e4296860-5cad-43ae-a7a7-d8c2acdb0a63", "email": "bryanhenaoxx12x53@gmail.com", "first_name": "John", "last_name": "Doe"}}'
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

			expect(result).toStrictEqual({
				email: 'bryanhenaoxx12x53@gmail.com',
				first_name: 'John',
				id: 'e4296860-5cad-43ae-a7a7-d8c2acdb0a63',
				last_name: 'Doe'
			})
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
								value: 'data: {"status": "error", "message": "User already exists"}'
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
				expect(error).toMatch('error')
			}
		})
	})

	describe('registerFull', () => {
		it('should call the registerFull endpoint', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						status: 'success',
						message: 'User created',
						data: {
							user_id: '195a9233-2c4f-4c59-9f84-e327b6a48218',
							first_name: 'John',
							last_name: 'Doe',
							email: 'bryanhenaoxx12u53@gmail.com',
							identification_type: 'CC',
							identification_number: '123456789',
							gender: 'M',
							country_of_birth: 'CountryOfBirth',
							city_of_birth: 'CityOfBirth',
							country_of_residence: 'CountryOfResidence',
							city_of_residence: 'CityOfResidence',
							residence_age: 25,
							birth_date: '1996-12-31'
						}
					}
				})
			)
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

			expect(sportappApi.patch).toHaveBeenCalledWith(
				`/users/${uuid}/complete-registration`,
				data
			)
		})
	})

	describe('login', () => {
		it('should call the login endpoint', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						access_token: 'test_access_token',
						access_token_expires_minutes: 1,
						refresh_token: 'test_refresh_token',
						refresh_token_expires_minutes: 1
					}
				})
			)
			const userApi = new UserApi()
			const data = {
				email: 'email@example.com',
				password: 'password'
			}
			const response = await userApi.login(data)

			expect(response).toStrictEqual({
				access_token: 'test_access_token',
				access_token_expires_minutes: 1,
				refresh_token: 'test_refresh_token',
				refresh_token_expires_minutes: 1
			})
		})

		it('should return undefined if the login fails', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const data = {
				email: 'email@example.com',
				password: 'password'
			}
			const response = await userApi.login(data)

			expect(response).toBeUndefined()
		})
	})
})
