import PersonalDataForm from '..'
import { render, RenderResult } from '@testing-library/react'

describe('PersonalDataForm', () => {
	let wrapper: RenderResult
	let spy: jest.SpyInstance

	beforeEach(() => {
		const mockedDate = new Date(1996, 6, 19)

		spy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate)

		wrapper = render(<PersonalDataForm handleCustomSubmit={jest.fn()} />)
	})

	afterEach(() => {
		spy.mockRestore()
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
