import { AxiosInstance, AxiosResponse } from 'axios'
import { sportappApi } from '../index'
import { globalVariables } from '../utils/global-variables'
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

	async register(data: RegisterUserRequest): Promise<boolean> {
		const endpoint = endpoints.register
		try {
			const response = await fetch(
				`${globalVariables().VITE_SPORTAPP_API_URL}${endpoint}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				}
			)

			const reader = response
				.body!.pipeThrough(new TextDecoderStream())
				.getReader()

			let done = false

			while (!done) {
				const result = await reader.read()
				done = result.done
				if (!done) {
					const value = result.value

					if (value?.toString()?.includes('User created')) {
						return true
					}
				}
			}
		} catch (error) {
			console.error(error)
		}
		return false
	}

	async registerFull(
		uuid: string,
		data: RegisterFullUserRequest
	): Promise<AxiosResponse<RegisterFullUserResponse>> {
		const endpoint = endpoints.registerFull(uuid)
		return this.sportappApi.post(endpoint, data)
	}
}
