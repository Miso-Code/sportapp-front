import { sportappApi } from '../../index'
import UserApi from '../index'
import { RegisterFullUserRequest, RegisterUserRequest } from '../interfaces'
import { NutritionalProfileUpdateRequest } from '../interfaces/api/nutritionalProfile'
import { SportProfileUpdateRequest } from '../interfaces/api/sportProfile'

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
				'http://localhost:3000/api/users/registration',
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

		it('should return false if there is an error', async () => {
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
								value: `data: \r\n\r\n data: \r\n\r\ndata: {"status": "error", "message": "User already exists"}`
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
			await userApi.registerFull(data)

			expect(sportappApi.patch).toHaveBeenCalledWith(
				`/users/complete-registration`,
				data,
				undefined
			)
		})

		it('should return undefined if the request fails', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
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

			try {
				await userApi.registerFull(data)
			} catch (error) {
				expect(error).toMatch('error')
			}
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

		it('should return undefined if the login fails', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()
			const data = {
				email: 'email@example.com',
				password: 'password'
			}

			try {
				await userApi.login(data)
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('loginRefresh', () => {
		it('should call the loginRefresh endpoint', async () => {
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
				refresh_token: 'test_refresh_token'
			}
			const response = await userApi.loginRefresh(data)

			expect(response).toStrictEqual({
				access_token: 'test_access_token',
				access_token_expires_minutes: 1,
				refresh_token: 'test_refresh_token',
				refresh_token_expires_minutes: 1
			})
		})

		it('should return undefined if the loginRefresh fails', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const data = {
				refresh_token: 'test_refresh_token'
			}
			const response = await userApi.loginRefresh(data)

			expect(response).toBeUndefined()
		})

		it('should return undefined if the loginRefresh fails', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()
			const data = {
				refresh_token: 'test_refresh_token'
			}

			try {
				await userApi.loginRefresh(data)
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('getPersonalProfile', () => {
		it('should call the getPersonalProfile endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						email: 'jdoe2@gmail.com',
						first_name: 'John2',
						last_name: 'Doe2',
						identification_type: 'CC',
						identification_number: '123456788',
						gender: 'F',
						country_of_birth: 'CountryOfBirth2',
						city_of_birth: 'CityOfBirth2',
						country_of_residence: 'CountryOfResidence2',
						city_of_residence: 'CityOfResidence2',
						residence_age: 25,
						birth_date: '1996-12-30'
					}
				})
			)
			const userApi = new UserApi()
			const response = await userApi.getPersonalProfile({})

			expect(response).toStrictEqual({
				email: 'jdoe2@gmail.com',
				first_name: 'John2',
				last_name: 'Doe2',
				identification_type: 'CC',
				identification_number: '123456788',
				gender: 'F',
				country_of_birth: 'CountryOfBirth2',
				city_of_birth: 'CityOfBirth2',
				country_of_residence: 'CountryOfResidence2',
				city_of_residence: 'CityOfResidence2',
				residence_age: 25,
				birth_date: '1996-12-30'
			})
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const response = await userApi.getPersonalProfile({ options: {} })

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()

			try {
				await userApi.getPersonalProfile()
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('updatePersonalProfile', () => {
		it('should call the updatePersonalProfile endpoint', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						email: 'jdoe2@gmail.com',
						first_name: 'John2',
						last_name: 'Doe2',
						identification_type: 'CC',
						identification_number: '123456788',
						gender: 'F',
						country_of_birth: 'CountryOfBirth2',
						city_of_birth: 'CityOfBirth2',
						country_of_residence: 'CountryOfResidence2',
						city_of_residence: 'CityOfResidence2',
						residence_age: 25,
						birth_date: '1996-12-30'
					}
				})
			)
			const userApi = new UserApi()
			const data = {
				email: 'jdoe2@gmail.com',
				first_name: 'John2',
				last_name: 'Doe2',
				identification_type: 'CC',
				identification_number: '123456788',
				gender: 'F',
				country_of_birth: 'CountryOfBirth2',
				city_of_birth: 'CityOfBirth2',
				country_of_residence: 'CountryOfResidence2',
				city_of_residence: 'CityOfResidence2',
				residence_age: 25,
				birth_date: '1996-12-30',
				subscription_type: 'FREE'
			}
			const response = await userApi.updatePersonalProfile(data)

			expect(response).toStrictEqual({
				email: 'jdoe2@gmail.com',
				first_name: 'John2',
				last_name: 'Doe2',
				identification_type: 'CC',
				identification_number: '123456788',
				gender: 'F',
				country_of_birth: 'CountryOfBirth2',
				city_of_birth: 'CityOfBirth2',
				country_of_residence: 'CountryOfResidence2',
				city_of_residence: 'CityOfResidence2',
				residence_age: 25,
				birth_date: '1996-12-30'
			})
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const data = {
				email: 'jdoe2@gmail.com',
				first_name: 'John2',
				last_name: 'Doe2',
				identification_type: 'CC',
				identification_number: '123456788',
				gender: 'F',
				country_of_birth: 'CountryOfBirth2',
				city_of_birth: 'CityOfBirth2',
				country_of_residence: 'CountryOfResidence2',
				city_of_residence: 'CityOfResidence2',
				residence_age: 25,
				birth_date: '1996-12-30',
				subscription_type: 'FREE'
			}
			const response = await userApi.updatePersonalProfile(data)

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()
			const data = {
				email: 'jdoe2@gmail.com',
				first_name: 'John2',
				last_name: 'Doe2',
				identification_type: 'CC',
				identification_number: '123456788',
				gender: 'F',
				country_of_birth: 'CountryOfBirth2',
				city_of_birth: 'CityOfBirth2',
				country_of_residence: 'CountryOfResidence2',
				city_of_residence: 'CityOfResidence2',
				residence_age: 25,
				birth_date: '1996-12-30',
				subscription_type: 'FREE'
			}

			try {
				await userApi.updatePersonalProfile(data)
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('getSportProfile', () => {
		it('should call the getSportProfile endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						training_objective: 'build_muscle_mass',
						weight: 101,
						height: 1.7,
						available_training_hours: 10,
						available_week_days: ['monday'],
						preferred_training_start_time: '10:00 AM',
						training_limitations: [
							'85e444a0-91cc-45cb-a8dd-a84ca18e4224'
						],
						bmi: 34.95
					}
				})
			)
			const userApi = new UserApi()
			const response = await userApi.getSportProfile({})

			expect(response).toStrictEqual({
				training_objective: 'build_muscle_mass',
				weight: 101,
				height: 1.7,
				available_training_hours: 10,
				available_week_days: ['monday'],
				preferred_training_start_time: '10:00 AM',
				training_limitations: ['85e444a0-91cc-45cb-a8dd-a84ca18e4224'],
				bmi: 34.95
			})
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const response = await userApi.getSportProfile({ options: {} })

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()

			try {
				await userApi.getSportProfile()
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('updateSportProfile', () => {
		it('should call the updateSportProfile endpoint', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						training_objective: 'build_muscle_mass',
						weight: 101,
						height: 1.7,
						available_training_hours: 10,
						available_week_days: ['monday'],
						preferred_training_start_time: '10:00 AM',
						training_limitations: [
							'85e444a0-91cc-45cb-a8dd-a84ca18e4224'
						],
						bmi: 34.95
					}
				})
			)
			const userApi = new UserApi()
			const data: SportProfileUpdateRequest = {
				available_training_hours: 1,
				favourite_sport_id: '1234',
				height: 1,
				available_weekdays: ['monday'],
				preferred_training_start_time: '10:00 AM',
				training_limitations: [],
				training_objective: 'test',
				weight: 1
			}
			const response = await userApi.updateSportProfile(data)

			expect(response).toStrictEqual({
				training_objective: 'build_muscle_mass',
				weight: 101,
				height: 1.7,
				available_training_hours: 10,
				available_week_days: ['monday'],
				preferred_training_start_time: '10:00 AM',
				training_limitations: ['85e444a0-91cc-45cb-a8dd-a84ca18e4224'],
				bmi: 34.95
			})
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const data: SportProfileUpdateRequest = {
				available_training_hours: 1,
				favourite_sport_id: '1234',
				height: 1,
				available_weekdays: ['monday'],
				preferred_training_start_time: '10:00 AM',
				training_limitations: [],
				training_objective: 'test',
				weight: 1
			}

			const response = await userApi.updateSportProfile(data)

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()
			const data: SportProfileUpdateRequest = {
				available_training_hours: 1,
				favourite_sport_id: '1234',
				height: 1,
				available_weekdays: ['monday'],
				preferred_training_start_time: '10:00 AM',
				training_limitations: [],
				training_objective: 'test',
				weight: 1
			}

			try {
				await userApi.updateSportProfile(data)
			} catch (error) {
				expect(error).toMatch('error')
			}
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()
			const data: SportProfileUpdateRequest = {
				available_training_hours: 1,
				favourite_sport_id: '1234',
				height: 1,
				available_weekdays: ['monday'],
				preferred_training_start_time: '10:00 AM',
				training_limitations: [],
				training_objective: 'test',
				weight: 1
			}

			try {
				await userApi.updateSportProfile(data)
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('getNutritionalProfile', () => {
		it('should call the getNutritionalProfile endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						calories: 2000,
						carbohydrates: 300,
						fats: 50,
						proteins: 100
					}
				})
			)
			const userApi = new UserApi()
			const response = await userApi.getNutritionalProfile()

			expect(response).toStrictEqual({
				calories: 2000,
				carbohydrates: 300,
				fats: 50,
				proteins: 100
			})
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const response = await userApi.getNutritionalProfile()

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()

			try {
				await userApi.getNutritionalProfile()
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('updateNutritionalProfile', () => {
		it('should call the updateNutritionalProfile endpoint', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						calories: 2000,
						carbohydrates: 300,
						fats: 50,
						proteins: 100
					}
				})
			)
			const userApi = new UserApi()
			const data: NutritionalProfileUpdateRequest = {
				food_preference: '',
				nutritional_limitations: ['uuid']
			}
			const response = await userApi.updateNutritionalProfile(data)

			expect(response).toStrictEqual({
				calories: 2000,
				carbohydrates: 300,
				fats: 50,
				proteins: 100
			})
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const data: NutritionalProfileUpdateRequest = {
				food_preference: '',
				nutritional_limitations: ['uuid']
			}
			const response = await userApi.updateNutritionalProfile(data)

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()
			const data: NutritionalProfileUpdateRequest = {
				food_preference: '',
				nutritional_limitations: ['uuid']
			}

			try {
				await userApi.updateNutritionalProfile(data)
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('getAllNutritionalLimitations', () => {
		it('should call the getAllNutritionalLimitations endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: [
						{
							description: 'description',
							limitation_id: 'limitation_id',
							name: 'name'
						}
					]
				})
			)
			const userApi = new UserApi()
			const response = await userApi.getAllNutritionalLimitations()

			expect(response).toStrictEqual([
				{
					description: 'description',
					limitation_id: 'limitation_id',
					name: 'name'
				}
			])
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const response = await userApi.getAllNutritionalLimitations()

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()

			try {
				await userApi.getAllNutritionalLimitations()
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('updatePlan', () => {
		it('should call the updatePlan endpoint', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						status: 'success',
						message: 'Plan updated',
						subscription_start_date: '2021-08-01',
						subscription_end_date: '2021-09-01'
					}
				})
			)
			const userApi = new UserApi()
			const data = {
				data: {
					subscription_type: 'test',
					payment_data: {
						card_number: '123456789',
						card_holder: 'John Doe',
						card_expiration_date: '2023-12',
						card_cvv: '123',
						amount: 100
					}
				}
			}
			const response = await userApi.updatePlan(data)

			expect(response).toStrictEqual({
				status: 'success',
				message: 'Plan updated',
				subscription_start_date: '2021-08-01',
				subscription_end_date: '2021-09-01'
			})
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const data = {
				data: {
					subscription_type: 'test',
					payment_data: {
						card_number: '123456789',
						card_holder: 'John Doe',
						card_expiration_date: '2023-12',
						card_cvv: '123',
						amount: 100
					}
				}
			}
			const response = await userApi.updatePlan(data)

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.patch as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()
			const data = {
				data: {
					subscription_type: 'test',
					payment_data: {
						card_number: '123456789',
						card_holder: 'John Doe',
						card_expiration_date: '2023-12',
						card_cvv: '123',
						amount: 100
					}
				}
			}

			try {
				await userApi.updatePlan(data)
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('getAllTrainers', () => {
		it('should call the getAllTrainers endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: [
						{
							trainer_id: '50a5a9fb-3ed3-4e6c-a2d6-39b148c0e6dc',
							first_name: 'John',
							last_name: 'Doe'
						},
						{
							trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
							first_name: 'Jane',
							last_name: 'Smith'
						}
					]
				})
			)
			const userApi = new UserApi()
			const payload = {
				options: {
					headers: {
						Authorization: 'Bearer test_token'
					}
				}
			}
			const response = await userApi.getAllTrainers(payload)

			expect(response).toStrictEqual([
				{
					trainer_id: '50a5a9fb-3ed3-4e6c-a2d6-39b148c0e6dc',
					first_name: 'John',
					last_name: 'Doe'
				},
				{
					trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
					first_name: 'Jane',
					last_name: 'Smith'
				}
			])
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const payload = {
				options: {
					headers: {
						Authorization: 'Bearer test_token'
					}
				}
			}
			const response = await userApi.getAllTrainers(payload)

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()
			const payload = {
				options: {
					headers: {
						Authorization: 'Bearer test_token'
					}
				}
			}

			try {
				await userApi.getAllTrainers(payload)
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('addSportsmanAppointment', () => {
		it('should call the addSportsmanAppointment endpoint', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: {
						appointment_id: 'e09eccfd-ef1d-4d1d-a141-b28d713a796c',
						user_id: '3b4ee6ec-189a-4baf-901f-ac6f431fa9fc',
						appointment_date: '2024-04-23T22:05:26',
						appointment_type: 'virtual',
						trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
						appointment_reason: 'Some dumb reason'
					}
				})
			)
			const userApi = new UserApi()
			const data = {
				data: {
					appointment_date: '2024-04-23T22:05:26',
					appointment_type: 'virtual',
					trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
					appointment_reason: 'Some dumb reason'
				}
			}
			const response = await userApi.addSportsmanAppointment(data)

			expect(response).toBe(true)
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const data = {
				data: {
					appointment_date: '2024-04-23T22:05:26',
					appointment_type: 'virtual',
					trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
					appointment_reason: 'Some dumb reason'
				}
			}
			const response = await userApi.addSportsmanAppointment(data)

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.post as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()
			const data = {
				data: {
					appointment_date: '2024-04-23T22:05:26',
					appointment_type: 'virtual',
					trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
					appointment_reason: 'Some dumb reason'
				}
			}

			try {
				await userApi.addSportsmanAppointment(data)
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})

	describe('getAllSportsmanAppointments', () => {
		it('should call the getAllSportsmanAppointments endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: [
						{
							appointment_id:
								'e09eccfd-ef1d-4d1d-a141-b28d713a796c',
							user_id: '3b4ee6ec-189a-4baf-901f-ac6f431fa9fc',
							appointment_date: '2024-04-23T22:05:26',
							appointment_type: 'virtual',
							trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
							appointment_reason: 'Some dumb reason'
						}
					]
				})
			)
			const userApi = new UserApi()
			const payload = {
				options: {
					headers: {
						Authorization: 'Bearer test_token'
					}
				}
			}
			const response = await userApi.getAllSportsmanAppointments(payload)

			expect(response).toStrictEqual([
				{
					appointment_id: 'e09eccfd-ef1d-4d1d-a141-b28d713a796c',
					user_id: '3b4ee6ec-189a-4baf-901f-ac6f431fa9fc',
					appointment_date: '2024-04-23T22:05:26',
					appointment_type: 'virtual',
					trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
					appointment_reason: 'Some dumb reason'
				}
			])
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 400
				})
			)
			const userApi = new UserApi()
			const payload = {
				options: {
					headers: {
						Authorization: 'Bearer test_token'
					}
				}
			}
			const response = await userApi.getAllSportsmanAppointments(payload)

			expect(response).toBeUndefined()
		})

		it('should return undefined if the request fails and catch error', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.reject('error')
			)
			const userApi = new UserApi()
			const payload = {
				options: {
					headers: {
						Authorization: 'Bearer test_token'
					}
				}
			}

			try {
				await userApi.getAllSportsmanAppointments(payload)
			} catch (error) {
				expect(error).toMatch('error')
			}
		})
	})
})
