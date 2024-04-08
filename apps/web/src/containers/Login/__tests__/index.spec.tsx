import {
	RenderResult,
	fireEvent,
	render,
	waitFor
} from '@testing-library/react'
import LoginContainer from '../'
import { FormData } from '../utils/schema'

describe('LoginContainer', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<LoginContainer
				onHandleSubmit={jest.fn() as (data: FormData) => void}
			/>
		)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render the email input', () => {
		const emailInput = wrapper.container.querySelector(
			'input[name="email"]'
		)
		expect(emailInput).toBeInTheDocument()
	})

	it('should render the password input', () => {
		const passwordInput = wrapper.container.querySelector(
			'input[name="password"]'
		)
		expect(passwordInput).toBeInTheDocument()
	})

	it('should render the submit button', () => {
		const submitButton = wrapper.container.querySelector(
			'button[type="submit"]'
		)
		expect(submitButton).toBeInTheDocument()
	})

	it('should render the submit button with the text "login.go"', () => {
		const submitButton = wrapper.container.querySelector(
			'button[type="submit"]'
		)
		expect(submitButton).toHaveTextContent('login.go')
	})

	it('should call onHandleSubmit when the form is submitted', async () => {
		const onHandleSubmit = jest.fn()
		wrapper.rerender(<LoginContainer onHandleSubmit={onHandleSubmit} />)

		const emailInput = wrapper.container.querySelector(
			'input[name="email"]'
		)
		const passwordInput = wrapper.container.querySelector(
			'input[name="password"]'
		)
		const submitButton = wrapper.container.querySelector(
			'button[type="submit"]'
		)

		fireEvent.change(emailInput as Element, {
			target: { value: 'test@email.com' }
		})
		fireEvent.change(passwordInput as Element, {
			target: { value: 'passwordD1*' }
		})

		fireEvent.click(submitButton as Element)

		await waitFor(() => {
			expect(onHandleSubmit).toHaveBeenCalledTimes(1)
			expect(onHandleSubmit).toHaveBeenCalledWith({
				email: 'test@email.com',
				password: 'passwordD1*'
			})
		})
	})
})
