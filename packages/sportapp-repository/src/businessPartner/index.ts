import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { sportappApi } from '../index'
import endpoints from './endpoints'
import {
	Product,
	ProductRequest,
	PurchaseProductRequest,
	PurchaseProductResponse,
	SuggestProductRequest
} from './interfaces'

export default class businessPartnerApi {
	private readonly sportappApi: AxiosInstance
	constructor() {
		this.sportappApi = sportappApi
	}

	async getAvailableProducts(
		{ limit, offset, search }: ProductRequest,
		options?: AxiosRequestConfig
	): Promise<Product[] | undefined> {
		try {
			const endpoint = endpoints.getAvailableProducts

			const response = await this.sportappApi.get<Product[]>(endpoint, {
				...options,
				params: { limit, offset, search }
			})

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async purchaseProduct(
		payload: PurchaseProductRequest,
		options?: AxiosRequestConfig
	): Promise<PurchaseProductResponse | undefined> {
		try {
			const endpoint = endpoints.purchaseProduct(payload.product_id)

			const response =
				await this.sportappApi.post<PurchaseProductResponse>(
					endpoint,
					payload,
					options
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async suggestProduct(
		payload?: SuggestProductRequest,
		options?: AxiosRequestConfig
	): Promise<Product | undefined> {
		try {
			const endpoint = endpoints.suggestProduct

			options = {
				...options,
				params: payload
			}

			const response = await this.sportappApi.get<Product>(
				endpoint,
				options
			)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}
}
