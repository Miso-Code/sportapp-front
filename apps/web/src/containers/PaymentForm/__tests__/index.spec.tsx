import PaymentForm from '..'
import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'

describe('PaymentForm', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<PaymentForm onCancel={jest.fn()} onSubmit={jest.fn()} />
		)
	})

	it('should render component', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should call cancel function', async () => {
		const handleCancel = jest.fn()
		wrapper.rerender(
			<PaymentForm onCancel={handleCancel} onSubmit={jest.fn()} />
		)
		const cancelButton = wrapper.getByText('form.cancel')
		fireEvent.click(cancelButton)
		await waitFor(() => expect(handleCancel).toHaveBeenCalled())
	})

	it('should show card front and focus un cardNumber', async () => {
		const cardNumber = wrapper.container.querySelector(
			'input[name="number"]'
		)
		fireEvent.focus(cardNumber as Element)
		await waitFor(() => {
			const cardFrontNumber = wrapper.container.querySelector('.rccs__number')

			expect(cardFrontNumber).toHaveClass('rccs--focused')
		})
	})
})
