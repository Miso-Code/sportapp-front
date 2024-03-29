import { render, RenderResult } from '@testing-library/react'
import Home from '@pages/Home'

describe('Home', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<Home />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})
})
