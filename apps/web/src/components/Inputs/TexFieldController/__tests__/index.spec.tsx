import TextFieldController from 'components/Inputs/TexFieldController'
import {
	render,
	RenderResult,
	renderHook,
	act,
	waitFor,
	fireEvent
} from '@testing-library/react'
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

	it('should display expiration date input', () => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<TextFieldController
				control={result.current.control}
				name='expirationDate'
				label='Expiration Date'
				method='expirationDate'
			/>
		)

		expect(wrapper.container).toMatchSnapshot()
	})

	it('should handle expiration date change', async () => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<TextFieldController
				control={result.current.control}
				name='expirationDate'
				label='Expiration Date'
				method='expirationDate'
			/>
		)

		const input = wrapper.container.querySelector(
			'input'
		) as HTMLInputElement
		fireEvent.change(input, { target: { value: '12/25' } })

		act(() => {
			wrapper.rerender(
				<TextFieldController
					control={result.current.control}
					name='expirationDate'
					label='Expiration Date'
					method='expirationDate'
				/>
			)
		})

		await waitFor(() => {
			expect(input.value).toBe('12/25')
		})
	})

	it('should display cvv input', () => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<TextFieldController
				control={result.current.control}
				name='cvv'
				label='CVV'
				method='cvv'
			/>
		)

		expect(wrapper.container).toMatchSnapshot()
	})

	it('should handle cvv change', async () => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<TextFieldController
				control={result.current.control}
				name='cvv'
				label='CVV'
				method='cvv'
			/>
		)

		const input = wrapper.container.querySelector(
			'input'
		) as HTMLInputElement
		fireEvent.change(input, { target: { value: '123' } })

		act(() => {
			wrapper.rerender(
				<TextFieldController
					control={result.current.control}
					name='cvv'
					label='CVV'
					method='cvv'
				/>
			)
		})

		await waitFor(() => {
			expect(input.value).toBe('123')
		})
	})

	it('should handle input change', async () => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<TextFieldController
				control={result.current.control}
				name='text'
				label='Text'
			/>
		)

		const input = wrapper.container.querySelector(
			'input'
		) as HTMLInputElement
		fireEvent.change(input, { target: { value: 'text' } })

		act(() => {
			wrapper.rerender(
				<TextFieldController
					control={result.current.control}
					name='text'
					label='Text'
				/>
			)
		})

		await waitFor(() => {
			expect(input.value).toBe('text')
		})
	})

	it('should handle max characters', async () => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<TextFieldController
				control={result.current.control}
				name='text'
				label='Text'
				method='maxLength'
				maxLength={5}
			/>
		)

		const input = wrapper.container.querySelector(
			'input'
		) as HTMLInputElement
		fireEvent.change(input, { target: { value: 'text' } })

		act(() => {
			wrapper.rerender(
				<TextFieldController
					control={result.current.control}
					name='text'
					label='Text'
					method='maxLength'
					maxLength={5}
				/>
			)
		})

		await waitFor(() => {
			expect(input.value).toBe('text')
		})
	})

	it('should handle max characters when the length is greater than maxLength', async () => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<TextFieldController
				control={result.current.control}
				name='text'
				label='Text'
				method='maxLength'
				maxLength={5}
			/>
		)

		const input = wrapper.container.querySelector(
			'input'
		) as HTMLInputElement
		fireEvent.change(input, { target: { value: 'texttext' } })

		act(() => {
			wrapper.rerender(
				<TextFieldController
					control={result.current.control}
					name='text'
					label='Text'
					method='maxLength'
					maxLength={5}
				/>
			)
		})

		await waitFor(() => {
			expect(input.value).toBe('textt')
		})
	})
})
