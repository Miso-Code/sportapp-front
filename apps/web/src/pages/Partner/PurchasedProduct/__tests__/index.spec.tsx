import PurchasedProductPartnerPage from '..'
import { render, RenderResult } from '@testing-library/react'

describe('PurchasedProductPartnerPage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<PurchasedProductPartnerPage />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
