import SecondarySection from 'components/SecondarySection'
import { RenderResult, render } from '@testing-library/react'

describe('SecondarySection', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<SecondarySection image='image' altImage='altImage' />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render correctly', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
