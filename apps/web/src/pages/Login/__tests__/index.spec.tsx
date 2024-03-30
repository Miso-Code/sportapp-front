import { render, RenderResult } from '@testing-library/react'
import Login from 'pages/Login'

describe('Login', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<Login />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})
})
