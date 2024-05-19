import LangPartnerPage from '..'
import { render, RenderResult } from '@testing-library/react'

describe('LangPartnerPage', () => {
	let renderResult: RenderResult

	beforeEach(() => {
		renderResult = render(<LangPartnerPage />)
	})

	it('should render the page', () => {
		expect(renderResult.container).toMatchSnapshot()
	})
})
