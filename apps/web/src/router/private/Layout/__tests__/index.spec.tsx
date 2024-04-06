import Layout from '@/router/private/Layout'
import { RenderResult, render } from '@testing-library/react'
import { useAuthStore } from '@sportapp/stores/src/auth'

jest.mock('@sportapp/stores/src/auth', () => ({
	useAuthStore: jest.fn(() => ({
		isAuth: true
	}))
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	Navigate: () => <div>Navigate</div>
}))

describe('Layout', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<Layout />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should return navigate component', () => {
		;(useAuthStore as unknown as jest.Mock).mockImplementationOnce(() => ({
			isAuth: false
		}))
		wrapper.rerender(<Layout />)
		expect(wrapper.container).toMatchSnapshot()
	})
})
