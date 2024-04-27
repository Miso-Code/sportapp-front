import businessPartnerApi from '@sportapp/sportapp-repository/src/businessPartner'

import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
// import { createJSONStorage, persist } from 'zustand/middleware'
import { IBusinessPartnerState, IBusinessPartnerStore } from './interfaces'
import { useAuthStore } from '..'

export const initialBusinessPartnerState: IBusinessPartnerState = {
	productToCheckout: undefined
}

export const useBusinessPartnerStore = create<IBusinessPartnerStore>(
	// persist<IBusinessPartnerStore>( #FIXME: This is not working on expo
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
		setProductToCheckout: (product) =>
			set((state) => ({ ...state, productToCheckout: product })),
		clearState: () =>
			set((state) => ({ ...state, ...initialBusinessPartnerState }))
	})
	// 	{
	// 		name: 'Sport-storage',
	// 		storage: createJSONStorage(() => sessionStorages)
	// 	}
	// )
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('SportStore', useBusinessPartnerStore)
}
