import { AxiosRequestConfig } from 'axios'

export interface ProductDeleteRequestPayload {
	product_id: string
	options: AxiosRequestConfig
}

export interface ProductDeleteResponse {
	message: string
}
