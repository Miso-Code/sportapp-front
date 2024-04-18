import {
	RenderResult,
	fireEvent,
	render,
	waitFor,
	act
} from '@testing-library/react'
import RegisterPartnerContainer from 'containers/Partner/Register'

describe('RegisterPartnerContainer', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<RegisterPartnerContainer onHandleSubmit={jest.fn()} />
		)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should call onHandleSubmit', async () => {
		const onHandleSubmit = jest.fn()
		wrapper.rerender(
			<RegisterPartnerContainer onHandleSubmit={onHandleSubmit} />
		)

		const inputCompanyName = wrapper.container.querySelector('#companyName')
		const inputEmail = wrapper.container.querySelector('#email')
		const inputPassword = wrapper.container.querySelector('#password')
		const button = wrapper.container.querySelector('button[type="submit"]')

		act(() => {
			fireEvent.change(inputCompanyName as Element, {
				target: { value: 'John Doe' }
			})
			fireEvent.change(inputEmail as Element, {
				target: { value: 'test@correo.com' }
			})
			fireEvent.change(inputPassword as Element, {
				target: { value: '123456uU*' }
			})
			fireEvent.submit(button as Element)
		})

		expect(inputCompanyName).toHaveValue('John Doe')
		expect(inputEmail).toHaveValue('test@correo.com')
		expect(inputPassword).toHaveValue('123456uU*')

		await waitFor(() => {
			expect(onHandleSubmit).toHaveBeenCalled()
		})
	})
})
