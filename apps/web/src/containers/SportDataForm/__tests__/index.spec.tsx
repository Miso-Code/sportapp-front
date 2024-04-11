import SportDataForm from '..'
import { render, RenderResult } from '@testing-library/react'

describe('SportDataForm', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<SportDataForm handleCustomSubmit={jest.fn()} />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
