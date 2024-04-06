import { AxiosInstance } from 'axios'
import { sportappApi } from '../index'
import { globalVariables } from '../utils/global-variables'
import endpoints from './endpoints'
import {
	RegisterFullUserRequest,
	RegisterUserDataResponse,
	RegisterUserRequest,
	RegisterUserStreamResponse
} from './interfaces'

export default class UserApi {
	private readonly sportappApi: AxiosInstance
	constructor() {
		this.sportappApi = sportappApi
	}

	async register(
		data: RegisterUserRequest
	): Promise<boolean | RegisterUserDataResponse> {
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

			const pipeThrough = response.body!.pipeThrough(
				new TextDecoderStream()
			)

			const reader = pipeThrough.getReader()

			const result = await this.handleReaderPipeThrough(reader)

			if (result) {
				return result
			}

			return false
		} catch (error) {
			Promise.reject(error)
		}
		return false
	}

	private async handleReaderPipeThrough(
		pipeThrough: ReadableStreamDefaultReader
	) {
		let done = false
		try {
			while (!done) {
				const result = await pipeThrough.read()
				done = result.done
				if (!done) {
					const value = result.value

					const jsonResponse =
						this.convertStringToJSON<RegisterUserStreamResponse>(
							value.toString()
						)

					if (
						jsonResponse.status === 'success' &&
						jsonResponse.message === 'User created'
					) {
						return jsonResponse.data
					}

					if (
						jsonResponse.status === 'error' &&
						jsonResponse.message === 'User already exists'
					) {
						return false
					}
				}
			}
		} catch (error) {
			pipeThrough.cancel()
			Promise.reject(error)
		}
	}

	private convertStringToJSON<StringToJSON>(value: string): StringToJSON {
		try {
			const str = value.replace(/\r\n\r\n.*$/, '').replace('data: ', '')
			return JSON.parse(str) as StringToJSON
		} catch (error) {
			throw new Error(error)
		}
	}

	async registerFull(
		uuid: string,
		data: RegisterFullUserRequest
	): Promise<boolean> {
		const endpoint = endpoints.registerFull(uuid)
		try {
			const response = await this.sportappApi.patch(endpoint, data)

			if (response.status.toString().startsWith('2')) {
				return true
			}
		} catch (error) {
			console.error(error)
		}
		return false
	}
}
