import routes from '@/router/public/routes'

jest.mock('@/pages/Register', () => () => <div>Register</div>)

describe('Public Routes', () => {
	it('should detect defined the public routes', () => {
		expect(routes()).toBeDefined()
	})

	it('should return an array of routes', () => {
		expect(routes()).toBeInstanceOf(Array)
	})

	it('should return an array of routes with at least one element', () => {
		expect(routes().length).toBeGreaterThan(0)
	})

	it('should return an array of routes with at least one element with a path', () => {
		expect(routes()[0].path).toBeDefined()
	})

	it('should return an array of routes with at least one element with an element', () => {
		expect(routes()[0].element).toBeDefined()
	})
})
