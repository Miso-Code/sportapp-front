import { render, RenderResult } from '@testing-library/react'
import Register from 'pages/Register'

jest.mock('containers/Register', () => () => <div>RegisterContainer</div>)

describe('Register', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<Register />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})
})
