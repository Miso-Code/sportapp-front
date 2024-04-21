import { AxiosInstance } from 'axios'
import { sportappApi } from '../index'
import endpoints from './endpoints'
import {
	LoginBusinessPartnerRequest,
	LoginBusinessPartnerResponse
} from './interfaces/api/login'
import {
	RegisterBusinessPartnerRequest,
	RegisterBusinessPartnerResponse
} from './interfaces/api/register'
import { ProductCreateRequestPayload } from './interfaces/api/product-create'
import { ProductDeleteRequestPayload } from './interfaces/api/product-delete'
import { Product, ProductGetRequestPayload } from './interfaces/api/product'

export default class BusinessPartnerApi {
	private readonly sportappApi: AxiosInstance
	constructor() {
		this.sportappApi = sportappApi
	}

	async register(
		data: RegisterBusinessPartnerRequest
	): Promise<boolean | RegisterBusinessPartnerResponse> {
		const endpoint = endpoints.register

		try {
			const response =
				await this.sportappApi.post<RegisterBusinessPartnerResponse>(
					endpoint,
					data
				)
			if (response.status.toString().startsWith('2')) {
				return response.data
			}
			return false
		} catch (error) {
			console.error(error)
			return false
		}
	}

	async login(
		data: LoginBusinessPartnerRequest
	): Promise<false | LoginBusinessPartnerResponse> {
		const endpoint = endpoints.login
		try {
			const response =
				await this.sportappApi.post<LoginBusinessPartnerResponse>(
					endpoint,
					data
				)
			if (response.status.toString().startsWith('2')) {
				return response.data
			}
			return false
		} catch (error) {
			console.error(error)
			return false
		}
	}

	async createProduct({
		options,
		product
	}: ProductCreateRequestPayload): Promise<boolean> {
		const endpoint = endpoints.product.create
		try {
			const response = await this.sportappApi.post(
				endpoint,
				product,
				options
			)
			if (response.status.toString().startsWith('2')) {
				return true
			}
			return false
		} catch (error) {
			console.error(error)
			return false
		}
	}

	async deleteProduct({
		options,
		product_id
	}: ProductDeleteRequestPayload): Promise<boolean> {
		const endpoint = endpoints.product.delete(product_id)
		try {
			const response = await this.sportappApi.delete(endpoint, options)
			if (response.status.toString().startsWith('2')) {
				return true
			}
			return false
		} catch (error) {
			console.error(error)
			return false
		}
	}

	async getAllProducts(
		payload: ProductGetRequestPayload
	): Promise<Product[] | false> {
		const endpoint = endpoints.product.getAll
		try {
			const response = await this.sportappApi.get<Product[]>(endpoint, {
				...payload.options,
				params: { ...payload.params, ...payload.options.params }
			})
			if (response.status.toString().startsWith('2')) {
				return response.data
			}
			return false
		} catch (error) {
			console.error(error)
			return false
		}
	}
}
