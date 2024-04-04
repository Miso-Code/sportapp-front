import UserApi from '../index'
import { RegisterUserRequest } from '../interfaces'
import { sportappApi as mockSportappApi } from '../../index'

jest.mock('../../index', () => ({
	sportappApi: {
		post: jest.fn(),
		get: jest.fn(),
		patch: jest.fn(),
		delete: jest.fn()
	}
}))

describe('UserApi', () => {
	describe('register', () => {
		it('should call the register endpoint', async () => {
			const userApi = new UserApi()
			const data: RegisterUserRequest = {
				email: 'test@correo.com',
				first_name: 'test',
				last_name: 'test',
				password: '1234567Uu*'
			}
			await userApi.register(data)
			expect(mockSportappApi.post).toHaveBeenCalledWith('/users', data)
		})
	})
})
