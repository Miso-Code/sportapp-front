import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { sportappApi } from '../index'
import endpoints from './endpoints'
import { TrainingPlanSession } from './interfaces'

export default class trainingPlanApi {
	private readonly sportappApi: AxiosInstance
	constructor() {
		this.sportappApi = sportappApi
	}

	async getTrainingPlan(
		options?: AxiosRequestConfig
	): Promise<TrainingPlanSession[] | undefined> {
		try {
			const endpoint = endpoints.getTrainingPlan

			const response = await this.sportappApi.get<TrainingPlanSession[]>(
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
