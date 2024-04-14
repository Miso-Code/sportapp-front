import { act, renderHook } from '@testing-library/react'
import { useAuthStore } from '../index'
import {
	RegisterUserRequest,
	RegisterFullUserRequest
} from '@sportapp/sportapp-repository/src/user/interfaces'
import UserApi from '@sportapp/sportapp-repository/src/user'
import { User } from '../interfaces'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

jest.mock('@sportapp/sportapp-repository/src/user', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			register: jest.fn().mockResolvedValue({
				id: 'e4296860-5cad-43ae-a7a7-d8c2acdb0a63',
				email: 'bryanhenaoxx12x53@gmail.com',
				first_name: 'John',
				last_name: 'Doe'
			}),
			registerFull: jest.fn().mockResolvedValue({
				identification_type: 'CC',
				identification_number: '123456789',
				gender: 'M',
				country_of_birth: 'CountryOfBirth',
				city_of_birth: 'CityOfBirth',
				country_of_residence: 'CountryOfResidence',
				city_of_residence: 'CityOfResidence',
				residence_age: 25,
				birth_date: '1996-12-31'
			})
		}))
	}
})

describe('AuthStore', () => {
	const OLD_ENV = process.env
	beforeEach(() => {
		jest.resetModules()
		process.env = { ...OLD_ENV }
	})

	afterEach(async () => {
		process.env = OLD_ENV
		jest.clearAllMocks()
	})

	it('should set error', async () => {
		const { result } = renderHook(() => useAuthStore())
		const { setError } = result.current
		expect(result.current.error).toBe(undefined)
		await act(async () => {
			await setError('error')
		})
		expect(result.current.error).toBe('error')
	})

	it('should set loading', async () => {
		const { result } = renderHook(() => useAuthStore())
		const { setLoading } = result.current
		expect(result.current.loading).toBe(false)
		await act(async () => {
			await setLoading(true)
		})
		expect(result.current.loading).toBe(true)
	})

	it('should set user', async () => {
		const { result } = renderHook(() => useAuthStore())
		const { setUser } = result.current
		expect(result.current.user).toBe(undefined)
		const payload: User = {
			id: 'e4296860-5cad-43ae-a7a7-d8c2acdb0a63',
			email: 'test@test.com',
			first_name: 'John',
			last_name: 'Doe'
		}
		await act(async () => {
			await setUser(payload)
		})
		expect(result.current.user).toStrictEqual(payload)
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => useAuthStore())
		const { clearState } = result.current

		await act(async () => {
			await clearState()
		})
		expect(result.current.user).toBe(undefined)
		expect(result.current.isAuth).toBe(false)
		expect(result.current.error).toBe(undefined)
	})

	describe('register', () => {
		const initialStoreState = useAuthStore.getState()

		beforeEach(() => {
			useAuthStore.setState(initialStoreState)
		})

		afterEach(() => {
			jest.resetAllMocks()
		})

		it('should register and update user', async () => {
			const { result } = renderHook(() => useAuthStore())
			const { register } = result.current
			expect(result.current.user).toBe(undefined)
			const payload: RegisterUserRequest = {
				email: 'a',
				first_name: 'b',
				last_name: 'c',
				password: 'd'
			}
			await act(async () => {
				await register(payload)
			})
			expect(result.current.user).toStrictEqual({
				id: 'e4296860-5cad-43ae-a7a7-d8c2acdb0a63',
				email: 'bryanhenaoxx12x53@gmail.com',
				first_name: 'John',
				last_name: 'Doe'
			})
		})

		it('should not register and set error', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				register: jest.fn().mockResolvedValue(false)
			}))
			const { result } = renderHook(() => useAuthStore())
			const { register } = result.current
			expect(result.current.user).toBe(undefined)
			const payload: RegisterUserRequest = {
				email: 'a',
				first_name: 'b',
				last_name: 'c',
				password: 'd'
			}
			await act(async () => {
				await register(payload)
			})
			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.register.base')
		})

		it('should not register and set error', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				register: jest.fn().mockRejectedValue(new Error('error'))
			}))
			const { result } = renderHook(() => useAuthStore())
			const { register } = result.current
			expect(result.current.user).toBe(undefined)
			const payload: RegisterUserRequest = {
				email: 'a',
				first_name: 'b',
				last_name: 'c',
				password: 'd'
			}
			await act(async () => {
				await register(payload)
			})
			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.register.base')
		})
	})

	describe('registerFull', () => {
		const initialStoreState = useAuthStore.getState()

		beforeEach(() => {
			useAuthStore.setState(initialStoreState)
		})

		afterEach(() => {
			jest.resetAllMocks()
		})

		it('should register full', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				registerFull: jest.fn().mockResolvedValue({
					identification_type: 'CC',
					identification_number: '123456789',
					gender: 'M',
					country_of_birth: 'CountryOfBirth',
					city_of_birth: 'CityOfBirth',
					country_of_residence: 'CountryOfResidence',
					city_of_residence: 'CityOfResidence',
					residence_age: 25,
					birth_date: '1996-12-31'
				})
			}))
			const { result } = renderHook(() => useAuthStore())
			expect(result.current.user).toBe(undefined)

			const { registerFull, setUser } = result.current

			const userPayload: User = {
				id: 'e4296860-5cad-43ae-a7a7-d8c2acdb0a63',
				email: 'test@test.com',
				first_name: 'John',
				last_name: 'Doe'
			}

			await act(async () => {
				await setUser(userPayload)
			})

			const payload: RegisterFullUserRequest = {
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
			const expectedValue = { ...payload }
			await act(async () => {
				const result = await registerFull(payload)
				expect(result).toStrictEqual(expectedValue)
			})
		})

		it('should not register full', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				registerFull: jest.fn().mockResolvedValue(false)
			}))
			const { result } = renderHook(() => useAuthStore())
			expect(result.current.user).toBe(undefined)

			const { registerFull, setUser } = result.current

			const userPayload: User = {
				id: 'e4296860-5cad-43ae-a7a7-d8c2acdb0a63',
				email: 'test@test.com',
				first_name: 'John',
				last_name: 'Doe'
			}

			await act(async () => {
				await setUser(userPayload)
			})

			const payload: RegisterFullUserRequest = {
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
			const expectedValue = false
			await act(async () => {
				const result = await registerFull(payload)
				expect(result).toStrictEqual(expectedValue)
			})
		})

		it('should not register full', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				registerFull: jest.fn().mockRejectedValue(new Error('error'))
			}))
			const { result } = renderHook(() => useAuthStore())
			expect(result.current.user).toBe(undefined)

			const { registerFull } = result.current

			const payload: RegisterFullUserRequest = {
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

			await act(async () => {
				const result = await registerFull(payload)
				expect(result).toBe(false)
			})
		})
	})

	describe('login', () => {
		const initialStoreState = useAuthStore.getState()

		beforeEach(() => {
			useAuthStore.setState(initialStoreState)
		})

		afterEach(() => {
			jest.resetAllMocks()
		})

		it('should login', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				login: jest.fn().mockResolvedValue({
					access_token: 'accessToken',
					access_token_expires_minutes: 1,
					refresh_token: 'refreshToken',
					refresh_token_expires_minutes: 1
				})
			}))

			const { result } = renderHook(() => useAuthStore())

			expect(result.current.authToken).toBe(undefined)
			expect(result.current.isAuth).toBe(false)

			const { login } = result.current

			const loginPayload = {
				email: 'email@example.com',
				password: 'password'
			}

			await act(async () => {
				await login(loginPayload)
			})

			expect(result.current.authToken).toStrictEqual({
				accessToken: 'accessToken',
				accessTokenExpirationMinutes: 1,
				refreshToken: 'refreshToken',
				refreshTokenExpirationMinutes: 1
			})

			expect(result.current.isAuth).toBe(true)
		})

		it('should not login', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				login: jest.fn().mockResolvedValue(false)
			}))

			const { result } = renderHook(() => useAuthStore())

			expect(result.current.authToken).toBe(undefined)
			expect(result.current.isAuth).toBe(false)

			const { login } = result.current

			const loginPayload = {
				email: 'test@email.com',
				password: 'password'
			}

			await act(async () => {
				await login(loginPayload)
			})

			expect(result.current.authToken).toBe(undefined)
			expect(result.current.isAuth).toBe(false)
		})
	})

	describe('logout', () => {
		const initialStoreState = useAuthStore.getState()

		beforeEach(() => {
			useAuthStore.setState(initialStoreState)
		})

		afterEach(() => {
			jest.resetAllMocks()
		})

		it('should logout', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				login: jest.fn().mockResolvedValue({
					access_token: 'accessToken',
					access_token_expires_minutes: 1,
					refresh: 'refreshToken',
					refresh_token_expires_minutes: 1
				})
			}))
			const { result } = renderHook(() => useAuthStore())

			expect(result.current.authToken).toBe(undefined)
			expect(result.current.isAuth).toBe(false)

			const { login, logout } = result.current

			const loginPayload = {
				email: 'test@email.com',
				password: 'password'
			}

			await act(async () => {
				await login(loginPayload)
			})

			expect(result.current.authToken).not.toBe(undefined)
			expect(result.current.isAuth).toBe(true)

			await act(async () => {
				await logout()
			})

			expect(result.current.authToken).toBe(undefined)
			expect(result.current.isAuth).toBe(false)
		})
	})
})
