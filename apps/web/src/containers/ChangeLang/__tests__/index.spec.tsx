import ChangeLang from '..'
import { render, RenderResult } from '@testing-library/react'

describe('ChangeLangContainer', () => {
	let renderResult: RenderResult

	beforeEach(() => {
		renderResult = render(<ChangeLang />)
	})

	it('should render the page', () => {
		expect(renderResult.container).toMatchSnapshot()
	})
})
