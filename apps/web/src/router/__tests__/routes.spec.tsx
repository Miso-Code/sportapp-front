import { routes } from '@/router/routes'
import { RouteObject } from 'react-router-dom'

describe('routes', () => {
	let route: RouteObject[]

	beforeEach(() => {
		route = routes
	})

	afterEach(() => {
		route = []
	})

	it('should return an array of routes', () => {
		expect(route).toBeInstanceOf(Array)
	})

	it('should return an array of routes with at least one route', () => {
		expect(route.length).toBeGreaterThan(0)
	})

	it('should return an array of routes with at least one route with a path', () => {
		expect(route[0].path).toBeDefined()
	})

	it('should return an array of routes with at least one route with an element', () => {
		expect(route[0].element).toBeDefined()
	})

	it('should return an array of routes with at least one route with an element of type JSX.Element', () => {
		expect(route[0].element).toBeInstanceOf(Object)
	})
})
