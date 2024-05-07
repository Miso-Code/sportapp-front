import { AxiosRequestConfig } from 'axios'

export interface UserAlertDeviceCreateRequest {
	device_token: string
	options: AxiosRequestConfig
}

export interface UserAlertDeviceCreateResponse {
	user_id: string
}
