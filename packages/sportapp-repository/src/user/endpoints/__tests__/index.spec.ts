import endpoints from '..'

describe('User endpoints', () => {
	it('should have the correct endpoints', () => {
		expect(endpoints).toEqual(
			expect.objectContaining({
				register: expect.any(String),
				registerFull: expect.any(Function)
			})
		)
	})

	it('should return the correct endpoint from registerFull', () => {
		expect(endpoints.registerFull('123')).toBe(
			'/users/123/complete-registration'
		)
	})

	it('should return the correct endpoint from register', () => {
		expect(endpoints.register).toBe('/users')
	})
})