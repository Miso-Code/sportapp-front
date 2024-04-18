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
}
