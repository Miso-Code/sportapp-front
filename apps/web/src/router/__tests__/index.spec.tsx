import Router from '@/router'
import { RenderResult, render } from '@testing-library/react'

jest.mock('@/router/routes', () => ({
	routes: [
		{
			path: '/',
			element: <div>Home</div>
		},
		{
			path: '/register',
			element: <div>Register</div>
		}
	]
}))

describe('Router', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<Router />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the app', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
