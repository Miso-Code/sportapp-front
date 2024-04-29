import { RenderResult, render, renderHook } from '@testing-library/react'
import DatePickerController from 'components/Inputs/DatePickerController'
import { useForm } from 'react-hook-form'

describe('DatePickerController', () => {
	let wrapper: RenderResult
	let spy: jest.SpyInstance

	beforeEach(() => {
		const mockedDate = new Date(1996, 6, 19)

		spy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate)
		const { result } = renderHook(() => useForm())
		result.current.register('date')
		result.current.setValue('date', '1996-07-19')
		wrapper = render(
			<DatePickerController
				control={result.current.control}
				name='date'
				label='Date'
				value={new Date('1996-07-19')}
			/>
		)
	})

	afterEach(() => {
		spy.mockRestore()
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
				value={new Date('1996-07-19')}
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
				value={new Date('1996-07-19')}
			/>
		)

		expect(wrapper.getByText('Invalid Date')).toBeInTheDocument()
	})
})
