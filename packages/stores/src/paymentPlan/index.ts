import UserApi from '@sportapp/sportapp-repository/src/user'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useAuthStore } from '../auth'
import { customStorage } from '../utils/storages'
import { IPaymentPlanState, IPaymentPlanStore } from './interfaces'

export const initialPaymentPlanState: IPaymentPlanState = {
	loading: false,
	error: undefined,
	paymentData: undefined,
	selectedPlan: undefined
}

export const usePaymentPlanStore = create(
	persist<IPaymentPlanStore>(
		(set, get) => ({
			...initialPaymentPlanState,
			setLoading: (loading) => set({ loading }),
			setError: (error) => set({ error }),
			setPaymentData: (paymentData) => set({ paymentData }),
			setSelectedPlan: (selectedPlan) => set({ selectedPlan }),
			clearState: () =>
				set((state) => ({ ...state, ...initialPaymentPlanState })),
			updatePlan: async () => {
				const userApi = new UserApi()
				try {
					set((state) => ({
						...state,
						loading: true
					}))

					const selectedPlan = get().selectedPlan
					const paymentData = get().paymentData

					if (!selectedPlan || !paymentData) {
						set((state) => ({
							...state,
							error: 'errors.user.base',
							loading: false
						}))
						return false
					}

					const authToken =
						useAuthStore.getState().authToken?.accessToken

					const response = await userApi.updatePlan({
						data: {
							subscription_type: selectedPlan,
							payment_data: paymentData
						},
						options: {
							headers: {
								Authorization: `Bearer ${authToken}`
							}
						}
					})
					if (response) {
						set((state) => ({
							...state,
							loading: false
						}))
						return true
					}
					set((state) => ({
						...state,
						error: 'errors.user.base',
						loading: false
					}))
					return false
				} catch (e) {
					set((state) => ({
						...state,
						error: 'errors.user.base',
						loading: false
					}))
					return false
				}
			}
		}),
		{
			name: 'PaymentPlan-storage',
			storage: createJSONStorage(() => customStorage())
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('PaymentPlanStore', usePaymentPlanStore)
}
