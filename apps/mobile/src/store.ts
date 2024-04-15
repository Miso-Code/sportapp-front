import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

import { StateStorage } from 'zustand/middleware'

export const expoSecureStorage: StateStorage = {
	getItem: async (name: string): Promise<string | null> => {
		return (await getItemAsync(name)) || null
	},
	setItem: async (name: string, value: string): Promise<void> => {
		await setItemAsync(name, value)
	},
	removeItem: async (name: string): Promise<void> => {
		await deleteItemAsync(name)
	}
}
