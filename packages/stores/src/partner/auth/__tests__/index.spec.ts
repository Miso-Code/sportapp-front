import { act, renderHook } from '@testing-library/react'
import { usePartnerAuthStore } from '../index'
import {
	RegisterBusinessPartnerRequest,
	RegisterBusinessPartnerResponse
} from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/register'
import BusinessPartner from '@sportapp/sportapp-repository/src/business-partner'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

jest.mock('@sportapp/sportapp-repository/src/business-partner', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			register: jest.fn().mockResolvedValue({
				email: 'test@correo.com',
				business_partner_id: 'e83f6673-c4fd-412f-825c-d73e600f2400',
				business_partner_name: 'John Doe Company'
			}),
			login: jest.fn().mockResolvedValue({
				user_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
				access_token:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjJlZDEzN2QtMjg5OC00ZDFjLWFlNDQtYTQ1MWI4ZjRmNzI5Iiwic2NvcGVzIjpbImJ1c2luZXNzX3BhcnRuZXIiXSwiZXhwaXJ5IjoxNzEzNDA4OTMzLjU5Mzk3fQ.w5TTuDMrcJShpCwLGdmiogoAAFYGGZoXMtybxoMD-Ks',
				access_token_expires_minutes: 30,
				refresh_token:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjJlZDEzN2QtMjg5OC00ZDFjLWFlNDQtYTQ1MWI4ZjRmNzI5Iiwic2NvcGVzIjpbImJ1c2luZXNzX3BhcnRuZXIiXSwiZXhwaXJ5IjoxNzE0MDExOTMzLjU5NzQ1OH0.zDw39Mo5cKRhJ4579gIqWRbyJxJCQGfUEzHYG7LX6EE',
				refresh_token_expires_minutes: 10080
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
		const { result } = renderHook(() => usePartnerAuthStore())
		const { setError } = result.current
		expect(result.current.error).toBe(undefined)
		await act(async () => {
			await setError('error')
		})
		expect(result.current.error).toBe('error')
	})

	it('should set loading', async () => {
		const { result } = renderHook(() => usePartnerAuthStore())
		const { setLoading } = result.current
		expect(result.current.loading).toBe(false)
		await act(async () => {
			await setLoading(true)
		})
		expect(result.current.loading).toBe(true)
	})

	it('should set user', async () => {
		const { result } = renderHook(() => usePartnerAuthStore())
		const { setUser } = result.current
		expect(result.current.user).toBe(undefined)
		const payload: RegisterBusinessPartnerResponse = {
			business_partner_id: 'e83f6673-c4fd-412f-825c-d73e600f2400',
			business_partner_name: 'John Doe Company',
			email: 'jdoe36@jdcompany.com'
		}
		await act(async () => {
			await setUser(payload)
		})
		expect(result.current.user).toStrictEqual(payload)
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => usePartnerAuthStore())
		const { clearState } = result.current

		await act(async () => {
			await clearState()
		})
		expect(result.current.user).toBe(undefined)
		expect(result.current.isAuth).toBe(false)
		expect(result.current.error).toBe(undefined)
	})

	describe('register', () => {
		const initialStoreState = usePartnerAuthStore.getState()

		beforeEach(() => {
			usePartnerAuthStore.setState(initialStoreState)
		})

		afterEach(() => {
			jest.resetAllMocks()
		})

		it('should register', async () => {
			const { result } = renderHook(() => usePartnerAuthStore())
			const { register } = result.current

			const request: RegisterBusinessPartnerRequest = {
				email: 'test@gmail.com',
				password: 'password',
				business_partner_name: 'John Doe Company'
			}

			expect(result.current.user).toBe(undefined)
			expect(result.current.isAuth).toBe(false)

			await act(async () => {
				await register(request)
			})

			expect(result.current.user).not.toBe(undefined)
			expect(result.current.isAuth).toBe(true)
		})

		it('should not register', async () => {
			const { result } = renderHook(() => usePartnerAuthStore())
			const { register } = result.current

			const request: RegisterBusinessPartnerRequest = {
				email: 'test@correo.com',
				password: 'password',
				business_partner_name: 'John Doe Company'
			}

			expect(result.current.user).toBe(undefined)
			expect(result.current.isAuth).toBe(false)

			await act(async () => {
				await register(request)
			})

			expect(result.current.user).toBe(undefined)
			expect(result.current.isAuth).toBe(false)
		})

		it('should set error', async () => {
			const { result } = renderHook(() => usePartnerAuthStore())
			const { register } = result.current

			const request: RegisterBusinessPartnerRequest = {
				email: 'test@gmail.com',
				password: 'password',
				business_partner_name: 'John Doe Company'
			}

			expect(result.current.error).toBe(undefined)

			await act(async () => {
				await register(request)
			})

			expect(result.current.error).toBe('errors.register.base')
		})

		it('should set error, because login response is false', async () => {
			;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
				register: jest.fn().mockResolvedValue(false),
				login: jest.fn().mockResolvedValue(false)
			}))
			const { result } = renderHook(() => usePartnerAuthStore())
			const { register } = result.current

			const request: RegisterBusinessPartnerRequest = {
				email: 'test@correo.com',
				password: 'password',
				business_partner_name: 'John Doe Company'
			}

			expect(result.current.error).toBe(undefined)

			await act(async () => {
				await register(request)
			})

			expect(result.current.error).toBe('errors.register.base')
		})
	})

	describe('login', () => {
		const initialStoreState = usePartnerAuthStore.getState()

		beforeEach(() => {
			usePartnerAuthStore.setState(initialStoreState)
		})

		afterEach(() => {
			jest.resetAllMocks()
		})

		it('should login', async () => {
			;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
				login: jest.fn().mockResolvedValue({
					user_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
					access_token: 'accessToken',
					access_token_expires_minutes: 1,
					refresh: 'refreshToken',
					refresh_token_expires_minutes: 1
				})
			}))
			const { result } = renderHook(() => usePartnerAuthStore())
			const { login } = result.current

			const request = {
				email: 'test@correo.com',
				password: 'password'
			}

			expect(result.current.authToken).toBe(undefined)
			expect(result.current.isAuth).toBe(false)

			await act(async () => {
				await login(request)
			})

			expect(result.current.authToken).not.toBe(undefined)
			expect(result.current.isAuth).toBe(true)
		})

		it('should not login', async () => {
			;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
				login: jest.fn().mockResolvedValue(false)
			}))
			const { result } = renderHook(() => usePartnerAuthStore())
			const { login } = result.current

			const request = {
				email: 'test@correo.com',
				password: 'password'
			}

			expect(result.current.authToken).toBe(undefined)
			expect(result.current.isAuth).toBe(false)

			await act(async () => {
				await login(request)
			})

			expect(result.current.authToken).toBe(undefined)
			expect(result.current.isAuth).toBe(false)
		})

		it('should set error', async () => {
			const { result } = renderHook(() => usePartnerAuthStore())
			const { login } = result.current

			const request = {
				email: 'test@correo.com',
				password: 'password'
			}

			expect(result.current.error).toBe(undefined)

			await act(async () => {
				await login(request)
			})

			expect(result.current.error).toBe('errors.login.base')
		})
	})

	describe('logout', () => {
		const initialStoreState = usePartnerAuthStore.getState()

		beforeEach(() => {
			usePartnerAuthStore.setState(initialStoreState)
		})

		afterEach(() => {
			jest.resetAllMocks()
		})

		it('should logout', async () => {
			;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
				login: jest.fn().mockResolvedValue({
					access_token: 'accessToken',
					access_token_expires_minutes: 1,
					refresh: 'refreshToken',
					refresh_token_expires_minutes: 1
				})
			}))
			const { result } = renderHook(() => usePartnerAuthStore())

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
