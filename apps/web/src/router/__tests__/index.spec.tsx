import Router from '@/router'
import { RenderResult, render } from '@testing-library/react'

jest.mock('@/router/private/routes', () => ({
	__esModule: true,
	default: () => []
}))

jest.mock('@/router/public/routes', () => ({
	__esModule: true,
	default: () => [
		{
			path: '/',
			element: <div>Home</div>
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
