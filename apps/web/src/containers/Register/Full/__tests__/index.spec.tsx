import {
	RenderResult,
	fireEvent,
	render,
	waitFor
} from '@testing-library/react'
import RegisterFullContainer from 'containers/Register/Full'

describe('RegisterFullContainer', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<RegisterFullContainer onHandleSubmit={jest.fn()} />)
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
			<RegisterFullContainer onHandleSubmit={onHandleSubmit} />
		)

		const inputEmail = wrapper.container.querySelector('#email')
		const inputPassword = wrapper.container.querySelector('#password')
		const inputName = wrapper.container.querySelector('#name')
		const inputLastName = wrapper.container.querySelector('#lastName')
		const documentType = wrapper.container.querySelector('#documentType')
		const documentNumber =
			wrapper.container.querySelector('#documentNumber')
		const nationalityCountry = wrapper.container.querySelector(
			'#nationality-country'
		)
		const nationalityCity =
			wrapper.container.querySelector('#nationality-city')
		const residenceCountry =
			wrapper.container.querySelector('#residence-country')
		const residenceLengthOfStay = wrapper.container.querySelector(
			'#residence-lengthOfStay'
		)
		const residentCity = wrapper.container.querySelector('#residence-city')
		const gender = wrapper.container.querySelector('input[name="gender"]')
		const birthday = wrapper.container.querySelector('#birthday')

		const button = wrapper.container.querySelector('button[type="submit"]')

		fireEvent.change(inputEmail as Element, {
			target: { value: 'test@correo.com' }
		})
		fireEvent.change(inputPassword as Element, {
			target: { value: '123456Uu*' }
		})
		fireEvent.change(inputName as Element, { target: { value: 'Test' } })
		fireEvent.change(inputLastName as Element, {
			target: { value: 'Test' }
		})
		fireEvent.change(documentType as Element, { target: { value: 'CC' } })
		fireEvent.change(documentNumber as Element, {
			target: { value: '123456789' }
		})
		fireEvent.change(nationalityCountry as Element, {
			target: { value: 'Colombia' }
		})
		fireEvent.change(nationalityCity as Element, {
			target: { value: 'Bogota' }
		})
		fireEvent.change(residenceCountry as Element, {
			target: { value: 'Colombia' }
		})
		fireEvent.change(residenceLengthOfStay as Element, {
			target: { value: '1' }
		})
		fireEvent.change(residentCity as Element, {
			target: { value: 'Bogota' }
		})
		fireEvent.change(gender as Element, { target: { value: 'Masculino' } })
		fireEvent.change(birthday as Element, {
			target: { value: '1994-10-10' }
		})

		fireEvent.click(button as Element)

		expect(wrapper.container).toMatchSnapshot()

		await waitFor(() => {
			/* expect(onHandleSubmit).toHaveBeenCalledWith({
				email: 'test@correo.com',
				password: '123456Uu*',
				name: 'Test',
				lastName: 'Test',
				documentType: 'CC',
				documentNumber: '123456789',
				nationality: {
					country: 'Colombia',
					city: 'Bogota'
				},
				residence: {
					country: 'Colombia',
					city: 'Bogota',
					lengthOfStay: '1'
				},
				gender: 'Masculino',
				birthday: '1994-10-10'
			}) */
			expect(onHandleSubmit).toHaveBeenCalled()
		})
	})
})
