import endpoints from '..'

describe('endpoints', () => {
	it('should have register endpoint', () => {
		expect(endpoints.register).toEqual('/business-partners/registration')
	})

	it('should have login endpoint', () => {
		expect(endpoints.login).toEqual('/business-partners/login')
	})
})
