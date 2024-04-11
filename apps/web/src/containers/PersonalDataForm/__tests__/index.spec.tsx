import PersonalDataForm from '..'
import { render, RenderResult } from '@testing-library/react'

describe('PersonalDataForm', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<PersonalDataForm handleCustomSubmit={jest.fn()} />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
