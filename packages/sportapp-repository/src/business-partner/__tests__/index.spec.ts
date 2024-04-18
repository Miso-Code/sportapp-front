import BusinessPartnerApi from '..'
import { RegisterBusinessPartnerRequest } from '../interfaces/api/register'
import { sportappApi } from '../../index'
import { LoginBusinessPartnerRequest } from '../interfaces/api/login'

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

describe('BusinessPartnerApi', () => {
	const businessPartnerApi = new BusinessPartnerApi()

	describe('register', () => {
		it('should register a business partner', async () => {
			const data: RegisterBusinessPartnerRequest = {
				email: 'test@correo.com',
				password: 'password',
				business_partner_name: 'test'
			}

			const response = {
				status: '200',
				data: {
					business_partner_id: '1',
					email: 'test@correo.com',
					business_partner_name: 'test'
				}
			}

			;(
				sportappApi as jest.Mocked<typeof sportappApi>
			).post.mockResolvedValue(response)
			const result = await businessPartnerApi.register(data)
			expect(result).toEqual(response.data)
		})

		it('should not register a business partner', async () => {
			const data: RegisterBusinessPartnerRequest = {
				email: 'test@correo.com',
				password: 'password',
				business_partner_name: 'test'
			}

			const response = {
				status: '400',
				data: {
					message: 'error'
				}
			}

			;(
				sportappApi as jest.Mocked<typeof sportappApi>
			).post.mockRejectedValue(response)
			const result = await businessPartnerApi.register(data)
			expect(result).toEqual(false)
		})

		it('should not register a business partner', async () => {
			const data: RegisterBusinessPartnerRequest = {
				email: 'test@correo.com',
				password: 'password',
				business_partner_name: 'test'
			}

			const response = {
				status: '400',
				data: {
					message: 'error'
				}
			}

			;(
				sportappApi as jest.Mocked<typeof sportappApi>
			).post.mockRejectedValue(response)
			const result = await businessPartnerApi.register(data)
			expect(result).toEqual(false)
		})

		it('should not register a business partner, becouse responde with 401', async () => {
			const data: RegisterBusinessPartnerRequest = {
				email: 'test@corre.com',
				password: 'password',
				business_partner_name: 'test'
			}

			const response = {
				status: '401',
				data: {
					message: 'error'
				}
			}

			;(
				sportappApi as jest.Mocked<typeof sportappApi>
			).post.mockResolvedValue(response)
			const result = await businessPartnerApi.register(data)
			expect(result).toEqual(false)
		})
	})

	describe('login', () => {
		it('should login a business partner', async () => {
			const data: LoginBusinessPartnerRequest = {
				email: 'test@gmail.com',
				password: 'password'
			}

			const response = {
				status: '200',
				data: {
					business_partner_id: '1',
					email: 'test@correo.com',
					business_partner_name: 'test'
				}
			}

			;(
				sportappApi as jest.Mocked<typeof sportappApi>
			).post.mockResolvedValue(response)
			const result = await businessPartnerApi.login(data)
			expect(result).toEqual(response.data)
		})

		it('should not login a business partner', async () => {
			const data: LoginBusinessPartnerRequest = {
				email: 'test@correo.com',
				password: 'password'
			}

			const response = {
				status: '400',
				data: {
					message: 'error'
				}
			}

			;(
				sportappApi as jest.Mocked<typeof sportappApi>
			).post.mockRejectedValue(response)
			const result = await businessPartnerApi.login(data)
			expect(result).toEqual(false)
		})

		it('should not login a business partner', async () => {
			const data: LoginBusinessPartnerRequest = {
				email: 'test@correo.com',
				password: 'password'
			}

			const response = {
				status: '400',
				data: {
					message: 'error'
				}
			}

			;(
				sportappApi as jest.Mocked<typeof sportappApi>
			).post.mockRejectedValue(response)
			const result = await businessPartnerApi.login(data)
			expect(result).toEqual(false)
		})

		it('should not login a business partner, becouse responde with 401', async () => {
			const data: LoginBusinessPartnerRequest = {
				email: 'test@correo.com',
				password: 'password'
			}

			const response = {
				status: '401',
				data: {
					message: 'error'
				}
			}

			;(
				sportappApi as jest.Mocked<typeof sportappApi>
			).post.mockResolvedValue(response)
			const result = await businessPartnerApi.login(data)
			expect(result).toEqual(false)
		})
	})
})
