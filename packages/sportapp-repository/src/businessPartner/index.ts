import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { sportappApi } from '../index'
import endpoints from './endpoints'
import { Product, ProductRequest } from './interfaces'

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
}
