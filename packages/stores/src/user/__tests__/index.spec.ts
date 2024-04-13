import { act, renderHook } from '@testing-library/react'
import { useUserStore } from '../index'
import { User } from '../interfaces'
import UserApi from '@sportapp/sportapp-repository/src/user'

jest.mock('@sportapp/sportapp-repository/src/user', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			getPersonalProfile: jest.fn().mockResolvedValue({
				first_name: 'John',
				last_name: 'Doe',
				email: 'test@email.com',
				birth_date: '1996-12-31',
				city_of_birth: 'New York',
				city_of_residence: 'New York',
				country_of_birth: 'USA',
				country_of_residence: 'USA',
				gender: 'M',
				residence_age: 25,
				identification_number: '123456789',
				identification_type: 'CC'
			}),
			updatePersonalProfile: jest.fn().mockResolvedValue({
				first_name: 'John',
				last_name: 'Doe',
				email: 'test@email.com',
				birth_date: '1996-12-31',
				city_of_birth: 'New York',
				city_of_residence: 'New York',
				country_of_birth: 'USA',
				country_of_residence: 'USA',
				gender: 'M',
				residence_age: 25,
				identification_number: '123456789',
				identification_type: 'CC'
			})
		}))
	}
})

jest.mock('../../auth', () => ({
	useAuthStore: {
		getState: jest.fn().mockReturnValue({
			authToken: 'authToken'
		})
	}
}))

describe('UserStore', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should set error', async () => {
		const { result } = renderHook(() => useUserStore())
		const { setError } = result.current
		expect(result.current.error).toBe(undefined)
		await act(async () => {
			await setError('error')
		})
		expect(result.current.error).toBe('error')
	})

	it('should set loading', async () => {
		const { result } = renderHook(() => useUserStore())
		const { setLoading } = result.current
		expect(result.current.loading).toBe(false)
		await act(async () => {
			await setLoading(true)
		})
		expect(result.current.loading).toBe(true)
	})

	it('should set user', async () => {
		const { result } = renderHook(() => useUserStore())
		const { setUser } = result.current
		expect(result.current.user).toBe(undefined)
		const payload: User = {
			profileData: {
				first_name: 'John',
				last_name: 'Doe',
				email: 'test@email.com',
				birth_date: '1996-12-31',
				city_of_birth: 'New York',
				city_of_residence: 'New York',
				country_of_birth: 'USA',
				country_of_residence: 'USA',
				gender: 'M',
				residence_age: 25,
				identification_number: '123456789',
				identification_type: 'CC'
			}
		}

		await act(async () => {
			await setUser(payload)
		})
		expect(result.current.user).toStrictEqual(payload)
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => useUserStore())
		const { clearState, setUser } = result.current
		const payload: User = {
			profileData: {
				first_name: 'John',
				last_name: 'Doe',
				email: 'test@email.com',
				birth_date: '1996-12-31',
				city_of_birth: 'New York',
				city_of_residence: 'New York',
				country_of_birth: 'USA',
				country_of_residence: 'USA',
				gender: 'M',
				residence_age: 25,
				identification_number: '123456789',
				identification_type: 'CC'
			}
		}

		await act(async () => {
			await setUser(payload)
		})

		expect(result.current.user).toStrictEqual(payload)

		await act(async () => {
			await clearState()
		})

		expect(result.current.user).toBe(undefined)
		expect(result.current.error).toBe(undefined)
		expect(result.current.loading).toBe(false)
	})

	describe('getProfile', () => {
		it('should get profile', async () => {
			const { result } = renderHook(() => useUserStore())
			const { getProfile } = result.current
			expect(result.current.user).toBe(undefined)
			await act(async () => {
				await getProfile()
			})
			expect(result.current.user).not.toBe(undefined)
		})

		it('should not get profile and generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getPersonalProfile: jest
					.fn()
					.mockRejectedValue(new Error('error'))
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const { getProfile } = result.current
			await act(async () => {
				await getProfile()
			})
			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})

		it('should not get profile and not generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getPersonalProfile: jest.fn().mockResolvedValue(undefined)
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const { getProfile } = result.current
			await act(async () => {
				await getProfile()
			})

			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})
	})

	describe('updateProfile', () => {
		it('should update profile', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				updatePersonalProfile: jest.fn().mockResolvedValue({
					first_name: 'John',
					last_name: 'Doe',
					email: 'test@email.com',
					birth_date: '1996-12-31',
					city_of_birth: 'New York',
					city_of_residence: 'New York',
					country_of_birth: 'USA',
					country_of_residence: 'USA',
					gender: 'M',
					residence_age: 25,
					identification_number: '123456789',
					identification_type: 'CC'
				})
			}))
			const { result } = renderHook(() => useUserStore())
			const { updateProfile } = result.current
			expect(result.current.user).toBe(undefined)
			const payload = {
				first_name: 'John',
				last_name: 'Doe',
				email: 'test@email.com',
				birth_date: '1996-12-31',
				city_of_birth: 'New York',
				city_of_residence: 'New York',
				country_of_birth: 'USA',
				country_of_residence: 'USA',
				gender: 'M',
				residence_age: 25,
				identification_number: '123456789',
				identification_type: 'CC'
			}
			await act(async () => {
				await updateProfile(payload)
			})
			expect(result.current.user).not.toBe(undefined)
		})

		it('should not update profile and generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				updatePersonalProfile: jest
					.fn()
					.mockRejectedValue(new Error('error'))
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const payload = {
				first_name: 'John',
				last_name: 'Doe',
				email: 'test@email.com',
				birth_date: '1996-12-31',
				city_of_birth: 'New York',
				city_of_residence: 'New York',
				country_of_birth: 'USA',
				country_of_residence: 'USA',
				gender: 'M',
				residence_age: 25,
				identification_number: '123456789',
				identification_type: 'CC'
			}
			const { updateProfile } = result.current
			await act(async () => {
				await updateProfile(payload)
			})
			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})
	})
})
