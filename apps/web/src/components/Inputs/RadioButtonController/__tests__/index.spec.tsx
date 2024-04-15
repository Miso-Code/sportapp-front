import { useForm } from 'react-hook-form'
import RadioButtonController from '..'
import { render, renderHook, RenderResult } from '@testing-library/react'

describe('RadioButtonController', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<RadioButtonController
				control={result.current.control}
				label='Test'
				name='test'
				options={[
					{ value: 'test', label: 'Test1' },
					{ value: 'test2', label: 'Test2' }
				]}
			/>
		)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should display helper text when there is an error in input', () => {
		const { result } = renderHook(() => useForm())
		result.current.setError('test', {
			type: 'manual',
			message: 'Invalid Test'
		})
		wrapper = render(
			<RadioButtonController
				control={result.current.control}
				label='Test'
				name='test'
				options={[
					{ value: 'test', label: 'Test1' },
					{ value: 'test2', label: 'Test2' }
				]}
			/>
		)

		expect(wrapper.getByText('Invalid Test')).toBeInTheDocument()
	})

	it('should display the label', () => {
		expect(wrapper.getByText('Test')).toBeInTheDocument()
	})

	it('should display the options', () => {
		expect(wrapper.getByText('Test1')).toBeInTheDocument()
		expect(wrapper.getByText('Test2')).toBeInTheDocument()
	})
})
