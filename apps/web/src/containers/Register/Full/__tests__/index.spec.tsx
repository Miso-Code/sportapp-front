import { RenderResult, render } from '@testing-library/react'
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

	/* it('should call onHandleSubmit', async () => {
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
			'input[name="nationality.country"]'
		)

		const nationalityCity = wrapper.container.querySelector(
			'input[name="nationality.city"'
		)
		const residenceCountry = wrapper.container.querySelector(
			'input[name="residence.country"]'
		)
		const residenceLengthOfStay = wrapper.container.querySelector(
			'input[name="residence.lengthOfStay"]'
		)
		const residentCity = wrapper.container.querySelector(
			'input[name="residence.city"]'
		)
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

		console.log(nationalityCountry)

		expect(wrapper.container).toMatchSnapshot()

		expect(inputEmail).toHaveValue('test@correo.com')
		expect(inputPassword).toHaveValue('123456Uu*')
		expect(inputName).toHaveValue('Test')
		expect(inputLastName).toHaveValue('Test')
		expect(documentType).toHaveValue('CC')
		expect(documentNumber).toHaveValue('123456789')
		expect(residenceLengthOfStay).toHaveValue(1)

		expect(nationalityCountry).toHaveValue('Colombia')
		expect(nationalityCity).toHaveValue('Bogota')
		expect(residenceCountry).toHaveValue('Colombia')
		expect(residentCity).toHaveValue('Bogota')
		expect(gender).toHaveValue('Masculino')
		expect(birthday).toHaveValue('1994-10-10')

		await waitFor(() => {
			expect(onHandleSubmit).toHaveBeenCalled()
		})
	}) */
})
