import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { sportappApi } from '../index'
import endpoints from './endpoints'
import {
	GetNutritionalPlanDishesRequest,
	NotifyCaloryIntakeRequest,
	NotifyCaloryIntakeResponse,
	NutritionalPlanDish,
	NutritionalPlanDishRaw
} from './interfaces'

export default class sportApi {
	private readonly sportappApi: AxiosInstance
	constructor() {
		this.sportappApi = sportappApi
	}

	async getAllNutritionalPlanDishes(
		request: GetNutritionalPlanDishesRequest,
		options: AxiosRequestConfig
	): Promise<NutritionalPlanDish[] | undefined> {
		try {
			const endpoint = endpoints.getNutritionalPlanDishes

			const requestOptions = {
				...options,
				params: {
					lang: request.lang
				}
			}

			const response = await this.sportappApi.get<
				NutritionalPlanDishRaw[]
			>(endpoint, requestOptions)

			if (response.status.toString().startsWith('2')) {
				const data = response.data
				return data.map((dish) => {
					const fats = dish['fat']
					const name = (
						Object.prototype.hasOwnProperty.call(
							dish,
							`name_${request.lang}`
						)
							? dish[
									`name_${request.lang}` as keyof NutritionalPlanDishRaw
								]
							: dish.name
					) as string

					if (Object.prototype.hasOwnProperty.call(dish, 'fat'))
						delete dish['fat']
					if (
						Object.prototype.hasOwnProperty.call(
							dish,
							`name_${request.lang}`
						)
					)
						delete dish[
							`name_${request.lang}` as keyof NutritionalPlanDishRaw
						]
					return {
						...dish,
						fats,
						name
					}
				})
			}
		} catch (error) {
			console.error(error)
		}
	}

	async notifyCaloryIntake(
		request: NotifyCaloryIntakeRequest,
		options: AxiosRequestConfig
	): Promise<NotifyCaloryIntakeResponse | undefined> {
		try {
			const endpoint = endpoints.notifyCaloryIntake

			const { lang, ...body } = request

			options.params = {
				lang
			}

			const response =
				await this.sportappApi.post<NotifyCaloryIntakeResponse>(
					endpoint,
					body,
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
