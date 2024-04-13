import { AxiosInstance } from 'axios'
import { sportappApi } from '../index'
import endpoints from './endpoints'
import {
	StartSportSessionRequest,
	StartSportSessionResponse,
	AddSportSessionLocationRequest,
	AddSportSessionLocationResponse,
	FinishSportSessionRequest,
	FullSportSessionResponse
} from './interfaces'

export default class sportSessionApi {
	private readonly sportappApi: AxiosInstance
	constructor() {
		this.sportappApi = sportappApi
	}

	async createSportSession({
		user_id,
		started_at,
		sport_id,
		initial_location
	}: StartSportSessionRequest): Promise<
		StartSportSessionResponse | undefined
	> {
		try {
			const endpoint = endpoints.startSession

			const response =
				await this.sportappApi.post<StartSportSessionResponse>(
					endpoint,
					{
						user_id,
						started_at,
						sport_id,
						initial_location
					}
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async addSportSessionLocation({
		latitude,
		longitude,
		accuracy,
		altitude,
		altitude_accuracy,
		heading,
		speed,
		session_id
	}: AddSportSessionLocationRequest): Promise<
		AddSportSessionLocationResponse | undefined
	> {
		try {
			const endpoint = endpoints.addSessionLocation(session_id)
			const response =
				await this.sportappApi.post<AddSportSessionLocationResponse>(
					endpoint,
					{
						latitude,
						longitude,
						accuracy,
						altitude,
						altitude_accuracy,
						heading,
						speed
					}
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async finishSportSession({
		session_id,
		duration,
		steps,
		distance,
		calories,
		average_speed,
		min_heartrate,
		max_heartrate,
		avg_heartrate
	}: FinishSportSessionRequest): Promise<
		FullSportSessionResponse | undefined
	> {
		try {
			const endpoint = endpoints.finishSession(session_id)

			const response =
				await this.sportappApi.patch<FullSportSessionResponse>(
					endpoint,
					{
						duration,
						steps,
						distance,
						calories,
						average_speed,
						min_heartrate,
						max_heartrate,
						avg_heartrate
					}
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async getAllSportSessions() {
		try {
			const endpoint = endpoints.getAllSessions
			const response = await this.sportappApi.get(endpoint)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}
}
