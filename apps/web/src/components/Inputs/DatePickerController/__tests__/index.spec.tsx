import DatePickerController from 'components/Inputs/DatePickerController'
import { render, renderHook, RenderResult } from '@testing-library/react'
import { useForm } from 'react-hook-form'

describe('DatePickerController', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<DatePickerController
				// @ts-ignore
				control={result}
				name='date'
				label='Date'
			/>
		)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
