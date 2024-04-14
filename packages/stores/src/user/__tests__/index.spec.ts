import { act, renderHook } from '@testing-library/react'
import { useUserStore } from '../index'
import { User } from '../interfaces'
import UserApi from '@sportapp/sportapp-repository/src/user'
import { SportProfileUpdateRequest } from '@sportapp/sportapp-repository/src/user/interfaces/api/sportProfile'
import { NutritionalProfileUpdateRequest } from '@sportapp/sportapp-repository/src/user/interfaces/api/nutritionalProfile'

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

	describe('getSport', () => {
		it('should get sport', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getSportProfile: jest.fn().mockResolvedValue({
					sport: 'Soccer',
					team: 'Real Madrid',
					position: 'Forward',
					foot: 'Right',
					weight: 80,
					height: 180,
					profile_picture: 'profile_picture'
				})
			}))
			const { result } = renderHook(() => useUserStore())
			const { getSport } = result.current
			expect(result.current.user).toBe(undefined)
			await act(async () => {
				await getSport()
			})
			expect(result.current.user).not.toBe(undefined)
		})

		it('should not get sport and generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getSportProfile: jest.fn().mockRejectedValue(new Error('error'))
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const { getSport } = result.current
			await act(async () => {
				await getSport()
			})
			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})

		it('should not get sport and not generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getSportProfile: jest.fn().mockResolvedValue(undefined)
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const { getSport } = result.current
			await act(async () => {
				await getSport()
			})

			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})
	})

	describe('updateSport', () => {
		it('should update sport', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				updateSportProfile: jest.fn().mockResolvedValue({
					sport: 'Soccer',
					team: 'Real Madrid',
					position: 'Forward',
					foot: 'Right',
					weight: 80,
					height: 180,
					profile_picture: 'profile_picture'
				})
			}))
			const { result } = renderHook(() => useUserStore())
			const { updateSport } = result.current
			expect(result.current.user).toBe(undefined)
			const payload: SportProfileUpdateRequest = {
				available_training_hours: 10,
				favourite_sport_id: '1',
				height: 180,
				training_frequency: '3',
				training_limitations: [
					{
						name: 'test',
						description: 'test'
					}
				],
				training_objective: 'lose_weight',
				weight: 80
			}
			await act(async () => {
				await updateSport(payload)
			})
			expect(result.current.user).not.toBe(undefined)
		})

		it('should not update sport and generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				updateSportProfile: jest
					.fn()
					.mockRejectedValue(new Error('error'))
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const payload: SportProfileUpdateRequest = {
				available_training_hours: 10,
				favourite_sport_id: '1',
				height: 180,
				training_frequency: '3',
				training_limitations: [
					{
						name: 'test',
						description: 'test'
					}
				],
				training_objective: 'lose_weight',
				weight: 80
			}
			const { updateSport } = result.current
			await act(async () => {
				await updateSport(payload)
			})
			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})
	})

	describe('getNutrition', () => {
		it('should get nutrition', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getNutritionalProfile: jest.fn().mockResolvedValue({
					calories: 2000,
					carbohydrates: 200,
					fats: 50,
					proteins: 100
				})
			}))
			const { result } = renderHook(() => useUserStore())
			const { getNutrition } = result.current
			expect(result.current.user).toBe(undefined)
			await act(async () => {
				await getNutrition()
			})
			expect(result.current.user).not.toBe(undefined)
		})

		it('should not get nutrition and generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getNutritionalProfile: jest
					.fn()
					.mockRejectedValue(new Error('error'))
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const { getNutrition } = result.current
			await act(async () => {
				await getNutrition()
			})
			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})

		it('should not get nutrition and not generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getNutritionalProfile: jest.fn().mockResolvedValue(undefined)
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const { getNutrition } = result.current
			await act(async () => {
				await getNutrition()
			})

			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})
	})

	describe('updateNutrition', () => {
		it('should update nutrition', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				updateNutritionalProfile: jest.fn().mockResolvedValue({
					calories: 2000,
					carbohydrates: 200,
					fats: 50,
					proteins: 100
				})
			}))
			const { result } = renderHook(() => useUserStore())
			const { updateNutrition } = result.current
			expect(result.current.user).toBe(undefined)
			const payload: NutritionalProfileUpdateRequest = {
				food_preference: 'test',
				nutritional_limitations: ['test']
			}
			await act(async () => {
				await updateNutrition(payload)
			})
			expect(result.current.user).not.toBe(undefined)
		})

		it('should not update nutrition and generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				updateNutritionalProfile: jest
					.fn()
					.mockRejectedValue(new Error('error'))
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const payload: NutritionalProfileUpdateRequest = {
				food_preference: 'test',
				nutritional_limitations: ['test']
			}
			const { updateNutrition } = result.current
			await act(async () => {
				await updateNutrition(payload)
			})
			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})
	})

	describe('getAllNutritionalLimitations', () => {
		it('should get all nutritional limitations', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getAllNutritionalLimitations: jest.fn().mockResolvedValue([
					{
						name: 'test',
						description: 'test'
					}
				])
			}))
			const { result } = renderHook(() => useUserStore())
			const { getAllNutritionalLimitations } = result.current
			expect(result.current.user).toBe(undefined)
			await act(async () => {
				await getAllNutritionalLimitations()
			})
			expect(result.current.user).not.toBe(undefined)
		})

		it('should not get all nutritional limitations and generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getAllNutritionalLimitations: jest
					.fn()
					.mockRejectedValue(new Error('error'))
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const { getAllNutritionalLimitations } = result.current
			await act(async () => {
				await getAllNutritionalLimitations()
			})
			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})

		it('should not get all nutritional limitations and not generate error', async () => {
			;(UserApi as jest.Mock).mockImplementation(() => ({
				getAllNutritionalLimitations: jest
					.fn()
					.mockResolvedValue(undefined)
			}))
			const { result } = renderHook(() => useUserStore())
			expect(result.current.user).toBe(undefined)
			const { getAllNutritionalLimitations } = result.current
			await act(async () => {
				await getAllNutritionalLimitations()
			})

			expect(result.current.user).toBe(undefined)
			expect(result.current.error).toBe('errors.user.base')
		})
	})
})
