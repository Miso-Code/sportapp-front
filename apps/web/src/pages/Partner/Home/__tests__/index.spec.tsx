import HomePartner from '..'
import { render, RenderResult } from '@testing-library/react'

describe('HomePartner', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<HomePartner />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
