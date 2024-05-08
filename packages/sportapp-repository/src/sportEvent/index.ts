import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { sportappApi } from '../index'
import endpoints from './endpoints'
import { SportEvent } from './interfaces'

export default class sportEventApi {
	private readonly sportappApi: AxiosInstance
	constructor() {
		this.sportappApi = sportappApi
	}

	async getAllSportEvents(
		latitude?: number,
		longitude?: number,
		options?: AxiosRequestConfig
	): Promise<SportEvent[] | undefined> {
		try {
			const endpoint = endpoints.getAllSportEvents

			if (latitude && longitude) {
				options = {
					...options,
					params: {
						latitude,
						longitude
					}
				}
			}

			const response = await this.sportappApi.get<SportEvent[]>(
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

	async getSportEventById(
		sportEventId: string,
		options?: AxiosRequestConfig
	): Promise<SportEvent | undefined> {
		try {
			const endpoint = endpoints.getSportEventById(sportEventId)

			const response = await this.sportappApi.get<SportEvent>(
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
