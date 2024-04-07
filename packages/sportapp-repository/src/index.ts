import axios, { AxiosInstance } from 'axios'
import { globalVariables } from './utils/global-variables'

export const sportappApi: AxiosInstance = axios.create({
	baseURL: globalVariables().EXPO_PUBLIC_SPORTAPP_API_URL,
	headers: {}
})
