import CreateProductPartnerPage from '..'
import { render, RenderResult } from '@testing-library/react'

describe('CreateProductPartnerPage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<CreateProductPartnerPage />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
