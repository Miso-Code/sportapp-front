import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { sportappApi } from '../index'
import { globalVariables } from '../utils/global-variables'
import endpoints from './endpoints'
import {
	LoginUserRequest,
	LoginUserResponse,
	RegisterFullUserRequest,
	RegisterUserDataResponse,
	RegisterUserRequest,
	RegisterUserStreamResponse
} from './interfaces'
import {
	PersonalProfileRequestPayload,
	PersonalProfileResponse,
	PersonalProfileUpdateRequest,
	PersonalProfileUpdateResponse
} from './interfaces/api/personalProfile'
import {
	SportProfileRequestPayload,
	SportProfileResponse,
	SportProfileUpdateRequest
} from './interfaces/api/sportProfile'
import {
	NutritionalLimitations,
	NutritionalProfileRequestPayload,
	NutritionalProfileResponse,
	NutritionalProfileUpdateRequest,
	NutritionalProfileUpdateResponse
} from './interfaces/api/nutritionalProfile'

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
				`${globalVariables().EXPO_PUBLIC_SPORTAPP_API_URL}${endpoint}`,
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
			console.log(error)
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
					const split = value.split('\r\n\r\n')
					for (let index = 0; index < split.length; index++) {
						const jsonResponse =
							this.convertStringToJSON<RegisterUserStreamResponse>(
								split[index]
							)

						if (jsonResponse) {
							const { status, message } = jsonResponse

							if (
								status === 'success' &&
								message === 'User created'
							) {
								return jsonResponse.data
							}

							if (
								status === 'error' &&
								message === 'User already exists'
							) {
								return false
							}
						}
					}
				}
			}
		} catch (error) {
			pipeThrough.cancel()
			console.error(error)
		}
	}

	private convertStringToJSON<StringToJSON>(
		value: string
	): StringToJSON | undefined {
		try {
			const str = value.replace(/\r\n\r\n.*$/, '').replace('data: ', '')
			return JSON.parse(str) as StringToJSON
		} catch (error) {
			console.error(error)
			return undefined
			//throw new Error(error)
		}
	}

	async registerFull(
		data: RegisterFullUserRequest,
		options?: AxiosRequestConfig
	): Promise<boolean> {
		const endpoint = endpoints.registerFull
		try {
			const response = await this.sportappApi.patch(
				endpoint,
				data,
				options
			)

			if (response.status.toString().startsWith('2')) {
				return true
			}
		} catch (error) {
			console.error(error)
		}
		return false
	}

	async login({
		email,
		password
	}: LoginUserRequest): Promise<LoginUserResponse | undefined> {
		const endpoint = endpoints.login
		try {
			const response = await this.sportappApi.post<LoginUserResponse>(
				endpoint,
				{
					email,
					password
				}
			)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async getPersonalProfile(
		options?: PersonalProfileRequestPayload
	): Promise<PersonalProfileResponse | undefined> {
		const endpoint = endpoints.getPersonalProfile
		try {
			const response =
				await this.sportappApi.get<PersonalProfileResponse>(
					endpoint,
					options?.options
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async updatePersonalProfile(
		data: PersonalProfileUpdateRequest,
		options?: AxiosRequestConfig
	): Promise<PersonalProfileUpdateResponse | undefined> {
		const endpoint = endpoints.updatePersonalProfile
		try {
			const response =
				await this.sportappApi.patch<PersonalProfileUpdateResponse>(
					endpoint,
					data,
					options
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async getSportProfile(
		options?: SportProfileRequestPayload
	): Promise<SportProfileResponse | undefined> {
		const endpoint = endpoints.getSportProfile
		try {
			const response = await this.sportappApi.get<SportProfileResponse>(
				endpoint,
				options?.options
			)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async updateSportProfile(
		data: SportProfileUpdateRequest,
		options?: AxiosRequestConfig
	): Promise<SportProfileResponse | undefined> {
		const endpoint = endpoints.updateSportProfile
		try {
			const response = await this.sportappApi.patch<SportProfileResponse>(
				endpoint,
				data,
				options
			)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async getNutritionalProfile(
		options?: NutritionalProfileRequestPayload
	): Promise<NutritionalProfileResponse | undefined> {
		const endpoint = endpoints.getNutritionalProfile
		try {
			const response =
				await this.sportappApi.get<NutritionalProfileResponse>(
					endpoint,
					options?.options
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async updateNutritionalProfile(
		data: NutritionalProfileUpdateRequest,
		options?: AxiosRequestConfig
	): Promise<NutritionalProfileResponse | undefined> {
		const endpoint = endpoints.updateNutritionalProfile
		try {
			const response =
				await this.sportappApi.patch<NutritionalProfileUpdateResponse>(
					endpoint,
					data,
					options
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async getAllNutritionalLimitations(
		options?: AxiosRequestConfig
	): Promise<NutritionalLimitations[] | undefined> {
		const endpoint = endpoints.getAllNutritionalLimitations
		try {
			const response = await this.sportappApi.get<
				NutritionalLimitations[]
			>(endpoint, options)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}
}
