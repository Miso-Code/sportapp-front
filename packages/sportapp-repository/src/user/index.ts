import { AxiosInstance } from 'axios'
import { sportappApi } from '../index'
import { globalVariables } from '../utils/global-variables'
import endpoints from './endpoints'
import { RegisterFullUserRequest, RegisterUserRequest } from './interfaces'

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

					if (value?.toString()?.includes('User already exists')) {
						return false
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
	): Promise<boolean> {
		const endpoint = endpoints.registerFull(uuid)
		try {
			const response = await this.sportappApi.patch(endpoint, data)

			if (response.status === 201) {
				return true
			}
		} catch (error) {
			console.error(error)
		}
		return false
	}
}
