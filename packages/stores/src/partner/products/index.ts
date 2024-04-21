import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { customStorage } from '../../utils/storages'
import { IProductState, IProductStore } from './interfaces'
import { ProductCreateRequest } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product-create'
import { Product } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product'
import BusinessPartnerApi from '@sportapp/sportapp-repository/src/business-partner'
import { usePartnerAuthStore } from '../auth'

export const initialProducPartnerState: IProductState = {
	products: undefined,
	error: undefined,
	loading: false,
	selectedProduct: undefined
}

export const usePartnerProductStore = create(
	persist<IProductStore>(
		(set) => ({
			...initialProducPartnerState,
			setError: (error) => {
				set((state) => ({
					...state,
					error
				}))
			},
			setLoading: (isLoading) => {
				set((state) => ({
					...state,
					loading: isLoading
				}))
			},
			clearState: () => {
				set(() => ({
					...initialProducPartnerState
				}))
			},
			setProducts: (products: Product[]) => {
				set((state) => ({
					...state,
					products
				}))
			},
			createProduct: async (product: ProductCreateRequest) => {
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken =
						usePartnerAuthStore.getState().authToken?.accessToken

					const businessPartnerApi = new BusinessPartnerApi()
					const response = await businessPartnerApi.createProduct({
						options: {
							headers: {
								Authorization: `Bearer ${authToken}`
							}
						},
						product
					})

					if (response) {
						set((state) => ({
							...state,
							loading: false
						}))
						return response
					}

					set((state) => ({
						...state,
						error: 'errors.product.create',
						loading: false
					}))

					return false
				} catch (error) {
					set((state) => ({
						...state,
						loading: false,
						error: 'errors.product.create'
					}))
					return false
				}
			},
			getProducts: async ({ limit, offset }) => {
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken =
						usePartnerAuthStore.getState().authToken?.accessToken

					const businessPartnerApi = new BusinessPartnerApi()

					const response = await businessPartnerApi.getAllProducts({
						params: {
							offset,
							limit
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
							products: response,
							loading: false
						}))
						return response
					}

					set((state) => ({
						...state,
						error: 'errors.product.get',
						loading: false
					}))

					return false
				} catch (error) {
					set((state) => ({
						...state,
						loading: false,
						error: 'errors.product.get'
					}))

					return false
				}
			},
			deleteProduct: async (productId) => {
				try {
					set((state) => ({
						...state,
						loading: true
					}))
					const authToken =
						usePartnerAuthStore.getState().authToken?.accessToken
					const businessPartnerApi = new BusinessPartnerApi()
					const response = await businessPartnerApi.deleteProduct({
						options: {
							headers: {
								Authorization: `Bearer ${authToken}`
							}
						},
						product_id: productId
					})

					if (response) {
						set((state) => ({
							...state,
							loading: false
						}))
						return response
					}

					set((state) => ({
						...state,
						error: 'errors.product.delete',
						loading: false
					}))

					return false
				} catch (error) {
					set((state) => ({
						...state,
						loading: false,
						error: 'errors.product.delete'
					}))
					return false
				}
			}
		}),
		{
			name: 'partner-product-store',
			storage: createJSONStorage(() => customStorage())
		}
	)
)

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('PartnerProductStore', usePartnerProductStore)
}
