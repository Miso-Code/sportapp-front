import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { sportappApi } from '../index'
import endpoints from './endpoints'
import {
	RegisterFullUserRequest,
	RegisterFullUserResponse,
	RegisterUserRequest
} from './interfaces'

export default class UserApi {
	private readonly sportappApi: AxiosInstance
	constructor() {
		this.sportappApi = sportappApi
	}

	async register(
		data: RegisterUserRequest,
		options?: AxiosRequestConfig
	): Promise<boolean> {
		const endpoint = endpoints.register
		const response = await this.sportappApi.post(endpoint, data, {
			...options,
			responseType: 'stream'
		})

		const dataAux = response.data.pipe(process.stdout)
		console.log(dataAux)

		return true
	}

	async registerFull(
		uuid: string,
		data: RegisterFullUserRequest
	): Promise<AxiosResponse<RegisterFullUserResponse>> {
		const endpoint = endpoints.registerFull(uuid)
		return this.sportappApi.post(endpoint, data)
	}
}
