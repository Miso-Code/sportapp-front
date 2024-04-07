import { globalVariables } from '../index'

describe('globalVariables', () => {
	it('should return process.env', () => {
		const result = globalVariables()
		expect(result).toBe(process.env)
	})
})
