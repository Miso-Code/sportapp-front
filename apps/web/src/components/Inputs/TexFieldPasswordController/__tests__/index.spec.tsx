import TextFieldPasswordController from 'components/Inputs/TexFieldPasswordController'
import {
	render,
	RenderResult,
	renderHook,
	fireEvent
} from '@testing-library/react'
import { useForm } from 'react-hook-form'

describe('TextFieldPasswordController', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<TextFieldPasswordController
				control={result.current.control}
				defaultValue={''}
				name='password'
				label='Password'
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
		result.current.setError('password', {
			type: 'manual',
			message: 'Invalid Password'
		})
		wrapper = render(
			<TextFieldPasswordController
				control={result.current.control}
				defaultValue={''}
				name='password'
				label='Password'
			/>
		)

		expect(wrapper.getByText('Invalid Password')).toBeInTheDocument()
	})

	it('should change the visibility of the password when clicking', () => {
		const input = wrapper.container.querySelector('button')
		const visibilityIcon = wrapper.getByTestId('VisibilityIcon')
		expect(input).toBeInTheDocument()
		expect(visibilityIcon).toBeInTheDocument()

		fireEvent.click(input as Element)
		const visibilityOffIcon = wrapper.getByTestId('VisibilityOffIcon')

		expect(visibilityOffIcon).toBeInTheDocument()
	})
})
