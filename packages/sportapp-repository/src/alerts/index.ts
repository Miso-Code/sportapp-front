import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { sportappApi } from '../index'
import endpoints from './endpoints'
import { UserAlertDeviceCreateResponse } from './interfaces'

export default class alertsApi {
	private readonly sportappApi: AxiosInstance

	constructor() {
		this.sportappApi = sportappApi
	}

	async createOrUpdateUserDeviceToken(
		token: string,
		options?: AxiosRequestConfig
	): Promise<boolean | undefined> {
		try {
			const endpoint = endpoints.registerDeviceToken
			const response =
				await this.sportappApi.post<UserAlertDeviceCreateResponse>(
					endpoint,
					{ device_token: token },
					options
				)

			if (response.status.toString().startsWith('2')) {
				return true
			}
			return false
		} catch (error) {
			console.error(error)
		}
	}
}
