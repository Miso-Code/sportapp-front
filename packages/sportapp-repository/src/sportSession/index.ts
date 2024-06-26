import { AxiosInstance, AxiosRequestConfig } from 'axios'
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

	async createSportSession(
		{
			user_id,
			started_at,
			sport_id,
			initial_location
		}: StartSportSessionRequest,
		options?: AxiosRequestConfig
	): Promise<StartSportSessionResponse | undefined> {
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
					},
					options
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async addSportSessionLocation(
		{
			latitude,
			longitude,
			accuracy,
			altitude,
			altitude_accuracy,
			heading,
			speed,
			session_id
		}: AddSportSessionLocationRequest,
		options?: AxiosRequestConfig
	): Promise<AddSportSessionLocationResponse | undefined> {
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
					},
					options
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async finishSportSession(
		{
			session_id,
			duration,
			steps,
			distance,
			calories,
			average_speed,
			min_heartrate,
			max_heartrate,
			avg_heartrate
		}: FinishSportSessionRequest,
		options?: AxiosRequestConfig
	): Promise<FullSportSessionResponse | undefined> {
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
					},
					options
				)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async getAllSportSessions(options?: AxiosRequestConfig) {
		try {
			const endpoint = endpoints.getAllSessions
			const response = await this.sportappApi.get(endpoint, options)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}

	async getSportSession(session_id: string, options?: AxiosRequestConfig) {
		try {
			const endpoint = endpoints.getSession(session_id)
			const response = await this.sportappApi.get(endpoint, options)

			if (response.status.toString().startsWith('2')) {
				return response.data
			}
		} catch (error) {
			console.error(error)
		}
	}
}
