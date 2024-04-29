import UserApi from '@sportapp/sportapp-repository/src/user'
import {
	ESubscription,
	PaymentData
} from '@sportapp/sportapp-repository/src/user/interfaces/api/updatePlan'
import { act, renderHook } from '@testing-library/react'
import { useAuthStore } from '../../auth'
import { usePaymentPlanStore } from '../index'

jest.mock('@sportapp/sportapp-repository/src/user', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			updatePlan: jest.fn().mockResolvedValue(true)
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

describe('Payment Plan Store', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should set error', async () => {
		const { result } = renderHook(() => usePaymentPlanStore())
		const { setError } = result.current
		expect(result.current.error).toBe(undefined)
		await act(async () => {
			await setError('error')
		})
		expect(result.current.error).toBe('error')
	})

	it('should set loading', async () => {
		const { result } = renderHook(() => usePaymentPlanStore())
		const { setLoading } = result.current
		expect(result.current.loading).toBe(false)
		await act(async () => {
			await setLoading(true)
		})
		expect(result.current.loading).toBe(true)
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => usePaymentPlanStore())
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

	describe('updatePlan', () => {
		it('should return true when the plan is updated successfully', async () => {
			const updatePlan = jest.fn().mockResolvedValue(true)
			;(UserApi as unknown as jest.Mock).mockImplementation(() => ({
				updatePlan
			}))
			;(useAuthStore.getState as jest.Mock).mockReturnValue({
				authToken: {
					accessToken: 'authToken'
				}
			})
			const { result } = renderHook(() => usePaymentPlanStore())
			const selectedPlan = ESubscription.FREE
			const paymentData: PaymentData = {
				card_number: '123456789',
				card_holder: 'John Doe',
				card_cvv: '123',
				amount: 0,
				card_expiration_date: '12/25'
			}

			let response: boolean = false

			await act(async () => {
				result.current.setSelectedPlan(selectedPlan)
				result.current.setPaymentData(paymentData)
				response = await result.current.updatePlan()
			})

			expect(updatePlan).toHaveBeenCalledWith({
				data: {
					subscription_type: selectedPlan,
					payment_data: paymentData
				},
				options: {
					headers: {
						Authorization: 'Bearer authToken'
					}
				}
			})
			expect(response).toBe(true)
		})

		it('should return false when the plan is not updated successfully', async () => {
			const updatePlan = jest.fn().mockResolvedValue(false)
			;(UserApi as unknown as jest.Mock).mockImplementation(() => ({
				updatePlan
			}))
			;(useAuthStore.getState as jest.Mock).mockReturnValue({
				authToken: {
					accessToken: 'authToken'
				}
			})
			const { result } = renderHook(() => usePaymentPlanStore())
			const selectedPlan = ESubscription.FREE
			const paymentData: PaymentData = {
				card_number: '123456789',
				card_holder: 'John Doe',
				card_cvv: '123',
				amount: 0,
				card_expiration_date: '12/25'
			}

			let response: boolean = false

			await act(async () => {
				result.current.setSelectedPlan(selectedPlan)
				result.current.setPaymentData(paymentData)
				response = await result.current.updatePlan()
			})

			expect(updatePlan).toHaveBeenCalledWith({
				data: {
					subscription_type: selectedPlan,
					payment_data: paymentData
				},
				options: {
					headers: {
						Authorization: 'Bearer authToken'
					}
				}
			})
			expect(response).toBe(false)
		})

		it('should return false when the plan is not updated successfully, but return api with reject', async () => {
			const updatePlan = jest.fn().mockRejectedValue(false)
			;(UserApi as unknown as jest.Mock).mockImplementation(() => ({
				updatePlan
			}))
			;(useAuthStore.getState as jest.Mock).mockReturnValue({
				authToken: {
					accessToken: 'authToken'
				}
			})
			const { result } = renderHook(() => usePaymentPlanStore())
			const selectedPlan = ESubscription.FREE
			const paymentData: PaymentData = {
				card_number: '123456789',
				card_holder: 'John Doe',
				card_cvv: '123',
				amount: 0,
				card_expiration_date: '12/25'
			}

			let response: boolean = false

			await act(async () => {
				result.current.setSelectedPlan(selectedPlan)
				result.current.setPaymentData(paymentData)
				response = await result.current.updatePlan()
			})

			expect(updatePlan).toHaveBeenCalledWith({
				data: {
					subscription_type: selectedPlan,
					payment_data: paymentData
				},
				options: {
					headers: {
						Authorization: 'Bearer authToken'
					}
				}
			})
			expect(response).toBe(false)
		})

		it('should return false when the plan is not updated successfully, but not selected plan', async () => {
			const updatePlan = jest.fn().mockResolvedValue(false)
			;(UserApi as unknown as jest.Mock).mockImplementation(() => ({
				updatePlan
			}))
			;(useAuthStore.getState as jest.Mock).mockReturnValue({
				authToken: {
					accessToken: 'authToken'
				}
			})

			const { result } = renderHook(() => usePaymentPlanStore())
			let response: boolean = false

			await act(async () => {
				response = await result.current.updatePlan()
			})

			expect(updatePlan).not.toHaveBeenCalled()
			expect(response).toBe(false)
		})

		it('should return false when the plan is not updated successfully, but not payment data', async () => {
			const updatePlan = jest.fn().mockResolvedValue(false)
			;(UserApi as unknown as jest.Mock).mockImplementation(() => ({
				updatePlan
			}))
			;(useAuthStore.getState as jest.Mock).mockReturnValue({
				authToken: {
					accessToken: 'authToken'
				}
			})

			const { result } = renderHook(() => usePaymentPlanStore())
			const selectedPlan = ESubscription.FREE

			let response: boolean = false

			await act(async () => {
				result.current.setSelectedPlan(selectedPlan)
				response = await result.current.updatePlan()
			})

			expect(updatePlan).not.toHaveBeenCalled()
			expect(response).toBe(false)
		})
	})
})
