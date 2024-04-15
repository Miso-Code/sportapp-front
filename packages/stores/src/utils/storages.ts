import { StateStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const customStorage = (): StateStorage => {
	if (process.env.EXPO_PUBLIC_STORAGE === 'web') {
		return {
			getItem: (key: string) => {
				const value = localStorage.getItem(key)
				return value ? JSON.parse(value) : null
			},
			setItem: (key: string, value: string) =>
				localStorage.setItem(key, JSON.stringify(value)),
			removeItem: (key: string) => {
				localStorage.removeItem(key)
			}
		}
	}

	return {
		getItem: async (key: string) => {
			const value = await AsyncStorage.getItem(key)
			return value ? JSON.parse(value) : null
		},
		setItem: async (key: string, value: string) =>
			AsyncStorage.setItem(key, JSON.stringify(value)),
		removeItem: async (key: string) => {
			AsyncStorage.removeItem(key)
		}
	}
}
