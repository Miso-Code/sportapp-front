import TextFieldController from 'components/Inputs/TexFieldController'
import { render, RenderResult, renderHook } from '@testing-library/react'
import { useForm } from 'react-hook-form'

describe('TextFieldController', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<TextFieldController
				control={result.current.control}
				name='text'
				label='Text'
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
		result.current.setError('text', {
			type: 'manual',
			message: 'Invalid Text'
		})
		wrapper = render(
			<TextFieldController
				control={result.current.control}
				name='text'
				label='Text'
			/>
		)

		expect(wrapper.getByText('Invalid Text')).toBeInTheDocument()
	})
})
