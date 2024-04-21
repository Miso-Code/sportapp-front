import endpoints from '..'

describe('endpoints', () => {
	it('should have register endpoint', () => {
		expect(endpoints.register).toEqual('/business-partners/registration')
	})

	it('should have login endpoint', () => {
		expect(endpoints.login).toEqual('/business-partners/login')
	})

	it('should have product create endpoint', () => {
		expect(endpoints.product.create).toEqual('/business-partners/products')
	})

	it('should have product get endpoint', () => {
		expect(endpoints.product.get('1')).toEqual(
			'/business-partners/products/1'
		)
	})

	it('should have product update endpoint', () => {
		expect(endpoints.product.update('1')).toEqual(
			'/business-partners/products/1'
		)
	})

	it('should have product delete endpoint', () => {
		expect(endpoints.product.delete('1')).toEqual(
			'/business-partners/products/1'
		)
	})

	it('should have product get all endpoint', () => {
		expect(endpoints.product.getAll).toEqual('/business-partners/products')
	})
})
