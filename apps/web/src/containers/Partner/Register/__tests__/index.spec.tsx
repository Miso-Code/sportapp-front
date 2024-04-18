import {
	RenderResult,
	fireEvent,
	render,
	waitFor
} from '@testing-library/react'
import DefaultRegister from 'containers/Register/Default'

describe('RegisterDefaultContainer', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<DefaultRegister onHandleSubmit={jest.fn()} />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should call onHandleSubmit', async () => {
		const onHandleSubmit = jest.fn()
		wrapper.rerender(<DefaultRegister onHandleSubmit={onHandleSubmit} />)

		let inputName = wrapper.container.querySelector('#name')
		let inputLastName = wrapper.container.querySelector('#lastName')
		let inputEmail = wrapper.container.querySelector('#email')
		let inputPassword = wrapper.container.querySelector('#password')
		const button = wrapper.container.querySelector('button[type="submit"]')

		fireEvent.change(inputName as Element, {
			target: { value: 'John' }
		})
		fireEvent.change(inputLastName as Element, {
			target: { value: 'Doe' }
		})
		fireEvent.change(inputEmail as Element, {
			target: { value: 'test@correo.com' }
		})
		fireEvent.change(inputPassword as Element, {
			target: { value: '123456uU*' }
		})
		fireEvent.submit(button as Element)

		inputName = wrapper.container.querySelector('#name')
		inputLastName = wrapper.container.querySelector('#lastName')
		inputEmail = wrapper.container.querySelector('#email')
		inputPassword = wrapper.container.querySelector('#password')

		expect(inputName).toHaveValue('John')
		expect(inputLastName).toHaveValue('Doe')
		expect(inputEmail).toHaveValue('test@correo.com')
		expect(inputPassword).toHaveValue('123456uU*')

		await waitFor(() => {
			expect(onHandleSubmit).toHaveBeenCalled()
		})
	})
})
