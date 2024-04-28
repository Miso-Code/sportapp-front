import UserApi from '@sportapp/sportapp-repository/src/user'
import { act, renderHook } from '@testing-library/react'
import { useSportsmanStore } from '../index'

jest.mock('@sportapp/sportapp-repository/src/user', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			getAllTrainers: jest.fn().mockResolvedValue([
				{
					trainer_id: '50a5a9fb-3ed3-4e6c-a2d6-39b148c0e6dc',
					first_name: 'John',
					last_name: 'Doe'
				}
			])
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

describe('Sportsman Store', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should set error', async () => {
		const { result } = renderHook(() => useSportsmanStore())
		const { setError } = result.current
		expect(result.current.error).toBe(undefined)
		await act(async () => {
			await setError('error')
		})
		expect(result.current.error).toBe('error')
	})

	it('should set loading', async () => {
		const { result } = renderHook(() => useSportsmanStore())
		const { setLoading } = result.current
		expect(result.current.loading).toBe(false)
		await act(async () => {
			await setLoading(true)
		})
		expect(result.current.loading).toBe(true)
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => useSportsmanStore())
		const { clearState, setLoading, setError } = result.current

		await act(async () => {
			await setLoading(true)
			await setError('error')
		})

		expect(result.current.loading).toBe(true)
		expect(result.current.error).toBe('error')
		await act(async () => {
			await clearState()
		})

		expect(result.current.loading).toBe(false)
		expect(result.current.error).toBe(undefined)
	})

	describe('getAllTrainers', () => {
		it('should get all trainers', async () => {
			const { result } = renderHook(() => useSportsmanStore())
			const { getAllTrainers } = result.current

			await act(async () => {
				await getAllTrainers()
			})

			expect(result.current.trainers).toEqual([
				{
					trainer_id: '50a5a9fb-3ed3-4e6c-a2d6-39b148c0e6dc',
					first_name: 'John',
					last_name: 'Doe'
				}
			])
		})

		it('should set error on getAllTrainers', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				getAllTrainers: jest
					.fn()
					.mockRejectedValueOnce(new Error('error'))
			}))
			const { result } = renderHook(() => useSportsmanStore())
			const { getAllTrainers } = result.current

			await act(async () => {
				await getAllTrainers()
			})

			expect(result.current.error).toBe('errors.trainer.getAll')
		})
	})

	describe('addSportsmanAppointment', () => {
		it('should add sportsman appointment', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				addSportsmanAppointment: jest.fn().mockResolvedValue({
					appointment_id: 'e09eccfd-ef1d-4d1d-a141-b28d713a796c',
					user_id: '3b4ee6ec-189a-4baf-901f-ac6f431fa9fc',
					appointment_date: '2024-04-23T22:05:26',
					appointment_type: 'virtual',
					trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
					appointment_reason: 'Some dumb reason'
				})
			}))
			const { result } = renderHook(() => useSportsmanStore())
			const { addSportsmanAppointment } = result.current

			await act(async () => {
				await addSportsmanAppointment({
					appointment_date: '2024-04-23 22:05:26',
					appointment_type: 'virtual',
					trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
					appointment_reason: 'Some dumb reason'
				})
			})

			expect(result.current.error).toBe(undefined)
		})

		it('should set error on addSportsmanAppointment', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				addSportsmanAppointment: jest
					.fn()
					.mockRejectedValueOnce(new Error('error'))
			}))
			const { result } = renderHook(() => useSportsmanStore())
			const { addSportsmanAppointment } = result.current

			await act(async () => {
				await addSportsmanAppointment({
					appointment_date: '2024-04-23 22:05:26',
					appointment_type: 'virtual',
					trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
					appointment_reason: 'Some dumb reason'
				})
			})

			expect(result.current.error).toBe('errors.sportsmanAppointment.add')
		})

		it('should set loading on addSportsmanAppointment', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				addSportsmanAppointment: jest.fn().mockResolvedValue({
					appointment_id: 'e09eccfd-ef1d-4d1d-a141-b28d713a796c',
					user_id: '3b4ee6ec-189a-4baf-901f-ac6f431fa9fc',
					appointment_date: '2024-04-23T22:05:26',
					appointment_type: 'virtual',
					trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
					appointment_reason: 'Some dumb reason'
				})
			}))
			const { result } = renderHook(() => useSportsmanStore())
			const { addSportsmanAppointment } = result.current

			await act(async () => {
				await addSportsmanAppointment({
					appointment_date: '2024-04-23 22:05:26',
					appointment_type: 'virtual',
					trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
					appointment_reason: 'Some dumb reason'
				})
			})

			expect(result.current.loading).toBe(false)
		})
	})

	describe('getAllSportsmanAppointments', () => {
		it('should get all sportsman appointments', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				getAllSportsmanAppointments: jest.fn().mockResolvedValue([
					{
						appointment_id: '47d081ac-8b5f-4ca4-bcab-ec217593863e',
						user_id: '3b4ee6ec-189a-4baf-901f-ac6f431fa9fc',
						appointment_date: '2024-04-23T22:05:26',
						appointment_type: 'virtual',
						trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
						appointment_reason: ''
					}
				])
			}))
			const { result } = renderHook(() => useSportsmanStore())
			const { getAllSportsmanAppointments } = result.current

			let response: boolean = false

			await act(async () => {
				response = await getAllSportsmanAppointments()
			})

			expect(response).toBe(true)
		})

		it('should set error on getAllSportsmanAppointments', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				getAllSportsmanAppointments: jest
					.fn()
					.mockRejectedValueOnce(new Error('error'))
			}))
			const { result } = renderHook(() => useSportsmanStore())
			const { getAllSportsmanAppointments } = result.current

			await act(async () => {
				await getAllSportsmanAppointments()
			})

			expect(result.current.error).toBe(
				'errors.sportsmanAppointment.getAll'
			)
		})

		it('should set loading on getAllSportsmanAppointments', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				getAllSportsmanAppointments: jest.fn().mockResolvedValue([
					{
						appointment_id: '47d081ac-8b5f-4ca4-bcab-ec217593863e',
						user_id: '3b4ee6ec-189a-4baf-901f-ac6f431fa9fc',
						appointment_date: '2024-04-23T22:05:26',
						appointment_type: 'virtual',
						trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
						appointment_reason: ''
					}
				])
			}))
			const { result } = renderHook(() => useSportsmanStore())
			const { getAllSportsmanAppointments } = result.current

			await act(async () => {
				await getAllSportsmanAppointments()
			})

			expect(result.current.loading).toBe(false)
		})

		it('should set loading on getAllSportsmanAppointments', async () => {
			;(UserApi as jest.Mock).mockImplementationOnce(() => ({
				getAllSportsmanAppointments: jest.fn().mockResolvedValue([
					{
						appointment_id: '47d081ac-8b5f-4ca4-bcab-ec217593863e',
						user_id: '3b4ee6ec-189a-4baf-901f-ac6f431fa9fc',
						appointment_date: '2024-04-23T22:05:26',
						appointment_type: 'virtual',
						trainer_id: '7e2de02d-09eb-438c-8cb1-0ed4e59ef28f',
						appointment_reason: ''
					}
				])
			}))
			const { result } = renderHook(() => useSportsmanStore())
			const { getAllSportsmanAppointments } = result.current

			await act(async () => {
				await getAllSportsmanAppointments()
			})

			expect(result.current.loading).toBe(false)
		})
	})
})
