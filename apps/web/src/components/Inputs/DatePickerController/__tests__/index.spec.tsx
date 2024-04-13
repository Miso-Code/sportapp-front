import { RenderResult, render, renderHook } from '@testing-library/react'
import DatePickerController from 'components/Inputs/DatePickerController'
import { useForm } from 'react-hook-form'

describe('DatePickerController', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const { result } = renderHook(() => useForm())
		result.current.register('date')
		result.current.setValue('date', '1996-07-20')
		wrapper = render(
			<DatePickerController
				control={result.current.control}
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

	it('should render with incorrect date', () => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<DatePickerController
				control={result.current.control}
				name='date'
				label='Date'
			/>
		)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should display helper text when there is an error in input', () => {
		const { result } = renderHook(() => useForm())
		result.current.setError('date', {
			type: 'manual',
			message: 'Invalid Date'
		})
		wrapper = render(
			<DatePickerController
				control={result.current.control}
				name='date'
				label='Date'
			/>
		)

		expect(wrapper.getByText('Invalid Date')).toBeInTheDocument()
	})
})
