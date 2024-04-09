import AsyncStorage from '@react-native-async-storage/async-storage'
import { customStorage } from '../storages'

jest.mock('@react-native-async-storage/async-storage')

describe('customStorage', () => {
	it('should return web storage', async () => {
		process.env.EXPO_PUBLIC_STORAGE = 'web'

		const storage = customStorage()

		localStorage.setItem('key', JSON.stringify({ key: 'value' }))
		expect(storage.getItem('key')).toEqual({ key: 'value' })

		storage.setItem('key', 'value')
		expect(localStorage.getItem('key')).toBe(JSON.stringify('value'))

		storage.removeItem('key')
		expect(localStorage.getItem('key')).toBe(null)
	})

	it('should return null with getItem web', async () => {
		process.env.EXPO_PUBLIC_STORAGE = 'web'

		const storage = customStorage()

		expect(storage.getItem('key')).toBe(null)
	})

	it('should return mobile storage', async () => {
		process.env.EXPO_PUBLIC_STORAGE = 'mobile'

		const storage = customStorage()

		;(AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
			'{"key":"value"}'
		)
		;(AsyncStorage.setItem as jest.Mock).mockResolvedValueOnce(undefined)
		;(AsyncStorage.removeItem as jest.Mock).mockResolvedValueOnce(undefined)

		expect(await storage.getItem('key')).toEqual({ key: 'value' })
		expect(await storage.setItem('key', 'value')).toBe(undefined)
		expect(await storage.removeItem('key')).toBe(undefined)
	})

	it('should return null with getItem mobile', async () => {
		process.env.EXPO_PUBLIC_STORAGE = 'mobile'

		const storage = customStorage()

		expect(await storage.getItem('key')).toBe(null)
	})
})
