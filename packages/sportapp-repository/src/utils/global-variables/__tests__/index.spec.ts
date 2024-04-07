import { globalVariables } from '../index'

describe('globalVariables', () => {
	it('should return process.env', () => {
		const result = globalVariables()
		expect(result).toBe(process.env)
	})

	// FIXME: this is not enabled until we figure out how to use it with Expo and Vite

	// it('should return import.meta.env', () => {
	// 	global.window = {} as Window & typeof globalThis
	// 	const result = globalVariables()
	// 	expect(result).toBe(import.meta.env)
	// })
})
