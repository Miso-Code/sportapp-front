import businessPartnerApi from '@sportapp/sportapp-repository/src/businessPartner'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useAuthStore } from '..'
import { customStorage } from '../utils/storages'
import { IBusinessPartnerState, IBusinessPartnerStore } from './interfaces'

export const initialBusinessPartnerState: IBusinessPartnerState = {
	productToCheckout: undefined
}

export const useBusinessPartnerStore = create(
	persist<IBusinessPartnerStore>(
		(set) => ({
			...initialBusinessPartnerState,
			getAvailableProducts(request) {
				const api = new businessPartnerApi()
				const authToken = useAuthStore.getState().authToken?.accessToken
				return api.getAvailableProducts(request, {
					headers: {
						Authorization: `Bearer ${authToken}`
					}
				})
			},
			purchaseProduct(payload) {
				const api = new businessPartnerApi()
				const authToken = useAuthStore.getState().authToken?.accessToken
				return api.purchaseProduct(payload, {
					headers: {
						Authorization: `Bearer ${authToken}`
					}
				})
			},
			suggestProduct(request) {
				const api = new businessPartnerApi()
				const authToken = useAuthStore.getState().authToken?.accessToken
				return api.suggestProduct(request, {
					headers: {
						Authorization: `Bearer ${authToken}`
					}
				})
			},
			setProductToCheckout: (product) =>
				set((state) => ({ ...state, productToCheckout: product })),
			clearState: () =>
				set((state) => ({ ...state, ...initialBusinessPartnerState }))
		}),
		{
			name: 'business-partner-storage',
			storage: createJSONStorage(() => customStorage())
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('businessPartnerStorage', useBusinessPartnerStore)
}
