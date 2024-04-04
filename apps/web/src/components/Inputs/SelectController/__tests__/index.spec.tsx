import SelectController from 'components/Inputs/SelectController'
import { render, RenderResult, renderHook } from '@testing-library/react'
import { useForm } from 'react-hook-form'

describe('SelectController', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<SelectController
				control={result.current.control}
				selectProps={{ fullWidth: true, defaultValue: '1' }}
				name='select'
				label='Select'
				options={[
					{ label: 'Option 1', value: '1' },
					{ label: 'Option 2', value: '2' }
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
		result.current.setError('select', {
			type: 'manual',
			message: 'Invalid Select'
		})
		wrapper = render(
			<SelectController
				control={result.current.control}
				name='select'
				label='Select'
				selectProps={{ fullWidth: true, defaultValue: '1' }}
				options={[
					{ label: 'Option 1', value: '1' },
					{ label: 'Option 2', value: '2' }
				]}
			/>
		)

		expect(wrapper.getByText('Invalid Select')).toBeInTheDocument()
	})
})
