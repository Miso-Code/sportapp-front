import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { sportappApi } from '../index'
import endpoints from './endpoints'
import { Sport } from './interfaces'

export default class sportApi {
	private readonly sportappApi: AxiosInstance
	constructor() {
		this.sportappApi = sportappApi
	}

	async getAllSports(
		options?: AxiosRequestConfig
	): Promise<Sport[] | undefined> {
		try {
			const endpoint = endpoints.getAllSports

			const response = await this.sportappApi.get<Sport[]>(
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

	async getSportById(
		sportId: string,
		options?: AxiosRequestConfig
	): Promise<Sport | undefined> {
		try {
			const endpoint = endpoints.getSportById(sportId)

			const response = await this.sportappApi.get<Sport>(
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
