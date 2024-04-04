import privateRoutes from '@/router/private/routes'
/* import { render } from '@testing-library/react'
import {
	MemoryRouter,
	RouterProvider,
	createBrowserRouter
} from 'react-router-dom' */

describe('Private Routes', () => {
	it('should detect defined the private routes', () => {
		expect(privateRoutes()).toBeDefined()
	})

	it('should return an object with an element', () => {
		expect(privateRoutes().element).toBeDefined()
	})

	it('should return an object with an element with a children property', () => {
		expect(privateRoutes().children).toBeDefined()
	})

	it('should return an object with an element with a children property with at least one element', () => {
		expect(privateRoutes().children.length).toBeGreaterThan(0)
	})

	it('should return an object with an element with a children property with at least one element with a path', () => {
		expect(privateRoutes().children[0].path).toBeDefined()
	})

	it('should return an object with an element with a children property with at least one element with an element', () => {
		expect(privateRoutes().children[0].element).toBeDefined()
	})

	it('should contains a route to Home', () => {
		const routes = privateRoutes()
		expect(routes.children).toContainEqual({
			path: '/home',
			element: expect.any(Object)
		})
	})

	it('should contains a route to redirect to /register', () => {
		const routes = privateRoutes()
		const redirectRoute = routes.children.find(
			(route) => route.path === '*'
		)
		expect(redirectRoute).toEqual({
			path: '*',
			element: expect.any(Object)
		})
		expect(redirectRoute?.element.props.to).toBe('/register')
		expect(redirectRoute?.element.props.replace).toBe(true)
	})

	/* it('renders Home component when navigating to /home', () => {
		const routesP = privateRoutes()
		const router = createBrowserRouter([routesP])
		const { container } = render(<RouterProvider router={router} />, {
			wrapper: MemoryRouter
		})
		expect(container).toMatchSnapshot()
	}) */
})
