import Spinner from 'components/Spinner'
import { render, RenderResult } from '@testing-library/react'

describe('Spinner', () => {
	let component: RenderResult | null = null

	beforeEach(() => {
		component = render(<Spinner />)
	})

	afterEach(() => {
		component = null
	})

	it('should render the component', () => {
		expect(component).toMatchSnapshot()
	})
})
