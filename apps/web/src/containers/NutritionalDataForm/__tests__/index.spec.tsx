import NutritionalDataForm from '..'
import { render, RenderResult } from '@testing-library/react'

describe('NutritionalDataForm', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<NutritionalDataForm handleCustomSubmit={jest.fn()} />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
